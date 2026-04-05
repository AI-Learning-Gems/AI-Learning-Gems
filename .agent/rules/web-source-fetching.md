
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
| Conclude a source is incomplete because grep found no matches | List section headings first (`grep '^##'`), then read relevant sections. A grep false negative is not evidence of missing content. |

---

## Extraction Completeness Verification (MANDATORY for Web Sources)

**Readability is necessary but not sufficient.** A web extraction can produce a readable, substantial `.md` file that is *missing entire sections* due to a soft paywall, JavaScript rendering failure, or extraction timeout. This is especially common with Substack (free preview + paywalled body) and Medium.

**After extracting any web article, verify structural completeness:**

1. **List section headings:** `grep '^##\|^###\|^####' content.md` — the output should show a logical article structure (introduction, body sections, conclusion).
2. **Check for paywall markers:** `grep -i 'upgrade to paid\|subscribe to continue\|for paid subscribers\|unlock this post' content.md` — if any of these strings appear, the extraction hit a paywall boundary. Re-extract with `--profile` for the relevant site (e.g., `--profile substack`).
3. **Check the ending:** Read the last 20 lines of the file. Does the article end with a conclusion/summary, or does it cut off abruptly with a subscription prompt? An abrupt ending signals truncation.
4. **Compare against expected content:** If you know the article discusses topics X, Y, and Z (from web search summaries or the TEXTBOOK-PLAN), verify that the section headings include all three topics. If topic Z is missing from the headings, the extraction may be incomplete.

**Do NOT use term-grep with low result limits to assess completeness.** Searching for a specific term (e.g., "ORM") and getting zero results does not mean the content is missing. The term might appear under a different section heading, use different phrasing, or be buried in a section your grep missed due to result limits. Always check section headings first, then read the relevant sections directly.

---

## Decision Tree: Choosing a Fetch Method

```
Is it an arXiv paper?
├─ YES → Download LaTeX source: curl arxiv.org/src/PAPER_ID (ALWAYS prefer this over PDF)
└─ NO
   ├─ Is it a PAYWALLED academic paper? (SAGE, APA, Elsevier, Springer, etc.)
   │  └─ YES → Follow the Paywalled Paper Retrieval Cascade (see section below):
   │           1. Check arXiv for preprint
   │           2. Search author's personal/university website
   │           3. Search Semantic Scholar, PubMed Central, ERIC, CORE
   │           4. Search using unique abstract text + filetype:pdf
   │           5. Check gwern.net archive
   │           6. Try Wayback Machine
   │           7. Flag to user (LAST RESORT)
   │           Then: verify with pdfinfo (page count), extract with mistral_ocr.py
   ├─ Is it a PDF?
   │  ├─ Is it a OneNote export? (single giant page, handwritten ink, no text layer)
   │  │  └─ YES → python scripts/onenote_pdf_to_markdown.py file.pdf -o output/
   │  │           Then feed the extracted PNGs to the IDE's vision LLM (Cursor/Antigravity)
   │  │           Do NOT use Mistral OCR for handwritten OneNote notes (poor accuracy)
   │  └─ NO (standard rendered PDF: textbooks, papers, reports, scanned docs)
   │     ├─ Need high-quality Markdown + images?
   │     │  ├─ YES → python scripts/mistral_ocr.py file.pdf -o output/
   │     │  └─ NO (just text) → pdftotext -layout file.pdf > file.txt
   │     └─ Alternative: marker-pdf (local, slower)
   ├─ Is it a DOCX file?
   │  ├─ YES → pandoc input.docx -o output.md (works well)
   │  └─ NO
   ├─ Is it a GitHub repo, gist, or file?
   │  ├─ Repo/gist → git clone into sources/ (see GitHub section below)
   │  ├─ Single file → curl raw.githubusercontent.com/OWNER/REPO/BRANCH/PATH
   │  └─ NO
   │     ├─ Is it ANY web page (blog, docs, tutorial, login-gated, JS-heavy)?
   │     │  ├─ YES → python scripts/authenticated_extract.py "URL" (DEFAULT for all web content)
   │     │  │        Add --profile NAME for login-gated sites (Substack, Medium)
   │     │  │        Add -s "article" for unknown sites if full-page extraction is noisy
   │     │  └─ Fallback: python scripts/webpage_to_md.py "URL" -o output/ (faster, no JS)
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

### GitHub Repos & Gists (github.com)

**Best approach**: Clone the repo/gist into `sources/` (preserves full history, code, and assets).

```bash
# Full repo (shallow clone to save space)
git clone --depth 1 "https://github.com/OWNER/REPO.git" "sources/github.com/OWNER/REPO"

