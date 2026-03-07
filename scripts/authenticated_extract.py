#!/usr/bin/env python3
"""
Authenticated webpage extraction to Markdown using Crawl4AI.

Uses persistent browser profiles created by setup_browser_profile.py
to access login-gated content (Substack, Medium, etc.)

Output follows the sources/ folder naming convention:
    sources/{domain}/{url_path}/
    ├── content.md             ← Markdown with local image paths
    └── images/                ← Downloaded images
        ├── figure1.png
        └── ...

Usage:
    python scripts/authenticated_extract.py <url> [--profile NAME] [-o OUTPUT_DIR] [-s SELECTOR]

Examples:
    # Substack subscriber-only post (auto-derives output path)
    python scripts/authenticated_extract.py "https://substack.com/home/post/p-189051354" --profile substack

    # Public blog (no auth needed, but uses JS rendering)
    python scripts/authenticated_extract.py "https://lilianweng.github.io/posts/2024-11-28-reward-hacking/"

    # Medium member article with explicit output dir override
    python scripts/authenticated_extract.py "https://medium.com/@author/article-id" --profile medium -o sources/medium.com/custom-path/

    # Custom CSS selector override
    python scripts/authenticated_extract.py "https://example.com/page" -s "div.main-content"

    # Skip image downloading
    python scripts/authenticated_extract.py "https://example.com/page" --no-images
"""
import os
import re
import sys
import asyncio
import hashlib
import mimetypes
import argparse
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse, unquote

import requests
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig

PROFILES_DIR = Path(__file__).parent / ".browser-profiles"
SOURCES_DIR = Path(__file__).parent.parent / "sources"

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".bmp", ".tiff"}

# Site-specific CSS selectors for article content extraction.
# Without these, Crawl4AI extracts the full page including navbars,
# sidebars, feeds, etc. — burying the article content.
SITE_SELECTORS: dict[str, dict] = {
    "substack.com": {
        "css_selector": "article",
        "wait_until": "networkidle",
        "delay_before_return_html": 3.0,
    },
    "medium.com": {
        "css_selector": "article",
        "wait_until": "networkidle",
        "delay_before_return_html": 3.0,
    },
    "arxiv.org": {
        "css_selector": "article, .ltx_document, .document",
        "wait_until": "domcontentloaded",
        "delay_before_return_html": 1.0,
    },
}


def get_site_config(url: str) -> dict:
    """Return site-specific CrawlerRunConfig overrides based on URL domain."""
    hostname = urlparse(url).hostname or ""
    for domain, config in SITE_SELECTORS.items():
        if hostname == domain or hostname.endswith("." + domain):
            return config
    return {
        "wait_until": "networkidle",
        "delay_before_return_html": 2.0,
    }


def url_to_source_path(url: str) -> Path:
    """
    Convert a URL to the standard sources/ folder path.

    Convention (from web-source-fetching.md):
      1. Strip https:// and http://
      2. Strip www.
      3. Use the remaining URL as the folder path
      4. Strip trailing slashes

    Examples:
      https://substack.com/home/post/p-189051354
        → sources/substack.com/home/post/p-189051354/
      https://lilianweng.github.io/posts/2024-11-28-reward-hacking/
        → sources/lilianweng.github.io/posts/2024-11-28-reward-hacking/
      https://magazine.sebastianraschka.com/p/a-dream-of-spring
        → sources/magazine.sebastianraschka.com/p/a-dream-of-spring/
    """
    parsed = urlparse(url)
    hostname = (parsed.hostname or "").removeprefix("www.")
    path = parsed.path.strip("/")
    # Remove .html/.htm extensions from final component
    if path.endswith(".html") or path.endswith(".htm"):
        path = re.sub(r'\.html?$', '', path)
    folder = f"{hostname}/{path}" if path else hostname
    return SOURCES_DIR / folder


def guess_extension(url: str, content_type: Optional[str] = None) -> str:
    """Guess file extension from URL or Content-Type header."""
    clean_url = url.split("?")[0].split("#")[0]
    parsed = urlparse(clean_url)
    path = unquote(parsed.path)
    _, ext = os.path.splitext(path)
    if ext.lower() in IMAGE_EXTENSIONS:
        return ext.lower()
    if content_type is not None:
        guessed = mimetypes.guess_extension(content_type.split(";")[0].strip())
        if guessed is not None:
            return guessed
    return ".png"


def download_images(markdown: str, images_dir: Path) -> str:
    """
    Find all image URLs in markdown, download them locally, and
    rewrite the markdown to use relative paths (images/filename).
    """
    images_dir.mkdir(parents=True, exist_ok=True)

    img_pattern = re.compile(r'(!\[[^\]]*\])\(([^)]+)\)')
    all_matches = img_pattern.findall(markdown)

    if len(all_matches) == 0:
        return markdown

    url_to_local: dict[str, str] = {}
    seen_filenames: set[str] = set()
    downloaded = 0
    failed = 0

    print(f"  Downloading {len(all_matches)} image(s)...")

    for i, (_alt_part, img_url) in enumerate(all_matches):
        img_url = img_url.strip()
        if img_url in url_to_local:
            continue
        if img_url.startswith("data:") or not img_url.startswith("http"):
            continue

        try:
            resp = requests.get(
                img_url, headers={"User-Agent": USER_AGENT}, timeout=15, stream=True
            )
            resp.raise_for_status()

            content_type = resp.headers.get("Content-Type", "")
            ext = guess_extension(img_url, content_type)

            url_path = unquote(urlparse(img_url).path)
            basename = os.path.basename(url_path)
            name, _ = os.path.splitext(basename)
            name = re.sub(r'[^\w\-.]', '_', name)
            if not name or name == '_' or len(name) > 80:
                name = f"img_{i + 1:03d}"

            filename = f"{name}{ext}"
            if filename in seen_filenames:
                url_hash = hashlib.sha1(img_url.encode()).hexdigest()[:6]
                filename = f"{name}_{url_hash}{ext}"
            seen_filenames.add(filename)

            out_path = images_dir / filename
            out_path.write_bytes(resp.content)

            url_to_local[img_url] = f"images/{filename}"
            downloaded += 1

        except Exception as e:
            print(f"    Failed: {img_url[:80]}... ({e})")
            failed += 1

    def replace_img(match: re.Match) -> str:
        alt_part = match.group(1)
        img_url = match.group(2).strip()
        local_path = url_to_local.get(img_url)
        if local_path is not None:
            return f"{alt_part}({local_path})"
        return match.group(0)

    rewritten = img_pattern.sub(replace_img, markdown)
    print(f"  Images: {downloaded} downloaded, {failed} failed")
    return rewritten


