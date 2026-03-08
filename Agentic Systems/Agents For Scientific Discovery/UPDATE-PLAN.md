# Update Plan for Agents For Scientific Discovery

## Update: 2026-03-08

### Sources Provided
1. [From Automation to Autonomy: Survey (arxiv-2505.13259)](https://arxiv.org/abs/2505.13259)
2. [DiscoveryBench (arxiv-2407.01725)](https://arxiv.org/abs/2407.01725)
3. [DiscoveryWorld (arxiv-2406.06769)](https://arxiv.org/abs/2406.06769)
4. [Automated Model Discovery via Multi-modal Pipeline (arxiv-2509.25946)](https://arxiv.org/abs/2509.25946)
5. [Automated Statistical Model Discovery / BoxLM (arxiv-2402.17879)](https://arxiv.org/abs/2402.17879)
6. [BoxingGym (arxiv-2501.01540)](https://arxiv.org/abs/2501.01540)
7. [Execution-Grounded Automated AI Research (arxiv-2601.14525)](https://arxiv.org/abs/2601.14525)
8. [Small LMs for Tool Calling (arxiv-2512.15943)](https://arxiv.org/abs/2512.15943)
9. [CL-bench (arxiv-2602.03587)](https://arxiv.org/abs/2602.03587)
10. [From Word Models to World Models (arxiv-2306.12672)](https://arxiv.org/abs/2306.12672)
11. [VIPER-R1: VLM Physics Formula Discovery (arxiv-2508.17380)](https://arxiv.org/abs/2508.17380)
12. [AutoSciLab (arxiv-2412.12347)](https://arxiv.org/abs/2412.12347)

### Triage Results

- **(A) Reinforces:**
  - arxiv-2505.13259 (Survey) → `_02-landscape.qmd` — Provides proper citation for Tool→Analyst→Scientist taxonomy (previously had placeholder URL)
  - arxiv-2407.01725 (DiscoveryBench) → `_07-benchmarks.qmd` — Full LaTeX source now available for deeper coverage of facet-based evaluation

- **(B) Extends:**
  - arxiv-2406.06769 (DiscoveryWorld) → `_07-benchmarks.qmd` — New benchmark: virtual environment for full-cycle discovery
  - arxiv-2402.17879 (BoxLM / Box's Loop) → `_05-data-analysis.qmd` — LLM as probabilistic modeler; new paradigm for automated statistics
  - arxiv-2501.01540 (BoxingGym) → `_07-benchmarks.qmd` — New benchmark for experimental design + model discovery
  - arxiv-2601.14525 (Execution-Grounded Research) → `_06-full-cycle-ai-scientist.qmd` — Evolutionary search vs RL for AI research; key negative result on RL diversity collapse
  - arxiv-2508.17380 (VIPER-R1) → `_05-data-analysis.qmd` — VLM-based equation discovery from visual data
  - arxiv-2412.12347 (AutoSciLab) → `_04-autonomous-experimentation.qmd` — Self-driving lab framework with real discovery
  - arxiv-2509.25946 (Automated Model Discovery) → `_05-data-analysis.qmd` — VLM-based model selection

- **(C) Out of scope:**
  - arxiv-2512.15943 (Small LMs for Tool Calling) — Enterprise tool optimization; not scientific discovery
  - arxiv-2602.03587 (CL-bench) — General context learning benchmark; not science-specific
  - arxiv-2306.12672 (Word Models to World Models) — Cognitive science theory; better fit for LLM Agentic Systems chapter

### Changes Made

- `_02-landscape.qmd`: Updated survey citation from placeholder URL to proper arxiv-2505.13259 reference
- `_04-autonomous-experimentation.qmd`: Added AutoSciLab (2412.12347) to self-driving labs subsection
- `_05-data-analysis.qmd`: Added Box's Loop/BoxLM (2402.17879), VIPER-R1 (2508.17380), and multi-modal model discovery (2509.25946) to equation discovery area; new subsection on automated statistical modeling
- `_06-full-cycle-ai-scientist.qmd`: Added execution-grounded research (2601.14525) covering evolutionary search vs RL findings
- `_07-benchmarks.qmd`: Added DiscoveryWorld (2406.06769) and BoxingGym (2501.01540); deepened DiscoveryBench analysis
- `_01-introduction.qmd`: Updated overview to reference new systems and benchmarks
- `_99-closing.qmd`: Updated curated resources list with new papers

### Word Count Impact
| Section | Before (est.) | After (est.) | Change |
|---------|---------------|--------------|--------|
| _02-landscape | ~2500 | ~2700 | +8% |
| _04-autonomous-experimentation | ~2500 | ~2900 | +16% |
| _05-data-analysis | ~2500 | ~3100 | +24% |
| _06-full-cycle-ai-scientist | ~2500 | ~2900 | +16% |
| _07-benchmarks | ~3000 | ~3600 | +20% |

### Notes
- The survey paper (2505.13259) was the source of the three-level taxonomy already used in the chapter. Now properly cited.
- The largest growth is in _05-data-analysis.qmd which gains coverage of automated statistical modeling (Box's Loop) and VLM-based equation discovery (VIPER-R1). Both are substantive additions that expand the section's coverage of how agents make sense of data.
- No new sections needed. All content fits within existing structure.
- No Math Background appendix needed — the existing chapter references the LLM and VLM Agentic Systems chapter for agent fundamentals.
