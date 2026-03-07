---
description: Research a technical topic deeply, download all sources, and create a TEXTBOOK-PLAN.md for a future writing workflow
---

You are an exceptional expert educational content researcher. Your goal is to deeply research a technical/mathematical topic and produce a comprehensive research plan (`TEXTBOOK-PLAN.md`) that a writing agent can later use to produce a textbook chapter.

**Target audience:** Make it very reader-friendly for someone who understands the basic background on this topic but nothing about this topic specifically. Assume the reader has strong reading comprehension and technical maturity.

=== USER INPUT ===

The user will describe what they want to understand in plain text. You must extract the following:
**Topic:** [TOPIC]
**What I already know:** [PRIOR_KNOWLEDGE] (default: ask the user what they know, based on prior topics which you suggest)
**What I need to understand:** [LEARNING_GOALS] (Default: assume deep understanding)
**Target depth:** [UNDERGRADUATE / GRADUATE / RESEARCHER] (Default: assume Graduate)
**Output folder:** [OUTPUT_FOLDER] (e.g., `Statistics/Bayesian Credible Intervals`)

---

=== EXECUTION CONTEXT ===

**This prompt is designed for agentic execution** in Cursor, Windsurf, or similar coding-agent IDEs with web search capabilities. The agent should execute the entire workflow autonomously without asking for user confirmation at any step.

**Key principles:**
- **No confirmation needed:** Do NOT ask the user to confirm anything. Just execute.
- **Web search access:** You have full access to web search tools. Use them extensively.
- **File-based output:** All content goes to files, never the chat.
- **Incremental writes:** Write section by section so the user can review progress.

---

=== CENTRALIZED SOURCE STORAGE (CRITICAL) ===

**All sources are stored in `AI-Learning-Gems/sources/` — NOT in each chapter folder.**

This is a shared, centralized repository. The same source can be referenced by multiple chapters.

### Source Folder Naming Conventions

| Source Type | Folder Pattern | Example |
|-------------|---------------|---------|
| **arXiv papers** | `sources/arxiv-{PAPER_ID}` | `sources/arxiv-2010.11929/` |
| **Blog posts** | `sources/{domain}/{path}/` | `sources/lilianweng.github.io/posts/2022-06-09-vlm/` |
| **d2l.ai chapters** | `sources/d2l.ai/{chapter-path}/` | `sources/d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer/` |
| **HuggingFace docs** | `sources/huggingface.co/docs/{path}/` | `sources/huggingface.co/docs/transformers/model_doc/vit/` |
| **PyTorch docs** | `sources/pytorch.org/{path}/` | `sources/pytorch.org/docs/stable/generated/torch.nn.MultiheadAttention/` |
| **Other sites** | `sources/{domain}/{path}/` | `sources/distill.pub/2021/gnn-intro/` |

**Blog/site URL → folder name rules:**
1. Strip `https://` and `http://`
2. Strip `www.`
3. Use the remaining URL path as the folder path
4. Store main content as `content.md` inside the folder
5. Store images in `images/` subfolder

**arXiv rules:**
1. Use `arxiv-{PAPER_ID}` (hyphenated)
2. Download LaTeX source: `curl -sL "https://arxiv.org/src/{PAPER_ID}" -o source.tar.gz && tar -xzf source.tar.gz`
3. Contains `.tex` files, `images/`, `.bib`

### Checking for Existing Sources

**BEFORE downloading any source, check if it already exists:**

```bash
ls "AI-Learning-Gems/sources/arxiv-2010.11929/" 2>/dev/null && echo "EXISTS" || echo "NEW"
```

If a source already exists, skip downloading and reference the existing path.

---

=== PHASE 1: DEEP RESEARCH (MANDATORY) ===

### CRITICAL: Question All Assumptions

**BEFORE WRITING ANYTHING:** You MUST first investigate whether the basic premises of the topic are correctly understood. Many topics contain implicit assumptions that may be outdated, incomplete, or wrong.

**Assumption Validation Process:**
1. Identify ALL assumptions embedded in the topic and learning goals
2. Research each assumption independently before addressing the main content
3. If any assumption is incorrect, note this prominently for the plan
4. Provide context for why misconceptions might exist (outdated textbooks, oversimplified explanations, etc.)

### Core Research Instructions