# Gist
git clone "https://gist.github.com/GIST_ID.git" "sources/gist.github.com/GIST_ID"

# Single file (when you don't need the full repo)
mkdir -p "sources/github.com/OWNER/REPO/PATH_DIR"
curl -sL "https://raw.githubusercontent.com/OWNER/REPO/BRANCH/PATH" -o "sources/github.com/OWNER/REPO/PATH"
```

**Folder naming convention:**

| Source | Folder |
|--------|--------|
| `github.com/rasbt/LLMs-from-scratch` | `sources/github.com/rasbt/LLMs-from-scratch/` |
| `gist.github.com/abc123` | `sources/gist.github.com/abc123/` |
| Single file from repo | `sources/github.com/OWNER/REPO/path/to/file` |

**When to clone vs single-file download:**
- Clone if: you need multiple files, the repo IS the source (e.g., a tutorial repo, code reference)
- Single file if: you only need one notebook or script from a large repo

**Don't use**: `authenticated_extract.py` on GitHub pages — raw source is always better than rendered HTML.

---

### PDF Files (General — Non-arXiv)

PDFs fall into two categories that require different tools:

#### OneNote PDF Exports (Handwritten Notes)

**Best approach**: `scripts/onenote_pdf_to_markdown.py` + IDE vision LLM

OneNote exports PDFs as a single continuous page (often 100+ inches tall) with all content as vector ink strokes and **zero selectable text**. Standard PDF tools (Mistral OCR, Marker, pdftotext) produce poor results on these because they expect multi-page documents with text layers. Mistral OCR in particular misreads domain-specific terms in handwriting (e.g., "Frequentist" → "Frequently", "Bayesian" → "Barysian").

**How to identify a OneNote export**: single PDF page, height >> width (e.g., 24in x 145in), no extractable text beyond a title/timestamp, thousands of vector drawing paths.

**Workflow**:
```bash
# Step 1: Split into virtual page PNGs
python scripts/onenote_pdf_to_markdown.py "path/to/notes.pdf" -o output/

# Step 2: Feed the PNGs in output/images/ to the IDE's vision LLM
# (Cursor, Antigravity, Google AI Studio — use the prompt in output/PROMPT.md)
```

**What you get**:
```
output/
├── PROMPT.md            ← Ready-to-paste prompt for the vision LLM
└── images/              ← Virtual page PNGs (11in tall, 1in overlap)
    ├── page_000.png
    ├── page_001.png
    └── ...
```

**Customization**:
```bash
# Taller virtual pages for dense notes:
python scripts/onenote_pdf_to_markdown.py notes.pdf --page-height 14 --overlap 1.5

# Lower zoom for smaller file sizes:
python scripts/onenote_pdf_to_markdown.py notes.pdf --zoom 2
```

**Do NOT use `--ocr mistral` for handwritten notes.** The flag exists but Mistral OCR's handwriting recognition is unreliable for technical/mathematical content. Always use the IDE's vision LLM (Gemini, Claude, GPT) which handles handwriting significantly better.

#### Standard Rendered PDFs (Textbooks, Papers, Reports)

**Best approach**: Mistral OCR via `scripts/mistral_ocr.py`

For PDFs that don't have LaTeX source (scanned documents, non-arXiv papers, reports, textbook chapters), use the Mistral OCR script which produces high-quality Markdown with image extraction. This works well for **rendered/typeset content** (as opposed to handwritten ink).

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
- Rendered/typeset PDFs (textbooks, papers, reports)
- Scanned documents with printed text
- PDFs with complex layouts, tables, equations
- Non-arXiv papers where LaTeX source isn't available
- Any PDF where you need both text AND images extracted

**When NOT to use**:
- OneNote exports or other handwritten-ink PDFs (use `onenote_pdf_to_markdown.py` instead)
- arXiv papers (download LaTeX source instead)

**Pricing**: Mistral OCR costs ~$1–2 per 1,000 pages (free tier available for experimentation).

**Alternative tools** (lower quality, but local/free):
- `marker-pdf` — local model, slower, CPU-intensive
- `pdftotext` — text only, no images or formatting

**Decision tree for PDFs**:
```
Is LaTeX source available? (arXiv, GitHub)
├─ YES → Download LaTeX (see arXiv section above)
└─ NO
   ├─ Is it a OneNote export / handwritten ink PDF?
   │  └─ YES → python scripts/onenote_pdf_to_markdown.py
   │           Then feed PNGs to IDE vision LLM (Cursor/Antigravity)
   └─ NO (rendered/typeset PDF)
      ├─ Need high-quality Markdown + images?
      │  ├─ YES → python scripts/mistral_ocr.py
      │  └─ NO (just text)
      │     └─ pdftotext -layout file.pdf > file.txt
      └─ Alternative: marker-pdf (local, slower)
