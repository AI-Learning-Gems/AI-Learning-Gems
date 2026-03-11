---
description: Convert a PDF (handwritten notes, textbooks, papers) into faithful Markdown+LaTeX .qmd files
---

You are a PDF-to-Quarto conversion agent. Your goal is to **faithfully reproduce** the content of a PDF as Markdown with embedded LaTeX, organized into Quarto `.qmd` files. This is a **transcription** workflow, not a writing workflow: the output must match the source PDF as closely as possible. Do not rephrase, reorder, or editorialize.

=== USER INPUT ===

The user will provide:
- **PDF path:** Path to the PDF file to convert
- **Output location:** (Optional) Where to put the output. Default: a subfolder next to the PDF, named after the PDF.

=== EXECUTION CONTEXT ===

**This prompt is designed for agentic execution** in Cursor, Windsurf, Antigravity, or similar coding-agent IDEs with vision capabilities. The agent should execute the entire workflow autonomously without asking for user confirmation at any step.

**Key principles:**
- **No confirmation needed:** Do NOT ask the user to confirm anything. Just execute.
- **Faithfulness over style:** Reproduce the PDF content exactly. Writing style rules (`writing-style.md`) do NOT apply. Even if the content has poor grammar or unusual formatting, preserve it.
- **File-based output:** All content goes to `.qmd` files, never the chat.
- **Parallel extraction:** Use subagents for parallel page conversion (max 5 concurrent) for handwritten PDFs only.

---

=== MANDATORY RULES RE-READ ===

**Read these files before starting:**

| # | File to Read | What It Contains | When It Matters |
|---|---|---|---|
| 1 | `web-source-fetching.md` | PDF extraction strategies (OneNote vs rendered) | Step 0 (PDF analysis) |
| 2 | `quarto-conventions.md` | Folder structure, heading levels, LaTeX formatting | Step 3 (file creation) |
| 3 | `visualization-standards.md` | D2 diagram template, hvplot/bokeh two-cell pattern | Step 2A (recreating handwritten plots) |
| 4 | `python-env.md` | Conda environment activation | Any terminal commands |

**Rules that do NOT apply to this workflow:**
- `writing-style.md` — This is transcription, not authoring. Reproduce content as-is.
- `exercise-syntax.md` — Not relevant for transcription.

---

=== WHAT "FAITHFUL REPRODUCTION" MEANS ===

1. **Text:** Reproduce all text content verbatim. Preserve the author's wording, sentence structure, and paragraph breaks.
2. **Equations:** Convert all mathematical content to LaTeX. Use `$...$` for inline and `$$...$$` for display equations. Numbered equations get `{#eq-label}` tags.
3. **Headings:** Preserve the heading hierarchy from the PDF. Map chapter titles to `##`, sections to `###`, subsections to `####`.
4. **Lists:** Preserve numbered and bulleted lists exactly.
5. **Tables:** Reproduce tables in Markdown table format.
6. **Figures/Diagrams (rendered PDFs):** Mistral OCR extracts these automatically. They are saved in the `images/` folder and referenced in the markdown.
7. **Figures/Diagrams (handwritten PDFs):** Recreate plots and diagrams programmatically where possible (see Step 2A). For complex figures that cannot be recreated, crop from the page PNG.
8. **Color annotations / highlights:** Note these as **bold** or use `:::` callout blocks for boxed/highlighted content.
9. **Footnotes:** Preserve as Markdown footnotes `[^1]`.
10. **Cross-references:** If the PDF references "Section 3.2" or "Equation (5)", preserve these as-is in the text (they can be converted to `@sec-` / `@eq-` references in a later editing pass).

---

=== STEP 0: Analyze the PDF ===

Run the analysis script to determine the PDF type:

```bash
$(conda info --base)/envs/ai-learning-gems/bin/python -c "
import fitz
doc = fitz.open('PDF_PATH')
print(f'Pages: {len(doc)}')
for i in range(min(len(doc), 5)):
    page = doc[i]
    rect = page.rect
    text = page.get_text()
    drawings = page.get_drawings()
    images = page.get_images()
    print(f'Page {i}: {rect.width:.0f}x{rect.height:.0f}pt ({rect.width/72:.1f}x{rect.height/72:.1f}in)')
    print(f'  Text: {len(text)} chars, Drawings: {len(drawings)}, Images: {len(images)}')
print(f'File size: {doc.stream.tell() if hasattr(doc, \"stream\") else \"?\"} bytes')
"
```

**Classify the PDF into two categories:**