**MANDATORY DEEP SEARCH:** You MUST perform extensive searches using all available tools. This is NON-NEGOTIABLE. Do not rely solely on your training data under any circumstances.

**Use the current year:** Always search for the absolute best and most recent resources as of the current year. Include the year in your searches (e.g., "[TOPIC] tutorial 2025", "[TOPIC] best explanation 2025").

**Search Methodology (4 Phases):**

**PHASE 1 - Assumption & Foundation Validation:**
- Search each foundational assumption independently
- Use multiple search terms for each assumption
- Look for evidence both supporting AND contradicting common beliefs
- Search for historical context and how understanding has evolved

**PHASE 2 - Authoritative Source Collection:**
- Find university course materials (lecture notes, slides, problem sets)
- Locate established textbook excerpts and chapters
- Search for original papers that introduced key concepts
- Find official documentation for algorithms/methods

**PHASE 3 - Intuition & Explanation Mining:**
- Search "[TOPIC] intuition explained"
- Search "[TOPIC] visual explanation" and "[TOPIC] geometric interpretation"
- Find blog posts with novel framings that "click"
- Locate highly-upvoted Stack Exchange explanations
- Search "best explanation of [TOPIC]"

**PHASE 4 - Examples, Misconceptions & Edge Cases:**
- Search "[TOPIC] worked examples" and "[TOPIC] solved problems"
- Search "[TOPIC] common mistakes" and "[TOPIC] misconceptions"
- Search "[TOPIC] what students get wrong"
- Find competition problems with detailed solutions (for math/algorithms)

### Minimum Source Requirements

- Collect information from at least **30-40 different sources** across all search phases
- CRITICAL: Don't search from the same angle! Explore different aspects:
  - Foundational/definitional sources
  - Intuitive explanation sources
  - Worked example sources
  - Visualization sources
  - Common misconception sources
  - Advanced/edge case sources
- Include at least **4 source types**: authoritative/academic, tutorial/educational, visual/interactive, community/discussion
- For each major claim, verify across at least 2 independent sources
- Every URL must be real and accessible — never hallucinate links

**Source Hierarchy (search in this order):**
1. **PRIMARY AUTHORITATIVE:** University courses (MIT OCW, Stanford, Berkeley), established textbooks, peer-reviewed papers, official documentation
2. **SECONDARY AUTHORITATIVE:** Tutorial sites (3Blue1Brown, StatQuest, Distill.pub), well-maintained wikis, technical blogs from recognized experts
3. **TERTIARY SOURCES:** Stack Exchange, Reddit discussions, GitHub discussions — CLEARLY LABEL these as community sources

---

### Citation Format

**Inline Citations:** Every significant factual claim needs a citation:
`[Source Name](URL) (Written: <date>, Accessed: <date>)`

**Exact Quotes:** For major claims, include the exact sentence from the source:
```
From [Source Name](URL):

> "Exact quote from the source text [...] continuing relevant portion."
```

**Source Quality Indicators:**
- [TEXTBOOK] for established textbooks
- [ACADEMIC] for peer-reviewed papers
- [COURSE] for university course materials
- [TUTORIAL] for educational blogs/videos
- [COMMUNITY] for forums/discussions

---

=== PHASE 1B: SOURCE DOWNLOADING (CRITICAL — Before Planning) ===

**CRITICAL RULE:** Do NOT write the TEXTBOOK-PLAN.md until all authoritative sources have been downloaded and saved locally.

### Why Download Before Planning?

1. **Prevents hallucination** — You can only plan around what you've actually read
2. **Enables specific section references** — Point to exact LaTeX sections or markdown headings
3. **Creates audit trail** — Every planned section traces to downloaded sources
4. **Avoids link rot** — Local copies persist even if URLs change

### The Source Downloading Workflow

**STEP 1: Identify Sources (from PHASE 1 Research)**

After your web searches, you'll have a list of URLs. For each, determine:
- What type of source is it? (arXiv paper, GitHub docs, tutorial site, etc.)
- What is the best fetch method? (see lookup table in `.agent/rules/web-source-fetching.md`)

**STEP 2: Check for Existing Sources (MANDATORY)**

Do NOT download a source if it already exists in the centralized repository.

```bash
# 1. Determine the expected folder name (e.g., sources/arxiv-2010.11929/)
# 2. Check if it exists and has content
ls "AI-Learning-Gems/sources/arxiv-2010.11929/source.tar.gz" 2>/dev/null && echo "EXISTS" || echo "NEW"
```

