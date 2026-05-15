# Design Proposal: Research-Textbook-Chapter Workflow Decomposition

> **Author:** Staff-Engineer-style design proposal, drafted 2026-05-15, draft v0.1.
> **Status:** Companion to `DESIGN-PROPOSAL-textbook-workflow.md` (which decomposes the writing workflow). This proposal decomposes the *research* workflow.
> **Scope:** Replace the current monolithic `/research-textbook-chapter` (775 lines, 7 mandatory rules-reads, 4 search phases, 3 download phases, 5 incremental write parts) with a verifiable, cross-tool, sub-agent-orchestrated pipeline.
> **Target IDEs/CLIs:** Cursor (primary), Claude Code, OpenCode, Kiro IDE+CLI.

---

## 0. TL;DR

The current `/research-textbook-chapter` workflow has the same structural failure modes as the writing workflow — long monolithic prompt, dozens of MANDATORY markers, agent-driven dispatch, no user-verifiable artifact at phase boundaries. Empirically observed failures (from past chapters): (a) sources listed in TEXTBOOK-PLAN.md with `N/A` local paths despite the workflow's repeated "no N/A" admonitions, (b) downloaded sources never extracted to text (PDFs sit unread), (c) image inventory skipped, (d) section plans written without re-reading sources, and (e) per-section "Sources needed" tables fabricated rather than grounded in actual downloaded content.

This proposal decomposes the research workflow into **four phases**, each a separate command with structured-output checkpoints between them:

1. `/research-discover` — broad web-search discovery; outputs `DISCOVERY.json` (URL list + categorization)
2. `/research-download` — download every source from `DISCOVERY.json`, verify readability, convert PDF figures; outputs `DOWNLOAD-MANIFEST.json`
3. `/research-inventory` — build the Source Image Catalog and per-source content summaries; outputs `INVENTORY.json`
4. `/research-plan` — write `TEXTBOOK-PLAN.md` incrementally, one section at a time, grounded in `INVENTORY.json`

Plus a thin orchestrator `/research-textbook-chapter` (~80 lines) that calls the four phases in sequence.

Validators run between phases as Python scripts. Each phase is independently re-runnable. Each artifact is a structured JSON (or markdown) file with verification seeds. The TEXTBOOK-PLAN.md produced at the end is fully traceable: every claim in it cites a source that has been downloaded, extracted, read, and inventoried.

**Estimated effort:** v0 (1 day) for the discovery JSON schema + download verifier; v1 (2 weeks) for the four-phase pipeline; v1.1 (1 week) for hooks integration.

---

## 1. High-Level Goals

The research workflow must achieve, on every chapter researched:

1. **Source discoverability is broad and well-categorized** — at least 30-40 sources across the 4 source-type axes (academic, tutorial, intuition-focused, community), with the categorization recorded as structured data, not inferred at write time.

2. **Every source in the final plan is downloaded, extracted to readable text, and inventoried** — zero `N/A` local paths, zero unextracted PDFs, zero "referenced via web search" placeholders. This is enforced by Python validators between phases, not by exhortation.

3. **The Source Image Catalog is built deterministically** — every figure across all downloaded sources is enumerated; selection criteria are applied; the writing workflow gets a complete list of canonical figures with file paths and captions.

4. **TEXTBOOK-PLAN.md is grounded in actual source content** — each section's "Sources needed" table cites specific files and line ranges that have been read, not just URLs the researcher remembers.

5. **The four phases are independently re-runnable** — adding a new source does not require re-running discovery; updating the plan does not require re-downloading everything; failing one phase does not invalidate the previous artifacts.

6. **The user can audit the research output in <2 minutes** — a single Python script (`scripts/research_audit.py CHAPTER`) walks the four artifacts and reports completeness/integrity.

7. **Cross-tool portability** — the same workflow runs on Cursor, Claude Code, OpenCode, and Kiro with equivalent guarantees, using the same primitives identified in the writing-workflow proposal (slash commands, subagents, rules with globs, skills, terminal-Python, hooks).

8. **Hand-off to writing is mechanical** — the writing workflow consumes `INVENTORY.json` and `TEXTBOOK-PLAN.md` as structured inputs; no agent-to-agent ambiguity at the boundary.

---

## 2. Constraints

### 2.1 Hard Constraints

| ID | Constraint | Source |
|---|---|---|
| RC1 | Must run on all 4 target tools (Cursor, Claude Code, OpenCode, Kiro) with the same artifacts and the same audit guarantees | Companion proposal §1, C1 |
| RC2 | Hooks differ per tool (Cursor `hooks.json`, Claude `settings.json`, OpenCode `.opencode/plugin/*.ts`, Kiro `.kiro.hook`); design must account for Kiro's "hooks do not fire inside subagents" caveat | Companion proposal C2, C9 |
| RC3 | Agents are imperfect; design must assume they will skip steps, fabricate content, and rationalize past validators unless structurally prevented | Empirical evidence: the prior 10-round Socratic analysis |
| RC4 | Only pre-defined Python scripts may run via terminal; no agent-generated-then-executed scripts | User requirement |
| RC5 | Web search and download must be *grounded in actual results*, not training data. The discovery phase MUST use the agent's web-search tool, not "I remember these papers exist" | New: empirical failure mode where agents generated source lists from memory rather than search |
| RC6 | Every source folder must end Phase 2 with at least one `.md`, `.tex`, or `.txt` file >500 chars (extracted readability), validated by `scripts/check_source_readability.py` | Existing rule from `source-management.md` |
| RC7 | TEXTBOOK-PLAN.md placeholder content (quotes, statistics) must be marked as such; the writing workflow's manifest extractor (companion proposal C2) is the only authoritative source for writing | Companion proposal §3 |
| RC8 | Headless / SDK invocation maturity varies (Kiro is most GUI-bound); design must offer a fallback for Kiro pipelines | Companion proposal C8 |

### 2.2 Soft Constraints

