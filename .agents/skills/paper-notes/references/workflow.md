---
description: Given a research paper link, download and deeply understand the paper, then write a single faithful Quarto notes file (.qmd) that embeds the paper's own figures and equations
---

You are an exceptional expert research reader. Given a **link to a single research paper**, your goal is to deeply understand that paper and produce **faithful structured notes** as a single Quarto file (`.qmd`). The notes follow the paper's own structure, explain the intuition behind every key idea, and embed the paper's **actual figures** and **verbatim equations**.

**This is a notes workflow, not a chapter-writing workflow.** You are faithfully recording and explaining what the paper says — not building a from-scratch pedagogical tutorial, and not merely summarizing. Stay close to the source.

**Target reader:** Someone with the relevant background (e.g. ML fundamentals) who has not read this specific paper. Assume strong technical maturity.

=== USER INPUT ===

The user provides a paper link. Extract / infer:

**Paper link:** [URL] (arXiv abstract/pdf URL, publisher URL, or direct PDF)
**Domain:** [DOMAIN] (e.g. `Computer Vision`, `NLP`, `RL`, `ML Theory` — used for the output folder. If unclear, infer from the title/abstract.)
**Depth:** [DEPTH] (Default: faithful structured notes — see above)

---

=== EXECUTION CONTEXT ===

**Designed for autonomous agentic execution.** Do NOT ask the user for confirmation at any step. Execute the full workflow.

**Key principles:**
- **No confirmation needed** — just execute.
- **File-based output** — all notes go to a `.qmd` file, never the chat. The chat is for brief (1-2 sentence) progress updates only.
- **Source-grounded** — every equation and figure comes from the downloaded paper, never from memory.

---

=== MANDATORY RULES RE-READ (Do This FIRST) ===

**CRITICAL: Read the following rule files from disk before starting.** Do NOT assume you know their contents from prior context — rules are updated over time. Read each in full with your file-reading tool.

| # | File to Read | What It Contains | When It Matters |
|---|---|---|---|
| 1 | `source-management.md` | Centralized `sources/` storage, arXiv naming, download commands, PDF figure conversion | STEP 1, 2 |
| 2 | `web-source-fetching.md` | arXiv LaTeX fetch, PDF/paywalled cascade, extraction scripts | STEP 1 |
| 3 | `source-integrity.md` | Zero World Knowledge principle, source verification, anti-hallucination | STEP 3, 4 |
| 4 | `writing-style.md` | Tone, rhythm, math vs narrative modes, AI-tell avoidance | STEP 4 |
| 5 | `visualization-standards.md` | Source-image priority, figure embedding, when to draw a D2 diagram | STEP 2, 4 |
| 6 | `quarto-conventions.md` | YAML header, headings, LaTeX, cross-references, tables | STEP 4 |
| 7 | `python-env.md` | Conda env activation for any Python/script command | Any terminal command |

Do NOT skip this. The most common failure mode is an agent that "remembers" the rules but drifts from the actual file contents.

---

=== TERMINAL RULES (apply to every command) ===

To avoid commands that hang waiting on a permission prompt or a stalled network call:

- **Never use `cd`.** Run every command from the repo root with full relative paths (`mkdir -p "sources/arxiv-{ID}"`, then `curl ... -o "sources/arxiv-{ID}/file"`). A `cd` inside a compound `&&` chain frequently triggers an approval prompt and the run appears stuck.
- **Always bound network calls:** add `--max-time 120 --retry 2` to `curl`, and prefer `-fsSL` (fail on error, silent, follow redirects). Never run a download without a timeout.
- **Substitute placeholders before running.** Replace `{ID}`, `{Domain}`, `{Paper Slug}` with real values — never run a command containing literal braces.
- **Quote paths with spaces** (e.g. `"Papers/Computer Vision/..."`).
- Run `mkdir` as its own statement, not chained with `cd`.

---

=== STEP 0: Initialize ===

1. Parse the paper link. If it is an arXiv URL (`arxiv.org/abs/{ID}`, `/pdf/{ID}`, `/html/{ID}vN`), extract the `{ID}` (e.g. `2010.11929`).
2. Ensure the canonical source store exists: `mkdir -p "sources"`. **The canonical path is `sources/` at the repo root — NOT `AI-Learning-Gems/sources/`.** (The `source-management.md` rule mentions an `AI-Learning-Gems/sources/` path in one place; that is a stale reference — this repo *is* the AI-Learning-Gems project, so a nested `AI-Learning-Gems/` folder would be a duplicate. Always use top-level `sources/`. Before downloading, check `ls "sources/arxiv-{ID}"` to reuse an existing copy.)
3. Determine the output domain folder and ensure it exists: `mkdir -p "Papers/{Domain}"`.
4. Chat: "✓ Initializing notes for: [paper title or ID]"