**STEP 3: Download ONLY NEW Sources**

Use the centralized `AI-Learning-Gems/sources/` directory. Refer to `.agent/rules/web-source-fetching.md` for site-specific strategies. **Always verify the folder does not exist before running the download command.**

| Source Type | Command (Run ONLY if folder is NEW) |
|-------------|---------|
| **arXiv papers** | `mkdir -p "sources/arxiv-{ID}" && cd "sources/arxiv-{ID}" && curl -sL "https://arxiv.org/src/{ID}" -o source.tar.gz && tar -xzf source.tar.gz && rm source.tar.gz` |
| **d2l.ai chapters** | `mkdir -p "sources/d2l.ai/{chapter-path}" && curl -sL "https://raw.githubusercontent.com/d2l-ai/d2l-en/master/{path}.md" -o "sources/d2l.ai/{chapter-path}/content.md"` |
| **Blog posts** | `mkdir -p "sources/{domain}/{path}" && trafilatura -u "URL" -of markdown > "sources/{domain}/{path}/content.md"` |
| **HuggingFace docs** | `read_url_content(url)` + `view_content_chunk(doc_id, position)`, save to `sources/huggingface.co/{path}/content.md` |
| **Static pages** | `read_url_content` or `curl`, save to `sources/{domain}/{path}/content.md` |

**STEP 4: Convert PDF Figures to PNG**

Many arXiv papers include figures as PDFs. Quarto cannot embed PDFs inline, so they must be converted to PNG.

> **⚠️ IMPORTANT:** PDF figures from arXiv are full-page PDFs with LaTeX margins. You MUST render at high DPI AND trim whitespace. The preferred single-command approach uses ImageMagick + Ghostscript.

```bash
# PREFERRED: ImageMagick (renders + trims in one step)
# Install: brew install imagemagick ghostscript
magick -density 400 images/figure.pdf -trim +repage images/figure.png

# FALLBACK 1: pdftoppm (if ImageMagick/Ghostscript unavailable)
# Install: brew install poppler
# NOTE: pdftoppm renders the full page including margins — you MUST trim afterward
pdftoppm -png -r 400 -singlefile images/figure.pdf images/figure
# Then trim with magick (if available) or accept the whitespace:
magick images/figure.png -trim +repage images/figure.png

# FALLBACK 2: sips (macOS-only, last resort)
# WARNING: sips CANNOT rasterize vector PDFs — it produces blank white PNGs.
# Only use sips if the PDF contains embedded raster images, not vector graphics.
sips -s format png images/figure.pdf --out images/figure.png
```

**Batch convert all PDF figures in an arXiv source:**
```bash
find "sources/arxiv-{ID}/" \( -name '*.pdf' \) \( -path '*/images/*' -o -path '*/figs/*' -o -path '*/figures/*' -o -path '*/resources/*' \) | while read f; do
  outfile="${f%.pdf}"
  [ ! -f "${outfile}.png" ] && magick -density 400 "$f" -trim +repage "${outfile}.png" && echo "Converted: $f → ${outfile}.png"
done
```

**STEP 5: Validate Converted Images (Detect Blank Placeholders)**

> **⚠️ CRITICAL: arXiv LaTeX sources often include blank/white placeholder PNGs.** The real figure content is in the PDF version. After conversion, you MUST validate that PNGs actually contain visible content. A PNG that is a valid image file (correct dimensions, correct format) but renders as entirely white/transparent is a *placeholder*, not a real figure.

```bash
# Check for suspiciously small PNGs (likely blank placeholders):
# Real figures are typically >20KB. Blank placeholders are <10KB.
find "sources/arxiv-{ID}/" \( -path '*/images/*' -o -path '*/figs/*' -o -path '*/figures/*' \) -name '*.png' -size -10k | while read f; do
  pdf="${f%.png}.pdf"
  if [ -f "$pdf" ]; then
    echo "SUSPECT BLANK: $f ($(wc -c < "$f" | tr -d ' ') bytes) — PDF exists, re-converting..."
    magick -density 400 "$pdf" -trim +repage "$f"
    echo "  → Re-converted: now $(wc -c < "$f" | tr -d ' ') bytes"
  else
    echo "WARNING: $f is <10KB and no PDF fallback exists — may be blank"
  fi
done
```