def extract_title(markdown: str, metadata: Optional[dict]) -> str:
    """Extract a title from page metadata, falling back to markdown content."""
    if metadata is not None:
        for key in ("og:title", "title", "twitter:title"):
            if metadata.get(key):
                return metadata[key]

    link_matches = re.findall(r'\[([^\]]{15,})\]\(', markdown[:2000])
    for candidate in link_matches:
        if not candidate.startswith("http") and "avatar" not in candidate.lower():
            return candidate.strip()

    heading_match = re.search(r'^#\s+(.+)$', markdown, re.MULTILINE)
    if heading_match is not None:
        return heading_match.group(1).strip()

    return "Untitled"


async def extract(
    url: str,
    profile: Optional[str],
    output_dir_override: Optional[str],
    css_selector_override: Optional[str] = None,
    include_images: bool = True,
) -> str:
    browser_config = BrowserConfig(headless=True)

    if profile is not None:
        profile_dir = PROFILES_DIR / profile
        if not profile_dir.exists():
            print(f"Profile '{profile}' not found at {profile_dir}")
            print(
                f"Create it first: python scripts/setup_browser_profile.py <login_url> {profile}"
            )
            sys.exit(1)
        browser_config = BrowserConfig(
            headless=True,
            use_persistent_context=True,
            user_data_dir=str(profile_dir),
        )
        print(f"Using browser profile: {profile}")

    site_config = get_site_config(url)
    if css_selector_override is not None:
        site_config["css_selector"] = css_selector_override

    run_config = CrawlerRunConfig(
        css_selector=site_config.get("css_selector"),
        wait_until=site_config.get("wait_until", "networkidle"),
        delay_before_return_html=site_config.get("delay_before_return_html", 2.0),
        scan_full_page=True,
    )

    # Derive output directory from URL convention, or use explicit override
    if output_dir_override is not None:
        post_dir = Path(output_dir_override)
    else:
        post_dir = url_to_source_path(url)

    if site_config.get("css_selector"):
        print(f"Content selector: {site_config['css_selector']}")
    print(f"Fetching: {url}")
    print(f"Output:   {post_dir}/")

    async with AsyncWebCrawler(config=browser_config) as crawler:
        result = await crawler.arun(url=url, config=run_config)

    if not result.success:
        print(f"Failed to fetch: {result.error_message}")
        sys.exit(1)

    markdown = str(result.markdown) if result.markdown is not None else ""
    title = extract_title(markdown, result.metadata)

    post_dir.mkdir(parents=True, exist_ok=True)
    images_dir = post_dir / "images"

    if include_images:
        markdown = download_images(markdown, images_dir)

    final_md = f"# {title}\n\n"
    final_md += f"> Source: [{url}]({url})\n\n"
    final_md += "---\n\n"
    final_md += markdown
    final_md = re.sub(r'\n{4,}', '\n\n\n', final_md).strip() + "\n"

    md_path = post_dir / "content.md"
    md_path.write_text(final_md, encoding="utf-8")

    image_count = len(list(images_dir.iterdir())) if images_dir.exists() else 0

    print(f"\nMarkdown: {md_path}")
    print(f"Images:   {image_count} saved to {images_dir}/")
    print(f"Size:     {len(final_md):,} characters")
    return str(md_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Extract authenticated web content to Markdown",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Output path convention:
  By default, output goes to sources/{domain}/{url_path}/ following the
  project's web-source-fetching naming convention. Use -o to override.

Examples:
  %(prog)s "https://substack.com/home/post/p-189051354" --profile substack
    → sources/substack.com/home/post/p-189051354/content.md

  %(prog)s "https://lilianweng.github.io/posts/2024-11-28-reward-hacking/"
    → sources/lilianweng.github.io/posts/2024-11-28-reward-hacking/content.md

  %(prog)s "https://medium.com/@user/post-slug" --profile medium -o custom/path/
    → custom/path/content.md
        """,
    )
    parser.add_argument("url", help="URL to extract")
    parser.add_argument(
        "--profile", "-p", help="Browser profile name (from setup_browser_profile.py)"
    )
    parser.add_argument(
        "-o",
        "--output",
        dest="output_dir",
        help="Output directory override (default: auto-derived from URL into sources/)",
    )
    parser.add_argument(
        "-s",
        "--selector",
        help="CSS selector override for content area (e.g. 'article', 'div.post-content')",
    )
    parser.add_argument(
        "--no-images",
        action="store_false",
        dest="include_images",
        help="Skip image downloading",
    )
    args = parser.parse_args()

    asyncio.run(
        extract(args.url, args.profile, args.output_dir, args.selector, args.include_images)
    )
