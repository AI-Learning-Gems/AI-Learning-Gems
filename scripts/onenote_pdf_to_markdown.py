#!/usr/bin/env python3
"""
OneNote PDF to Markdown: Split giant single-page OneNote PDF exports into
virtual page PNGs, then optionally OCR each page via Mistral.

OneNote exports PDFs as a single continuous page (often 100+ inches tall)
with all content as vector ink strokes and zero selectable text. Standard
PDF extraction tools (Marker, native Gemini PDF upload, pdftotext) fail
on these because they expect multi-page documents with text layers.

This script:
  1. Detects whether a PDF is a OneNote-style giant page or standard multi-page
  2. Splits giant pages into overlapping virtual page PNGs at high DPI
  3. Renders standard multi-page PDFs as one PNG per page
  4. Optionally runs Mistral OCR on each PNG and stitches results into Markdown

The extracted PNGs can also be fed manually to any vision LLM (Gemini via
Antigravity, ChatGPT, Claude, etc.) for conversion to Markdown+LaTeX.

Usage:
    # Extract PNGs only (for manual use with Gemini / Antigravity):
    python scripts/onenote_pdf_to_markdown.py "path/to/notes.pdf" -o output/

    # Extract PNGs + run Mistral OCR automatically:
    python scripts/onenote_pdf_to_markdown.py "path/to/notes.pdf" -o output/ --ocr mistral

    # Customize virtual page height and overlap:
    python scripts/onenote_pdf_to_markdown.py "path/to/notes.pdf" -o output/ --page-height 14 --overlap 1.5

Dependencies:
    - PyMuPDF (pymupdf)
    - mistralai + python-dotenv (only if --ocr mistral)
"""

import os
import sys
import argparse
from pathlib import Path

import fitz  # PyMuPDF


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# A standard US Letter page is 8.5 x 11 inches (612 x 792 pt).
# We use 11 inches as the default virtual page height for splitting.
DEFAULT_PAGE_HEIGHT_INCHES = 11.0
DEFAULT_OVERLAP_INCHES = 1.0
DEFAULT_ZOOM = 3  # 3x zoom = 216 DPI effective (72 * 3)

# If a single PDF page is taller than this many inches, treat it as a
# OneNote-style giant page that needs splitting.
GIANT_PAGE_THRESHOLD_INCHES = 20.0

# Minimum extractable text (chars) to consider a page "has real text".
# OneNote exports typically have <100 chars (just the title + timestamp).
TEXT_LAYER_THRESHOLD = 200


# ---------------------------------------------------------------------------
# Core: Split & Render
# ---------------------------------------------------------------------------

def analyze_pdf(pdf_path: Path) -> dict:
    """Analyze a PDF and determine whether it's a OneNote giant-page export."""
    doc = fitz.open(str(pdf_path))
    pages = []
    for i in range(len(doc)):
        page = doc[i]
        rect = page.rect
        text = page.get_text()
        drawings = page.get_drawings()
        pages.append({
            "index": i,
            "width_pt": rect.width,
            "height_pt": rect.height,
            "width_in": rect.width / 72,
            "height_in": rect.height / 72,
            "text_chars": len(text),
            "text_preview": text[:100].strip(),
            "vector_drawings": len(drawings),
            "embedded_images": len(page.get_images()),
        })
    doc.close()

    is_giant = (
        len(pages) == 1
        and pages[0]["height_in"] > GIANT_PAGE_THRESHOLD_INCHES
    )
    is_ink_only = all(p["text_chars"] < TEXT_LAYER_THRESHOLD for p in pages)

    return {
        "path": str(pdf_path),
        "num_pages": len(pages),
        "is_giant_page": is_giant,
        "is_ink_only": is_ink_only,
        "pages": pages,
    }