**Why this happens:** arXiv LaTeX compilation uses PDF figures natively. Some authors include low-quality or empty PNG versions as fallbacks. The `\includegraphics` in the `.tex` file typically references the figure *without* an extension (e.g., `\includegraphics{figures/teaser}`), and LaTeX picks the PDF. When we download the source, we get both the blank PNG and the real PDF. Always prefer converting from PDF via ImageMagick. Do NOT use `sips` on macOS; it cannot rasterize vector PDFs.

**STEP 6: Verify Downloads**

```bash
find AI-Learning-Gems/sources/ -type f | head -30
```

---

### Source Selection Criteria

**Prioritize sources that:**
1. ✅ Are authoritative (original papers, official docs, university courses)
2. ✅ Contain equations, code, or precise technical details
3. ✅ Include figures and diagrams you can reference
4. ✅ Have different perspectives (theory, intuition, implementation)
5. ✅ Cover edge cases and common misconceptions

**Minimum source set for a chapter:**
- 1-2 original/foundational papers (arXiv LaTeX)
- 1-2 authoritative tutorials (d2l.ai, official docs)
- 2-3 intuition-focused explanations (blogs, videos transcripts)
- 1-2 implementation references (code documentation)

---

=== PHASE 1C: SOURCE IMAGE INVENTORY (CRITICAL — After Downloading) ===

**CRITICAL RULE:** After downloading and converting sources, you MUST build an image inventory before creating the plan. The writing agent cannot use images it doesn't know about.

### Why Inventory Images?

1. **Papers contain the best figures** — Original architecture diagrams, attention maps, scaling plots, etc. are canonical and should be reused rather than recreated.
2. **Captions provide context** — LaTeX `\caption{}` text tells you exactly what each figure shows.
3. **The writing agent needs concrete paths** — Without file paths in TEXTBOOK-PLAN.md, the writer has no way to find relevant images.

### The Image Inventory Workflow

**STEP 1: Find all image files in downloaded sources**

```bash
# List all image files across all source folders
find AI-Learning-Gems/sources/ \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.svg' \) | sort
```

**STEP 2: Convert PDF figures to PNG (if not already done)**

```bash
# Batch convert — skip if PNG already exists
find AI-Learning-Gems/sources/ \( -name '*.pdf' \) \( -path '*/images/*' -o -path '*/figs/*' -o -path '*/figures/*' -o -path '*/resources/*' \) | while read f; do
  outfile="${f%.pdf}"
  [ ! -f "${outfile}.png" ] && magick -density 400 "$f" -trim +repage "${outfile}.png" && echo "Converted: $f"
done
```

**STEP 3: Extract captions from LaTeX sources**

For each arXiv source, parse `\includegraphics` and `\caption{}` pairs:

```bash
# Find all \includegraphics and nearby \caption in .tex files
grep -n -A5 'includegraphics' sources/arxiv-{ID}/*.tex | grep -E '(includegraphics|caption)'
```

Then use `view_file` to read the surrounding context for each figure. Build a mapping:
- `\includegraphics{images/model_scheme}` → `sources/arxiv-2010.11929/images/model_scheme.png`
- `\caption{Model overview...}` → Caption text

**STEP 4: Build the Source Image Catalog**

Create a table mapping each useful image to its caption and the section(s) where it should appear. This goes into TEXTBOOK-PLAN.md (see template below).

**Selection criteria for which images to include:**
- ✅ Architecture diagrams (ALWAYS include — these are canonical)
- ✅ Attention maps / feature visualizations (essential for interpretability sections)
- ✅ Scaling/performance plots (essential for comparison sections)
- ✅ Training curves / ablation results
- ❌ Low-resolution or illegible images
- ❌ Supplementary figures that don't add to the chapter's narrative
- ❌ Figures whose content is better conveyed by a custom D2 diagram or hvPlot

---

=== PHASE 2: CREATE TEXTBOOK-PLAN.md (INCREMENTAL WRITES) ===

After all sources are downloaded and verified, create `TEXTBOOK-PLAN.md` inside the **chapter subfolder** (the folder that will hold the section `.qmd` files).

### Plan File Location

