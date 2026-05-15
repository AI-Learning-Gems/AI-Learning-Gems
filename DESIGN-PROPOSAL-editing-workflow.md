# Design Proposal: Edit-Textbook-Chapter Workflow Decomposition

> **Author:** Staff-Engineer-style design proposal, drafted 2026-05-15, draft v0.1.
> **Status:** Companion to `DESIGN-PROPOSAL-writing-workflow.md` (writing) and `DESIGN-PROPOSAL-research-workflow.md` (research). This proposal decomposes the *editing* workflow.
> **Scope:** Replace the current monolithic `/edit-textbook-chapter` (1,080 lines, 21 rules + 4 workflow steps + quality checklist + coloring pass) with a verifiable, cross-tool, sub-agent-orchestrated pipeline.
> **Target IDEs/CLIs:** Cursor (primary), Claude Code, OpenCode, Kiro IDE+CLI.

---

## 0. TL;DR

The current `/edit-textbook-chapter` is actually the *most well-designed* of the three monolithic workflows. Unlike the write and research workflows, it already uses subagents per-section (Step 2), has a forced "Rules Relevance Assessment" before editing (Step 2b, Step 0), dispatches issues by severity tier, and has cross-section passes that only the main agent can do (coloring, notation, pedagogy). The architecture is sound.

**The problem is the same as the others: the main agent drifts.** Specifically:
- (a) Triage (Step 1) is the main agent reading ALL files and triaging ALL issues — enormous context pressure
- (b) The main agent must "collect PEDAGOGY FLAG reports from subagents" and then "build a per-flag source manifest" — multi-step reasoning prone to the same fatigue drift observed in writing
- (c) The coloring pass (Step 2.5) and consistency pass (Step 3) are the main agent operating on the full chapter simultaneously — drift risk by the 5th section
- (d) Final verification (Step 4) is just grep commands — should be a Python script, not agent-driven

