---
name: research-textbook-chapter
description: Deeply research a technical or mathematical topic, download and verify sources, inventory useful figures, and create a source-grounded TEXTBOOK-PLAN.md for a future AI Learning Gems chapter. Use when the user asks to research or plan a new textbook chapter. Do not use to write the final chapter.
---

# Research Textbook Chapter

Read `references/workflow.md` in full, then execute it faithfully from the repository root.

Preserve every research phase, source acquisition and verification requirement, image inventory, plan schema, autonomous execution rule, and final handoff. Apply only the Codex compatibility rules below.

## Codex compatibility

- Resolve every named rule to `.cursor/rules/<rule-name>.mdc`.
- Interpret every `AI-Learning-Gems/sources/` path as the repository's canonical top-level `sources/` directory.
- Invoke the successor workflow as `$write-textbook-chapter` instead of `/write-textbook-chapter`.
- Use current Codex web, file, terminal, and collaboration tools for equivalent operations.
- Treat explicit subagent steps as authorization for those bounded delegations when subagents are available.
- Follow active sandbox, approval, safety, and user-authority requirements.