```
{OutputFolder}/
├── [Chapter Name].qmd              ← Index file (created later by the writing workflow)
└── [Chapter Name]/                  ← Chapter subfolder
    ├── TEXTBOOK-PLAN.md             ← Created by this workflow
    └── (section .qmd files will be created by the writing workflow)
```

**CRITICAL:** `TEXTBOOK-PLAN.md` goes INSIDE the chapter subfolder (e.g., `Transformers/Vision Transformers/TEXTBOOK-PLAN.md`), NOT in the parent output folder (`Transformers/TEXTBOOK-PLAN.md`). This keeps the plan co-located with the section files it describes.

### CRITICAL: Incremental Writing Strategy

**DO NOT write the entire TEXTBOOK-PLAN.md in a single tool call.** This file is typically hundreds of lines long. Writing it all at once leads to truncation, lost context, and lower quality.

**Instead, write TEXTBOOK-PLAN.md in sequential parts using tools like `write_to_file` for the first part and `replace_file_content` (append) for subsequent parts:**

| Part | What to Write | Tool |
|------|---------------|------|
| **Part 1** | Header + User Query + Source Processing Log | `write_to_file` (creates the file) |
| **Part 2** | Chapter Overview + Hook & Running Example Design | `replace_file_content` (append to end) |
| **Part 3a** | `## Section Plan` heading + Section 1 plan | `replace_file_content` (append to end) |
| **Part 3b** | Section 2 plan | `replace_file_content` (append to end) |
| **Part 3c** | Section 3 plan | `replace_file_content` (append to end) |
| **Part 3d** | Section 4 plan | `replace_file_content` (append to end) |
| **Part 3e** | Section 5 plan + Section 6 plan (if applicable) | `replace_file_content` (append to end) |
| **Part 4** | Source Image Catalog + Section 99 (Closing) plan | `replace_file_content` (append to end) |
| **Part 5** | Cross-Cutting Concerns (notation, concept map, misconceptions, think-hard questions) | `replace_file_content` (append to end) |

**How to append to the end of the file:** Use `replace_file_content` where `TargetContent` is the last line of the file (or a unique trailing marker) and `ReplacementContent` is that same last line followed by the new content. Alternatively, just use `write_to_file` with `Overwrite: false` if you are creating new content at the end.

**Chat after each part:**
> ✓ **TEXTBOOK-PLAN.md Part 1:** Header + 15 sources logged
> ✓ **TEXTBOOK-PLAN.md Part 2:** Chapter overview + hook designed
> ✓ **TEXTBOOK-PLAN.md Part 3a:** Section 1 (Patch Embeddings) planned
> ... etc.

This incremental approach ensures:
1. Each section plan gets the agent's full attention and context
2. The user can review progress incrementally
3. No content is lost to truncation or context limits
4. The agent can re-read downloaded sources between sections for accuracy

### TEXTBOOK-PLAN.md Template

The plan MUST follow this exact structure. Each block below corresponds to one incremental write.

---

#### Part 1: Header + Source Processing Log

```markdown
# TEXTBOOK-PLAN: [Topic Name]

## User Query
> [Exact user query, verbatim]

**Topic:** [TOPIC]
**Prior Knowledge:** [PRIOR_KNOWLEDGE]
**Learning Goals:** [LEARNING_GOALS]
**Target Depth:** [DEPTH]
**Output Folder:** [OUTPUT_FOLDER]

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log ([N] sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [Source Name](URL) | [ACADEMIC] | `sources/arxiv-XXXX/` | <date> | <today> | KEY: <1-2 sentence summary> |
| 2 | [Source Name](URL) | [TUTORIAL] | `sources/d2l.ai/path/` | <date> | <today> | KEY: <1-2 sentence summary> |
| 3 | [Source Name](URL) | [COMMUNITY] | N/A | <date> | <today> | IRRELEVANT: <reason> |

:::
```

---

#### Part 2: Chapter Overview + Hook

```markdown
---

## Chapter Overview

**Total sections:** [5-6]
**Estimated total length:** [7,500-12,000 words]
**Running example:** [Describe the running example/character that will be used throughout]

### Hook & Running Example Design

[4-5 paragraphs describing the hook: stakeholder, motivation, puzzle/paradox, and how this example will recur in each section]

**Hook Image:** [Identify a canonical technical diagram that bridges the hook story and the chapter's core technical concept. The story is easy to understand — what the reader needs is an image that visually connects the familiar narrative to the unfamiliar technical architecture. Search d2l.ai, original papers, and authoritative sources. Specify: source path, what it shows, and why it's the right motivating image for the hook. This image will appear in the hook and may reappear later with detailed explanation.]
```

