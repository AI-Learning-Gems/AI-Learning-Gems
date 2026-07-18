---
name: write-textbook-chapter
description: Write a complete AI Learning Gems textbook-style Quarto chapter from an existing verified TEXTBOOK-PLAN.md, including rigorous notation, examples, visualizations, source audits, and final rendering checks. Use when the user provides a textbook plan and asks to write the chapter. Do not use for research-only planning, prose-only editing, or source updates.
---

# Write Textbook Chapter

Read `references/workflow.md` in full, then execute it faithfully from the repository root.

Preserve the complete chapter-writing pipeline, folder structure, section requirements, source-integrity protocol, pedagogy, visualizations, audits, word-depth requirements, autonomous execution, and verification. Apply only the Codex compatibility rules below.

## Codex compatibility

- Resolve every named rule to `.cursor/rules/<rule-name>.mdc`.
- Interpret every `AI-Learning-Gems/sources/` path as the repository's canonical top-level `sources/` directory, and interpret generic `AI-Learning-Gems/` search paths as the repository root.
- Invoke related workflows as `$research-textbook-chapter`, `$edit-textbook-chapter`, and `$exercises-for-textbook-chapter` instead of Cursor slash commands. Treat the workflow's `/editing-textbook-chapter` reference as `$edit-textbook-chapter`.
- Use current Codex file, web, terminal, image, and collaboration tools for equivalent operations.
- Treat explicit subagent steps as authorization for those bounded delegations when subagents are available.
- Follow active sandbox, approval, safety, and user-authority requirements.