**This proposal's strategy is: keep the existing architecture, but add the same forcing functions from the companion proposals:**
1. Replace the monolithic orchestrator's own context with **structured triage output** (`_editing/TRIAGE.json`) — the Step 1 triage becomes a subagent with a JSON-schema artifact
2. Add **per-section edit receipts** (analogous to the writing-workflow's audit blocks) — subagent edits are verified
3. Replace the main-agent-driven Step 4 (grep verification) with a **Python validator script** (`scripts/verify_edit_pass.py`)
4. Add the **same hook-layer enforcement** from the companion proposals

**Net change: keep the 21 rules, keep the subagent-per-section pattern, keep the coloring/consistency/pedagogy passes — but add structured checkpoints between them.**

**Estimated effort:** v0 (1 day) for the Python verify-edit-pass.py script; v1 (1.5 weeks) for the full pipeline with triage JSON + edit receipts + hooks.

---

## 1. High-Level Goals

The editing workflow must achieve, on every chapter edited:

1. **Prose quality measurably improves** — em dashes eliminated, banned words gone, clause chains broken, given-new flow applied, unlinked citations fixed, notation consistent.
2. **No content corruption** — technical facts, equations, code blocks, exercise syntax, cross-references, and source attributions are NEVER changed by the editor.
3. **User-verifiable in <2 minutes** — a Python script (`scripts/verify_edit_pass.py`) runs the same greps as Step 4 and reports pass/fail. The user does not need to re-read the chapter to verify the edit pass.
4. **Idempotent** — running the edit pass again produces zero or near-zero additional changes.
5. **Cross-section consistency enforced** — notation, terminology, coloring, and transitions are coherent across all sections, not just locally correct.
6. **Pedagogy issues surfaced and fixed with source-grounding** — flagged analogies and premature abstractions are rewritten based on actual source content, not training data.
7. **Cross-tool portability** — runs on Cursor, Claude Code, OpenCode, and Kiro with equivalent guarantees.

---

## 2. What's Already Good (Preserving What Works)

The existing `/edit-textbook-chapter` has several architecturally sound patterns that this proposal preserves:

| Existing Pattern | Why It Works | Keep? |
|---|---|---|
| **Per-section subagent dispatch** (Step 2) | Clean context per section; prevents drift within section editing; parallelizable | ✅ Keep |
| **Severity-tiered editing** (Tier 1 → 2 → 3) | Prioritizes correctness-critical fixes (em dashes, notation) over style (sentence rhythm). If the agent runs out of budget, the important stuff is already done. | ✅ Keep |
| **Forced Rules Relevance Assessment** (Step 2b, Step 0) | SCAN-protocol equivalent — forces the subagent to produce output tokens that demonstrate engagement with writing-style.md. This IS the proven forcing function. | ✅ Keep |
| **Cross-section passes by main agent only** (coloring, consistency) | Subagents editing Section 3 cannot know Section 1's color map. These truly require cross-section awareness. | ✅ Keep |
| **Pedagogy fixer as a separate subagent** (Step 2.6) | Different permissions (can change content meaning), different context (reads sources), different scope (cross-section). Correctly modeled as a distinct actor. | ✅ Keep |
| **DO NOT CHANGE list** (equations, code, exercise syntax, etc.) | Clear boundary between "what the editor touches" and "what it preserves." The equivalent of a safety contract. | ✅ Keep |
| **Notation table extracted once, distributed to all subagents** (Step 1c) | Single source of truth for symbol consistency. | ✅ Keep |

**What these patterns already achieve:** the per-section subagents with forced rules assessment + severity tiers are the *right architecture*. The edit workflow doesn't need the deep structural redesign that the research and writing workflows need.

---

## 3. What's Broken (The Specific Failure Modes)

Despite the good architecture, the edit workflow still fails in practice. Here's why:

### 3.1 The Triage (Step 1) Is a Single-Agent Bottleneck

Step 1 asks the main agent to: read ALL rule files, read ALL section files, extract the notation table, then triage ALL issues by severity across ALL files. This requires holding 7+ sections (each ~2000 words) + 5 rule files (totaling ~30K chars) in working memory simultaneously.

**Observed failure:** By the time the main agent finishes reading section 6, it has forgotten the notation table from section 1. Triage quality degrades toward later sections. The triage output (a mental checklist) lives only in chat context — which gets summarized away.

**Fix:** Make the triage a **subagent with a structured JSON output** (`_editing/TRIAGE.json`). The triage subagent reads all files (clean context), produces the per-section issue list as structured data, and writes it to disk. The main agent consumes the file instead of holding the triage in memory.

### 3.2 The Main Agent Must "Collect and Build" (Step 2.6a)

After section-editing subagents complete, the main agent must (a) collect PEDAGOGY FLAG reports from all subagents, (b) identify relevant sources for each flag, (c) build a "per-flag source manifest," and (d) spawn the pedagogy fixer subagent with this manifest.

**Observed failure:** Same fatigue drift as the writing workflow. By the time all section subagents return, the main agent has processed ~7 subagent reports and is deep in context. Building the per-flag source manifest from TEXTBOOK-PLAN.md is tedious multi-step work that the agent short-circuits ("I'll just pass the flags directly to the fixer without the source manifest").

**Fix:** The aggregation step (collect flags + build manifest) should be a **Python script** (`scripts/aggregate_pedagogy_flags.py`) that reads subagent reports from disk, cross-references against the per-section source headers, and produces `_editing/PEDAGOGY-MANIFEST.json`. The pedagogy fixer subagent reads this file directly — the main agent never does the lookup itself.

### 3.3 The Grep Verification (Step 4) Is Agent-Driven

Step 4 asks the main agent to "run these searches across all files" — but the agent is doing grep. This should be a Python script from the start. There's no judgment involved; it's purely mechanical regex.

**Observed failure:** The agent runs some greps, misses others, or doesn't fix all issues found. Sometimes it runs the greps but then doesn't re-read the section files to apply fixes.

**Fix:** `scripts/verify_edit_pass.py` — a deterministic Python script that runs all 8 greps from Step 4b, reports pass/fail per check, and exits non-zero if any check fails. The agent (or user) runs it after the edit pass and gets a clear answer.

### 3.4 The Coloring Pass (Step 2.5) Has No Verification

The coloring pass asks the main agent to build a color map, apply it across sections, then self-verify consistency. But there's no Python-verifiable artifact. The main agent could skip half the sections and the user wouldn't know until reading the chapter.

**Observed failure:** Colors applied inconsistently — some sections get colored, others don't. Hex codes sometimes differ between sections for the same concept.

**Fix:** The coloring pass produces `_editing/COLOR-MAP.json` (structured output: which hex → which concept) and `scripts/verify_coloring.py` checks that every section's colored terms match the map.

### 3.5 Per-Section Subagent Reports Are Unstructured

Subagent reports ("what it changed, grouped by severity tier") are returned as chat-output prose. The main agent consumes them by reading chat. If context is summarized between Step 2 and Step 3, the reports are lost.

**Fix:** Each section-editing subagent writes a structured receipt to `_editing/receipts/{section_label}.json` with: changes made (by tier), notation gaps flagged, pedagogy flags raised, word count before/after.

---

## 4. The Proposed Architecture (Minimal Structural Changes)

The architecture preserves the existing 4-step flow but adds structured artifacts at each phase boundary:

```
┌──────────────────────────────────────────────────────────────────────────┐
│ User: /edit-textbook-chapter <chapter.qmd>                               │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ [EC1] Orchestrator (~80 lines)                                           │
│ Calls phases in sequence; consumes JSON artifacts; runs validators       │
└──────────────────────────────────────────────────────────────────────────┘
         │              │              │              │              │
         ▼              ▼              ▼              ▼              ▼
┌─────────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌────────┐
│ Step 1      │  │ Step 2    │  │ Step 2.5  │  │ Step 2.6  │  │ Step 3 │
│ TRIAGE      │  │ PER-SECT  │  │ COLORING  │  │ PEDAGOGY  │  │ CONSIS │
│ subagent    │  │ subagents │  │ main agent│  │ subagent  │  │ pass   │
│ → JSON      │  │ → receipts│  │ → JSON    │  │ → JSON    │  │ script │
└─────────────┘  └───────────┘  └───────────┘  └───────────┘  └────────┘
         │              │              │              │              │
         ▼              ▼              ▼              ▼              ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ [EC7] verify_edit_pass.py — deterministic grep + color + receipt check   │
└──────────────────────────────────────────────────────────────────────────┘
```

**Artifacts produced (all in `{Chapter}/_editing/`):**

| Artifact | Producer | Consumer | Purpose |
|---|---|---|---|
| `TRIAGE.json` | Step 1 triage subagent | Orchestrator → per-section subagents | Per-section severity-ordered issue lists |
| `receipts/{section}.json` | Per-section editing subagents | Orchestrator → aggregator | What was changed, notation gaps, pedagogy flags |
| `PEDAGOGY-MANIFEST.json` | `scripts/aggregate_pedagogy_flags.py` | Pedagogy fixer subagent | Per-flag source manifest (auto-built from receipts + source headers) |
| `COLOR-MAP.json` | Main agent (Step 2.5) | `scripts/verify_coloring.py` | Hex→concept mapping |
| `EDIT-REPORT.json` | `scripts/verify_edit_pass.py` | User | Final pass/fail per check |

---

## 5. Component Breakdown

### [EC1] — Orchestrator (`/edit-textbook-chapter`)

**Responsibility:** Thin dispatcher. Reads the chapter index file, dispatches each step, runs Python validators between steps, halts on failure.

**Implementation:** Same Option 1B pattern as the companion proposals — Python orchestrator invoked from a thin slash command. For Kiro: fallback to Option 1A (markdown-driven).

**Key difference from write/research orchestrators:** The edit orchestrator has MORE steps (5 phases) but FEWER per-step subagents (triage = 1 subagent, per-section = N subagents, coloring = main agent, pedagogy = 0-1 subagent, consistency = 1 Python script). Total subagent count: N+1 to N+3 for a typical chapter.

---

### [EC2] — Triage Subagent

**Responsibility:** Read all section files + all rule files + the notation table. Produce `_editing/TRIAGE.json` with per-section severity-ordered issue lists.

**MUST do:**
- Read `writing-style.md`, `exercise-syntax.md`, `semantic-coloring.md`, `quarto-conventions.md` IN FULL
- Read every section file IN FULL
- Extract the notation table from `_01-introduction.qmd`
- For each section: identify Tier 1/2/3 issues (per the existing Rule categorization in the edit workflow)
- Emit `TRIAGE.json` with the schema below

**MUST NOT do:**
- Edit any file (read-only subagent — `readonly: true` in frontmatter)
- Fix any issue (that's the per-section subagents' job)

**`TRIAGE.json` schema (preview):**

```json
{
  "schema_version": "1.0",
  "chapter": "Statistics/Optimal Transport",
  "triaged_at": "2026-05-15T16:00:00Z",
  "notation_table": {
    "symbols": [
      { "symbol": "$\\mu$", "definition": "source distribution", "valid_values": "$\\mu \\in \\mathcal{P}(X)$", "example": "$\\mu = \\text{Uniform}[0,1]$" }
    ]
  },
  "sections": [
    {
      "file": "_01-introduction.qmd",
      "word_count": 2847,
      "tier_1_issues": [
        { "rule": "em_dash", "line": 47, "context": "...the result — surprisingly..." },
        { "rule": "unlinked_citation", "line": 112, "context": "(Villani et al., 2003)" }
      ],
      "tier_2_issues": [
        { "rule": "bare_this", "line": 89, "context": "This is then used..." },
        { "rule": "register_collision", "line": 134, "context": "paragraph mixes analogy with gradient claim" }
      ],
      "tier_3_issues": [
        { "rule": "given_new_flow", "line": 67, "context": "new info opens the sentence" }
      ],
      "pedagogy_flags": [
        { "type": "analogy_accuracy", "line": 45, "description": "\"earth-moving\" analogy may mislead about continuous measures" }
      ]
    }
  ]
}
```

**Validation:** `scripts/validate_triage.py` checks:
- Every section file listed in the chapter's index has a corresponding entry
- Notation table has 4 columns (Symbol, Definition, Valid Values, Example)
- Issue lists are non-empty only for genuine patterns (cross-check: run `grep -c '—' _01-*.qmd` matches the em_dash count in the triage)

---

### [EC3] — Per-Section Editing Subagents (unchanged architecture, new receipts)

**Responsibility:** Same as current Step 2 — receive a severity-ordered todo list, perform the forced Rules Relevance Assessment, edit the section file in three passes (Tier 1 → 2 → 3), report changes. **NEW: write a structured receipt.**

**Changes from current:**
- Subagent now receives its issue list from `TRIAGE.json` (structured), not from the main agent's chat (ephemeral)
- Subagent writes `_editing/receipts/{section_label}.json` at completion (structured output)
- The existing Rules Relevance Assessment (the SCAN-protocol equivalent) is preserved unchanged

**Receipt schema:**

```json
{
  "section": "_03-kantorovich.qmd",
  "edited_at": "2026-05-15T16:10:00Z",
  "tier_1_fixes": [
    { "rule": "em_dash", "line": 47, "before": "the result — surprisingly", "after": "the result, surprisingly," }
  ],
  "tier_2_fixes": [...],
  "tier_3_fixes": [...],
  "notation_gaps": [
    { "symbol": "$\\mathcal{L}_z$", "context": "used in equation on line 187, not in notation table" }
  ],
  "pedagogy_flags": [
    { "type": "premature_abstraction", "line": 89, "description": "claims 'dual formulation has lower complexity' before introducing the dual" }
  ],
  "word_count_before": 2134,
  "word_count_after": 2156,
  "rules_relevance_produced": true
}
```

**Validation:** `scripts/validate_edit_receipt.py` checks:
- `rules_relevance_produced: true` (subagent performed the forced SCAN step)
- No Tier 1 issues from `TRIAGE.json` are unaddressed in `tier_1_fixes` (every triage issue must be either fixed or explicitly flagged as "cannot fix — reason")
- `word_count_after` is within ±15% of `word_count_before` (catches accidental deletion or expansion)

---

### [EC4] — Coloring Pass (main agent, structured output)

**Responsibility:** Unchanged from Step 2.5 — build color map, apply across sections. **NEW: write `COLOR-MAP.json` as a structured artifact.**

**`COLOR-MAP.json` schema:**

```json
{
  "schema_version": "1.0",
  "chapter": "Statistics/Optimal Transport",
  "colors": [
    { "hex": "#4F46E5", "concept_category": "Transport plans and couplings", "terms": ["coupling", "transport plan", "$\\pi$", "$\\gamma$"] },
    { "hex": "#047857", "concept_category": "Distances and divergences", "terms": ["Wasserstein distance", "$W_p$", "earth mover's distance"] },
    { "hex": "#E11D48", "concept_category": "Computational methods", "terms": ["Sinkhorn", "entropic regularization", "$\\epsilon$"] }
  ]
}
```

**Validation:** `scripts/verify_coloring.py` checks:
- 3-5 colors (not more)
- No two categories share visually similar colors
- For each term in each category: grep the chapter files for the colored-span syntax; verify it appears at least once with the declared hex
- No colored terms inside callouts or exercise blocks

---

### [EC5] — Pedagogy Fix Subagent (unchanged architecture, structured manifest input)

**Responsibility:** Same as Step 2.6 — read sources, fix flagged analogies/abstractions/register-collisions. **NEW: receives `PEDAGOGY-MANIFEST.json` (auto-built by a Python script from receipts + source headers), not a hand-built manifest from the main agent.**

**`scripts/aggregate_pedagogy_flags.py`** reads:
- All `_editing/receipts/*.json` files
- Each section's source-header callout (parsed from the `.qmd` file)
- The chapter's `TEXTBOOK-PLAN.md` source processing log

...and emits `_editing/PEDAGOGY-MANIFEST.json`:

```json
{
  "flags": [
    {
      "flag_type": "analogy_accuracy",
      "section_file": "_01-introduction.qmd",
      "line": 45,
      "description": "\"earth-moving\" analogy may mislead about continuous measures",
      "relevant_sources": [
        { "path": "sources/arxiv-1803.00567/", "reason": "Original Wasserstein GAN paper — defines the earth mover's distance precisely" },
        { "path": "sources/d2l.ai/chapter_ot/wasserstein.md", "reason": "D2L treatment of W_1 for discrete/continuous cases" }
      ]
    }
  ]
}
```

**Why this matters:** The main agent's original job (Step 2.6a: "collect flags, identify sources, build manifest") was the most error-prone multi-step reasoning in the edit workflow. Automating it via a Python script eliminates a class of "agent forgot to include the source" errors.

---

### [EC6] — Consistency Pass + Final Verification (Python-driven)

**Responsibility:** Replace the main-agent-driven Step 3 cross-section checks AND Step 4 grep verification with a **single Python validator script** that does both.

**`scripts/verify_edit_pass.py`** runs:

**Cross-section checks (from Step 3):**
1. Notation consistency: every `$symbol$` in body sections matches the notation table extracted in `TRIAGE.json`
2. Terminology consistency: grep for concept synonyms across sections; flag when the same concept has >1 name
3. Cross-reference validity: every `@sec-*`, `@fig-*`, `@eq-*` points to a real label
4. Transition quality: heuristic — last paragraph of each section should mention the next section's topic (checked via keyword overlap)

**Grep verification (from Step 4):**
5. Em dashes: `grep '—'` → count must be 0
6. Banned AI words: grep for the full list from Rule 7b
7. Meta-commentary filler: grep for "worth noting", "In essence", "Essentially,"
8. Unlinked citations: grep for `(Name et al., 20` without `](http`
9. Bare "this"/"these": grep for `". This [a-z]"`
10. Symbol-initial sentences: grep for sentences starting with `$`
11. Color consistency: cross-check against `COLOR-MAP.json` (if present)

**Output:** `_editing/EDIT-REPORT.json`:

```json
{
  "chapter": "Statistics/Optimal Transport",
  "verified_at": "2026-05-15T16:30:00Z",
  "checks": {
    "em_dashes": { "status": "PASS", "count": 0 },
    "banned_words": { "status": "PASS", "count": 0 },
    "unlinked_citations": { "status": "FAIL", "count": 2, "locations": ["_03-kantorovich.qmd:112", "_05-sinkhorn.qmd:89"] },
    "notation_consistency": { "status": "PASS" },
    "color_consistency": { "status": "PASS" },
    "cross_references": { "status": "PASS" }
  },
  "overall": "FAIL",
  "action_needed": "Fix 2 unlinked citations in sections 3 and 5"
}
```

If `overall: "FAIL"` → orchestrator either (a) re-spawns the affected section's subagent with the specific failure locations, or (b) halts and reports to the user.

---

## 6. Pipeline Lifecycle

User invokes `/edit-textbook-chapter Statistics/Optimal\ Transport.qmd`.

### Phase 0 — Initialization (~10 seconds)
1. Parse index file. Enumerate sections.
2. Create `{Chapter}/_editing/` folder if it doesn't exist.
3. Check for existing artifacts (resumability: skip completed phases).

### Phase 1 — Triage (~3-5 minutes)
1. Spawn `triage` subagent (readonly) with all section files + rule files.
2. Subagent writes `_editing/TRIAGE.json`.
3. Orchestrator runs `scripts/validate_triage.py`. Halt on failure.
4. Chat: "✓ Triage complete: [N] Tier 1, [M] Tier 2, [P] Tier 3 issues across [K] sections."

### Phase 2 — Per-Section Editing (~10-20 minutes, parallel capped at 4)
1. For each section, spawn editing subagent with:
   - Its section's triage entry (from `TRIAGE.json`)
   - The notation table (from `TRIAGE.json`)
   - The DO-NOT-CHANGE list
   - The chapter folder name (for image path checking)
2. Each subagent performs forced Rules Relevance Assessment → Tier 1 → Tier 2 → Tier 3 passes → writes receipt JSON.
3. Orchestrator runs `scripts/validate_edit_receipt.py` per section. Re-spawn on failure (up to 2 retries).
4. Per-section ✓/⚠/✗ to chat.

### Phase 2.5 — Coloring (~3-5 minutes, main agent)
1. Main agent reads the introduction to identify conceptual pillars.
2. Builds `_editing/COLOR-MAP.json`.
3. Applies colors across all sections.
4. Orchestrator runs `scripts/verify_coloring.py`. Halt on failure.

### Phase 2.6 — Pedagogy Fix (conditional, ~5 minutes)
1. Orchestrator runs `scripts/aggregate_pedagogy_flags.py` → reads receipts → produces `_editing/PEDAGOGY-MANIFEST.json`.
2. If manifest has 0 flags → skip.
3. If flags exist → spawn pedagogy fixer subagent with: manifest, source paths, section files, writing-style rules, DO-NOT-CHANGE list (relaxed for flagged paragraphs only).
4. Fixer edits flagged paragraphs, verifies against sources, reports back.

### Phase 3 + 4 — Final Verification (~1-2 minutes, Python)
1. Orchestrator runs `scripts/verify_edit_pass.py`.
2. If `overall: "PASS"` → done.
3. If `overall: "FAIL"` → re-spawn section subagent(s) for affected files with failure locations. Re-run verification. Up to 2 retries.
4. Chat: "✓ Editing pass complete. Report at `_editing/EDIT-REPORT.json`."

Total: ~20-35 minutes for a 7-section chapter.

---

## 7. What Stays vs What Changes

| Component | Current (1,080-line monolith) | Proposed |
|---|---|---|
| 21 editing rules (Rules 1-21) | Embedded in the command file (~600 lines) | Move to `writing-style.mdc` + `quarto-conventions.mdc` (already there — the command just references them) |
| Per-section subagent dispatch | Agent-driven from chat | Python orchestrator dispatches from `TRIAGE.json` |
| Triage | Main agent reads everything, holds in context | Dedicated triage subagent → `TRIAGE.json` on disk |
| Subagent reports | Unstructured chat output | Structured `receipts/{section}.json` on disk |
| Pedagogy flag aggregation | Main agent multi-step reasoning | `scripts/aggregate_pedagogy_flags.py` (deterministic) |
| Coloring pass | Main agent, no verification artifact | Main agent + `COLOR-MAP.json` + `scripts/verify_coloring.py` |
| Final verification | Agent runs greps | `scripts/verify_edit_pass.py` (deterministic) |
| Orchestrator | The 1,080-line file IS the orchestrator | ~80-line slash command + ~150-line Python orchestrator |
| Hook enforcement | None | `subagentStop` + `afterFileEdit` hooks (same as companion proposals) |

**New files:**
- `.cursor/agents/triage-editor.md` (~100 lines, readonly)
- `.cursor/agents/section-editor.md` (~80 lines — the existing Step 2b prompt, formalized)
- `.cursor/agents/pedagogy-fixer.md` (~100 lines — the existing Step 2.6 prompt, formalized)
- `scripts/validate_triage.py` (~80 lines)
- `scripts/validate_edit_receipt.py` (~60 lines)
- `scripts/aggregate_pedagogy_flags.py` (~100 lines)
- `scripts/verify_coloring.py` (~80 lines)
- `scripts/verify_edit_pass.py` (~150 lines — the big one, replaces Step 3+4)

**Removed:**
- The 1,080-line monolithic `/edit-textbook-chapter.md` is replaced by a ~80 line orchestrator wrapper + the above components.
- The 600+ lines of rule descriptions move to the existing path-scoped rule files (where they already live — the command was duplicating them).

---

## 8. Success Metrics

| Metric | Target |
|---|---|
| Em dashes remaining after edit pass | 0 |
| Banned words remaining | 0 |
| Unlinked citations remaining | 0 |
| Notation inconsistencies | 0 |
| Color map hex collisions | 0 |
| Cross-references valid | 100% |
| Pedagogy flags addressed (when sources available) | 100% |
| Word count change per section | ±15% max |
| Pipeline wall time (7-section chapter) | ≤35 minutes |
| Idempotency: second run produces changes | ≤5 minor (rounding, synonym choice) |

---

## 9. Rollout Plan

### v0 — One-Day Spike
- Implement `scripts/verify_edit_pass.py` (the deterministic grep validator replacing Step 4).
- Run on an existing edited chapter (e.g., "Multi-Agent Coordination for Code"). Report what it catches.
- **Decision gate:** does the script catch known issues that the monolithic agent missed?

### v1 — 1.5 Weeks
- Write `triage-editor.md`, `section-editor.md`, `pedagogy-fixer.md` subagent definitions.
- Implement `TRIAGE.json` schema + `validate_triage.py`.
- Implement `receipts` schema + `validate_edit_receipt.py`.
- Implement `aggregate_pedagogy_flags.py`.
- Implement `COLOR-MAP.json` schema + `verify_coloring.py`.
- Refactor `/edit-textbook-chapter` into the orchestrator (Python + thin slash wrapper).
- Add hooks (same pattern as companion proposals: `subagentStop` on editor/triage matchers).
- Test: edit one chapter end-to-end, verify `EDIT-REPORT.json` shows all-PASS.

### v1.1 — Incremental Edit Mode
- Support `--section 3` flag to edit only one section (useful for re-runs after user makes manual changes).
- Support `--skip-coloring` flag for chapters that don't need semantic coloring.
- Support `--fix-only "tier_1"` for quick mechanical fixes without full prose editing.

---

## 10. Open Questions

1. **Should the 21 editing rules live in the command file at all?** They're already in `writing-style.mdc`. The current command duplicates them with "good/bad" examples. Proposal: keep the examples as a *reference skill* (`.agents/skills/editing-rules-reference/`) that the triage subagent auto-discovers, rather than embedding 600 lines in the command.

2. **The coloring pass is unique to this workflow.** Should it be a separate command (`/textbook-color <chapter>`) callable independently? Or always bundled with editing? Recommendation: separate command, but the edit orchestrator calls it by default unless `--skip-coloring`.

3. **Should the pedagogy fixer read sources in the v2 pipeline world?** In the new pipeline, sources have `SECTION-{N}-MANIFEST.json` from the writing workflow. The pedagogy fixer could consume manifests directly (structured) instead of reading raw `.tex` files (unstructured). Recommendation: yes — change the pedagogy fixer to consume writing-workflow manifests when they exist.

4. **Is the edit pass safe to run before exercises are added?** Yes — the DO-NOT-CHANGE list includes exercise blocks. But the triage should detect if exercises exist (by grepping for `.exercise-mcq` etc.) and skip exercise-adjacent prose to avoid breaking exercise div syntax. Add a check to `validate_edit_receipt.py`.

---

*End of design proposal.*
