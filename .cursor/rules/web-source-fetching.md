---
description: "Downloading web sources for writing textbook chapters"
globs:
  - "**/*.qmd"
alwaysApply: true
---

# Web Source Fetching Strategies

This document contains rules and strategies for fetching authoritative content from various web sources. It is a **living document** — add new entries as you discover what works for each website.

---

## Core Principles

1. **Never rely on internal world knowledge for technical content** — every claim must trace to a downloaded source
2. **Source of truth hierarchy**: LaTeX/source code > HTML > PDF > summaries
3. **Download first, read later** — save content locally before processing
4. **Prefer raw sources** — GitHub raw files, arXiv LaTeX, not rendered HTML
5. **`search_web` is for discovery only** — use it to identify sources, not to extract content

---

## Anti-Patterns to Avoid

| ❌ Don't Do This | ✅ Do This Instead |
|-----------------|-------------------|
| Use `search_web` for content | Use it only for source discovery |
| Fabricate URLs | Only use URLs you've actually fetched |
| Regenerate content from memory | Quote/cite downloaded sources |
| Use browser for static pages | Use `curl` or `read_url_content` |
| Link to external URLs for images | Download images locally |

---

## Decision Tree: Choosing a Fetch Method

```
Is it an arXiv paper?
├─ YES → Download LaTeX source: curl arxiv.org/src/PAPER_ID (ALWAYS prefer this over PDF)
└─ NO
   ├─ Is it a PDF? (non-arXiv papers, scanned documents, reports)
   │  ├─ Need high-quality Markdown + images?
   │  │  ├─ YES → python scripts/mistral_ocr.py file.pdf -o output/
   │  │  └─ NO (just text) → pdftotext -layout file.pdf > file.txt
   │  └─ Alternative: marker-pdf (local, slower)
   ├─ Is it a DOCX file?
   │  ├─ YES → pandoc input.docx -o output.md (works well)
   │  └─ NO
   ├─ Is it GitHub-hosted? (tutorials, HuggingFace notebooks — NOT d2l.ai, see site-specific)
   │  ├─ YES → curl raw.githubusercontent.com/OWNER/REPO/BRANCH/PATH
   │  └─ NO
   │     ├─ Does it require login / cookies / JS rendering?
   │     │  ├─ YES → python scripts/authenticated_extract.py URL --profile PROFILE
   │     │  │        (Substack, Medium, or any login-gated / JS-heavy page)
   │     │  └─ NO
   │     │     ├─ Is it a known site with special handling? (see lookup table below)
   │     │     │  ├─ YES → Follow site-specific instructions
   │     │     │  └─ NO
   │     │     │     ├─ Is it a static HTML page?
   │     │     │     │  ├─ YES → webpage_to_md.py OR read_url_content (preferred)
   │     │     │     │  │        NOTE: pandoc HTML→MD often produces messy output
   │     │     │     │  └─ MAYBE → Try read_url_content first
   │     │     │     │     └─ If fails → authenticated_extract.py (without --profile)
```

---

## Site-Specific Fetch Strategies (Lookup Table)

Add new entries as you learn what works for each site.

### arXiv (arxiv.org)

**Best approach**: Download LaTeX source

```bash
# Create destination folder with hyphenated naming
mkdir -p "sources/arxiv-{PAPER_ID}"
cd "sources/arxiv-{PAPER_ID}"

# Download and extract source tarball
curl -sL "https://arxiv.org/src/{PAPER_ID}" -o source.tar.gz
tar -xzf source.tar.gz
```

**Folder naming convention:** Always use `arxiv-{PAPER_ID}` (hyphenated), e.g., `arxiv-2010.11929`.

**URL patterns**:
| URL Pattern | Content |
|-------------|---------|
| `arxiv.org/abs/XXXX.XXXXX` | Abstract page |
| `arxiv.org/pdf/XXXX.XXXXX` | PDF download |
| `arxiv.org/html/XXXX.XXXXXv2` | HTML version (experimental) |
| `arxiv.org/src/XXXX.XXXXX` | LaTeX source tarball |

**What you get from LaTeX source**:
- `.tex` files — clean LaTeX with exact equations
- `images/` folder — original figures as PDF/PNG
- `.bib` file — bibliography
- Style files (`.sty`, `.bst`)