```

---

### Paywalled Academic Papers (SAGE, APA, Elsevier, Springer, Wiley, etc.)

> **This is one of the most common failure modes in the entire workflow.** Agents encounter a paywalled journal paper, get an HTML landing page instead of a PDF, and either (a) give up and write `N/A`, (b) use the abstract as a substitute, or (c) write from training data. All three produce unreliable content. The strategy below has been tested and works for the vast majority of paywalled papers.

**The core problem:** Most important academic papers are behind publisher paywalls (SAGE, APA/PsycNet, Elsevier/ScienceDirect, Springer, Wiley, Taylor & Francis, IEEE, ACM). A direct `curl` to the DOI or publisher URL returns an HTML paywall page, not the PDF. The agent sees a file named `.pdf` but `file` reports `HTML document`. Many agents then give up.

**The core insight:** Almost every important academic paper exists in at least one freely accessible location on the internet. The publisher's paywall is not the only copy. The strategy is to systematically search alternative locations before giving up.

#### The Paywalled Paper Retrieval Cascade (Try ALL Steps In Order)

**STEP 1: Check if the paper is on arXiv.**

Many CS, physics, math, and increasingly social science papers have arXiv preprints. Search:

```bash
# Search by title (use quotes for exact match)
# Web search: "Exact Paper Title" site:arxiv.org

# If found, download LaTeX source (ALWAYS prefer this over PDF):
mkdir -p "sources/arxiv-{ID}" && cd "sources/arxiv-{ID}" && \
curl -sL "https://arxiv.org/src/{ID}" -o source.tar.gz && \
tar -xzf source.tar.gz && rm source.tar.gz
```

**STEP 2: Search for the PDF on the author's personal/university website.**

Most researchers host their papers on their personal sites or university profiles. Search:

```bash
# Web search strategies (try ALL of these):
# "{First Author Last Name}" "{Paper Title}" filetype:pdf
# "{First Author Last Name}" "{Paper Title}" site:edu
# "{First Author Last Name}" publications personal website

# Common hosting patterns:
# https://psychology.ucsd.edu/people/profiles/faculty/roediger/publications.html
# https://bjorklab.psych.ucla.edu/publications/
# https://learninglab.psych.purdue.edu/downloads/
```

This is surprisingly effective. For example:
- Roediger & Karpicke (2006) → freely available at `gwern.net/doc/psychology/spaced-repetition/2006-roediger.pdf`
- Karpicke & Blunt (2011) → freely available at `learninglab.psych.purdue.edu/downloads/2011/`
- Bjork (1994) → freely available at `gwern.net/doc/psychology/spaced-repetition/1994-bjork.pdf`
- Ericsson et al. (1993) → freely available at `whatahowler.com/wp-content/uploads/2016/11/`

**STEP 3: Search academic repositories and indexers.**

Several repositories host papers legally or via author-deposited copies:

```bash
# Try these in order:
# 1. Semantic Scholar: https://api.semanticscholar.org/graph/v1/paper/DOI:{doi}?fields=openAccessPdf
# 2. PubMed Central (for biomedical/psych): https://pmc.ncbi.nlm.nih.gov/
# 3. ERIC (for education): https://eric.ed.gov/ → files.eric.ed.gov/fulltext/
# 4. CORE: https://core.ac.uk/
# 5. Google Scholar: click "All N versions" to find free copies
# 6. ResearchGate: authors often upload their papers here
# 7. Academia.edu: same as ResearchGate

