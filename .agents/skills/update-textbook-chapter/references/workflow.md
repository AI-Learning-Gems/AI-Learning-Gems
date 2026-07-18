---
description: Update an existing textbook chapter with new sources, integrating new information surgically while preserving scope and coherence
---

You are an expert technical editor performing a **content update** on an existing textbook chapter. Your goal is to incorporate new sources and information into the chapter while preserving its scope, learning objectives, narrative flow, and existing quality.

**This is NOT a rewrite.** You are updating a living document, not starting over. Think of yourself as a journal editor handling a revision: the structure stands, and new material is woven in where it serves the existing learning objectives.

=== USER INPUT ===

The user will provide:

1. **Path to the existing chapter's index `.qmd` file** (e.g., `Preference Learning/Ranking Preferences.qmd`)
2. **New source URLs** — a list of arXiv papers, blog posts, documentation pages, PDFs, etc.
3. **Optional: brief note** on what these sources cover or why they are relevant

---

=== EXECUTION CONTEXT ===

**This prompt is designed for agentic execution.** Execute the entire workflow autonomously without asking for user confirmation at any step, UNLESS a scope expansion is required (see Phase 3).

**Key principles:**
- **No confirmation needed** (except for scope expansion): Do NOT ask the user to confirm anything. Just execute.
- **File-based output:** All edits go directly to `.qmd` files and `TEXTBOOK-PLAN.md`, not the chat.
- **Surgical edits:** Use targeted `StrReplace` operations, not full-file rewrites.
- **Preserve existing content:** The chapter's structure, running example, learning objectives, and section count remain unchanged unless the user explicitly approves a change.

---

=== MANDATORY RULES RE-READ (Do This FIRST) ===

**CRITICAL: You MUST read the following rules files from disk before starting any work.** Do NOT assume you already know their contents from system prompt injection or prior context. Rules may have been updated since the chat started. Read each file in full using your file-reading tool.

**Read ALL of these files now, before proceeding to Phase 1:**