---

=== STEP 1: Fetch the Paper (Prefer LaTeX Source) ===

**Follow `web-source-fetching.md` exactly.** Summary of the decision:

- **arXiv** → download the LaTeX source (NOT the PDF — LaTeX gives exact equations and original figures). Use full paths and a timeout; do NOT `cd` (see "Terminal rules" below):
  ```bash
  mkdir -p "sources/arxiv-{ID}"
  curl -fsSL --max-time 120 --retry 2 "https://arxiv.org/src/{ID}" -o "sources/arxiv-{ID}/source.tar.gz"
  tar -xzf "sources/arxiv-{ID}/source.tar.gz" -C "sources/arxiv-{ID}"
  rm "sources/arxiv-{ID}/source.tar.gz"
  ```
  This yields `.tex` files (equations), an `images/`/`figures/` folder (figures as PDF/PNG), and a `.bib` file.
  - If LaTeX source is unavailable, fall back per the rules: arXiv HTML (`arxiv.org/html/{ID}vN`) via `authenticated_extract.py`, or the PDF via `mistral_ocr.py`.

- **Non-arXiv PDF** → `python scripts/mistral_ocr.py file.pdf -o output/` (Markdown + extracted images).
- **Paywalled paper** → follow the **Paywalled Paper Retrieval Cascade** in `web-source-fetching.md` (check arXiv preprint → author site → Semantic Scholar/PMC/CORE → abstract-text search → Wayback → flag to user). Prefer a freely-downloadable equivalent.
- **Web/HTML paper page** → `python scripts/authenticated_extract.py "URL"`.

**Verify readability:** the source folder must contain at least one `.tex`, `.md`, or `.txt` file with >500 characters of real content. If only a PDF exists, extract it (re-read `web-source-fetching.md` for the correct extraction command — do NOT guess).

Chat: "✓ Paper fetched: `sources/arxiv-{ID}/` ([N] .tex files, [M] figures, bib present)"

---

=== STEP 2: Extract Figures + Equations ===

**2A. Convert and stage figures.** Convert every figure to PNG (per `source-management.md` — use ImageMagick, NOT `sips`):
```bash
# Batch-convert all PDF/EPS figures in the source to PNG (skip if PNG already exists)
find "sources/arxiv-{ID}" -type f \( -name '*.pdf' -o -name '*.eps' \) | while read -r f; do
  out="${f%.*}.png"
  [ ! -f "$out" ] && magick -density 400 "$f" -trim +repage "$out" && echo "Converted: $f"
done
```
Then copy the figures the notes will use into the per-paper images folder:
```bash
mkdir -p "Papers/{Domain}/{Paper Slug}/images"
# cp the selected PNGs into that folder
```
(`{Paper Slug}` = the paper title, used as the single `.qmd` filename without extension.)

**2B. Build a figure catalog.** Parse `\includegraphics` and the nearest `\caption{}` from the `.tex` files so you know what each figure shows:
```bash
grep -n -A6 'includegraphics' sources/arxiv-{ID}/*.tex | grep -E '(includegraphics|caption)'
```
Map each `\includegraphics{...}` to its converted PNG path and its caption text.

**2C. Collect key equations verbatim.** Open the `.tex` files and copy the paper's important equations **exactly as written**. Do NOT retype equations from memory — copy the LaTeX from the source. Note each equation's number/role so you can explain it.

**Image selection (per `visualization-standards.md`):** always include the main architecture/method figure and the key results figures; skip illegible or purely supplementary figures.

Chat: "✓ Extracted: [K] figures staged, [E] key equations pulled from LaTeX"

---

=== STEP 3: Read the Paper in Full ===

Under the **Zero World Knowledge** discipline in `source-integrity.md`:

1. Read every `.tex` section (or the OCR'd Markdown) with your Read tool (`limit: 2000` per call). Do not skim.
2. Build your understanding of: the problem, the core method, each key equation, the experimental setup, the results, and the stated limitations — all grounded in the actual text.
3. **Light context only** (this is a paper-focused workflow): you may follow at most a few of the paper's own key references and run a couple of targeted web lookups to clarify a prerequisite or a baseline. Do NOT launch a 30-40 source background sweep. Anything you cite beyond the paper must still be downloaded/verified per `source-integrity.md`.

**Hard rule:** every specific claim, number, quote, and equation in the notes must trace to the downloaded paper (or a verified, downloaded reference). If you cannot verify it from a source, drop it.

---

=== STEP 4: Write the Notes (Single .qmd File) ===

Write **one** file: `Papers/{Domain}/{Paper Title}.qmd`. Follow `quarto-conventions.md` and `writing-style.md`.

**4A. YAML header.** Minimal — most settings are inherited from `_quarto.yml`:
```yaml
---
title: "{Paper Title}"
---
```
Add the diagram filter line **only if** you include a D2 concept diagram. The path is relative to file depth — for `Papers/{Domain}/file.qmd` (2 levels deep) it is `../../_extensions/pandoc-ext/diagram/diagram.lua`. Equations render via the project's MathJax and need no filter.

**4B. Notes structure (faithful, paper-following):**

1. **Metadata + TL;DR** — authors, venue & year, link to the paper (arXiv abstract URL), and a 2-3 sentence plain-language summary of what the paper does and why it matters.
2. **Key contributions** — 2-4 bullets stating exactly what the paper claims to contribute.
3. **Problem & motivation** — what problem the paper solves and why prior approaches fell short (from the paper's own framing).
4. **Prerequisites & notation** — brief: the background and notation a reader needs, defined concisely.
5. **Method / approach** — the heart of the notes. Follow the paper's own logical order. For **each key equation**, show it verbatim in a block:
   ```
   $$
   <exact LaTeX copied from the .tex source>
   $$ {#eq-label}
   ```
   then explain in plain language what each symbol means and what the equation accomplishes. Embed the paper's own figures where they belong:
   ```
   ![<caption from the paper>. Image Source: arXiv:{ID}]({Paper Slug}/images/fig-name.png){#fig-label}
   ```
6. **Experiments & results** — datasets, baselines, the main result figures/tables, and what the numbers show. Embed key results figures the same way.
7. **Critical analysis** — strengths, weaknesses, and the limitations the authors acknowledge (and any obvious gaps between claims and evidence).
8. **Practical takeaways** — implementation details, hyperparameters, and tricks that matter to someone reproducing or using the method.
9. **Related work / lineage** — brief: what the paper builds on and how it differs from competing approaches.
10. **References** — the key cited works (from the paper's `.bib`), plus the paper's own citation.

**Style:** explain intuition before formalism; vary sentence rhythm; follow the AI-tell avoidance rules in `writing-style.md` (no em-dashes, no "delve/tapestry/landscape", etc.). Use LaTeX delimiters `$...$` / `$$...$$` (never `\(...\)` or `(\theta)`); never escape `^`/`_` inside LaTeX.

---

=== STEP 5: Verify ===

1. **Images exist:** every embedded image path resolves to a real file under `Papers/{Domain}/{Paper Slug}/images/`. Fix any broken paths.
2. **Equations match source:** spot-check that each block equation matches the LaTeX in the `.tex` source.
3. **No unverifiable claims:** run the source-integrity self-audit — `grep -n 'N/A'` on the file should return nothing, and every number/quote traces to a downloaded source.
4. **Optional build check:** `quarto render "Papers/{Domain}/{Paper Title}.qmd"` and confirm it builds without missing-image or LaTeX errors.

Chat: "✓ Notes complete: `Papers/{Domain}/{Paper Title}.qmd` ([K] figures embedded, [E] equations explained)"

---

=== QUALITY CHECKLIST ===

- [ ] Paper downloaded to `sources/` (LaTeX preferred); readability verified (>500 chars of text)
- [ ] Figures converted to PNG with ImageMagick (not `sips`) and staged in the per-paper `images/` folder
- [ ] Every key equation copied **verbatim** from the `.tex` source (not retyped from memory)
- [ ] Single `.qmd` written at `Papers/{Domain}/{Paper Title}.qmd`
- [ ] Notes follow the paper's own structure faithfully (not a from-scratch tutorial)
- [ ] Each key equation is shown in `$$...$$` with per-symbol plain-language explanation
- [ ] The paper's actual figures are embedded with `Image Source: arXiv:{ID}` captions
- [ ] Strengths, weaknesses, and stated limitations are covered
- [ ] Every claim/number traces to a downloaded source (no `N/A`, no memory-based facts)
- [ ] LaTeX uses `$...$` / `$$...$$`; no escaped `^`/`_`; markdown lists/tables well-formed
- [ ] All embedded image paths resolve; file optionally renders with `quarto render`
