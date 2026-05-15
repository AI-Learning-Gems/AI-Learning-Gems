# Design Proposal: Exercises-for-Textbook-Chapter Workflow Decomposition

> **Author:** Staff-Engineer-style design proposal, drafted 2026-05-15, draft v0.1.
> **Status:** Companion to `DESIGN-PROPOSAL-textbook-workflow.md` (write), `DESIGN-PROPOSAL-research-workflow.md` (research), and `DESIGN-PROPOSAL-edit-workflow.md` (edit). This proposal decomposes the *exercises* workflow.
> **Scope:** Replace the current monolithic `/exercises-for-textbook-chapter` (546 lines, 4 exercise types defined inline, parallel-subagent dispatch with no structured artifact between dispatch and validation, brittle Pandoc-AST-sensitive Quarto syntax) with a verifiable, cross-tool, sub-agent-orchestrated pipeline.
> **Target IDEs/CLIs:** Cursor (primary), Claude Code, OpenCode, Kiro IDE+CLI.

---

## 0. TL;DR

The current `/exercises-for-textbook-chapter` workflow has a sharper failure mode than the writing/research/edit workflows: **silent rendering breakage**. The Quarto exercises extension uses a Lua filter that walks the Pandoc AST. A single formatting mistake (options as standalone paragraphs instead of bullet list, letter prefixes on options, bold-wrapped fill-in patterns, LaTeX braces on the same line as fill-in syntax) makes the exercise render as raw text, fail to submit, or crash with a JS error — but the agent's prose summary often says "exercise added" because the markdown looks syntactically plausible. The empirical failure modes (observed across multiple chapter-exercise sessions): (a) exercises render as raw markdown because options were paragraphs; (b) ordering exercises crash with `"C,A,D,B" is not valid JSON` because of subtle option-letter conflicts; (c) fill-in dropdowns don't appear because LaTeX `\hat{\lambda}` ate the brace-matching; (d) the agent claims to have followed the syntax but skipped the per-section re-read of `exercise-syntax.md`.

This proposal decomposes the workflow into **four phases** with structured-output checkpoints between them:

1. `/exercises-design` — read all sections, design exercise placement (which type goes where), output `EXERCISE-DESIGN.json` with type+placement+stem-draft per exercise, validated against the per-section budget rules
2. `/exercises-author` — per-section parallel subagents author exercise blocks from the design, outputting per-section `EXERCISE-DRAFT-{N}.md` (markdown) and `EXERCISE-RECEIPT-{N}.json` (metadata)
3. `/exercises-render-check` — deterministic Pandoc AST validator runs on each exercise block; rejects malformed blocks before they're committed to the section file; this is the load-bearing forcing function
4. `/exercises-integrate` — main agent injects validated blocks into section `.qmd` files at the planned positions, preserving audit blocks and prior content

Plus a thin orchestrator `/exercises-for-textbook-chapter` (~80 lines) that calls the four phases.

The critical innovation vs the other workflow proposals: a **Pandoc-AST validator** (`scripts/validate_exercise_block.py`) runs each draft exercise through the actual Pandoc parser (or a faithful Lua-equivalent reimplementation in Python) and confirms it produces the AST shape the Lua filter expects. Drafts that don't parse correctly are rejected before reaching the section files. This eliminates the silent-rendering-breakage failure mode at its root.

**Estimated effort:** v0 (1 day) for the Pandoc-AST validator + receipt schema; v1 (1.5 weeks) for the four-phase pipeline; v1.1 (3 days) for hooks integration.

---

## 1. High-Level Goals

The exercises workflow must achieve, on every chapter:

1. **Zero silent-rendering failures** — every exercise block in every committed section file must parse to the expected Pandoc AST shape. The validator runs *before* the block is committed to disk; broken drafts never reach `.qmd` files.

2. **Per-section budget compliance** — every section (intro, body, closing) gets the right number of exercises of the right types per the placement strategy (1-2 per intro, 3-4 per body section, 0 in closing).

3. **Pedagogically grounded design** — exercise type selection is justified by section content (Prediction Prompts go before surprising results; Ordering goes after process descriptions; Fill-in goes after worked examples; MCQ is the default).

4. **Cleanup is mechanical** — old exercise blocks (`.exercise-mcq`, `.exercise-predict`, `.exercise-order`, `.exercise-fillin`) and legacy "Self-Explanation Prompt" / "Faded Example" callouts are removed deterministically; "Common Misconception" / "Think Hard" / Retrieval Practice Questions are preserved.

5. **Audit-block preservation** (inherited from edit-workflow EC5) — exercise insertion never strips or modifies the `<!-- SOURCE AUDIT v1 -->` HTML preamble at the top of each section file.

6. **Compliance by structure, not by exhortation** — the agent does not get to claim "syntax follows exercise-syntax.md" without proof. The Pandoc AST validator IS the proof.

7. **User-verifiable in <2 minutes** — `python3 scripts/exercises_audit.py CHAPTER` walks every exercise, confirms AST-shape, confirms placement matches design, reports per-section counts vs budget.

8. **Cross-tool portability** — same workflow runs on Cursor, Claude Code, OpenCode, Kiro with equivalent guarantees.

9. **Composable with edit + update workflows** — exercises must coexist with `<!-- SOURCE AUDIT v1 -->` preambles and color spans inserted by the edit workflow. The integrate phase preserves both.

10. **Idempotent re-runs** — running `/exercises-for-textbook-chapter` twice replaces existing exercises with fresh ones (the workflow is explicitly idempotent per the existing instructions); this is preserved in the redesign and made structurally enforced.

---

## 2. Constraints

### 2.1 Hard Constraints

| ID | Constraint | Source |
|---|---|---|
| XC1 | Must run on all 4 target tools (Cursor, Claude Code, OpenCode, Kiro) with the same artifacts and the same audit guarantees | Companion proposals |
| XC2 | Hooks differ per tool; design must account for Kiro's "hooks do not fire inside subagents" caveat | Companion proposals C2 |
| XC3 | Exercise blocks MUST parse to the exact Pandoc AST shape the Lua filter expects. Markdown that "looks correct" is not enough. | `exercise-syntax.md` rules; empirical breakage |
| XC4 | The Pandoc-AST validator MUST be deterministic Python (not LLM-based judgment); LLM cannot reliably predict Pandoc AST output | Pandoc parsing is mechanical; LLM validation drifts |
| XC5 | Editing/insertion of exercise blocks MUST preserve the `<!-- SOURCE AUDIT v1 -->` preamble at the top of every `_NN-section.qmd` | Edit-workflow EC5; chained constraint |
| XC6 | Exercise insertion MUST NOT modify `_manifests/`, `_state/`, `_research/`, or `_edit/` artifacts. Exercises are prose-only. | Companion proposals |
| XC7 | Per-section budget rules are non-negotiable: intro 1-2 exercises (END of file only), body 3-4 each, closing 0 | Existing workflow; pedagogical research basis |
| XC8 | The 4 exercise types and their Quarto syntax live in `exercise-syntax.mdc` (already a path-scoped rule). The exercise authoring subagent MUST NOT have the syntax embedded in its prompt; it must arrive via auto-attached rule. | Cross-tool primitive constraint, EC8 from edit proposal |
| XC9 | Cleanup of old exercise/self-explanation/faded-example blocks is mechanical; the design phase produces a deterministic deletion list, not agent-driven cleanup decisions | Idempotence requires deterministic cleanup |

### 2.2 Soft Constraints