| # | File to Read | What It Contains | When It Matters |
|---|---|---|---|
| 1 | `source-integrity.md` | Zero World Knowledge principle, training data boundary (what requires a source vs. what doesn't), source readability verification, sub-agent rules, observed failure patterns, proof-of-work protocol | **Every phase.** This is the most critical rules file. It prevents hallucinated content from entering the chapter. |
| 2 | `writing-style.md` | Tone, sentence rhythm, emphasis hierarchy, AI tell avoidance, mathematical vs narrative modes, inline citations | Phase 5 (writing new paragraphs), Phase 6 (coherence pass) |
| 3 | `quarto-conventions.md` | Heading levels, LaTeX formatting, cross-references, image paths, callout syntax | Phase 5 (section edits), Phase 6 (cross-references) |
| 4 | `visualization-standards.md` | Image priority order, source image handling, D2 diagrams, hvplot patterns | Phase 5 (adding new visualizations) |
| 5 | `source-management.md` | Centralized source storage, folder naming, download commands, citation format | Phase 2 (downloading new sources) |
| 6 | `web-source-fetching.md` | Site-specific fetch strategies, decision tree for choosing extraction method | Phase 2 (downloading new sources) |
| 7 | `high-quality-blogs.md` | Blog attribution rules | Phase 5 (attributing blog-sourced content) |
| 8 | `exercise-syntax.md` | Exercise div syntax | Phase 5 (to avoid breaking existing exercises during edits) |
| 9 | `python-env.md` | Conda environment activation | Any terminal commands |

**Per-section re-read and proof-of-work (MANDATORY):** Before editing each section file in Phase 5, you must:
1. Re-read `source-integrity.md`, `writing-style.md`, and `exercise-syntax.md` from disk.
2. Produce a **Rules Application Analysis** in the chat (see `source-integrity.md` for the full protocol). This is not optional. It is your proof that you actually engaged with the rules before editing.

**Shared rules (MUST follow):**
- **Writing style:** Follow `writing-style.md`
- **Visualizations:** Follow `visualization-standards.md`
- **Quarto format:** Follow `quarto-conventions.md`
- **Source handling:** Follow `source-management.md` and `web-source-fetching.md`

---

=== PHASE 1: UNDERSTAND EXISTING CHAPTER ===

**Goal:** Build a complete mental model of the chapter's scope and structure before touching anything.

**Steps:**

1. **Read the index `.qmd` file** — identify all section files from `{{< include >}}` statements
2. **Read `TEXTBOOK-PLAN.md`** — extract:
   - Learning objectives
   - Section-by-section plan (what each section covers)
   - Source Processing Log (what sources already exist)
   - Source Image Catalog
3. **Read each section file** — for each, note:
   - Main topic and subsections
   - Key claims and their citations
   - Running example usage (how the running example appears in this section)
   - Notation introduced
   - Approximate word count
4. **Build the Chapter Scope Fingerprint:**

```
CHAPTER SCOPE FINGERPRINT
==========================
Title: [chapter title]
Learning Objectives:
  1. [LO1]
  2. [LO2]
  ...
Sections:
  _01-introduction: [topic, ~word count]
  _02-...: [topic, ~word count]
  ...
Running Example: [brief description]
Key Notation: [list of symbols introduced]
Total Sources: [count]
Total Word Count: ~[estimate]
```

**Chat output:** Print the scope fingerprint for the user's reference.

---

=== PHASE 2: PROCESS NEW SOURCES ===

**Goal:** Download, read, and extract key information from each new source. Every source must be both downloaded AND readable before any content from it enters the chapter.

**Steps:**

1. **Check for existing sources** — for each URL, check if it already exists in `AI-Learning-Gems/sources/` (see `source-management.md`). If it exists, skip downloading.

2. **Download new sources** — follow the rules in `source-management.md` and `web-source-fetching.md` for site-specific strategies.

3. **Verify readability of EVERY new source (MANDATORY).** For each source folder:
   - List all files in the folder.
   - Check: does it contain at least one `.md`, `.tex`, or `.txt` file with >500 characters?
   - If NO: **STOP. Read `web-source-fetching.md` and `source-management.md` IN FULL** before running any extraction. Follow their decision tree. Do NOT guess the command.
   - Verify the extraction produced readable content (>500 chars of real text).
   - See `source-integrity.md` (Source Readability Verification) for the full protocol.

4. **Read each new source IN FULL using the Read tool.** Not a summary. Not the first page. The actual file, all lines. For long sources (>500 lines), read in chunks but read ALL chunks. See `source-integrity.md` (Zero World Knowledge Principle): if you cannot find a claim in a source you personally read, the claim does not exist for you.

5. **For each new source, extract:**
   - Title, authors, year, venue — **as written in the source itself**, not from the URL or user's description
   - Key claims, methods, or results (3-5 bullet points) — with exact line numbers
   - How it relates to the chapter's existing content (preliminary assessment)
   - Notable figures or diagrams worth including

6. **Image inventory** — for new arXiv sources, convert PDF figures to PNG following `source-management.md` (PDF figure conversion section).

**Chat output:** Brief summary of each new source (1-2 sentences each), noting: title, actual authors, and the file path where readable content was verified.

---

=== PHASE 3: SCOPE TRIAGE (Critical Anti-Scope-Creep) ===

**Goal:** Classify every piece of new information against the chapter's existing learning objectives. This is the most important phase for preventing scope creep.

**The chapter's learning objectives are the constitution.** Every proposed addition must answer: "Which learning objective does this serve?"

### Triage Categories

For each new source, classify its content into one or more of these categories:

**(A) REINFORCES** — Updates or strengthens existing content without expanding scope.

Examples:
- A newer citation for an existing claim
- A better or clearer explanation of an already-covered concept
- Updated benchmark numbers or results
- An additional supporting reference for an existing argument
- A correction to an existing claim

**(B) EXTENDS** — Adds a meaningful new angle *within* an existing section's scope.

Examples:
- A new worked example for an already-covered concept
- An additional comparison or contrast that deepens understanding
- A new visualization that illustrates an existing point more clearly
- A practical tip or implementation detail for an already-covered method
- A new connection between concepts already in the chapter

**(C) OUT-OF-SCOPE** — Interesting but does not serve any existing learning objective.

Examples:
- A related but distinct method not covered by the chapter
- An application domain the chapter doesn't address
- A theoretical extension beyond the chapter's level
- Historical context that doesn't serve the current narrative

### Triage Rules

1. **Default to (C).** New material is out-of-scope unless it clearly serves an existing learning objective. The burden of proof is on inclusion, not exclusion.

2. **The "what gets de-prioritized?" test.** If adding >300 words of new content to a section, identify what existing content can be tightened to compensate. If nothing can be tightened, the section may be at capacity.

3. **No new sections without user approval.** If the new material genuinely warrants a new section (or a new learning objective), the workflow MUST pause and present this as a scope expansion request:

```
SCOPE EXPANSION REQUEST
========================
The following new material does not fit within the existing chapter structure:

Source: [source title]
Content: [brief description]
Proposed addition: [what would be added]
Rationale: [why this matters]
Impact: [which existing section would this be added to, or would it require a new section?]

This would require:
- [ ] A new section (_0X-new-topic.qmd)
- [ ] A new learning objective
- [ ] Expanding an existing section significantly (>25% word count increase)

Please approve or reject this expansion.
```

**STOP execution and wait for user response** if any scope expansion is needed.

4. **Hard cap on section count.** The chapter stays at its existing number of body sections unless the user explicitly approves adding one.

5. **Word count discipline.** Each section should stay within its approximate original word count. Flag if any section would grow by >25%.

### Triage Output

Write `UPDATE-PLAN.md` to the chapter folder (alongside `TEXTBOOK-PLAN.md`):

```markdown
# Update Plan for [Chapter Title]

**Date:** [today's date]
**New Sources Provided:** [count]

## Source Triage

### (A) REINFORCES — Will be integrated

| # | Source | Affects Section | What It Adds |
|---|--------|-----------------|--------------|
| 1 | [Source Name](URL) | _02-section.qmd | Updated citation for claim X |
| 2 | ... | ... | ... |

### (B) EXTENDS — Will be integrated (within scope)

| # | Source | Affects Section | What It Adds | Estimated Words |
|---|--------|-----------------|--------------|-----------------|
| 1 | [Source Name](URL) | _03-section.qmd | New worked example | ~200 |
| 2 | ... | ... | ... | ... |

### (C) OUT-OF-SCOPE — Noted for future chapters

| # | Source | Why Out of Scope | Suggested Future Chapter |
|---|--------|-------------------|--------------------------|
| 1 | [Source Name](URL) | Covers X which is beyond LO scope | "Advanced [Topic]" |
| 2 | ... | ... | ... |

## Estimated Impact

- Sections to modify: [list]
- Estimated total new words: ~[count]
- Sections at capacity (no room for expansion): [list]
```

**Chat output:** Print the triage summary.

---

=== PHASE 4: UPDATE TEXTBOOK-PLAN.md ===

**Goal:** Update the chapter's master plan to reflect new sources, keeping the plan as the single source of truth.

**Steps:**

1. **Add new sources to Source Processing Log:**
   For each (A) and (B) source, add an entry to the Source Processing Log:
   ```
   ## Source N+1: [Title]
   - URL: [url]
   - Type: [arXiv/blog/docs/etc.]
   - Downloaded to: AI-Learning-Gems/sources/[folder]
   - Status: ✅ Downloaded and processed
   - Key content: [2-3 sentence summary]
   - Triage: (A) REINFORCES / (B) EXTENDS
   - Target section: [section file]
   ```

2. **Update per-section source tables:**
   In each section plan within TEXTBOOK-PLAN.md, add new sources to the "Sources for this section" table.

3. **Add new Source Image Catalog entries:**
   If new sources contain useful figures, add them to the image catalog.

4. **Update section plans for (B) EXTENDS sources:**
   If a source classified as (B) adds new content to a section, briefly note what will be added in the section's plan. Mark the addition clearly:
   ```
   **[UPDATE]** Added: new worked example comparing Method X to Method Y using source [N].
   ```

5. **Record out-of-scope sources:**
   Add a new section at the end of TEXTBOOK-PLAN.md:
   ```
   ## Out-of-Scope Sources (For Future Chapters)

   | Source | Topic | Suggested Chapter |
   |--------|-------|-------------------|
   | [Source Name](URL) | ... | ... |
   ```

**Use incremental edits** — apply changes using `StrReplace` to preserve the existing TEXTBOOK-PLAN.md content. Do NOT rewrite the entire file.

**Chat output:** "Updated TEXTBOOK-PLAN.md with [N] new sources."

---

=== PHASE 5: SURGICAL SECTION UPDATES ===

**Goal:** Integrate new material into existing section files with minimal disruption.

**Guiding principle:** Think like a journal editor marking up a manuscript. Each change should be the minimum edit that accomplishes the integration. Use `StrReplace` for every modification.

### Integration Rules by Content Type

**New citations (REINFORCES):**
- Find the existing paragraph where the topic is discussed
- Add the new citation inline using the I.C.E. pattern: Introduce, Cite, Explain
- Example: if the existing text says "Method X achieves 92% accuracy" and the new source shows 94% on a newer benchmark, update to: "Method X achieves 92% accuracy on [benchmark A]. More recently, [New Source](URL) reported 94% on [benchmark B], confirming the approach's robustness."

**Better explanations (REINFORCES):**
- Do NOT replace the existing explanation wholesale
- If the new source offers a clearer framing, incorporate the insight as an additional perspective: "Another way to think about this: [new framing from source]."
- If the existing explanation has a factual error that the new source corrects, fix the error and cite the correction.

**New worked examples (EXTENDS):**
- Add AFTER existing examples for the same concept, BEFORE practice checks
- Use the same formatting pattern as existing examples (check the section's style)
- Include the source in the section's source header
- If the section already has 3+ examples for this concept, consider replacing a weaker one rather than adding another

**New comparisons or contrasts (EXTENDS):**
- Add to existing comparison tables or comparison paragraphs
- If a table exists, add a row. If prose exists, add a sentence or short paragraph.
- Cite the source of the comparison data

**New visualizations (EXTENDS):**
- Follow `visualization-standards.md`
- Add after the relevant explanation paragraph
- If adding a source image, copy to `{Chapter}/images/` and embed with attribution
- If adding a code-generated plot, use the two-cell hvplot/bokeh pattern

**Updated numbers or results (REINFORCES):**
- Replace the old numbers inline
- Add the new citation
- If the update is significant, add a brief note: "As of [year], the state of the art has improved to..."

### For Each Section Being Updated

1. **Re-read rules AND produce proof-of-work (MANDATORY before each section edit):**
   Before editing, re-read these files from disk using the Read tool:
   - `source-integrity.md` — Re-read in full. Focus on: Zero World Knowledge, Hard Ban categories, the litmus test.
   - `writing-style.md` — Re-read in full. Focus on: AI tell avoidance (banned words, em dash prohibition), given-new contract, emphasis hierarchy, inline citation format.
   - `exercise-syntax.md` — Re-read to avoid accidentally breaking existing exercise blocks during edits.

   **Then produce a Rules Application Analysis in the chat.** This is your proof of work. It must contain:

   **(a) Scope verification (update-specific):** "This section currently covers [topic]. The new source adds [content]. This content serves learning objective [N] because [reason]. I will place it [where] because [rationale]. This does NOT expand the section's scope because [explanation]."

   **(b) Source integrity mapping:** "The new source is at `[path]`. I read it at lines [N-M]. The specific claims I will add are: [list]. Each claim traces to line [N] of the source. I am NOT using any content from: the TEXTBOOK-PLAN summary, training data, or sub-agent reports without verification."

   **(c) Writing style mapping (at least 3 rules):** Map specific `writing-style.md` rules to the content you are about to add. Example: "The new paragraph explains concept X. The given-new contract means I start with [familiar term from existing text] and end with [new information from the source]. I will not use em dashes. The emphasis hierarchy means I bold [specific phrase] as the key takeaway."

   **(d) Preservation check (update-specific):** "The existing content I am editing around is: [describe]. I will NOT change [what stays]. The edit is surgical: [describe exact StrReplace plan]."

2. **Read the section** (or re-read if you read it in Phase 1)
3. **Update the section's source header** — add new sources to the collapsible callout table at the top
4. **Apply changes** using `StrReplace` — one change at a time, preserving surrounding context
5. **Track word count change** — note how many words were added

6. **Produce a Source Audit Table after each section edit (MANDATORY):**
   See `source-integrity.md` for the full table format. Every source that contributed content to your edits must appear in the table. Every row must show `YES` under Verified. If any row shows `NO — MUST FIX`, stop and fix before proceeding.

### Word Count Discipline

After all edits to a section:
- If the section grew by <10%: acceptable, no action needed
- If the section grew by 10-25%: review whether any existing content can be tightened
- If the section grew by >25%: STOP and flag for user review before proceeding

**Chat output:** For each modified section, print: "Updated `[filename]`: +[N] words ([changes made])"

---

=== PHASE 6: COHERENCE PASS & FINAL RULES VALIDATION ===

**Goal:** Ensure the updated chapter reads as a unified whole, not as original-content-plus-patches, and that all rules are maintained.

**Re-read rules (MANDATORY before this pass):**
Read these files from disk one final time:
- `writing-style.md`
- `quarto-conventions.md`
- `exercise-syntax.md`

**Steps:**

1. **Re-read each modified section end-to-end.** Check:
   - Do new paragraphs flow naturally from the preceding paragraph?
   - Do new paragraphs lead naturally into the following paragraph?
   - Is the transition smooth, or does it feel "grafted on"?

2. **Check the running example.** If the chapter has a running example:
   - Is it still coherent after the updates?
   - Should the new material be illustrated using the running example?
   - If so, add a brief callback: "Returning to our [running example], this means..."

3. **Check notation consistency.** If any new source introduces notation:
   - Does it conflict with the chapter's existing notation?
   - If the chapter has a notation table, does it need updating?

4. **Check cross-references.** If new content adds figures, equations, or conceptual anchors:
   - Add `{#fig-*}`, `{#eq-*}`, `{#sec-*}` labels where needed
   - Add forward/backward references to connect new content to existing sections

5. **Apply writing style rules** to all new and modified paragraphs:
   - Follow `writing-style.md`
   - Check for AI tells (em dashes, banned words, filler phrases)
   - Ensure mathematical paragraphs use simple English (Rule 6a from edit workflow)
   - Ensure narrative paragraphs use precise word choice (Rule 6b from edit workflow)

6. **Check section transitions.** Read the last paragraph of each section and the first paragraph of the next section. Do they connect? If not, adjust the transition.

7. **Final rules validation on all modified sections:**
   - Scan for em dashes (must be zero in new/modified text)
   - Scan for banned AI-tell words (delve, tapestry, navigate, etc.)
   - Scan for filler phrases ("It's worth noting that...")
   - Scan for unlinked citations: parentheticals like `(Author et al., YYYY)` without `](http` hyperlinks
   - Verify image paths are prefixed with `[Topic Name]/` (not bare `images/`)
   - Verify existing exercise blocks are intact (not broken by edits)
   - Verify heading levels (one `##` per section file)

**Chat output:** "Coherence pass complete. [N] transition adjustments made. Final rules validation passed."

---

=== PHASE 7: OUTPUT ===

**Goal:** Summarize what was done and produce all output artifacts.

### Updated Files

The following files should have been modified (or created):

| File | Action |
|------|--------|
| `TEXTBOOK-PLAN.md` | Updated with new sources, triage results, image catalog |
| `UPDATE-PLAN.md` | NEW — triage and change log for this update |
| `_XX-section.qmd` (multiple) | Updated with new content |
| `{Chapter}/images/` | New images (if any) |

### Chat Summary

Print a structured summary:

```
UPDATE COMPLETE: [Chapter Title]
=================================

Sources processed: [N total]
  - (A) Reinforces: [N] — integrated
  - (B) Extends: [N] — integrated
  - (C) Out of scope: [N] — noted in TEXTBOOK-PLAN.md

Sections modified:
  - _02-section.qmd: +[N] words (added citation for X, new example for Y)
  - _03-section.qmd: +[N] words (updated benchmark numbers)
  - ...

Total word count change: +[N] words ([X]% increase)

Out-of-scope topics (for future chapters):
  - [Topic from source C1]: suggested for "[Future Chapter Name]"
  - ...
```

### UPDATE-PLAN.md

Append to `UPDATE-PLAN.md` (do not overwrite previous entries if the file already exists from a prior update):

```markdown
---

## Update: [today's date]

### Sources Provided
1. [Source 1 title](URL)
2. [Source 2 title](URL)
...

### Triage Results
- (A) Reinforces: [list]
- (B) Extends: [list]
- (C) Out of scope: [list]

### Changes Made
- `_02-section.qmd`: [what changed]
- `_03-section.qmd`: [what changed]

### Word Count Impact
| Section | Before | After | Change |
|---------|--------|-------|--------|
| _02-... | ~1200 | ~1350 | +12.5% |
| _03-... | ~1800 | ~1850 | +2.8% |

### Notes
[Any observations, concerns, or recommendations for the next update]
```

---

=== QUALITY CHECKLIST ===

Before marking the update as complete, verify:

**Scope Integrity:**
- [ ] No new sections were added without user approval
- [ ] All new content serves an existing learning objective
- [ ] Out-of-scope material was noted, not squeezed in
- [ ] No section grew by more than 25% without being flagged

**Integration Quality:**
- [ ] New citations use the I.C.E. pattern (Introduce, Cite, Explain)
- [ ] New examples follow the same formatting pattern as existing ones
- [ ] New content flows naturally from surrounding paragraphs (no "grafted on" feeling)
- [ ] Running example is still coherent
- [ ] All new source images properly attributed

**Documentation:**
- [ ] TEXTBOOK-PLAN.md updated with all new sources
- [ ] Per-section source headers updated
- [ ] UPDATE-PLAN.md records what changed and why
- [ ] Chat summary lists all changes

**Writing Quality (applied to new/modified paragraphs only):**
- [ ] No em dashes in new prose
- [ ] No AI tell words in new prose
- [ ] Mathematical paragraphs use simple English
- [ ] Narrative paragraphs use precise word choice
- [ ] Sentence length varies within new paragraphs
- [ ] All new inline citations include linked references `([Authors, Venue Year](URL))`

**Technical Correctness:**
- [ ] All cross-references (`@sec-*`, `@fig-*`, `@eq-*`) are valid
- [ ] All image paths are relative to the index file (not the section file)
- [ ] Notation table updated if new symbols introduced
- [ ] LaTeX formatting follows `quarto-conventions.md`
