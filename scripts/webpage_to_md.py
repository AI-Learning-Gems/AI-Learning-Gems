#!/usr/bin/env python3
"""
Webpage to Markdown: Download a webpage as clean Markdown with locally-saved images.

Usage:
    python scripts/webpage_to_md.py <URL> [-o OUTPUT_DIR] [--selector SELECTOR] [--no-images]

Examples:
    python scripts/webpage_to_md.py "https://d2l.ai/chapter_.../vision-transformer.html" -o sources/d2l-vit/
    python scripts/webpage_to_md.py "https://lilianweng.github.io/posts/2022-06-09-vlm/" -o sources/vlm/
    python scripts/webpage_to_md.py "https://example.com/article" --selector "article.main-content"

Dependencies (all standard / already installed):
    - requests
    - beautifulsoup4
    - markdownify
"""

import os
import re
import sys
import hashlib
import mimetypes
import argparse
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

import requests
from bs4 import BeautifulSoup, Comment
from markdownify import markdownify as md, MarkdownConverter


# ─── Configuration ────────────────────────────────────────────────────────────

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)

# Tags to strip entirely (navigation, ads, scripts, etc.)
STRIP_TAGS = [
    "script", "style", "noscript", "iframe", "nav", "footer",
    "header", "aside", "form", "button", "input", "select", "textarea",
]

# Common content selectors to try (in order of priority)
CONTENT_SELECTORS = [
    "article",
    "main",
    '[role="main"]',
    ".content",
    ".post-content",
    ".article-content",
    ".entry-content",
    "#content",
    ".main-content",
    ".document",        # Sphinx-based docs (d2l.ai uses this)
    ".body",            # Sphinx fallback
    ".rst-content",     # ReadTheDocs
]

# Image extensions we want to download
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".bmp", ".tiff"}


# ─── Custom Markdown Converter ───────────────────────────────────────────────

