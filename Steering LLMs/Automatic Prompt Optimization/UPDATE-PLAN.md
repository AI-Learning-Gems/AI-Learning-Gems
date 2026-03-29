# Update Plan for "LLM Prompt Optimization — From Textual Gradients to Multi-Objective Evolution"

## Update: 2026-03-29

### Sources Provided

1. [Feedback Descent: Open-Ended Text Optimization via Pairwise Comparison](https://ai.stanford.edu/blog/feedback-descent/) / [arXiv 2511.07919](https://arxiv.org/abs/2511.07919) — Stanford (Lee & Finn), ICLR 2026 submission
2. [The Importance of Directional Feedback for LLM-based Optimizers](https://arxiv.org/abs/2405.16434) — Nie et al. (Stanford/Microsoft), 2024
3. [Automatic Prompt Optimization via Heuristic Search: A Survey](https://arxiv.org/abs/2502.18746) — Cui et al. (Intuit/Vanderbilt), 2025
4. [StraGo: Harnessing Strategic Guidance for Prompt Optimization](https://arxiv.org/abs/2410.08601) — Wu et al. (CAS/Microsoft), 2024
5. [PromptAgent: Strategic Planning with Language Models](https://arxiv.org/abs/2310.16427) — Wang et al. (ICLR 2024) — already in chapter
6. [A Survey of Automatic Prompt Engineering: An Optimization Perspective](https://arxiv.org/abs/2502.11560) — Li et al. (Tongji/ECNU), 2025
7. [Prompt Optimization with Human Feedback (APOHF)](https://arxiv.org/abs/2405.17346) — Lin et al. (NUS/MIT), 2024
8. [Can LLMs Learn from Previous Mistakes? (CoTErrorSet)](https://arxiv.org/abs/2403.20046) — Tong et al. (UCSD/USC), 2024
9. [MIPRO/MIPROv2](https://arxiv.org/abs/2406.11695) — Opsahl-Ong et al., 2024 — already partially covered

### Source Triage

#### (A) REINFORCES — Will be integrated (updates/strengthens existing content)

| # | Source | Affects Section | What It Adds |
|---|--------|-----------------|--------------|
| 1 | [PromptAgent](https://arxiv.org/abs/2310.16427) | _05-evolutionary | Already well-covered; no changes needed |
| 2 | [Heuristic Search Survey](https://arxiv.org/abs/2502.18746) | _02-problem, _99-closing | Second survey complementing existing Ramnath et al.; strengthens taxonomy discussion |
| 3 | [MIPRO/MIPROv2](https://arxiv.org/abs/2406.11695) | New pipeline section, _08-frameworks | Already partially covered; expanded in new pipeline section |

#### (B) EXTENDS — Will be integrated (adds meaningful new content within scope)

| # | Source | Affects Section | What It Adds | Estimated Words |
|---|--------|-----------------|--------------|-----------------|
| 1 | [Feedback Descent](https://arxiv.org/abs/2511.07919) | _04-textual-gradients, new pipeline section | Major new method: textual feedback via pairwise comparison; outperforms GEPA on some benchmarks | ~400 |
| 2 | [Directional Feedback](https://arxiv.org/abs/2405.16434) | _02-problem, _04-textual-gradients | Theoretical foundation: directional vs non-directional feedback taxonomy | ~200 |
| 3 | [Optimization Perspective Survey](https://arxiv.org/abs/2502.11560) | _02-problem | Unified optimization-theoretic formalization; 4-paradigm taxonomy | ~150 |
| 4 | [StraGo](https://arxiv.org/abs/2410.08601) | _05-evolutionary | Addresses "prompt drifting"; strategic guidance from both successes and failures | ~200 |
| 5 | [APOHF](https://arxiv.org/abs/2405.17346) | _03-generate-and-select | Preference-only optimization via dueling bandits; extends SPO's reference-free approach to human feedback | ~200 |
| 6 | [CoTErrorSet](https://arxiv.org/abs/2403.20046) | _05-evolutionary | Self-rethinking + mistake tuning; learning from errors to improve reasoning | ~150 |
| 7 | [Stanford Feedback Descent blog](https://ai.stanford.edu/blog/feedback-descent/) | _04-textual-gradients | Accessible intuition for the Feedback Descent method | ~50 (citations) |

#### (C) OUT-OF-SCOPE — Noted for future reference

| # | Source | Why Out of Scope | Note |
|---|--------|-------------------|------|
| — | None | All provided sources are relevant | — |

### SCOPE EXPANSION: New Section on Multi-Step Pipeline Optimization

**Approved by user in the original request:** "there needs to be a separate section which is just about multi-step prompt optimization."

**New section:** `_07-multi-step-pipeline-optimization.qmd` (inserted between multi-objective and applications)

**Content moves:**
- Multi-agent credit assignment subsection (MIPRO/DSPy, TRACE, HiveMind/Shapley, GEPA for agents) moves from `_07-applications.qmd` → new section
- DSPy/MIPROv2 pipeline optimization details referenced from `_08-frameworks.qmd` → expanded in new section

**Current applications section** (`_07-applications.qmd`) gets renumbered to `_08-applications.qmd` and keeps: LLM-as-a-Judge, vision-language, other domains.

**Current frameworks section** (`_08-frameworks-and-state-of-art.qmd`) gets renumbered to `_09-frameworks-and-state-of-art.qmd`.

### Estimated Impact

- **Sections to modify:** _01, _02, _03, _04, _05 (updates); _07 → _08, _08 → _09 (renumber + trim); _99 (update)
- **New section:** _07-multi-step-pipeline-optimization.qmd (~2000-2500 words)
- **Estimated total new words:** ~3500-4000
- **Sections at capacity:** _06-multi-objective (no changes needed)

### Changes Made (will be updated as implementation proceeds)

- `_07-multi-step-pipeline-optimization.qmd`: NEW — covers DSPy/MIPRO, Feedback Descent, TextGrad for pipelines, TRACE, GEPA for agents, credit assignment
- `_01-introduction.qmd`: Updated overview narrative, concept map, and sources
- `_02-problem.qmd`: Added optimization perspective survey, directional feedback, updated timeline
- `_03-generate-and-select.qmd`: Added APOHF alongside SPO
- `_04-textual-gradients.qmd`: Added Feedback Descent as key new method
- `_05-evolutionary.qmd`: Added StraGo and CoTErrorSet references
- `_07-applications.qmd` → `_08-applications.qmd`: Moved pipeline content to new section
- `_08-frameworks.qmd` → `_09-frameworks.qmd`: Updated comparison table
- `_99-closing.qmd`: Updated takeaways, concept map, resources
