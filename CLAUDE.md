# AI Learning Gems

Quarto-based textbook site. Slash commands live in `.cursor/commands/` (symlinked to `.claude/commands/`) and drive the chapter workflows.

## Python environment

@.cursor/rules/python-env.mdc

## Project rules (read before the matching work)

Claude Code has no glob-scoped rule attachment, so apply Cursor's rules manually. **Before creating or editing any `.qmd` file or `TEXTBOOK-PLAN.md`, read the relevant rule files in full:**

| Rule file (in `.cursor/rules/`) | Read when |
|---|---|
| `quarto-conventions.mdc` | Any `.qmd` work — folder structure, index files, heading levels, includes, LaTeX |
| `writing-style.mdc` | Writing or editing chapter prose |
| `force-verbosity.mdc` | Writing chapter prose — verbose textbook style is required |
| `source-integrity.mdc` | Any chapter work — zero-world-knowledge and source verification rules |
| `source-management.mdc` | Downloading, naming, or citing sources |
| `web-source-fetching.mdc` | Fetching web sources — per-site strategies |
| `visualization-standards.mdc` | Creating diagrams, plots, or images |
| `exercise-syntax.mdc` | Writing or editing interactive exercises |
| `semantic-coloring.mdc` | Editing pass — semantic color-coding of concepts |
| `high-quality-blogs.mdc` | Research workflows — curated source registry |

These rules exist because of real past failures; do not skip them for "small" edits to chapter files.