---

#### Parts 3a-3e: Section Plans (ONE SECTION PER WRITE)

**Write each section plan as a separate file operation.** This is the most important part of the incremental strategy — each section plan should get the agent's full attention.

Before writing each section plan, **re-read the relevant downloaded sources** (`view_file` on the local copies) to ensure the plan references specific content accurately.

```markdown
---

## Section Plan

### Section 1: [Title] {#sec-section-name}

**File:** `_01-[section-name].qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** [What the reader should understand after this section]
**Running example application:** [How the running example is used/extended in this section]

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| [ViT Paper] | `sources/arxiv-2010.11929/` | `03_method.tex` lines 1-30 | Patch embedding equations |
| [D2L ViT Tutorial] | `sources/d2l.ai/.../content.md` | Section "Patch Embedding" | Implementation code |

**Content outline:**
1. [Subtopic A — with concrete example first (A-G structure)]
2. [Subtopic B — with second worked example]
3. [Subtopic C — with visualization]

**Key equations:** [List the main equations this section must include]
**Visualizations:** [List diagrams/plots needed: D2 concept map, hvPlot, downloaded images]
**Source images to embed:** [List specific images from the Source Image Catalog below, by path]
**Self-explanation prompts:** [List 1-2 reflection questions for this section]
```

Then in the NEXT write, append Section 2 (without repeating the `## Section Plan` heading):

```markdown
---

### Section 2: [Title] {#sec-section-name}

[Same structure as Section 1]
```

**Continue for all 5-6 sections, one write per section.**

---

#### Part 4: Source Image Catalog + Section 99

```markdown
---

## Source Image Catalog

**These are images from the downloaded sources that should be embedded in the chapter.**
The writing agent should copy these to `{Chapter}/images/` and embed them in the appropriate sections.

| # | Source Image Path | Caption (from paper) | Relevant Section(s) | Notes |
|---|---|---|---|---|
| 1 | `sources/arxiv-XXXX/images/model_scheme.png` | "Model overview. We split an image into..." | §2 Architecture | Architecture diagram — MUST include |
| 2 | `sources/arxiv-XXXX/images/attention_distance.png` | "Size of attended area by head..." | §3 Why ViTs Work | Shows local vs global attention |
| 3 | ... | ... | ... | ... |

**Priority order for visuals (the writing agent should follow this):**

1. **Source images from downloaded papers** — already in `sources/`. Canonical, authoritative, and high-quality.
2. **D2 diagrams** — for concept maps, flowcharts, and structural diagrams.
3. **Python/hvPlot** — for data visualizations, distributions, and function plots.
4. **Web downloads** — for images not in sources/ (search and download during writing).
5. **generate_image** — only as a last resort for custom illustrations.

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,000-1,500 words

**Content:**
1. Key takeaways (5-7 bullet points)
2. Completed concept map (D2 diagram)
3. Retrieval practice questions (5-7, with answers in collapsed callout)
4. Common mistakes section
5. Curated resource list (best intuitive resources — verified URLs only)
```

---

#### Part 5: Cross-Cutting Concerns

```markdown
---

## Cross-Cutting Concerns

**Notation table:** [List all mathematical symbols that will be used across sections]

**Concept map design:** [Describe the D2 concept map: nodes, connections, semantic classes]

**Prerequisite knowledge to recap:** [What prior knowledge needs brief refreshing]

**Common Misconceptions:** [List 3-5 common misconceptions discovered during research (or propose your own), which are common points of misunderstanding about the topic. One example is where the approach differs from previous approaches]

**Think Hard questions:** [List 3-5 deeper questions the chapter should help answer about the topic]
```

---

### Plan Quality Checklist