| ID | Constraint | Why |
|---|---|---|
| XS1 | One primary user-facing command (`/exercises-for-textbook-chapter`); four sub-commands callable but optional | Onboarding cost |
| XS2 | Each sub-command file ≤500 lines | Mitigate instruction drift |
| XS3 | Each phase artifact must be on disk (JSON or markdown), not chat-only | Phase resumability + auditability |
| XS4 | Pipeline should reuse existing primitives (subagent definitions, hooks, validators) from companion proposals | Minimize new code |
| XS5 | Pipeline wall time ≤15 minutes for a 7-section chapter (exercise authoring is shorter than prose editing) | UX |
| XS6 | Token cost ≤2× the current monolith's typical run | Cost discipline |

### 2.3 Cross-Tool Primitives

This proposal uses the same primitive inventory as the companion proposals: slash commands, subagents, rules with globs/paths, skills (`.agents/skills/`), MCP servers, terminal-Python, AGENTS.md, and hooks (with Kiro caveat). The `exercise-syntax.mdc` rule is path-scoped to `_[0-9][0-9]-*.qmd` (auto-attaches to subagents that edit section files).

---

## 3. Architecture: Why Four Phases (and Not Two or Six)

The current monolithic `/exercises-for-textbook-chapter` interleaves: (1) reading sections, (2) deciding which exercise types go where, (3) cleanup of old exercise blocks, (4) authoring new exercise markdown, (5) inserting it into section files, (6) final syntax validation. Steps 4-5 are where the silent-rendering breakage happens: the agent generates plausible markdown, inserts it, then the final validation step (which is a per-rule grep against ill-defined patterns) misses the AST-level violations.

The four-phase decomposition uses the same **failure seam** pattern as the companion proposals, with one critical addition: the **render-check phase** (Phase 3) sits between authoring and integration, validating each draft against the actual Pandoc parser before it's allowed near a section file.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ User: /exercises-for-textbook-chapter <chapter-path>                     │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ [XC1] Orchestrator (~80 lines)                                           │
│ Calls phases 1-4 in sequence; resumable; idempotent                      │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Phase 1: /exercises-design                                               │
│   Subagent: designer                                                     │
│   Tools: Read all section files                                          │
│   Output: EXERCISE-DESIGN.json — per-exercise type+placement+stem-draft  │
│   Validator: scripts/validate_exercise_design.py — budget compliance     │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Phase 2: /exercises-author                                               │
│   Subagents: section-authors (one per section, parallel-capped at 4)     │
│   Tools: Read its section + design slice; Write to draft markdown        │
│   Auto-attached rules: exercise-syntax.mdc, writing-style.mdc            │
│   Output: _exercises/EXERCISE-DRAFT-{N}-{i}.md (one per exercise)        │
│           + EXERCISE-RECEIPT-{N}.json per section                        │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Phase 3: /exercises-render-check (THE LOAD-BEARING PHASE)                │
│   Tool: Pure Python — runs each draft through Pandoc AST parser          │
│   Output: RENDER-CHECK-RECEIPT.json — pass/fail + AST shape per draft    │
│   Halt on any FAIL; user re-runs Phase 2 with feedback                   │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Phase 4: /exercises-integrate                                            │
│   Subagent: integrator (single, sequential — preserves audit-block + colors) │
│   Tools: Read section files, Read drafts, Edit section files             │
│   First: deterministic cleanup (Python script removes old blocks)        │
│   Then: integrator subagent inserts validated drafts at planned positions │
│   Output: INTEGRATE-RECEIPT.json — per-insertion line range + verification │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Final: scripts/exercises_audit.py — user-runnable integrity check        │
└──────────────────────────────────────────────────────────────────────────┘
```

Why four, not two (combining all into "design + write"):
- Without the render-check seam, silent-rendering breakage propagates into the final files. Empirically observed; the dominant failure mode.

Why four, not three (combining design + author):
- Design needs the *whole chapter* in context (to enforce per-section budgets, vary types across sections, and identify "surprising results" that warrant Prediction Prompts). Authoring needs only one section's context. Mixing them causes the agent to design and write Section 1 fully before even seeing Section 5's content, producing imbalanced budgets.

Why four, not five (splitting cleanup from integrate):
- Cleanup is deterministic (regex-delete old `.exercise-*` and old "Self-Explanation Prompt" / "Faded Example" callouts). It's a Python pre-pass within Phase 4. Splitting it into its own phase adds an unnecessary checkpoint.

Why four, not six (splitting render-check by exercise type):
- Render-check is the same Pandoc parsing step regardless of exercise type. One validator handles all four types. Splitting would multiply scripts without benefit.

---

## 4. Component Breakdown

The system has **5 commands**, **3 subagents**, **5 Python validators**, and **3 schemas**. Each is small and single-purpose.

### Component [XC1] — Orchestrator (`/exercises-for-textbook-chapter`)

**Responsibility:** Single user-facing entry point. Reads the chapter path, dispatches the four phases in sequence, runs validators between phases, halts on render-check failure, emits structured progress to chat.

**MUST do:**
- Be idempotent — re-invocation deletes old exercise drafts and re-runs from Phase 1 (the workflow is explicitly designed to replace existing exercises with fresh ones)
- Halt on render-check failure with precise per-draft feedback
- Run validators in-line; do not assume subagent compliance
- Pre-flight check: every section has a valid `<!-- SOURCE AUDIT v1 -->` preamble (chapter must have been written by v1 writing workflow)

**MUST NOT do:**
- Generate exercise content itself (delegated to Phase 2)
- Skip render-check (its existence is the load-bearing structural change vs the monolith)
- Allow Phase 4 (integrate) to proceed with any draft that hasn't passed render-check

**Implementation Options:**

- **Option XC1-A: Markdown slash command + agent-driven dispatch** — ~120 lines, agent-driven. Same drift risk as monolith.
- **Option XC1-B: Python orchestrator script invoked from a thin slash command** — ~30-line markdown wrapper + ~120-line Python script.

**Recommendation: Option XC1-B**, reusing `scripts/spawn_subagent.py` from the companion proposals. Per-tool fallback: Kiro uses XC1-A with parent-level hooks (per XC2).

---

### Component [XC2] — Phase 1: Designer Subagent (`/exercises-design`)

**Responsibility:** Read every section file. Identify pedagogically appropriate placements for each exercise type (where surprising results live → Prediction Prompts before them; where worked examples end → Fill-in after them; where multi-step processes live → Ordering after them; where key concepts are introduced → MCQs after them). Apply per-section budget rules. Output `EXERCISE-DESIGN.json` with one entry per planned exercise: type, placement (section number + line number for "after this paragraph"), stem draft, justification.

**MUST do:**
- Read all `_NN-section.qmd` files in the chapter folder in full
- Detect pedagogically distinct content patterns: surprising results (for Prediction Prompts), worked examples (for Fill-in), multi-step processes (for Ordering), core concept explanations (for MCQs), Common Misconception callouts (their content suggests great MCQ distractors)
- For each section, propose exercises per the budget:
  - `_01-introduction.qmd`: 1-2 exercises (1 MCQ + optionally 1 Prediction Prompt), placed AT THE END of the file
  - `_NN-body-section.qmd` (body sections): 3-4 exercises (1-2 MCQ + 1 Prediction Prompt + 0-1 Ordering or Fill-in), distributed across subsections
  - `_99-closing.qmd`: 0 exercises (closing already has Retrieval Practice Questions)
  - `_98-math-background.qmd`: 0 exercises (it's an appendix; exercises don't apply)
- For each proposed exercise, provide:
  - Type (`mcq` / `predict` / `order` / `fillin`)
  - Placement: section_number + line_number (for "insert after this paragraph")
  - Stem draft (the question text, unrendered markdown — final markdown comes in Phase 2)
  - Pedagogical justification (1 sentence explaining why this type goes here)
  - Distractor concepts (for MCQs, the misconceptions to embed as wrong options)
- Identify cleanup targets: every existing `.exercise-mcq`, `.exercise-predict`, `.exercise-order`, `.exercise-fillin`, "Self-Explanation Prompt", "Faded Example" callout in the chapter, with file + line range — emitted to `EXERCISE-DESIGN.json#cleanup_targets`
- Write `_exercises/EXERCISE-DESIGN.json`

