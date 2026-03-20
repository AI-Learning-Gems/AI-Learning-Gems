# TEXTBOOK-PLAN: LLM-as-a-Judge

> **⚠️ CRITICAL DISCLAIMER FOR THE WRITING AGENT ⚠️**
>
> This TEXTBOOK-PLAN.md is a **structural guide only**. It specifies: (a) which sections to write,
> (b) which sources to read for each section, and (c) what topics each section should cover.
>
> **The quotes, statistics, numbers, and specific claims in this plan are PLACEHOLDERS.**
> They were extracted from web search summaries during the research phase. Web search summaries
> are lossy, frequently inaccurate, and sometimes fabricate details that do not appear in the
> original source. A quote attributed to "Author X" in this plan may be paraphrased incorrectly,
> taken out of context, or entirely hallucinated by the search engine or LLM that produced the summary.
>
> **DO NOT copy any quote, statistic, or specific claim from this plan into the chapter.**
> Instead, use the source paths listed in each section's "Sources needed" table to read the
> actual source files. Every quote must come from your own reading of the source. Every number
> must be verified against the actual paper/post. If a source cannot be read (empty folder,
> missing file, PDF not converted), the claim MUST be dropped or the source must be downloaded
> and read before the claim can be included.
>
> **The plan tells you WHERE to look. The sources tell you WHAT to write.**

## User Query
> Write a comprehensive textbook chapter on the "LLM-as-a-Judge" paradigm, reflecting the state of the art as of early 2026 (December 2025 – March 2026). The chapter should take a reader from foundational principles to the current frontier. It must be deeply researched, not a surface survey. Structure it as: Foundations (~40%), Applications (~20%), Recent Advances & Making Judges More Powerful (~40%, at least 3 sections).

