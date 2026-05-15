# Design Proposal: Textbook Research-and-Writing Workflow v2

> **Author:** Staff-Engineer-style design proposal, drafted 2026-05-14, draft v0.1.
> **Status:** Proposal for review; not yet implemented.
> **Scope:** Replace the current monolithic textbook workflow with a verifiable, cross-tool, sub-agent-orchestrated pipeline.
> **Target IDEs/CLIs:** Cursor (primary), Claude Code, OpenCode, Kiro IDE+CLI.

---

## 0. TL;DR

The existing `/write-textbook-chapter` workflow (1,410 lines, 16 MANDATORY markers) consistently produces chapters where sources are not actually read by the writing agent — verified empirically across multiple runs ([prior 10-round Socratic analysis](#)). The agent treats sources as optional inputs to a writing task, fills gaps from training data, and the failure is invisible in the deliverable until a human audits.

This proposal replaces the monolith with a **fork-join pipeline**: per section, an *extraction subagent* reads sources and produces a structured JSON manifest with verifiable file:line citations and verification seeds; a *writer subagent* consumes only the manifest and produces a section file with a mandatory `<!-- SOURCE AUDIT -->` HTML preamble. Python validators run between phases as forcing functions. The user can run `scripts/textbook_audit.py CHAPTER` at any time to spot-check chapter integrity in <2 minutes.

The design uses only **cross-tool primitives** (slash commands, subagents, rules with globs/paths, skills following the [agentskills.io standard](https://agentskills.io), terminal-invoked Python scripts) so it runs identically on Cursor, Claude Code, OpenCode, and Kiro. **Hooks are available on all four tools** (Cursor `hooks.json`, Claude Code `settings.json` hooks, OpenCode in-process plugins, Kiro `.kiro.hook` files) — they are the primary enforcement layer, with the deterministic Python orchestrator as the cross-tool baseline backstop.

**Estimated effort:** v0 (1 day) for audit-block-only retrofit; v1 (2-3 weeks) for full pipeline + hooks; v2 (2 weeks) for cross-cutting state management; v3 (1 week) for tool-specific accelerators (Claude Code worktrees, Kiro Powers packaging).

---

## 1. High-Level Goals

The system must achieve, on every textbook chapter produced:

1. **Source integrity by construction** — every claim, quote, statistic, and named finding in prose must trace to a `file:line` location in a downloaded source file that the writing agent demonstrably read.

2. **User-verifiable in <2 minutes** — a human reviewer must be able to spot-check chapter integrity without re-reading every source, using a single deterministic Python script that returns pass/fail per section.

3. **Cross-tool portability** — the same workflow must run on Cursor, Claude Code, OpenCode, and Kiro with equivalent integrity guarantees. Tool-specific accelerators (hooks) are optional.

4. **Compliance by structure, not by exhortation** — the workflow must not rely on "the agent should read sources" instructions. Compliance must be enforced by file-existence gates, schema validation, and verification scripts that the orchestrator cannot reasonably bypass.

5. **Resumable and idempotent** — pipeline failures must be recoverable without restarting from scratch. Re-invocation must skip already-completed sections.

6. **Human-readable deliverable** — the final `.qmd` files must read like high-quality prose; audit metadata must be present but invisible to the rendered Quarto output.

7. **Maintainable by a single Staff Engineer** — the entire workflow surface area (commands + agents + skills + scripts + rules) must be small enough that one engineer can hold it in their head, reason about edge cases, and extend it without consulting external documentation.

---

## 2. Constraints

### 2.1 Hard Constraints (Cannot Be Relaxed)

| ID | Constraint | Source |
|---|---|---|
| C1 | Must run on all 4 target tools (Cursor, Claude Code, OpenCode, Kiro) with the same `.qmd` output and the same audit guarantees | User requirement |
| C2 | Hooks ARE cross-tool but expressed differently per tool: Cursor `hooks.json`, Claude Code `settings.json` hooks, OpenCode `.opencode/plugin/*.ts` (in-process), Kiro `.kiro.hook` files. Kiro hooks **do not fire inside subagents** — only in the parent agent. Design must accommodate this asymmetry. | Coding-tools landscape doc |
| C3 | Agents (main and subagent) are imperfect; they drift, rationalize, and fabricate. Design must assume adversarial behavior | Empirical evidence from prior 10-round analysis ([Cursor instruction-drift GitHub issues #49192, #52696, #53903]) |
| C4 | Only pre-defined Python scripts may run via terminal; agents must NOT dynamically generate-then-execute scripts | User requirement |
| C5 | Main agent context window is finite and degrades after 3-4 sub-tasks (instruction drift); design must minimize main-agent context | [Karpathy/Anthropic context-decay studies, agentpatterns.ai monolith-to-subagents] |
| C6 | Subagent prompts must NOT duplicate full rules text across N invocations (token waste); rules must reach subagents via auto-attaching globs/paths | User requirement |
| C7 | Workflow must not rely on the agent re-reading instructions mid-session (passive re-reading is empirically ineffective) | Cursor SCAN-protocol research |
| C8 | Headless / SDK invocation maturity varies sharply. Claude Code (Python+TS SDKs, `--bare`, `--allowedTools`, `--output-format json/stream-json`, `--json-schema`) is the deepest. Cursor has `@cursor/sdk`. OpenCode has CLI/SDK. Kiro is **GUI-bound** — its CLI/Web exist but its headless story is the least documented. Design must offer a fallback for Kiro. | Coding-tools landscape doc, §11 |
| C9 | Kiro subagents lack access to Specs and **hooks do not fire in subagents** in Kiro. Hook-based enforcement on Kiro must operate at the parent-agent level only. | Coding-tools landscape doc, §3 |

### 2.2 Soft Constraints (Strong Preferences)

| ID | Constraint | Why |
|---|---|---|
| S1 | Total user-facing surface should be ONE primary command (`/write-textbook-chapter`); advanced sub-commands callable but optional | Reduce onboarding cost |
| S2 | Validation should be deterministic and human-runnable post-hoc (`python3 scripts/textbook_audit.py CHAPTER`) | Day-2 maintenance |
| S3 | Every workflow file should be under 500 lines (per Cursor docs best practice) | Mitigate instruction drift |
| S4 | Prefer existing primitives (slash commands, subagents, rules, skills) over inventing new abstractions | Maintainability |
| S5 | Pipeline should be ≤2× the token cost of the monolith (acceptable cost for verifiability) | Cost discipline |
| S6 | Wall-clock time for a 7-section chapter ≤45 minutes | User experience |

### 2.3 Cross-Tool Primitive Inventory

These are the primitives we will use, ranked by cross-tool support (from the coding-tools landscape doc, May 2026):

| Primitive | Cursor | Claude Code | OpenCode | Kiro | Use in design |
|---|---|---|---|---|---|
| **Slash commands** (markdown) | ✅ (merged into skills via `disable-model-invocation: true`) | ✅ (skills with same flag) | ✅ (`.opencode/commands/*.md`, first-class with `$ARGUMENTS`, `` !`shell` ``, `@file`) | ✅ (`inclusion: auto` steering files) | Top-level user entries |
| **Subagents** (markdown defs) | ✅ leaner: `name`, `description`, `model`, `readonly`, `is_background` | ✅ richest: 6 permission modes, persistent memory, worktree isolation, per-subagent hooks/MCP/skills, `/fork`, agent teams | ✅ two-tier: primary (Build, Plan) vs subagent (General, Explore, Scout); rich glob-based per-agent permissions | ✅ simplest: 2 built-ins; **hooks do NOT fire inside Kiro subagents** | Fork-join workers |
| **Rules** (markdown + globs/paths/description) | ✅ four modes: Always, Apply Intelligently (description), Apply to Specific Files (globs), Apply Manually (`@`-mention) | ✅ `CLAUDE.md` + `.claude/rules/*.md` with `paths` frontmatter; conditional behavior moves into skills | ⚠️ minimal: `AGENTS.md` + `opencode.json instructions[]` array with globs and remote URLs; no frontmatter-driven activation | ✅ `.kiro/steering/` four modes (always, fileMatch, manual `#name`, auto via description); Foundation steering files | Auto-attached writing/style guidance |
| **Skills** ([open standard](https://agentskills.io)) | ✅ `.cursor/skills/`, `.agents/skills/` (cross-tool path); standard frontmatter + `paths`, `disable-model-invocation` | ✅ richest: `$ARGUMENTS`, dynamic `` !`shell` `` injection, fork mode, per-skill `allowed-tools`, `arguments:` named args, file watcher, bundled `/simplify`, `/debug`, `/loop`, `/batch` | ✅ strict on-demand: nothing loads until agent calls `skill` tool; per-skill `permission` block (unique granularity) | ✅ standard frontmatter + GUI management; import from GitHub URL | Bundled procedure + verification |
| **MCP servers** | ✅ stdio + SSE + HTTP; OAuth; MCP Apps; deeplink installs | ✅ deepest: comprehensive OAuth (dynamic registration, CIMD, scopes pinning), channels, Tool Search, elicitation, dynamic tool updates, `claude mcp serve` | ✅ standard config + permission gating | ✅ GUI-friendly; integrates with **Powers** (keyword-activated dynamic MCP bundles — unique) | Optional: deterministic tool wrappers |
| **Custom tools** (without MCP) | ❌ | ❌ | ✅ **only tool with first-class custom tools**: `.opencode/tools/<name>.ts`, `tool()` helper, Zod schemas, can override built-ins | ❌ | OpenCode-specific accelerator (not in baseline design) |
| **Terminal (Python script)** | ✅ | ✅ | ✅ (plus shell injection in skills/commands) | ✅ | Validators, audit |
| **AGENTS.md** ([cross-tool standard](https://agentskills.io)) | ✅ root + nested | ✅ via `import @AGENTS.md` from `CLAUDE.md` | ✅ root native (`AGENTS.md` + global `~/.config/opencode/AGENTS.md`) | ✅ native | Top-level project identity + entry point |
| **Hooks** | ✅ ~17 events, 2 action types (`command`, `prompt` LLM-evaluated), `failClosed`, `loop_limit`, JSON output (`updated_input`, `additional_context`, `followup_message`) | ✅ richest: 28+ events, 5 action types (`command`, `http`, `mcp_tool`, `prompt`, `agent`), `if` field, structured JSON decision API | ✅ as **plugins** (TS modules); in-process, can also register custom tools in same module | ✅ ~12 events; GUI-first; **does NOT fire inside subagents** | Tier-1 enforcement (4/4 tools, with caveats) |
| **Worktree isolation** | ❌ | ✅ unique: `--worktree`, `.worktreeinclude`, subagents with `isolation: worktree` | ❌ | ❌ | Not in baseline; Claude-Code-only enhancement |
| **Bundled distribution** | ✅ Cursor Plugins + Marketplace + Team Marketplaces (SCIM) | ✅ Plugins (skills + agents + hooks + MCP + LSP + binaries + settings); multiple marketplaces | ❌ (closest: `plugin` array in `opencode.json` for hooks/tools only) | ✅ Powers (keyword-activated) + GUI install from GitHub URL | Out of scope for v1; v3 distribution opportunity |
| **Scheduled tasks / goals** | ❌ | ✅ unique: `/loop`, `/goal`, `CronCreate`/`CronList`/`CronDelete`, Routines (cloud), Desktop scheduled tasks, GitHub Actions | ❌ | ❌ | Not in baseline; Claude-Code-only enhancement |

Primitives we will **not** rely on for the v1 baseline:
- **Bundled distribution** (Cursor Marketplace, Claude Code Plugins, Kiro Powers) — useful for v3 distribution; vendor lock-in for v1.
- **Custom tools** (OpenCode `.opencode/tools/`) — OpenCode-only; cross-tool baseline uses MCP/Python-via-shell.
- **Worktree isolation** (Claude Code only) — overkill for v1; v2 enhancement if writers ever parallelize.
- **Scheduled tasks / goals** (Claude Code only `/loop`, `/goal`) — useful for autonomous CI/CD recovery; v3 enhancement.
- **Cloud agents** — out of scope for v1.

---

## 3. Why This Specific Architecture (and Not Others)

We considered three architectural shapes:

**A. Reinforce the monolith** (status quo + more MANDATORY markers, more SCAN-style protocols inside the existing 1,410-line file). The user has explicitly rejected this path: "I have iterated on the instructions many times" — text-only fixes have been tried and don't work. Empirically, the 16th MANDATORY marker has the same compliance signal as the 1st: near zero.

**B. Full multi-agent swarm** (parallel section extraction with cross-cutting state coordinators, consistency-checker subagents, and dynamic agent allocation). Theoretically powerful but adds many moving parts (race conditions on shared state, sub-agent fan-out cost). Premature for v1; reasonable target for v2.

**C. Pipeline of focused commands with file-checkpointed phases** ← THIS PROPOSAL. Each phase produces a structured artifact on disk that gates the next phase. Subagents have isolated, single-responsibility prompts. Validation runs as Python scripts between phases. This is the architecture that `deep-factual-search.md` already uses successfully (the user has confirmed it works), generalized to multi-section writing.

The proposal is a direct application of the [agentpatterns.ai monolith-to-sub-agents refactor pattern](https://agentpatterns.ai/workflows/monolith-to-subagents-refactor/), tuned for our problem:

> "Replace the monolithic loop with sequenced sub-agents — each boundary is a failure seam: a step either succeeds under contract or raises, and the pipeline surfaces *which step failed* rather than *which prompt*."

The 5-step refactor pattern from Google ADK's "Titanium" rebuild applies almost directly:

| Step | ADK Refactor Pattern | This Proposal |
|---|---|---|
| 1 | Replace monolithic loop with sequenced sub-agents | `/write-textbook-chapter` orchestrator → extractor → writer → assembler |
| 2 | Push structured outputs into the schema, not the prompt | `SECTION-{N}-MANIFEST.json` validated by JSON Schema |
| 3 | Replace hardcoded context with dynamic retrieval | Manifest is the per-section "retrieved context" for the writer |
| 4 | Add distributed tracing before production | Each subagent writes a transcript; orchestrator emits structured progress |
| 5 | Delegate loop boundaries to the framework | Use `subagentStop` hooks (Cursor + Claude Code) and equivalents (OpenCode plugin events, Kiro hooks at parent-agent level) for retry orchestration; Python orchestrator as the cross-tool baseline |

---

## 4. Component Breakdown

The system has **9 components**, each with a single, clear responsibility. Below: what each does, two implementation options, problems, and the recommended option.

```
┌──────────────────────────────────────────────────────────────────────────┐
│ User invokes: /write-textbook-chapter <chapter-path>                     │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ [C1] Orchestrator Command (~150 lines)                                   │
│ - Reads TEXTBOOK-PLAN.md once                                            │
│ - For each section: dispatch [C2] then [C4] then validate via [C7,C8]   │
│ - Idempotent (skips completed sections)                                  │
└──────────────────────────────────────────────────────────────────────────┘
       │ (parallel, capped at 3-4 concurrent)         │ (sequential)
       ▼                                              ▼
┌────────────────────────────────────┐   ┌──────────────────────────────────┐
│ [C2] Source Extractor Subagent     │   │ [C4] Section Writer Subagent     │
│   (`.cursor/agents/extractor.md`)  │   │   (`.cursor/agents/writer.md`)   │
│ Reads sources/{path}/* in full     │   │ Reads ONLY:                      │
│ Emits SECTION-{N}-MANIFEST.json    │   │   SECTION-{N}-MANIFEST.json      │
│ With verification_seeds (5 file:line)│   │   _state/NOTATION.json         │
│ Schema-validated by [C7]           │   │   path-scoped writing rules [C5] │
│                                    │   │ Emits _0N-section.qmd            │
│                                    │   │ With <!-- SOURCE AUDIT --> block │
│                                    │   │ Schema-validated by [C8]         │
└────────────────────────────────────┘   └──────────────────────────────────┘
       │                                              │
       ▼                                              ▼
┌────────────────────────────────────┐   ┌──────────────────────────────────┐
│ [C7] validate_manifest.py          │   │ [C8] verify_audit_block.py       │
│ - JSON Schema check                │   │ - Parses audit block YAML        │
│ - Verifies 5 seeds via sed -n      │   │ - Verifies each quote via sed -n │
│ - Exit 0 = pass; non-zero = fail   │   │ - Counts unattributed_claims     │
└────────────────────────────────────┘   └──────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ [C6] Assembly Command — index file, cross-refs, lints                    │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ [C9] textbook_audit.py — user-runnable post-hoc full audit               │
└──────────────────────────────────────────────────────────────────────────┘

[C3] Path-scoped Rules (.cursor/rules/) auto-attach to subagents via globs
[C5] Cross-cutting State (_state/NOTATION.json, RUNNING-EXAMPLE.md) — locked artifacts
[C10] Hooks Layer (Cursor `hooks.json`, Claude `settings.json`, OpenCode plugin, Kiro `.kiro.hook`) — Tier-1 enforcement on all 4 tools (with caveat: Kiro hooks don't fire in subagents)
[C11] AGENTS.md (project root) — cross-tool top-level identity
```

---

### Component [C1] — Orchestrator Slash Command

**Responsibility:** Single user-facing entry point. Reads the chapter's `TEXTBOOK-PLAN.md`, enumerates sections, dispatches [C2] and [C4] subagents per section, runs [C7] and [C8] validators between phases, halts on failure, emits structured progress to chat.

**MUST do:**
- Be idempotent — re-invocation skips sections with valid manifests AND valid audit blocks
- Halt on validation failure with a precise next-command-to-run message
- Run validators (Python scripts) in-line; do not assume subagent compliance
- Keep main-agent context minimal — it should never read source content

**MUST NOT do:**
- Read source content directly (that's [C2]'s job)
- Read full source files into its own context
- Embed writing-style or visualization rules in its prompt (those auto-attach via [C3])
- Handle prose generation (delegated to [C4])

**Implementation Options:**

- **Option 1A: Markdown slash command + agent-driven dispatch** — A ~150-line `/write-textbook-chapter.md` whose body is *instructions to the main agent* on how to dispatch subagents and run scripts in sequence. Cross-tool, simple, but relies on agent compliance.
- **Option 1B: Python orchestrator script invoked from a thin slash command** — A 30-line `/write-textbook-chapter.md` that just runs `python3 scripts/run_pipeline.py <chapter>`. The Python script is deterministic: it spawns subagents via the IDE's CLI/SDK (e.g., `cursor-agent --agent-name section-writer ...`), runs validators, handles retry logic mechanically.

**Problems:**

- Option 1A: Same instruction-drift risk as the monolith — agent might skip validators between phases. Empirically observed in the prior 10-round analysis.
- Option 1B: Headless-SDK maturity varies sharply by tool. Cursor, Claude Code, OpenCode have well-documented headless invocation. **Kiro is the most GUI-bound** of the four — its CLI exists but its headless story is the least documented (per constraint C8). Python orchestrator must include a Kiro fallback.

**Solutions to problems:**

- For 1A: Use SCAN-protocol output-token engagement at start of each phase + skill-based validators (`disable-model-invocation: true` so they only fire when invoked) so that *running the validator IS the natural next action*, not an optional sub-step. Combine with the [C10] hook layer (which is now cross-tool).
- For 1B: Abstract the subagent-invocation behind `scripts/spawn_subagent.py` that detects which tool is running (via `$CURSOR_PROJECT_DIR`, `$CLAUDE_PROJECT_DIR`, `$OPENCODE_PROJECT_DIR`, `$KIRO_PROJECT_DIR`) and dispatches accordingly. Adapter is ~50 lines per tool, total ~200 lines. **Kiro adapter falls back to Option 1A** (markdown-driven dispatch) given Kiro's GUI-first design — the rest of the cross-tool baseline still works because the validators run identically and hooks (Kiro at parent-agent level) can still enforce.

**Recommendation: Option 1B (Python orchestrator)** because it eliminates the dominant failure mode (agent-driven dispatch drift) entirely. The orchestrator becomes deterministic Python; the markdown slash command is a thin wrapper. The 200-line tool-adapter cost is recovered many times over by removing the compliance gap. Hooks are a layered enhancement on top of the deterministic core.

> **Trade-off acknowledged:** Option 1B requires the tool's CLI/SDK to support headless subagent invocation. **Claude Code** has the deepest headless story (Python + TypeScript SDKs, `claude -p`, `--bare`, `--allowedTools`, `--output-format json/stream-json`, `--json-schema`). **Cursor** has `@cursor/sdk` (TypeScript) and a CLI Headless / CI mode. **OpenCode** exposes CLI/SDK. **Kiro is the most GUI-bound** of the four — its headless surface is the least documented (per the coding-tools doc). For Kiro, fall back to **Option 1A** (markdown orchestrator the agent dispatches manually) and rely on the in-orchestrator Python validator calls + Kiro hooks at the parent-agent level for enforcement.

---

### Component [C2] — Source Extractor Subagent

**Responsibility:** Read every text file in every source folder for one section. Emit a JSON manifest with verbatim quotes (file:line), background context, fabrication-check attestation, and 5 verification seeds.

**MUST do:**
- List source-folder contents (`ls`) before reading; never assume `content.md`
- Read every `.md`, `.tex`, `.txt`, `.bib` file in full (use `limit: 2000` per file, chunked if longer)
- Emit verbatim quotes only (no paraphrase)
- Include 5 verification seeds across at least 5 distinct files, line numbers in [20, N-20]
- Emit `fabrication_check: "UNAVAILABLE: <reason>"` if a source cannot be read; never fabricate
- Write to `SECTION-{N}-MANIFEST.json` and exit (no chat output beyond a short attestation)

**MUST NOT do:**
- Use `WebFetch` or `WebSearch` (sources should already be downloaded by `/research-textbook-chapter`)
- Generate analysis or prose
- Read TEXTBOOK-PLAN.md as a source of truth (it's a navigation aid only; the actual sources are the source of truth)

**Implementation Options:**

- **Option 2A: Single-purpose markdown subagent definition** in `.cursor/agents/source-extractor.md` (~80 lines) with YAML frontmatter (name, description, model, readonly: true) and a tight prompt. Spawned by orchestrator for each section.
- **Option 2B: Multiple specialized extractor subagents** — `arxiv-extractor`, `blog-extractor`, `pdf-extractor` — each tuned for source type. Orchestrator dispatches based on source_id prefix.

**Problems:**

- Option 2A: One prompt for all source types may not handle PDFs vs LaTeX vs blog markdown equally well.
- Option 2B: Three subagents to maintain. Ambiguity when a section uses mixed source types.

**Solutions to problems:**

- For 2A: The extractor's job is *mechanical* (list directory → read file → quote with file:line). Source type doesn't change the procedure; only `magick`/`mistral_ocr.py` preprocessing differs (and that's done before extraction by the [C3] research command). One subagent suffices.
- For 2B: Source-type specialization is over-engineering for v1. PDFs are converted to markdown before extraction; LaTeX is read as text. The procedure is uniform.

**Recommendation: Option 2A.** Single `source-extractor.md` subagent. Source-type preprocessing happens during `/research-textbook-chapter` (PDF→PNG via `magick`, PDF→.md via `mistral_ocr.py`); by the time the extractor runs, all sources are text files.

The subagent prompt must be **brutally short** (~80 lines). The schema in `scripts/manifest_schema.json` is the contract; the prompt's job is just to populate the schema. Schema enforcement post-hoc by [C7] is the safety net.

---

### Component [C3] — Rules and Their Activation

**Responsibility:** Inject writing-style, source-integrity, quarto-conventions, and visualization-standards rules into agent contexts *only when relevant*. Use the right activation mode per rule. Avoid global pollution across non-textbook conversations.

**MUST do:**
- For each rule, choose the activation mode deliberately:
  - **Always Apply** — only for rules that affect every conversation (e.g., the AGENTS.md project identity); textbook-specific rules MUST NOT be Always Apply
  - **Apply to Specific Files** (globs) — for rules that only matter when a specific file type is being read/edited (writing-style → `_[0-9][0-9]-*.qmd`, quarto-conventions → `*.qmd`)
  - **Apply Intelligently** (description-based) — for rules whose relevance depends on intent, not file path (source-integrity → "Activate when reading sources or writing prose with citations")
  - **Apply Manually** (`@`-mention) — for rarely-used rules the user invokes explicitly (not used in v1 design)
- Single source of truth (`.cursor/rules/`); per-tool configs reference (don't duplicate)
- Be small, focused — one rule per file, ≤500 lines per [Cursor best practice](https://cursor.com/docs/rules)

**MUST NOT do:**
- Apply globally (`alwaysApply: true`) for textbook-specific rules
- Be embedded in subagent prompts (waste of tokens; defeats the purpose of conditional activation)

**Implementation Options:**

- **Option 3A: Cursor-native `.cursor/rules/*.mdc` with mode-appropriate frontmatter, per-tool sync** — single source, four target tools, mix of `globs:` and `description:` fields per rule based on its activation logic.
- **Option 3B: AGENTS.md as primary, per-tool rules as supplements** — short top-level AGENTS.md (read by all 4 tools natively); detailed scoped rules in per-tool folders.

**Problems:**

- Option 3A: OpenCode does NOT support frontmatter-driven activation (only globs in `opencode.json instructions[]` and remote URLs). The `Apply Intelligently` (description-based) mode does not exist on OpenCode. So a rule that's `description:`-activated on Cursor must be either always-on or `globs:`-activated on OpenCode.
- Option 3B: AGENTS.md is project-wide on most tools — it would over-apply to non-textbook chats (the user's exact concern).

**Solutions to problems:**

- For 3A: Prefer `globs:` activation over `description:` activation wherever possible — `globs:` is supported by all 4 tools, `description:` is not. For the few rules that genuinely need intent-based activation (source-integrity), accept that on OpenCode they degrade to "always-on for any file in the textbook globs" — close enough.
- For 3B: Keep AGENTS.md tiny (~100 lines): just project identity + pointers. No load-bearing content in AGENTS.md.

**Recommendation: Hybrid 3A + minimal 3B.**

- Canonical rules live in `.cursor/rules/*.mdc` with `globs:` frontmatter scoping them to textbook section files. Use `globs:` everywhere because it's the only activation mode supported by all 4 tools.
- Cross-tool sync via `scripts/sync_rules_across_tools.py`:
  - Copy to `.claude/rules/` (Claude Code reads `.md`, supports `paths:` frontmatter — equivalent to globs)
  - Reference from `opencode.json instructions[]` (OpenCode reads markdown files via the array; supports glob patterns there)
  - Mirror to `.kiro/steering/` (Kiro reads markdown with similar four-mode activation: always, fileMatch, manual, auto)
- Maintain a tiny AGENTS.md for cross-tool discovery (`Always Apply` on every tool but only ~100 lines so the tax is negligible)

This addresses the user's specific concern: "writing-style rules should only be applied to subagents which write and edit, not globally." The globs ensure that. Subagents that read source files in `sources/**/*.tex` don't get writing-style rules; only subagents editing `_[0-9][0-9]-*.qmd` do.

---

### Component [C4] — Section Writer Subagent

**Responsibility:** Consume one `SECTION-{N}-MANIFEST.json` and produce one `_0N-section.qmd` file with prose, embedded visualizations, and a mandatory `<!-- SOURCE AUDIT -->` HTML preamble.

**MUST do:**
- Run SCAN protocol (5 forced output-token questions about the manifest) before any writing
- Trace every prose claim (quote, statistic, named finding) to a manifest entry
- Emit `<!-- SOURCE AUDIT v1 ... -->` YAML preamble with `quotes_used`, `images_used`, `total_quotes`, `unattributed_claims: 0`
- Drop or rewrite any claim that cannot be traced to the manifest
- Honor path-scoped rules (writing-style, quarto-conventions, visualization-standards) auto-attached via [C3]

**MUST NOT do:**
- Read TEXTBOOK-PLAN.md placeholder content as prose source (PLACEHOLDERS warning already documented)
- Read source files directly (that bypasses the manifest contract)
- Fall back on training data for specific claims (Hard Ban categories from `source-integrity.mdc`)
- Write outside the section's own `.qmd` file

**Implementation Options:**

- **Option 4A: Markdown subagent definition with the SCAN protocol + audit-block contract embedded** in `.cursor/agents/section-writer.md` (~120 lines).
- **Option 4B: Skill-based writer with SCAN as a separate `verify-manifest-engagement` skill**, invoked from a thinner writer subagent.

**Problems:**

- Option 4A: The SCAN protocol questions need to be *manifest-content-specific* (e.g., "How many quotes does this manifest have?"). Hard to template; either generated dynamically by the orchestrator or templated with `{{manifest.sources_count}}`-style placeholders.
- Option 4B: Skill invocation adds a layer; if the skill is skipped, the SCAN doesn't happen. Same compliance gap.

**Solutions to problems:**

- For 4A: The orchestrator pre-computes the SCAN questions from the manifest and injects them as the first 5 lines of the writer subagent's prompt. This is dynamic templating, ~10 lines of Python in `scripts/spawn_subagent.py`.
- For 4B: Reject — adds invocation surface without removing the failure mode.

**Recommendation: Option 4A with dynamically-injected SCAN questions.** The orchestrator (Python, deterministic) reads the manifest, computes 5 SCAN questions specific to its content, and injects them into the writer subagent's prompt. This makes SCAN evasion impossible without explicit fabrication of answers — and the next gate ([C8]) catches any audit-block fabrication.

---

### Component [C5] — Cross-Cutting State Files

**Responsibility:** Hold chapter-wide artifacts that every section reads but no section owns: notation table, running example, concept map. Prevent silent drift across sections.

**MUST do:**
- Be small, structured files (`NOTATION.json`, `RUNNING-EXAMPLE.md`, `CONCEPT-MAP.md`) under `{Chapter Folder}/_state/`
- Be locked after `/research-textbook-chapter` completes — section writers can READ but not modify
- Surface an explicit `STATE_GAP` signal when a section needs an addition (rather than silently introducing undefined notation)

**MUST NOT do:**
- Be embedded inside TEXTBOOK-PLAN.md (couples them; harder to validate)
- Be modified by writer subagents directly (introduces race conditions and untracked drift)

**Implementation Options:**

- **Option 5A: JSON files validated by a `state-locker` subagent** — research command produces drafts, locker validates against section plans, marks as locked.
- **Option 5B: Markdown files with explicit edit-protocol comments** — locker is a Python script that checks last-modified-time matches a `.lock` sidecar.

**Problems:**

- 5A: Subagent compliance — locker may not catch drift.
- 5B: Less structured; can't programmatically validate "every symbol in plans is defined in NOTATION.md."

**Solutions:**

- 5A: Backstop with a `validate_state_completeness.py` Python script that reads section plans and notation; reports missing symbols.
- 5B: Same backstop applies.

**Recommendation: 5A + validator.** JSON for `NOTATION.json` (structured, programmatically queryable: each row has `symbol`, `definition`, `valid_values`, `example`). Markdown for `RUNNING-EXAMPLE.md` (it's prose; JSON would be unwieldy). State-locker subagent runs once at end of `/research-textbook-chapter`; `scripts/validate_state_completeness.py` is the deterministic backstop.

For mid-pipeline gaps: writer emits `STATE_GAP: section_4 needs symbol \theta_{MAP}` to chat. Orchestrator (Python) detects, pauses pipeline, spawns a `state-updater` subagent with the gap description. Updated state files re-locked. Pipeline resumes.

---

### Component [C6] — Assembly Command

**Responsibility:** After all sections are written, generate the index `.qmd` file with `{{< include >}}` shortcodes, resolve all `@sec-*`, `@fig-*`, `@eq-*` cross-references, and run final lints (em dashes, banned words, image paths, audit-block presence on every section).

**MUST do:**
- Generate the index file from a deterministic template (no agent prose generation here)
- Verify every `@sec-*` reference points to a real section label
- Verify every `_0N-section.qmd` has a valid audit block
- Run `scripts/textbook_audit.py` as a final gate

**MUST NOT do:**
- Write prose
- Modify section files

**Implementation Options:**

- **Option 6A: Python script invoked by a thin slash command** (~50 lines).
- **Option 6B: Markdown command with agent instructions for assembly** (~150 lines, agent-driven).

**Problems:**
- 6A: Cross-tool: needs to be runnable on every target IDE. Python is universal — works.
- 6B: Agent might introduce errors (wrong include order, missing section labels).

**Recommendation: Option 6A.** Assembly is purely mechanical (file-listing, template-filling, regex-matching). Python is faster, deterministic, and bug-free. The thin slash command (`/textbook-assemble`) is just `python3 scripts/assemble_chapter.py <chapter>`.

---

### Component [C7] — `validate_manifest.py`

**Responsibility:** Validate `SECTION-{N}-MANIFEST.json` against the JSON schema, then run verification seeds via `sed -n` to detect fabrication.

**MUST do:**
- Validate against `scripts/manifest_schema.json` (using `jsonschema` package)
- For each of the 5 verification seeds, run `sed -n '{line}p' {file}` and compare first 60 chars against declared `first_60_chars`
- Verify line numbers are in valid range [20, total_lines - 20] (where total_lines is the file's actual line count from `wc -l`)
- Verify the 5 seeds span ≥5 distinct files
- Verify `fabrication_check` is one of: `OK`, `UNAVAILABLE: <reason>`, `STATISTIC NOT FOUND: <claim>`
- Exit with code 0 (all pass) or non-zero (any failure)

**MUST NOT do:**
- Read source content for analysis (that's the writer's job, not the validator's)
- Pass on schema-malformed manifests

**Implementation Options:**

- **Option 7A: Single Python script with `jsonschema` validation + custom seed-verification logic**.
- **Option 7B: Skill-bundled validator** packaged as `.agents/skills/verify-manifest/` (cross-tool standard path per [agentskills.io](https://agentskills.io)) with `SKILL.md` + `scripts/validate.py` + `assets/schema.json`. Use frontmatter `disable-model-invocation: true` so the skill only fires when explicitly invoked by the orchestrator (not auto-attached based on relevance), plus `paths: "**/_manifests/**"` to make it discoverable when the agent is looking at a manifest file.

**Problems:**
- 7A: Just a script — easy. Risk: agent doesn't run it. Mitigated by orchestrator (C1, Option 1B) running it deterministically.
- 7B: Skill provides invocation discoverability; same script underneath. The `.agents/skills/` directory is read by all 4 tools (cross-tool standard).

**Recommendation: 7A + 7B (both layers).** The script is the deterministic backbone (called directly by the Python orchestrator and by hooks). The skill provides a `/verify-manifest <path>` invocation that users (or hooks via shell) can call manually — and importantly is portable across all 4 tools because skills follow the agentskills.io open standard.

---

### Component [C8] — `verify_audit_block.py`

**Responsibility:** Parse the `<!-- SOURCE AUDIT -->` YAML block from a `_0N-section.qmd` file and verify each declared quote via `sed -n`. Verify all prose claims trace to manifest entries.

**MUST do:**
- Locate the HTML comment block (regex: `<!-- SOURCE AUDIT v1\n(.*?)\n-->`)
- Parse the YAML inside (using `pyyaml`)
- For each `quotes_used` entry, run `sed -n '{lines}p' {file}` and compare to declared `first_60_chars`
- Verify `unattributed_claims == 0`
- Cross-reference the audit block's `quotes_used` with the corresponding `SECTION-{N}-MANIFEST.json`'s `sources[].quotes` — all audit quotes must trace to manifest quotes
- Detect prose claims that lack audit-block support (heuristic: regex for `\([A-Z][A-Za-z]+ et al\.?,? \d{4}\)`, percentages without surrounding context, named frameworks)
- Exit 0 / non-zero

**MUST NOT do:**
- Modify the section file
- Generate audit content (the writer must do that)

**Implementation Options:**

- **Option 8A: Pure Python regex + sed-based verifier** — fast, deterministic, easy to test.
- **Option 8B: Use a Markdown/AST library (Pandoc-py)** to parse prose more rigorously and detect more claim patterns.

**Problems:**
- 8A: May miss subtle unattributed claims. False negatives on heavily-formatted prose.
- 8B: Adds a dependency; slower; AST might not detect all "claim" types either.

**Recommendation: 8A + adversarial test fixtures.** Hand-craft 10+ test fixtures (chapters with known fabrications) and tune the heuristics until all are caught. The validator's job is **deterrence + detection**; the writer's SCAN-protocol contract handles prevention.

---

### Component [C9] — `textbook_audit.py` (User-Runnable Final Audit)

**Responsibility:** The user's "I want to verify this chapter is trustworthy" tool. One command, one number, <2 minutes.

**MUST do:**
- Walk the chapter folder
- For each section: run [C7] on its manifest, [C8] on its audit block
- Spot-check 5 random verification seeds across the chapter (not just one section)
- Emit a single integrity score (0-100) and a per-section pass/fail table
- Be runnable on any tool, any time

**MUST NOT do:**
- Modify any file
- Require running the full pipeline

**Implementation Options:**

- **Option 9A: Standalone Python script with rich terminal output** (using `rich` for tables, exit code = severity).
- **Option 9B: Quarto callout-block report** generated as a `.qmd` page rendered alongside the chapter.

**Problems:**
- 9A: Terminal-only output; no rendered version. But the user wants <2 minutes; terminal is fastest.
- 9B: Pretty but slower; requires rendering.

**Recommendation: 9A primary, 9B as optional `--render` flag.** The default invocation prints to terminal; `--render` produces a Quarto report for sharing.

Sample output:

```
============================================================
TEXTBOOK INTEGRITY AUDIT: Statistics/Bayesian Credible Intervals
============================================================
Sections:                              6
Manifests valid:                       6/6  (100%)
Audit blocks valid:                    6/6  (100%)
Total quotes:                         87
Quotes verified via sed -n:           87/87 (100%)
Random seed spot-checks:               5/5   (100%)
Unattributed prose claims:             0
Sources flagged UNAVAILABLE:           0
STATISTIC NOT FOUND markers:           1 (acceptable; flagged)

INTEGRITY SCORE: 99/100  ✓ TRUSTWORTHY

Detail per section:
Section 1: ✓  (8 quotes, 0 issues)
Section 2: ✓  (15 quotes, 0 issues)
Section 3: ⚠ (12 quotes, 1 STATISTIC NOT FOUND — acceptable)
Section 4: ✓  (18 quotes, 0 issues)
Section 5: ✓  (14 quotes, 0 issues)
Section 6: ✓  (20 quotes, 0 issues)

Run /textbook-audit-detail <section> for verbose findings.
```

---

### Component [C10] — Hooks Layer (Cross-Tool, with Per-Tool Caveats)

**Responsibility:** Tier-1 enforcement on all four tools. Auto-runs validators on subagent completion or file edit; auto-halts pipeline on validation failure; auto-prompts orchestrator with structured failure reasons via `followup_message`.

**Cross-tool reality:**

| Tool | Hook config location | Lifecycle events | Action types | Subagent firing |
|---|---|---|---|---|
| Cursor | `.cursor/hooks.json` | ~17 events including `subagentStop`, `afterFileEdit`, `beforeShellExecution`, `preCompact`, `stop` | `command`, `prompt` (LLM-evaluated) | ✅ fires inside subagents |
| Claude Code | `~/.claude/settings.json` or `.claude/settings.json` `hooks` block | 28+ events, richer than Cursor; supports `if` field for fine-grained matchers | `command`, `http`, `mcp_tool`, `prompt`, `agent` (multi-turn verification) | ✅ fires inside subagents |
| OpenCode | `.opencode/plugin/*.ts` (in-process TS modules) | many events: tool, shell, file, session, permission, etc. | TS function returns event handlers (in-process, not subprocess) | ✅ in-process, fires uniformly |
| Kiro | `.kiro/hooks/*.kiro.hook` (GUI-creatable) | ~12 events: Prompt Submit, Pre/Post Tool Use, Agent Stop, File Save/Create/Delete, Manual Trigger | "Ask Kiro" (agent prompt), Shell Command | ❌ **does NOT fire inside Kiro subagents** — only in parent agent |

This means hook-based enforcement is genuinely cross-tool, with one important asymmetry: on Kiro, hooks tied to subagent lifecycle won't fire when the subagent runs. We must either move enforcement to the orchestrator's parent-agent lifecycle on Kiro, or rely on the deterministic Python orchestrator (Option 1B) for Kiro pipelines.

**MUST do:**
- Run `validate_manifest.py` on `subagentStop` (Cursor/Claude) or equivalent post-tool events (OpenCode plugin, Kiro `Agent Stop`) matched to the extractor subagent name
- Run `verify_audit_block.py` on `afterFileEdit` (Cursor/Claude) or `file.afterEdit` (OpenCode) or `File Save` (Kiro) matched to `_0[0-9]-*.qmd` paths
- Use `failClosed: true` on Cursor/Claude — failures must halt the agent, not allow-through (default is fail-open)
- Return structured JSON output where supported: `{"permission": "deny", "user_message": "...", "agent_message": "<precise validator failure reason>"}` so the agent sees exactly what went wrong
- On `subagentStop`, return `followup_message` to auto-prompt the orchestrator: `"Section N validation failed: <reason>. Re-spawn extractor."` This drives the retry loop deterministically; respect `loop_limit` (default 5) to cap retries.

**MUST NOT do:**
- Be the *only* enforcement layer — Python validator calls in Option 1B orchestrator are the cross-tool baseline because Kiro subagents don't fire hooks
- Replace the `textbook_audit.py` post-hoc audit (which the user runs on demand)

**Implementation Options:**

- **Option 10A: Per-tool hook configs referencing shared shell scripts** — `.cursor/hooks.json`, `.claude/settings.json`, `.opencode/plugin/*.ts`, `.kiro/hooks/*.kiro.hook`, all calling the same `scripts/hook_*.sh` files which in turn invoke the Python validators.
- **Option 10B: Hook-via-MCP-server** — wrap validators as MCP tools that the agent must call between phases. Cross-tool but turns enforcement back into "agent compliance," which we want to avoid.

**Problems:**
- 10A: Four near-identical configs. Plus OpenCode plugins are TS, not JSON, so they need a separate (small) implementation.
- 10B: Same agent-compliance failure mode as the monolithic workflow.

**Recommendation: 10A.** One hook script (`scripts/hook_post_extractor.sh`, etc.) shared by Cursor/Claude/Kiro via shell invocation. OpenCode gets a thin `.opencode/plugin/textbook-validators.ts` (~50 lines) that imports `child_process.execSync` to call the same shell script. Tool-specific config files are short (~30-50 lines each) and just register the hook events.

Sample `.cursor/hooks.json` (with the richer JSON output):

```json
{
  "version": 1,
  "hooks": {
    "subagentStop": [
      {
        "command": "bash .cursor/hooks/post-extractor-validate.sh",
        "matcher": "source-extractor",
        "timeout": 30,
        "failClosed": true,
        "loop_limit": 3
      },
      {
        "command": "bash .cursor/hooks/post-writer-validate.sh",
        "matcher": "section-writer",
        "timeout": 30,
        "failClosed": true,
        "loop_limit": 3
      }
    ],
    "afterFileEdit": [
      {
        "command": "bash .cursor/hooks/post-section-edit-validate.sh",
        "matcher": "Write|Edit",
        "timeout": 15
      }
    ]
  }
}
```

`scripts/hook_post_extractor.sh` reads the subagent's `agent_transcript_path` (provided in `subagentStop` input JSON), derives the manifest path, runs `python3 scripts/validate_manifest.py <manifest>`. On failure: emit JSON `{"permission":"deny", "agent_message":"Manifest validation failed: <stderr from validator>", "followup_message":"Section N extraction validation failed: <reason>. Re-spawn extractor with stricter prompt."}` and exit code 2. On success: exit 0. Cursor's `subagentStop` `followup_message` then auto-feeds the failure description back into the orchestrator's next turn; the orchestrator (deterministic Python in Option 1B) consumes this as a retry signal.

Equivalent OpenCode plugin (~50 lines):

```typescript
// .opencode/plugin/textbook-validators.ts
import { execSync } from 'child_process';
export default async () => ({
  'tool.afterExecute': async ({ tool, output }) => {
    if (tool.name === 'task' && output.subagent_type === 'source-extractor') {
      const manifestPath = deriveManifestPath(output);
      try { execSync(`python3 scripts/validate_manifest.py ${manifestPath}`); }
      catch (e) { throw new Error(`Manifest validation failed: ${e.stderr}`); }
    }
  },
  // ... similar for writer + file edits
});
```

For **Kiro**, hooks fire only at the parent-agent level. We adapt by having the Python orchestrator (Option 1B) emit a custom marker (e.g., write a sentinel file `_state/.last-extractor-completed`) after each subagent dispatch; a Kiro `File Save` hook on this sentinel triggers the validator. This is a small workaround but keeps Kiro's enforcement aligned with the other three tools.

---

### Component [C11] — AGENTS.md (Top-Level Cross-Tool Identity)

**Responsibility:** A short (<200 lines) project-root markdown file that all four target tools read. Provides project identity, points to detailed rules, sets the Zero World Knowledge contract.

**Cross-tool reading:**
- **Cursor**: native, root + nested `AGENTS.md` files
- **Claude Code**: via `import @AGENTS.md` from `CLAUDE.md` (Claude's primary file is `CLAUDE.md`, but it imports AGENTS.md natively)
- **OpenCode**: native, both project (`AGENTS.md`) and global (`~/.config/opencode/AGENTS.md`)
- **Kiro**: native via steering

**MUST contain:**
- Project name and purpose ("This repository writes verifiable AI/ML/CS textbook chapters.")
- The Zero World Knowledge core principle (1-2 paragraphs)
- Pointers to per-tool detailed rules (`.cursor/rules/`, `.claude/rules/`, `opencode.json instructions[]`, `.kiro/steering/`)
- Pointer to the user-runnable audit command: `python3 scripts/textbook_audit.py <chapter>`

**MUST NOT contain:**
- Detailed writing-style rules (those go in path-scoped `.cursor/rules/` per [C3])
- Subagent prompts (those go in `.cursor/agents/`)
- Workflow procedures (those go in `.cursor/commands/`)

**Recommendation: minimal AGENTS.md** (~150 lines). Acts as a "front door" that all four tools read. Detailed content is path-scoped to prevent over-application. For Claude Code, add a 2-line `CLAUDE.md` at project root: `# Claude Code project entry\n@AGENTS.md` to import AGENTS.md.

---

## 5. The Manifest Schema (Concrete Specification)

The single most important contract in the system. Saved at `scripts/manifest_schema.json` (JSON Schema spec, validated by [C7]).

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "TextbookSectionManifest",
  "type": "object",
  "required": ["schema_version", "section_number", "section_label", "extracted_by", "extracted_at", "sources", "subagent_attestation"],
  "properties": {
    "schema_version": { "const": "1.0" },
    "section_number": { "type": "integer", "minimum": 1 },
    "section_label": { "type": "string", "pattern": "^_[0-9]{2}-.*\\.qmd$" },
    "section_topic": { "type": "string" },
    "extracted_by": { "type": "string" },
    "extracted_at": { "type": "string", "format": "date-time" },
    "sources": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["source_id", "source_url", "files_read", "fabrication_check"],
        "properties": {
          "source_id": { "type": "string" },
          "source_title": { "type": "string" },
          "source_url": { "type": "string", "format": "uri" },
          "files_read": {
            "type": "array",
            "minItems": 1,
            "items": {
              "type": "object",
              "required": ["path", "lines", "last_line_content"],
              "properties": {
                "path": { "type": "string" },
                "lines": { "type": "integer", "minimum": 1 },
                "last_line_content": { "type": "string", "minLength": 5, "maxLength": 80 }
              }
            }
          },
          "quotes": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["file", "lines", "quote_verbatim", "claim_type"],
              "properties": {
                "file": { "type": "string" },
                "lines": { "type": "string", "pattern": "^\\d+(-\\d+)?$" },
                "quote_verbatim": { "type": "string", "minLength": 1 },
                "claim_type": { "enum": ["statistic", "definition", "framework", "finding", "quote", "method"] },
                "supports_subsection": { "type": "string" }
              }
            }
          },
          "background_context": { "type": "array" },
          "images": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["source_path", "license_check"],
              "properties": {
                "source_path": { "type": "string" },
                "caption_excerpt": { "type": "string" },
                "license_check": { "type": "string" }
              }
            }
          },
          "fabrication_check": {
            "type": "string",
            "pattern": "^(OK|UNAVAILABLE: .+|STATISTIC NOT FOUND: .+)$"
          },
          "missing_in_plan": { "type": "array", "items": { "type": "string" } }
        }
      }
    },
    "subagent_attestation": {
      "type": "object",
      "required": ["files_read_count", "total_lines_read", "verification_seeds"],
      "properties": {
        "files_read_count": { "type": "integer", "minimum": 1 },
        "total_lines_read": { "type": "integer", "minimum": 1 },
        "verification_seeds": {
          "type": "array",
          "minItems": 5,
          "maxItems": 5,
          "items": {
            "type": "object",
            "required": ["file", "line", "first_60_chars"],
            "properties": {
              "file": { "type": "string" },
              "line": { "type": "integer", "minimum": 20 },
              "first_60_chars": { "type": "string", "minLength": 10, "maxLength": 60 }
            }
          }
        }
      }
    }
  }
}
```

Validation flow:
1. JSON Schema check (`jsonschema` Python library)
2. Custom check: 5 seeds span ≥5 distinct files
3. Custom check: each seed's line is ≤ `wc -l file - 20` (middle of file)
4. Custom check: `sed -n '{line}p' {file}` first 60 chars matches `first_60_chars` exactly
5. Custom check: every cited file in `sources[].files_read[].path` exists on disk

---

## 6. The Audit Block (Concrete Specification)

Saved at the very top of every `_0N-section.qmd`:

```
<!-- SOURCE AUDIT v1
manifest: SECTION-3-MANIFEST.json
extracted_at: 2026-05-14T15:30:00Z
quotes_used:
  - file: sources/arxiv-2503.13657/05_findings.tex
    lines: 142-145
    first_60_chars: "FC1, Specification Issues, accounts for 41.77% of fail"
    used_for: "MAST FC1 percentage in subsection 'The MAST Taxonomy'"
  - file: sources/cognition.ai/blog/dont-build-multi-agents/content.md
    lines: 47-95
    first_60_chars: "We've found that single-threaded linear agents..."
    used_for: "Cognition Principle 1"
images_used:
  - destination: Statistics/Optimal Transport/images/mast-failure-distribution.png
    source: sources/arxiv-2503.13657/images/figure3.png
    license_check: cc-by-4.0
total_quotes: 12
images_count: 2
unattributed_claims: 0
training_data_acceptable_uses:
  - "general characterization: NeurIPS is a top AI conference"
generated_by: section-writer-v1.0
generated_at: 2026-05-14T15:42:00Z
-->

## Section Title {#sec-section-name}

[prose content...]
```

Why HTML comment + YAML inside?
- HTML comments are stripped by Quarto at render time → invisible in published output
- Grep-able from the command line: `grep -A50 'SOURCE AUDIT v1' _*.qmd`
- Parseable by Python: strip HTML comment markers, parse YAML
- Survives context summarization (it's in the file, not chat)
- One file = one audit; no sidecar coordination

---

## 7. Directory Layout (Final)

```
AI-Learning-Gems/
├── AGENTS.md                                    # [C11] Cross-tool top-level (~150 lines, all 4 tools read it)
├── CLAUDE.md                                    # 2-line `@AGENTS.md` import for Claude Code
├── README.md                                    # User-facing setup + tool-specific notes
│
├── .agents/                                     # Cross-tool open standard ([agentskills.io](https://agentskills.io))
│   └── skills/                                  # All 4 tools read this path
│       ├── verify-manifest/
│       │   ├── SKILL.md                         # frontmatter: paths: "**/_manifests/**", disable-model-invocation: true
│       │   └── scripts/validate.py → ../../../scripts/validate_manifest.py
│       ├── verify-audit-block/
│       │   ├── SKILL.md                         # frontmatter: paths: "**/_[0-9][0-9]-*.qmd"
│       │   └── scripts/verify.py → ../../../scripts/verify_audit_block.py
│       ├── extract-source-images/SKILL.md
│       └── render-chapter/SKILL.md
│
├── .cursor/                                     # Cursor-native config (canonical for rules + commands + agents)
│   ├── rules/                                   # [C3] Path-scoped rules
│   │   ├── 01-zero-world-knowledge.mdc          # globs: section files + manifest paths
│   │   ├── 02-writing-style.mdc                 # globs: _[0-9][0-9]-*.qmd, _98-*.qmd, _99-*.qmd
│   │   ├── 03-quarto-conventions.mdc            # globs: *.qmd
│   │   ├── 04-source-management.mdc             # globs: TEXTBOOK-PLAN.md, MANIFEST*
│   │   └── 05-visualization-standards.mdc       # globs: textbook section files
│   ├── commands/                                # User-facing slash commands (in Cursor 2.4+ also expressible as skills with disable-model-invocation: true)
│   │   ├── research-textbook-chapter.md         # [unchanged, ~600 lines after trim]
│   │   ├── write-textbook-chapter.md            # [C1] Thin orchestrator wrapper (~50 lines)
│   │   ├── textbook-extract-section.md          # Manual extraction entry (~80 lines)
│   │   ├── textbook-write-section.md            # Manual write entry (~80 lines)
│   │   ├── textbook-assemble.md                 # [C6] Thin assembler wrapper (~30 lines)
│   │   ├── textbook-audit.md                    # [C9] Thin audit wrapper (~30 lines)
│   │   └── (existing edit-, exercises-, update-) # Refactored similarly later
│   ├── agents/                                  # [C2, C4] Subagent definitions (Cursor frontmatter)
│   │   ├── source-extractor.md                  # ~80 lines
│   │   ├── section-writer.md                    # ~120 lines
│   │   ├── state-locker.md                      # ~60 lines
│   │   ├── state-updater.md                     # ~50 lines
│   │   └── citation-verifier.md                 # ~60 lines (used in /textbook-audit)
│   ├── hooks.json                               # [C10] Cursor hooks (subagentStop, afterFileEdit)
│   ├── hooks/                                   # Hook scripts (shared across Cursor/Claude/Kiro)
│   │   ├── post-extractor-validate.sh
│   │   ├── post-writer-validate.sh
│   │   └── post-section-edit-validate.sh
│   └── mcp.json
│
├── .claude/                                     # Claude Code config (synced from .cursor/)
│   ├── rules/                                   # Copies of .cursor/rules/ (.md extension; rebuilt via sync script)
│   ├── agents/                                  # Copies of .cursor/agents/ (Claude reads .claude/agents/ natively)
│   └── settings.json                            # Claude-specific hooks block (mirrors .cursor/hooks.json shape)
│
├── opencode.json                                # OpenCode config
│   # references: ".cursor/rules/02-writing-style.mdc", etc., via instructions[]
│   # also: agent: { "section-writer": { "prompt": "@./.cursor/agents/section-writer.md" } }
├── .opencode/
│   └── plugin/                                  # In-process TS plugins (= hooks for OpenCode)
│       └── textbook-validators.ts               # ~50 lines, calls scripts/hook_*.sh via execSync
│
├── .kiro/                                       # Kiro IDE+CLI config
│   ├── steering/textbook-pointer.md             # Imports .cursor/rules/ via @-references
│   ├── agents/                                  # JSON wrappers around the .cursor/agents/ prompts
│   └── hooks/                                   # .kiro.hook files; fire only at parent-agent level (not in Kiro subagents)
│       ├── post-extractor-completed.kiro.hook   # Watches sentinel files written by orchestrator
│       └── post-writer-completed.kiro.hook
│
├── scripts/                                     # Pre-defined deterministic Python validators
│   ├── manifest_schema.json                     # JSON Schema for [C7]
│   ├── validate_manifest.py                     # [C7]
│   ├── verify_audit_block.py                    # [C8]
│   ├── textbook_audit.py                        # [C9] User-runnable
│   ├── assemble_chapter.py                      # [C6]
│   ├── run_pipeline.py                          # [C1] Option 1B: deterministic orchestrator
│   ├── spawn_subagent.py                        # Cross-tool subagent dispatch adapter (Cursor/Claude/OpenCode SDKs)
│   ├── sync_rules_across_tools.py               # [C3] Solution to per-tool config sync
│   ├── validate_state_completeness.py           # [C5] backstop
│   ├── check_source_readability.py
│   ├── extract_section_plan.py                  # Slice TEXTBOOK-PLAN per section
│   ├── convert_pdf_figures.py
│   ├── (existing) authenticated_extract.py      # [unchanged]
│   ├── (existing) webpage_to_md.py              # [unchanged]
│   ├── (existing) mistral_ocr.py                # [unchanged]
│   └── (existing) onenote_pdf_to_markdown.py    # [unchanged]
│
├── sources/                                     # [unchanged from current]
│   ├── arxiv-XXXX/
│   ├── domain.com/path/
│   └── ...
│
└── {Domain}/                                    # Chapter folders (e.g. Statistics/, Mathematics/)
    └── {Chapter Name}.qmd                       # Index file
        {Chapter Name}/
        ├── TEXTBOOK-PLAN.md                     # [unchanged structure; PLACEHOLDERS warning at top]
        ├── _state/                              # [C5] Cross-cutting state
        │   ├── NOTATION.json                    # [locked after research phase]
        │   ├── RUNNING-EXAMPLE.md               # [locked after research phase]
        │   ├── CONCEPT-MAP.md                   # [locked after research phase]
        │   ├── .lock                            # presence = locked; remove to allow edits
        │   └── .last-extractor-completed        # Sentinel for Kiro hook trigger
        ├── _manifests/                          # Per-section extraction artifacts
        │   ├── SECTION-1-MANIFEST.json
        │   ├── SECTION-2-MANIFEST.json
        │   └── ...
        ├── _01-introduction.qmd                 # Has <!-- SOURCE AUDIT v1 --> at top
        ├── _02-...qmd
        ├── ...
        ├── _98-math-background.qmd              # Conditional
        ├── _99-closing.qmd
        ├── _pipeline_log.txt                    # Append-only orchestrator log
        └── images/                              # Copied + downloaded images
```

Key invariants:
- `_state/` is sacred — locked after research; only `state-updater` can modify (via mid-pipeline gap protocol).
- `_manifests/` is regeneratable — delete a manifest to force re-extraction of one section.
- Section `.qmd` files are regeneratable — delete to force re-write.
- Audit blocks live in section files (not sidecars) → grep-able, persistent.
- **`.agents/skills/` is the cross-tool standard** — putting verification skills there ensures all four tools discover them without per-tool duplication.

---

## 8. Context Engineering: How To Avoid Duplication

The user's specific concern: "main agent does not re-generate instructions for each subagent (expensive), and rules files are not duplicated."

**Strategy:**

| What | Where | How it reaches subagents | Cost per subagent invocation |
|---|---|---|---|
| Writing-style rules | `.cursor/rules/02-writing-style.mdc` (globs: textbook section files) | Auto-attached by IDE runtime when subagent reads `.qmd` | ~3K tokens (paid by runtime, not orchestrator prompt) |
| Quarto conventions | `.cursor/rules/03-quarto-conventions.mdc` (globs: *.qmd) | Auto-attached when subagent edits any `.qmd` | ~2K tokens |
| Source-integrity (Zero World Knowledge) | `.cursor/rules/01-zero-world-knowledge.mdc` (globs: textbook + manifest paths) | Auto-attached for both extractor and writer | ~2K tokens |
| Subagent-specific procedure | `.cursor/agents/source-extractor.md` body | Static prompt loaded once per subagent invocation | ~3K tokens (the prompt itself) |
| Manifest content | `SECTION-{N}-MANIFEST.json` | Passed as a path; subagent reads via `Read` tool | Variable (manifest size; typically 5-30K) |
| Section-specific outline | `_state/section-N-plan.md` (orchestrator slices TEXTBOOK-PLAN per section) | Passed as a path | ~2-5K |

The orchestrator's prompt to a subagent is **just parameters and paths**, never embedded rule text:

```
Spawn subagent: section-writer
Parameters:
  - section_number: 3
  - manifest_path: Statistics/Optimal Transport/_manifests/SECTION-3-MANIFEST.json
  - state_path: Statistics/Optimal Transport/_state/
  - section_plan_excerpt: Statistics/Optimal Transport/_state/section-3-plan.md
SCAN questions (computed from manifest):
  Q1: How many distinct sources contributed quotes? → expect: 4
  Q2: What is the file:line for the FC1 percentage? → expect: arxiv-2503.13657/05_findings.tex:142
  Q3: How many UNAVAILABLE markers? → expect: 0
  Q4: List the 5 verification seeds verbatim.
  Q5: State the contract.
```

The total subagent context is roughly:
- Subagent prompt body (static, from `.cursor/agents/section-writer.md`): ~3K tokens
- Auto-attached path-scoped rules: ~5-7K tokens
- Manifest content (Read'd by subagent): ~10-30K tokens
- SCAN-protocol output (subagent's own response): ~500 tokens

**Total per subagent ≈ 20-40K tokens.** Across 7 sections × 2 subagents (extractor + writer) = ~300-560K token-budget for content. Plus orchestrator + assembly (small). Well under typical 1M-token budgets.

The orchestrator's **own** context stays tiny because:
- It never reads source content
- It never reads full TEXTBOOK-PLAN; just slices section-N-plan via `extract_section_plan.py`
- It only reads validator stdout (a few hundred chars per phase)
- It re-uses subagent paths, not bodies

---

## 9. Cross-Tool Implementation Details

### 9.1 Cursor (Primary Target)

- All canonical files in `.cursor/`
- Hooks via `.cursor/hooks.json` — supports JSON-output decisions (`permission`, `agent_message`, `followup_message`), `failClosed`, `loop_limit`, both `command` and `prompt` (LLM-evaluated) action types
- Subagents spawned by Python orchestrator via `cursor-agent` CLI or `@cursor/sdk` (TypeScript)
- Path-scoped rules via `globs:` frontmatter (Cursor's native four-mode system: Always, Apply Intelligently, Apply to Specific Files, Apply Manually)
- Skills: `.agents/skills/` (cross-tool standard) read natively, plus `.cursor/skills/` for any Cursor-specific bundles
- AGENTS.md read natively (root + nested)
- Slash commands in Cursor 2.4+ effectively merged into skills with `disable-model-invocation: true`; we keep `.cursor/commands/` for clarity but understand it's the same surface

### 9.2 Claude Code

- Files synced from `.cursor/` to `.claude/` via `scripts/sync_rules_across_tools.py`
- Hooks via `.claude/settings.json` `hooks` block — richest event set (28+ events including `PreCompact`/`PostCompact`, `WorktreeCreate`/`WorktreeRemove`, `TeammateIdle`); 5 action types (`command`, `http`, `mcp_tool`, `prompt`, `agent` multi-turn verifier)
- Subagents spawned via Python or TypeScript Agent SDK (`claude-agent-sdk`); deepest headless story (`claude -p`, `--bare`, `--allowedTools`, `--output-format json/stream-json`, `--json-schema`)
- Path-scoped rules via `paths:` frontmatter (Claude's keyword)
- Skills: `.agents/skills/` (cross-tool) + `.claude/skills/` (richer Claude features available: `$ARGUMENTS`, `` !`shell` ``, fork mode, `allowed-tools`)
- AGENTS.md read via `import @AGENTS.md` from a 2-line `CLAUDE.md`
- Optional Claude-specific accelerators (not in v1 baseline): worktree isolation per subagent (`isolation: worktree`), `/loop` and `/goal` for autonomous retry, `/batch` for repo-wide migrations

### 9.3 OpenCode

- Files in `.cursor/` referenced via `opencode.json`:
  ```json
  {
    "instructions": [
      "./.cursor/rules/01-zero-world-knowledge.mdc",
      "./.cursor/rules/02-writing-style.mdc"
    ],
    "agent": {
      "section-writer": { "prompt": "@./.cursor/agents/section-writer.md" }
    }
  }
  ```
- **Hooks ARE supported** — via `.opencode/plugin/*.ts` TS modules (in-process, not subprocess). Same enforcement events available (`tool.afterExecute`, `file.afterEdit`, `session.start`, etc.). Our `.opencode/plugin/textbook-validators.ts` (~50 lines) wraps the same shell scripts as Cursor/Claude
- Subagents follow the **two-tier model**: orchestrator runs as a **primary agent** (Build mode in OpenCode terms); extractor and writer are **subagents** (invoked via the `task` tool)
- Per-agent permissions are first-class (`bash: { "git status *": "allow" }`, `task: { "*": "deny", "section-writer": "ask" }`)
- Skills: `.agents/skills/` + `.opencode/skills/`. Strict on-demand model — skills load only when the agent calls the `skill` tool. Per-skill `permission` block for fine-grained access control
- AGENTS.md read natively
- **OpenCode-only opportunity (not in v1 baseline):** could reimplement the validators as `.opencode/tools/*.ts` first-class custom tools (Zod-typed). Skipped because we want cross-tool baseline; revisit if OpenCode becomes primary

### 9.4 Kiro

- Files synced from `.cursor/` to `.kiro/`:
  - `.kiro/steering/textbook-pointer.md` imports rules via `@`-references
  - `.kiro/agents/*.json` are JSON wrappers around the same `.cursor/agents/*.md` prompts (Kiro uses JSON for agent definitions)
- Hooks via `.kiro/hooks/*.kiro.hook` (GUI-creatable; ~12 events: `Prompt Submit`, `Pre/Post Tool Use`, `Agent Stop`, `File Save`, etc.)
- **Critical Kiro caveat:** hooks **do NOT fire inside subagents**. Hook-based enforcement only triggers at the parent (orchestrator) agent level. Workaround: the Python orchestrator writes sentinel files (`_state/.last-extractor-completed`) after each subagent dispatch; a Kiro `File Save` hook on the sentinel triggers the validator
- **Critical Kiro caveat:** Kiro is the most GUI-bound tool. Headless invocation (Python orchestrator spawning subagents via CLI) is least documented. **Recommended fallback for Kiro:** use Option 1A (markdown orchestrator) for Kiro pipelines instead of Option 1B; the user dispatches sub-commands manually from the Kiro chat
- AGENTS.md read natively
- **Kiro-only distribution opportunity (not in v1):** package the textbook workflow as a **Kiro Power** (`POWER.md` + `mcp.json` + `steering/`) with keyword-driven activation ("write a chapter" → Power activates, registers MCP tools, loads steering)

### 9.5 Sync Script (`sync_rules_across_tools.py`)

A ~150-line Python script that:
1. Reads `.cursor/rules/*.mdc` and `.cursor/agents/*.md` (canonical sources)
2. Writes copies (not symlinks; cross-platform compatibility) to:
   - `.claude/rules/` (transforms `globs:` → `paths:` for Claude)
   - `.claude/agents/` (passes through; Claude-frontmatter-compatible)
   - `.kiro/steering/` (markdown copies; Kiro reads similar four-mode activation)
   - `.kiro/agents/*.json` (wraps each `.md` agent in Kiro's JSON schema)
3. Updates `opencode.json` with `instructions[]` references to `.cursor/rules/*.mdc`
4. Maintains `.opencode/plugin/textbook-validators.ts` (single TS plugin, regenerated from a template)
5. Validates that all per-tool configs are in sync (no drift)

Run on:
- Initial setup (one-time per developer)
- Whenever a rule or agent file is updated (manually, or via a git pre-commit hook)

---

## 10. Pipeline Lifecycle (End-to-End Walkthrough)

User invokes `/write-textbook-chapter Statistics/Bayesian\ Credible\ Intervals/TEXTBOOK-PLAN.md`.

### Stage 0 — Initialization (orchestrator, ~30 seconds)
1. Reads `TEXTBOOK-PLAN.md` once (small, cacheable).
2. Validates `_state/` is locked (NOTATION.json + RUNNING-EXAMPLE.md exist + `.lock` present).
3. Slices TEXTBOOK-PLAN into per-section excerpts: writes `_state/section-{N}-plan.md` for each.
4. Pre-flight check: `scripts/check_source_readability.py` — every source folder for every section has at least one `.md`/`.tex`/`.txt` file > 500 chars. Halt if fail.
5. Emits initialization summary to chat.

### Stage 1 — Extraction (parallel, capped at 3-4 concurrent, ~10-20 minutes for 7 sections)
For each section N, parallel:
1. Spawns `source-extractor` subagent with: `section_number`, `section_plan_path`, `source_paths[]`.
2. Subagent (clean context) lists folders, reads files, writes `SECTION-{N}-MANIFEST.json`.
3. Orchestrator runs `validate_manifest.py` on the output. Exit code != 0 → retry (up to 3) → halt.
4. Per-section ✓/⚠/✗ to chat.

### Stage 2 — Writing (sequential, ~10-20 minutes for 7 sections)
For each section N in order:
1. Orchestrator computes 5 SCAN questions from the manifest.
2. Spawns `section-writer` subagent with: manifest path, state path, section plan, SCAN questions.
3. Subagent (clean context) emits SCAN answers in chat, writes `_0N-section.qmd` with audit block.
4. Orchestrator runs `verify_audit_block.py` on the output. Halt on failure.
5. If writer emits `STATE_GAP`, orchestrator pauses, spawns `state-updater`, resumes.
6. Per-section ✓/⚠/✗ to chat.

### Stage 3 — Assembly (1-2 minutes)
1. `python3 scripts/assemble_chapter.py <chapter>` generates the index `.qmd`.
2. Resolves cross-references (`@sec-*`, `@fig-*`, `@eq-*`).
3. Final lints: em-dashes, banned words, image paths, audit-block presence.
4. Halt on any error with the precise `_NN-section.qmd:line` location.

### Stage 4 — Final Audit (user-runnable, <2 minutes)
The orchestrator's final chat message:
> ✅ Pipeline complete in 28 minutes.
> Run `python3 scripts/textbook_audit.py "Statistics/Bayesian Credible Intervals"` to verify.
> Run `quarto render Statistics/Bayesian\ Credible\ Intervals.qmd` to build HTML.

---

## 11. Mitigations for Agent Imperfection

The design assumes both main agent and subagents are imperfect (constraint C3). Specific mitigations:

| Failure mode | Mitigation | Layer |
|---|---|---|
| **Subagent fabricates a manifest** (no real file reads) | 5 verification seeds across ≥5 distinct files at random middle-of-file lines, verified by `sed -n` post-hoc | [C7] |
| **Subagent fabricates `last_line_content`** | `last_line_content` per file, also verified by `sed -n` against `wc -l` | [C7] |
| **Writer ignores manifest, writes from training data** | (a) SCAN protocol forces 5 manifest-content-specific output tokens; (b) `verify_audit_block.py` cross-references prose claims with manifest entries; (c) audit block YAML lists every quote, validated by `sed -n` | [C4] + [C8] |
| **Writer fabricates audit-block entries** | Audit block's `file:line` entries are verified via `sed -n`. Fabrication requires writer to know exact mid-file content, which requires reading. Same anti-fabrication argument as seeds. | [C8] |
| **Orchestrator skips validators** | Option 1B (Python orchestrator, deterministic) eliminates this for Cursor/Claude/OpenCode. For Kiro (GUI-bound, fallback to Option 1A): hooks at parent-agent level + sentinel-file pattern enforce; user runs `textbook_audit.py` post-hoc as final detection. | [C1] + [C9] + [C10] |
| **Main agent context bloat over many sections** | Per-section context isolation: orchestrator never reads source content; subagents have clean contexts; rules auto-attach via globs (not embedded in orchestrator prompt). | [C1] + [C3] |
| **Sub-agent provider drift** (different models give different output quality) | Schema-enforced output: bad outputs are caught regardless of provider. The prompt asks for structure; the validator enforces it. | [C7] + [C8] |
| **Stale source content** (URL changed, file edited externally) | `last_line_content` and `verification_seeds` will mismatch on re-validation; audit script flags affected sections. | [C9] |
| **Cross-section drift in notation/example** | `_state/` files locked; `STATE_GAP` mid-pipeline protocol; `validate_state_completeness.py` backstop. | [C5] |
| **Validator script bug** | Adversarial test fixtures: hand-crafted manifests with known fabrications must all be caught. Run on every PR. | [C7] + [C8] testing |
| **User trusts pipeline output without auditing** | Orchestrator's final message *requires* the user to either run `textbook_audit.py` or explicitly skip. Audit takes <2 min. | [C9] |

---

## 12. Rollout Plan

### v0 — One-Day Spike (validates the audit-block mechanism on real chapters)
- Implement `verify_audit_block.py` only.
- Manually retrofit the existing "Multi-Agent Coordination for Code" chapter with audit blocks.
- Run validator; report mismatches.
- **Decision gate:** does the audit-block-in-file mechanism catch known fabrications? If yes, proceed to v1. If no, redesign.

### v1 — Two-to-Three Weeks (core pipeline + cross-tool hooks)
- Implement `manifest_schema.json`, `validate_manifest.py`, `verify_audit_block.py`, `textbook_audit.py`, `run_pipeline.py`.
- Write `.cursor/agents/source-extractor.md`, `.cursor/agents/section-writer.md`.
- Write thin slash commands: `/textbook-extract-section`, `/textbook-write-section`, `/textbook-assemble`, `/textbook-audit`.
- Refactor `/write-textbook-chapter` into the orchestrator (Option 1B for Cursor/Claude/OpenCode; Option 1A fallback for Kiro).
- Update path-scoped rules with globs.
- Sync to `.claude/`, `opencode.json`, `.kiro/`.
- **Implement hooks layer for all four tools simultaneously**:
  - `.cursor/hooks.json` (Cursor)
  - `.claude/settings.json` `hooks` block (Claude Code)
  - `.opencode/plugin/textbook-validators.ts` (OpenCode in-process plugin)
  - `.kiro/hooks/*.kiro.hook` watching sentinel files (Kiro parent-agent-level)
- Test: deliberately spawn a fabricating subagent on each tool; hook must halt before main agent proceeds (Cursor/Claude/OpenCode: at subagent-stop; Kiro: at sentinel-file-write).
- Test: write one new chapter end-to-end. Run audit. Score must be ≥98 on all four tools.

### v1.1 — One Week (parallel + streaming)
- Parallelize Stage 1 extraction (capped concurrency at 3-4).
- Stream Stage 2 output: section files appear as they're written.
- Cache manifests across runs.

### v2 — Two Weeks (cross-cutting state + edit/update refactor)
- Implement `state-locker`, `state-updater` subagents.
- Refactor `/edit-textbook-chapter`, `/update-textbook-chapter` to the same pipeline pattern.
- Backfill audit blocks for all existing chapters.

### v3 — Tool-Specific Accelerators (Optional, ~1 Week)
- **Claude Code**: enable subagent worktree isolation (`isolation: worktree`) for parallel writers; experiment with `/goal "every section has a valid audit block"` for autonomous retry recovery; test `/batch` for repo-wide chapter migrations.
- **OpenCode**: rewrite key validators as `.opencode/tools/*.ts` first-class custom tools (Zod-typed) for cleaner integration; use per-agent permission blocks for tighter `task` gating.
- **Kiro**: package as a Kiro Power (`POWER.md` + `mcp.json` + `steering/`) for keyword-activated installation from `kiro.dev/powers`.
- **Cursor**: publish as a Cursor Plugin to the Marketplace for one-click team installation.

### v3.1 — Maintenance
- CI integration: `textbook_audit.py` on every git push for chapters in the repo.
- Quarterly: re-run audit on all chapters; flag stale sources.

---

## 13. Success Metrics (v1 Done Criteria)

Measured automatically by `textbook_audit.py`:

| Metric | Target |
|---|---|
| Source coverage (% of plan sources with valid manifest entries) | 100% |
| Audit completeness (% of prose claims traced to manifest) | ≥98% |
| Verification seed pass rate | 100% |
| Pipeline auto-recovery rate (failures recovered without user intervention) | ≥80% |
| User audit time (`textbook_audit.py` wall time on a 7-section chapter) | ≤2 minutes |
| Cross-tool equivalence (same chapter score across Cursor, Claude, OpenCode, Kiro) | ±2 points |
| Total pipeline wall time for a 7-section chapter | ≤45 minutes |

User-facing acceptance test:
- User invokes `/write-textbook-chapter` on a fresh topic.
- Pipeline completes in <45 min without manual intervention.
- User runs `textbook_audit.py`; score is ≥98.
- User does NOT need to manually audit sources.

---

## 14. Open Questions (For User Review Before Implementation)

1. **Audit-block location** — in section file (recommended; persistent + grep-able) or sidecar `.audit.yaml` (cleaner raw view). The proposal recommends in-file; user may have aesthetic preferences.

2. **Backfill scope** — retrofit all existing chapters (`Optimal Transport`, `Multi-Agent Coordination for Code`, etc.) with manifests + audit blocks, or grandfather legacy chapters with a "pre-v1" marker?

3. **Sub-agent invocation API** — does the user want the Python orchestrator (Option 1B, more reliable) or the markdown-only orchestrator (Option 1A, simpler but compliance-risky)? Recommendation: 1B.

4. **Where should `manifest_schema.json` and the per-tool sync logic live** — `scripts/` (current proposal) or a new `.cursor/skills/textbook-pipeline-core/` skill bundle? Skill bundling makes the system more "installable" but adds an indirection layer.

5. **User's "swarm" intent** — the user's prompt mentioned "swarm pattern, where one agent..." (cut off). The proposal interprets this as fork-join per section. If the intended meaning was different (e.g., per-source rather than per-section forks), worth clarifying.

6. **CI gate** — should `textbook_audit.py` block git push if a chapter's score drops below threshold? Recommendation: warning only initially; hard-block once the system is mature.

7. **Cross-tool testing** — does the user have access to all 4 tools for v1 acceptance testing? If not, prioritize Cursor + one CLI (Claude Code or OpenCode).

---

## 15. Summary

The current monolithic `/write-textbook-chapter` workflow fails because:
1. Length and instruction density cause documented LLM instruction-drift after 3-4 sub-tasks.
2. There is no forcing function that produces a *user-verifiable artifact* of compliance.
3. Compliance instructions are described, not architecturally enforced.

This proposal addresses all three with:
1. **Smaller commands** (≤500 lines each) reduce drift surface.
2. **Audit blocks in section files + verification seeds in manifests** are user-verifiable in <2 minutes via `sed -n` spot-checks.
3. **Python validator scripts gate phase transitions** in a deterministic Python orchestrator (Option 1B), making compliance structural rather than exhortational.

The architecture is the well-validated `deep-factual-search.md` pattern, generalized to multi-section writing, with per-section context isolation, structured-output JSON manifests, and cross-tool primitives (slash commands, subagents, rules with globs/paths, skills following the [agentskills.io](https://agentskills.io) open standard, terminal-Python). **Hooks are available on all four target tools** — Cursor `hooks.json`, Claude Code `settings.json` hooks block, OpenCode `.opencode/plugin/*.ts` (in-process), Kiro `.kiro.hook` files — with one important caveat: Kiro hooks fire at the parent-agent level only, not inside Kiro subagents. Kiro pipelines therefore use a sentinel-file pattern + Option 1A (markdown orchestrator) instead of Option 1B (Python orchestrator).

The total user-facing surface is one primary command (`/write-textbook-chapter`) and one verification command (`/textbook-audit`). Behind those: 5 subagent definitions, 5 path-scoped rule files, 4 skills, 9 Python scripts, 1 manifest schema. Total new code: ~3,500 lines (replacing 4,000+ lines of current monolithic workflow text), distributed across small, single-responsibility files.

**Recommendation:** approve v0 (one-day spike) immediately to validate the audit-block mechanism. Approve v1 contingent on v0 success.

---

## Appendix A — Corrections Log (vs draft v0.1)

This proposal was revised in response to a more detailed feature-landscape review. Substantive corrections:

| Area | Original (draft v0.1) | Corrected (this version) | Source |
|---|---|---|---|
| OpenCode hooks | "OpenCode lacks hooks; design must work hook-less" (constraint C2) | OpenCode supports hooks via in-process `.opencode/plugin/*.ts` modules. All four tools have hooks. | Coding-tools landscape doc, §4 |
| Kiro subagent hooks | (not addressed) | New constraint C9: Kiro hooks do NOT fire inside subagents. Workaround: sentinel-file pattern. | Coding-tools landscape doc, §3 |
| Headless / SDK maturity | "Cursor SDK supports... Kiro CLI supports it" (vague) | New constraint C8: Kiro is the most GUI-bound; recommended fallback to Option 1A for Kiro. | Coding-tools landscape doc, §11 |
| Skills location | `.cursor/skills/` only | `.agents/skills/` (cross-tool open standard at agentskills.io) + `.cursor/skills/` (tool-specific) | Coding-tools landscape doc, §2 + Cursor skills docs |
| Skill frontmatter | Generic | Explicit `paths:` for relevance + `disable-model-invocation: true` for validators | Cursor skills docs + landscape §2 |
| Slash commands vs skills | Treated as separate primitives | In Cursor 2.4+ commands are skills with `disable-model-invocation: true`; OpenCode and Claude Code keep them distinct | Cursor docs + landscape §8 |
| Hook output | Exit-code only | Structured JSON: `permission`, `agent_message`, `followup_message` for retry loops; `failClosed: true`; `loop_limit` | Cursor hooks docs |
| Rules activation modes | `globs:` only | Cursor's four modes (Always, Apply Intelligently, Apply to Specific Files, Apply Manually); we prefer `globs:` because it's the only mode supported by all four tools | Cursor rules docs + landscape §1 |
| AGENTS.md in Claude Code | "via symlink" | Native via `import @AGENTS.md` from a 2-line `CLAUDE.md` | Cursor + Claude Code docs |
| OpenCode rules activation | (not addressed) | OpenCode lacks frontmatter-driven activation; uses `instructions[]` array with globs in `opencode.json` | Coding-tools landscape doc, §1 |
| OpenCode subagent model | Generic "subagent" | Two-tier: primary (Build/Plan) vs subagent (General/Explore/Scout); orchestrator is a primary, extractor/writer are subagents | Coding-tools landscape doc, §3 |
| Custom tools | Not mentioned | OpenCode-only first-class custom tools (`.opencode/tools/*.ts`); not in v1 baseline (cross-tool); v3 enhancement | Coding-tools landscape doc, §7 |
| Worktrees | Not mentioned | Claude-Code-only feature; v3 enhancement | Coding-tools landscape doc, §9 |
| Scheduled tasks (`/loop`, `/goal`) | Not mentioned | Claude-Code-only; potential v3 retry-recovery mechanism | Coding-tools landscape doc, §10 |
| Bundled distribution | "Marketplace = vendor lock-in, avoid" | More nuanced: each tool has different bundling (Cursor Plugins, Claude Plugins, Kiro Powers, OpenCode npm); v1 baseline avoids them; v3 distribution opportunity | Coding-tools landscape doc, §5 |
| Rollout plan | Hooks were a separate v1.1 phase | Hooks merged into v1 (since they're cross-tool). New v3 phase for tool-specific accelerators. | This revision |

*End of design proposal.*