def split_giant_page(
    pdf_path: Path,
    output_dir: Path,
    page_height_in: float = DEFAULT_PAGE_HEIGHT_INCHES,
    overlap_in: float = DEFAULT_OVERLAP_INCHES,
    zoom: int = DEFAULT_ZOOM,
) -> list[Path]:
    """
    Split a single giant PDF page into overlapping virtual page PNGs.

    Returns list of output PNG paths in order.
    """
    doc = fitz.open(str(pdf_path))
    page = doc[0]
    rect = page.rect

    page_height_pt = page_height_in * 72
    overlap_pt = overlap_in * 72
    step_pt = page_height_pt - overlap_pt

    output_dir.mkdir(parents=True, exist_ok=True)

    png_paths = []
    y = 0.0
    idx = 0
    matrix = fitz.Matrix(zoom, zoom)

    while y < rect.height:
        y_end = min(y + page_height_pt, rect.height)
        clip = fitz.Rect(0, y, rect.width, y_end)
        pix = page.get_pixmap(clip=clip, matrix=matrix)

        out_path = output_dir / f"page_{idx:03d}.png"
        pix.save(str(out_path))
        png_paths.append(out_path)

        idx += 1
        y += step_pt

        # If the remaining strip would be very short, merge it with the last
        remaining = rect.height - y
        if 0 < remaining < (page_height_pt * 0.3):
            y_end = rect.height
            clip = fitz.Rect(0, y - overlap_pt, rect.width, y_end)
            pix = page.get_pixmap(clip=clip, matrix=matrix)
            out_path = output_dir / f"page_{idx:03d}.png"
            pix.save(str(out_path))
            png_paths.append(out_path)
            break

    doc.close()
    return png_paths


def render_standard_pages(
    pdf_path: Path,
    output_dir: Path,
    zoom: int = DEFAULT_ZOOM,
    page_limit: int = None,
) -> list[Path]:
    """Render each page of a standard multi-page PDF as a PNG."""
    doc = fitz.open(str(pdf_path))
    output_dir.mkdir(parents=True, exist_ok=True)

    num_pages = len(doc) if page_limit is None else min(len(doc), page_limit)
    png_paths = []
    matrix = fitz.Matrix(zoom, zoom)
    for i in range(num_pages):
        page = doc[i]
        pix = page.get_pixmap(matrix=matrix)
        out_path = output_dir / f"page_{i:03d}.png"
        pix.save(str(out_path))
        png_paths.append(out_path)

    doc.close()
    return png_paths


# ---------------------------------------------------------------------------
# Optional: Mistral OCR on extracted PNGs
# ---------------------------------------------------------------------------

