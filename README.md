# AI Learning Gems

Textbook-style chapters on technical/mathematical topics, generated using LLM agents and rendered with Quarto.

## How It Works

This project uses **agentic LLM prompts** to generate high-quality educational content. The prompts are designed for:

- **Cursor** (prompts in `.cursor/commands/`)
- **Windsurf** (prompts in `.agent/workflows/`)

**Recommended model:** Claude Opus 4.5 — works well for generating both prose and D2 diagrams.

## Project Structure

```
AI-Learning-Gems/
├── _quarto.yml                  # Global config (kernel, format)
├── _extensions/pandoc-ext/      # D2 diagram filter
├── .cursor/commands/            # Cursor agent prompts
├── .agent/workflows/            # Windsurf agent prompts
├── scripts/                     # Source extraction tools
│   ├── authenticated_extract.py # Login-gated / JS-heavy pages → MD + images
│   ├── setup_browser_profile.py # One-time login to create browser profiles
│   ├── webpage_to_md.py         # Static pages → MD + images
│   ├── mistral_ocr.py           # PDF → MD + images (via Mistral API)
│   └── .browser-profiles/       # Saved browser sessions (gitignored)
├── sources/                     # Downloaded sources (gitignored)
├── Topic-1/                     # Each topic is a folder with .qmd chapters
├── Topic-2/
└── ...
```

---

## Setup

### Prerequisites (Homebrew — one-time global install)

These tools cannot be installed inside conda and must be installed system-wide:

```bash
brew install --cask quarto    # Document rendering (.qmd → HTML/PDF)
brew install d2               # Diagram generation
brew install pandoc            # Document conversion
brew install imagemagick       # PDF figure → PNG conversion
brew install ghostscript       # Required by ImageMagick for PDF rasterization

# Pin versions to prevent brew auto-upgrading them
brew pin d2 pandoc imagemagick ghostscript
```

Verify versions (must match at least the same minor version):
```bash
quarto --version    # 1.7.x (tested with 1.7.31)
d2 --version        # 0.7.x (tested with 0.7.1)
pandoc --version    # 3.8.x (tested with 3.8.3)
magick --version    # 7.1.x (tested with 7.1.2)
gs --version        # 10.x  (tested with 10.06)
```

