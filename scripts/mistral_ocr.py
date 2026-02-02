#!/usr/bin/env python3
"""
Mistral OCR: Convert PDF to Markdown with extracted images
Usage: python mistral_ocr.py <pdf_path> [output_dir]

Requires MISTRAL_API_KEY in environment or .env file
"""
import os
import sys
import base64
import mimetypes
from pathlib import Path
from dotenv import load_dotenv
from mistralai import Mistral

# Load environment variables from .env file
load_dotenv()

# Debug: Check if API key is loaded
api_key = os.getenv("MISTRAL_API_KEY")
if api_key:
    masked_key = f"{api_key[:8]}...{api_key[-4:]}" if len(api_key) > 12 else "***"
    print(f"🔑 API Key loaded: {masked_key} (length: {len(api_key)})")
else:
    print("❌ MISTRAL_API_KEY not found in environment!")
    print("💡 Create a .env file with: MISTRAL_API_KEY=your_key_here")
    sys.exit(1)


def get_mime_type(file_path: Path) -> str:
    """Get MIME type of a file."""
    mime_type, _ = mimetypes.guess_type(str(file_path))
    if not mime_type:
        if file_path.suffix.lower() == ".pdf":
            return "application/pdf"
        elif file_path.suffix.lower() in [".jpg", ".jpeg"]:
            return "image/jpeg"
        elif file_path.suffix.lower() == ".png":
            return "image/png"
        elif file_path.suffix.lower() == ".webp":
            return "image/webp"
        else:
            raise ValueError(f"Unsupported file type: {file_path.suffix}")
    return mime_type


def create_data_uri(file_path: Path) -> str:
    """Create a data URI from a file (base64 encoded)."""
    mime_type = get_mime_type(file_path)
    with open(file_path, "rb") as f:
        base64_data = base64.b64encode(f.read()).decode("utf-8")
    return f"data:{mime_type};base64,{base64_data}"


def save_base64_image(base64_string: str, output_path: Path) -> None:
    """Save a base64 encoded image to file."""
    image_data = base64.b64decode(base64_string)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(image_data)


def ocr_pdf_to_markdown(pdf_path: str, output_dir: str = None, include_images: bool = True) -> str:
    """
    Convert PDF to Markdown using Mistral OCR, saving images.
    
    Args:
        pdf_path: Path to PDF file
        output_dir: Directory for output (default: <pdf_stem>-markdown_output)
        include_images: Whether to extract and save images (default: True)
    
    Returns:
        Path to generated Markdown file
    """
    pdf_path = Path(pdf_path)
    
    # Default output directory
    if output_dir is None:
        output_dir = pdf_path.parent / f"{pdf_path.stem}-markdown_output"
    else:
        output_dir = Path(output_dir)
    
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Create images subdirectory
    images_dir = output_dir / "images"
    images_dir.mkdir(exist_ok=True)
    
    # Initialize client (auto-detects MISTRAL_API_KEY)
    client = Mistral(api_key=api_key)
    
    print(f"📄 Processing: {pdf_path.name}")
    print(f"📁 Output to: {output_dir}")
    
    # Create data URI (base64 encoded) - this is the key difference!
    print("📦 Encoding PDF to base64...")
    data_uri = create_data_uri(pdf_path)
    
    # Determine document type based on file extension
    if pdf_path.suffix.lower() == ".pdf":
        document = {
            "type": "document_url",
            "document_url": data_uri
        }
    else:
        document = {
            "type": "image_url",
            "image_url": data_uri
        }
    
    # Run OCR with image extraction
    print(f"🔍 Running OCR (images: {'enabled' if include_images else 'disabled'})...")
    result = client.ocr.process(
        model="mistral-ocr-latest",
        document=document,
        include_image_base64=include_images
    )
    
    print(f"✓ OCR complete! Found {len(result.pages)} pages")
    
    # Process pages and extract images
    full_markdown = f"# {pdf_path.stem}\n\n"
    full_markdown += f"*Converted from PDF using Mistral OCR*\n\n"
    full_markdown += f"---\n\n"
    
    image_counter = 0
    
    for page_idx, page in enumerate(result.pages):
        print(f"  Processing page {page_idx + 1}/{len(result.pages)}...")
        
        markdown = page.markdown
        
        # Extract and save base64 images
        if hasattr(page, 'images') and page.images:
            print(f"    Found {len(page.images)} images on page {page_idx + 1}")
            for img in page.images:
                # API returns 'image_base64' attribute, not 'base64'
                img_data = getattr(img, 'image_base64', None) or getattr(img, 'base64', None)
                if img_data:
                    # Use image id if available, otherwise use counter
                    img_id = getattr(img, 'id', None) or f"img_{image_counter:04d}"
                    # Clean the id to make a valid filename
                    img_name = f"{img_id}.png" if not img_id.endswith(('.png', '.jpg', '.jpeg')) else img_id
                    img_path = images_dir / img_name
                    save_base64_image(img_data, img_path)
                    
                    # Add image reference in markdown
                    markdown += f"\n\n![Image {image_counter}](images/{img_name})\n\n"
                    
                    image_counter += 1
        
        # Add page separator
        full_markdown += f"<!-- Page {page_idx + 1} -->\n\n{markdown}\n\n"
    
    # Save markdown
    md_path = output_dir / f"{pdf_path.stem}.md"
    md_path.write_text(full_markdown, encoding="utf-8")
    
    print(f"\n✅ Complete!")
    print(f"  📝 Markdown: {md_path}")
    print(f"  🖼️  Images: {image_counter} saved to {images_dir}/")
    
    return str(md_path)


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Mistral OCR - Convert PDF to Markdown with image extraction"
    )
    parser.add_argument("pdf_path", help="Path to PDF file")
    parser.add_argument(
        "-o", "--output",
        dest="output_dir",
        help="Output directory (default: <pdf_stem>-markdown_output)"
    )
    parser.add_argument(
        "--no-images",
        action="store_false",
        dest="include_images",
        help="Skip image extraction (faster, smaller output)"
    )
    
    args = parser.parse_args()
    
    try:
        ocr_pdf_to_markdown(args.pdf_path, args.output_dir, include_images=args.include_images)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