def ocr_pngs_with_mistral(
    png_paths: list[Path],
    output_dir: Path,
    pdf_stem: str,
    include_images: bool = False,
) -> Path:
    """
    Run Mistral OCR on each PNG and stitch results into a single Markdown file.

    Requires MISTRAL_API_KEY in environment or .env file.
    """
    from dotenv import load_dotenv
    load_dotenv()

    api_key = os.getenv("MISTRAL_API_KEY")
    if not api_key:
        print("MISTRAL_API_KEY not found. Set it in .env or environment.")
        sys.exit(1)

    import base64
    from mistralai import Mistral

    client = Mistral(api_key=api_key)

    full_markdown = f"# {pdf_stem}\n\n"
    full_markdown += f"*Converted from OneNote PDF export using Mistral OCR*\n\n---\n\n"

    for i, png_path in enumerate(png_paths):
        print(f"  OCR page {i + 1}/{len(png_paths)}: {png_path.name}")

        with open(png_path, "rb") as f:
            b64 = base64.b64encode(f.read()).decode("utf-8")
        data_uri = f"data:image/png;base64,{b64}"

        result = client.ocr.process(
            model="mistral-ocr-latest",
            document={"type": "image_url", "image_url": data_uri},
            include_image_base64=include_images,
        )

        page_md = ""
        for page_result in result.pages:
            page_md += page_result.markdown + "\n\n"

        full_markdown += f"<!-- Page {i + 1} -->\n\n{page_md}\n\n"

    md_path = output_dir / f"{pdf_stem}.md"
    md_path.write_text(full_markdown, encoding="utf-8")
    return md_path


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def process_pdf(
    pdf_path: str,
    output_dir: str = None,
    page_height_in: float = DEFAULT_PAGE_HEIGHT_INCHES,
    overlap_in: float = DEFAULT_OVERLAP_INCHES,
    zoom: int = DEFAULT_ZOOM,
    ocr_backend: str = None,
    page_limit: int = None,
) -> dict:
    """
    Process a PDF: analyze, split/render to PNGs, and optionally OCR.

    Args:
        pdf_path: Path to the PDF file.
        output_dir: Output directory (default: <pdf_stem>_pages/).
        page_height_in: Virtual page height for giant-page splitting.
        overlap_in: Overlap between virtual pages (inches).
        zoom: Rendering zoom factor (3 = 216 DPI).
        ocr_backend: None (PNGs only) or "mistral" (run Mistral OCR).
        page_limit: Only extract the first N pages (useful for TOC detection).

    Returns:
        dict with keys: png_paths, markdown_path (if OCR), analysis.
    """
    pdf_path = Path(pdf_path)
    if not pdf_path.exists():
        print(f"File not found: {pdf_path}")
        sys.exit(1)

    if output_dir is None:
        output_dir = pdf_path.parent / f"{pdf_path.stem}_pages"
    else:
        output_dir = Path(output_dir)

    images_dir = output_dir / "images"

    # Step 1: Analyze
    print(f"Analyzing: {pdf_path.name}")
    analysis = analyze_pdf(pdf_path)

    page_info = analysis["pages"][0]
    print(f"  Pages: {analysis['num_pages']}")
    print(f"  Dimensions: {page_info['width_in']:.1f}in x {page_info['height_in']:.1f}in")
    print(f"  Extractable text: {page_info['text_chars']} chars")
    print(f"  Vector drawings: {page_info['vector_drawings']}")
    print(f"  Type: {'OneNote giant page' if analysis['is_giant_page'] else 'Standard multi-page'}")
    print(f"  Content: {'Ink/vector only (no text layer)' if analysis['is_ink_only'] else 'Has text layer'}")

    # Step 2: Split / Render
    if analysis["is_giant_page"]:
        virtual_pages = page_info["height_in"] / (page_height_in - overlap_in)
        print(f"\nSplitting into ~{virtual_pages:.0f} virtual pages "
              f"({page_height_in}in tall, {overlap_in}in overlap, {zoom}x zoom)...")
        png_paths = split_giant_page(
            pdf_path, images_dir,
            page_height_in=page_height_in,
            overlap_in=overlap_in,
            zoom=zoom,
        )
    else:
        total = analysis['num_pages']
        rendering = f"{total}" if page_limit is None else f"first {min(total, page_limit)} of {total}"
        print(f"\nRendering {rendering} pages at {zoom}x zoom...")
        png_paths = render_standard_pages(pdf_path, images_dir, zoom=zoom, page_limit=page_limit)

    print(f"  Extracted {len(png_paths)} PNG(s) to {images_dir}/")

    # Show PNG sizes for reference
    total_bytes = sum(p.stat().st_size for p in png_paths)
    print(f"  Total size: {total_bytes / 1024 / 1024:.1f} MB")
    for p in png_paths[:3]:
        print(f"    {p.name}: {p.stat().st_size / 1024:.0f} KB")
    if len(png_paths) > 3:
        print(f"    ... and {len(png_paths) - 3} more")

    # Step 3: Write a prompt template for manual use
    prompt_path = output_dir / "PROMPT.md"
    prompt_path.write_text(_make_prompt_template(pdf_path.stem, len(png_paths)), encoding="utf-8")
    print(f"  Prompt template: {prompt_path}")

    result = {
        "png_paths": png_paths,
        "analysis": analysis,
        "markdown_path": None,
    }

    # Step 4: Optional OCR
    if ocr_backend == "mistral":
        print(f"\nRunning Mistral OCR on {len(png_paths)} pages...")
        md_path = ocr_pngs_with_mistral(
            png_paths, output_dir, pdf_path.stem
        )
        result["markdown_path"] = md_path
        print(f"\n  Markdown: {md_path}")
        print(f"  Size: {md_path.stat().st_size / 1024:.1f} KB")

    print(f"\nDone! Output in {output_dir}/")
    return result