**Post-processing for figures**:

arXiv source PNGs are frequently low-resolution thumbnails (under 1000px wide) or blank placeholders. The real content is almost always in the companion PDF. **Always prefer converting from the PDF source** using ImageMagick:

```bash
# PREFERRED: Convert PDF figure to high-res trimmed PNG (requires: brew install imagemagick ghostscript)
magick -density 400 figures/teaser.pdf -trim +repage figures/teaser.png

# Batch convert ALL PDF figures in an arXiv source to high-res PNGs:
find "sources/arxiv-{ID}/" \( -name '*.pdf' \) \( -path '*/images/*' -o -path '*/figs/*' -o -path '*/figures/*' -o -path '*/imgs/*' \) | while read f; do
  outfile="${f%.pdf}.png"
  [ ! -f "$outfile" ] && magick -density 400 "$f" -trim +repage "$outfile" && echo "Converted: $f → $outfile"
done
```

**Why NOT use the PNG directly?** LaTeX uses `\includegraphics{figures/teaser}` without extension. The compiler picks the PDF (vector, full resolution). Authors sometimes include PNGs as low-res fallbacks or blank placeholders. Copying the PNG gives you a thumbnail; converting the PDF gives you the real figure.

**Why NOT use `sips`?** macOS `sips` cannot rasterize vector-based PDFs and produces blank or low-DPI output for most arXiv figures. Always use ImageMagick.

**Fallback**: If LaTeX unavailable, use `read_url_content` on HTML version:
```
read_url_content(url="https://arxiv.org/html/XXXX.XXXXXv2")
view_content_chunk(document_id=URL, position=N)
```

**NEVER**: Download the PDF when LaTeX source is available.

---

### PDF Files (General — Non-arXiv)

**Best approach**: Mistral OCR via `scripts/mistral_ocr.py`

For PDFs that don't have LaTeX source (scanned documents, non-arXiv papers, reports), use the Mistral OCR script which produces high-quality Markdown with image extraction.

**Prerequisites**:
1. Mistral API key in `.env` file: `MISTRAL_API_KEY=your_key_here`
2. Dependencies: `pip install mistralai python-dotenv`

**Basic usage (with image extraction — default)**:
```bash
python scripts/mistral_ocr.py path/to/document.pdf -o output_folder/
```

**Without image extraction (faster, smaller output)**:
```bash
python scripts/mistral_ocr.py path/to/document.pdf -o output_folder/ --no-images
```

**What you get**:
```
output_folder/
├── document.md          ← Markdown with OCR'd text, tables, equations
└── images/              ← Extracted figures (if --no-images not used)
    ├── img_0000.png
    ├── img_0001.png
    └── ...
```

**When to use**:
- Scanned documents (where text extraction tools fail)
- PDFs with complex layouts, tables, equations
- Non-arXiv papers where LaTeX source isn't available
- Any PDF where you need both text AND images extracted

**Pricing**: Mistral OCR costs ~$1–2 per 1,000 pages (free tier available for experimentation).

**Alternative tools** (lower quality, but local/free):
- `marker-pdf` — local model, slower, CPU-intensive
- `pdftotext` — text only, no images or formatting

**Decision tree for PDFs**:
```
Is LaTeX source available? (arXiv, GitHub)
├─ YES → Download LaTeX (see arXiv section above)
└─ NO
   ├─ Need high-quality Markdown + images?
   │  ├─ YES → python scripts/mistral_ocr.py
   │  └─ NO (just text)
   │     └─ pdftotext -layout file.pdf > file.txt
```

---

### DOCX Files (Microsoft Word)

**Best approach**: Pandoc (works very well)

```bash
pandoc input.docx -o output.md
```

**What you get**:
- Clean markdown with headings, lists, tables
- Images extracted to media folder
- Reasonable equation conversion

**Tip**: Add `--extract-media=./media` to save images:
```bash
pandoc input.docx -o output.md --extract-media=./media
```

---

### d2l.ai (Dive into Deep Learning)

**Best approach**: Download the *rendered webpage* using `webpage_to_md.py`