| Category | How to Identify | Extraction Strategy |
|---|---|---|
| **A: Handwritten** (OneNote exports, tablet notes) | Single giant page (>20in tall), <200 chars extractable text, thousands of vector drawings | `onenote_pdf_to_markdown.py` to PNGs, then IDE vision LLM (with subagents) |
| **B: Rendered / Typeset** (textbooks, papers, reports, slides) | Standard pages, has text layer (>200 chars/page) | `mistral_ocr.py` on the full PDF (single API call, extracts text + images) |

Chat: "Analyzed: [Category A/B], [N] pages, [type description]"

---

=== STEP 1: Run Extraction ===

### Category A: Handwritten PDFs

```bash
$(conda info --base)/envs/ai-learning-gems/bin/python scripts/onenote_pdf_to_markdown.py "PDF_PATH" -o "OUTPUT_DIR"
```

This splits the giant page into virtual page PNGs in `OUTPUT_DIR/images/`. The script auto-detects OneNote-style giant pages vs standard multi-page PDFs.

Proceed to Step 2A for vision LLM conversion.

### Category B: Rendered / Typeset PDFs (any length)

```bash
$(conda info --base)/envs/ai-learning-gems/bin/python scripts/mistral_ocr.py "PDF_PATH" -o "OUTPUT_DIR"
```

Mistral OCR processes the entire PDF in a **single API call**. It handles all pages internally and extracts both text and embedded images automatically. The output is a single Markdown file with `<!-- Page N -->` separators and an `images/` folder with extracted figures.

For extremely large files that exceed the 50 MB API limit, split the PDF into chunks using `pypdf` and run `mistral_ocr.py` on each chunk.

**For long documents (>50 pages):** Before running Mistral OCR, extract PNGs for the first 10 pages to check for a table of contents:
```bash
$(conda info --base)/envs/ai-learning-gems/bin/python scripts/onenote_pdf_to_markdown.py "PDF_PATH" -o "OUTPUT_DIR" --page-limit 10
```
Read the TOC images to plan how to organize the output into multiple `.qmd` files (used in Step 3). Then run Mistral OCR on the full PDF.

**After Mistral OCR completes, skip directly to Step 3** (no per-page LLM conversion needed).

Chat: "Mistral OCR complete: [N] pages extracted to `OUTPUT_DIR/`"

---

=== STEP 2A: Convert Handwritten Pages via Vision LLM (Category A only) ===

This step applies ONLY to Category A (handwritten) PDFs. Category B PDFs are already fully converted by Mistral OCR in Step 1.

### Conversion Prompt

When processing each page image with the IDE's vision LLM, use this prompt:

```
Convert this handwritten page to Markdown with embedded LaTeX. Be completely faithful to the source content.

Rules:
- Render ALL mathematical equations in LaTeX: $...$ for inline, $$...$$ for display equations.
- Preserve the document structure exactly: headings, numbered/bulleted lists, definitions, theorems.
- Use > blockquotes for boxed theorems, definitions, propositions, or highlighted results.
- Reproduce ALL text verbatim. Do not rephrase, summarize, or omit anything.
- Use standard Markdown tables for any tabular content.
- For color annotations or highlights, use **bold** to indicate emphasis.
- If text is unclear or ambiguous, make your best attempt and add a comment: <!-- UNCLEAR: description -->
- For plots and diagrams, see the special instructions below.
```

### Reproducing Handwritten Plots and Diagrams

When the handwritten notes contain **plots** or **diagrams**, the agent should attempt to **recreate** them programmatically so the `.qmd` file renders the same visual content. Read `visualization-standards.md` for the exact syntax.

- **Plots and data visualizations** (function curves, distributions, scatter plots, bar charts): Recreate using **hvplot with bokeh backend**, following the two-cell pattern from `visualization-standards.md`. Read the axis labels, data points, and curve shapes from the handwritten plot and reproduce them programmatically with Python code cells in the `.qmd` file.

- **Structural diagrams** (flowcharts, concept maps, decision trees, architecture diagrams): Recreate using **D2 diagrams** with the ELK engine and the Modern SaaS theme from `visualization-standards.md`.

- **Mathematical diagrams** (geometric constructions, annotated number lines, Venn diagrams): Recreate using D2 or describe in text with LaTeX if the diagram is simple enough.

- **Complex or artistic figures** that cannot be faithfully recreated programmatically: Extract the relevant region from the page PNG and save it as a separate image file. Reference it with `![Description](images/fig_pageN.png)`.

The goal is to produce a `.qmd` file that **renders** the same visual content as the handwritten original, not just reference static image files.

