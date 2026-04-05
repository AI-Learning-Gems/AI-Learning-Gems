# Update Plan: Datasets & Benchmarks Chapter

**Date:** 2026-04-05  
**New sources provided:** 7 URLs (+ traced references in BetterBench / Wolfe post)

## Source Triage

### (A) REINFORCES — Integrated

| # | Source | Affects Section | What It Adds |
|---|--------|-----------------|--------------|
| 1 | [BetterBench / arXiv:2411.12990](https://arxiv.org/abs/2411.12990) | `_04`, `_05`, TEXTBOOK-PLAN | Formal benchmark definition (Raji et al.); 46-criteria lifecycle framework; living assessments at betterbench.stanford.edu |
| 2 | [Stanford HAI — What Makes a Good AI Benchmark?](https://hai.stanford.edu/policy/what-makes-a-good-ai-benchmark) + [PDF brief](https://hai.stanford.edu/assets/files/hai-policy-brief-what-makes-a-good-ai-benchmark.pdf) | `_04`, `_05` | Policy-facing summary aligned with BetterBench; five lifecycle stages; quality gaps design vs implementation |
| 3 | [NeurIPS 2026 — Call for Evaluations & Datasets](https://neurips.cc/Conferences/2026/CallForEvaluationsDatasets) | `_01`, `_02`, `_06` | Track rename; evaluation as first-class science; expanded scope; double-blind default; contribution-dependent code policy; Croissant RAI fields |
| 4 | [Cameron R. Wolfe — "The Anatomy of an LLM Benchmark"](https://cameronrwolfe.substack.com/p/llm-bench) | `_04` | Survey of sourcing, QC, metrics, and iterative refinement across MMLU family, GPQA, BIG-Bench, IFEval, etc.; IRT-based methods pointer |

### (B) EXTENDS — Integrated (within user-approved scope expansion)

| # | Source | Affects Section | What It Adds | Est. words |
|---|--------|-----------------|--------------|------------|
| 1 | NeurIPS 2026 E&D CFP | `_01`, `_02`, `_06` | Learning objectives + venue narrative: evaluation methodology, audits, negative results in scope | ~350 |
| 2 | BetterBench + HAI | `_04`, `_05` | "Benchmark quality" and policy stakes alongside Ofir Press three properties | ~400 |
| 3 | Wolfe Substack | `_04` | Practitioner-oriented map of benchmark design patterns | ~250 |

### (C) OUT-OF-SCOPE or UNSUITABLE — Not integrated into prose

| # | Source | Why |
|---|--------|-----|
| 1 | [Scaleway — Why AI Benchmarking Matters](https://www.scaleway.com/en/blog/why-ai-benchmarking-matters/) | `webpage_to_md.py` returned wrong article body (~600 chars; cookie wall / wrong `article` region). Do not cite until a clean extraction exists. |
| 2 | Papers linked only inside Wolfe footnotes (MMLU-Pro, BBEH, etc.) | Already covered indirectly; no new section. Optional future TEXTBOOK-PLAN pointers only. |

## Estimated Impact

- Sections modified: `_01`, `_02`, `_04`, `_05`, `_06`, `TEXTBOOK-PLAN.md`
- Estimated total new words: ~900–1,000
- New section files: none (scope expansion handled inside existing sections + plan)

---

## Update: 2026-04-05

### Sources Provided

1. [The Anatomy of an LLM Benchmark — Cameron R. Wolfe](https://cameronrwolfe.substack.com/p/llm-bench)
2. [What Makes a Good AI Benchmark? — Stanford HAI](https://hai.stanford.edu/policy/what-makes-a-good-ai-benchmark)
3. [BetterBench — arXiv:2411.12990](https://arxiv.org/abs/2411.12990)
4. [HAI policy brief PDF](https://hai.stanford.edu/assets/files/hai-policy-brief-what-makes-a-good-ai-benchmark.pdf)
5. [Scaleway blog](https://www.scaleway.com/en/blog/why-ai-benchmarking-matters/) (extraction failed — see above)
6. [Toloka — AI Benchmarks](https://toloka.ai/blog/ai-benchmarks-how-to-measure-real-progress-in-artificial-intelligence/)
7. [NeurIPS 2026 Call for Evaluations & Datasets](https://neurips.cc/Conferences/2026/CallForEvaluationsDatasets)

### Triage Results

- (A) Reinforces: BetterBench, HAI web+PDF, NeurIPS 2026 CFP, Wolfe (attributed survey framing)
- (B) Extends: NeurIPS E&D scope + evaluation-as-science; benchmark lifecycle / quality framework; Toloka criteria summary in `_05`
- (C) Out of scope: Scaleway (bad extract); deep download of every Wolfe-cited arXiv ID deferred

### Changes Made

- `TEXTBOOK-PLAN.md`: expanded learning goals; new source log rows; section plan notes for NeurIPS 2026 / BetterBench / Wolfe / Toloka
- `_01-introduction.qmd`: NeurIPS Evaluations & Datasets track (2026); learning objective; sources
- `_02-track-comparison.qmd`: NeurIPS 2026 blind-review policy nuance; primary contribution bullet for evaluation-science papers
- `_04-anatomy-benchmark-paper.qmd`: Raji et al. definition; BetterBench/HAI lifecycle; Wolfe survey subsection
- `_05-why-db-matters.qmd`: Policy / benchmark-quality stakes; Toloka criteria; sources
- `_06-how-to-write-db-paper.qmd`: NeurIPS 2026 checklist addendum; sources

### Notes

- **Toloka** industry blog integrated as a secondary guide; its criteria echo HAI/BetterBench themes (validity, reproducibility, documentation).
- For **Scaleway**, retry later with `authenticated_extract.py` and a custom `-s` selector, or manual copy, if that article is still needed.

### Word Count Impact

| Section | Change (approx.) |
|---------|------------------|
| `_01` | +200 |
| `_02` | +120 |
| `_04` | +450 |
| `_05` | +180 |
| `_06` | +150 |