class ImgDownloadConverter(MarkdownConverter):
    """
    Custom markdownify converter that rewrites image src attributes
    to local paths. The actual downloading is done in a pre-processing step;
    this converter just looks up the mapping.
    """
    def __init__(self, *args, img_map=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.img_map = img_map or {}

    def convert_img(self, el, text, convert_as_inline):
        alt = el.get("alt", "").strip()
        src = el.get("src", "")
        title = el.get("title", "")

        # Look up local path
        local_path = self.img_map.get(src, src)

        # Build markdown image
        if title:
            return f'![{alt}]({local_path} "{title}")'
        return f"![{alt}]({local_path})"


def custom_markdownify(html, **kwargs):
    """Wrapper that uses our custom converter."""
    return ImgDownloadConverter(
        **kwargs
    ).convert(html)


# ─── Helper Functions ─────────────────────────────────────────────────────────

def fetch_html(url: str) -> str:
    """Fetch the raw HTML of a webpage."""
    headers = {"User-Agent": USER_AGENT}
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    resp.encoding = resp.apparent_encoding  # handle charset detection
    return resp.text


def extract_content(soup: BeautifulSoup, selector: str = None) -> BeautifulSoup:
    """
    Extract the main content area of the page, stripping boilerplate.
    If a CSS selector is provided, use that. Otherwise, try common selectors.
    """
    # Remove unwanted tags first
    for tag_name in STRIP_TAGS:
        for tag in soup.find_all(tag_name):
            tag.decompose()

    # Remove HTML comments
    for comment in soup.find_all(string=lambda text: isinstance(text, Comment)):
        comment.extract()

    # Use explicit selector if provided 
    if selector:
        content = soup.select_one(selector)
        if content:
            print(f"  ✓ Found content with selector: {selector}")
            return content
        print(f"  ⚠ Selector '{selector}' not found, trying auto-detection...")

    # Try common content selectors
    for sel in CONTENT_SELECTORS:
        content = soup.select_one(sel)
        if content:
            # Sanity check: content should have some text
            text_len = len(content.get_text(strip=True))
            if text_len > 200:  # arbitrary minimum for "real content"
                print(f"  ✓ Auto-detected content with selector: {sel} ({text_len} chars)")
                return content

    # Fallback: use the body
    body = soup.find("body")
    if body:
        print("  ⚠ No content selector matched; using <body>")
        return body

    return soup


def collect_images(content: BeautifulSoup, base_url: str) -> list:
    """
    Collect all image URLs from the content, resolving relative URLs.
    Handles <img src>, <img srcset>, <source srcset>, and inline SVGs.
    Returns list of (absolute_url, original_src_attr) tuples.
    """
    images = []
    seen = set()

    for img in content.find_all("img"):
        src = img.get("src", "")
        if not src:
            continue

        # Skip data URIs (base64 inline images) — we'll handle them separately
        if src.startswith("data:"):
            continue

        abs_url = urljoin(base_url, src)
        if abs_url not in seen:
            seen.add(abs_url)
            images.append((abs_url, src))

        # Also check srcset for higher-res versions
        srcset = img.get("srcset", "")
        if srcset:
            for entry in srcset.split(","):
                entry = entry.strip()
                if entry:
                    srcset_url = entry.split()[0]  # "url 2x" → "url"
                    abs_srcset = urljoin(base_url, srcset_url)
                    if abs_srcset not in seen:
                        seen.add(abs_srcset)
                        # We don't add srcset images to the main list;
                        # the src is sufficient for markdown

    # Handle <source> inside <picture> elements
    for source in content.find_all("source"):
        srcset = source.get("srcset", "")
        if srcset:
            for entry in srcset.split(","):
                entry = entry.strip()
                if entry:
                    srcset_url = entry.split()[0]
                    abs_srcset = urljoin(base_url, srcset_url)
                    if abs_srcset not in seen:
                        seen.add(abs_srcset)
                        images.append((abs_srcset, srcset_url))

    return images


def guess_extension(url: str, content_type: str = None) -> str:
    """Guess the file extension from URL or Content-Type header."""
    # Try from URL path first
    parsed = urlparse(url)
    path = unquote(parsed.path)
    _, ext = os.path.splitext(path)
    if ext.lower() in IMAGE_EXTENSIONS:
        return ext.lower()

    # Try from Content-Type
    if content_type:
        ext = mimetypes.guess_extension(content_type.split(";")[0].strip())
        if ext:
            return ext

    return ".png"  # safe default


def download_image(url: str, images_dir: Path, index: int) -> tuple:
    """
    Download a single image and save it locally.
    Returns (local_relative_path, success_bool).
    """
    try:
        headers = {"User-Agent": USER_AGENT}
        resp = requests.get(url, headers=headers, timeout=15, stream=True)
        resp.raise_for_status()

        content_type = resp.headers.get("Content-Type", "")
        ext = guess_extension(url, content_type)

        # Generate a readable filename from the URL
        parsed = urlparse(url)
        url_path = unquote(parsed.path)
        basename = os.path.basename(url_path)
        name, _ = os.path.splitext(basename)

        # Clean up the name
        name = re.sub(r'[^\w\-.]', '_', name)  # sanitize
        if not name or name == '_':
            name = f"img_{index:03d}"

        filename = f"{name}{ext}"

        # Handle duplicates
        out_path = images_dir / filename
        counter = 1
        while out_path.exists():
            out_path = images_dir / f"{name}_{counter}{ext}"
            counter += 1

        # Write the file
        out_path.write_bytes(resp.content)
        return (str(out_path.relative_to(images_dir.parent)), True)

    except Exception as e:
        print(f"    ⚠ Failed to download {url}: {e}")
        return (url, False)


def extract_inline_svgs(content, images_dir: Path) -> dict:
    """
    Extract inline <svg> elements, save them as .svg files,
    and return a mapping from a placeholder to the local path.
    """
    svg_map = {}
    soup = content if isinstance(content, BeautifulSoup) else content.find_parent()
    if soup is None:
        soup = BeautifulSoup(str(content), "html.parser")

    for i, svg in enumerate(content.find_all("svg")):
        svg_str = str(svg)
        svg_hash = hashlib.sha1(svg_str.encode()).hexdigest()[:8]
        filename = f"inline_svg_{i:03d}_{svg_hash}.svg"
        out_path = images_dir / filename
        out_path.write_text(svg_str, encoding="utf-8")

        local_path = str(out_path.relative_to(images_dir.parent))
        new_img = BeautifulSoup(
            f'<img src="{local_path}" alt="Figure {i+1}"/>', "html.parser"
        ).img
        svg.replace_with(new_img)
        svg_map[local_path] = local_path

    return svg_map


def extract_title(soup: BeautifulSoup, url: str) -> str:
    """Extract a reasonable title for the page, cleaning up interactive elements."""
    # Try <h1> first
    h1 = soup.find("h1")
    if h1:
        # Deep-clone h1 by re-parsing its HTML (bs4 __copy__ is shallow)
        h1_clone = BeautifulSoup(str(h1), "html.parser").find("h1")
        # Remove interactive elements: Colab buttons, tab divs, headerlinks, tooltips
        for tag in h1_clone.find_all(["div", "button", "i"]):
            tag.decompose()
        for tag in h1_clone.find_all("a"):
            # Remove headerlinks (pilcrow ¶) and external links
            if "headerlink" in " ".join(tag.get("class", [])):
                tag.decompose()
            elif tag.get("href", "").startswith("http"):
                tag.decompose()

        title = h1_clone.get_text(strip=True)
        # Clean up common artifacts: pilcrows, trailing ¶, multiple spaces
        title = title.replace("¶", "").strip()
        title = re.sub(r'\s+', ' ', title)
        if title:
            return title

    # Try <title> tag
    title_tag = soup.find("title")
    if title_tag:
        title = title_tag.get_text(strip=True)
        # Often "Page Title — Site Name", take the first part
        if " — " in title:
            title = title.split(" — ")[0].strip()
        elif " - " in title:
            title = title.split(" - ")[0].strip()
        return title

    # Fallback: use the URL path
    parsed = urlparse(url)
    return unquote(parsed.path.split("/")[-1].replace(".html", "").replace("-", " ").title())


def clean_markdown(text: str) -> str:
    """Post-process the markdown for cleanliness."""
    # Remove excessive blank lines (more than 2 consecutive)
    text = re.sub(r'\n{4,}', '\n\n\n', text)

    # Remove trailing whitespace on each line
    text = "\n".join(line.rstrip() for line in text.split("\n"))

    # Ensure file ends with a single newline
    text = text.strip() + "\n"

    return text


# ─── Main Function ────────────────────────────────────────────────────────────

def webpage_to_markdown(
    url: str,
    output_dir: str = None,
    selector: str = None,
    include_images: bool = True,
    include_svgs: bool = True,
) -> str:
    """
    Convert a webpage to Markdown with locally-downloaded images.

    Args:
        url: The webpage URL to convert.
        output_dir: Directory for output (default: derived from URL).
        selector: CSS selector for the main content area.
        include_images: Whether to download images (default: True).
        include_svgs: Whether to extract inline SVGs (default: True).

    Returns:
        Path to the generated Markdown file.
    """
    # Derive output directory from URL if not specified
    if output_dir is None:
        parsed = urlparse(url)
        slug = parsed.path.strip("/").replace("/", "_").replace(".html", "")
        slug = re.sub(r'[^\w\-.]', '_', slug)
        output_dir = slug

    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    images_dir = output_dir / "images"
    images_dir.mkdir(exist_ok=True)

    print(f"📄 Fetching: {url}")
    html = fetch_html(url)

    print(f"🔍 Parsing HTML ({len(html):,} bytes)...")
    soup = BeautifulSoup(html, "html.parser")

    # Extract title before content extraction (which may strip <h1>)
    title = extract_title(soup, url)
    print(f"📝 Title: {title}")

    # Extract main content
    content = extract_content(soup, selector)

    # Handle inline SVGs
    svg_map = {}
    if include_svgs:
        svg_map = extract_inline_svgs(content, images_dir)
        if svg_map:
            print(f"  ✓ Extracted {len(svg_map)} inline SVG(s)")

    # Collect and download images
    img_map = {}  # original_src → local_path
    if include_images:
        image_list = collect_images(content, url)
        print(f"🖼️  Found {len(image_list)} image(s) to download...")

        for i, (abs_url, orig_src) in enumerate(image_list):
            local_path, success = download_image(abs_url, images_dir, i)
            if success:
                # Map both the original src and the absolute URL
                img_map[orig_src] = local_path
                img_map[abs_url] = local_path
                print(f"    ✓ [{i+1}/{len(image_list)}] {os.path.basename(local_path)}")
            else:
                print(f"    ✗ [{i+1}/{len(image_list)}] FAILED: {abs_url[:80]}")

    # Merge SVG map
    img_map.update(svg_map)

    # Convert to Markdown using our custom converter
    print("📝 Converting to Markdown...")
    content_html = str(content)

    # Pre-process: rewrite img src attributes to local paths
    for orig_src, local_path in img_map.items():
        # Replace in the HTML string directly for reliability
        content_html = content_html.replace(f'src="{orig_src}"', f'src="{local_path}"')
        content_html = content_html.replace(f"src='{orig_src}'", f"src='{local_path}'")

    markdown_text = md(
        content_html,
        heading_style="ATX",         # # Heading style
        bullets="-",                 # - bullet style
        strong_em_symbol="*",        # *bold* and _italic_
        code_language="python",      # default code block language
        strip=["a"] if False else None,  # keep links
        convert=["img", "table", "pre", "code", "blockquote", "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "hr", "br", "em", "strong", "del", "sub", "sup"],
    )

    # Build final document with metadata
    final_md = f"# {title}\n\n"
    final_md += f"> Source: [{url}]({url})\n\n"
    final_md += f"---\n\n"
    final_md += markdown_text

    # Clean up
    final_md = clean_markdown(final_md)

    # Save
    # Generate filename from URL (more reliable than title)
    parsed_url = urlparse(url)
    url_slug = parsed_url.path.strip("/").split("/")[-1]
    url_slug = url_slug.replace(".html", "").replace(".htm", "")
    url_slug = re.sub(r'[^\w\-.]', '_', url_slug)
    if not url_slug:
        url_slug = re.sub(r'[^\w\-.]', '_', title.lower().replace(" ", "_"))
    md_filename = url_slug + ".md"
    md_path = output_dir / md_filename
    md_path.write_text(final_md, encoding="utf-8")

    # Count images in output dir
    image_count = len(list(images_dir.iterdir())) if images_dir.exists() else 0

    print(f"\n✅ Complete!")
    print(f"  📝 Markdown: {md_path}")
    print(f"  🖼️  Images:   {image_count} saved to {images_dir}/")
    print(f"  📏 Size:     {len(final_md):,} characters")

    return str(md_path)


# ─── CLI ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Convert a webpage to Markdown with locally-saved images.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s "https://d2l.ai/chapter_.../vision-transformer.html" -o sources/d2l-vit/
  %(prog)s "https://lilianweng.github.io/posts/2022-06-09-vlm/" -o sources/vlm/
  %(prog)s "https://example.com/article" --selector "article.main-content"
        """,
    )
    parser.add_argument("url", help="The webpage URL to convert")
    parser.add_argument(
        "-o", "--output",
        dest="output_dir",
        help="Output directory (default: derived from URL)",
    )
    parser.add_argument(
        "-s", "--selector",
        help="CSS selector for the main content area (e.g. 'article', '#content')",
    )
    parser.add_argument(
        "--no-images",
        action="store_false",
        dest="include_images",
        help="Skip image downloading",
    )
    parser.add_argument(
        "--no-svgs",
        action="store_false",
        dest="include_svgs",
        help="Skip inline SVG extraction",
    )

    args = parser.parse_args()

    try:
        webpage_to_markdown(
            url=args.url,
            output_dir=args.output_dir,
            selector=args.selector,
            include_images=args.include_images,
            include_svgs=args.include_svgs,
        )
    except requests.exceptions.RequestException as e:
        print(f"\n❌ Network error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