### Per-Page Processing via Subagents (MANDATORY)

**CRITICAL ANTI-PATTERN TO AVOID:** Do NOT read all page images first and then write all markdown files. This causes context overload and quality degradation. Each page must be **processed completely** (read image, convert, write file) before moving to the next.

**ALWAYS use subagents for page conversion.** Each subagent processes its assigned pages sequentially: read one image, convert it, write the output file, then move to the next image. This ensures each page gets the LLM's full attention.

**Launch subagents in parallel (max 5 concurrent).** Distribute pages evenly across subagents:

- **≤5 pages:** 1 subagent per page (all run in parallel)
- **6-15 pages:** 5 subagents, each gets 1-3 pages
- **16-25 pages:** 5 subagents, each gets 3-5 pages

Each subagent receives:
- Its assigned page image paths (e.g., page_005.png, page_006.png, page_007.png)
- The conversion prompt above
- The output directory path (`OUTPUT_DIR/pages/`)

Each subagent does this **for each page, one at a time:**
1. Read the page image
2. Convert it to Markdown+LaTeX using the vision LLM
3. Recreate any plots/diagrams as hvplot or D2 code
4. Write the result to `OUTPUT_DIR/pages/page_NNN.md`
5. Move to the next assigned page

### Fallback: Sequential Processing in the Main Agent

Some IDEs (notably Antigravity) restrict subagent file access, preventing subagents from reading image files outside an allowlist. If subagent spawning fails or subagents cannot read the page images, **fall back to sequential processing in the main agent context.**

The rules remain the same: process one page at a time. Read the image, convert it, write the output file, then move to the next page. Do NOT read multiple images before writing.

```
For each page_NNN.png in OUTPUT_DIR/images/:
  1. Read page_NNN.png (image file)
  2. Convert to Markdown+LaTeX
  3. Write result to OUTPUT_DIR/pages/page_NNN.md
  4. (next page)
```

**Output structure after all pages are processed:**

```
OUTPUT_DIR/
├── images/
│   ├── page_000.png
│   ├── page_001.png
│   └── ...
├── pages/
│   ├── page_000.md
│   ├── page_001.md
│   └── ...
├── PROMPT.md
└── (final .qmd files created in Step 3)
```

Chat: "Converting pages: [N] pages across [M] subagents"
Chat (after completion): "All pages converted: [N] markdown files in `OUTPUT_DIR/pages/`"

---

=== STEP 3: Stitch and Organize into .qmd Files ===

### For Category A (Handwritten, any length) — stitch per-page files

Concatenate all per-page markdown files into a single `.qmd` file using the CLI:

```bash
# Create the output .qmd file with YAML header
cat > "OUTPUT_DIR/FILENAME.qmd" << 'HEADER'
---
title: "DOCUMENT TITLE"
---

HEADER

# Append all page markdown files in order
for f in $(ls "OUTPUT_DIR/pages/"page_*.md | sort); do
    echo "" >> "OUTPUT_DIR/FILENAME.qmd"
    echo "<!-- $(basename $f .md) -->" >> "OUTPUT_DIR/FILENAME.qmd"
    echo "" >> "OUTPUT_DIR/FILENAME.qmd"
    cat "$f" >> "OUTPUT_DIR/FILENAME.qmd"
done
```

Then do a **light cleanup pass** on the stitched file:
- Remove duplicate content from page overlaps (OneNote extractions have a 1-inch overlap)
- Fix any broken LaTeX that spans page boundaries
- Ensure heading hierarchy is consistent (one `#` title, `##` for sections, `###` for subsections)

### For Category B (Rendered, short documents up to ~50 pages) — rename Mistral output

Mistral OCR already produces a single Markdown file. Convert it to `.qmd` by adding a YAML header:

```bash
# Prepend YAML header to the Mistral OCR output
{ echo '---'; echo 'title: "DOCUMENT TITLE"'; echo '---'; echo ''; cat "OUTPUT_DIR/FILENAME.md"; } > "OUTPUT_DIR/FILENAME.qmd"
```

### For Category B (Rendered, long documents >50 pages) — split into chapters

Use the TOC discovered in Step 1 to organize into a folder-based Quarto structure:

```
OUTPUT_DIR/
├── Document Title.qmd              ← Index file with {{< include >}} statements
└── Document Title/
    ├── _01-chapter-name.qmd        ← Pages 1-15
    ├── _02-chapter-name.qmd        ← Pages 16-32
    ├── _03-chapter-name.qmd        ← Pages 33-48
    ├── ...
    └── images/                     ← Extracted figures from Mistral OCR
```