def _make_prompt_template(pdf_stem: str, num_pages: int) -> str:
    """Generate a prompt template the user can paste into Antigravity/Gemini."""
    return f"""# Prompt Template for: {pdf_stem}

Use this prompt when feeding the extracted PNGs to a vision LLM
(Gemini via Antigravity, Google AI Studio, ChatGPT, Claude, etc.).

## Recommended prompt (copy-paste this):

```
Convert this handwritten page to Markdown with embedded LaTeX.

Rules:
- Render all mathematical equations in LaTeX: $...$ for inline, $$...$$ for display.
- Preserve the document structure: headings, numbered/bulleted lists, definitions.
- Use > blockquotes for boxed theorems, definitions, or highlighted results.
- Preserve color annotations as **bold** (for emphasis in red/other colors).
- If a section heading is numbered (e.g. "=> Type-I & Type-II errors"), keep the numbering.
- Use standard Markdown tables for any tabular content.
- Be faithful to the handwritten content; do not add, omit, or rephrase.
```

## Workflow

There are {num_pages} page images in the images/ folder.

**Option A: One page at a time**
Attach each page_NNN.png individually with the prompt above.

**Option B: Batch (if the model supports multi-image)**
Attach all {num_pages} images at once and add to the prompt:
"Process all {num_pages} pages in order. Separate each page with <!-- Page N -->."

## After OCR

Save the combined output as `{pdf_stem}.md` in this folder.
"""


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Split OneNote PDF exports into virtual page PNGs, optionally OCR with Mistral.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Extract PNGs only (for Antigravity / Gemini / manual use):
  %(prog)s "Statistics/10. Evaluating Hypothesis tests.pdf"

  # Extract + Mistral OCR in one step:
  %(prog)s "Statistics/10. Evaluating Hypothesis tests.pdf" --ocr mistral

  # Custom page height for dense notes:
  %(prog)s notes.pdf --page-height 14 --overlap 1.5

  # Override output directory:
  %(prog)s notes.pdf -o sources/my-notes/
        """,
    )
    parser.add_argument("pdf_path", help="Path to the PDF file")
    parser.add_argument(
        "-o", "--output",
        dest="output_dir",
        help="Output directory (default: <pdf_stem>_pages/ next to the PDF)",
    )
    parser.add_argument(
        "--page-height",
        type=float,
        default=DEFAULT_PAGE_HEIGHT_INCHES,
        help=f"Virtual page height in inches (default: {DEFAULT_PAGE_HEIGHT_INCHES})",
    )
    parser.add_argument(
        "--overlap",
        type=float,
        default=DEFAULT_OVERLAP_INCHES,
        help=f"Overlap between virtual pages in inches (default: {DEFAULT_OVERLAP_INCHES})",
    )
    parser.add_argument(
        "--zoom",
        type=int,
        default=DEFAULT_ZOOM,
        help=f"Rendering zoom factor (default: {DEFAULT_ZOOM}, i.e. {DEFAULT_ZOOM * 72} DPI)",
    )
    parser.add_argument(
        "--ocr",
        choices=["mistral"],
        default=None,
        help="Run OCR after extraction (default: none, just extract PNGs)",
    )
    parser.add_argument(
        "--page-limit",
        type=int,
        default=None,
        help="Only extract the first N pages (useful for TOC detection in long PDFs)",
    )

    args = parser.parse_args()

    process_pdf(
        pdf_path=args.pdf_path,
        output_dir=args.output_dir,
        page_height_in=args.page_height,
        overlap_in=args.overlap,
        zoom=args.zoom,
        ocr_backend=args.ocr,
        page_limit=args.page_limit,
    )