Before finalizing the plan, verify:
- [ ] User query is included verbatim at the top
- [ ] All downloaded sources are listed in the Source Processing Log with local paths
- [ ] **EXACTLY 5-6 body sections** planned (plus introduction and closing). If more subtopics exist, merge related ones rather than adding more sections. The total chapter should be 7,500-12,000 words.
- [ ] Each section is 1,500-2,000 words
- [ ] Each section specifies WHICH sources it needs and WHICH specific parts
- [ ] Running example is designed and its use in each section is specified
- [ ] **Hook image is identified** — a canonical technical diagram that bridges the hook story and the core technical concept (source path specified)
- [ ] Key equations are identified for each section
- [ ] Visualizations are planned for each section
- [ ] **Source Image Catalog is present** with concrete file paths, captions, and section assignments
- [ ] Each section lists which source images to embed (under "Source images to embed")
- [ ] Notation table covers all symbols across all sections
- [ ] Misconceptions and difficult questions are captured
- [ ] Closing section includes all required elements

---

=== CHAT OUTPUT STYLE ===

Keep chat messages brief. Example:

> ✓ **Research phase 1 complete:** 15 sources identified across 4 angles
>
> ✓ **Sources downloaded:** 8 sources to `sources/`
>   - `sources/arxiv-2010.11929/` (ViT paper, 7 .tex files)
>   - `sources/d2l.ai/.../content.md` (411 lines)
>   - ...
>
> ✓ **TEXTBOOK-PLAN.md created:** 6 sections planned, ~10,000 words total
>
> Next step: Run `/write-textbook-chapter` pointing to `{OutputFolder}/[Chapter Name]/TEXTBOOK-PLAN.md`

---

=== AGENTIC WORKFLOW (Execute Autonomously) ===

**CRITICAL: Do NOT ask the user for confirmation at any step. Execute the entire workflow autonomously.**

## STEP 0: Initialize

1. Extract user input (topic, prior knowledge, goals, depth, output folder)
2. Create output folder if it doesn't exist: `mkdir -p "{OutputFolder}"`
3. Ensure `sources/` exists: `mkdir -p "AI-Learning-Gems/sources"`
4. Chat: "✓ Initializing research for: [TOPIC]"

## STEP 1: Deep Research (Web Searches)

1. Execute all 4 search phases (Foundation, Authoritative, Intuition, Examples)
2. Track all URLs found for downloading
3. Chat: "✓ Research phase complete: [N] sources identified"

## STEP 2: Download Sources

1. Check for existing sources in `AI-Learning-Gems/sources/` before EVERY download
2. Download ONLY new sources using appropriate methods (see `.agent/rules/web-source-fetching.md`)
3. Verify all downloads (ensure folder is not empty)
4. Chat: "✓ Sources processed: [N] new downloaded, [M] already existed in repository"

## STEP 2B: Image Inventory (CRITICAL — Do NOT skip)

1. Convert all PDF figures to PNG in downloaded sources (batch `magick` command)
2. List all image files across all source folders
3. Parse LaTeX `\includegraphics` + `\caption{}` pairs from `.tex` files
4. Select the most relevant images for the chapter topic
5. Build the Source Image Catalog table (image path, caption, target section)
6. Chat: "✓ Image inventory: [N] images found, [M] selected for chapter"

## STEP 3: Read Sources & Create Plan (INCREMENTAL — Part by Part)

**CRITICAL: Do NOT write the entire TEXTBOOK-PLAN.md in one shot.** Follow the incremental writing strategy from PHASE 2.

1. Read through each downloaded source (`view_file` on local copies)
2. Identify the best content for each planned section
3. Design the running example
4. **CRITICAL: Plan MUST contain exactly 5-6 body sections** (plus introduction and closing). If the topic has more subtopics, merge related ones.
5. **Write Part 1:** Header + Source Processing Log → `write_to_file` (creates `TEXTBOOK-PLAN.md`)
6. **Write Part 2:** Chapter Overview + Hook → append to file
7. **Write Parts 3a-3e:** Each section plan as a separate write. **Before each section, re-read the relevant downloaded sources** to ensure accuracy.
8. **Write Part 4:** Source Image Catalog + Section 99 plan → append to file
9. **Write Part 5:** Cross-Cutting Concerns → append to file
10. Chat after each part with brief progress update
11. Final chat: "✓ TEXTBOOK-PLAN.md complete: [N] sections, ~[W] total words, [I] source images mapped"

## STEP 4: Handoff

1. Tell the user the plan is ready
2. Suggest: "Next step: Run `/write-textbook-chapter` pointing to `{OutputFolder}/[Chapter Name]/TEXTBOOK-PLAN.md`"