# Search: "{Paper Title}" filetype:pdf site:pmc.ncbi.nlm.nih.gov OR site:eric.ed.gov OR site:core.ac.uk
```

**STEP 4: Search for the paper using unique text from the abstract.**

If you know the abstract or a unique sentence from the paper, search for that exact text in quotes. This often finds copies on course websites, reading lists, and mirror sites that the above searches missed:

```bash
# Find a unique sentence from the abstract (not the title — titles match too many pages)
# Web search: "exact unique sentence from abstract" filetype:pdf

# For example, for Dunlosky et al. 2013:
# "we identified 10 learning techniques" "utility assessment" filetype:pdf
# This found the full 55-page paper hosted at acs.ist.psu.edu (a Penn State course site)
```

**Why this works:** Professors frequently upload required readings for their courses. These copies are indexed by search engines but not easily found by searching for the paper title alone (which returns the publisher's paywall page first).

**STEP 5: Try Gwern Branwen's archive.**

Gwern Branwen maintains an extensive archive of cognitive science, psychology, and AI papers at `gwern.net/doc/`. Many hard-to-find papers are there:

```bash
# Web search: site:gwern.net "{Paper Title}" OR "{First Author}" "{Year}"
# Direct browse: https://gwern.net/doc/psychology/
```

**STEP 6: Try the Wayback Machine.**

If a paper was once freely available but the link is now dead:

```bash
# Web search: site:web.archive.org "{Paper Title}" filetype:pdf
# Or construct directly:
# https://web.archive.org/web/*/{original-url-to-paper}.pdf
```

**STEP 7: Flag to the user (LAST RESORT ONLY).**

If ALL of the above steps fail, flag the paper to the user with a specific request:

```
⚠️ PAYWALLED SOURCE: Dunlosky et al. (2013), "Improving Students' Learning With 
Effective Learning Techniques," PSPI 14(1), 4-58. DOI: 10.1177/1529100612453266

I tried: arXiv (not available), author sites, Semantic Scholar, PubMed Central, 
ERIC, Google Scholar, Gwern archive, and abstract-text search. The paper is behind 
a SAGE paywall.

Can you provide access? Options:
1. Download via university library proxy and place in sources/dunlosky-2013-full/
2. Use Sci-Hub if you have access (I cannot access Sci-Hub)
3. Accept the 10-page American Educator summary as a substitute (loses detail)
```

Do NOT silently drop the source. Do NOT use training data as a substitute. Do NOT use the abstract as if it were the paper.

#### After Downloading: Verification and Extraction

**CRITICAL: Verify you got the actual paper, not a paywall page.**

```bash
# Step 1: Check file type (catches HTML disguised as PDF)
file "sources/paper-folder/paper.pdf"
# GOOD: "PDF document, version 1.4"
# BAD:  "HTML document text" — you got the paywall page, not the paper

# Step 2: Check page count (catches short summaries vs full papers)
pdfinfo "sources/paper-folder/paper.pdf" | grep Pages
# Compare against expected page count from the citation
# e.g., "Psychol Sci Public Interest 2013.14:4-58" = 55 pages (58-4+1)

# Step 3: Check file size (rough heuristic)
# Full papers: typically 200KB - 10MB
# Paywall HTML pages: typically 5KB - 100KB
# Short summaries: typically 100KB - 500KB for <10 pages
wc -c < "sources/paper-folder/paper.pdf"
```

**WARNING about `file` vs `pdfinfo`:** The `file` command can misreport page counts. It may say "8 pages" for a PDF that `pdfinfo` correctly reports as 55 pages. **Always use `pdfinfo` for page counts**, not `file`. If `pdfinfo` is not available, install it via `brew install poppler` (macOS) or `apt install poppler-utils` (Linux).

**Extract to markdown after verification:**

```bash
# Use Mistral OCR for the best quality extraction:
$(conda info --base)/envs/ai-learning-gems/bin/python scripts/mistral_ocr.py \
  "sources/paper-folder/paper.pdf" \
  -o "sources/paper-folder/"

# For very long papers (40+ pages), use --no-images to reduce API cost:
$(conda info --base)/envs/ai-learning-gems/bin/python scripts/mistral_ocr.py \
  "sources/paper-folder/paper.pdf" \
  -o "sources/paper-folder/" --no-images

