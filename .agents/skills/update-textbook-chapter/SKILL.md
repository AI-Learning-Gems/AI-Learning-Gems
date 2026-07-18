---
name: update-textbook-chapter
description: Surgically update an existing AI Learning Gems textbook chapter using new verified sources while preserving its scope, learning objectives, narrative flow, and existing content quality. Use when the user supplies new sources or asks to update an existing chapter with recent material. Do not use for a prose-only edit or a new chapter.
---

# Update Textbook Chapter

Read `references/workflow.md` in full, then execute it faithfully from the repository root.

Preserve scope analysis, source verification, surgical integration, growth thresholds, audit tables, exercise protection, and final checks. Apply only the Codex compatibility rules below.

## Codex compatibility

- Resolve every named rule to `.cursor/rules/<rule-name>.mdc`.
- Interpret every `AI-Learning-Gems/sources/` path as the repository's canonical top-level `sources/` directory.
- Use current Codex file, web, terminal, and collaboration tools for equivalent operations.
- Treat explicit subagent steps as authorization for those bounded delegations when subagents are available.
- Preserve the workflow's user-review stops for material scope expansion.
- Follow active sandbox, approval, safety, and user-authority requirements.