> **Note**: Homebrew does not support installing specific versions (`brew install d2@0.7.1` won't work).
> If `brew install` gives you a newer version than listed above, it will likely work.
> The `brew pin` commands prevent `brew upgrade` from bumping these during routine updates.

### Python Environment (conda + uv)

Create the project's conda environment and install all dependencies.
These commands are idempotent — safe to re-run.

```bash
# Create conda env (skips if already exists)
conda create -n ai-learning-gems python=3.13 --yes 2>/dev/null || true
conda activate ai-learning-gems

# Install uv for fast pip installs (skips if already installed)
pip install uv 2>/dev/null || true

# Install all Python dependencies
cd /path/to/AI-Learning-Gems
uv pip install -r requirements.txt

# Register as Jupyter kernel (used by Quarto for .qmd code execution)
python -m ipykernel install --user --name=ai-learning-gems --display-name="Python (ai-learning-gems)"
```

Verify:
```bash
conda activate ai-learning-gems
python --version                                    # 3.13.x
python -c "import numpy, pandas, matplotlib, scipy, crawl4ai; print('OK')"
jupyter kernelspec list | grep ai-learning-gems     # Should show the kernel
quarto check jupyter                                # Should show ai-learning-gems in kernel list
```

### Crawl4AI Browser Setup (for authenticated web extraction)

After installing requirements, set up Playwright browsers for the web extraction tool:

```bash
conda activate ai-learning-gems
crawl4ai-setup    # Downloads Chromium (~90MB, one-time)
```

Then create browser profiles for login-gated sites (one-time per site):

```bash
cd /path/to/AI-Learning-Gems

# Substack
python scripts/setup_browser_profile.py "https://substack.com/sign-in" substack
# → A Chromium window opens → log in → press Enter in terminal to save

# Medium
python scripts/setup_browser_profile.py "https://medium.com/m/signin" medium
# → Same flow: log in → press Enter
```

Profiles are saved to `scripts/.browser-profiles/` (gitignored — they contain session cookies).
Re-run if sessions expire or you get empty output.

### Quarto Extension (D2 Diagrams)

The `pandoc-ext/diagram` extension is already committed in `_extensions/`. To reinstall:

```bash
cd /path/to/AI-Learning-Gems
quarto add pandoc-ext/diagram
```

### VS Code / Cursor Extensions

Install:
- **Quarto** (`quarto.quarto`)
- **Python** (`ms-python.python`)

---

## Source Extraction Tools

The `scripts/` folder contains tools for downloading web sources as clean Markdown with local images. See `.cursor/rules/web-source-fetching.md` for the full decision tree.

### Authenticated / JS-Heavy Pages → Markdown + Images

Uses [Crawl4AI](https://crawl4ai.com/) with persistent browser profiles.

```bash
# Substack article (auto-derives output path from URL)
python scripts/authenticated_extract.py "https://substack.com/home/post/p-189051354" --profile substack
# → sources/substack.com/home/post/p-189051354/content.md + images/

# Public blog that needs JS rendering (no profile needed)
python scripts/authenticated_extract.py "https://lilianweng.github.io/posts/2024-11-28-reward-hacking/"
# → sources/lilianweng.github.io/posts/2024-11-28-reward-hacking/content.md + images/

# Custom CSS selector for unknown sites
python scripts/authenticated_extract.py "https://example.com/page" -s "article"

# Skip images
python scripts/authenticated_extract.py "https://example.com/page" --no-images
```

### Static Web Pages (public, no JS needed)

```bash
python scripts/webpage_to_md.py "https://d2l.ai/chapter_.../section.html" -o sources/d2l.ai/chapter_.../
```

### PDF → Markdown (via Mistral OCR)

Requires `MISTRAL_API_KEY` in `.env`.

```bash
python scripts/mistral_ocr.py document.pdf -o sources/output/
```

### ArXiv Papers (LaTeX source preferred)

```bash
mkdir -p sources/arxiv-2010.11929 && cd sources/arxiv-2010.11929
curl -sL "https://arxiv.org/src/2010.11929" -o source.tar.gz && tar -xzf source.tar.gz
```

### PDF Figure → PNG Conversion

```bash
# Single figure (400 DPI, auto-trimmed)
magick -density 400 figure.pdf -trim +repage figure.png

# Batch convert all PDF figures in an arXiv source
find "sources/arxiv-{ID}/" \( -name '*.pdf' \) \( -path '*/images/*' -o -path '*/figs/*' -o -path '*/figures/*' \) | while read f; do
  outfile="${f%.pdf}.png"
  [ ! -f "$outfile" ] && magick -density 400 "$f" -trim +repage "$outfile" && echo "Converted: $f"
done
```

---

## Rendering

### From Cursor/VS Code

1. Open a `.qmd` index file
2. Click **Preview** (Quarto extension) or use Command Palette: `Quarto: Preview`

### From Terminal

```bash
conda activate ai-learning-gems
cd /path/to/AI-Learning-Gems

# Preview with live reload
quarto preview Statistics/Your-Chapter.qmd

# One-time render
quarto render Statistics/Your-Chapter.qmd --to html
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| D2 diagrams show as plain text | Check the `.qmd` has `filters:` in YAML header |
| Wrong Jupyter kernel | Run `python -m ipykernel install --user --name=ai-learning-gems --display-name="Python (ai-learning-gems)"` |
| Extension not found | Run `quarto render` from the project root, not a subdirectory |
| Authenticated extraction returns login page | Re-run `setup_browser_profile.py` — session may have expired |
| `crawl4ai-setup` hangs | It downloads ~90MB Chromium; wait or check network |
| Quarto can't find kernel | Run `conda activate ai-learning-gems && jupyter kernelspec list` to verify |
| D2 command not found | `brew install d2` (cannot be installed via pip/conda) |
| PyMC installation fails | `conda install -c conda-forge pymc arviz` |

---

## Environment Reference

Developed and tested with:
- **Python** 3.13.12 (via conda)
- **Quarto** 1.7.31 (via Homebrew)
- **Pandoc** 3.8.3 (via Homebrew)
- **D2** 0.7.1 (via Homebrew)
- **ImageMagick** 7.1.2 + **Ghostscript** 10.06 (via Homebrew)
- **macOS** arm64 (Apple Silicon)