**MUST NOT do:**
- Author full exercise markdown (Phase 2's job — design includes only stem drafts, not full Quarto syntax)
- Modify any section file (design is read-only)
- Skip per-section budget rules (the validator enforces them)
- Place exercises in `_99-closing.qmd` or `_98-math-background.qmd`

**Implementation Options:**

- **Option XC2-A: Single designer subagent** — clean context, walks all sections, emits one `EXERCISE-DESIGN.json`. Cross-tool, simple.
- **Option XC2-B: Per-section designer subagents** — N parallel subagents, one per section. Faster but loses cross-section view: balanced exercise-type distribution requires seeing the whole chapter.

**Recommendation: Option XC2-A.** The designer must see all sections to vary exercise types appropriately (you don't want every section to use Ordering exercises). Output is structured JSON; context drift mostly affects throughput, not correctness — the validator catches malformed output.

#### `EXERCISE-DESIGN.json` Schema (Preview)

```json
{
  "schema_version": "1.0",
  "chapter_path": "Statistics/Bayesian Credible Intervals/",
  "designed_at": "2026-05-15T11:00:00Z",
  "sections": [
    {
      "section_number": 1,
      "section_file": "_01-introduction.qmd",
      "section_kind": "introduction",
      "exercises": [
        {
          "exercise_id": "1.1",
          "type": "mcq",
          "placement": { "after_line": 358, "subsection_label": "end-of-introduction" },
          "stem_draft": "After reading the introduction, which statement best describes the difference between a Bayesian credible interval and a frequentist confidence interval?",
          "justification": "Tests the core distinction the introduction sets up; placed at end so it consolidates the section",
          "distractor_concepts": [
            "credible intervals always cover the true parameter (wrong: they're probability statements, not coverage)",
            "confidence intervals tell you the probability the parameter is in the interval (wrong: classic misinterpretation)",
            "credible intervals require a prior (correct as stem; need to design distractor that flips this)"
          ]
        }
      ]
    },
    {
      "section_number": 3,
      "section_file": "_03-computing-credible-intervals.qmd",
      "section_kind": "body",
      "exercises": [
        {
          "exercise_id": "3.1",
          "type": "predict",
          "placement": { "after_line": 87, "subsection_label": "before-numerical-result" },
          "stem_draft": "Before reading the computed posterior: which of these intervals do you predict will be widest?",
          "justification": "Inserted before a counterintuitive numerical result (the uniform prior produces the widest interval)",
          "distractor_concepts": ["intuitive: tight prior → tight posterior", "intuitive: noninformative prior → wide posterior"]
        },
        {
          "exercise_id": "3.2",
          "type": "order",
          "placement": { "after_line": 215, "subsection_label": "after-MCMC-walk-through" },
          "stem_draft": "Arrange the steps of an MCMC sampling iteration in the correct order:",
          "justification": "Section walks through the MCMC algorithm; ordering exercise tests dependency understanding"
        }
      ]
    }
  ],
  "cleanup_targets": [
    { "file": "_03-computing-credible-intervals.qmd", "kind": "exercise-mcq", "line_range": "234-265" },
    { "file": "_03-computing-credible-intervals.qmd", "kind": "self-explanation-prompt", "line_range": "150-159" }
  ],
  "summary": {
    "total_exercises": 22,
    "by_type": { "mcq": 11, "predict": 5, "order": 4, "fillin": 2 },
    "by_section_count": { "intro": 2, "body": 20, "closing": 0 },
    "cleanup_count": 8
  }
}
```

Validator (`validate_exercise_design.py`):
- Schema validation
- Per-section budget enforcement: intro = 1-2, body = 3-4, closing = 0, math-background = 0
- Total exercises 19-26 across the chapter (matches the existing budget table)
- Type distribution: MCQs ≥ 50% of total (MCQs are the default); Prediction Prompts on most body sections; Ordering only where multi-step processes exist
- Every `placement.after_line` exists in the corresponding section file (cross-checked via `wc -l`)
- Every cleanup target's `line_range` actually contains the claimed kind (cross-checked via grep)
- Introduction exercises ALL placed after line ≥ (notation table line); none in the middle of intro

---

### Component [XC3] — Phase 2: Per-Section Author Subagents (`/exercises-author`)

**Responsibility:** For each section that has ≥1 planned exercise, spawn a dedicated author subagent that produces full Quarto exercise blocks for each planned exercise — one markdown file per exercise (`_exercises/EXERCISE-DRAFT-{N}-{i}.md`). Each draft is standalone; integration into section files happens in Phase 4.

**MUST do (per-section author subagent):**
- Read its assigned section's slice of `EXERCISE-DESIGN.json` (just `sections[N]`)
- Read the section file `_NN-section.qmd` to ground exercise stems in the actual section content (quotes, statistics, examples)
- For each planned exercise in the design:
  - Author the full Quarto exercise block per `exercise-syntax.mdc` (auto-attached via `globs: _[0-9][0-9]-*.qmd`)
  - For MCQs: 4 plausible options (1 correct + 3 distractors reflecting the misconceptions named in `distractor_concepts`)
  - For Prediction Prompts: 2-3 options where naive intuition leads to the wrong answer
  - For Ordering: 4-6 SCRAMBLED steps with `correct="..."` attribute giving the right order
  - For Fill-in: numbered list with one `{LETTER|A: ...|B: ...|C: ...}` blank, NO LaTeX with braces on the same numbered line
  - Include both `.feedback-correct` and `.feedback-incorrect` divs for MCQs (mandatory)
  - Use plain text options (NO `A)`, `B)`, `[A]`, `[B]` prefixes — labels are auto-assigned)
- Write each exercise to its own draft file: `_exercises/EXERCISE-DRAFT-{N}-{i}.md`
- Write the per-section receipt: `_exercises/EXERCISE-RECEIPT-{N}.json` listing each draft path + the `placement.after_line` from the design

**MUST NOT do:**
- Modify any section file (Phase 4's job)
- Skip exercises from the design (the receipt must have one entry per planned exercise)
- Embed exercise-syntax rules in its prompt (those auto-attach via the path-scoped rule per XC8)
- Use letter-prefixed options or LaTeX-on-same-line-as-fill-in (the render-check WILL catch these)

**Implementation Options:**

- **Option XC3-A: One author subagent per section, parallel-capped at 4** — clean context per section. Same pattern as edit-workflow's section-editor.
- **Option XC3-B: One author subagent per exercise** — extreme parallelism (~22 subagents for a typical chapter). Wasteful overhead; rejected.
- **Option XC3-C: Single author subagent processing all sections sequentially** — same monolith failure mode; rejected.

**Recommendation: Option XC3-A**, parallel-capped at 4.

The subagent definition lives at `.cursor/agents/exercise-author.md` (~120 lines). Its SCAN protocol forces three forced output questions before authoring:
- Q1: How many exercises does the design specify for this section?
- Q2: For exercise #1, what type is it and what's the `placement.after_line`?
- Q3: State the contract: "Every option will be plain text on consecutive bullet-list lines, no letter prefixes; for MCQs both feedback divs will be present; for Fill-in no LaTeX braces on the same line as `{...|...}`."

These three questions force engagement with the design and the syntax rules.

#### Per-Section Receipt Schema

```json
{
  "schema_version": "1.0",
  "section_number": 3,
  "section_file": "_03-computing-credible-intervals.qmd",
  "authored_by": "subagent-id-xyz",
  "authored_at": "2026-05-15T11:30:00Z",
  "design_input": "_exercises/EXERCISE-DESIGN.json#sections[2]",
  "drafts": [
    {
      "exercise_id": "3.1",
      "type": "predict",
      "draft_path": "_exercises/EXERCISE-DRAFT-3-1.md",
      "placement": { "after_line": 87 },
      "draft_chars": 612
    },
    {
      "exercise_id": "3.2",
      "type": "order",
      "draft_path": "_exercises/EXERCISE-DRAFT-3-2.md",
      "placement": { "after_line": 215 },
      "draft_chars": 854
    }
  ],
  "summary": { "drafts_authored": 2, "design_count": 2 }
}
```

Validator (`validate_exercise_receipt.py`):
- Schema validation
- Every exercise in `EXERCISE-DESIGN.json#sections[N].exercises[]` has a corresponding draft
- Every draft path exists on disk and is non-empty
- `placement` matches the design exactly

This validator does NOT check exercise SYNTAX correctness — that's Phase 3's job, deliberately separated to make AST validation a forcing function.

---

### Component [XC4] — Phase 3: Render-Check Validator (`/exercises-render-check`) — THE LOAD-BEARING PHASE

**Responsibility:** For each draft exercise file, parse it through the actual Pandoc AST parser and confirm the AST shape matches what the Lua filter expects. Reject any draft that doesn't parse correctly. This is the **single most important phase** in the workflow — its absence is the root cause of every silent-rendering failure observed in the current monolith.

**Why this matters:**

The Quarto exercises Lua filter walks the Pandoc AST looking for specific node patterns:
- `BulletList` with consecutive `Plain` items (NOT `OrderedList`, NOT `Para` items separated by blank lines)
- A specific `Div` class hierarchy: outer `.exercise-mcq` containing inner `.feedback-correct` + `.feedback-incorrect`
- For Fill-in: a `Str` token containing the literal `{LETTER|A: text|B: text}` pattern WITHOUT being wrapped in `Emph` or `Strong`
- Specific frontmatter attributes (`correct="A"`, `correct="C,A,D,B"`)

Markdown that "looks right to a human" can produce wildly different ASTs:
- `A. text` followed by blank line → `Para` (gets parsed as separate paragraphs, NOT a bullet list)
- `- A) text` → `BulletList` containing `OrderedList` (because `A)` triggers Pandoc's ordered-list parser)
- `**{B|...}**` → `Strong` containing `Str` (the Lua filter searches for `Str` not `Strong>Str`)
- `$x^{10}$ {B|...}` → the `{}` of `^{10}` matches before `{B|...}` and the filter extracts the wrong braces

The only reliable way to catch these is to run the actual Pandoc parser.

**MUST do:**
- For each draft file `_exercises/EXERCISE-DRAFT-{N}-{i}.md`:
  - Run `pandoc -f markdown -t json --wrap=none {draft}` to produce the JSON AST
  - Walk the AST looking for the expected node pattern based on exercise type
  - For MCQ: outer `Div` with class `exercise-mcq`, inner `BulletList` with N `Plain` items, two inner `Div`s with classes `feedback-correct` and `feedback-incorrect`
  - For Predict: outer `Div` with class `exercise-predict`, inner `BulletList`, exactly one inner `Div` with class `predict-reveal`
  - For Order: outer `Div` with class `exercise-order` and `correct` attribute matching `^[A-Z](,[A-Z])*$`, inner `BulletList`, exactly one inner `Div` with class `order-feedback`
  - For Fill-in: outer `Div` with class `exercise-fillin` (NO `correct` attr on outer), inner `OrderedList`, at least one item containing the `{LETTER|A:...|B:...}` pattern as plain `Str` (not wrapped in `Emph`/`Strong`); LaTeX braces on same item rejected via regex
  - Cross-check: option count matches the `correct` attribute index
- Emit `_exercises/RENDER-CHECK-RECEIPT.json`
- If ANY draft FAILs, halt the pipeline

**MUST NOT do:**
- Be agent-driven (LLM cannot reliably predict Pandoc AST output)
- Allow drafts with violations to proceed to Phase 4
- Modify any draft file (Phase 3 is read-only validation)

**Implementation Options:**

- **Option XC4-A: Pure Python script using `pandoc` subprocess + `json` AST walking** — calls `pandoc -f markdown -t json` on each draft. Cross-platform. ~250 lines.
- **Option XC4-B: Python reimplementation of the Lua filter's AST walk** — bypasses pandoc subprocess; uses a Python markdown-AST library. Faster but less faithful.

**Recommendation: Option XC4-A.** Use the actual Pandoc parser. Pandoc is the source of truth. <100ms per draft × 22 drafts = ~2 seconds total.

#### `RENDER-CHECK-RECEIPT.json` Schema

```json
{
  "schema_version": "1.0",
  "checked_at": "2026-05-15T11:35:00Z",
  "drafts": [
    {
      "draft_path": "_exercises/EXERCISE-DRAFT-3-1.md",
      "exercise_type": "predict",
      "ast_shape": {
        "outer_div_class": "exercise-predict",
        "outer_div_attrs": { "correct": "C" },
        "inner_bullet_list_count": 3,
        "inner_div_classes": ["predict-reveal"],
        "letter_prefixes_detected": false,
        "ordered_list_in_options": false
      },
      "verdict": "PASS"
    },
    {
      "draft_path": "_exercises/EXERCISE-DRAFT-5-2.md",
      "exercise_type": "fillin",
      "ast_shape": {
        "outer_div_class": "exercise-fillin",
        "fillin_pattern_found": true,
        "fillin_in_strong_or_emph": false,
        "latex_braces_on_fillin_line": true
      },
      "verdict": "FAIL",
      "violation": "LaTeX `\\hat{\\lambda}` found on the same numbered list item as the `{B|...}` fill-in pattern. Pandoc will match the LaTeX braces first and miss the fill-in. Fix: move the LaTeX to a different numbered step or rewrite the fill-in line in plain English.",
      "violation_line": 3
    }
  ],
  "summary": { "total_drafts": 22, "passed": 21, "failed": 1 }
}
```

If `summary.failed > 0`, the orchestrator halts with a precise per-draft message and blocks Phase 4. The render-check is idempotent and user-runnable directly via `python3 scripts/validate_render_check.py CHAPTER`.

---

### Component [XC5] — Phase 4: Integrator (`/exercises-integrate`)

**Responsibility:** After all drafts pass render-check, integrate them into the section files. Two-step process: (a) deterministic Python cleanup deletes old exercise blocks and legacy callouts at the line ranges identified in `EXERCISE-DESIGN.json#cleanup_targets`; (b) integrator subagent inserts each validated draft at its planned `placement.after_line`, preserving the audit-block preamble and any colors/cross-references already in the section.

**MUST do:**
- **Step 4a (deterministic Python cleanup):** Run `scripts/cleanup_old_exercises.py CHAPTER` which:
  - Reads `EXERCISE-DESIGN.json#cleanup_targets`
  - For each target, deletes the line range from the corresponding section file
  - Records every deletion in `_exercises/CLEANUP-RECEIPT.json` with file + line range + content removed (for rollback)
  - Re-runs `check_audit_block_intact.py` after cleanup to verify the preamble survived
- **Step 4b (integrator subagent):** Spawn `integrator` subagent with: section files (post-cleanup), all draft markdown files, `EXERCISE-RECEIPT-{N}.json` per section
  - For each draft, insert it at its `placement.after_line` in the corresponding section file
  - Adjust `after_line` indices forward to account for prior insertions in the same section (Python helper handles this)
  - Add blank lines before/after each insertion (per `exercise-syntax.mdc` rule)
  - Preserve the `<!-- SOURCE AUDIT v1 -->` preamble at the top of every file
  - Preserve all existing colors, cross-references, callouts, and Quarto-specific syntax
- Write `_exercises/INTEGRATE-RECEIPT.json` listing each insertion with: source draft path, target file, target line range (post-insertion), `sed -n`-verifiable content snippet
- Re-run render-check on the COMMITTED section files (the integrated `_NN-section.qmd`s, not the drafts) — defense in depth: cleanup or integration could have introduced new AST violations

**MUST NOT do:**
- Modify any draft file (drafts are immutable post-Phase 3)
- Author new exercise content (Phase 2's job; integrator is purely a copy-and-insert worker)
- Modify `_manifests/`, `_state/`, `_research/`, or `_edit/` artifacts (XC6)
- Touch any section's audit-block HTML preamble at the top
- Reorder or split exercises across sections

**Implementation Options:**

- **Option XC5-A: Hybrid Python (cleanup) + single integrator subagent** — cleanup is deterministic Python; insertion uses one sequential subagent that owns all sections.
- **Option XC5-B: Pure Python for everything** — even insertion is a deterministic file-edit operation. Could use `StrReplace` semantics: read draft, insert at line N. No agent involved.

**Problems:**

- XC5-A: Subagent compliance risk during insertion. Mitigated by post-integration render-check.
- XC5-B: Insertion at `placement.after_line` requires understanding the surrounding context (e.g., don't insert in the middle of a Quarto callout block, don't break a multi-line equation). LLM judgment helps; pure Python is brittle to edge cases.

**Recommendation: Option XC5-A.** Cleanup is mechanical — Python. Insertion benefits from light LLM judgment for edge cases (insertion into nested callouts, multi-line equations near placement boundaries). A single integrator subagent owns all insertions, sequentially, ensuring index drift is handled correctly.

The integrator subagent has its own SCAN protocol: before any insertions, output (a) the count of drafts to insert, (b) the count of sections affected, (c) the audit-block preamble's `manifest:` field on each file (forces reading them first; ensures preservation).

#### `INTEGRATE-RECEIPT.json` Schema

```json
{
  "schema_version": "1.0",
  "integrated_at": "2026-05-15T11:42:00Z",
  "cleanup_input": "_exercises/CLEANUP-RECEIPT.json",
  "drafts_input": "_exercises/RENDER-CHECK-RECEIPT.json",
  "insertions": [
    {
      "draft_path": "_exercises/EXERCISE-DRAFT-3-1.md",
      "target_file": "_03-computing-credible-intervals.qmd",
      "planned_after_line": 87,
      "actual_inserted_at_line": 87,
      "lines_inserted": 23,
      "first_60_chars_at_inserted_line": "::: {.exercise-predict correct=\"C\"}\n\nBefore reading the"
    }
  ],
  "audit_blocks_preserved": "6/6",
  "post_integration_render_check": "PASS",
  "summary": { "total_insertions": 22, "sections_modified": 6 }
}
```

Validator (`validate_integrate_receipt.py`):
- Schema validation
- `audit_blocks_preserved` matches the chapter's section count
- Every `insertions[].first_60_chars_at_inserted_line` is `sed -n`-verifiable post-insertion
- `post_integration_render_check == "PASS"` (re-runs the Phase 3 validator on the committed section files)
- No section file's audit-block preamble was modified (cross-checked via `check_audit_block_intact.py`)

---

### Component [XC6] — Hooks Layer (Cross-Tool, with Per-Tool Caveats)

**Responsibility:** Tier-1 enforcement on all four target tools. Auto-runs validators on subagent completion (Phase 1 → triage receipt; Phase 2 → per-section author receipt; Phase 4 → integrate receipt). Auto-runs the audit-block-integrity check on every `.qmd` file edit (inherited from edit-workflow EC7).

| Tool | Hook config | Subagent firing |
|---|---|---|
| Cursor | `.cursor/hooks.json` `subagentStop` matchers: `designer`, `exercise-author`, `integrator` | ✅ fires inside subagents |
| Claude Code | `.claude/settings.json` `hooks` block | ✅ fires inside subagents |
| OpenCode | `.opencode/plugin/textbook-validators.ts` extends with `exercises-validators` events | ✅ in-process |
| Kiro | `.kiro/hooks/exercises-*.kiro.hook` watching sentinel files | ❌ does not fire in subagents — uses sentinel pattern |

The `afterFileEdit` hook with `failClosed: true` (inherited from edit-workflow [EC7]) runs `check_audit_block_intact.py` on every `_NN-section.qmd` write — this is the cross-workflow safety net for audit-block preservation across editing AND exercises insertion.

The render-check (Phase 3) is NOT an LLM hook — it runs as a Python script directly invoked by the orchestrator and is the load-bearing forcing function. Hooks are belt-and-suspenders on top.

---

## 5. Artifact Schemas Summary

The five phase artifacts are the contracts between phases:

| Artifact | Phase | Path | Schema file |
|---|---|---|---|
| `EXERCISE-DESIGN.json` | Phase 1 output | `_exercises/EXERCISE-DESIGN.json` | `exercise_design_schema.json` |
| `EXERCISE-DRAFT-{N}-{i}.md` | Phase 2 per-exercise (markdown, not JSON) | `_exercises/EXERCISE-DRAFT-{N}-{i}.md` | (validated by render-check) |
| `EXERCISE-RECEIPT-{N}.json` | Phase 2 per-section | `_exercises/EXERCISE-RECEIPT-{N}.json` | `exercise_receipt_schema.json` |
| `RENDER-CHECK-RECEIPT.json` | Phase 3 | `_exercises/RENDER-CHECK-RECEIPT.json` | `render_check_schema.json` |
| `CLEANUP-RECEIPT.json` | Phase 4 step a | `_exercises/CLEANUP-RECEIPT.json` | (rollback log; no formal schema) |
| `INTEGRATE-RECEIPT.json` | Phase 4 step b | `_exercises/INTEGRATE-RECEIPT.json` | `integrate_receipt_schema.json` |

All artifacts live under `{Chapter}/_exercises/` (a sibling to `_edit/`, `_research/`, `_manifests/`, `_state/`). Deleting any artifact re-enables that phase to run again. The orchestrator's idempotence check is artifact-mtime-based.

## 6. Validators

| Script | Phase Gate | Lines |
|---|---|---|
| `validate_exercise_design.py` | Phase 1 → 2 | ~120 |
| `validate_exercise_receipt.py` | Phase 2 per-section (hook-callable on subagentStop) | ~80 |
| `validate_render_check.py` | Phase 3 (the load-bearing one) | ~250 |
| `cleanup_old_exercises.py` | Phase 4a (deterministic Python) | ~80 |
| `validate_integrate_receipt.py` | Phase 4b → done | ~100 |
| `check_audit_block_intact.py` | reused from edit-workflow | (existing) |
| `exercises_audit.py` | user-runnable | ~150 |

Total new validator code: ~780 lines of Python. Reuses `jsonschema`, `pyyaml`, and the `pandoc` CLI (must be installed; cross-platform via `brew install pandoc` / `apt install pandoc`).

The user-facing audit (`exercises_audit.py`):

```
============================================================
EXERCISES INTEGRITY AUDIT: Statistics/Bayesian Credible Intervals
============================================================
Phase 1 (Design):                    ✓
  Sections designed:                  6/6
  Total exercises planned:           22
  By type:                           MCQ 11, Predict 5, Order 4, Fillin 2
  Budget compliance:                 6/6 sections within budget
  Cleanup targets identified:         8

Phase 2 (Author):                    ✓
  Sections authored:                  6/6
  Drafts produced:                   22/22
  Drafts non-empty:                  22/22

Phase 3 (Render-Check):              ✓ ← THE LOAD-BEARING PHASE
  Drafts checked:                    22/22
  Drafts passed:                     22/22
  AST violations:                     0

Phase 4 (Integrate):                 ✓
  Old exercise blocks removed:        8/8
  Audit blocks preserved:             6/6
  Drafts inserted:                   22/22
  Post-integration render-check:     PASS

INTEGRITY SCORE: 100/100  ✓ READY

Run quarto render to confirm exercises display correctly in HTML.
```

---

## 7. Directory Layout (Deltas vs Companion Proposals)

The exercises workflow shares the directory layout from the companion proposals. New files this decomposition adds:

```
AI-Learning-Gems/
├── .cursor/
│   ├── commands/
│   │   ├── exercises-for-textbook-chapter.md    # [XC1] Thin orchestrator (~50 lines)        ← refactored
│   │   ├── exercises-design.md                  # [XC2] Phase 1 entry (~80 lines)            ← NEW
│   │   ├── exercises-author.md                  # [XC3] Phase 2 entry (~80 lines)            ← NEW
│   │   ├── exercises-render-check.md            # [XC4] Phase 3 entry (~30 lines, script wrapper) ← NEW
│   │   └── exercises-integrate.md               # [XC5] Phase 4 entry (~60 lines)            ← NEW
│   ├── agents/
│   │   ├── exercise-designer.md                 # [XC2] ~100 lines                            ← NEW
│   │   ├── exercise-author.md                   # [XC3] ~120 lines                            ← NEW
│   │   └── exercise-integrator.md               # [XC5] ~80 lines                             ← NEW
│   └── hooks.json                               # extend with exercises subagent matchers
│
├── scripts/
│   ├── run_exercises_pipeline.py                # [XC1] Python orchestrator (~120 lines)     ← NEW
│   ├── validators/
│   │   ├── exercise_design_schema.json                                                        ← NEW
│   │   ├── exercise_receipt_schema.json                                                       ← NEW
│   │   ├── render_check_schema.json                                                           ← NEW
│   │   ├── integrate_receipt_schema.json                                                      ← NEW
│   │   ├── validate_exercise_design.py                                                        ← NEW
│   │   ├── validate_exercise_receipt.py                                                       ← NEW
│   │   ├── validate_render_check.py             # The load-bearing AST validator             ← NEW
│   │   ├── cleanup_old_exercises.py             # Deterministic Phase 4a                     ← NEW
│   │   └── validate_integrate_receipt.py                                                      ← NEW
│   └── exercises_audit.py                       # [XC9] User-runnable (~150 lines)            ← NEW
│
└── {Domain}/
    └── {Chapter Name}/
        ├── _exercises/                                                                         ← NEW directory
        │   ├── EXERCISE-DESIGN.json             # Phase 1 artifact
        │   ├── EXERCISE-DRAFT-1-1.md            # Phase 2 per-exercise drafts
        │   ├── EXERCISE-DRAFT-1-2.md
        │   ├── EXERCISE-DRAFT-3-1.md
        │   ├── ...
        │   ├── EXERCISE-RECEIPT-1.json          # Phase 2 per-section receipts
        │   ├── EXERCISE-RECEIPT-3.json
        │   ├── ...
        │   ├── RENDER-CHECK-RECEIPT.json        # Phase 3 artifact (THE GATE)
        │   ├── CLEANUP-RECEIPT.json             # Phase 4a artifact
        │   ├── INTEGRATE-RECEIPT.json           # Phase 4b artifact
        │   └── _exercises_log.txt               # Append-only orchestrator log
        ├── _edit/                               # [unchanged from edit workflow]
        ├── _manifests/                          # [unchanged]
        ├── _state/                              # [unchanged]
        └── _research/                           # [unchanged]
```

**Critical directory invariants:**
- `_exercises/` is owned by the exercises pipeline; other workflows never touch it.
- The exercises pipeline READS from section files but only WRITES to `_exercises/*` artifacts and (in Phase 4) the section files themselves.
- The exercises pipeline NEVER modifies `_manifests/`, `_state/`, `_research/`, or `_edit/`.
- The render-check artifact (`RENDER-CHECK-RECEIPT.json`) is the gate: if it shows any FAIL, Phase 4 cannot proceed. Deleting this artifact forces Phase 3 to re-run.

---

## 8. Cross-Tool Implementation Details

The exercises workflow uses the same cross-tool primitives and per-tool adaptations as the companion proposals. Exercises-specific notes:

- **Phase 1 (Design)** uses Read tools and the cross-tool subagent dispatch in `scripts/spawn_subagent.py`. No tool-specific concerns.
- **Phase 2 (Author)** spawns parallel-capped subagents with the auto-attached `exercise-syntax.mdc` rule. The rule is path-scoped via `globs: _[0-9][0-9]-*.qmd, _exercises/*.md` so it auto-attaches to both section-editing and draft-authoring contexts. Same `sync_rules_across_tools.py` from the companion proposals.
- **Phase 3 (Render-Check)** is **pure Python invoking the system's `pandoc` CLI**. Universal across all four tools. The only tool-specific consideration: `pandoc` must be installed. The orchestrator's pre-flight check (`scripts/check_dependencies.py`) verifies pandoc availability and prints the install command for the user's OS if missing.
- **Phase 4 (Integrate)** uses a single sequential subagent + Python cleanup. Standard cross-tool dispatch.

For Kiro specifically: per XC2 (Kiro hooks don't fire in subagents), use Option XC1-A (markdown orchestrator) with parent-level hooks watching sentinel files. The pipeline still produces all five phase artifacts.

The four new commands (`/exercises-design`, `/exercises-author`, `/exercises-render-check`, `/exercises-integrate`) are independently invokable on every tool — useful for resume / retry. The orchestrator (`/exercises-for-textbook-chapter`) is just a convenience.

---

## 9. Pipeline Lifecycle (End-to-End Walkthrough)

User invokes `/exercises-for-textbook-chapter "Statistics/Bayesian Credible Intervals"`.

### Stage 0 — Initialization (orchestrator, ~10 seconds)
1. Verify `_manifests/` and `_state/` exist (chapter must have been written first).
2. Check pandoc availability via `scripts/check_dependencies.py`. If missing, halt with install instructions.
3. Create `_exercises/` subfolder if missing.
4. Check for existing artifacts; emit "resuming from phase N" if any exist.
5. Pre-flight: every section file has a valid `<!-- SOURCE AUDIT v1 -->` preamble.

### Phase 1 — Design (~3 minutes)
1. Spawn `exercise-designer` subagent with the chapter path.
2. Subagent reads all section files, identifies pedagogically appropriate exercise placements per the budget, builds cleanup list.
3. Subagent writes `_exercises/EXERCISE-DESIGN.json`.
4. Orchestrator runs `validate_exercise_design.py`. Halt on budget violation.
5. Per-section design counts emitted to chat.

### Phase 2 — Author (~5-8 minutes; parallel-capped at 4)
1. For each section with ≥1 planned exercise, spawn an `exercise-author` subagent with: section file path, design slice for that section.
2. Each subagent runs SCAN protocol, then authors one draft per planned exercise per `exercise-syntax.mdc` (auto-attached).
3. Each subagent writes drafts (`_exercises/EXERCISE-DRAFT-{N}-{i}.md`) and a per-section receipt.
4. Orchestrator's `subagentStop` hook runs `validate_exercise_receipt.py {N}` per section.
5. Per-section ✓/⚠/✗ summary to chat.

### Phase 3 — Render-Check (~30 seconds; THE LOAD-BEARING GATE)
1. Run `python3 scripts/validate_render_check.py CHAPTER` (no subagent — pure Python).
2. Script invokes `pandoc -f markdown -t json` on each draft, walks the AST, validates per exercise type.
3. Writes `_exercises/RENDER-CHECK-RECEIPT.json`.
4. If any draft fails: HALT. Emit precise per-draft message in chat with violation reason and which section to re-run via `/exercises-author --section=N`.
5. If all pass: green-light Phase 4.

### Phase 4 — Integrate (~3 minutes)
1. **Step 4a (Python):** `scripts/cleanup_old_exercises.py` removes old exercise blocks and legacy callouts at line ranges from `EXERCISE-DESIGN.json#cleanup_targets`. Writes `CLEANUP-RECEIPT.json`. Re-runs `check_audit_block_intact.py` post-cleanup.
2. **Step 4b (subagent):** Spawn `exercise-integrator` subagent with section files (post-cleanup) + drafts + receipts.
3. Subagent inserts each draft at its `placement.after_line` (with index-shift handling for prior insertions in same section), preserving audit blocks and existing colors.
4. Subagent writes `INTEGRATE-RECEIPT.json`.
5. Orchestrator runs `validate_integrate_receipt.py` (which re-runs render-check on the COMMITTED section files as defense-in-depth). Halt on failure.

### Stage 5 — Final Audit (user-runnable, <1 minute)
The orchestrator's final chat message:
> ✅ Exercises pipeline complete in 12 minutes.
> Run `python3 scripts/exercises_audit.py "Statistics/Bayesian Credible Intervals"` to verify.
> Run `quarto render` to confirm rendered HTML displays exercises correctly.

Total wall-clock: typically 10-15 minutes for a 6-7 section chapter — faster than editing because exercises authoring is more bounded than prose rewriting.

---

## 10. Mitigations for Agent Imperfection

| Failure mode | Mitigation | Layer |
|---|---|---|
| **Author writes options as standalone paragraphs** (most common silent-rendering failure) | Phase 3 render-check runs Pandoc and detects the AST is a `Para` chain instead of `BulletList`; FAIL → halt → user re-runs Phase 2 with feedback | [XC4] |
| **Author uses letter prefixes (`A)`, `[A]`)** | Render-check detects `OrderedList` inside the `BulletList` (Pandoc parses `A)` as an ordered-list trigger); FAIL | [XC4] |
| **Author wraps fill-in `{...}` in bold or italic** | Render-check detects the `{LETTER|...}` pattern is inside a `Strong` or `Emph` node, not a bare `Str`; FAIL | [XC4] |
| **Author puts LaTeX braces on same line as fill-in** | Render-check regex specifically looks for `\$.*\{.*\}.*\$` AND `\{[A-Z]\|` on the same line item; FAIL with the precise problematic line | [XC4] |
| **Designer violates per-section budget** | `validate_exercise_design.py` enforces budget rules: intro 1-2, body 3-4, closing 0; FAIL halts before any authoring | [XC2] |
| **Designer places exercise in `_99-closing.qmd`** | Validator rejects any exercise targeting closing or math-background sections | [XC2] |
| **Author skips an exercise from the design** | `validate_exercise_receipt.py` cross-checks every design entry has a corresponding draft; missing drafts → FAIL | [XC3] |
| **Integrator strips the audit-block preamble** | `afterFileEdit` hook (cross-tool) runs `check_audit_block_intact.py`; `failClosed: true` halts integrator if preamble was modified | [XC6] hook layer |
| **Integrator inserts at wrong line** | `INTEGRATE-RECEIPT.json` records `actual_inserted_at_line` + `first_60_chars_at_inserted_line`; validator `sed -n`-verifies the snippet is at the claimed line | [XC5] receipt + validator |
| **Cleanup removes too much (e.g., a Common Misconception callout it shouldn't have)** | `cleanup_old_exercises.py` only removes line ranges from `cleanup_targets` (the design's explicit list); never makes its own decisions about what to remove. `CLEANUP-RECEIPT.json` is a rollback log. | [XC5] cleanup design |
| **User re-runs and accidentally duplicates exercises** | Orchestrator's idempotence: re-run starts at Phase 1, regenerates design, cleanup targets include the previously-inserted exercises (they're now "old `.exercise-*` blocks" per the design's regex); insertion replaces them. Net: idempotent. | [XC1] orchestrator |
| **Pandoc not installed on user's machine** | Pre-flight `scripts/check_dependencies.py` halts with install command (`brew install pandoc` / `apt install pandoc`) before any subagents are spawned | Stage 0 init |
| **Lua filter version mismatch** (filter expects different AST shape than what Pandoc produces) | Render-check runs against the ACTUAL filter logic (transcribed from the Lua source into Python AST checks); if the filter is updated, the validator's check logic is updated alongside in the same PR | [XC4] testing discipline |

---

## 11. Rollout Plan

### v0 — One-Day Spike (validate the render-check mechanism)
- Implement `validate_render_check.py` only.
- Hand-craft 12 sample exercise drafts: 3 valid (one per non-fillin type) + 9 deliberately broken (options as paragraphs, letter prefixes, bold-wrapped fill-in, LaTeX-on-fillin-line, missing feedback divs, wrong correct-attribute regex, etc.).
- Run the validator. Confirm: 3/3 valid pass; 9/9 broken FAIL with the specific violation reason.
- **Decision gate:** does the Pandoc-AST validator catch every documented failure mode in `exercise-syntax.md`?

### v1 — 1.5 Weeks (full four-phase pipeline)
- Implement remaining schemas: `exercise_design_schema.json`, `exercise_receipt_schema.json`, `render_check_schema.json`, `integrate_receipt_schema.json`.
- Implement remaining validators (`validate_exercise_design.py`, `validate_exercise_receipt.py`, `cleanup_old_exercises.py`, `validate_integrate_receipt.py`).
- Write subagent definitions: `exercise-designer.md`, `exercise-author.md`, `exercise-integrator.md`.
- Refactor `/exercises-for-textbook-chapter` into the orchestrator (Option XC1-B for Cursor/Claude/OpenCode; XC1-A for Kiro).
- Sync to `.claude/`, `opencode.json`, `.kiro/` via `sync_rules_across_tools.py`.
- Test: add exercises to one new chapter end-to-end. Run `exercises_audit.py`. Score must be 100/100.
- Test: deliberately introduce a syntax violation in Phase 2 (e.g., letter prefix), verify Phase 3 catches it and halts.
- Test: idempotence — re-run the workflow, confirm the second run produces the same output (exercises replaced with fresh ones, no duplicates).

### v1.1 — 3 Days (hooks + edge cases)
- Implement hooks layer for all four tools.
- Add edge-case test fixtures: exercises near callout boundaries, exercises near multi-line equations, sections with prior color spans.
- Profile: if Phase 2 wall time exceeds 8 minutes for typical chapters, raise the parallel-cap from 4 to 6.

### v2 — One Week (selective re-authoring + improved feedback loops)
- Add `--section=N` flag for re-authoring exercises in only that section (use case: render-check failure on one section).
- Add `--exercise-type-bias=mcq:high,fillin:low` flag for users who want type-distribution control.
- Improve render-check FAIL output: include a unified diff showing what to change in the draft markdown.

### v3 — Tool-Specific Accelerators (Optional)
- **Claude Code**: use `--json-schema` SDK flag to validate exercise receipts at subagent return time.
- **OpenCode**: implement render-check as an `.opencode/tools/*.ts` first-class custom tool.
- **Cursor**: package as a Cursor Plugin to the Marketplace.
- **Kiro**: package as a Kiro Power.

---

## 12. Success Metrics (v1 Done Criteria)

Measured automatically by `exercises_audit.py`:

| Metric | Target |
|---|---|
| Design budget compliance (% of sections within budget) | 100% |
| Author drafts produced (% of design entries with corresponding drafts) | 100% |
| Render-check pass rate (% of drafts that pass Pandoc-AST validation) | ≥98% on first try, 100% after re-author |
| Audit-block preservation post-integration | 100% |
| Post-integration render-check (re-running on committed section files) | 100% PASS |
| Cleanup correctness (no Common Misconception / Think Hard / Retrieval Practice callouts removed) | 100% |
| Total pipeline wall time | ≤15 minutes for a 7-section chapter |
| Idempotence (re-run produces equivalent output, no duplicates) | 100% |
| Cross-tool equivalence | Same audit score ±0 across Cursor / Claude / OpenCode / Kiro |
| Quarto render output | Exercises display correctly in HTML (manual visual check) |

User-facing acceptance test:
- User runs `/exercises-for-textbook-chapter` on a freshly-edited chapter.
- Pipeline completes in <15 min without manual intervention.
- User runs `exercises_audit.py`; score is 100/100.
- User runs `quarto render`; opens the HTML; every exercise is interactive (clickable options, working feedback divs, correct ordering checks).
- User re-runs the workflow; second run completes faster (resumes from cached design if no section content changed) and produces equivalent output.

---

## 13. Open Questions (For User Review Before Implementation)

1. **Where do exercise artifacts live?** Proposed: `{Chapter}/_exercises/`. Consistent with other workflow artifact dirs.

2. **Pandoc as a hard dependency** — the render-check requires `pandoc` to be installed. Acceptable? Alternative: bundle a Python markdown-AST parser (lower fidelity to actual Lua filter behavior). Recommendation: hard dependency on pandoc; install instructions in `README.md`.

3. **Render-check feedback loop with author** — when render-check fails, the orchestrator emits a chat message with the violation. Should it auto-respawn the author subagent with the failure as context, or wait for the user to re-invoke? Recommendation: auto-respawn up to 2 times (mirrors edit-workflow's retry pattern); after that, halt and surface to user.

4. **Design-time exercise type selection** — the designer subagent decides which type each exercise is. Should the user have an override mechanism? Recommendation: optional `--type-overrides=3.1=fillin,3.2=mcq` flag.

5. **Coexistence with edit-workflow's color spans** — exercises authored in Phase 2 should NOT introduce color spans (those are the edit-workflow's responsibility). The exercise-syntax rules need a "no color spans inside exercise blocks" addition. Recommendation: add this rule explicitly to `exercise-syntax.mdc` in the v1 rollout.

6. **Migration of existing chapters** — chapters with exercises authored under the current monolith may have undetected rendering issues. Recommendation: separate `/exercises-validate <chapter>` command (just runs render-check on existing committed exercises) for v1.1.

7. **Budget overrides** — soft constraints XS5/XS6 give wall-time and cost targets, but some chapters may genuinely need >26 exercises. Recommendation: keep the budget rules strict for v1; add `--budget-override` flag for v2 with documented rationale.

---

## 14. Summary

The current monolithic `/exercises-for-textbook-chapter` (546 lines, 4 exercise types defined inline, parallel-subagent dispatch with no structured artifact between dispatch and final-syntax-check, and a brittle final-validation step that catches only the most obvious violations) fails because the dominant failure mode — **silent rendering breakage from Pandoc-AST shape mismatches** — is invisible to LLM judgment and to surface-level regex checks.

This proposal decomposes it into **four phases** with structured artifacts at each boundary:

1. **Design** (`EXERCISE-DESIGN.json`) — pedagogically grounded type+placement+stem-draft per exercise, validated against per-section budget rules
2. **Author** (per-exercise `EXERCISE-DRAFT-{N}-{i}.md` + per-section `EXERCISE-RECEIPT-{N}.json`) — parallel section-author subagents author Quarto exercise blocks per `exercise-syntax.mdc` (auto-attached)
3. **Render-Check** (`RENDER-CHECK-RECEIPT.json`) — **THE LOAD-BEARING PHASE**: pure Python invoking the actual Pandoc CLI, validates AST shape against Lua filter expectations, halts on any violation
4. **Integrate** (`CLEANUP-RECEIPT.json` + `INTEGRATE-RECEIPT.json`) — deterministic Python cleanup of old blocks + integrator subagent inserts validated drafts at planned positions, preserving audit-block preambles

Five Python validators (~780 lines total) gate phase transitions deterministically. The orchestrator (`/exercises-for-textbook-chapter`) is a thin wrapper — ~50 lines of markdown + ~120 lines of Python.

The architecture is **structurally identical** to the companion proposals — same four-tool primitive set, same Python-orchestrator-with-hooks-as-Tier-1-enforcement model, same `.agents/skills/` cross-tool standard, same per-tool sync via `sync_rules_across_tools.py`. The four pipelines (research → write → edit → exercises) hand off via:
- **Research → Write**: `INVENTORY.json` + `TEXTBOOK-PLAN.md`
- **Write → Edit**: section `.qmd` files with `<!-- SOURCE AUDIT v1 -->` preambles + `_manifests/` + `_state/`
- **Edit → Exercises**: post-edit section files with intact audit blocks + color spans
- **Exercises → done**: section files with integrated exercise blocks; `quarto render` produces interactive HTML

Exercises' invariants (XC5, XC6, XC8) make this composability safe: insertion never modifies preserved artifacts, exercise-syntax rules only apply when relevant files are touched.

The single critical innovation vs all three other proposals: the **Pandoc-AST validator** runs every draft through the actual rendering parser before commit. This eliminates silent-rendering failures at their root — a class of bug that no LLM judgment, regex heuristic, or human review of markdown can reliably catch.

Total new code: ~1,300 lines (exercises-specific). Replaces 546 lines of monolithic markdown with structurally enforced compliance.

**Recommendation:** approve v0 (one-day spike on the Pandoc-AST validator + adversarial test fixtures) immediately. Approve v1 contingent on v0 success (the validator catches all documented `exercise-syntax.md` failure modes).

---

*End of design proposal.*