# Verify extraction produced real content:
wc -c "sources/paper-folder/paper.md"
# Should be >10,000 chars for a real paper extraction
```

#### Folder Naming for Journal Papers

Use this pattern for journal papers (NOT the arXiv pattern):

```
sources/{first-author-lastname}-{year}-{short-descriptor}/
```

Examples:
- `sources/ericsson-1993-deliberate-practice/`
- `sources/roediger-karpicke-2006-testing-effect/`
- `sources/dunlosky-2013-full/`
- `sources/bjork-1994-desirable-difficulties/`
- `sources/karpicke-blunt-2011-retrieval-practice/`

**Do NOT use the arXiv `arxiv-{ID}` pattern for non-arXiv papers.** The naming convention must make it clear this is a journal paper, not an arXiv preprint.

#### Common Paywalled Publishers and Known Free-Access Patterns

| Publisher | Paywall Type | Known Free Access Patterns |
|---|---|---|
| **SAGE** (journals.sagepub.com) | Hard paywall; some open-access | SAGE sometimes provides free "stoken" URLs for high-impact papers. Check if the SAGE URL contains `/stoken/`. Also check author university profiles. |
| **APA** (psycnet.apa.org) | Hard paywall | Authors often host PDFs on their lab websites. Try `"{author name}" publications site:edu`. PsycINFO records sometimes link to PubMed Central. |
| **Elsevier** (sciencedirect.com) | Hard paywall; some open-access | Check if marked "Open Access" on ScienceDirect. Try `"{paper title}" site:ncbi.nlm.nih.gov/pmc` for PubMed Central versions. |
| **Springer** (link.springer.com) | Hard paywall; some open-access | Springer has a growing open-access portfolio. Check the paper page for a "Download PDF" button (available for OA papers). Try author university profiles. |
| **Wiley** (onlinelibrary.wiley.com) | Hard paywall | Try author university profiles and Google Scholar "All versions." |
| **Taylor & Francis** (tandfonline.com) | Hard paywall | Try author profiles. T&F sometimes has "free access" periods for high-impact papers. |
| **IEEE** (ieeexplore.ieee.org) | Hard paywall | Most IEEE papers have arXiv preprints. Try `"{paper title}" site:arxiv.org`. |
| **ACM** (dl.acm.org) | Paywall for non-members | ACM papers frequently have arXiv preprints. Many are also available via `dl.acm.org/doi/pdf/` for open-access papers. Author preprints are very common. |
| **Science** (science.org) | Hard paywall | Authors almost always host PDFs on their lab sites. The Purdue Learning Lab, for example, hosts all Karpicke papers. |
| **Nature** (nature.com) | Hard paywall | Check for "Shared" links. Authors host preprints. Try PubMed Central for biomedical papers. |
| **PNAS** (pnas.org) | Free after 6 months | Papers older than 6 months are freely available on PNAS directly. |

#### What To Do When You Cannot Get the Full Paper

If all 7 steps fail and the user cannot provide access:

1. **Check if an acceptable substitute exists.** Some papers have companion summary articles (like Dunlosky's 10-page *American Educator* version of the 55-page PSPI paper). These are less detailed but cover the main findings. Use the summary and note its limitations explicitly.
2. **Use the paper's abstract + citing papers.** The abstract gives the main finding. Search for papers that cite this paper and describe its methodology/results in their literature review sections. Those descriptions, being in other published papers, are more reliable than web search summaries.
3. **Drop specific claims you cannot verify.** If the TEXTBOOK-PLAN attributes a specific statistic to a paywalled paper and you cannot access the paper, drop the statistic. Write around it. A section without a specific number is better than a section with a number from training data that might be wrong.
4. **Never write from the abstract alone as if you read the paper.** Abstracts are summaries. They omit conditions, caveats, effect sizes, sample characteristics, and methodological details. If you only have the abstract, cite it as "(Author et al., Year, abstract)" and do not attribute detailed claims to the paper.

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

**Best approach**: `authenticated_extract.py` (handles JS rendering, downloads images locally, auto-derives output path)

```bash
# Any web page — auto-derives output to sources/{domain}/{path}/
conda activate ai-learning-gems && python scripts/authenticated_extract.py "https://example.com/article"

