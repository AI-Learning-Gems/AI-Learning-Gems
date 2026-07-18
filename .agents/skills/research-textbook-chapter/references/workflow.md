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

=== MANDATORY RULES RE-READ (Do This FIRST) ===

**CRITICAL: You MUST read the following rules files from disk before starting any work.** Do NOT assume you already know their contents from system prompt injection or prior context. Rules may have been updated since the chat started. Read each file in full using your file-reading tool.

**Read ALL of these files now, before proceeding to Phase 1:**

| # | File to Read | What It Contains | When It Matters |
|---|---|---|---|
| 1 | `source-management.md` | Centralized source storage, folder naming, download commands, citation format, PDF figure conversion | Phases 1B, 1C, and 2 |
| 2 | `web-source-fetching.md` | Site-specific fetch strategies (arXiv, blogs, d2l.ai, etc.) | Phase 1B (downloading) |
| 3 | `high-quality-blogs.md` | Curated blog registry for research | Phase 1 (blog search) |
| 4 | `writing-style.md` | Citation format, inline citation rules | Phase 2 (writing the plan) |
| 5 | `quarto-conventions.md` | Folder structure, section file naming | Phase 2 (plan file structure) |
| 6 | `visualization-standards.md` | Image priority order, source image handling | Phase 1C (image inventory) |
| 7 | `python-env.md` | Conda environment activation | Any terminal commands |

**Do NOT skip this step.** The most common failure mode is an agent that "remembers" the rules from the system prompt but drifts from the actual file contents over the course of a long research session.

---

=== CENTRALIZED SOURCE STORAGE (CRITICAL) ===

**Follow all rules in `source-management.md`** for source storage, folder naming conventions, checking for existing sources, and PDF figure conversion. **Follow `web-source-fetching.md`** for site-specific fetch strategies.

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

**PHASE 2B - High-Quality Blog Search (MANDATORY — see `high-quality-blogs.md`):**

Search the curated blog registry for relevant posts. These blogs produce textbook-quality content. Spend at least 2-3 searches here:

```
site:lilianweng.github.io {TOPIC}
site:colah.github.io {TOPIC}
site:cameronrwolfe.substack.com {TOPIC}
site:magazine.sebastianraschka.com {TOPIC}
site:distill.pub {TOPIC}
site:gregorygundersen.com {TOPIC}
site:jalammar.github.io {TOPIC}
site:karpathy.github.io {TOPIC}
site:ruder.io {TOPIC}
site:huyenchip.com {TOPIC}
site:eugeneyan.com {TOPIC}
site:bair.berkeley.edu/blog {TOPIC}
```

Pick the blogs most relevant to the topic's domain. If you find an excellent blog not in the registry, add it following the instructions in `high-quality-blogs.md`.

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

**Follow the citation rules in `source-management.md`** (Citation Format section) and **`writing-style.md`** (Inline Citations section).

---

=== PHASE 1B: SOURCE DOWNLOADING (CRITICAL — Before Planning) ===

**CRITICAL RULE:** Do NOT write the TEXTBOOK-PLAN.md until ALL sources have been downloaded and saved locally. **EVERY SINGLE SOURCE referenced in the plan MUST have a local copy in `sources/`.** No exceptions. No `N/A`. No "referenced via web search." If a source cannot be downloaded after exhausting all fallbacks, DROP IT from the plan and find a replacement that CAN be downloaded.

### Why This Rule Is Absolute

The most common failure mode of this workflow is writing `N/A` in the Local Path column of the Source Processing Log and moving on. This defeats the entire purpose of source downloading:

1. **The writing agent cannot read `N/A`** — it has no content to work from, so it hallucinates or uses stale training data
2. **Claims become unverifiable** — without a local copy, there is no audit trail
3. **Links rot** — URLs change, paywalls appear, sites go down; local copies are the only reliable reference
4. **"I'll download it later" never happens** — the plan gets handed to the writing workflow, which has no download instructions

### The Source Download Checklist (MANDATORY)