**Why NOT raw GitHub markdown**: The d2l.ai GitHub source files (`d2l-ai/d2l-en`) use a custom build system with non-standard syntax (`:numref:`, `:citet:`, `%%tab pytorch`, `:label:`, etc.) that is NOT readable markdown. The rendered HTML at `d2l.ai` is far more useful — it has clean text, formatted equations, and downloadable images.

```bash
# Download rendered page with images
python scripts/webpage_to_md.py "https://d2l.ai/{CHAPTER_PATH}/{SECTION}.html" \
    -o "sources/d2l.ai/{CHAPTER_PATH}/{SECTION}/"
```

**Chapter path pattern**: `chapter_{topic-slug}/{section-slug}.html`

**Example**:
```bash
python scripts/webpage_to_md.py \
    "https://d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer.html" \
    -o "sources/d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer/"
```

**What you get**:
```
sources/d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer/
├── vision-transformer.md    ← Clean markdown with text, code, equations
└── images/                  ← SVG/PNG figures from the page
    ├── vit.svg
    └── ...
```

**Output file name**: The script names the `.md` file after the URL slug (e.g., `vision-transformer.md`), NOT `content.md`.

**Equations**: Rendered as `\(...\)` (inline) and `\[...\]` (block) — may need conversion to `$...$` / `$$...$$` for Quarto.

**Don't use**: Raw GitHub markdown (contains unreadable build-system syntax), Browser (too slow for this static content)

---

### HuggingFace Documentation (huggingface.co/docs)

**Best approach**: `read_url_content` for documentation pages

```
read_url_content(url="https://huggingface.co/docs/transformers/model_doc/vit")
view_content_chunk(document_id=URL, position=N)
```

**For notebooks**: Download from GitHub
```bash
curl -sL "https://raw.githubusercontent.com/huggingface/notebooks/main/examples/{notebook}.ipynb" -o notebook.ipynb
```

---

### PyTorch Documentation & Tutorials (pytorch.org)

**For tutorials**: Download from GitHub
```bash
curl -sL "https://raw.githubusercontent.com/pytorch/tutorials/main/{category}/{tutorial}.py" -o tutorial.py
```

**For documentation**: `read_url_content`
```
read_url_content(url="https://pytorch.org/docs/stable/{module}.html")
```

---

### Static Tutorial Sites / Blogs

**Best approach for web content WITH images**: `webpage_to_md.py` (downloads images locally + clean MD)

```bash
# Single page with all images downloaded locally
python scripts/webpage_to_md.py "https://example.com/article" -o sources/article/

# With custom CSS selector for content area
python scripts/webpage_to_md.py "https://d2l.ai/chapter_.../section.html" -o sources/section/ -s ".document"
```

**Text-only (no images needed)**: `trafilatura` (boilerplate removal + MD output, but does NOT download images)

```bash
pip install trafilatura
trafilatura -u "https://example.com/article" -of markdown > article.md
```

**Alternative**: `read_url_content` + `view_content_chunk` (for quick reading without local file)

```
read_url_content(url="https://example.com/article")
view_content_chunk(document_id="https://example.com/article", position=0)
view_content_chunk(document_id="https://example.com/article", position=1)
# ... read all relevant chunks
```

---

### HTML-to-Markdown Conversion Tools (Detailed Guide)

**CRITICAL**: `read_url_content` just fetches raw HTML — you need a separate conversion step for Markdown.

#### Tool Comparison

| Tool | Install | Speed | Image Download | LaTeX Handling | Best For |
|------|---------|-------|----------------|----------------|----------|
| **authenticated_extract.py** | Already installed | Medium | ✅ Downloads locally | Pass-through | **Login-gated / JS-heavy pages** |
| **webpage_to_md.py** | Already installed | Fast | ✅ Downloads locally | Pass-through | **Static web pages with images** |
| **trafilatura** | `pip install trafilatura` | Fast | ❌ URLs only | Pass-through | Text-only, boilerplate removal |
| **Pandoc** | `conda install -c conda-forge pandoc` | Medium | ✅ (`--extract-media`) | ✅ Best | Complex documents, accuracy |
| **html-to-markdown** | `pip install html-to-markdown` | ⚡ Fastest | ❌ | Custom handler | High-volume, inline images |
| **markdownify** | `pip install markdownify` | Medium | ❌ | Custom handler | Simple conversion |
| **Jina Reader** | API: `r.jina.ai/URL` | Fast | ❌ | Depends on source | LLM pipelines |