For each chapter/section identified from the TOC:
1. Determine which `<!-- Page N -->` markers correspond to this chapter
2. Extract that page range from the Mistral OCR output into a separate `.qmd` file
3. Create the index file with `{{< include >}}` statements

**Index file template (for long documents):**

```yaml
---
title: "Document Title"
filters:
  - ../_extensions/pandoc-ext/diagram/diagram.lua
---
```

```markdown
{{< include "Document Title/_01-chapter-name.qmd" >}}

{{< include "Document Title/_02-chapter-name.qmd" >}}

{{< include "Document Title/_03-chapter-name.qmd" >}}
```

Chat: "Stitched into [N] .qmd file(s) at `OUTPUT_DIR/`"

---

=== STEP 4: Cleanup ===

1. **Remove intermediate files:**
   ```bash
   rm -rf "OUTPUT_DIR/pages/"
   rm -f "OUTPUT_DIR/PROMPT.md"
   ```

2. **Keep the page PNGs** in `OUTPUT_DIR/images/` for Category A (they serve as reference for the handwritten originals). For Category B, Mistral OCR already extracted the relevant figures; the page PNGs from `--page-limit 10` (if any) can be removed.

3. **Final structure:**

   **Handwritten (Category A) or short rendered (Category B, ≤50 pages):**
   ```
   OUTPUT_DIR/
   ├── Document Name.qmd        ← Single .qmd file with all content
   └── images/                  ← Page PNGs (Cat A) or extracted figures (Cat B)
       └── ...
   ```

   **Long rendered (Category B, >50 pages):**
   ```
   OUTPUT_DIR/
   ├── Document Name.qmd        ← Index file with {{< include >}}
   └── Document Name/
       ├── _01-chapter-name.qmd
       ├── _02-chapter-name.qmd
       └── images/
           └── ...
   ```

Chat: "Cleanup complete. Output at `OUTPUT_DIR/`"

---

=== STEP 5: Verification Pass ===

Quick scan of the final `.qmd` file(s) for common issues:

1. **LaTeX integrity:** Search for unmatched `$` or `$$` delimiters
2. **Heading hierarchy:** Verify one `##` per section file (for long documents), consistent nesting
3. **Figure references:** Verify all `![...]()` paths point to existing files
4. **Completeness:** Compare page count vs content. Flag any pages that may have been missed.
5. **Handwritten plots:** Verify that recreated plots/diagrams (hvplot, D2) render correctly

Chat: "Verification complete. [N] pages faithfully converted to [M] .qmd file(s) at `OUTPUT_DIR/`"

---

=== OUTPUT FOLDER CONVENTION ===

The output folder is created as a **subfolder next to the PDF**, with the same name as the PDF (minus the extension):

```
Statistics/Hypothesis Testing/
├── 10. Evaluating Hypothesis tests.pdf          ← Original PDF
├── 10. Evaluating Hypothesis tests/             ← Output folder (same name as PDF)
│   ├── 10. Evaluating Hypothesis tests.qmd      ← Converted content
│   └── images/
│       ├── page_000.png
│       └── ...
├── 11. The practice of Hypothesis testing.pdf
├── 11. The practice of Hypothesis testing/
│   ├── 11. The practice of Hypothesis testing.qmd
│   └── images/
│       └── ...
```

If the user provides an explicit output path with `-o`, use that instead.

---

=== DOWNSTREAM USAGE ===

The output of this workflow is a faithful transcription. It serves as **input** to other workflows:

- **`/research-textbook-chapter`** — Uses the transcription as a source for planning a textbook chapter
- **`/write-textbook-chapter`** — May reference the transcription as source material
- **Manual editing** — The user can edit the `.qmd` files directly to refine the content

The transcription preserves the original structure and content so that downstream workflows have complete, accurate source material to work with.

---

=== QUALITY CHECKLIST ===

- [ ] PDF type correctly identified (Category A or B)
- [ ] Category A: all pages extracted as PNGs, converted via vision LLM
- [ ] Category A: handwritten plots recreated as hvplot/D2 where possible
- [ ] Category B: Mistral OCR run on full PDF, images extracted automatically
- [ ] Equations rendered in LaTeX (`$...$` inline, `$$...$$` display)
- [ ] Headings, lists, tables preserved
- [ ] Figures extracted/recreated and referenced
- [ ] Intermediate files cleaned up (pages/ folder removed)
- [ ] Final .qmd file(s) have proper YAML header
- [ ] For long documents: index file with `{{< include >}}` statements
- [ ] Content is faithful to the original (no rephrasing, no omissions)