# Custom CSS selector for content area
conda activate ai-learning-gems && python scripts/authenticated_extract.py "https://example.com/article" -s "article"
```

**Faster fallback for known-static pages** (no browser, no JS): `webpage_to_md.py`

```bash
conda activate ai-learning-gems && python scripts/webpage_to_md.py "https://example.com/article" -o "sources/example.com/article/"
```

**Quick reading without local file** (for discovery, not archival):

```
read_url_content(url="https://example.com/article")
view_content_chunk(document_id="https://example.com/article", position=0)
```

---

### HTML-to-Markdown Conversion Tools (Detailed Guide)

**CRITICAL**: `read_url_content` just fetches raw HTML — you need a separate conversion step for Markdown.

#### Tool Comparison

| Tool | Install | Speed | Image Download | LaTeX Handling | Best For |
|------|---------|-------|----------------|----------------|----------|
| **authenticated_extract.py** | Already installed | ~15s | ✅ Downloads locally | Pass-through | **DEFAULT for all web content** |
| **webpage_to_md.py** | Already installed | ~3s | ✅ Downloads locally | Pass-through | Fast fallback for static pages |
| **Pandoc** | `brew install pandoc` | ~1s | ✅ (`--extract-media`) | ✅ Best | Complex documents, LaTeX accuracy |
| **Jina Reader** | API: `r.jina.ai/URL` | Fast | ❌ | Depends on source | Quick LLM input (no local save) |

#### Recommended Workflows

**For any web page (DEFAULT — handles JS, login, images):**
```bash
conda activate ai-learning-gems && python scripts/authenticated_extract.py "URL"
```

**For static pages when speed matters (no JS rendering):**
```bash
conda activate ai-learning-gems && python scripts/webpage_to_md.py "URL" -o "sources/{domain}/{path}/"
```

**For accuracy-critical with LaTeX:**
```bash
pandoc input.html -f html+tex_math_dollars -t markdown -o output.md
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

> **NOTE**: `webpage_to_md.py` is a faster fallback for static pages but does not handle JS rendering. Use `authenticated_extract.py` as the default.

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
│   ├── github.com/rasbt/LLMs-from-scratch/          ← GitHub repos (git clone)
│   │   ├── ch05/
│   │   └── ...
│   ├── substack.com/home/post/p-189051354/          ← authenticated_extract.py
│   │   ├── content.md
│   │   └── images/
│   ├── lilianweng.github.io/posts/2024-11-28-.../   ← authenticated_extract.py
│   │   ├── content.md
│   │   └── images/
│   ├── d2l.ai/chapter_attention.../vision-transformer/
│   │   ├── content.md
│   │   └── images/
│   └── source_index.yaml                            # Optional: global metadata
```

### Folder Naming Conventions

| Source Type | Folder Pattern | Example |
|-------------|---------------|---------|
| **ArXiv papers** | `sources/arxiv-{PAPER_ID}` | `sources/arxiv-2010.11929/` |
| **GitHub repos** | `sources/github.com/{OWNER}/{REPO}/` | `sources/github.com/rasbt/LLMs-from-scratch/` |
| **GitHub gists** | `sources/gist.github.com/{GIST_ID}/` | `sources/gist.github.com/abc123/` |
| **Blogs/sites** | `sources/{domain}/{path}/` | `sources/lilianweng.github.io/posts/2024-11-28-reward-hacking/` |
| **Substack** | `sources/substack.com/{path}/` | `sources/substack.com/home/post/p-189051354/` |
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
  extraction_method: authenticated_extract.py
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
| `scripts/authenticated_extract.py` | **DEFAULT for all web content** (JS, login, images) | ~15s |
| `scripts/webpage_to_md.py` | Fast fallback for static pages + images | ~3s |
| `scripts/onenote_pdf_to_markdown.py` | OneNote PDF exports (handwritten ink) → PNGs for vision LLM | ~2-20s |
| `scripts/mistral_ocr.py` | Rendered/typeset PDF→Markdown + images (NOT for handwriting) | ~5s/page |
| `git clone` | GitHub repos and gists | ~5s |
| `curl` | Single raw files, arXiv LaTeX source | <1s |
| `pandoc` | HTML→MD, DOCX→MD conversion | ~1s |
| `read_url_content` | Quick reading without local save | ~2s |
| `browser_subagent` | Complex multi-step navigation (last resort) | ~2 min |

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