#### Recommended Workflows

**For web articles WITH images (recommended):**
```bash
python scripts/webpage_to_md.py "URL" -o output_dir/
```

**For web articles text-only (removes ads/nav):**
```bash
trafilatura -u "URL" -of markdown > output.md
```

**For accuracy-critical with LaTeX:**
```bash
# Best if source has raw $...$ or $$...$$ syntax
pandoc input.html -f html+tex_math_dollars -t markdown -o output.md
```

**For bulk processing:**
```python
from html_to_markdown import convert
markdown = convert(html_content)
```

**For LLM input (via API):**
```bash
curl "https://r.jina.ai/https://example.com/article"
```

#### LaTeX/MathJax Handling

**⚠️ CRITICAL LIMITATION**: No tool can reliably reconstruct LaTeX from *rendered* MathJax (which becomes MathML/SVG/HTML-CSS). 

**Best strategy**: Always try to get content BEFORE MathJax renders it:
1. Prefer raw GitHub markdown files over rendered HTML
2. For arXiv, ALWAYS use LaTeX source (not HTML or PDF)
3. Check for raw LaTeX in page source (`$...$` or `$$...$$` delimiters)

**If raw LaTeX is in the HTML:**
```bash
pandoc -f html+tex_math_dollars -t markdown input.html -o output.md
```

**If MathJax already rendered** (difficult, often loses equations):
- Right-click equation → "Show Math As" → "TeX Commands" (manual)
- Consider using the original source instead

#### Image Handling

**Primary tool**: `webpage_to_md.py` handles image downloading automatically.

**Alternative** (wget + pandoc pipeline, zero-install):
```bash
# Step 1: Download page + all images
wget --page-requisites --convert-links --adjust-extension \
     --span-hosts --no-directories -P /tmp/page/ "URL"

# Step 2: Convert to markdown, downloading & localizing images
pandoc /tmp/page/*.html -f html -t gfm --extract-media=./images -o output.md
```

