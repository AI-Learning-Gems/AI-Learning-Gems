---
name: deep-factual-search
description: Perform rigorous, source-grounded factual research with assumption validation and detailed synthesis. Use when the user asks for a deep factual search, evidence-backed investigation, literature-style research, or verification of a complex factual question. Do not use for implementation tasks or quick stable facts.
---

# Deep Factual Search

Read `references/workflow.md` in full, then execute it faithfully from the repository root.

Preserve the workflow's research phases, assumption checks, source standards, autonomy, and chat-based deliverable. Apply only the Codex compatibility rules below.

## Codex compatibility

- Use current Codex tools that provide the equivalent capability named by the workflow.
- Treat instructions to use subagents as authorization to delegate the bounded research tasks described by the workflow when subagents are available.
- Follow active sandbox, approval, safety, and user-authority requirements when they conflict with the workflow's autonomy language.
- Resolve any named project rule through its exact path under `.cursor/rules/` with the `.mdc` extension.