**Topic:** LLM-as-a-Judge
**Prior Knowledge:** ML fundamentals, LLMs, basic NLP evaluation (BLEU, ROUGE), awareness of RLHF
**Learning Goals:** Deep understanding from foundational principles through 2026 state-of-the-art; self-contained reference
**Target Depth:** GRADUATE / RESEARCHER
**Output Folder:** `Steering LLMs/LLM-as-a-Judge`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (40 sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (Zheng et al.)](https://arxiv.org/abs/2306.05685) | [ACADEMIC] | `sources/arxiv-2306.05685/` | 2023-06 | 2026-03-20 | KEY: Foundational paper. Defines LLM-as-a-Judge paradigm, introduces MT-Bench and Chatbot Arena, documents position/verbosity/self-enhancement biases, shows GPT-4 achieves >80% agreement with humans. |
| 2 | [A Survey on LLM-as-a-Judge (Gu et al.)](https://arxiv.org/abs/2411.15594) | [ACADEMIC] | `sources/arxiv-2411.15594/` | 2024-11 | 2026-03-20 | KEY: Comprehensive survey addressing reliability, bias mitigation, diverse assessment scenarios. Includes novel benchmark. |
| 3 | [LLMs-as-Judges: A Comprehensive Survey (Li et al.)](https://arxiv.org/abs/2412.05579) | [ACADEMIC] | `sources/arxiv-2412.05579/` | 2024-12 | 2026-03-20 | KEY: Five-perspective analysis: Functionality, Methodology, Applications, Meta-evaluation, Limitations. |
| 4 | [Judging the Judges: A Systematic Study of Position Bias (Raina et al.)](https://arxiv.org/abs/2406.07791) | [ACADEMIC] | `sources/arxiv-2406.07791/` | 2024-06 | 2026-03-20 | KEY: 150K+ evaluation instances, 15 judges. Position bias varies by judge and task, weakly influenced by prompt length, strongly by quality gap. |
| 5 | [Judging the Judges: Evaluating Alignment and Vulnerabilities (Thakur et al.)](https://arxiv.org/abs/2406.12624) | [ACADEMIC] | `sources/arxiv-2406.12624/` | 2024-06 | 2026-03-20 | KEY: 13 judge models evaluated. Even best judges fall short of inter-human agreement. Sensitivity to prompt complexity and leniency documented. |
| 6 | [Trust or Escalate: LLM Judges with Provable Guarantees (Bavaresco et al.)](https://arxiv.org/abs/2407.18370) | [ACADEMIC] | `sources/arxiv-2407.18370/` | 2024-07 | 2026-03-20 | KEY: Selective evaluation with provable guarantees of human agreement. Cascaded evaluation can guarantee >80% agreement with 80% coverage. |
| 7 | [G-Eval: NLG Evaluation using GPT-4 (Liu et al.)](https://arxiv.org/abs/2303.16634) | [ACADEMIC] | `sources/arxiv-2303.16634/` | 2023-03 | 2026-03-20 | KEY: Seminal prompt-based evaluation framework using CoT and form-filling. Spearman ρ=0.514 on summarization. |
| 8 | [Prometheus 2: Open Source LLM Specialized in Evaluating (Kim et al.)](https://arxiv.org/abs/2405.01535) | [ACADEMIC] | `sources/arxiv-2405.01535/` | 2024-05 | 2026-03-20 | KEY: Purpose-built open-source judge (7B & 8x7B). Supports direct assessment and pairwise ranking with custom rubrics. |
| 9 | [Constitutional AI: Harmlessness from AI Feedback (Bai et al.)](https://arxiv.org/abs/2212.08073) | [ACADEMIC] | `sources/arxiv-2212.08073/` | 2022-12 | 2026-03-20 | KEY: Foundational RLAIF paper. Two-phase training: self-critique SL + RL from AI feedback. Establishes AI-as-judge-of-itself paradigm. |
| 10 | [RewardBench: Evaluating Reward Models (Lambert et al.)](https://arxiv.org/abs/2403.13787) | [ACADEMIC] | `sources/arxiv-2403.13787/` | 2024-03 | 2026-03-20 | KEY: First comprehensive benchmark for reward models/judges. Prompt-chosen-rejected trios across chat, reasoning, safety. |
| 11 | [FActScore: Fine-grained Atomic Evaluation (Min et al.)](https://arxiv.org/abs/2305.14251) | [ACADEMIC] | `sources/arxiv-2305.14251/` | 2023-05 | 2026-03-20 | KEY: Atomic fact decomposition for factuality evaluation. ChatGPT achieves only 58% FActScore. Automated version <2% error. |
| 12 | [LLM Critics Help Catch LLM Bugs / CriticGPT (McAleese et al.)](https://arxiv.org/abs/2407.00215) | [ACADEMIC] | `sources/arxiv-2407.00215/` | 2024-07 | 2026-03-20 | KEY: OpenAI's trained critic model. 63% preference rate over human critiques. Human+CriticGPT teams outperform either alone. |
| 13 | [Let's Verify Step by Step (Lightman et al.)](https://arxiv.org/abs/2305.20050) | [ACADEMIC] | `sources/arxiv-2305.20050/` | 2023-05 | 2026-03-20 | KEY: Process reward models (PRM) vs outcome reward models (ORM). PRM achieves 78% on MATH. Releases PRM800K dataset. |
| 14 | [AlpacaFarm: A Simulation Framework for RLHF (Dubois et al.)](https://arxiv.org/abs/2305.14387) | [ACADEMIC] | `sources/arxiv-2305.14387/` | 2023-05 | 2026-03-20 | KEY: LLM-simulated annotators costing 45-50x less than crowdworkers. Validates simulated feedback matches real human ranking. |
| 15 | [MCTS-Judge: Test-Time Scaling for Code Correctness (Chen et al.)](https://arxiv.org/abs/2502.12468) | [ACADEMIC] | `sources/arxiv-2502.12468/` | 2025-02 | 2026-03-20 | KEY: Monte Carlo Tree Search for code evaluation. Improves accuracy 41%→80%. Surpasses o1-series with 3x fewer tokens. |
| 16 | [EvalPlanner: Thinking-LLM-as-a-Judge (Lu et al.)](https://arxiv.org/abs/2501.18099) | [ACADEMIC] | `sources/arxiv-2501.18099/` | 2025-01 | 2026-03-20 | KEY: Separates planning from execution in LLM judges. SOTA on RewardBench (93.9). Uses preference optimization on evaluation plans. |
| 17 | [J1: Incentivizing Thinking in LLM-as-a-Judge via RL (Wen et al.)](https://arxiv.org/abs/2505.10320) | [ACADEMIC] | `sources/arxiv-2505.10320/` | 2025-05 | 2026-03-20 | KEY: RL (GRPO) training for thinking-judges. J1-Qwen-32B outperforms o1-mini, o3, DeepSeek-R1 (671B) on some benchmarks. |
| 18 | [Bi-Level Prompt Optimization for Multimodal LLM-as-a-Judge (BLPO)](https://arxiv.org/abs/2602.11340) | [ACADEMIC] | `sources/arxiv-2602.11340/` | 2026-02 | 2026-03-20 | KEY: Joint prompt + Image-to-Text prompt optimization for multimodal judges. Addresses context window limits for visual evaluation. |
| 19 | [FairJudge: Adaptive, Debiased, Consistent (Guo et al.)](https://arxiv.org/abs/2602.06625) | [ACADEMIC] | `sources/arxiv-2602.06625/` | 2026-02 | 2026-03-20 | KEY: Curriculum SFT-DPO-GRPO training. Addresses position/length/format bias and mode inconsistency. |
| 20 | [WildGuard: Open Moderation Tools (Han et al.)](https://arxiv.org/abs/2406.18495) | [ACADEMIC] | `sources/arxiv-2406.18495/` | 2024-06 | 2026-03-20 | KEY: Open-source safety judge. 13 risk categories, 92K labeled examples. Reduces jailbreak success 79.8%→2.4%. |
| 21 | [HarmBench: Standardized Evaluation for Red Teaming (Mazeika et al.)](https://arxiv.org/abs/2402.04249) | [ACADEMIC] | `sources/arxiv-2402.04249/` | 2024-02 | 2026-03-20 | KEY: 510 behaviors, 18 red teaming methods, 33 LLMs. Standardized framework for safety evaluation. |
| 22 | [A Statistical Framework for Ranking LLM-Based Chatbots (Mao et al.)](https://arxiv.org/abs/2412.18407) | [ACADEMIC] | `sources/arxiv-2412.18407/` | 2024-12 | 2026-03-20 | KEY: Factored tie model, covariance modeling for Bradley-Terry-based LLM ranking. "Leaderbot" package. |
| 23 | [Debate, Deliberate, Decide (D3) (Li et al.)](https://arxiv.org/abs/2410.04663) | [ACADEMIC] | `sources/arxiv-2410.04663/` | 2024-10 | 2026-03-20 | KEY: Cost-aware adversarial multi-agent evaluation. MORE and SAMRE protocols. Probabilistic proof of aggregation benefit. |
| 24 | [CollabEval: Multi-Agent Collaboration (Xu et al.)](https://arxiv.org/abs/2603.00993) | [ACADEMIC] | `sources/arxiv-2603.00993/` | 2026-03 | 2026-03-20 | KEY: Three-phase collaborative judging. Outperforms single-LLM and competitive multi-agent approaches. |
| 25 | [Plug-and-Play LLM Judge with LoRA (Luo et al.)](https://arxiv.org/abs/2506.05748) | [ACADEMIC] | `sources/arxiv-2506.05748/` | 2025-06 | 2026-03-20 | KEY: Frozen 7B + rank-16 LoRA achieves 96.2% on RewardBench. Outperforms 27B-70B specialized reward networks. |
| 26 | [Reflexion: Language Agents with Verbal Reinforcement (Shinn et al.)](https://arxiv.org/abs/2303.11366) | [ACADEMIC] | `sources/arxiv-2303.11366/` | 2023-03 | 2026-03-20 | KEY: Self-evaluation + verbal reflection in agents. 91% pass@1 on HumanEval. Foundational for agent self-judgment. |
| 27 | [SCOPE: Selective Conformal Pairwise LLM Judging (Gao et al.)](https://arxiv.org/abs/2602.13110) | [ACADEMIC] | `sources/arxiv-2602.13110/` | 2026-02 | 2026-03-20 | KEY: Bidirectional Preference Entropy + conformal prediction for calibrated pairwise judging. Empirical risk ~0.097-0.099 at α=0.10. |
| 28 | [CalibraEval: Calibrating Prediction Distribution (Lin et al.)](https://arxiv.org/abs/2410.15393) | [ACADEMIC] | `sources/arxiv-2410.15393/` | 2024-10 | 2026-03-20 | KEY: Label-free debiasing as optimization. Non-parametric order-preserving algorithm for selection bias mitigation. |
| 29 | [TIR-Judge: Tool-Integrated RL for LLM Judges (Yang et al.)](https://arxiv.org/abs/2510.23038) | [ACADEMIC] | `sources/arxiv-2510.23038/` | 2025-10 | 2026-03-20 | KEY: Integrates code executors with LLM judges via RL. Up to 6.4% improvement. 8B model matches Claude-Opus-4 listwise. |
| 30 | [E-valuator: Reliable Agent Verifiers via Sequential Hypothesis Testing](https://arxiv.org/abs/2512.03109) | [ACADEMIC] | `sources/arxiv-2512.03109/` | 2025-12 | 2026-03-20 | KEY: Statistical guarantees for agent trajectory verification. Provable false alarm rate control. Online monitoring at every step. |
| 31 | [Eugene Yan — Evaluating the Effectiveness of LLM-Evaluators](https://eugeneyan.com/writing/llm-evaluators/) | [TUTORIAL] | `sources/eugeneyan.com/writing/llm-evaluators/content.md` | 2024 | 2026-03-20 | KEY: Practical guide to LLM judges. Covers scoring approaches, pairwise vs direct, implementation steps, failure modes. |
| 32 | [OpenAI — Improving Mathematical Reasoning with Process Supervision](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision) | [TUTORIAL] | `sources/openai.com/index/improving-mathematical-reasoning-with-process-supervision/content.md` | 2023-05 | 2026-03-20 | KEY: Blog companion to PRM paper. Accessible explanation of process vs outcome supervision. |
| 33 | [OpenAI — Finding GPT-4's Mistakes with GPT-4 (CriticGPT)](https://openai.com/index/finding-gpt4s-mistakes-with-gpt-4) | [TUTORIAL] | `sources/openai.com/index/finding-gpt4s-mistakes-with-gpt-4/content.md` | 2024-06 | 2026-03-20 | KEY: Blog companion to CriticGPT paper. Explains scalable oversight motivation. |
| 34 | [LMSYS — Chatbot Arena Elo System Update](https://lmsys.org/blog/2023-12-07-leaderboard/) | [TUTORIAL] | `sources/lmsys.org/blog/2023-12-07-leaderboard/content.md` | 2023-12 | 2026-03-20 | KEY: Bradley-Terry transition, Elo calculation methodology, bootstrap confidence intervals. |
| 35 | [LLM-as-a-Judge Project Page (Survey Companion)](https://llm-as-a-judge.github.io/) | [TUTORIAL] | `sources/llm-as-a-judge.github.io/content.md` | 2024-11 | 2026-03-20 | KEY: Companion website for survey paper #2. Quick reference taxonomy and paper list. |
| 36 | [Cameron R. Wolfe — "Using LLMs for Evaluation"](https://cameronrwolfe.substack.com/p/llm-as-a-judge) | [TUTORIAL] | `sources/cameronrwolfe.substack.com/p/llm-as-a-judge/content.md` | 2024 | 2026-03-20 | KEY: Comprehensive long-form explainer (90K chars). Covers LLM-as-a-Judge paradigm end-to-end: motivation, scoring approaches, biases, practical implementation. Excellent for intuition-building. |
| 37 | [Cameron R. Wolfe — "Finetuning LLM Judges for Evaluation"](https://cameronrwolfe.substack.com/p/finetuned-judge) | [TUTORIAL] | `sources/cameronrwolfe.substack.com/p/finetuned-judge/content.md` | 2024 | 2026-03-20 | KEY: Deep dive into Prometheus, JudgeLM, PandaLM, AutoJ. Covers training specialized judge models and why fine-tuning helps for domain-specific evaluation. (105K chars) |
| 38 | [Cameron R. Wolfe — "Applying Statistics to LLM Evaluations"](https://cameronrwolfe.substack.com/p/stats-llm-evals) | [TUTORIAL] | `sources/cameronrwolfe.substack.com/p/stats-llm-evals/content.md` | 2024 | 2026-03-20 | KEY: Statistical rigor for LLM evals: significance testing, bootstrap CIs, avoiding noise-as-signal. (98K chars) |
| 39 | [Nathan Lambert — "RewardBench: Evaluations, Trust, Performance, and Price"](https://www.interconnects.ai/p/evaluations-trust-performance-and-bfd) | [TUTORIAL] | `sources/interconnects.ai/p/evaluations-trust-performance-and-bfd/content.md` | 2024-03 | 2026-03-20 | KEY: RewardBench announcement. Motivation for evaluating reward models, trust in evals, reproducibility. |
| 40 | [Lilian Weng — "Reward Hacking in Reinforcement Learning"](https://lilianweng.github.io/posts/2024-11-28-reward-hacking/) | [TUTORIAL] | `sources/lilianweng.github.io/posts/2024-11-28-reward-hacking/content.md` | 2024-11 | 2026-03-20 | KEY: Deep dive into reward hacking in RLHF. Relevant to understanding failure modes of reward models used as judges. (65K chars) |

:::

---

## Chapter Overview

**Total sections:** 6 body sections + Introduction + Closing = 8 files
**Estimated total length:** 10,000-14,000 words
**Running example:** A team building a customer-support chatbot that must evaluate response quality across helpfulness, factuality, and safety. They start with BLEU scores, graduate to human annotation (expensive, slow), then adopt LLM-as-a-Judge at increasing levels of sophistication. Each section extends this running example to illustrate a new concept.

### Hook & Running Example Design

The chapter opens with a concrete scenario: you have deployed a chatbot that answers customer questions about a software product. Users complain that some answers are factually wrong, others are correct but unhelpful, and a few are outright unsafe. You need to evaluate thousands of responses per day. BLEU and ROUGE cannot tell you whether an answer is factually correct (they only measure surface overlap with a reference). Human annotators cost $2-5 per evaluation and introduce a 48-hour delay. You need a system that can evaluate quality at scale, in real time, across multiple dimensions simultaneously.

This is the problem that LLM-as-a-Judge was born to solve: using a strong language model (GPT-4, Claude, or a purpose-built judge) to score, compare, or critique the outputs of another model. The running example will return in every section: in the Foundations sections, we use it to illustrate different judgment types (binary pass/fail for safety, Likert-scale for helpfulness, pairwise comparison between two candidate responses). In the Bias section, we show how the same judge produces different verdicts depending on response order. In the Applications section, we extend the chatbot into an agentic workflow with tool calls that must be verified. In the Advances sections, we show how prompt optimization, fine-tuning, and multi-agent panels improve the judge's reliability.

**Hook Image:** The survey paper's taxonomy figure (sources/arxiv-2411.15594/figures/LLM_as_a_Judge.pdf → PNG) provides the ideal motivating image: it shows the full ecosystem of LLM-as-a-Judge in one diagram, from input types through judgment paradigms to applications. This gives the reader a visual map of the chapter before diving into details.

---

## Section Plan

### Section 1: Origins and Motivation — Why Evaluate with LLMs? {#sec-origins}

**File:** `_01-introduction.qmd`
**Estimated length:** 1,800-2,200 words
**Goal:** The reader should understand (a) the historical failure of automated metrics for open-ended generation, (b) the economic and scalability limits of human annotation, (c) the alignment argument for LLM-based evaluation, and (d) the key milestones that established the paradigm (2022-2023).
**Running example application:** The chatbot team starts with BLEU/ROUGE, finds they correlate poorly with customer satisfaction. Switches to human annotators, but cannot scale. Discovers LLM-as-a-Judge as the solution.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Zheng et al. 2023 (MT-Bench) | `sources/arxiv-2306.05685/` | Introduction + Related Work sections | Why traditional benchmarks fail for aligned models; LLM-judge motivation |
| G-Eval (Liu et al. 2023) | `sources/arxiv-2303.16634/` | Introduction | Limitations of BLEU/ROUGE for NLG; CoT evaluation approach |
| FActScore (Min et al. 2023) | `sources/arxiv-2305.14251/` | Introduction | Why binary quality judgments are insufficient; atomic fact decomposition motivation |
| Constitutional AI (Bai et al. 2022) | `sources/arxiv-2212.08073/` | Section 1-2 | RLAIF motivation; AI evaluating AI |
| AlpacaFarm (Dubois et al. 2023) | `sources/arxiv-2305.14387/` | Introduction | Cost comparison: LLM annotators 45-50x cheaper than crowdworkers |
| Eugene Yan blog | `sources/eugeneyan.com/writing/llm-evaluators/content.md` | Full post | Practical motivation; why conventional metrics fail for complex tasks |
| Cameron Wolfe — "Using LLMs for Evaluation" | `sources/cameronrwolfe.substack.com/p/llm-as-a-judge/content.md` | Full post | End-to-end LLM-as-a-Judge explainer; motivation, scoring types, biases, practical setup |
| Survey (Gu et al. 2024) | `sources/arxiv-2411.15594/` | Introduction + Section 2 | Historical timeline and taxonomy of the field |

**Content outline:**
1. The evaluation crisis: BLEU/ROUGE and the reference-dependence problem (concrete chatbot example showing high BLEU but wrong answer)
2. Human annotation: gold standard but unscalable (cost per evaluation, inter-annotator disagreement, latency)
3. The alignment gap: traditional benchmarks (MMLU, HELM) cannot distinguish aligned from unaligned models on open-ended tasks
4. Enter LLM-as-a-Judge: the key insight (strong LLMs approximate human judgment at scale)
5. Timeline of foundational milestones: Constitutional AI (2022), G-Eval (2023), MT-Bench (2023), Chatbot Arena (2023), AlpacaFarm (2023)

**Key equations:** None in this section (motivational/narrative section)
**Visualizations:**
- D2 timeline diagram showing the evolution from BLEU → Human → LLM-as-a-Judge
- Source image: `sources/arxiv-2411.15594/figures/LLM_as_a_Judge.png` (taxonomy overview)
**Source images to embed:** `sources/arxiv-2411.15594/figures/LLM_as_a_Judge.png`

---

### Section 2: Judgment Taxonomies, Measurement Scales, and Known Failure Modes {#sec-taxonomies-and-biases}

**File:** `_02-taxonomies-and-biases.qmd`
**Estimated length:** 2,000-2,500 words
**Goal:** The reader should understand (a) the different types of judgments an LLM judge can produce (pointwise, pairwise, listwise, free-form critique), (b) how these map onto NOIR measurement levels, (c) the reliability/validity tradeoffs of each, and (d) the major known biases and failure modes that constrain every judge.
**Running example application:** The chatbot team must choose a judgment format: binary pass/fail for safety (nominal), 5-point Likert for helpfulness (ordinal), pairwise A-vs-B for comparing model versions. They discover position bias when their pairwise comparisons flip with response order.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Zheng et al. 2023 (MT-Bench) | `sources/arxiv-2306.05685/` | Section 4 (Bias) | Position bias, verbosity bias, self-enhancement bias definitions and experiments |
| Position Bias Study (Raina et al. 2024) | `sources/arxiv-2406.07791/` | Full paper | 150K instances, 15 judges; position bias varies by quality gap; repetition stability metrics |
| Judging the Judges (Thakur et al. 2024) | `sources/arxiv-2406.12624/` | Full paper | 13 judge models; scores differ by up to 5 points from human; leniency and prompt sensitivity |
| LLMs-as-Judges Survey (Li et al. 2024) | `sources/arxiv-2412.05579/` | Methodology section | Pointwise, pairwise, listwise taxonomy; scoring formats |
| Survey (Gu et al. 2024) | `sources/arxiv-2411.15594/` | Section on bias and reliability | Comprehensive bias taxonomy and mitigation strategies |
| Likert scale study (covered in Survey arXiv 2411.15594) | `sources/arxiv-2411.15594/` | Scoring methodology sections | Fine-grained ordinal scales improve pointwise scoring; gap with listwise shrinks at higher scale granularity |
| Eugene Yan blog | `sources/eugeneyan.com/writing/llm-evaluators/content.md` | Scoring approaches section | Practical comparison of direct scoring vs pairwise vs reference-based |
| Cameron Wolfe — "Using LLMs for Evaluation" | `sources/cameronrwolfe.substack.com/p/llm-as-a-judge/content.md` | Bias sections | Detailed treatment of position bias, verbosity bias, self-enhancement bias with worked examples |

**Content outline:**
1. Judgment formats: pointwise scoring, pairwise comparison, listwise ranking, free-form textual critique (define each with concrete chatbot example)
2. Measurement scales and NOIR: binary pass/fail (nominal), ordinal Likert (ordinal), calibrated probability (interval/ratio). Mapping table between judgment format and measurement level.
3. Reliability/validity tradeoffs: pairwise is more reliable but O(n²); pointwise is cheaper but less stable; reference-based requires gold answers
4. The bias zoo: position bias (with figure from MT-Bench paper), verbosity bias (longer = better illusion), self-enhancement bias (judges prefer own outputs), anchoring on surface heuristics
5. The Evaluation Illusion: high model-level agreement masking fragile sample-level agreement (Spearman ρ=0.99 model-level vs Pearson r̄=0.72 sample-level). Correlated errors from shared latent confounders.
6. Brief preview of debiasing strategies (elaborated in later sections)

**Key equations:**
- Cohen's kappa for inter-annotator agreement
- Bradley-Terry model: $P(i \succ j) = \frac{\exp(\beta_i)}{\exp(\beta_i) + \exp(\beta_j)}$ (introduced here, elaborated in Section 6)
**Visualizations:**
- Source image: `sources/arxiv-2306.05685/figures/position_bias.png` (position bias heatmap)
- Source image: `sources/arxiv-2306.05685/figures/verbosity_bias.png` (verbosity bias chart)
- D2 diagram: Taxonomy of judgment types mapped to measurement levels (NOIR)
- Table: Comparison of scoring approaches (format, cost, reliability, when to use)
**Source images to embed:** `sources/arxiv-2306.05685/figures/position_bias.png`, `sources/arxiv-2306.05685/figures/verbosity_bias.png`

---

### Section 3: Applications — Agents, Vision-Language Models, and Beyond {#sec-applications}

**File:** `_03-applications.qmd`
**Estimated length:** 2,000-2,500 words
**Goal:** The reader should understand how LLM judges are deployed in practice across three major application areas: (a) agentic systems (verifiers, critics, self-reflection), (b) VLM evaluation (hallucination detection, image-text alignment), and (c) other domains (code, safety, summarization, reward modeling). This is the "where is it used?" section.
**Running example application:** The chatbot team extends their system into an agentic architecture with tool calls (API lookups, database queries). Now they need a judge that can verify not just the final answer but each intermediate step. They also add image support (VLM) and need to detect visual hallucinations.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Reflexion (Shinn et al. 2023) | `sources/arxiv-2303.11366/` | Full paper | Self-evaluation + verbal reflection in agents; evaluator component architecture |
| TIR-Judge (Yang et al. 2025) | `sources/arxiv-2510.23038/` | Full paper | Tool-integrated judges with code executors via RL; agentic verification |
| E-valuator (2025) | `sources/arxiv-2512.03109/` | Full paper | Sequential hypothesis testing for agent trajectory verification |
| CriticGPT (McAleese et al. 2024) | `sources/arxiv-2407.00215/` | Full paper | Trained critic for code review; human+AI teams; scalable oversight |
| BLPO (2026) | `sources/arxiv-2602.11340/` | Full paper | Multimodal judge prompt optimization; image-to-text conversion for visual evaluation |
| WildGuard (Han et al. 2024) | `sources/arxiv-2406.18495/` | Full paper | Safety judge: 13 risk categories, jailbreak detection, content moderation |
| HarmBench (Mazeika et al. 2024) | `sources/arxiv-2402.04249/` | Full paper | Standardized safety evaluation framework |
| FActScore (Min et al. 2023) | `sources/arxiv-2305.14251/` | Full paper | Atomic factuality evaluation for summarization and long-form generation |
| Let's Verify Step by Step (Lightman et al. 2023) | `sources/arxiv-2305.20050/` | Full paper | Process reward models for step-level verification in math reasoning |
| RewardBench (Lambert et al. 2024) | `sources/arxiv-2403.13787/` | Full paper | Benchmark for reward models used in RLHF alignment |
| OpenAI CriticGPT blog | `sources/openai.com/index/finding-gpt4s-mistakes-with-gpt-4/content.md` | Full post | Accessible explanation of scalable oversight motivation |
| OpenAI PRM blog | `sources/openai.com/index/improving-mathematical-reasoning-with-process-supervision/content.md` | Full post | Process vs outcome supervision explained |
| Survey (Gu et al. 2024) | `sources/arxiv-2411.15594/` | Application sections | Taxonomy of judge applications |

**Content outline:**
1. **LLM judges in agentic systems** (dedicated subsection):
   - Step-level verification: process reward models (PRM vs ORM) for math/reasoning agents
   - Trajectory evaluation: E-valuator's sequential hypothesis testing for provable monitoring
   - Tool-call correctness: TIR-Judge integrating code executors with LLM judges
   - Self-reflection and refinement: Reflexion framework (actor + evaluator + memory loop)
   - Critic-guided improvement: CriticGPT for code review, human-AI teams
2. **LLM judges for VLMs**:
   - Image-text alignment evaluation
   - Visual hallucination detection (MHALO benchmark: leading models achieve only 40.59% F1IoU)
   - Bi-level prompt optimization (BLPO) for multimodal judge context constraints
   - Self-improving VLM judges without human annotations
3. **Other application domains** (briefer treatment):
   - Safety and red-teaming: WildGuard, HarmBench, FlexGuard
   - Code generation: CodeJudge, MCTS-Judge
   - Factuality and summarization: FActScore
   - Reward modeling for RLHF: RewardBench, relationship between judges and preference optimization

**Key equations:**
- PRM objective: $\text{PRM}(x, s_1, \ldots, s_K) = \prod_{k=1}^{K} P(\text{correct} \mid x, s_1, \ldots, s_k)$
**Visualizations:**
- Source image: `sources/arxiv-2411.15594/figures/Agent_judge.png` (agent judge architecture from survey)
- D2 diagram: How LLM judges fit into an agentic loop (actor → tool → judge → memory → actor)
- Source image: `sources/arxiv-2305.20050/figures/data_interface.png` (PRM labeling interface)
**Source images to embed:** `sources/arxiv-2411.15594/figures/Agent_judge.png`, `sources/arxiv-2305.20050/figures/data_interface.png`

---

### Section 4: Prompt-Level Improvements — Engineering Better Judges {#sec-prompt-improvements}

**File:** `_04-prompt-level-improvements.qmd`
**Estimated length:** 1,800-2,200 words
**Goal:** The reader should understand how to improve LLM judge quality without changing the model itself: through prompt optimization, rubric engineering, chain-of-thought prompting, few-shot exemplars, and structured output formats. The judge is treated as a classifier whose decision boundary is shaped by its prompt.
**Running example application:** The chatbot team's GPT-4 judge gives inconsistent scores. They improve it by adding a detailed rubric, chain-of-thought reasoning, and eventually use automated prompt optimization to find the best judge prompt.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| G-Eval (Liu et al. 2023) | `sources/arxiv-2303.16634/` | Full paper | CoT + form-filling paradigm for NLG evaluation; probability weighting for scores |
| Zheng et al. 2023 (MT-Bench) | `sources/arxiv-2306.05685/` | Prompt templates section | Single-answer, pairwise, reference-guided prompt designs; CoT vs non-CoT comparison |
| Prometheus 2 (Kim et al. 2024) | `sources/arxiv-2405.01535/` | Rubric design section | Custom rubrics for evaluation; Feedback Collection dataset methodology |
| EvalPlanner (Lu et al. 2025) | `sources/arxiv-2501.18099/` | Full paper | Planning + execution separation; evaluation plan as structured intermediate output |
| BLPO (2026) | `sources/arxiv-2602.11340/` | Full paper | Bi-level prompt optimization; joint refinement of judge prompt and I2T prompt |
| FairJudge (Guo et al. 2026) | `sources/arxiv-2602.06625/` | Prompt/rubric sections | Adaptive rubric adherence; domain-specific criteria handling |
| CalibraEval (Lin et al. 2024) | `sources/arxiv-2410.15393/` | Full paper | Prediction distribution calibration as a label-free prompt-level debiasing method |
| Eugene Yan blog | `sources/eugeneyan.com/writing/llm-evaluators/content.md` | Prompt design sections | Practical prompt engineering for judges; scoring format comparison |
| Survey (Gu et al. 2024) | `sources/arxiv-2411.15594/` | Prompt engineering sections | Comprehensive overview of prompt strategies for judges |

**Content outline:**
1. The judge-as-classifier mental model: the prompt defines the decision boundary. Changing the prompt changes what the judge evaluates.
2. Chain-of-thought for judges: G-Eval's contribution. Force the judge to reason before scoring. Concrete before-and-after example.
3. Rubric engineering: from vague ("rate quality 1-5") to precise (per-score descriptions with examples). Prometheus approach to custom rubrics. How rubric specificity correlates with judge agreement.
4. Structured output formats: form-filling (G-Eval), JSON schemas, DAG-structured evaluation plans (EvalPlanner). Why structure reduces variance.
5. Few-shot exemplar selection: reference-guided scoring, calibration examples that anchor the judge's scale.
6. Automated prompt optimization for judges: BLPO (bi-level optimization for multimodal), OPRO-style meta-optimization of evaluation rubrics, DSPy-based metric engineering.
7. Prompt-level debiasing: position-swapping, CalibraEval's distribution calibration, prediction aggregation.

**Key equations:**
- G-Eval probability-weighted scoring: $\text{Score} = \sum_{s=1}^{S} s \cdot P(s \mid \text{prompt, CoT, output})$
**Visualizations:**
- Source image: `sources/arxiv-2306.05685/figures/cot_prompt.png` (CoT prompt template)
- D2 diagram: Prompt anatomy for an LLM judge (system prompt → rubric → evaluation criteria → CoT instruction → output format)
- Table: Comparison of prompt strategies (naive, rubric, CoT, structured, automated) with reliability metrics
**Source images to embed:** `sources/arxiv-2306.05685/figures/cot_prompt.png`

---

### Section 5: Model-Level Improvements — Training Better Judges {#sec-model-improvements}

**File:** `_05-model-level-improvements.qmd`
**Estimated length:** 1,800-2,200 words
**Goal:** The reader should understand how to improve LLM judges through training: fine-tuning on judge-specific data, reward model training, RLAIF/Constitutional AI feedback loops, distillation of judge capabilities into smaller models, and the relationship between judge training and preference optimization (DPO, KTO).
**Running example application:** The chatbot team finds that even the best prompt cannot make GPT-4 reliable enough for their safety evaluation. They fine-tune a smaller model (7B) as a specialized safety judge, achieving better performance at lower cost.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Prometheus 2 (Kim et al. 2024) | `sources/arxiv-2405.01535/` | Training methodology | Fine-tuning on Feedback Collection dataset; dual-format training (direct + pairwise) |
| Constitutional AI (Bai et al. 2022) | `sources/arxiv-2212.08073/` | Full paper | Two-phase training: SL self-critique + RL from AI feedback; Constitutional principles |
| CriticGPT (McAleese et al. 2024) | `sources/arxiv-2407.00215/` | Training section | RLHF training specifically for critique generation; bug-insertion methodology |
| J1: Thinking LLM-as-a-Judge (Wen et al. 2025) | `sources/arxiv-2505.10320/` | Full paper | GRPO training for thinking-judges; unified verifiable reward format |
| FairJudge (Guo et al. 2026) | `sources/arxiv-2602.06625/` | Training pipeline | Curriculum SFT → DPO → GRPO; progressive alignment for judge training |
| LoRA Judge (Luo et al. 2025) | `sources/arxiv-2506.05748/paper.txt` | Full paper | Frozen 7B + rank-16 LoRA = 96.2% RewardBench; minimal parameter adaptation |
| RewardBench (Lambert et al. 2024) | `sources/arxiv-2403.13787/` | Full paper | Benchmark for evaluating trained judges; DPO models as implicit reward models |
| AlpacaFarm (Dubois et al. 2023) | `sources/arxiv-2305.14387/` | Simulated annotator training | How simulated annotators are constructed; validation against human feedback |
| Let's Verify Step by Step (Lightman et al. 2023) | `sources/arxiv-2305.20050/` | PRM training section | Process reward model training methodology; active learning for labeling |
| Survey (Gu et al. 2024) | `sources/arxiv-2411.15594/` | Training sections | Overview of judge training approaches |
| Cameron Wolfe — "Finetuning LLM Judges" | `sources/cameronrwolfe.substack.com/p/finetuned-judge/content.md` | Full post | Deep dive into Prometheus, JudgeLM, PandaLM, AutoJ; when and how to fine-tune judges |
| Lilian Weng — "Reward Hacking in RL" | `sources/lilianweng.github.io/posts/2024-11-28-reward-hacking/content.md` | RLHF reward hacking sections | Failure modes of reward models; relevant to understanding judge training pitfalls |

**Content outline:**
1. The training spectrum: from zero-shot prompting through few-shot to full fine-tuning. When each is appropriate.
2. Fine-tuning for evaluation: Prometheus approach (SFT on curated feedback data). Data requirements, feedback collection methodology, rubric-conditioned training.
3. RL-based judge training: J1's GRPO approach (convert judgment to verifiable rewards). FairJudge's curriculum (SFT → DPO → GRPO). Why RL outperforms SFT for complex evaluation.
4. Minimal adaptation: LoRA judges (0.8% of parameters, 96.2% RewardBench). The "plug-and-play" paradigm.
5. Constitutional AI and RLAIF: the self-improvement loop. AI generates critiques of its own outputs, trains on self-revised versions. How this creates an implicit judge inside the model.
6. Reward models as judges: the DPO/KTO connection. Implicit reward models from preference training. RewardBench as the standard evaluation.
7. Distillation: training small specialized judges from large general ones. JudgeLM approach. Cost-accuracy tradeoffs.

**Key equations:**
- DPO loss as implicit reward model: $r(x, y) = \beta \log \frac{\pi_\theta(y \mid x)}{\pi_{\text{ref}}(y \mid x)}$
- GRPO objective for judge training (reference from J1 paper)
**Visualizations:**
- D2 diagram: Training pipeline comparison (SFT-only vs SFT→DPO vs SFT→DPO→GRPO curriculum)
- Source image: `sources/arxiv-2403.13787/figures/` (RewardBench results overview)
- Table: Comparison of trained judge models (Prometheus, JudgeLM, J1, FairJudge) with RewardBench scores
**Source images to embed:** Select from `sources/arxiv-2403.13787/figures/` (RewardBench leaderboard or results figure)

---

### Section 6: Inference-Time and Architectural Improvements — Scaling Judge Intelligence {#sec-inference-improvements}

**File:** `_06-inference-and-architecture.qmd`
**Estimated length:** 2,000-2,500 words
**Goal:** The reader should understand (a) how test-time compute scaling improves judgment (MCTS, tree-of-thought), (b) uncertainty quantification for judges (calibration, conformal prediction), (c) multi-agent judge panels and debate protocols, and (d) meta-evaluation: how to evaluate the evaluator. This is the frontier section.
**Running example application:** The chatbot team wants statistical guarantees on their judge's reliability. They ensemble multiple judges, use conformal prediction for uncertainty intervals, and implement a debate protocol where disagreeing judges argue and converge.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| MCTS-Judge (Chen et al. 2025) | `sources/arxiv-2502.12468/` | Full paper | Monte Carlo Tree Search for code evaluation; accuracy 41%→80%; 3x fewer tokens than o1 |
| EvalPlanner (Lu et al. 2025) | `sources/arxiv-2501.18099/` | Full paper | Planning-based evaluation; preference optimization on evaluation plans; SOTA RewardBench 93.9 |
| SCOPE (Gao et al. 2026) | `sources/arxiv-2602.13110/` | Full paper | Bidirectional Preference Entropy + conformal prediction; position-order invariance; calibrated pairwise judging |
| Trust or Escalate (Bavaresco et al. 2024) | `sources/arxiv-2407.18370/` | Full paper | Selective evaluation with provable guarantees; cascaded judges; Mistral-7B achieving >80% human agreement |
| D3: Debate, Deliberate, Decide (Li et al. 2024) | `sources/arxiv-2410.04663/` | Full paper | Adversarial multi-agent evaluation; MORE and SAMRE protocols; probabilistic proof of aggregation benefit |
| CollabEval (Xu et al. 2026) | `sources/arxiv-2603.00993/` | Full paper | Collaborative three-phase judging; strategic consensus checking |
| TIR-Judge (Yang et al. 2025) | `sources/arxiv-2510.23038/` | Full paper | Tool-integrated judges; code executor integration via RL |
| Statistical Framework for LLM Ranking (Mao et al. 2024) | `sources/arxiv-2412.18407/` | Full paper | Factored tie model for Bradley-Terry; covariance modeling; "leaderbot" package |
| LMSYS Chatbot Arena blog | `sources/lmsys.org/blog/2023-12-07-leaderboard/content.md` | Full post | Bradley-Terry transition; Elo methodology; bootstrap confidence intervals |
| RewardBench (Lambert et al. 2024) | `sources/arxiv-2403.13787/` | Meta-evaluation sections | How to evaluate reward models/judges |
| E-valuator (2025) | `sources/arxiv-2512.03109/` | Full paper | Sequential hypothesis testing for agent verification |
| Survey (Gu et al. 2024) | `sources/arxiv-2411.15594/` | Meta-evaluation + future directions | Overview of meta-evaluation approaches |
| Survey (Li et al. 2024) | `sources/arxiv-2412.05579/` | Meta-evaluation section | How to evaluate LLM judges |
| Cameron Wolfe — "Applying Statistics to LLM Evaluations" | `sources/cameronrwolfe.substack.com/p/stats-llm-evals/content.md` | Full post | Statistical rigor for evals: significance testing, bootstrap CIs, avoiding noise-as-signal |
| Nathan Lambert — "RewardBench Announcement" | `sources/interconnects.ai/p/evaluations-trust-performance-and-bfd/content.md` | Full post | RewardBench motivation, trust in evaluations, reproducibility challenges |

**Content outline:**
1. **Test-time compute scaling for judges:** MCTS-Judge (tree search for code correctness), EvalPlanner (plan-then-execute). How spending more inference compute improves judgment quality. Concrete accuracy gains.
2. **Uncertainty quantification:**
   - The calibration problem: LLM judges are overconfident (scores cluster near top of scale)
   - Conformal prediction: SCOPE's bidirectional preference entropy for provable coverage guarantees
   - Selective evaluation: "Trust or Escalate" cascade (cheap judge → expensive judge → human) with statistical guarantees
3. **Multi-agent judge panels:**
   - Simple ensembling: majority vote, mean score (and why these fail when judges share biases)
   - Debate protocols: D3 (adversarial advocates + judge), CollabEval (collaborative three-phase)
   - When debate amplifies vs reduces bias (research finding: debate amplifies bias after initial rounds, meta-judge approaches resist better)
4. **Statistical aggregation from pairwise judgments:**
   - Bradley-Terry model for converting pairwise comparisons to global rankings
   - Elo ratings in Chatbot Arena (and why BT replaced Elo)
   - Handling ties, covariance modeling, confidence intervals
5. **Meta-evaluation: evaluating the evaluator:**
   - RewardBench as a judge benchmark
   - Agreement metrics: Cohen's kappa, Spearman correlation, sample-level vs model-level agreement
   - The meta-evaluation paradox: who judges the judge of the judge?
   - Correlated errors and confounder-aware aggregation (CARE framework)

**Key equations:**
- Bradley-Terry model: $P(i \succ j) = \frac{\exp(\beta_i)}{\exp(\beta_i) + \exp(\beta_j)}$ (full derivation)
- Conformal prediction coverage guarantee: $P(Y \in C(X)) \geq 1 - \alpha$
- Bidirectional Preference Entropy: aggregating forward and reverse preference probabilities
**Visualizations:**
- D2 diagram: Multi-agent debate architecture (advocates → deliberation → judge → verdict)
- D2 diagram: Trust-or-Escalate cascade (cheap judge → confidence check → expensive judge → human)
- hvplot: Calibration curve comparing calibrated vs uncalibrated LLM judge (synthetic data)
- Source image: `sources/arxiv-2306.05685/figures/categorized_agreement.png` (agreement by category from MT-Bench)
**Source images to embed:** `sources/arxiv-2306.05685/figures/categorized_agreement.png`

---

## Source Image Catalog

**These are images from the downloaded sources that should be embedded in the chapter.**
The writing agent should copy these to `LLM-as-a-Judge/images/` and embed them in the appropriate sections.

| # | Source Image Path | Caption (from paper) | Relevant Section(s) | Notes |
|---|---|---|---|---|
| 1 | `sources/arxiv-2411.15594/figures/LLM_as_a_Judge.png` | LLM-as-a-Judge taxonomy overview | §1 Introduction | Main chapter hook image: shows full ecosystem |
| 2 | `sources/arxiv-2306.05685/figures/position_bias.png` | Position bias in pairwise comparisons | §2 Taxonomies & Biases | Shows how judges favor first/second position |
| 3 | `sources/arxiv-2306.05685/figures/verbosity_bias.png` | Verbosity bias demonstration | §2 Taxonomies & Biases | Shows preference for longer responses |
| 4 | `sources/arxiv-2306.05685/figures/categorized_agreement.png` | Agreement by category on MT-Bench | §6 Inference & Architecture | Shows variation in judge reliability across domains |
| 5 | `sources/arxiv-2306.05685/figures/cot_prompt.png` | Chain-of-thought prompt template | §4 Prompt-Level | Shows the actual CoT evaluation prompt |
| 6 | `sources/arxiv-2306.05685/figures/mt_win_rate.png` | MT-Bench win rate comparison | §1 Introduction | Shows model comparison via LLM judging |
| 7 | `sources/arxiv-2411.15594/figures/Agent_judge.png` | LLM judge in agent systems | §3 Applications | Architecture diagram for agent-judge interaction |
| 8 | `sources/arxiv-2305.20050/figures/data_interface.png` | PRM labeling interface | §3 Applications | Shows step-level human labeling for process supervision |
| 9 | `sources/arxiv-2411.15594/figures/Four_pipelines.png` | Four evaluation pipelines | §2 Taxonomies | Pointwise, pairwise, listwise, reference-based pipelines |
| 10 | `sources/arxiv-2306.05685/figures/intro_fed.png` | LMSYS evaluation flow | §1 Introduction | Overview of the evaluation challenge |
| 11 | `sources/arxiv-2411.15594/figures/fig2_LLM_as_a_Judge.png` | Detailed judge taxonomy | §2 Taxonomies | More detailed taxonomy than image #1 |

**Priority order for visuals (the writing agent should follow this):**

1. **Source images from downloaded papers** — already in `sources/`. Canonical, authoritative, and high-quality.
2. **D2 diagrams** — for concept maps, flowcharts, and structural diagrams.
3. **Python/hvPlot** — for data visualizations, distributions, and function plots.
4. **Web downloads** — for images not in sources/ (search and download during writing).
5. **generate_image** — only as a last resort for custom illustrations.

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,200-1,500 words

**Content:**
1. **Key takeaways** (7-8 bullet points covering the full chapter arc):
   - LLM-as-a-Judge arose because traditional metrics fail for open-ended generation and human annotation cannot scale
   - Judgment type matters: pairwise comparisons are more reliable than pointwise scoring but cost more
   - All LLM judges have biases (position, verbosity, self-enhancement, surface anchoring) that must be actively mitigated
   - Judges are used in agentic systems (step verification, trajectory evaluation, self-reflection), VLM evaluation, safety, code, and reward modeling
   - Prompt-level improvements (CoT, rubrics, structured output, automated optimization) can significantly improve judges without model changes
   - Training dedicated judge models (SFT, DPO, GRPO curriculum) creates smaller, cheaper, more reliable judges
   - Inference-time scaling (MCTS, planning, debate, ensembling) and statistical methods (conformal prediction, BT models) provide the frontier of judge reliability
   - Meta-evaluation remains an open challenge: who judges the judge?

2. **Completed concept map** (D2 diagram): Full LLM-as-a-Judge ecosystem connecting all sections

3. **Retrieval practice questions** (6-7 questions with answers in collapsed callout):
   - Why do pairwise comparisons tend to be more reliable than pointwise scores?
   - What is position bias, and name two strategies for mitigating it?
   - How does a process reward model differ from an outcome reward model, and when would you prefer each?
   - Describe the "Evaluation Illusion" and explain why high model-level agreement can be misleading
   - What advantage does the SFT→DPO→GRPO curriculum offer over plain SFT for judge training?
   - How does conformal prediction provide statistical guarantees for LLM judge outputs?
   - In a multi-agent debate setting for evaluation, when does debate amplify bias vs reduce it?

4. **Common mistakes section:**
   - Using pointwise Likert scoring without a detailed rubric (high variance)
   - Ignoring position bias in pairwise comparisons (not swapping response order)
   - Treating model-level agreement as proof of sample-level reliability
   - Using the same model family as judge and candidate (self-enhancement bias)
   - Assuming more judges always means better (correlated errors from shared confounders)

5. **Curated resource list** (best resources for going deeper — verified URLs only):
   - Original MT-Bench paper and codebase
   - RewardBench leaderboard and evaluation toolkit
   - Prometheus 2 model and evaluation framework
   - Eugene Yan's practical guide to LLM evaluators
   - The two survey papers (Gu et al. 2024, Li et al. 2024)

---

## Cross-Cutting Concerns

**Notation table:**

| Symbol | Definition | Valid Values | Example |
|--------|-----------|--------------|---------|
| $J$ | The LLM judge model | Any LLM (GPT-4, Claude, Prometheus, etc.) | GPT-4-turbo |
| $M$ | The candidate model being evaluated | Any LLM or VLM | A customer-support chatbot |
| $x$ | Input prompt / query | Text string | "How do I reset my password?" |
| $y, y'$ | Candidate responses from $M$ | Text (or multimodal) strings | Two different chatbot answers |
| $s$ | Scalar judgment score | Depends on scale: $\{0,1\}$ (binary), $\{1,\ldots,5\}$ (Likert), $[0,1]$ (continuous) | $s = 4$ on a 5-point scale |
| $P(y \succ y' \mid x)$ | Probability that $J$ prefers $y$ over $y'$ given $x$ | $[0, 1]$ | 0.73 |
| $\beta_i$ | Latent strength parameter in the Bradley-Terry model for item $i$ | $\mathbb{R}$ | $\beta_{\text{GPT-4}} = 1.23$ |
| $\alpha$ | Significance level for conformal prediction / error rate target | $(0, 1)$ | 0.10 |
| $r(x, y)$ | Reward signal (implicit or explicit) for response $y$ given $x$ | $\mathbb{R}$ | 2.7 |
| $K$ | Number of reasoning steps in a chain (for PRM) | $\mathbb{Z}^+$ | 8 steps in a math solution |
| $s_k$ | The $k$-th reasoning step | Text string | "Divide both sides by 3" |

**Concept map design:** A comprehensive D2 diagram connecting:
- Input layer: Prompts, responses, references, rubrics (class: input)
- Judgment types: Pointwise, pairwise, listwise, critique (class: process)
- Improvement levels: Prompt-level, model-level, inference-level (class: decision)
- Applications: Agents, VLMs, safety, code, reward modeling (class: container)
- Outputs: Scores, rankings, critiques, confidence intervals (class: output)
- Biases: Position, verbosity, self-enhancement (class: highlight, warning color)

**Prerequisite knowledge to recap:**
- What an LLM is and how instruction-following works (assumed known, brief 1-paragraph recap)
- What BLEU and ROUGE measure (brief explanation in Section 1 to motivate the chapter)
- What RLHF is at a high level (brief recap when introducing reward models in Section 5)
- The Bradley-Terry model from preference learning (introduced in Section 2, fully derived in Section 6)

**Common Misconceptions:**
1. "LLM judges are objective" — They are not. They have systematic biases (position, verbosity, self-enhancement) that must be actively measured and mitigated.
2. "High agreement between LLM judges proves reliability" — The Evaluation Illusion shows model-level agreement can reach ρ=0.99 while sample-level agreement is only r̄=0.72. Judges anchor on shared surface heuristics.
3. "A bigger model is always a better judge" — A fine-tuned 7B model with LoRA (96.2% on RewardBench) can outperform a general-purpose 70B model. Domain-specific training matters more than scale.
4. "Pairwise comparison is always better than pointwise scoring" — Pairwise is more reliable for subjective tasks but costs O(n²) comparisons. For objective tasks (factuality, safety), pointwise with a good rubric can be more efficient.
5. "More LLM judges in an ensemble always improves accuracy" — If judges share the same biases (from similar training data or model families), ensembling amplifies rather than corrects systematic errors.

**Think Hard questions:**
1. If an LLM judge's biases are systematic (not random), can you ever fully correct them through statistical aggregation alone, or do you need a fundamentally different kind of judge?
2. The "meta-evaluation" problem: to validate an LLM judge, you compare it to human judgments. But human judgments are noisy and expensive. At what point does the LLM judge become *better* than the human baseline it was validated against?
3. Process reward models provide step-level feedback, but training them requires step-level human labels (PRM800K). Is there a way to get the benefits of process supervision without the labeling cost?
4. Constitutional AI creates a self-improving loop where the model critiques and revises its own outputs. What prevents this loop from converging to a fixed point that satisfies the constitution's letter but not its spirit?
5. As LLM judges are used to train other LLMs (RLAIF, reward modeling), the distinction between "judge" and "model" blurs. What are the risks of this recursive dependency?

**Math Background assessment:**
This chapter is not heavily mathematical. The main mathematical concepts used are:
- Bradley-Terry model (Section 6): derived from scratch in the chapter
- Conformal prediction basics (Section 6): explained conceptually with the coverage guarantee equation
- DPO loss / implicit reward (Section 5): referenced with equation, connected to existing chapter on preference learning
- Cohen's kappa (Section 2): briefly defined for agreement measurement

All concepts are either derived in the chapter or explained inline. **Math Background appendix: not needed.**