**Manual post-processing** (if using a converter that doesn't download images):
```python
import re, requests
from pathlib import Path

md = Path('output.md').read_text()
urls = re.findall(r'!\[.*?\]\((https?://[^)]+)\)', md)

for i, url in enumerate(urls):
    img = requests.get(url).content
    Path(f'images/img_{i}.png').write_bytes(img)
    md = md.replace(url, f'images/img_{i}.png')

Path('output.md').write_text(md)
```

> **NOTE**: `trafilatura --images` does NOT download images — it only lists image URLs in XML/TEI output.

---

### Login-Required / JS-Heavy Pages (Substack, Medium, etc.)

**Best approach**: `authenticated_extract.py` — uses Crawl4AI with persistent browser profiles

This tool handles pages that require authentication (cookies/login) AND/OR JavaScript rendering. It uses a headless Chromium browser with saved login sessions. Output auto-derives the folder path from the URL convention.

**One-time setup per site** (creates a browser profile with your login session):
```bash
python scripts/setup_browser_profile.py "https://substack.com/sign-in" substack
# A browser opens → log in manually → press Enter in terminal to save
```

**Extract content** (reuses saved login session, auto-derives output path):
```bash
# Substack (auto-detects article selector)
python scripts/authenticated_extract.py "https://substack.com/home/post/p-189051354" --profile substack

# Medium
python scripts/authenticated_extract.py "https://medium.com/@author/article-slug" --profile medium

# Any public page that needs JS rendering (no profile needed)
python scripts/authenticated_extract.py "https://lilianweng.github.io/posts/2024-11-28-reward-hacking/"

# Custom CSS selector for unknown sites
python scripts/authenticated_extract.py "https://example.com/page" -s "div.main-content"

# Skip image downloading
python scripts/authenticated_extract.py "https://example.com/page" --no-images

# Override output directory
python scripts/authenticated_extract.py "https://example.com/page" -o sources/custom-path/
```

**What you get** (output path auto-derived from URL):
```
sources/substack.com/home/post/p-189051354/
├── content.md             ← Clean markdown with local image paths
└── images/                ← All images downloaded locally
    ├── figure1.png
    ├── figure2.png
    └── ...
```

**Site-specific CSS selectors** (auto-detected by domain):

| Domain | CSS Selector | Notes |
|--------|-------------|-------|
| `substack.com` / `*.substack.com` | `article` | Extracts post from SPA feed shell |
| `medium.com` | `article` | Extracts article content |
| `arxiv.org` | `article, .ltx_document, .document` | HTML paper content |
| All other sites | Full page (no selector) | Use `-s "article"` to scope |

**Available browser profiles** (in `scripts/.browser-profiles/`):

| Profile | Login URL | Sites covered |
|---------|-----------|---------------|
| `substack` | `https://substack.com/sign-in` | All Substack newsletters |
| `medium` | `https://medium.com/m/signin` | Medium member articles |

**When to use this vs `webpage_to_md.py`**:
- Use `authenticated_extract.py` when: login required, JS rendering needed, SPA page
- Use `webpage_to_md.py` when: public static page, no JS needed (faster, simpler)

**Don't use**: `curl`, `read_url_content`, or `webpage_to_md.py` for login-gated or JS-heavy pages — they won't get the content.

---

### JavaScript-Heavy Pages (Legacy — prefer authenticated_extract.py)

**Only use browser_subagent when** `authenticated_extract.py` doesn't work:
- Complex multi-step navigation required
- Content requires specific user interactions (clicking tabs, expanding sections)

```
browser_subagent(
    Task="Navigate to URL, scroll to load content, extract text via DOM",
    RecordingName="page_fetch"
)
```

**Disadvantages**:
- Very slow (~2+ minutes per page)
- Security concerns with JavaScript execution
- Not reproducible

---

## Local Storage Structure

**All sources are stored centrally in `AI-Learning-Gems/sources/` — NOT in each chapter folder.**

This allows the same source to be referenced by multiple chapters without duplication.

```
AI-Learning-Gems/
├── sources/                                        ← CENTRALIZED source storage
│   ├── arxiv-2010.11929/                            ← ArXiv papers (hyphenated)
│   │   ├── main.tex
│   │   ├── 01_section.tex
│   │   ├── images/
│   │   │   ├── figure1.pdf
│   │   │   └── figure1.png                          # converted
│   │   └── references.bib
│   ├── d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer/
│   │   ├── vision-transformer.md                     # webpage_to_md.py download
│   │   └── images/                                   # Downloaded SVG/PNG figures
│   ├── lilianweng.github.io/posts/2022-06-09-vlm/
│   │   └── content.md                               # Blog post
│   ├── huggingface.co/docs/transformers/model_doc/vit/
│   │   └── content.md                               # Documentation
│   └── source_index.yaml                            # Optional: global metadata
```

### Folder Naming Conventions

| Source Type | Folder Pattern | Example |
|-------------|---------------|---------|
| **ArXiv papers** | `sources/arxiv-{PAPER_ID}` | `sources/arxiv-2010.11929/` |
| **Blogs/sites** | `sources/{domain}/{path}/` | `sources/lilianweng.github.io/posts/2022-06-09-vlm/` |
| **d2l.ai** | `sources/d2l.ai/{chapter-path}/` | `sources/d2l.ai/chapter_attention.../vision-transformer/` |
| **HuggingFace** | `sources/huggingface.co/{path}/` | `sources/huggingface.co/docs/transformers/model_doc/vit/` |

**Blog/site URL → folder name rules:**

1. Strip `https://` and `http://`
2. Strip `www.`
3. Use the remaining URL path as the folder path
4. Store main content as `content.md` inside the folder
5. Store images in `images/` subfolder

---

## Source Metadata Format

For each downloaded source, record metadata:

```yaml
- url: https://arxiv.org/abs/2010.11929
  source_url: https://arxiv.org/src/2010.11929
  accessed: 2026-02-01T11:42:00+05:30
  type: arxiv_latex
  local_path: sources/arxiv-2010.11929/
  title: "An Image is Worth 16x16 Words"
  authors: [Dosovitskiy, Beyer, ...]
  extraction_method: curl + tar
  
- url: https://d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer.html
  accessed: 2026-02-01T11:30:00+05:30
  type: webpage
  local_path: sources/d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer/vision-transformer.md
  title: "11.8. Transformers for Vision"
  extraction_method: webpage_to_md.py (rendered HTML + images)

- url: https://lilianweng.github.io/posts/2022-06-09-vlm/
  accessed: 2026-02-01T12:00:00+05:30
  type: blog
  local_path: sources/lilianweng.github.io/posts/2022-06-09-vlm/content.md
  title: "Vision Language Models"
  extraction_method: trafilatura
```

---

## Image Handling

### PDF→PNG Conversion (Cross-Platform)

Many arXiv papers include figures as PDFs. For embedding in Quarto chapters, these must be converted to PNG.

**Preferred tool: ImageMagick + Ghostscript**
- Renders PDF at high DPI, trims LaTeX whitespace margins, and outputs PNG in one command
- Install: `brew install imagemagick ghostscript` (macOS) | `apt install imagemagick ghostscript` (Linux) | `choco install imagemagick ghostscript` (Windows)

```bash
# PREFERRED: Single file (400 DPI, auto-trimmed):
magick -density 400 figure.pdf -trim +repage figure.png

# Batch convert all PDF figures in an arXiv source:
find "sources/arxiv-{ID}/" \( -name '*.pdf' \) \( -path '*/images/*' -o -path '*/figs/*' -o -path '*/figures/*' -o -path '*/imgs/*' \) | while read f; do
  outfile="${f%.pdf}.png"
  [ ! -f "$outfile" ] && magick -density 400 "$f" -trim +repage "$outfile" && echo "Converted: $f"
done
```

**Fallback 1: pdftoppm (if ImageMagick/Ghostscript unavailable)**
- Install: `brew install poppler` (macOS) | `apt install poppler-utils` (Linux) | `conda install poppler` (any)
- Renders the full PDF page including margins; trim afterward with `magick -trim +repage` if available

```bash
pdftoppm -png -r 400 -singlefile figure.pdf figure
```

**NEVER use sips for PDF figures.** macOS `sips` cannot rasterize vector-based PDFs and will produce blank white PNGs or low-DPI thumbnails for most arXiv figures. Only use `sips` for format conversion of raster images (e.g., JPEG to PNG).

### From web pages:
Download directly with `curl -O` and store locally.

---

## Available Tools Summary

| Tool | Best For | Speed |
|------|----------|-------|
| `run_command` + `curl` | Direct file downloads | <1 sec |
| `read_url_content` | Static web pages | ~2 sec |
| `view_content_chunk` | Reading fetched pages | <1 sec |
| `scripts/authenticated_extract.py` | **Login-gated / JS-heavy pages + images** | ~15-30 sec |
| `scripts/webpage_to_md.py` | **Static web pages + images** | ~5-10 sec |
| `scripts/mistral_ocr.py` | PDF→Markdown + images | ~30 sec/page |
| `browser_subagent` | Complex multi-step navigation (last resort) | ~2 min |
| `pandoc` (via run_command) | HTML→MD, DOCX→MD conversion | ~1 sec |
| `sips` (macOS) | PDF→PNG conversion | <1 sec |

---

## Workflow Integration

Before writing any chapter content:

1. **Use `search_web`** to identify relevant sources (discovery only)
2. **For each source**, determine the best fetch method from this lookup table
3. **Download all sources** to `AI-Learning-Gems/sources/` using appropriate method and naming conventions
4. **Only then start writing** — reference local files, not URLs
5. **Source Processing Log** should contain only URLs that were actually downloaded and read

**Note:** Sources are shared across chapters via the centralized `sources/` folder. Before downloading, check if a source already exists:
```bash
ls AI-Learning-Gems/sources/arxiv-2010.11929/ 2>/dev/null && echo "EXISTS" || echo "NEW"
```

---

## Adding New Sites

When you encounter a new site, experiment with:

1. First try: `curl -sL URL -o file.html`
2. If HTML works: Try `pandoc -f html -t markdown`
3. If that's messy: Try `read_url_content`
4. Look for: "Edit on GitHub" buttons, raw source links, API endpoints
5. Document what works in a new section above

**Template for new site entry**:

```markdown
### [Site Name] (domain.com)

**Best approach**: [describe method]

[Example commands or code]

**URL patterns**: [if applicable]

**What you get**: [describe output]

**Don't use**: [what doesn't work]
```