| ID | Constraint | Why |
|---|---|---|
| RS1 | Total user-facing surface should be ONE primary command (`/research-textbook-chapter`); the four sub-commands are callable but optional | Reduce onboarding cost (mirrors RS1 in companion proposal) |
| RS2 | Every command file should be ≤500 lines per Cursor best-practice ([source](https://cursor.com/docs/rules)) | Mitigate instruction drift |
| RS3 | Each phase's output must be a structured artifact on disk (JSON or markdown), not just chat output | Phase resumability + auditability |
| RS4 | Pipeline should reuse existing primitives from the writing workflow (subagent definitions, validators, hook scripts) where possible | Minimize new code |
| RS5 | Token cost target: ≤1.5× the current monolith (the primary cost is web search + download, which is unchanged; structuring overhead is small) | Cost discipline |
| RS6 | Wall-clock time for a full research pass on a new topic ≤45 minutes (most of which is download + PDF→text conversion) | UX |

### 2.3 Cross-Tool Primitive Inventory

This proposal uses the same primitive inventory as the [companion writing-workflow proposal §2.3](DESIGN-PROPOSAL-textbook-workflow.md#23-cross-tool-primitive-inventory): slash commands, subagents, rules with globs/paths, skills (`.agents/skills/` cross-tool standard), MCP servers, terminal-Python, AGENTS.md, and hooks (with the Kiro-subagent caveat). No additional cross-tool primitives are needed beyond those.

Web-search tools are tool-specific:
- **Cursor**: built-in `WebSearch` and `WebFetch` available to the agent
- **Claude Code**: built-in `WebSearch` + `WebFetch` (and richer fetch via skills)
- **OpenCode**: `webfetch` permission per agent; built-in search
- **Kiro**: agent has web-search capability via the GUI

The research workflow uses only the standard `WebSearch`/`WebFetch` interface, which all four tools provide. No tool-specific search APIs are required.

---

## 3. Architecture: Why Four Phases (and Not Three or Five)

The current monolithic `/research-textbook-chapter` interleaves five activities: (1) web search, (2) source download, (3) readability extraction, (4) image inventory, (5) plan writing. The agent is supposed to keep all five active in working memory, switch contexts repeatedly, and produce one final artifact. Empirically this fails because the agent gets pulled toward "the deliverable" (the plan) and short-circuits the upstream phases — the same failure mode the writing workflow exhibits.

The four-phase decomposition uses **failure seams** (per [agentpatterns.ai](https://agentpatterns.ai/workflows/monolith-to-subagents-refactor/)) where a phase either succeeds under contract or raises:

```
┌──────────────────────────────────────────────────────────────────────────┐
│ User: /research-textbook-chapter <topic>                                 │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ [RC1] Orchestrator (~80 lines)                                           │
│ Calls phases 1-4 in sequence; resumable; idempotent                      │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Phase 1: /research-discover                                              │
│   Subagent: discoverer                                                   │
│   Tools: WebSearch, WebFetch (read-only — no downloads)                  │
│   Output: DISCOVERY.json — categorized URL list, search seeds, gaps      │
│   Validator: scripts/validate_discovery.py                               │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Phase 2: /research-download                                              │
│   Subagent: downloader (or Python orchestration of downloaders)          │
│   Tools: Shell (only pre-approved scripts: authenticated_extract.py,     │
│          webpage_to_md.py, mistral_ocr.py, curl-arxiv-tarball)           │
│   Output: DOWNLOAD-MANIFEST.json — per-source local path, byte counts,   │
│           extraction status, fallback ladder traversed                   │
│   Validator: scripts/validate_download_manifest.py                       │
│              + scripts/check_source_readability.py                       │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Phase 3: /research-inventory                                             │
│   Subagent: inventorier                                                  │
│   Tools: Read, Glob, Shell (magick PDF→PNG), Python                      │
│   Output: INVENTORY.json — per-source content summary (200-word          │
│           "what's in this file"), image catalog with captions,           │
│           verification seeds (5 file:line tuples per source)             │
│   Validator: scripts/validate_inventory.py                               │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Phase 4: /research-plan                                                  │
│   Subagents: per-section-planner (one per section, parallel)             │
│   Tools: Read (only INVENTORY.json + DOWNLOAD-MANIFEST.json + targeted   │
│         file:line lookups via the inventory's seed map)                  │
│   Output: TEXTBOOK-PLAN.md (incremental, part-by-part)                   │
│   Validator: scripts/validate_plan.py                                    │
│              + scripts/check_no_na_in_plan.py                            │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ Final: scripts/research_audit.py — user-runnable integrity check         │
└──────────────────────────────────────────────────────────────────────────┘
```

Why four, not three:
- Merging Phase 2 (download) and Phase 3 (inventory) was tempting — both touch source folders. But: download is *I/O-bound* (network, retries, fallbacks), while inventory is *content-aware* (parsing LaTeX captions, summarizing files). Mixing them means the inventory phase blocks on download retries, and one bad source delays the whole inventory. Separation lets retry logic stay local to download.
- Merging Phase 3 (inventory) and Phase 4 (plan) was tempting — both are content-driven. But: inventory is *exhaustive* (summarize every file in every source folder), while plan-writing is *selective* (pick the best content for each section). Mixing them means the plan-writer reads everything every time it writes a section, ballooning context. Separation lets the planner consume the pre-computed inventory.

Why not five (split discovery into "search" + "categorize"):
- The Cursor/Claude/OpenCode `WebSearch` tool already returns categorized results (URL + snippet + domain). A separate "categorize" phase would duplicate work the search results already do. One discovery phase suffices.

---

## 4. Component Breakdown

The system has **6 commands**, **4 subagents**, **6 Python validators**, and **1 schema**. Each is small and single-purpose.

### Component [RC1] — Orchestrator (`/research-textbook-chapter`)

**Responsibility:** Single user-facing entry point. Reads the user's topic spec, dispatches the four phases in sequence, runs validators between phases, halts on validation failure, emits structured progress to chat.

**MUST do:**
- Be idempotent — re-invocation skips phases whose artifacts already exist and validate
- Halt on validation failure with a precise next-command-to-run message
- Run validators (Python scripts) in-line; do not assume subagent compliance
- Keep main-agent context minimal — never read source content, never read full inventory; only reads validator output

**MUST NOT do:**
- Perform web searches itself (delegated to Phase 1)
- Download sources itself (delegated to Phase 2)
- Build the image catalog itself (delegated to Phase 3)
- Write `TEXTBOOK-PLAN.md` content itself (delegated to Phase 4)

**Implementation Options:**

- **Option RC1-A: Markdown slash command + agent-driven dispatch** — A ~100-line `/research-textbook-chapter.md` whose body is *instructions to the main agent* on how to dispatch subagents and run scripts. Cross-tool, simple, but relies on agent compliance.
- **Option RC1-B: Python orchestrator script invoked from a thin slash command** — A 30-line `/research-textbook-chapter.md` that runs `python3 scripts/run_research_pipeline.py <topic-spec>`. The Python script is deterministic: dispatches subagents via tool-specific CLIs/SDKs, runs validators, handles retry logic mechanically.

**Problems:**

- RC1-A: Same instruction-drift risk as the writing-workflow monolith — agent skips validators between phases.
- RC1-B: Cross-tool variance in subagent invocation (same problem as companion proposal §4 [C1]). Kiro is the most GUI-bound and has the weakest headless story.

**Solutions to problems:**

- RC1-A: Use SCAN-protocol output-token engagement at each phase boundary; combine with hook-layer enforcement where available.
- RC1-B: Reuse `scripts/spawn_subagent.py` from the companion proposal — same adapter; just adds research-specific subagent names. Kiro fallback to RC1-A.

**Recommendation: Option RC1-B (Python orchestrator)**, reusing the companion proposal's `spawn_subagent.py` adapter. The orchestrator is a thin Python script that dispatches each phase's subagent, runs that phase's validator, and either continues or halts. The markdown slash command is a 30-line wrapper. For Kiro: fallback to RC1-A (markdown-driven dispatch) with hook-based parent-level enforcement.

This is **structurally identical** to the writing-workflow orchestrator. One Python codebase orchestrates both research and writing; the only difference is which phase artifacts are the inputs/outputs.

---

### Component [RC2] — Phase 1: Discoverer (`/research-discover`)

**Responsibility:** Perform broad web-search discovery across the four search-methodology phases (foundation, authoritative, intuition, examples). Categorize discovered URLs. Identify gaps. Output `DISCOVERY.json`. Do NOT download anything in this phase — discovery is read-only.

**MUST do:**
- Execute the **four search axes** from the current monolithic workflow (assumption validation, authoritative collection, blog mining, examples/misconceptions)
- Run **at least one search per axis per topic sub-aspect**, with at least 3 query reformulations before moving on
- Search the [high-quality-blogs.md registry](.cursor/rules/high-quality-blogs.md) explicitly with `site:` queries
- Record EVERY URL it finds (selected or rejected), with a 1-sentence reason for selection/rejection
- Categorize each kept URL into one of the four source types (academic, tutorial, intuition, community)
- Identify "missing axes" (e.g., "no intuition-focused source found" → flag as a gap)
- Validate URL liveness with a HEAD request (catches 404s before download phase)

**MUST NOT do:**
- Download source content (that's Phase 2)
- Make decisions about which sources will end up in which chapter section (that's Phase 4)
- Generate URLs from training data ("I think there's a paper called X by Y") — every URL in `DISCOVERY.json` must come from an actual search-result tool output

**Implementation Options:**

- **Option RC2-A: Single discoverer subagent** — clean context, ~120-line prompt, runs all four search axes, emits one `DISCOVERY.json`. Cross-tool.
- **Option RC2-B: Four parallel discoverer subagents** — one per search axis, each with a tighter prompt (~60 lines), parallel execution, results merged. Faster but adds complexity.

**Problems:**

- RC2-A: Single agent juggles four search modes; risks drift toward whichever axis it likes most (typically academic).
- RC2-B: Four parallel subagents each do their own search; risk of duplicate URLs across results; merging logic adds code.

**Solutions to problems:**

- RC2-A: Tight prompt with explicit "you must complete all four axes; report `axis_X_searches_run` count in the manifest" + the validator (`validate_discovery.py`) checks that all four axes have at least N searches recorded.
- RC2-B: Dedupe by URL post-merge (trivial). Each subagent has 1/4 the context, ~30% more focused.

**Recommendation: RC2-A for v1, with a clear path to RC2-B in v1.1.** Single subagent is simpler and faster to get working; the `validate_discovery.py` script enforces axis coverage. Move to parallel discoverers in v1.1 once the JSON schema is locked.

The subagent prompt is **brutally short** — its job is mechanical: run searches across the four axes, record everything, categorize, emit JSON. The schema enforcement post-hoc by the validator is the safety net.

**`DISCOVERY.json` schema (preview, full schema in §5):**

```json
{
  "schema_version": "1.0",
  "topic": "Bayesian Credible Intervals",
  "discovered_by": "subagent-id-abc123",
  "discovered_at": "2026-05-15T10:00:00Z",
  "search_axes": {
    "axis_1_foundation": { "searches_run": 5, "queries": [...], "urls_found": 12 },
    "axis_2_authoritative": { "searches_run": 7, ... },
    "axis_3_intuition": { "searches_run": 6, ... },
    "axis_4_examples": { "searches_run": 4, ... }
  },
  "candidate_sources": [
    {
      "url": "https://arxiv.org/abs/2010.11929",
      "title": "An Image Is Worth 16x16 Words",
      "source_type": "academic",
      "found_via_axis": "axis_2_authoritative",
      "found_via_query": "vision transformer original paper",
      "selection_decision": "include",
      "selection_reason": "Original ViT paper; primary authoritative source",
      "url_status": "200",
      "expected_local_path": "sources/arxiv-2010.11929"
    },
    ...
  ],
  "gaps_flagged": [
    { "axis": "axis_3_intuition", "reason": "No 3blue1brown or distill.pub coverage of this specific topic; consider visual-only YouTube transcripts" }
  ]
}
```

---

### Component [RC3] — Phase 2: Per-Source Babysitter Subagent (`/research-download`)

**Critical correction (vs draft):** download is NOT mechanical. The fallback ladder in [`web-source-fetching.mdc`](.cursor/rules/web-source-fetching.mdc) requires real judgment: paywall cascades need web search to find author sites, broken downloads need inspecting what came back to pick the next fallback, and "find a substitute" requires reading abstracts to confirm the substitute is actually the same paper. A pure-Python orchestrator can handle the easy cases (arXiv tarball, GitHub clone, plain webpage) but loses the hard ones — which is exactly where source coverage drops. The redesign uses the `deep-factual-search.md` babysitter pattern: **one downloader subagent per source, with persistence until the source is acquired or every fallback is exhausted.**

**Responsibility:** For each source in `DISCOVERY.json`, spawn a dedicated downloader subagent that *babysits that one source* — applying the full `web-source-fetching.mdc` decision tree, traversing the fallback cascade, performing web searches for substitutes, verifying readability, and producing a structured per-source receipt. The phase output `DOWNLOAD-MANIFEST.json` is the union of these receipts.

**MUST do (per-source babysitter subagent):**
- Read `web-source-fetching.mdc` IN FULL at start (dispatched as a path-scoped rule via `globs: "**/_research/**"`, so it auto-attaches to the subagent context)
- Read `source-management.md` IN FULL at start (folder naming + readability rules)
- Identify the source type (arXiv, GitHub, blog, paywalled paper, PDF, DOCX) from the URL and choose the primary download method per the decision tree
- Execute the primary download via Shell (calling the pre-approved scripts: `authenticated_extract.py`, `webpage_to_md.py`, `mistral_ocr.py`, `onenote_pdf_to_markdown.py`, `curl`, `git clone`, `pandoc`, `magick`)
- After EVERY download attempt: verify (folder non-empty, content type correct via `file`/`pdfinfo`/character count, sections logical via heading grep)
- On failure: traverse the fallback cascade — each fallback is a *new download attempt with new judgment*, not a mechanical next-script
- For paywalled papers: execute the **7-step Paywalled Paper Retrieval Cascade** verbatim (arXiv preprint → author website → academic repositories → abstract-text search → Gwern → Wayback → flag to user)
- Run the **readability cascade**: every source folder must end with ≥1 readable text file (>500 chars). PDF→Mistral OCR (or pdftotext fallback). HTML→authenticated_extract or pandoc.
- Run the **completeness check** (per `web-source-fetching.mdc`): grep for paywall markers, check structural headings, read last 20 lines for abrupt truncation
- Convert PDF figures to PNG via `magick -density 400 ... -trim +repage` per `visualization-standards.mdc`
- Write a **per-source receipt** (JSON file at `_research/receipts/{source_id}.json`) with: every command attempted, every fallback traversed, every verification check run with its result, final source_status
- **Babysit until done**: do not exit until source_status is one of `success`, `pre-existing`, `substitute-found`, or `truly-unavailable` (only after exhausting ALL 7 paywall steps and the user is flagged)

**MUST NOT do:**
- Exit with a partial download (e.g., HTML page when a PDF was expected)
- Mark a source `success` without running readability + completeness verification
- Skip any rung of the fallback cascade — every failure mode in `web-source-fetching.mdc` has 3+ fallbacks; the subagent must try ALL before declaring `truly-unavailable`
- Fabricate substitutes ("I'll just say this related paper covers it") — the substitute must be verified by reading its abstract and confirming it covers the same finding
- Read source content for chapter analysis (that's Phase 3)
- Make selection decisions about whether the source is "useful enough" — Phase 1 already decided; Phase 2's job is acquisition, period
- Skip the per-source receipt — every spawned subagent must produce one
- Run any command not pre-approved in `web-source-fetching.mdc`

**Implementation Options:**

- **Option RC3-A (rejected): Pure Python orchestration** — was the prior recommendation. **Rejected** because the fallback cascade requires web-search-driven substitute hunting (Steps 2-5 of the Paywalled Paper Retrieval Cascade) and content-aware verification (paywall-marker grep, completeness check) that need LLM judgment. Python alone collapses to "if download failed, mark failed."
- **Option RC3-B: Single downloader subagent processing all sources sequentially** — one subagent loops over `DISCOVERY.json`, downloads each source. Same instruction-drift failure as the monolith: by source 20 of 35, the subagent has forgotten the cascade.
- **Option RC3-C: Per-source babysitter subagent (one fresh subagent per source, parallel-capped)** — clean context per source, focused on a single deliverable, persists until done. Mirrors `deep-factual-search.md`'s "one task, full focus, write a receipt" pattern.

**Problems:**

- RC3-C: Spawning ~35 subagents for a typical chapter is expensive (~35× context startup). Mitigated by capping concurrency at 4-5 (most modern tools allow this) and by the fact that simple sources (arXiv tarball, GitHub clone) finish in 30-60 seconds, so total wall time is bounded.
- RC3-C: Per-source state means 35 receipt files. Mitigated by a Python aggregator (`scripts/aggregate_receipts.py`) that reads all receipts into the final `DOWNLOAD-MANIFEST.json`.
- RC3-C: Babysitter subagents could still hallucinate (claim a download succeeded when it didn't). Mitigated by: (a) every receipt entry includes the actual `ls -la` output and `file` output of the result, which are verifiable; (b) `validate_download_manifest.py` re-runs the readability check on every claimed-success source — if the file isn't there, the receipt is rejected.

**Recommendation: Option RC3-C — per-source babysitter subagent**, with concurrency cap and a Python aggregator.

#### The Babysitter Pattern (Per-Source Subagent Design)

Each downloader subagent is given:
1. **Exactly one source URL** + the expected_local_path from `DISCOVERY.json`
2. **A persistence budget**: ≤8 download attempts across the cascade (typical sources need 1-2; paywalled papers may use all 7+1)
3. **A wall-clock budget**: 5 minutes (kills the subagent if exceeded; orchestrator marks the source for manual review)
4. **The full Shell tool**, restricted to the pre-approved command set (enforced via Cursor `beforeShellExecution` hook with allow-list matcher)
5. **WebSearch + WebFetch tools**, for the substitute-hunting cascade
6. **An auto-attached `web-source-fetching.mdc` rule** (path-scoped via `globs: "**/_research/**"` and the subagent's working dir)

The subagent prompt body is short (~100 lines) and structurally identical to `deep-factual-search.md`'s Step 0 (Proof of Reading) → Step 1 (Spawn task) → ... pattern, but specialized for download. It opens with a forced **Proof of Cascade** output: "Before downloading, output (a) the URL, (b) the source type I've identified, (c) the primary download method I'll use, (d) the first 3 fallbacks I'll try if it fails. State this BEFORE running any command." This forces explicit engagement with the decision tree.

#### Per-Source Receipt Schema

Each subagent writes `_research/receipts/{source_id}.json`:

```json
{
  "schema_version": "1.0",
  "url": "https://www.nature.com/articles/s41586-021-03819-2",
  "source_id": "nature-2021-03819-2",
  "expected_local_path": "sources/nature-2021-jumper-alphafold/",
  "babysitter_subagent_id": "abc-123",
  "started_at": "2026-05-15T10:31:00Z",
  "ended_at": "2026-05-15T10:38:24Z",
  "attempts": [
    {
      "attempt_n": 1,
      "method": "primary",
      "method_name": "curl-with-user-agent",
      "command": "curl -L -H 'User-Agent: Mozilla/5.0' 'https://www.nature.com/...' -o /tmp/paper.pdf",
      "result": "downloaded 18KB",
      "verification": { "file_type": "HTML document text", "expected": "PDF document", "outcome": "FAIL — got paywall page" }
    },
    {
      "attempt_n": 2,
      "method": "fallback",
      "method_name": "paywall-cascade-step-1-arxiv",
      "rationale": "Per web-source-fetching.mdc paywall cascade Step 1: search for arXiv preprint",
      "command": "WebSearch: 'AlphaFold 2 highly accurate protein structure prediction' site:arxiv.org",
      "result": "found arxiv.org/abs/2106.04886",
      "verification": { "abstract_match": "confirmed via WebFetch — same authors, same finding", "outcome": "OK" }
    },
    {
      "attempt_n": 3,
      "method": "primary-on-substitute",
      "method_name": "arxiv-tarball",
      "command": "mkdir -p sources/arxiv-2106.04886 && curl -sL https://arxiv.org/src/2106.04886 | tar -xzf -",
      "result": "extracted 23 .tex files, 8 PDF figures",
      "verification": { "file_count": 31, "main_tex_lines": 1432, "outcome": "OK" }
    },
    {
      "attempt_n": 4,
      "method": "post-processing",
      "method_name": "pdf-to-png-conversion",
      "command": "find sources/arxiv-2106.04886 -name '*.pdf' | xargs -I {} magick -density 400 {} -trim +repage {}.png",
      "result": "8/8 figures converted, all >100KB",
      "verification": { "outcome": "OK" }
    }
  ],
  "final_local_path": "sources/arxiv-2106.04886/",
  "source_status": "substitute-found",
  "substitute_metadata": {
    "original_url": "https://www.nature.com/articles/s41586-021-03819-2",
    "substitute_url": "https://arxiv.org/abs/2106.04886",
    "substitute_kind": "arxiv-preprint",
    "abstract_verified_match": true
  },
  "readability_check": {
    "text_files_present": 23,
    "largest_file_chars": 287_412,
    "paywall_markers_found": 0,
    "structural_headings_count": 41,
    "outcome": "OK"
  },
  "wall_clock_seconds": 444,
  "attempts_used": 4,
  "attempts_budget": 8
}
```

**Why this schema design:**
- The `attempts[]` array is an **append-only log** of every action. Fabrication requires the subagent to invent both `command` and `result` — verifiable later by re-running.
- `verification` per attempt forces the subagent to *check what came back*, not just "I ran the command, moving on."
- `source_status: "substitute-found"` is a first-class status (alongside `success`, `pre-existing`, `truly-unavailable`). The downstream phases see the substitute as authoritative and treat the original URL as historical metadata.
- `readability_check` is the gate before the subagent can claim done. The schema requires it to be filled.

#### Orchestrator's Role in Phase 2

The Python orchestrator (RC1-B) does NOT do downloads itself. It:

1. Reads `DISCOVERY.json` and enumerates all `selection_decision: "include"` sources.
2. Spawns one downloader subagent per source, capped at **4 concurrent** (configurable). Each subagent uses the `.cursor/agents/source-downloader.md` definition (~120 lines) with the babysitter contract above.
3. As each subagent completes, reads its receipt JSON. If receipt is missing/malformed/claims success but readability check fails, **re-spawns the subagent** with the failure reason in the prompt (up to 2 re-spawns per source before giving up).
4. After all sources are receipted, runs `scripts/aggregate_receipts.py` to produce `_research/DOWNLOAD-MANIFEST.json` — a deterministic union of all per-source receipts.
5. Runs `validate_download_manifest.py` + `check_source_readability.py`. Halts on failure.

**Concurrency control:** the cap of 4 prevents overwhelming the LLM provider rate limits and keeps wall time tractable. Sources are dispatched in priority order: pre-existing-likely first (cheap to verify), then arXiv (fast), then GitHub clones, then blogs, then potentially-paywalled papers last (longest cascade).

**Failure handling:** if a babysitter subagent exits with `truly-unavailable`, the orchestrator emits a clear chat message: `⚠️ SOURCE UNAVAILABLE: {url} — exhausted {n} fallbacks. Receipt at _research/receipts/{source_id}.json`. The user can either supply the source manually (drop it into `sources/{path}/`) or accept the gap (the source is removed from `DISCOVERY.json` for downstream phases).

#### Aggregated `DOWNLOAD-MANIFEST.json` Schema

Produced by `scripts/aggregate_receipts.py` from the per-source receipts:

```json
{
  "schema_version": "1.0",
  "topic": "Bayesian Credible Intervals",
  "downloaded_at": "2026-05-15T10:38:24Z",
  "discovery_input": "_research/DISCOVERY.json",
  "concurrency_cap": 4,
  "sources": [
    {
      "url": "https://arxiv.org/abs/2010.11929",
      "source_id": "arxiv-2010.11929",
      "babysitter_subagent_id": "abc-001",
      "receipt_path": "_research/receipts/arxiv-2010.11929.json",
      "final_local_path": "sources/arxiv-2010.11929/",
      "source_status": "success",
      "attempts_used": 2,
      "wall_clock_seconds": 47,
      "readability_check": { "outcome": "OK", "text_files_present": 7, "largest_file_chars": 142_387 }
    },
    {
      "url": "https://www.nature.com/articles/s41586-021-03819-2",
      "source_id": "nature-2021-jumper-alphafold",
      "babysitter_subagent_id": "abc-002",
      "receipt_path": "_research/receipts/nature-2021-jumper-alphafold.json",
      "final_local_path": "sources/arxiv-2106.04886/",
      "source_status": "substitute-found",
      "substitute_metadata": {
        "original_url": "https://www.nature.com/articles/s41586-021-03819-2",
        "substitute_url": "https://arxiv.org/abs/2106.04886",
        "substitute_kind": "arxiv-preprint",
        "abstract_verified_match": true
      },
      "attempts_used": 4,
      "wall_clock_seconds": 444,
      "readability_check": { "outcome": "OK", "text_files_present": 23 }
    },
    {
      "url": "https://www.sciencedirect.com/...some-paywalled-paper",
      "source_id": "elsevier-2018-author-paper",
      "babysitter_subagent_id": "abc-003",
      "receipt_path": "_research/receipts/elsevier-2018-author-paper.json",
      "source_status": "truly-unavailable",
      "attempts_used": 8,
      "wall_clock_seconds": 287,
      "user_flagged": true,
      "user_flag_reason": "Exhausted Paywalled Paper Retrieval Cascade Steps 1-7. No arXiv preprint, no author site copy, no PMC/CORE/Gwern hit, no Wayback. Original DOI returns 403."
    }
  ],
  "summary": {
    "total_sources": 35,
    "success": 30,
    "pre_existing": 2,
    "substitute_found": 2,
    "truly_unavailable": 1,
    "total_wall_clock_minutes": 18.4,
    "total_attempts": 71
  }
}
```

---

### Component [RC4] — Phase 3: Inventorier (`/research-inventory`)

**Responsibility:** Consume `DOWNLOAD-MANIFEST.json`. For each source folder, list contents, read every text file, produce a per-source content summary, build the Source Image Catalog (with captions extracted from LaTeX), record verification seeds. Output `INVENTORY.json` — the structured summary that Phase 4 consumes.

**MUST do:**
- For each source listed as `success` or `pre-existing` in `DOWNLOAD-MANIFEST.json`:
  - List all text files (`.md`, `.tex`, `.txt`, `.bib`) and image files (`.png`, `.jpg`, `.svg`, `.pdf` figures)
  - Read every text file (chunked at `limit: 2000` per the deep-factual-search reading protocol)
  - Produce a 200-300 word "what's in this file" summary per text file
  - For LaTeX sources: extract `\caption{}` text for each figure, paired with the `\includegraphics{}` path
  - Record 5 verification seeds per source (file, line, first 60 chars at a middle-of-file position) — same anti-fabrication mechanism as the writing-workflow manifest
  - Categorize content by topic-relevance (which broad subtopics from the user's research goal does this source cover?)
- Emit `INVENTORY.json`

**MUST NOT do:**
- Make decisions about which sources will go into which chapter section (Phase 4)
- Skip files because they "look unimportant" — read everything in every source folder
- Generate summaries from training data ("I know this paper says X") — every summary must reference specific lines in the source

**Implementation Options:**

- **Option RC4-A: Single inventorier subagent (sequential)** — one subagent reads all sources one after another. Simpler but slow for 30+ sources.
- **Option RC4-B: Per-source-cluster inventorier subagents (parallel, capped at 3-4 concurrent)** — clusters sources by domain (e.g., all arXiv papers in one cluster, all blogs in another), spawns parallel subagents. Faster.
- **Option RC4-C: One inventorier subagent per source** — extreme parallelism, but 30+ subagents is wasteful (each has startup cost).

**Problems:**

- RC4-A: 30+ sources × ~3-5 minutes per source = 90-150 minutes, often hitting context-window pressure on the last few sources.
- RC4-B: Cluster size affects context. Too-large clusters → drift. Too-small → underutilization.
- RC4-C: Per-source subagent startup cost dominates.

**Solutions to problems:**

- RC4-A: Acceptable for v1; profile real workloads, switch to B if needed.
- RC4-B: Cap clusters at 5 sources each. Most chapters have 30-35 sources → 6-7 cluster subagents → comfortably parallel.
- RC4-C: Reject as wasteful.

**Recommendation: RC4-A for v1, plan to move to RC4-B in v1.1 once cluster heuristics are validated.** Start with the simpler design; instrument it (record subagent runtime per source); switch to clusters once we know which clusters cause drift.

The inventorier's job is **read-and-summarize**, not analysis. Its prompt is short. The schema enforcement post-hoc by `validate_inventory.py` catches missing summaries (every source in the manifest must have an inventory entry; every inventory entry must have ≥1 file summary).

**`INVENTORY.json` schema (preview):**

```json
{
  "schema_version": "1.0",
  "topic": "Bayesian Credible Intervals",
  "inventoried_at": "2026-05-15T11:00:00Z",
  "download_manifest_input": "DOWNLOAD-MANIFEST.json",
  "sources": [
    {
      "url": "https://arxiv.org/abs/2010.11929",
      "local_path": "sources/arxiv-2010.11929/",
      "source_type": "academic",
      "files": [
        {
          "path": "sources/arxiv-2010.11929/main.tex",
          "lines": 1205,
          "summary_300w": "This is the main file of the ViT paper. Sections include: introduction (lines 1-180) covering the motivation for treating images as patch sequences; method (lines 180-450) defining the patch embedding $\\mathbf{E} \\in \\mathbb{R}^{(P^2 \\cdot C) \\times D}$, the [class] token, and the learnable positional embeddings; experiments (lines 450-900) comparing ViT-B/16 to ResNet on ImageNet; ablations (lines 900-1100); appendix (1100-1205). Key equations on lines 287, 305, 412.",
          "topical_relevance": ["patch embedding", "transformer architecture", "attention", "imagenet benchmarks"]
        }
      ],
      "images": [
        {
          "path": "sources/arxiv-2010.11929/figures/model_scheme.png",
          "caption_from_latex": "Model overview. We split an image into fixed-size patches, linearly embed each of them, add position embeddings, and feed the resulting sequence of vectors to a standard Transformer encoder.",
          "type": "architecture-diagram",
          "license": "arxiv-cc-by",
          "recommended_for": ["chapter section: Architecture"]
        }
      ],
      "verification_seeds": [
        { "file": "sources/arxiv-2010.11929/main.tex", "line": 287, "first_60_chars": "where $\\mathbf{E} \\in \\mathbb{R}^{(P^2 \\cdot C) \\times D}$ is the linear" },
        ...
      ]
    }
  ]
}
```

---

### Component [RC5] — Phase 4: Planner (`/research-plan`)

**Responsibility:** Consume `INVENTORY.json`. Produce `TEXTBOOK-PLAN.md` incrementally (one section per write), with each section's "Sources needed" table grounded in actual inventory entries (specific files + line ranges). Build the Source Image Catalog from the inventory's image entries. Build the cross-cutting concerns (notation, concept map, misconceptions, math background).

**MUST do:**
- For each planned chapter section (5-6 body sections + introduction + closing + optional math background):
  - Select sources from the inventory whose `topical_relevance` matches the section's topic
  - Specify the exact files and line ranges to consult (from the inventory's per-file summaries)
  - Specify which images from the inventory to embed in this section
  - Use the **placeholder warning** at the top of TEXTBOOK-PLAN.md: this plan's quotes/numbers are placeholders for the writing-workflow's manifest extractor, NOT authoritative
- Build the running example, hook image identification, learning objectives, concept map design, notation table seed, misconceptions list, math-background assessment

**MUST NOT do:**
- Read source files directly (the inventory has summaries; full reading is the writing-workflow's job)
- Inject quotes or specific statistics from the sources into the plan as if they were verified — they're placeholders
- Skip the cross-cutting concerns section
- Output more than 6 body sections (the merge-related-subtopics rule from `research-textbook-chapter.md` line 763 still applies)

**Implementation Options:**

- **Option RC5-A: Single planner subagent writes the entire plan** — produces all parts in one shot. Risks the same length-induced drift the monolith has.
- **Option RC5-B: One planner subagent per section** — six per-section subagents (parallel after Section 1 is locked because notation table threads through), one for cross-cutting concerns, one for image catalog. Each subagent has clean context. Resembles the writing-workflow per-section pattern.
- **Option RC5-C: Two planner subagents — one for "structure" (sections + cross-cutting), one for "section sourcing" (filling in sources-needed tables)**. Sequential.

**Problems:**

- RC5-A: Same drift problem as the monolith — by Section 5, the planner has forgotten the inventory categorization for early sources.
- RC5-B: Notation table threads across sections; running example threads across sections; cross-cutting concerns must be coherent. Parallel sub-section planners might invent inconsistent notation.
- RC5-C: Two-pass approach is cleaner but doesn't gain much over RC5-B.

**Solutions to problems:**

- RC5-A: Reject — same monolith problem we're trying to solve.
- RC5-B: Run **Phase 4a** (structure planner: outlines all sections + designs cross-cutting concerns + locks notation/running-example) **sequentially first**. Then **Phase 4b** (per-section sourcing) **in parallel** consuming the locked structure.
- RC5-C: Subset of the RC5-B solution.

**Recommendation: Option RC5-B with a sequential structure-locking sub-phase.**

```
Phase 4a (sequential, ~3 min): Structure planner subagent
  Inputs: INVENTORY.json + topic spec
  Outputs: TEXTBOOK-PLAN.md Parts 1, 2, 5 (header, chapter overview + hook, cross-cutting concerns including locked notation table)
  Validator: validate_plan_structure.py — checks 5-6 body sections, notation has 4 columns, hook image identified, etc.

Phase 4b (parallel, capped at 3-4 concurrent, ~5 min): Per-section sourcing subagents
  One subagent per section, consumes locked structure + inventory
  Each writes its own "Sources needed" table + content outline + key equations + visualizations + source images to embed
  Outputs: TEXTBOOK-PLAN.md Parts 3a-3e (one section each) + Part 4 (Source Image Catalog assembled from per-section image picks)
  Validator: validate_plan_sourcing.py per section — every source in "Sources needed" must be in INVENTORY.json
```

Same pattern as the writing-workflow: lock cross-cutting state first, then parallelize per-section. The structure-planner's output becomes the contract for the per-section planners.

The placeholder-warning prefix (the existing TEXTBOOK-PLAN.md top-banner) is preserved; it tells the writing workflow's manifest extractor that everything below is structural guidance, not authoritative content. The writing workflow's `source-extractor` subagent (from the companion proposal §4 [C2]) re-reads sources to produce the *actual* `SECTION-{N}-MANIFEST.json` used for prose generation.

---

### Component [RC6] — Hooks Layer (Cross-Tool, with Per-Tool Caveats)

**Responsibility:** Tier-1 enforcement on all four target tools. Auto-runs validators on subagent completion (Phase 1 → discoverer-stop, Phase 2 → downloader-completion, Phase 3 → inventorier-stop, Phase 4 → planner-stop). Auto-halts pipeline on validation failure.

**Configuration follows the same model as the writing workflow's [C10] hooks layer**:

| Tool | Hook config | Subagent firing |
|---|---|---|
| Cursor | `.cursor/hooks.json` `subagentStop` matchers: `discoverer`, `inventorier`, `section-planner` | ✅ fires inside subagents |
| Claude Code | `.claude/settings.json` `hooks` block | ✅ fires inside subagents |
| OpenCode | `.opencode/plugin/textbook-validators.ts` (extends the existing plugin from companion proposal) | ✅ in-process |
| Kiro | `.kiro/hooks/research-*.kiro.hook` watching sentinel files written by orchestrator | ❌ does not fire in subagents — uses sentinel pattern |

The hook scripts call the same Python validators as the in-orchestrator validator calls — so hooks are an *additional* enforcement layer, not a replacement for the orchestrator's own validator calls. Belt-and-suspenders.

For Phase 2 (download), the hook layer adds an additional safety net for each per-source babysitter subagent: `subagentStop` matched to `source-downloader` runs `scripts/validate_receipt.py {source_id}` to verify the receipt JSON is well-formed and the claimed `final_local_path` actually contains readable text. On Cursor/Claude/OpenCode this fires inside the subagent context (per RC2 caveat: not on Kiro). If the receipt fails validation, `failClosed: true` halts the subagent and the orchestrator's re-spawn logic kicks in.

---

## 5. Artifact Schemas (Concrete Specifications)

The four artifact files are the contracts between phases. Each is JSON Schema-validated by a Python script in `scripts/validators/`.

### 5.1 `DISCOVERY.json` (Phase 1 output)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ResearchDiscovery",
  "type": "object",
  "required": ["schema_version", "topic", "discovered_at", "search_axes", "candidate_sources"],
  "properties": {
    "schema_version": { "const": "1.0" },
    "topic": { "type": "string" },
    "prior_knowledge": { "type": "string" },
    "learning_goals": { "type": "string" },
    "target_depth": { "enum": ["UNDERGRADUATE", "GRADUATE", "RESEARCHER"] },
    "discovered_by": { "type": "string" },
    "discovered_at": { "type": "string", "format": "date-time" },
    "search_axes": {
      "type": "object",
      "required": ["axis_1_foundation", "axis_2_authoritative", "axis_3_intuition", "axis_4_examples"],
      "properties": {
        "axis_1_foundation": {
          "type": "object",
          "required": ["searches_run", "queries", "urls_found"],
          "properties": {
            "searches_run": { "type": "integer", "minimum": 3 },
            "queries": { "type": "array", "items": { "type": "string" } },
            "urls_found": { "type": "integer", "minimum": 0 }
          }
        },
        "axis_2_authoritative": { "$ref": "#/properties/search_axes/properties/axis_1_foundation" },
        "axis_3_intuition": { "$ref": "#/properties/search_axes/properties/axis_1_foundation" },
        "axis_4_examples": { "$ref": "#/properties/search_axes/properties/axis_1_foundation" }
      }
    },
    "candidate_sources": {
      "type": "array",
      "minItems": 30,
      "items": {
        "type": "object",
        "required": ["url", "source_type", "found_via_axis", "selection_decision", "selection_reason", "url_status"],
        "properties": {
          "url": { "type": "string", "format": "uri" },
          "title": { "type": "string" },
          "source_type": { "enum": ["academic", "tutorial", "intuition", "community"] },
          "found_via_axis": { "enum": ["axis_1_foundation", "axis_2_authoritative", "axis_3_intuition", "axis_4_examples"] },
          "found_via_query": { "type": "string" },
          "selection_decision": { "enum": ["include", "reject"] },
          "selection_reason": { "type": "string", "minLength": 10 },
          "url_status": { "enum": ["200", "301", "302", "403", "404", "500", "timeout"] },
          "expected_local_path": { "type": "string" }
        }
      }
    },
    "gaps_flagged": {
      "type": "array",
      "items": { "type": "object", "required": ["axis", "reason"] }
    }
  }
}
```

Validation invariants beyond the schema (`scripts/validate_discovery.py`):
- All four search axes have ≥3 searches recorded
- ≥30 unique candidate sources (matches the minimum from the existing workflow)
- All four source types are represented across `selection_decision: "include"` rows
- Every `selection_decision: "include"` has a non-trivial `expected_local_path`

### 5.2 `DOWNLOAD-MANIFEST.json` (Phase 2 output, aggregated from per-source receipts)

Already shown in §4 [RC3]. Validation invariants (`scripts/validate_download_manifest.py`):
- Every source in `DISCOVERY.json` with `selection_decision: "include"` has an entry here (aggregated from a corresponding receipt file in `_research/receipts/`)
- Every `success`, `pre-existing`, or `substitute-found` source has a verified `final_local_path` containing ≥1 readable text file >500 chars (cross-validated with `scripts/check_source_readability.py`)
- Every `truly-unavailable` entry has `attempts_used >= 7` and `user_flagged: true` with a `user_flag_reason` string
- Every `substitute-found` entry has `substitute_metadata.abstract_verified_match: true` and a substitute URL that is reachable

### 5.2b Per-Source Receipt (`_research/receipts/{source_id}.json`)

Schema shown in §4 [RC3]. Validation invariants (`scripts/validate_receipt.py`):
- `attempts[]` array is non-empty and append-only (each entry has `attempt_n` increasing monotonically)
- Each `attempts[].verification` has an explicit `outcome` field (`OK` or `FAIL — <reason>`)
- `final_local_path` (when present) actually exists on disk and contains the files claimed by `readability_check`
- `source_status: "truly-unavailable"` REQUIRES `attempts_used >= 7` (matches the Paywalled Paper Retrieval Cascade depth)
- `source_status: "substitute-found"` REQUIRES `substitute_metadata.abstract_verified_match: true` and a non-empty `substitute_url`
- `wall_clock_seconds <= 300` (5-minute babysitter budget)
- Every shell command in `attempts[].command` is in the pre-approved allow-list (`scripts/allowed_shell_commands.txt`)

### 5.3 `INVENTORY.json` (Phase 3 output)

Already shown in §4 [RC4]. Validation invariants (`scripts/validate_inventory.py`):
- Every source in `DOWNLOAD-MANIFEST.json` with `source_status: "success"` or `pre-existing` has an inventory entry
- Every inventory entry has ≥1 `files[]` summary
- Every summary is ≥150 words
- Every entry has 5 verification seeds across ≥3 distinct files (or ≥1 file if the source has only one file)
- Verification seeds are validated by running `sed -n '{line}p' {file}` on disk and comparing first 60 chars

### 5.4 `TEXTBOOK-PLAN.md` (Phase 4 output)

Markdown, not JSON, because it's the writing-workflow's input and humans read it. Validation invariants (`scripts/validate_plan.py`):
- Has the placeholder-warning banner at the top
- Has 5-6 body sections + intro + closing
- Has a notation table with 4 columns (Symbol, Definition, Valid Values, Example)
- Every section's "Sources needed" table cites ≥1 source with a `sources/...` local path that exists in `INVENTORY.json`
- Has a Source Image Catalog with ≥1 image per body section that uses one
- Has a Math Background assessment (either "needed" with concept list, or "not needed")
- Zero `N/A` strings in any "Local Path" column (separate `scripts/check_no_na_in_plan.py`)

---

## 6. Validators (Python Scripts)

| Script | Phase Gate | Inputs | Output | Lines |
|---|---|---|---|---|
| `validate_discovery.py` | Phase 1 → Phase 2 | `DISCOVERY.json` | exit code 0/1 + per-rule pass/fail | ~120 |
| `validate_receipt.py` | Phase 2 per-source (hook-callable on subagentStop) | `_research/receipts/{source_id}.json` + filesystem | exit code 0/1 | ~80 |
| `aggregate_receipts.py` | Phase 2 final aggregation | all receipt JSONs in `_research/receipts/` | `DOWNLOAD-MANIFEST.json` | ~80 |
| `validate_download_manifest.py` | Phase 2 → Phase 3 | `DOWNLOAD-MANIFEST.json` + filesystem state | exit code 0/1 | ~100 |
| `check_source_readability.py` | Phase 2 → Phase 3 (parallel with validate_download_manifest) | source folders | exit code 0/1 | ~80 |
| `validate_inventory.py` | Phase 3 → Phase 4 | `INVENTORY.json` + filesystem state | exit code 0/1 | ~150 |
| `validate_plan.py` | Phase 4 → done | `TEXTBOOK-PLAN.md` + `INVENTORY.json` | exit code 0/1 | ~120 |
| `check_no_na_in_plan.py` | Phase 4 → done | `TEXTBOOK-PLAN.md` | exit code 0/1 | ~30 |
| `research_audit.py` | user-runnable | all four artifacts + receipts | integrity score 0-100 + per-phase report | ~200 |

Total validator code: ~960 lines of Python. All validators use `jsonschema` + `pyyaml` + standard library; no exotic dependencies.

The `research_audit.py` script is the user's one-command verification: `python3 scripts/research_audit.py "Statistics/Bayesian Credible Intervals"` walks all four artifacts and emits:

```
============================================================
RESEARCH INTEGRITY AUDIT: Statistics/Bayesian Credible Intervals
============================================================
Phase 1 (Discovery):                ✓
  Sources discovered:                42
  Search axes covered:              4/4
  Source types:                     academic (15), tutorial (12), intuition (8), community (7)
Phase 2 (Download):                  ✓
  Sources downloaded:               35/42 (selected for include)
  Pre-existing:                       1
  Success:                          34
  Failed (substitutes found):         0
  Failed (no substitute):             0
  PDF figures converted:           127
Phase 3 (Inventory):                 ✓
  Sources inventoried:               35/35
  Average summary length:           247 words
  Verification seeds verified:     175/175 (5 per source × 35)
  Image catalog entries:             89
Phase 4 (Plan):                      ✓
  Body sections:                      6
  Notation table columns:           4/4
  Hook image identified:            ✓
  Section "Sources needed" tables:  6/6 valid (all paths in INVENTORY.json)
  Math Background assessment:        present
  N/A entries in plan:                0

INTEGRITY SCORE: 98/100  ✓ READY FOR /write-textbook-chapter
```

---

## 7. Directory Layout (Deltas vs the Companion Writing Proposal)

The research workflow shares the directory layout from the [companion writing-workflow proposal §7](DESIGN-PROPOSAL-textbook-workflow.md#7-directory-layout-final). This section lists only the **new files** the research decomposition adds:

```
AI-Learning-Gems/
├── .cursor/
│   ├── commands/
│   │   ├── research-textbook-chapter.md         # [RC1] Thin orchestrator wrapper (~50 lines)  ← refactored
│   │   ├── research-discover.md                 # [RC2] Phase 1 entry (~80 lines)              ← NEW
│   │   ├── research-download.md                 # [RC3] Phase 2 entry (~50 lines, mostly script wrapper)  ← NEW
│   │   ├── research-inventory.md                # [RC4] Phase 3 entry (~80 lines)              ← NEW
│   │   └── research-plan.md                     # [RC5] Phase 4 entry (~100 lines)             ← NEW
│   ├── agents/
│   │   ├── discoverer.md                        # ~120 lines                                    ← NEW
│   │   ├── source-downloader.md                 # [RC3] Per-source babysitter, ~150 lines       ← NEW
│   │   ├── inventorier.md                       # ~100 lines                                    ← NEW
│   │   ├── structure-planner.md                 # Phase 4a, ~80 lines                           ← NEW
│   │   └── section-planner.md                   # Phase 4b, ~100 lines                          ← NEW
│   └── hooks.json                               # extend with research subagent matchers
│
├── scripts/
│   ├── run_research_pipeline.py                 # [RC1] Python orchestrator (~150 lines)        ← NEW
│   ├── aggregate_receipts.py                    # [RC3] Per-source receipts → DOWNLOAD-MANIFEST.json (~80 lines)  ← NEW
│   ├── validate_receipt.py                      # [RC3] Per-source receipt validator, hook-callable (~60 lines)  ← NEW
│   ├── allowed_shell_commands.txt               # [RC3] Allow-list for beforeShellExecution hook  ← NEW
│   ├── validators/
│   │   ├── discovery_schema.json                                                                ← NEW
│   │   ├── download_manifest_schema.json                                                        ← NEW
│   │   ├── inventory_schema.json                                                                ← NEW
│   │   ├── validate_discovery.py                                                                ← NEW
│   │   ├── validate_download_manifest.py                                                        ← NEW
│   │   ├── validate_inventory.py                                                                ← NEW
│   │   ├── validate_plan.py                                                                     ← NEW
│   │   └── check_no_na_in_plan.py                                                               ← NEW
│   ├── check_source_readability.py              # [reused from companion]
│   └── research_audit.py                        # [RC9] User-runnable (~200 lines)              ← NEW
│
└── {Domain}/
    └── {Chapter Name}/
        ├── _research/                                                                            ← NEW directory
        │   ├── DISCOVERY.json                   # Phase 1 artifact
        │   ├── receipts/                        # Per-source babysitter receipts (Phase 2)  ← NEW
        │   │   ├── arxiv-2010.11929.json
        │   │   ├── nature-2021-jumper-alphafold.json
        │   │   └── ...
        │   ├── DOWNLOAD-MANIFEST.json           # Phase 2 artifact (aggregated from receipts)
        │   ├── INVENTORY.json                   # Phase 3 artifact
        │   └── _research_log.txt                # Append-only orchestrator log
        ├── TEXTBOOK-PLAN.md                     # Phase 4 artifact (existing structure preserved)
        └── (everything else from companion proposal)
```

The `_research/` directory holds the three intermediate JSON artifacts. Like `_state/` and `_manifests/` in the writing-workflow folder, these are checkpoint files that gate phase progression. Deleting any of them re-enables that phase to run again.

---

## 8. Cross-Tool Implementation Details

The research workflow uses the same cross-tool primitives and the same per-tool adaptations as the companion writing-workflow proposal. The only research-specific differences:

- **Phase 1 (Discovery)** depends on `WebSearch` / `WebFetch`. All four tools provide these. No tool-specific work needed.
- **Phase 2 (Download)** spawns one **per-source babysitter subagent** at concurrency cap 4. Each subagent uses Shell, WebSearch, and WebFetch with the auto-attached `web-source-fetching.mdc` rule. Adapter logic in `scripts/spawn_subagent.py` is shared with other phases; the only Phase-2-specific code is `scripts/aggregate_receipts.py` (deterministic JSON union of receipts) and `scripts/validate_receipt.py` (per-source receipt validator).
- **Phase 3 (Inventory)** spawns subagents the same way as the writing workflow. Adapter logic in `scripts/spawn_subagent.py` is shared.
- **Phase 4 (Planning)** spawns subagents the same way.

For Kiro specifically (per RC8): use Option RC1-A (markdown orchestrator) instead of RC1-B (Python orchestrator). Kiro's GUI-bound nature means the user dispatches each phase manually from the chat, with hooks at parent-agent level providing enforcement.

The four new commands (`/research-discover`, `/research-download`, `/research-inventory`, `/research-plan`) are independently invokable on every tool — useful for resume / retry. The orchestrator (`/research-textbook-chapter`) is just a convenience.

---

## 9. Pipeline Lifecycle (End-to-End Walkthrough)

User invokes `/research-textbook-chapter "Bayesian Credible Intervals" --output Statistics/Bayesian\ Credible\ Intervals`.

### Stage 0 — Initialization (orchestrator, ~10 seconds)
1. Parse user input (topic, prior knowledge, learning goals, target depth, output folder).
2. Create chapter folder + `_research/` subfolder.
3. Check for existing artifacts; emit a "resuming from phase N" message if any exist.

### Phase 1 — Discovery (~5-10 minutes)
1. Spawn `discoverer` subagent with topic spec.
2. Subagent runs the four-axis search loop (foundation, authoritative, intuition, examples), at least 3 queries per axis.
3. Subagent records every URL with selection decision; categorizes by source type; flags gaps.
4. Subagent writes `_research/DISCOVERY.json`.
5. Orchestrator runs `validate_discovery.py`. Halt on failure.
6. Per-axis ✓/⚠/✗ summary to chat.

### Phase 2 — Download (~10-25 minutes; bounded by concurrency cap and per-source cascade depth)
1. Orchestrator reads `_research/DISCOVERY.json` and enumerates all `selection_decision: "include"` sources.
2. For each source, spawns a `source-downloader` babysitter subagent (capped at 4 concurrent), giving it: the URL, expected_local_path, persistence budget (8 attempts, 5 min wall-clock), and the auto-attached `web-source-fetching.mdc` rule.
3. Each subagent emits a Proof-of-Cascade output, then runs the primary download method, verifies (file type, char count, structural headings), and traverses fallbacks if needed. Paywalled papers go through the 7-step retrieval cascade (arXiv preprint → author site → academic repos → abstract-text search → Gwern → Wayback → flag).
4. On completion, each subagent writes `_research/receipts/{source_id}.json` with the full attempts log + readability check.
5. Orchestrator's `subagentStop` handler runs `scripts/validate_receipt.py {source_id}` per receipt; if invalid, re-spawns the subagent (up to 2 re-spawns).
6. After all subagents complete, orchestrator runs `scripts/aggregate_receipts.py` to produce `_research/DOWNLOAD-MANIFEST.json`.
7. Orchestrator runs `validate_download_manifest.py` + `check_source_readability.py`. Halt on failure.
8. Per-source ✓/⚠/✗ summary to chat.

### Phase 3 — Inventory (~10-15 minutes)
1. Spawn `inventorier` subagent with `DOWNLOAD-MANIFEST.json` path.
2. Subagent walks each source folder, reads every text file (chunked at `limit: 2000`), produces 200-300 word summaries per file, extracts LaTeX captions for images, records 5 verification seeds per source.
3. Subagent writes `_research/INVENTORY.json`.
4. Orchestrator runs `validate_inventory.py` (which also `sed -n`-spot-checks the seeds). Halt on failure.

### Phase 4 — Planning (~5-10 minutes)
1. **Phase 4a (sequential, ~3 min):** Spawn `structure-planner` subagent with `INVENTORY.json`. Writes `TEXTBOOK-PLAN.md` Parts 1, 2, 5 (header + chapter overview + cross-cutting concerns). Locks notation table and running example. Validator: `validate_plan_structure.py`.
2. **Phase 4b (parallel, capped at 3-4 concurrent, ~5 min):** Spawn one `section-planner` subagent per planned section. Each consumes the locked structure + inventory. Each writes its own section's "Sources needed" table + content outline + image picks. Validator: `validate_plan_sourcing.py` per section.
3. Orchestrator runs `validate_plan.py` + `check_no_na_in_plan.py`. Halt on failure.

### Stage 5 — Final Audit (user-runnable, <2 minutes)
The orchestrator's final chat message:
> ✅ Research pipeline complete in 38 minutes.
> Run `python3 scripts/research_audit.py "Statistics/Bayesian Credible Intervals"` to verify.
> Next: Run `/write-textbook-chapter "Statistics/Bayesian Credible Intervals/TEXTBOOK-PLAN.md"`

Total wall-clock: typically 30-45 minutes for a topic with 35 sources, similar to the current monolithic workflow but with verifiable artifacts at every phase boundary.

---

## 10. Mitigations for Agent Imperfection

The research workflow's failure modes mirror the writing workflow's, with a few research-specific ones:

| Failure mode | Mitigation | Layer |
|---|---|---|
| **Discoverer fabricates URLs from training data** | Schema requires `url_status` field; validator does HEAD requests; URLs not returning 200/301/302 are dropped before Phase 2 | [RC2] + `validate_discovery.py` |
| **Discoverer skips an axis** (e.g., only does "academic", ignores "intuition") | Schema requires `searches_run >= 3` per axis; validator enforces this | [RC2] + `validate_discovery.py` |
| **Downloader silently skips sources** (claims "all done" but `DOWNLOAD-MANIFEST.json` is missing entries) | Orchestrator enumerates `selection_decision: "include"` sources from `DISCOVERY.json` and spawns one subagent per source. Aggregator (`scripts/aggregate_receipts.py`) joins receipts by source_id; missing receipts produce `validate_download_manifest.py` failures. No silent omissions possible. | [RC3] + aggregator + validator |
| **Babysitter subagent claims success without actually downloading** | Each receipt's `attempts[].verification` includes `file` / `pdfinfo` / character-count outputs; `validate_receipt.py` re-runs `ls -la` and `wc -c` on the claimed `final_local_path`; `check_source_readability.py` independently verifies ≥1 readable text file >500 chars | [RC3] + receipt schema + validators |
| **Babysitter fabricates a substitute** (claims "found arXiv preprint" without verifying) | Receipt requires `substitute_metadata.abstract_verified_match: true` for substitute-found status; `validate_receipt.py` cross-checks the substitute URL responds 200 and the abstract is plausible (≥3 author-name overlap with original); orchestrator can re-spawn with explicit "show me the WebFetch output" prompt | [RC3] + receipt schema + validator |
| **Babysitter exits early after first failure** | Schema requires `attempts_used` and `attempts_budget`; status `truly-unavailable` REQUIRES `attempts_used >= 7` (matching the Paywalled Paper Retrieval Cascade); validator rejects premature truly-unavailable | [RC3] + receipt schema |
| **Babysitter runs unsafe shell commands** | Cursor `beforeShellExecution` hook with allow-list matcher (`scripts/allowed_shell_commands.txt`) blocks any command not on the pre-approved list (curl, magick, mistral_ocr.py, authenticated_extract.py, webpage_to_md.py, pandoc, git clone, tar, mkdir, ls, find, wc, file, pdfinfo). Cross-tool: same enforcement on Claude/OpenCode/Kiro via their hook equivalents. | [RC6] + allow-list |
| **Downloaded PDFs not extracted** (the original "Peyton Jones slides" failure mode) | `check_source_readability.py` enforces ≥1 readable text file >500 chars per source folder; Phase 2 cannot complete until this passes | [RC3] + readability validator |
| **Inventorier reads only the first file in a folder** | Schema requires `files[]` array; validator checks `len(files) >= len(actual_text_files_on_disk)` | [RC4] + `validate_inventory.py` |
| **Inventorier fabricates summaries** | 5 verification seeds per source × `sed -n` spot-check catches summaries claiming content that isn't on the cited line | [RC4] + seed verification |
| **Planner fabricates "Sources needed" entries** | `validate_plan_sourcing.py` cross-checks every `Sources needed` row against `INVENTORY.json` — every cited file must be in the inventory; every cited line range must be plausibly within the inventory's known line counts | [RC5] + `validate_plan.py` |
| **Planner injects placeholder quotes/numbers as if verified** | TEXTBOOK-PLAN.md has the placeholder-warning banner at the top; the writing workflow's `source-extractor` (companion proposal C2) is the only authoritative source of quotes | Documented contract + RC7 |
| **Orchestrator skips validators** | Python orchestrator (RC1-B) runs validators deterministically. Kiro fallback uses RC1-A + parent-level hooks | [RC1] + [RC6] |
| **Source becomes unreachable after Phase 2** (URL changed, file deleted by user) | Verification seeds in `INVENTORY.json` are re-validated by `research_audit.py` post-hoc; mismatches surface at audit time | [RC9] |
| **User reruns research after sources have been edited** | Orchestrator detects artifact freshness via mtime; offers to re-run only stale phases. Each phase can be force-re-run by deleting its artifact | resumability design |

---

## 11. Rollout Plan

### v0 — Three-Day Spike (validate the schemas + babysitter pattern on a small batch)
- Implement `discovery_schema.json`, `download_manifest_schema.json`, `receipt_schema.json`, `inventory_schema.json`.
- Write `.cursor/agents/source-downloader.md` (the babysitter subagent definition, ~150 lines).
- Implement `aggregate_receipts.py` + `validate_receipt.py` + `check_source_readability.py` (last reused from companion proposal).
- Implement the Cursor `beforeShellExecution` hook with allow-list (~30 lines).
- Test on a hand-curated mini `DISCOVERY.json` of 5 sources spanning the spectrum: arXiv (easy), GitHub (easy), blog (medium), paywalled paper that has an arXiv preprint (hard — tests substitute-found), and a deliberately-impossible URL (tests truly-unavailable). Verify every source ends up either readable or truthfully marked unavailable.
- **Decision gate:** does the babysitter pattern reliably handle the 5 test sources? Specifically: does it find the arXiv preprint for the paywalled paper without prompting?

### v1 — Three Weeks (full four-phase pipeline)
- Implement all four phase commands + four subagents + remaining validators.
- Refactor `/research-textbook-chapter` into the orchestrator (Option RC1-B).
- Sync to `.claude/`, `opencode.json`, `.kiro/` via the existing `sync_rules_across_tools.py`.
- Implement hooks layer for all four tools (extending the companion proposal's hooks).
- Test: research one new chapter end-to-end. Run `research_audit.py`. Score must be ≥95.
- Test: deliberately break a source (rename a file mid-pipeline). Validator must catch it.

### v1.1 — One Week (parallel + caching)
- Move Phase 3 (inventory) from RC4-A (sequential) to RC4-B (parallel cluster subagents).
- Move Phase 1 (discovery) from RC2-A (single agent) to RC2-B (parallel per-axis) if needed based on profiling.
- Cache `DISCOVERY.json` results across topic re-runs (skip re-search for already-known URLs).

### v2 — Two Weeks (incremental research, edit/update handoff)
- Support **incremental research**: user adds a new source URL, only that source goes through Phase 2-3-4 (delta plan update). Implements the existing `/update-textbook-chapter` use case more cleanly.
- Refactor `/edit-textbook-chapter` (which currently has its own download logic) to consume the unified inventory.

### v3 — Tool-Specific Accelerators (Optional)
- **Claude Code**: use `claude-agent-sdk` `--json-schema` to enforce manifest schemas at subagent return time (eliminates one validator step).
- **OpenCode**: rewrite validators as `.opencode/tools/*.ts` first-class custom tools (Zod-typed, in-process, faster).
- **Cursor**: package the workflow as a Cursor Plugin to the Marketplace.
- **Kiro**: package as a Kiro Power for keyword-activated installation.

---

## 12. Success Metrics (v1 Done Criteria)

Measured automatically by `research_audit.py`:

| Metric | Target |
|---|---|
| Discovery axis coverage | 4/4 axes with ≥3 searches each |
| Source-type diversity | All 4 types represented (academic, tutorial, intuition, community) |
| Total sources discovered | ≥30 (matches the existing minimum) |
| Sources successfully downloaded | ≥90% of `selection_decision: "include"` |
| Source readability | 100% of downloaded sources have ≥1 readable text file >500 chars |
| Inventory coverage | 100% of downloaded sources have ≥1 file summary |
| Verification seed pass rate | 100% (5 seeds × N sources, all `sed -n`-verified) |
| Plan grounding | 100% of "Sources needed" rows cite paths that exist in `INVENTORY.json` |
| Plan N/A count | 0 |
| Total pipeline wall time | ≤45 minutes for a typical 30-35 source topic |
| Cross-tool equivalence | Same chapter audit score ±2 across Cursor / Claude / OpenCode / Kiro |

User-facing acceptance test:
- User invokes `/research-textbook-chapter` on a fresh topic.
- Pipeline completes in <45 min without manual intervention.
- User runs `research_audit.py`; score is ≥95.
- User runs `/write-textbook-chapter` on the produced plan; writing-workflow audit (companion proposal §13) score is ≥98.

---

## 13. Open Questions (For User Review Before Implementation)

1. **Where do the four phase artifacts live?** Proposed: `{Chapter}/_research/DISCOVERY.json` etc. Alternative: top-level `_research/` for cross-chapter artifacts. Recommendation: per-chapter (current proposal).

2. **Phase 4 structure planner: subagent or Python script?** Sections, notation, running example are all judgment-driven (an LLM is appropriate). But the structure planner is high-stakes (locks the contract for parallel section planners). Should we add a "user approval before locking" pause? Recommendation: optional `--interactive-lock` flag.

3. **Should Phase 1 (Discovery) be agent-driven or a Python wrapper around `WebSearch` MCP-style?** Currently agent-driven because the search reformulations (try 3 queries before giving up) benefit from intelligence. But a deterministic Python loop with predefined query templates per axis could be tested. Recommendation: agent-driven for v1, evaluate Python alternative for v2.

4. **What happens if a source becomes unavailable mid-pipeline** (e.g., between Phase 2 and Phase 3)? Phase 3's verification seeds are computed during Phase 3, so they reflect Phase-3-time content. If the source is later re-downloaded (Phase 2 re-run), seeds may go stale. Recommendation: orchestrator detects Phase 2 re-runs and invalidates Phase 3 + Phase 4 artifacts automatically.

5. **Migration path for existing chapters** (which have TEXTBOOK-PLAN.md but no `_research/` artifacts): one-shot backfill script that reads the existing plan, re-derives DISCOVERY/DOWNLOAD/INVENTORY from the on-disk source folders, and produces the missing artifacts? Recommendation: separate `/research-backfill <chapter>` command in v2.

6. **Should the discoverer subagent be allowed to use `WebFetch`** (read a page to assess relevance) **or only `WebSearch`** (cheap, just indices)? `WebFetch` is more accurate but slower. Recommendation: `WebSearch` only for v1; `WebFetch` allowed for v1.1 with a per-source budget (max 5 fetches per axis).

7. **Cost discipline** — the deepest pipeline so far. With both research and writing pipelines, a full chapter is ~75 minutes wall-clock and ~2.5M tokens. Acceptable? Recommendation: yes for "produce a verified textbook chapter" but consider a `--fast` mode that uses cheaper models for discovery + inventory.

---

## 14. Summary

The current monolithic `/research-textbook-chapter` (775 lines, 7 mandatory rules-reads, 4 search phases, 3 download phases, 5 incremental write parts) fails for the same reasons the writing workflow fails: monolithic prompts, instruction drift, no user-verifiable artifacts at phase boundaries, and agent-driven dispatch of validators.

This proposal decomposes it into **four phases** with structured artifacts at each boundary:

1. **Discovery** (`DISCOVERY.json`) — broad search, categorization, gap-flagging
2. **Download** (`DOWNLOAD-MANIFEST.json`) — pure-Python execution of the download decision tree, fallback ladder, PDF extraction, image conversion
3. **Inventory** (`INVENTORY.json`) — per-source content summaries, image catalog, verification seeds
4. **Planning** (`TEXTBOOK-PLAN.md`) — sequential structure-locking + parallel per-section sourcing, grounded in the inventory

Six Python validators (~800 lines total) gate phase transitions deterministically. The orchestrator (`/research-textbook-chapter`) is a thin wrapper — ~50 lines of markdown + ~150 lines of Python — that calls the four phases, runs validators, and halts on failure.

The architecture is **structurally identical** to the [companion writing-workflow proposal](DESIGN-PROPOSAL-textbook-workflow.md) — same four-tool primitive set, same Python-orchestrator-with-hooks-as-tier-1-enforcement model, same `.agents/skills/` cross-tool standard, same per-tool sync via `sync_rules_across_tools.py`. The two pipelines hand off via `INVENTORY.json` + `TEXTBOOK-PLAN.md`: the writing workflow's source-extractor consumes the inventory's pre-computed file summaries to produce the per-section manifests.

Total new code: ~1,500 lines (research-specific), distributed across small single-responsibility files. Replaces 775 lines of monolithic markdown with structurally enforced compliance.

**Recommendation:** approve v0 (three-day spike on the babysitter pattern + schemas) immediately. Approve v1 contingent on v0 success.

---

## Appendix A — Corrections Log (vs draft v0.1)

| Area | Original (draft v0.1) | Corrected (this version) | Rationale |
|---|---|---|---|
| Phase 2 architecture | Pure Python orchestration (`scripts/run_download_phase.py` + `source_dispatcher.py`); "no subagent involved" | Per-source babysitter subagent pattern (one fresh subagent per source, capped at 4 concurrent), modeled on `deep-factual-search.md` | The fallback cascade in `web-source-fetching.mdc` requires LLM judgment: paywall cascades need WebSearch-driven substitute hunting, broken downloads need content-aware verification (paywall-marker grep, completeness check), and substitute confirmation needs reading abstracts. Pure Python collapses to "if download failed, mark failed" and loses precisely the hardest sources. |
| Receipt artifact | Did not exist | New per-source receipt JSON at `_research/receipts/{source_id}.json` with append-only `attempts[]` log, `verification` per attempt, `readability_check`, `substitute_metadata` | Receipts are the unit of fabrication-resistance: every claim about what was downloaded is paired with a verifiable artifact (file existence, char count, paywall-marker grep). Aggregator joins them into `DOWNLOAD-MANIFEST.json`. |
| Source statuses | `success`, `pre-existing`, `failed`, `needs_substitute` | `success`, `pre-existing`, `substitute-found`, `truly-unavailable` | `substitute-found` becomes a first-class status (paywalled paper → arXiv preprint is the dominant case, not an edge case). `truly-unavailable` requires `attempts_used >= 7` (the full Paywalled Paper Retrieval Cascade depth) — eliminates premature give-up. |
| Shell command safety | "Run any command not in the pre-approved set in web-source-fetching.md" prohibition was descriptive | Cursor `beforeShellExecution` hook with allow-list matcher (`scripts/allowed_shell_commands.txt`) blocks unsafe commands at the runtime layer | Babysitter subagents have full Shell access for downloads; the hook layer is the deterministic enforcement (the agent cannot bypass it). |
| Hook layer for Phase 2 | "No hook needed — pure Python" | `subagentStop` hook on `source-downloader` runs `validate_receipt.py`; `failClosed: true` halts subagent and triggers re-spawn | Receipt validation must run automatically, not on agent compliance. |
| Validators | 7 scripts, ~800 lines | 9 scripts, ~960 lines (+`validate_receipt.py`, +`aggregate_receipts.py`) | Per-source receipt validation + aggregation are new responsibilities. |
| Rollout v0 | "Implement `run_download_phase.py` + `source_dispatcher.py`" | "Write `source-downloader.md` subagent + receipt schema + aggregator + allow-list hook; test on a 5-source mini-discovery spanning easy/medium/paywalled/impossible cases" | v0 spike now validates the babysitter pattern, not the Python decision tree. |

The structural design (four phases, per-phase artifacts, Python orchestrator with hooks as Tier-1 enforcement, cross-tool baseline) is unchanged. Only the implementation of Phase 2 changed: from deterministic Python to babysitter subagents, with deterministic Python as the aggregator and verifier on top.

*End of design proposal.*
