# TEXTBOOK-PLAN: Datasets & Benchmarks Papers — What They Are, Why They Matter, and How to Write Them

## Semantic color map (editing pass)

| Hex | Category | Example terms |
|-----|----------|---------------|
| `#4F46E5` | Paper type / track | Datasets & Benchmarks |
| `#047857` | Artifact contribution | data artifact, evaluation infrastructure |
| `#E11D48` | Primary contribution / review focus | main contribution, what reviewers optimize for |

Applied in `_01-introduction.qmd` (Chapter Introduction) and `_02-track-comparison.qmd` (core question). No coloring inside callouts, exercises, or `_99-closing.qmd`.

## User Query
> I want to understand the composition of Datasets and Benchmarks papers at NeurIPS, KDD and other conferences like ACL, EMNLP etc (which do not have D&B track but have Dataset papers). Download actual papers from this track and understand what specifically is the contribution and why it is important in terms of research. Look for blogs or opinions pieces from the best researchers as to why dataset contributions and benchmarks contributions are important for the research community in the current era of LLMs and agentic systems in 2023, 2024, 2025, 2026. I want one section which explains understand the kind of paper which goes into D&B track vs Research track vs System Demo track.

**Topic:** Understanding Datasets & Benchmarks (D&B) papers — what they are, what constitutes their contribution, why they are essential to ML/NLP research, and how they differ from Research track and System Demo track papers  
**Prior Knowledge:** The reader understands ML/NLP conferences, has read the companion chapter on System Demo papers, and is familiar with the general academic publishing landscape  
**Learning Goals:** Be able to (1) distinguish Datasets & Benchmarks / Evaluations & Datasets papers from Research and System Demo papers; (2) understand what constitutes a strong dataset or benchmark contribution, including how benchmark quality is defined across design, implementation, documentation, and maintenance; (3) understand the venue landscape and its evolution (including NeurIPS 2026's Evaluations & Datasets track and expanded scope for evaluation science); (4) connect benchmarks to policy and deployment settings where scores drive model selection and compliance narratives; (5) write a competitive submission that states evaluative claims, assumptions, and limitations clearly  
**Target Depth:** RESEARCHER  
**Output Folder:** `Research-Writing/Dataset and Benchmark Papers`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (40+ sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [NeurIPS 2025 D&B CFP](https://neurips.cc/Conferences/2025/CallForDatasetsBenchmarks) | [VENUE-CFP] | N/A | 2025 | 2026-03-05 | KEY: Single-blind, required Croissant metadata, required dataset hosting, scope includes datasets, benchmarks, data-centric AI tools, RL environments, competition analyses. Published in NeurIPS proceedings. |
| 2 | [KDD 2025 D&B CFP](https://kdd2025.kdd.org/call-for-datasets-and-benchmarks-track-papers/) | [VENUE-CFP] | N/A | 2025 | 2026-03-05 | KEY: First-ever KDD D&B track. 8-page content limit, single-blind, max 2 submissions per author. Scope: datasets, benchmarks, data generators, data-centric AI, competitions. Published in KDD proceedings. |
| 3 | [NeurIPS 2025 Blog: Raising the Bar](https://blog.neurips.cc/2025/03/10/neurips-datasets-benchmarks-raising-the-bar-for-dataset-submissions/) | [BLOG] | N/A | 2025-03-10 | 2026-03-05 | KEY: By Lora Aroyo, Francesco Locatello, Konstantina Palla, Meg Risdal, Joaquin Vanschoren. Introduces Croissant requirement, dataset hosting mandate, acknowledges challenge of reviewing datasets vs algorithms. |
| 4 | [NeurIPS 2021 D&B Track Announcement](https://neuripsconf.medium.com/announcing-the-neurips-2021-datasets-and-benchmarks-track-644e27c1e66c) | [BLOG] | N/A (Medium, 403) | 2021-04-07 | 2026-03-05 | KEY: Original announcement. Track created because dataset/benchmark work was "undervalued, unsupported, and taken for granted." Aimed to make data work "first-class work on par with algorithms work." 484 submissions, 174 accepted in 2021. |
| 5 | [NeurIPS 2022 D&B Track CFP](https://neurips.cc/Conferences/2022/CallForDatasetsBenchmarks) | [VENUE-CFP] | N/A | 2022 | 2026-03-05 | KEY: 447 submissions, 163 accepted (36.46%). Papers integrated into main NeurIPS proceedings (no longer separate). Outstanding papers: LAION-5B (dataset), MineDojo (benchmark). |
| 6 | [NeurIPS 2023 Awards](https://blog.neurips.cc/2023/12/11/announcing-the-neurips-2023-paper-awards/) | [VENUE-AWARDS] | N/A | 2023-12-11 | 2026-03-05 | KEY: D&B Best Papers: ClimSim (dataset, 5.7B pairs for climate emulation) and DecodingTrust (benchmark, GPT trustworthiness assessment). |
| 7 | [NeurIPS 2024 Awards](https://blog.neurips.cc/2024/12/10/announcing-the-neurips-2024-best-paper-awards/) | [VENUE-AWARDS] | N/A | 2024-12-10 | 2026-03-05 | KEY: D&B Best Paper: PRISM Alignment Dataset (75 countries, multicultural RLHF). 1,820 submissions to D&B track in 2024 (doubled from prior year). |
| 8 | [Ofir Press: How to Build Good Language Modeling Benchmarks](https://ofir.io/How-to-Build-Good-Language-Modeling-Benchmarks/) | [TUTORIAL] | N/A | 2024-08-07 | 2026-03-05 | KEY: Three properties: Natural (real-world questions), Automatically Evaluatable, Challenging (0.1-9% top accuracy at launch). Author of SWE-bench. Practical advice on benchmark design. |
| 9 | [Lora Aroyo NeurIPS 2023 Invited Talk: The Many Faces of Responsible AI](https://neurips.cc/virtual/2023/invited-talk/73987) | [ACADEMIC] | N/A | 2023 | 2026-03-05 | KEY: "Truth by disagreement" — annotator disagreement as valuable signal, not noise. Data quality for LLM safety. NeurIPS D&B Track Chair 2024-2025. |
| 10 | [DMLR: Journal of Data-centric Machine Learning Research](https://dmlr.ai/) | [ACADEMIC] | N/A | 2023 | 2026-03-05 | KEY: New JMLR journal launched Oct 2023, dedicated to data aspects of ML. Archival venue for dataset/benchmark papers. First volume 2024 includes "Building Better Datasets: Seven Recommendations." |
| 11 | [Andrew Ng: Data-Centric AI](https://www.youtube.com/watch?v=06-AZXmwHjo) | [TUTORIAL] | N/A | 2021 | 2026-03-05 | KEY: Advocates shifting from model-centric to data-centric AI. Quality > quantity. Iterative data improvement process. Foundational perspective for why D&B papers matter. |
| 12 | [Datasheets for Datasets (arXiv:1803.09010)](https://arxiv.org/abs/1803.09010) | [ACADEMIC] | N/A | 2018 | 2026-03-05 | KEY: By Timnit Gebru et al. Proposes standardized documentation for datasets. Widely cited framework, now referenced by NeurIPS D&B guidelines. |
| 13 | [Dataset Nutrition Label (arXiv:1805.03677)](https://arxiv.org/abs/1805.03677) | [ACADEMIC] | N/A | 2018 | 2026-03-05 | KEY: Diagnostic framework for dataset quality assessment. Referenced by NeurIPS 2025 guidelines. |
| 14 | [Data Statements for NLP](https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00041/43452/) | [ACADEMIC] | N/A | 2018 | 2026-03-05 | KEY: By Emily Bender & Batya Friedman. Schema for documenting NLP datasets focusing on speaker demographics and context. Referenced by NeurIPS D&B guidelines. |
| 15 | [ACL Rolling Review Guidelines](https://aclrollingreview.org/reviewertutorial) | [VENUE-GUIDE] | N/A | 2024 | 2026-03-05 | KEY: Reviews cover "artifact vs knowledge contributions." Dataset resource papers explicitly valued — "development of datasets is as important as modeling work." |
| 16 | [Croissant: ML Commons Dataset Format](https://mlcommons.org/working-groups/data/croissant/) | [TOOL-DOC] | N/A | 2024 | 2026-03-05 | KEY: Machine-readable metadata format for ML datasets. Required by NeurIPS 2025. Supported by HuggingFace, Kaggle, OpenML, Dataverse. |
| 17 | [LAION-5B (NeurIPS 2022 D&B Best Paper)](https://arxiv.org/abs/2210.08402) | [ACADEMIC] | N/A | 2022 | 2026-03-05 | KEY: 5.85B CLIP-filtered image-text pairs. Exemplary large-scale dataset contribution. Later controversially removed due to CSAM findings, raising questions about dataset governance. |
| 18 | [MineDojo (NeurIPS 2022 D&B Best Paper)](https://arxiv.org/abs/2206.08853) | [ACADEMIC] | N/A | 2022 | 2026-03-05 | KEY: Open-ended embodied AI benchmark using Minecraft. Simulation suite with internet-scale knowledge base. Exemplary benchmark contribution. |
| 19 | [ClimSim (NeurIPS 2023 D&B Best Paper)](https://arxiv.org/abs/2306.08754) | [ACADEMIC] | N/A | 2023 | 2026-03-05 | KEY: 5.7B multivariate pairs for hybrid physics-ML climate emulation. Largest dataset for hybrid ML-physics. Exemplary cross-disciplinary dataset. |
| 20 | [DecodingTrust (NeurIPS 2023 D&B Best Paper)](https://arxiv.org/abs/2306.11698) | [ACADEMIC] | N/A | 2023 | 2026-03-05 | KEY: Comprehensive GPT trustworthiness benchmark. Multiple safety dimensions: toxicity, bias, privacy, robustness. Exemplary LLM evaluation benchmark. |
| 21 | [PRISM Alignment Dataset (NeurIPS 2024 D&B Best Paper)](https://arxiv.org/abs/2404.16019) | [ACADEMIC] | N/A | 2024 | 2026-03-05 | KEY: 75-country participatory dataset for multicultural LLM alignment. Reveals subjectivity in RLHF. Exemplary human-centric dataset. |
| 22 | [SWE-bench (ICLR 2024)](https://arxiv.org/abs/2310.06770) | [ACADEMIC] | N/A | 2023 | 2026-03-05 | KEY: Software engineering benchmark from real GitHub issues. Exemplary agent benchmark — "natural" task design philosophy (Ofir Press). Top model at launch: 1.96%. |
| 23 | [GAIA: General AI Assistants Benchmark](https://arxiv.org/abs/2311.12983) | [ACADEMIC] | N/A | 2023 | 2026-03-05 | KEY: Benchmark for general AI assistants. Humans 92% vs GPT-4 with plugins 15%. Three difficulty levels testing tool use, web browsing, multi-step reasoning. |
| 24 | [WebArena (ICLR 2024)](https://arxiv.org/abs/2307.13854) | [ACADEMIC] | N/A | 2023 | 2026-03-05 | KEY: Realistic web environment benchmark for autonomous agents. GPT-4 achieved ~14% vs humans ~78%. Exemplary environment-as-benchmark. |
| 25 | [LiveBench](https://arxiv.org/abs/2406.19314) | [ACADEMIC] | N/A | 2024-06 | 2026-03-05 | KEY: Contamination-resistant LLM benchmark with frequently updated questions. Addresses benchmark leaking/contamination problem. |
| 26 | [ACL 2025 Demo CFP](https://2025.aclweb.org/calls/system_demonstration/) | [VENUE-CFP] | N/A | 2025 | 2026-03-05 | CONTEXT: System Demo track requirements — 6 pages, single-blind, mandatory video. Used for cross-track comparison. |
| 27 | [EMNLP 2025 CFP](https://2025.emnlp.org/calls/main_conference_papers/) | [VENUE-CFP] | N/A | 2025 | 2026-03-05 | CONTEXT: Main track includes resource/dataset papers as valid submission type within main track, not a separate track. Responsible NLP Checklist. |
| 28 | [Building Better Datasets: Seven Recommendations (DMLR 2024)](https://dmlr.ai/) | [ACADEMIC] | N/A | 2024 | 2026-03-05 | KEY: Evidence-based recommendations for dataset creators. Published in inaugural DMLR volume. |
| 29 | [Benchmark Data Contamination survey (arXiv:2406.04244)](https://arxiv.org/abs/2406.04244) | [ACADEMIC] | N/A | 2024 | 2026-03-05 | KEY: Comprehensive survey of benchmark contamination in LLMs. Documents mechanisms of data leakage and proposed solutions. |
| 30 | [Dan Jurafsky: Writing Advice for NLP Papers](https://web.stanford.edu/~jurafsky/pubs/writing-advice.pdf) | [TUTORIAL] | N/A | Various | 2026-03-05 | CONTEXT: General NLP paper writing advice. Applicable across all tracks. |
| 31 | [NeurIPS 2024 D&B Track accepted papers (OpenReview)](https://openreview.net/group?id=NeurIPS.cc/2024/Datasets_and_Benchmarks_Track) | [PROCEEDINGS] | N/A | 2024 | 2026-03-05 | KEY: Includes LINGOLY, CVQA, DevBench, MedCalc-Bench, ChaosBench, RedPajama, CTIBench, TRACE. Shows diversity of accepted topics. |
| 32 | [NeurIPS 2021 D&B accepted papers](https://proceedings.neurips.cc/paper_files/paper/2021) | [PROCEEDINGS] | N/A | 2021 | 2026-03-05 | KEY: 174 accepted from 484 submissions. Inaugural year. Covered CV, NLP, RL, multimodal. |
| 33 | [ACL ARR Reviewer Tutorial](https://aclrollingreview.org/reviewertutorial) | [VENUE-GUIDE] | N/A | 2024 | 2026-03-05 | KEY: Explains artifact vs knowledge contribution distinction. Datasets treated as artifact contributions with different evaluation criteria than research papers. |
| 34 | [Existing chapter: System Demo Papers](file:///Users/adivekar/workplace/AI-Learning-Gems/Research-Writing/System Demo Papers/System Demo Papers/TEXTBOOK-PLAN.md) | [COMPANION] | Local | 2026 | 2026-03-05 | KEY: Companion chapter covers system demo paper structure, value proposition framing, evaluation strategies. Reader has already read this. |
| 35 | [BetterBench (Reuel et al., arXiv:2411.12990)](https://arxiv.org/abs/2411.12990) | [ACADEMIC] | `sources/arxiv-2411.12990/` | 2024 | 2026-04-05 | KEY: 46 lifecycle criteria; scores 24 benchmarks; checklist + betterbench.stanford.edu; adopts Raji et al. benchmark definition. |
| 36 | [Stanford HAI — What Makes a Good AI Benchmark?](https://hai.stanford.edu/policy/what-makes-a-good-ai-benchmark) | [POLICY] | `sources/hai.stanford.edu/policy/what-makes-a-good-ai-benchmark/content.md` | 2024-12 | 2026-04-05 | Policy brief summarizing BetterBench; five lifecycle stages; design vs implementation quality gap. |
| 37 | [HAI policy brief PDF](https://hai.stanford.edu/assets/files/hai-policy-brief-what-makes-a-good-ai-benchmark.pdf) | [POLICY] | `sources/hai.stanford.edu/assets/files/hai-policy-brief-what-makes-a-good-ai-benchmark.txt` | 2024-12 | 2026-04-05 | Full-text extract (pdftotext) of brief aligned with #36. |
| 38 | [NeurIPS 2026 — Call for Evaluations & Datasets](https://neurips.cc/Conferences/2026/CallForEvaluationsDatasets) | [VENUE-CFP] | `sources/neurips.cc/Conferences/2026/CallForEvaluationsDatasets/content.md` | 2026 | 2026-04-05 | Track renamed from D&B; evaluation as object of study; double-blind default; Croissant RAI fields; contribution-dependent code policy. |
| 39 | [Cameron R. Wolfe — "The Anatomy of an LLM Benchmark"](https://cameronrwolfe.substack.com/p/llm-bench) | [TUTORIAL] | `sources/cameronrwolfe.substack.com/p/llm-bench/content.md` | 2026-03-30 | 2026-04-05 | Survey of popular LLM benchmarks: sourcing, QC, metrics, saturation-driven refinements; IRT / fluid benchmarking pointers. |
| 40 | [Toloka — AI Benchmarks: measuring progress](https://toloka.ai/blog/ai-benchmarks-how-to-measure-real-progress-in-artificial-intelligence/) | [TUTORIAL] | `sources/toloka.ai/blog/ai-benchmarks-how-to-measure-real-progress-in-artificial-intelligence/ai-benchmarks-how-to-measure-real-progress-in-artificial-intelligence.md` | 2025-09-26 | 2026-04-05 | Practitioner framing: exams analogy, validity/contamination, robustness, reproducibility, documentation. |
| 41 | [Scaleway — Why AI Benchmarking Matters](https://www.scaleway.com/en/blog/why-ai-benchmarking-matters/) | [BLOG] | (extraction failed) | — | 2026-04-05 | **NOT USED:** `webpage_to_md.py` captured wrong article stub only; retry later with JS extraction if needed. |
| 42 | [NeurIPS 2023 conference fact sheet (PDF)](https://media.neurips.cc/Conferences/NeurIPS2023/NeurIPS2023-Fact_Sheet.pdf) | [VENUE-DATA] | `sources/neurips.cc/Conferences/NeurIPS2023/NeurIPS2023-Fact_Sheet.txt` | 2023 | 2026-04-05 | D&B: 987 submissions in 2023; prior year (2022) D&B submissions stated as 487; 32.6% D&B acceptance rate. |
| 43 | [NeurIPS 2024 conference fact sheet (PDF)](https://media.neurips.cc/Conferences/NeurIPS2024/NeurIPS2024-Fact_Sheet.pdf) | [VENUE-DATA] | `sources/neurips.cc/Conferences/NeurIPS2024/NeurIPS2024-Fact_Sheet.txt` | 2024 | 2026-04-05 | D&B: 1,820 submissions in 2024; 25.3% D&B acceptance rate. |

:::

<!-- END-PART-1 -->

---

## Chapter Overview

**Total sections:** 6 (plus introduction/closing)
**Estimated total length:** 10,000–14,000 words
**Running example:** A hypothetical researcher named **Dr. Mei Chen**, a postdoc at a top-20 CS department, who has built two things during her research on multilingual LLM evaluation: (1) a large-scale benchmark of 15,000 hand-annotated multilingual reasoning questions across 40 languages, and (2) a novel scoring algorithm that correlates better with human judgments than existing metrics. She needs to decide: should the benchmark go to the NeurIPS D&B track while the algorithm goes to the main research track? Or should she combine them into one paper? What if she also built a web interface for crowd-sourcing annotations — does that make it a system demo paper? Throughout the chapter, we follow her journey of understanding what each track values, why her benchmark contribution is separately publishable, and how to frame it for maximum impact.

### Hook & Running Example Design

Dr. Mei Chen stares at two browser tabs. The first shows the NeurIPS 2025 main track Call for Papers, headlined by calls for "new algorithms, theoretical foundations, and novel methods." The second shows the NeurIPS 2025 Datasets & Benchmarks track Call for Papers, asking for "high-quality publications on highly valuable machine learning datasets and benchmarks." She has both: a dataset and an algorithm. Her labmate tells her "just put the benchmark in the appendix," while her advisor suggests "the benchmark alone is a paper." Who is right?

This tension — the question of when data work deserves its own paper, and what that paper should look like — is at the heart of a profound shift in how the ML community values research contributions. For decades, the academic incentive structure explicitly rewarded algorithmic novelty: a new model, a new loss function, a new training procedure. Datasets were appendices. Benchmarks were footnotes. When NeurIPS launched its Datasets & Benchmarks track in 2021, the announcement blog post was blunt: work on datasets and benchmarks had been "undervalued, unsupported, and taken for granted" despite being "crucial for the development and continuous improvement of machine learning methods." The track was created to make data work "first-class work on par with algorithms work."

The track's growth validates that vision. Submissions grew from 484 in 2021 to 1,820 in 2024 — a nearly 4× increase in three years. By 2025, KDD has launched its own D&B track, DMLR (a new JMLR journal) was created specifically for data-centric ML research, and conferences like ACL and EMNLP explicitly state in their reviewer guidelines that "development of datasets is as important as modeling work." The era of LLMs and agentic systems has made this even more urgent: as models grow ever more capable, the bottleneck shifts from model architecture to evaluation infrastructure. How do you know GPT-5 is better than GPT-4? You need benchmarks. How do you know your agent can actually browse the web? You need WebArena. How do you know your LLM isn't memorizing the test set? You need contamination-resistant benchmarks like LiveBench and Humanity's Last Exam.

This chapter guides the reader through the full landscape of D&B papers: what they are, how they differ from Research papers and System Demo papers, what makes a strong contribution, and how to write one. Each section revisits Dr. Chen's dilemma to provide concrete, grounded examples. By the end, the reader will understand why her benchmark is indeed a separate paper, what it needs to contain, and how to frame it for the NeurIPS D&B track.

**Hook Image:** The NeurIPS D&B submission growth chart (484 → 447 → growing → 1820 submissions from 2021-2024) is the ideal hook image, visually conveying the explosive growth that validates the track's importance. This can be created as a custom visualization since no single canonical image exists, or alternatively, the chapter can reference the "Raising the Bar" blog post's framing.

<!-- END-PART-2 -->

---

## Section Plan

### Section 1: What Is a Datasets & Benchmarks Paper? {#sec-what-is-db-paper}

**File:** `_01-introduction.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should understand what D&B papers are, why they exist as a distinct paper type, and the landscape of venues that accept them.
**Running example application:** Dr. Chen learns that her multilingual reasoning benchmark qualifies as a standalone D&B paper because the contribution is the *dataset and evaluation infrastructure itself*, not the scoring algorithm. She surveys the venue landscape to decide where to submit.

**Sources needed:**

| Source | Type | Specific Sections/Pages | What to Extract |
|--------|------|------------------------|-----------------|
| NeurIPS 2021 D&B Announcement | [BLOG] | Full post | Why the track was created, original motivation quotes |
| NeurIPS 2025 D&B CFP | [VENUE-CFP] | Scope section | What qualifies as a D&B submission |
| NeurIPS 2025 Blog: Raising the Bar | [BLOG] | "Challenge of Assessing" section | How dataset papers differ from algorithm papers in review |
| KDD 2025 D&B CFP | [VENUE-CFP] | Objective + Scope sections | KDD's framing of D&B contributions |
| ACL ARR Reviewer Tutorial | [VENUE-GUIDE] | Contribution types | "Artifact vs knowledge contributions" |
| NeurIPS 2022/2023/2024 Awards | [VENUE-AWARDS] | D&B best papers | Concrete examples of what wins |
| DMLR Journal | [ACADEMIC] | About/Scope | Journal-level venue for D&B work |
| NeurIPS 2026 Evaluations & Datasets CFP | [VENUE-CFP] | Scope + review policy | Track rename; evaluation as science; double-blind default; expanded non-dataset submissions |

**Content outline:**
1. **The Birth of a Track** — Why NeurIPS created the D&B track in 2021. The problem: dataset work was "undervalued, unsupported, and taken for granted." Researchers couldn't find appropriate venues. Algorithm paper reviews were a poor fit for data contributions. Opening with the 2021 announcement's key quotes.
2. **What Counts as a D&B Paper?** — The NeurIPS 2025 scope breakdown: new datasets, benchmarks, data generators/RL environments, data-centric AI tools, data curation practices, dataset audits, competition analyses. KDD's parallel scope. The key insight: the *primary contribution is the data artifact or evaluation infrastructure*, not a new algorithm.
3. **The Venue Landscape** — Where to publish D&B work in 2025–2026:
   - **Dedicated tracks:** NeurIPS **Evaluations & Datasets** (2026 onward; formerly Datasets & Benchmarks), KDD D&B (since 2025)
   - **Within-track resource papers:** ACL, EMNLP, NAACL accept dataset papers in their main track
   - **Journals:** DMLR (JMLR family, launched 2023), TMLR
   - **Workshops:** DMLR@ICLR, Data-centric AI workshops
4. **Growth and Impact** — Submission growth data: 484 (2021) → 447 (2022) → growing (2023) → 1,820 (2024). Acceptance rates (~36% in 2022). Integration into main proceedings (since 2022). Best paper examples: LAION-5B, MineDojo, ClimSim, DecodingTrust, PRISM.
5. **Who Writes D&B Papers?** — Not just "data people." LAION-5B enabled Stable Diffusion. SWE-bench was written by Ofir Press (who also builds models). ClimSim was climate scientists + ML researchers. The D&B track attracts interdisciplinary teams.

**Key equations:** None (conceptual section)
**Visualizations:** Bar chart of NeurIPS D&B submissions by year (2021-2024); table of venues that accept D&B work with their requirements; timeline of key milestones (2018 Datasheets for Datasets → 2021 NeurIPS D&B → 2023 DMLR → 2025 KDD D&B).
**Source images to embed:** None (custom visualizations)
**Self-explanation prompts:**
- "What is the primary contribution of a D&B paper? How does this differ from a research paper that happens to introduce a new dataset?"
- "If a researcher introduces a new dataset as part of a main-track research paper, does that count as a D&B contribution? When would splitting it into a separate D&B paper be more appropriate?"

**[UPDATE 2026-04-05]** NeurIPS 2026 rebrands and broadens the track (Evaluations & Datasets). Chapter introduction now states that *evaluation* (protocols, audits, analyses of benchmarks) is first-class alongside datasets. Source: NeurIPS 2026 CFP (#38).

<!-- END-SECTION-1 -->

---

### Section 2: D&B Track vs. Research Track vs. System Demo Track {#sec-track-comparison}

**File:** `_02-track-comparison.qmd`
**Estimated length:** 2,000–2,500 words
**Goal:** The reader should clearly understand the fundamental differences between these three track types — what each values, how review criteria differ, and how to decide which track is appropriate for their work. This is the section the user specifically requested.
**Running example application:** Dr. Chen's work has three components: (1) a multilingual benchmark dataset, (2) a novel scoring algorithm, and (3) a web-based annotation tool (she built a Gradio interface for crowd-sourcing). We show how each component maps to a different track, and why combining all three into one paper would be suboptimal.

**Sources needed:**

| Source | Type | Specific Sections/Pages | What to Extract |
|--------|------|------------------------|-----------------|
| NeurIPS 2025 D&B CFP | [VENUE-CFP] | Review criteria, scope | D&B review criteria vs main track |
| NeurIPS 2025 Main Track CFP | [VENUE-CFP] | Review criteria, scope | What the research track values |
| KDD 2025 D&B vs Research vs ADS | [VENUE-CFP] | All three track CFPs | Three-way comparison at KDD |
| ACL 2025 Demo CFP | [VENUE-CFP] | Review criteria | Demo track expectations |
| ACL ARR Reviewer Guidelines | [VENUE-GUIDE] | Contribution types | Artifact vs knowledge distinction |
| Existing System Demo TEXTBOOK-PLAN | [COMPANION] | Section 1 | Recap of demo paper characteristics |

**Content outline:**
1. **The Core Question: What Is Your Primary Contribution?** — The single most important question: "Is the main value of your work (a) a new algorithm/method/theory (→ Research), (b) a new dataset, benchmark, or data tool (→ D&B), or (c) a working software system that others can use (→ System Demo)?" This is the litmus test. Many papers contain elements of all three, but the *primary* contribution determines the right track.

2. **The Three Tracks Compared** — A comprehensive comparison table covering:

   | Dimension | Research Track | D&B Track | System Demo Track |
   |-----------|---------------|-----------|-------------------|
   | **Primary contribution** | Novel algorithm, method, theory, or empirical finding | Novel dataset, benchmark, evaluation tool, or data practice | Working software system with usability value |
   | **Review criteria** | Novelty, significance, correctness, clarity | Quality, accessibility, documentation, impact, ethics | Relevance, usability, completeness, evaluation |
   | **Novelty expectation** | Algorithmic/theoretical novelty required | Data novelty OR methodological novelty in curation/evaluation | Novelty in system design, integration, or utility |
   | **Evaluation** | SOTA results on existing benchmarks | Demonstrating dataset quality, baseline experiments on new benchmark, or tool utility | User studies, adoption metrics, case studies |
   | **Blind review** | Double-blind (NeurIPS, ACL/EMNLP) | Single-blind (NeurIPS, KDD) | Single-blind (*CL venues) |
   | **Page limits** | 8-9 pages (NeurIPS, ACL) | 9 pages (NeurIPS, same as main), 8 pages (KDD) | 6 pages (*CL venues) |
   | **Required artifacts** | Code (encouraged), reproducibility checklist | Dataset hosted + accessible, code, Croissant metadata (NeurIPS 2025) | Demo video (2-2.5 min), live demo URL |
   | **Key question reviewers ask** | "Does this advance the state of the art?" | "Will this dataset/benchmark be useful to the community?" | "Does this system work and is it usable?" |

3. **The Artifact vs. Knowledge Distinction** — ACL's reviewer guidelines explicitly distinguish between "artifact contributions" (systems, datasets, tools — things you can download and use) and "knowledge contributions" (findings, theories, algorithms — things you learn from reading). D&B papers and System Demo papers are both artifact contributions, but they differ in what the artifact is: D&B papers contribute *data and evaluation infrastructure*, while System Demo papers contribute *software systems*.

4. **Where Papers Fall: Real Examples** — Worked examples of actual papers and which track they belong to:
   - **LAION-5B** → D&B (the contribution is the 5.85B image-text pair dataset itself, not a new model)
   - **PRISM Alignment Dataset** → D&B (the contribution is the 75-country participatory annotation dataset for studying LLM alignment, not a new alignment algorithm)
   - **SWE-bench** → D&B/Research hybrid (was published at ICLR main track, but could have been D&B; the contribution is the benchmark + initial SWE-agent results)
   - **AutoGen Studio** → System Demo (the contribution is the no-code multi-agent tool with its UI, not the underlying multi-agent algorithm)
   - **Fabricator** → System Demo (the contribution is the tooling for dataset generation, not the generated datasets themselves)
   - **GPT-4** technical report → Research (the contribution is the model itself and its capabilities, even though it introduces benchmarks)
   - **DSPy** → Research (the contribution is the declarative programming paradigm for LLM calls, even though it includes a framework)
   
5. **The Gray Zones: When Your Paper Could Go to Multiple Tracks** — Common dilemmas:
   - "I built a new model AND a new benchmark to evaluate it" → The model typically goes to Research, the benchmark goes to D&B. If the benchmark is substantial enough, split into two papers. If the benchmark is small and designed purely to evaluate your method, keep it in the Research paper.
   - "I built a data collection tool AND used it to create a dataset" → If the tool is the main contribution (designed for reuse by others), consider System Demo. If the dataset is the main contribution (the tool was just means to an end), go D&B.
   - "My dataset paper includes a novel algorithm for data cleaning" → If the algorithm is generalizable, consider splitting. If it's specific to this dataset, keep it in the D&B paper as a methodological contribution.
   - The ACL/EMNLP case: no separate D&B track, so dataset papers compete in the main track. Reviewer guidelines explicitly state datasets should not be penalized for not beating SOTA.

6. **Dr. Chen's Decision** — Worked walkthrough: Dr. Chen's benchmark (→ NeurIPS D&B track), her scoring algorithm (→ NeurIPS main track or EMNLP main track), her Gradio annotation tool (→ ACL System Demo, if it's general enough). She learns that splitting her work into targeted submissions to appropriate tracks actually *increases* her publication count AND impact, because each paper will be reviewed by the right audience.

**Key equations:** None
**Visualizations:** Three-way Venn diagram (or D2 diagram) showing the overlaps and distinctions between tracks; decision flowchart ("Is your primary contribution..."); comparison table (see above); concrete example mapping table.
**Source images to embed:** None (custom diagrams)
**Self-explanation prompts:**
- "Take a recent paper from your field. Could it have been submitted to a different track? Would it have been strengthened or weakened by doing so?"
- "If a reviewer asks 'Where is the algorithmic novelty?' on a D&B paper, what demonstrates a misunderstanding of the track? How should the authors respond?"

**[UPDATE 2026-04-05]** NeurIPS 2026 renames the track to **Evaluations & Datasets** and changes default review mode to **double-blind**, with optional single-blind for dataset-centered work. The comparison table in the chapter should be read alongside the 2026 CFP for blind-review nuance. Sources: #38 in Source Processing Log.

<!-- END-SECTION-2 -->

---

### Section 3: Anatomy of a Dataset Paper {#sec-anatomy-dataset}

**File:** `_03-anatomy-dataset-paper.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should understand the canonical structure of a strong dataset paper, what each section must contain, and what differentiates a good dataset paper from a mediocre one.
**Running example application:** Dr. Chen outlines her multilingual reasoning benchmark paper, deciding what goes in each section and how to allocate pages.

**Sources needed:**

| Source | Type | Specific Sections/Pages | What to Extract |
|--------|------|------------------------|-----------------|
| PRISM Alignment Dataset | [ACADEMIC] | Full paper structure | Section-by-section analysis |
| ClimSim | [ACADEMIC] | Full paper structure | Cross-disciplinary dataset structure |
| LAION-5B | [ACADEMIC] | Full paper structure | Large-scale dataset documentation |
| NeurIPS 2025 Blog: Raising the Bar | [BLOG] | Documentation frameworks | Datasheets, nutrition labels, data statements |
| Datasheets for Datasets | [ACADEMIC] | Full framework | Questions a dataset paper should answer |
| Building Better Datasets (DMLR 2024) | [ACADEMIC] | Seven recommendations | Best practices for dataset creators |
| NeurIPS 2025 D&B CFP | [VENUE-CFP] | Hosting + metadata requirements | Croissant, hosting mandates |

**Content outline:**
1. **The Canonical Dataset Paper Structure** — Based on analysis of best-paper winners and accepted papers, the dominant structure for dataset papers:
   - **Introduction** (~1.5 pages): Motivation → gap → contribution → why is this dataset needed? Distinguish from "I happened to collect some data" — strong dataset papers articulate a clear research gap that the dataset fills.
   - **Related Work / Existing Datasets** (~0.5-1 page): How does this dataset compare to existing alternatives? What does it offer that others don't? This is where you position your dataset in the landscape.
   - **Dataset / Data Collection** (~2-3 pages): The heart of the paper. How was data collected? Annotation process? Quality control? Statistics? This must be meticulously documented.
   - **Baseline Experiments** (~1-1.5 pages): Run existing methods on your dataset to establish baselines. This demonstrates the dataset's utility and difficulty.
   - **Analysis / Insights** (~0.5-1 page): What do the baseline results reveal? What's surprising? What research directions does this dataset open?
   - **Limitations + Ethics** (~0.5 page, not against page limit): Candid discussion of biases, gaps, privacy, consent.
   - **Conclusion + Data Availability** (~0.25 page): Summary + permanent hosting link.

2. **Documentation Requirements** — The NeurIPS 2025 "raising the bar" standards:
   - **Datasheets for Datasets** (Gebru et al., 2018): Motivation, composition, collection process, uses, distribution, maintenance
   - **Croissant metadata** (required since 2024): Machine-readable dataset description for interoperability
   - **Dataset hosting**: Must be on Hugging Face, Kaggle, OpenML, Dataverse, or equivalent
   - **Data statements** (Bender & Friedman, 2018): Speaker demographics, annotation demographics, language variety, etc.
   - Show how PRISM filled out these requirements: participatory design, 75 countries, demographic documentation

3. **What Makes a Dataset Contribution Strong** — Five pillars:
   - **Scale or novelty**: Either significantly larger than existing alternatives (LAION-5B: 5.85B pairs) or covering an underserved domain (ClimSim: first large-scale hybrid physics-ML climate dataset)
   - **Quality**: Rigorous annotation process, inter-annotator agreement metrics, quality control pipelines
   - **Documentation**: Comprehensive metadata, clear data cards, transparent collection methodology
   - **Accessibility**: Easy to download, well-organized, clear format, code for loading
   - **Demonstrated utility**: Baseline experiments show the dataset enables meaningful research

4. **Common Weaknesses in Dataset Papers** — Based on reviewer feedback patterns:
   - "The dataset is just a recombination of existing datasets without clear added value"
   - "Annotation quality is unclear — no inter-annotator agreement reported"
   - "The paper lacks baseline experiments"
   - "The dataset is not accessible (requires emailing the authors)"
   - "Ethical considerations are superficial"

5. **Worked Example: Dr. Chen's Dataset Paper Outline** — Concrete page allocation for her 15,000-question multilingual reasoning benchmark, showing how she documents the crowd-sourcing process, quality control, and baseline experiments.

**Key equations:** None (but inter-annotator agreement metrics like Cohen's κ, Fleiss' κ, Krippendorff's α should be mentioned)
**Visualizations:** Page budget template for a dataset paper; comparison table of documentation frameworks (Datasheets vs Data Statements vs Croissant); example data card.
**Source images to embed:** None (custom diagrams)
**Self-explanation prompts:**
- "If you had to convince a skeptical reviewer that your dataset is more than 'just data,' what three things would you emphasize?"
- "What is the difference between documenting a dataset for reproducibility vs. documenting it for responsible use? Which sections of the paper address each?"

<!-- END-SECTION-3 -->

---

### Section 4: Anatomy of a Benchmark Paper {#sec-anatomy-benchmark}

**File:** `_04-anatomy-benchmark-paper.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should understand how benchmark papers differ from dataset papers, what makes a benchmark contribution strong, and the current challenges around benchmark design in the LLM era.
**Running example application:** Dr. Chen's multilingual reasoning benchmark needs a clear evaluation framework. She designs it following Ofir Press's three principles: natural, automatically evaluatable, and challenging.

**Sources needed:**

| Source | Type | Specific Sections/Pages | What to Extract |
|--------|------|------------------------|-----------------|
| Ofir Press: How to Build Good Benchmarks | [TUTORIAL] | Full blog post | Three properties: natural, auto-evaluatable, challenging |
| DecodingTrust | [ACADEMIC] | Full paper structure | Multi-dimensional benchmark design |
| SWE-bench | [ACADEMIC] | Paper structure | Real-world task design, evaluation framework |
| GAIA | [ACADEMIC] | Paper structure | Multi-level difficulty design |
| WebArena | [ACADEMIC] | Paper structure | Environment-as-benchmark design |
| LiveBench | [ACADEMIC] | Paper structure | Contamination-resistant benchmark design |
| Benchmark contamination survey | [ACADEMIC] | Overview | Contamination mechanisms and mitigations |
| MineDojo | [ACADEMIC] | Paper structure | RL environment/benchmark design |
| BetterBench (arXiv:2411.12990) | [ACADEMIC] | Intro + lifecycle fig | Raji et al. definition; 46 criteria; betterbench.stanford.edu |
| Stanford HAI policy brief | [POLICY] | Key takeaways | Five lifecycle stages; design vs implementation gap |
| Cameron R. Wolfe — LLM benchmark anatomy | [TUTORIAL] | Full post | Case studies: MMLU-Pro, GPQA, BIG-Bench/BBEH, IFEval; IRT pointers |

**Content outline:**
1. **How Benchmark Papers Differ from Dataset Papers** — A benchmark is more than a dataset: it includes (1) a task definition, (2) an evaluation metric, (3) a test set with ground truth, and (4) a reporting framework. A dataset paper says "here is data"; a benchmark paper says "here is data + here is how you compete on it." Many papers are hybrids (e.g., PRISM is a dataset, DecodingTrust is a benchmark), but the emphasis differs.

2. **The Three Properties of a Good Benchmark (Ofir Press)** — Deep dive into each:
   - **Natural:** Questions/tasks should reflect real-world needs. SWE-bench: real GitHub bugs. GAIA: real-world questions requiring tool use. Bad: contrived IQ-test-like patterns. The "usefulness criterion": would a system that solved this benchmark be useful to humans?
   - **Automatically Evaluatable:** Must have objective, automatable scoring. Unit tests (SWE-bench, HumanEval), exact match, functional correctness, retrieval metrics. Avoid LLM-as-judge for the core metric. Summarization is hard because evaluation is hard.
   - **Challenging:** Top model accuracy at launch should be 0.1-9% (updated Jan 2025). SWE-bench launched at 1.96%. Building benchmarks that will still challenge models 6-12 months from now. Filter out easy examples using a strong baseline. Beware the intimidation effect: if accuracy is too low, researchers may not engage.

3. **Benchmark Paper Structure** — The canonical structure differs from dataset papers:
   - **Introduction** (~1.5 pages): Motivate the capability gap → define the task → preview the benchmark → state why existing benchmarks are insufficient
   - **Task Design** (~1-1.5 pages): Formal task definition, difficulty levels (like GAIA's three levels), answer format, evaluation protocol
   - **Data Collection / Construction** (~1-1.5 pages): Where did the questions come from? Human annotation, web scraping, filtering, quality control
   - **Evaluation Framework** (~1-1.5 pages): Metrics, execution environment (for code benchmarks), human performance baseline, automated baseline results
   - **Experiments / Initial Results** (~1.5-2 pages): Run major existing models/systems. Present results table. Analysis of error patterns.
   - **Limitations + Ethics** (~0.5 page)

4. **The Benchmark Lifecycle Problem** — Benchmarks have a shelf life:
   - **Saturation:** GSM8K went from 35% (GPT-3) to 99% (GPT-5.3 Codex). MMLU scores "above 80% lost predictive power." New benchmarks are needed faster than ever.
   - **Contamination:** LLM training data may include benchmark test sets. Documented accuracy drops of 13% when contaminated examples removed. Mechanisms: direct inclusion, soft contamination (semantic duplicates), instruction-tuning recontamination.
   - **Solutions:** Dynamic benchmarks (LiveBench: frequently updated), contamination-resistant designs (Humanity's Last Exam: impossible-by-design), private test sets, temporal filtering (LiveCodeBench: post-training-cutoff problems only).

5. **Types of Benchmark Contributions** — Not all benchmarks are "answer 100 questions":
   - **Task benchmarks:** Standard question-answering (MMLU, HELM)
   - **Agent/environment benchmarks:** SWE-bench, WebArena, MineDojo — the benchmark IS an interactive environment
   - **Safety/trustworthiness benchmarks:** DecodingTrust, PRISM — measure non-functional properties
   - **Domain-specific benchmarks:** MedCalc-Bench, ChaosBench, CTIBench — targeted at specific fields
   - **Meta-benchmarks:** HELM, BIG-bench — aggregate across many tasks

**Key equations:** Evaluation metrics (accuracy, F1, pass@k for code, functional correctness)
**Visualizations:** The benchmark lifecycle diagram (creation → adoption → saturation → replacement); comparison table of benchmark types with examples; contamination mechanism diagram.
**Source images to embed:** None (custom diagrams)
**Self-explanation prompts:**
- "Design a benchmark for a capability you care about. Can you make it natural, automatically evaluatable, and challenging simultaneously? Which property is hardest to satisfy?"
- "If your benchmark saturates within 6 months, was it a failure? Why or why not?"

**[UPDATE 2026-04-05]** Added: (a) formal benchmark definition via Raji et al. as quoted in BetterBench ([Reuel et al., arXiv 2024](https://arxiv.org/abs/2411.12990)); (b) lifecycle-oriented quality framework (46 criteria, five stages) and link to [betterbench.stanford.edu](https://betterbench.stanford.edu); (c) Cameron Wolfe's survey of how major LLM benchmarks handle sourcing, quality control, metrics, and difficulty upgrades (MMLU-Pro, MMLU-Redux, BBH/BBEH, etc.).

<!-- END-SECTION-4 -->

---

### Section 5: Why D&B Papers Matter More Than Ever — The LLM and Agentic Era {#sec-why-db-matters}

**File:** `_05-why-db-matters.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should understand the specific reasons why dataset and benchmark work has become increasingly critical in 2023-2026, driven by the rise of LLMs, agentic AI, and data-centric AI paradigm.
**Running example application:** Dr. Chen's benchmark is especially timely because existing multilingual benchmarks are being saturated by frontier models, and there's increasing concern about benchmark contamination in multilingual settings.

**Sources needed:**

| Source | Type | Specific Sections/Pages | What to Extract |
|--------|------|------------------------|-----------------|
| Andrew Ng: Data-Centric AI | [TUTORIAL] | Key arguments | Data quality > model complexity |
| Lora Aroyo NeurIPS 2023 Talk | [ACADEMIC] | "Truth by disagreement" | Annotation quality, diverse perspectives |
| Benchmark contamination survey | [ACADEMIC] | Mechanisms, impact | Why new benchmarks are urgently needed |
| NeurIPS D&B submission growth | [VENUE-DATA] | 484 → 1820 submissions | Community demand signal |
| SWE-bench, GAIA, WebArena | [ACADEMIC] | Framing/motivation | Agentic AI evaluation needs |
| NeurIPS 2025 Blog: Raising the Bar | [BLOG] | Opening paragraphs | "Progress depends just as much on data quality" |
| BetterBench + HAI brief | [ACADEMIC]/[POLICY] | Summary sections | Weak benchmarks in policy; quality dispersion across lifecycle |
| Toloka — AI Benchmarks guide | [TUTORIAL] | Full article | Practitioner checklist echoing validity, robustness, reproducibility |

**Content outline:**
1. **The Data-Centric AI Paradigm Shift** — Andrew Ng's argument: most ML research focuses on models, but improving data quality often yields larger gains. The shift from "bigger model" to "better data." How this validates D&B work: if data is the bottleneck, then data work deserves publication credit.

2. **The Evaluation Crisis in the LLM Era** — Four interconnected problems that make benchmark work urgent:
   - **Saturation:** Existing benchmarks saturating faster than new ones are created. MMLU, GSM8K, HellaSwag near-ceiling for frontier models.
   - **Contamination:** LLM training corpora include benchmark test sets, inflating reported accuracy by up to 13pp. Researchers can't trust leaderboard scores anymore.
   - **Capability breadth:** LLMs are general-purpose, but no single benchmark captures their full capability. Need comprehensive evaluation suites.
   - **Safety and alignment:** Can't deploy LLMs without safety benchmarks. DecodingTrust, PRISM — these are not nice-to-haves, they're requirements.

3. **The Agentic AI Evaluation Gap** — LLM agents that browse the web, write code, and make decisions need fundamentally new evaluation paradigms:
   - **Environment-as-benchmark:** WebArena, SWE-bench, MineDojo — the test IS an interactive environment, not a static test set
   - **Multi-step evaluation:** GAIA's three difficulty levels test increasing amounts of tool use and planning
   - **Safety in autonomous systems:** ST-WebAgentBench evaluates whether agents follow policies while completing tasks
   - **The human-agent gap:** WebArena humans 78% vs agents 60%, GAIA humans 92% vs GPT-4 15%. These gaps define the research frontier.

4. **Data as Infrastructure** — Datasets and benchmarks are research infrastructure, like telescopes or particle accelerators:
   - LAION-5B enabled Stable Diffusion (one dataset → entire industry of image generation)
   - ImageNet enabled the deep learning revolution
   - SQuAD catalyzed reading comprehension research
   - SWE-bench kickstarted the AI-for-coding industry
   - The most-cited papers in ML are often datasets, not algorithms

5. **The Community's Response** — Institutional changes reflecting this shift:
   - NeurIPS D&B track (2021): 484 → 1,820 submissions by 2024
   - KDD D&B track (2025): new launch
   - DMLR journal (2023): dedicated archival venue
   - ACL/EMNLP: explicit reviewer instructions to value dataset papers equally
   - Croissant metadata standard: industry-wide dataset documentation effort
   - Lora Aroyo's "truth by disagreement": fundamentally rethinking what "quality data" means
   - NeurIPS 2026 Evaluations & Datasets track: evaluation treated as an object of scientific study (see Section 1 / Source #38)

**Key equations:** None
**Visualizations:** Timeline of paradigm shifts (model-centric → data-centric → evaluation-centric); the "evaluation crisis" diagram; table of landmark datasets and their downstream impact.
**Source images to embed:** None (custom diagrams)
**Self-explanation prompts:**
- "Think of a breakthrough AI product from the past 3 years. What datasets and benchmarks made it possible? Would it exist without them?"
- "If benchmark contamination means we can't trust leaderboard scores, what should researchers and practitioners use instead to evaluate models?"

<!-- END-SECTION-5 -->

---

### Section 6: How to Write a Strong D&B Paper — A Practical Guide {#sec-how-to-write}

**File:** `_06-how-to-write-db-paper.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should have a concrete, actionable guide for writing a competitive D&B paper, including submission logistics, common pitfalls, and practical tips.
**Running example application:** Dr. Chen finalizes her submission to NeurIPS D&B: she completes her Croissant metadata, hosts the dataset on Hugging Face, runs comprehensive baselines, and writes a compelling introduction using the "gap-filler" archetype.

**Sources needed:**

| Source | Type | Specific Sections/Pages | What to Extract |
|--------|------|------------------------|-----------------|
| NeurIPS 2025 D&B CFP | [VENUE-CFP] | Requirements | Submission checklist |
| KDD 2025 D&B CFP | [VENUE-CFP] | Submission guidelines | KDD-specific requirements |
| NeurIPS 2025 Blog: Raising the Bar | [BLOG] | New requirements | Croissant, hosting, quality standards |
| Building Better Datasets (DMLR 2024) | [ACADEMIC] | Seven recommendations | Practical recommendations |
| Ofir Press blog | [TUTORIAL] | Practical tips | Benchmark design tips |
| Best paper example analyses | [ACADEMIC] | What makes them special | Patterns in award-winning papers |
| NeurIPS 2026 Evaluations & Datasets CFP | [VENUE-CFP] | ED-specific guidelines | Double-blind default; optional single-blind for dataset-centered work; Croissant RAI fields; code policy by contribution type |

**Content outline:**
1. **The Value Proposition for D&B Papers** — Borrowing from the System Demo chapter's archetype framework, D&B papers use similar framing patterns:
   - **The Gap-Filler:** "No benchmark exists for X" (SWE-bench: no benchmark for real-world software engineering)
   - **The Scale-Breaker:** "Existing datasets are 100x smaller than needed" (LAION-5B: first billion-scale image-text dataset)
   - **The Perspective-Shifter:** "Current benchmarks measure the wrong thing" (DecodingTrust: existing evals ignore trustworthiness; PRISM: existing RLHF data ignores cultural diversity)
   - **The Infrastructure Builder:** "The community needs evaluation infrastructure for a new paradigm" (WebArena: autonomous web agents; ChaosBench: sub-seasonal climate prediction)

2. **Submission Logistics Checklist** — Concrete requirements for NeurIPS 2025 D&B:
   - Paper: 9 pages content + unlimited appendices + references (same as main track)
   - Single-blind: author names visible to reviewers
   - Dataset must be hosted on HuggingFace/Kaggle/OpenML/Dataverse or equivalent with permanent URL
   - Croissant metadata file required
   - Code must be documented and executable
   - All artifacts accessible to reviewers at submission time — non-compliance → desk rejection
   - No transfer between D&B and main track after submission deadline

3. **Writing Tips Specific to D&B Papers:**
   - **Don't bury the data:** The dataset/benchmark itself is the star. Don't spend 3 pages on your baseline model and 1 page on the data.
   - **Show you've thought about longevity:** How will the dataset be maintained? Who will host it in 5 years? How will the benchmark be updated?
   - **Human baselines are gold:** Including human performance baselines gives reviewers a calibration point and shows the difficulty of your benchmark.
   - **Diversity of baselines:** Don't just run GPT-4. Run open-source models, smaller models, non-LLM baselines if applicable.
   - **Anticipate the "so what?" question:** Why should 100 researchers download your dataset next year?

4. **Common Rejection Reasons and How to Avoid Them:**
   - "The dataset is too small / too similar to existing datasets" → clearly articulate what's novel
   - "Insufficient documentation" → use Datasheets framework, fill out every field
   - "No baseline experiments" → always include quantitative evaluation
   - "Data quality concerns" → report inter-annotator agreement, describe quality control
   - "Ethical concerns not addressed" → dedicated ethics section with concrete risks and mitigations
   - "Not accessible at review time" → host early, test the download link, provide Croissant

5. **Dr. Chen's Final Submission Package** — A walkthrough of everything she submits: the paper, the HuggingFace dataset card, the Croissant metadata file, the GitHub repository with baseline code, the evaluation scripts. Show how each piece addresses a reviewer concern.

**Key equations:** None
**Visualizations:** Submission checklist table; common pitfalls callout box; comparison of strong vs weak dataset introductions.
**Source images to embed:** None
**Self-explanation prompts:**
- "Write one sentence that captures why your dataset/benchmark fills a gap that no existing resource fills. Does it sound compelling?"
- "What would happen if your dataset disappeared tomorrow? Would anyone notice? If yes, you have a strong contribution."

**[UPDATE 2026-04-05]** Chapter adds a NeurIPS 2026 addendum: Evaluations & Datasets naming; double-blind default; contribution-dependent code release; Croissant **core + Responsible AI fields**.

<!-- END-SECTION-6 -->

---

## Source Image Catalog

Since this topic is primarily textual (conference guidelines, paper structures, researcher opinions), there are no source images from papers to embed. Instead, the chapter requires **custom-generated visualizations** created during the writing phase:

| # | Visualization | Type | Used In | Description |
|---|--------------|------|---------|-------------|
| 1 | NeurIPS D&B submission growth chart | Bar chart | Section 1 + Hook | Submissions by year: 484 (2021, Medium announcement) → 487 (2022, per NeurIPS 2023 fact sheet) → 987 (2023) → 1,820 (2024). Values 2022–2024 from NeurIPS PDF fact sheets; local text in `sources/neurips.cc/Conferences/NeurIPS2023/` and `.../NeurIPS2024/`. |
| 2 | Venue landscape table | Formatted table | Section 1 | Venues accepting D&B work: NeurIPS, KDD, ACL, EMNLP, DMLR, with format/requirements for each. |
| 3 | D&B timeline | Timeline diagram | Section 1 | Major milestones: 2012 ImageNet, 2018 Datasheets/GLUE/SQuAD2, 2021 NeurIPS D&B, 2023 DMLR, 2024 Croissant, 2025 KDD D&B. |
| 4 | Three-track comparison table | Formatted table | Section 2 | Research vs D&B vs System Demo: primary contribution, review criteria, blind review, page limits, artifacts, key reviewer question. |
| 5 | Track selection decision flowchart | D2/Mermaid diagram | Section 2 | "Is your primary contribution...?" → branching to Research / D&B / System Demo. |
| 6 | Paper-to-track mapping examples | Formatted table | Section 2 | Real papers (LAION-5B, PRISM, SWE-bench, AutoGen Studio, GPT-4) mapped to their correct track with explanation. |
| 7 | Dataset paper page budget | Formatted table | Section 3 | Section-by-section page allocation for a 9-page dataset paper. |
| 8 | Documentation frameworks comparison | Formatted table | Section 3 | Datasheets vs Data Statements vs Croissant vs Data Cards: what each covers. |
| 9 | Benchmark lifecycle diagram | Diagram | Section 4 | Creation → Adoption → Saturation → Retirement/Replacement. With timelines (GSM8K: 3 years to saturation). |
| 10 | Benchmark types taxonomy | Formatted table | Section 4 | Task, Agent/Environment, Safety, Domain-Specific, Meta — with examples. |
| 11 | Evaluation crisis diagram | Diagram | Section 5 | Four problems: saturation, contamination, capability breadth, safety — and how they interact. |
| 12 | Landmark datasets impact table | Formatted table | Section 5 | Dataset → downstream impact: ImageNet → deep learning, SQuAD → reading comprehension, LAION-5B → Stable Diffusion, SWE-bench → AI coding. |
| 13 | Submission checklist | Callout box | Section 6 | NeurIPS 2025 D&B checklist: paper, hosted dataset, Croissant metadata, code, baselines, ethics statement. |

---

### Section 99: Key Takeaways {#sec-key-takeaways}

**File:** `_99-key-takeaways.qmd`
**Estimated length:** 500–800 words
**Goal:** Reinforce the core messages and provide actionable next steps.

**Content outline:**
1. **Summary of Key Insights:**
   - D&B papers contribute data artifacts and evaluation infrastructure, not algorithms. The primary contribution IS the dataset or benchmark.
   - D&B papers differ from Research papers (algorithmic novelty) and System Demo papers (working software systems). The track selection depends on your *primary* contribution.
   - Strong dataset papers need: clear gap articulation, rigorous documentation (Datasheets, Croissant), quality control, baseline experiments, accessible hosting.
   - Strong benchmark papers need: natural tasks, automatic evaluation, challenging difficulty, contamination resistance, human baselines.
   - D&B work is becoming more critical, not less, as LLMs saturate existing benchmarks and agentic systems require new evaluation paradigms.

2. **If You Remember Nothing Else:**
   - "Is the main value of your work the data/evaluation itself?" → If yes, D&B track.
   - Use the Datasheets for Datasets framework as your minimum documentation standard.
   - Host your dataset on a permanent platform (HuggingFace, Kaggle, etc.) with Croissant metadata.
   - Always include baseline experiments — a dataset without baselines is just cloud storage.
   - Write your introduction as a gap statement: "X capability cannot be evaluated because no benchmark exists for Y."

3. **Cross-Reference to System Demo Chapter:** Remind reader of the companion chapter and how the D&B and System Demo guidance work together. If your work has components spanning multiple tracks, you now have guidance for all three.

---

## Cross-Cutting Concerns

### Common Misconceptions

| # | Misconception | Truth | Relevant Section |
|---|--------------|-------|-----------------|
| 1 | "D&B papers are just data dumps — no intellectual contribution" | Strong D&B papers require novel task design, rigorous documentation, quality control methodology, and insightful analysis. The 2021 track announcement explicitly calls them "first-class work on par with algorithms work." | Section 1, Section 3 |
| 2 | "You can't publish a paper without beating SOTA" | D&B papers are not evaluated on algorithmic novelty. ACL reviewer guidelines explicitly state: "development of datasets is as important as modeling work" and papers should not be rejected for not beating SOTA. | Section 2, Section 3 |
| 3 | "Dataset papers don't need experiments" | Baseline experiments are essential. They demonstrate the dataset's utility, establish difficulty, and give future researchers a benchmark to beat. Every best-paper winner includes extensive baselines. | Section 3, Section 6 |
| 4 | "A good benchmark should be hard forever" | Benchmarks naturally saturate. GSM8K went from 35% to 99% in four years. A benchmark that catalyzes rapid progress (like SWE-bench) is a success, not a failure, even if it saturates. The goal is to advance research, not to remain unsolved. | Section 4 |
| 5 | "D&B track is easier to get into than the main track" | NeurIPS D&B acceptance rates (~36% in 2022) are comparable to the main track. Review standards are rigorous, with specific criteria around data quality, accessibility, ethics, and documentation that the main track doesn't apply. | Section 1, Section 6 |
| 6 | "Any dataset with a leaderboard is a benchmark" | A benchmark requires a defined task, evaluation metric, scoring methodology, and ground truth. A dataset with a leaderboard but no formal evaluation protocol is just a dataset with rankings. | Section 4 |

### Think-Hard Questions

1. **The LAION-5B Paradox:** LAION-5B won the NeurIPS 2022 Outstanding Dataset Paper award but was later found to contain CSAM (child sexual abuse material) and was temporarily taken down. What does this tell us about the limits of current dataset documentation and review processes? How should the community balance scale with safety?

2. **The Benchmark Treadmill:** If a new benchmark takes 6 months to create but saturates in 6 months, is benchmark research sustainable? What would a more sustainable model for evaluation look like?

3. **The Contamination Paradox:** The more popular a benchmark becomes, the more likely it is to end up in LLM training data, the less useful it becomes. How do you break this cycle without making benchmarks private or paywalled?

4. **Culture and Disagreement:** Lora Aroyo argues that annotator disagreement is a signal, not noise. If we embrace this perspective, what does it mean for benchmarks that assume a single ground truth? Should benchmarks report disagreement distributions instead of accuracy?

5. **The Democratic vs. Expert Tension:** Should benchmark creation be democratic (crowd-sourced, like PRISM) or expert-driven (curated by domain specialists, like MedCalc-Bench)? When does each approach work better?

### Deliberate Lacunae

The following topics are deliberately out of scope for this chapter but may be covered elsewhere:
- **Synthetic data generation:** The use of LLMs to generate training data (not evaluation data) is a rapidly evolving area but lies at the intersection of D&B and Research track work. It deserves its own chapter.
- **Industry benchmarks and leaderboards:** Corporate evaluation suites (LMSYS Chatbot Arena, MTBench, Open LLM Leaderboard) have their own dynamics. This chapter focuses on academic publication venues.
- **Data privacy and governance:** While ethical considerations are covered within D&B papers, the broader topic of data governance regulations (GDPR, EU AI Act) is a separate discipline.
- **Detailed tutorial for Croissant metadata creation:** While Croissant is described, a step-by-step tutorial is better served by the official Croissant documentation.

### Out-of-Scope Sources (Update 2026-04-05)

| Source | Status | Notes |
|--------|--------|-------|
| [Scaleway — Why AI Benchmarking Matters](https://www.scaleway.com/en/blog/why-ai-benchmarking-matters/) | Not integrated | Static HTML extraction returned an unrelated short stub; retry with JS rendering if needed. |