**Before starting any downloads, build a checklist.** This is a simple text list that tracks every source and its download status. You will iterate over this checklist until every row shows OK.

```
=== SOURCE DOWNLOAD CHECKLIST ===
[ ] 1. arxiv-2010.11929 — ViT paper — arXiv LaTeX
[ ] 2. d2l.ai/chapter_attention.../vision-transformer — D2L tutorial — webpage_to_md.py
[ ] 3. lilianweng.github.io/posts/2022-06-09-vlm — Lilian Weng blog — authenticated_extract.py
[ ] 4. stevenpinker.com/.../pinker_2014.pdf — Pinker article — curl PDF
...
```

**Do NOT proceed to Phase 2 (writing the plan) until every checkbox is checked.**

### The Download-Verify-Retry Loop

For EACH source in the checklist, execute this loop:

```
FOR each source in checklist:
  1. DETERMINE expected local path (see source-management.md naming conventions)
  2. CHECK if it already exists and has content:
     ls "sources/{path}/" 2>/dev/null && echo "EXISTS" || echo "NEW"
  3. IF EXISTS and non-empty → mark [OK], move to next source
  4. IF NEW → ATTEMPT download using primary method (see web-source-fetching.md)
  5. VERIFY download succeeded:
     - Folder exists AND is non-empty
     - For web pages: markdown file has >500 characters (not a blank/error page)
     - For arXiv: .tex files present
     - For PDFs: file command confirms "PDF document", not "HTML document"
  6. IF verification FAILED → try FALLBACK methods (see cascade below)
  7. IF all fallbacks exhausted → mark [FAILED], log reason, find replacement source
  8. Mark [OK] when verified
```

### Readability Verification (MANDATORY — After Download)

**Downloading a source is not enough. The source must be in an LLM-readable text format.** A PDF sitting in the source folder is useless to the writing agent if it has never been extracted to markdown or text. This step ensures every source has readable content.

**After every source is downloaded and verified, check readability:**

```
FOR each source marked [OK]:
  1. LIST all files in the source folder
  2. CHECK: Does the folder contain at least one .md, .tex, or .txt file with >500 characters?
     - YES → source is readable, move on
     - NO → source needs extraction (see below)
  3. IF only PDFs exist (no .md, .tex, .txt):

     STOP. DO NOT GUESS THE EXTRACTION COMMAND.

     This is the most common failure pattern: the agent "remembers" or assumes
     which tool to use, gets it wrong, and either fails silently or produces
     garbage. The rules files are updated over time and contain a decision tree
     that the agent's training data may not reflect.

     a. Read web-source-fetching.md IN FULL using the Read tool (read the entire file, not just the top)
     b. Read source-management.md IN FULL using the Read tool
     c. ONLY AFTER reading both files, determine the correct extraction method
        based on what the rules say — not based on what you "think" the command is
     d. Execute the extraction command the rules specify
     e. VERIFY extraction produced a .md file with >500 characters of actual content
     f. If extraction fails, try the fallback methods listed in web-source-fetching.md

  4. IF the source is an HTML file that was saved but not converted to markdown:
     a. Read web-source-fetching.md first (same rule: do not guess)
     b. The rules will direct you to pandoc, authenticated_extract.py, or another tool
```

**Why this matters:** The Peyton Jones slides PDF (`peyton-jones.pdf`) was downloaded during research but never extracted to text. The writing agent's sub-agent could see the PDF existed but could not read its content, losing one of the most important sources for the chapter. This step prevents that failure mode.

**The rule is absolute:** Every source folder must contain at least one file in `.md`, `.tex`, or `.txt` format that an LLM can read with the Read tool. If only binary formats (PDF, DOCX, images) exist, extract them before proceeding.

### Fallback Cascade (Try ALL of these before giving up)

When the primary download method fails, try each fallback in order. Do NOT give up after one failure.

| Failure Scenario | Fallback 1 | Fallback 2 | Fallback 3 | Last Resort |
|---|---|---|---|---|
| **`webpage_to_md.py` fails** (SVG error, empty output, crash) | `webpage_to_md.py` with `--no-svgs` | `authenticated_extract.py "URL"` | `authenticated_extract.py "URL" -s "article, main"` | `WebFetch` tool to read content, then save manually |
| **`authenticated_extract.py` fails** (timeout, empty) | Retry with `-s "article"` or `-s "main"` | `webpage_to_md.py "URL"` (faster, no JS) | `curl -sL "URL" -o page.html` + manual extract | `WebFetch` tool |
| **`curl` for PDF returns HTML** (redirect, login wall) | Add `-L -H "User-Agent: Mozilla/5.0"` | `authenticated_extract.py "URL"` | Search for alternative URL (mirror, preprint, author's site) | Download the arXiv version instead if it exists |
| **arXiv LaTeX tar.gz fails** (no source available) | `curl -sL "https://arxiv.org/pdf/{ID}" -o paper.pdf` (get PDF) | `WebFetch` on `https://arxiv.org/html/{ID}v{N}` | `webpage_to_md.py "https://arxiv.org/html/{ID}v{N}"` | — |
| **Site returns 403/401** (paywall, auth required) | Search for preprint on arXiv, author's personal site, or Semantic Scholar | `authenticated_extract.py --profile` (if login profile exists) | Download related freely-available content that covers the same data | Drop source, find replacement |
| **Site returns 404/500** (down, moved) | Search Wayback Machine: `web.archive.org/web/*/URL` | Search for mirror/cached version | Search for the same content on a different URL | Drop source, find replacement |
| **Download succeeds but content is too short** (<500 chars) | The page likely requires JavaScript. Use `authenticated_extract.py` | Check if it's a landing page; download the actual PDF/paper instead | Try a different CSS selector: `-s "article"`, `-s ".post-content"` | — |

### Verification Commands

After ALL downloads, run this verification sweep:

```bash
# For each source folder, check it exists and has real content
for d in \
  "sources/arxiv-2010.11929/" \
  "sources/d2l.ai/chapter_attention.../vision-transformer/" \
  "sources/lilianweng.github.io/posts/2022-06-09-vlm/" \
; do
  if [ -d "$d" ] && [ "$(ls -A "$d" 2>/dev/null)" ]; then
    count=$(find "$d" -type f | wc -l | tr -d ' ')
    echo "OK ($count files): $d"
  else
    echo "FAILED: $d"
  fi
done
```

**If ANY source shows FAILED, go back and fix it before proceeding.** Re-run the fallback cascade. If the source truly cannot be obtained after all fallbacks, remove it from the source list and find a replacement source that CAN be downloaded.

### Rules for the Source Processing Log

The Source Processing Log in TEXTBOOK-PLAN.md has a "Local Path" column. The following rules are absolute:

1. **Every row MUST have a real `sources/...` path in the Local Path column.** No exceptions.
2. **`N/A` is NEVER acceptable in the Local Path column.** If you are tempted to write `N/A`, you have not finished downloading.
3. **"Referenced via web search" is NOT a local path.** Web search results are for discovery. The content must be saved locally.
4. **"General reference" or "General concept" rows** are allowed ONLY for sources that genuinely have no single downloadable artifact (e.g., a general concept like "the ABT framework" which comes from a book you cannot download, or a reference to a blog author's overall style). These should be rare (at most 2-3 per plan). Mark them as `General reference (Book title, Year)` or `General reference (author-blog-url)` with an explanation, NOT as `N/A`.
5. **Paywalled sources** that cannot be accessed must have a freely-available substitute downloaded instead. If the paper is on Nature but the preprint is on arXiv, download the arXiv version. Update the Local Path to point to the substitute.

### The "No N/A" Audit

**After writing the Source Processing Log (Part 1 of TEXTBOOK-PLAN.md), AND after writing each section plan that references sources, run this self-audit:**

1. Search the TEXTBOOK-PLAN.md file for the string `N/A`
2. If ANY match is found in a Local Path column, STOP and fix it
3. Search for the string `web search` in the Local Path column — same rule
4. Search for the string `referenced` in the Local Path column — same rule
5. Only proceed to the next part of the plan when the audit passes

```bash
# Run this after writing each part of TEXTBOOK-PLAN.md:
grep -n 'N/A' "{OutputFolder}/TEXTBOOK-PLAN.md" && echo "FAIL: Found N/A entries — fix before proceeding" || echo "PASS: No N/A entries"
```

### Why Download Before Planning?

1. **Prevents hallucination** — You can only plan around what you've actually read
2. **Enables specific section references** — Point to exact LaTeX sections or markdown headings
3. **Creates audit trail** — Every planned section traces to downloaded sources
4. **Avoids link rot** — Local copies persist even if URLs change

### The Source Downloading Workflow

**STEP 1: Build the Download Checklist**

After your web searches (Phase 1), build the checklist of ALL sources to download. For each source, determine:
- What type of source is it? (arXiv paper, GitHub docs, tutorial site, blog, PDF, etc.)
- What is the expected local path? (see `source-management.md` naming conventions)
- What is the primary download method? (see `web-source-fetching.md`)

**STEP 2: Check for Existing Sources (MANDATORY)**

Do NOT download a source if it already exists in the centralized repository.

```bash
ls "AI-Learning-Gems/sources/arxiv-2010.11929/" 2>/dev/null && echo "EXISTS" || echo "NEW"
```

**STEP 3: Download ALL Sources (with retry and fallback)**

Execute the Download-Verify-Retry Loop (above) for every source in the checklist. Use the Fallback Cascade when the primary method fails.

**STEP 4: Run Verification Sweep**

Run the verification command (above) across ALL source folders. Fix any FAILED entries.

**STEP 5: Convert PDF Figures to PNG**

Follow the PDF figure conversion rules in `source-management.md`.

**STEP 6: Validate Converted Images**

Follow the image validation rules in `source-management.md` (detect blank placeholders).

**STEP 7: Final Audit — Confirm Zero Failures**

```bash
# Final sweep: every source folder must exist and be non-empty
echo "=== FINAL DOWNLOAD AUDIT ==="
FAIL_COUNT=0
for d in [LIST ALL EXPECTED SOURCE FOLDERS]; do
  if [ -d "$d" ] && [ "$(ls -A "$d" 2>/dev/null)" ]; then
    echo "OK: $d"
  else
    echo "FAILED: $d"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
done
echo "=== Failures: $FAIL_COUNT ==="
```

**If FAIL_COUNT > 0, DO NOT proceed to Phase 2.** Go back and fix every failure using the fallback cascade, or replace the source.

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

> **⚠️ CRITICAL DISCLAIMER FOR THE WRITING AGENT ⚠️**
>
> This TEXTBOOK-PLAN.md is a **structural guide only**. It specifies: (a) which sections to write,
> (b) which sources to read for each section, and (c) what topics each section should cover.
>
> **The quotes, statistics, numbers, and specific claims in this plan are PLACEHOLDERS.**
> They were extracted from web search summaries during the research phase. Web search summaries
> are lossy, frequently inaccurate, and sometimes fabricate details that do not appear in the
> original source. A quote attributed to "Author X" in this plan may be paraphrased incorrectly,
> taken out of context, or entirely hallucinated by the search engine or LLM that produced the summary.
>
> **DO NOT copy any quote, statistic, or specific claim from this plan into the chapter.**
> Instead, use the source paths listed in each section's "Sources needed" table to read the
> actual source files. Every quote must come from your own reading of the source. Every number
> must be verified against the actual paper/post. If a source cannot be read (empty folder,
> missing file, PDF not converted), the claim MUST be dropped or the source must be downloaded
> and read before the claim can be included.
>
> **The plan tells you WHERE to look. The sources tell you WHAT to write.**

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
| 3 | [Source Name](URL) | [COMMUNITY] | `sources/domain.com/path/` | <date> | <today> | KEY: <1-2 sentence summary> |

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
1. [Subtopic A — with concrete example first (A-E structure)]
2. [Subtopic B — with second worked example]
3. [Subtopic C — with visualization]

**Key equations:** [List the main equations this section must include]
**Visualizations:** [List diagrams/plots needed: D2 concept map, hvPlot, downloaded images]
**Source images to embed:** [List specific images from the Source Image Catalog below, by path]
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

**Notation table:** [List all mathematical symbols that will be used across sections. For each symbol, provide four columns: **Symbol**, **Definition** (for functions, show signature like $f\colon A \to B$), **Valid Values** (the domain: integers, positive reals, all reals, etc.), and **Example** (a concrete value from the running example).]

**Concept map design:** [Describe the D2 concept map: nodes, connections, semantic classes]

**Prerequisite knowledge to recap:** [What prior knowledge needs brief refreshing]

**Common Misconceptions:** [List 3-5 common misconceptions discovered during research (or propose your own), which are common points of misunderstanding about the topic. One example is where the approach differs from previous approaches]

**Think Hard questions:** [List 3-5 deeper questions the chapter should help answer about the topic]

**Math Background assessment:** [Assess whether this chapter needs a Math Background appendix. List the mathematical concepts used across sections that are above 10th-grade math level (e.g., MLE, Bayesian posteriors, KL divergence, Fisher Information, variance-covariance matrices). For each, note which section(s) use it and whether the concept is derived from scratch in the chapter or assumed as prior knowledge. If 3+ concepts are assumed as prior knowledge and are above undergraduate intro-stats level, recommend adding a `_98-math-background.qmd` appendix. If the chapter is not heavily mathematical, note "Math Background appendix: not needed."]
```

---

### Plan Quality Checklist

Before finalizing the plan, verify:
- [ ] User query is included verbatim at the top
- [ ] **ZERO `N/A` entries in any Local Path column** — run `grep -n 'N/A' TEXTBOOK-PLAN.md` and confirm zero matches in source tables. If any match, STOP and fix.
- [ ] **Every source in the Source Processing Log has a `sources/...` local path** (except at most 2-3 "General reference" entries for books/concepts with no downloadable artifact)
- [ ] **Every source in every section-level "Sources needed" table has a `sources/...` local path** — no section plan may reference a source that was not downloaded
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
- [ ] Notation table covers all symbols across all sections, with four columns: Symbol, Definition, Valid Values, Example
- [ ] Misconceptions and difficult questions are captured
- [ ] Math Background assessment is present (either lists prerequisite concepts for appendix, or notes "not needed")
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

## STEP 2: Download ALL Sources (ZERO FAILURES REQUIRED)

**This is the most failure-prone step. Agents routinely skip downloads and write `N/A` instead. DO NOT DO THIS.**

1. **Build the download checklist** — list every source with its expected local path and primary download method
2. Check for existing sources in `AI-Learning-Gems/sources/` before EVERY download
3. **Execute the Download-Verify-Retry Loop** for each source (see Phase 1B):
   - Download using primary method
   - Verify: folder exists, non-empty, content is real (not HTML error page for PDFs, not <500 chars for web pages)
   - If failed: try Fallback 1, then 2, then 3, then Last Resort (see Fallback Cascade table in Phase 1B)
   - If ALL fallbacks exhausted: find a replacement source and download that instead
4. **Run the verification sweep** across all source folders — print OK/FAILED for each
5. **If any source shows FAILED: STOP. Fix it. Do not proceed.**
6. **Run the "No N/A" audit** — grep the checklist for any unresolved entries
7. Chat: "✓ Sources downloaded: [N] total ([M] new, [K] pre-existing). Zero failures."

**THE WORKFLOW IS NOT COMPLETE UNTIL EVERY SOURCE HAS A LOCAL COPY. There is no "good enough" — either every source is downloaded or the step is not done.**

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
