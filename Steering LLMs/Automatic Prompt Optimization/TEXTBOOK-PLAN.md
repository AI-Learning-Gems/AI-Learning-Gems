# TEXTBOOK-PLAN: LLM Prompt Optimization — From Textual Gradients to Multi-Objective Evolution

## User Query
> I want to understand the latest textual gradient algorithms (TextGrad), LLM-as-an-Optimizer (OPRO), variants like GPO ("Unleashing" paper at AAAI 2025) and newer algorithms for LLM prompt optimization like GEPA. Trace the history from latest algorithms back through 2026, 2025, 2024, 2023, 2022. Explain how they work in mathematical detail, high intuition and the reported performance improvements. Have a dedicated section JUST on multi-objective prompt optimization (which I think GEPA is? I am not sure) which should also cover NSGA-II, MOPO and others. Make sure you cover seminal research work from 2025, 2024, 2023, 2022 and also have a section on the latest prompt optimization frameworks and whether any of them cover multi-objective optimization.

**Topic:** Automatic Prompt Optimization for Large Language Models  
**Prior Knowledge:** Strong ML/NLP background; familiar with LLMs, gradient descent, evolutionary algorithms; no specific knowledge of prompt optimization algorithms  
**Learning Goals:** Deep mathematical understanding of all major prompt optimization algorithms (2022–2026), their intuitions, performance, and especially multi-objective approaches  
**Target Depth:** Graduate / Researcher  
**Output Folder:** `Automatic Prompt Optimization/Automatic Prompt Optimization`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (23 sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [APE: Large Language Models Are Human-Level Prompt Engineers](https://arxiv.org/abs/2211.01910) | [ACADEMIC] | `sources/arxiv-2211.01910/` | Nov 2022 | 2026-02-28 | KEY: Foundational work — frames prompt optimization as black-box search; LLM proposes instructions, adaptive filtering selects best. ICLR 2023. |
| 2 | [OPRO: Large Language Models as Optimizers](https://arxiv.org/abs/2309.03409) | [ACADEMIC] | `sources/arxiv-2309.03409/` | Sep 2023 | 2026-02-28 | KEY: LLM-as-optimizer paradigm — meta-prompt with trajectory of (solution, score) pairs; up to 8% on GSM8K, 50% on BBH over baselines. ICLR 2024. |
| 3 | [ProTeGi: Automatic Prompt Optimization with "Gradient Descent" and Beam Search](https://aclanthology.org/2023.emnlp-main.494/) | [ACADEMIC] | `sources/arxiv-2305.03495/` | May 2023 | 2026-02-28 | KEY: First "textual gradient" method — LLM critiques prompt on minibatches, edits in opposite semantic direction; up to 31% improvement. EMNLP 2023. |
| 4 | [EvoPrompt: Connecting LLMs with Evolutionary Algorithms](https://arxiv.org/abs/2309.08532) | [ACADEMIC] | `sources/arxiv-2309.08532/` | Sep 2023 | 2026-02-28 | KEY: LLM as GA/DE operator on prompts — population-based evolution with crossover and mutation; up to 25% on BBH. ICLR 2024. |
| 5 | [PromptAgent: Strategic Planning with Language Models](https://arxiv.org/abs/2310.16427) | [ACADEMIC] | `sources/arxiv-2310.16427/` | Oct 2023 | 2026-02-28 | KEY: Monte Carlo Tree Search for prompt optimization — treats it as planning problem; 6–9% over baselines on 12 tasks. ICLR 2024. |
| 6 | [InstructZero: Efficient Instruction Optimization for Black-Box LLMs](https://arxiv.org/abs/2306.03082) | [ACADEMIC] | `sources/arxiv-2306.03082/` | Jun 2023 | 2026-02-28 | KEY: Bayesian optimization in soft-prompt space to generate instructions for black-box LLMs; best on all 32 BIG-Bench tasks. ICML 2024. |
| 7 | [DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines](https://arxiv.org/abs/2310.03714) | [ACADEMIC] | `sources/arxiv-2310.03714/` | Oct 2023 | 2026-02-28 | KEY: Programming framework for LM pipelines — signatures, modules, teleprompters; bootstrap few-shot + instruction optimization. |
| 8 | [TextGrad: Automatic "Differentiation" via Text](https://arxiv.org/abs/2406.07496) | [ACADEMIC] | `sources/arxiv-2406.07496/` | Jun 2024 | 2026-02-28 | KEY: PyTorch-like framework for textual backpropagation — chain rule via LLM feedback; 20% gain on LeetCode-Hard, 51%→55% on GPQA. |
| 9 | [GPO: Unleashing the Potential of LLMs as Prompt Optimizers](https://arxiv.org/abs/2402.17564) | [ACADEMIC] | `sources/arxiv-2402.17564/` | Feb 2024 | 2026-02-28 | KEY: Gradient-inspired optimizer — trajectory retrieval for update direction, cosine-decay edit distance; up to 56.8% on BBH, 62.6% on MMLU. AAAI 2025. |
| 10 | [MIPRO: Optimizing Instructions and Demonstrations for Multi-Stage LM Programs](https://arxiv.org/abs/2406.11695) | [ACADEMIC] | `sources/arxiv-2406.11695/` | Jun 2024 | 2026-02-28 | KEY: Bayesian optimization (TPE) over instructions + demonstrations for multi-stage pipelines; up to 13% improvement. Released as MIPROv2 in DSPy. |
| 11 | [TRACE: Optimization with Trace Oracle](https://arxiv.org/abs/2406.16218) | [ACADEMIC] | `sources/arxiv-2406.16218/` | Jun 2024 | 2026-02-28 | KEY: Execution traces as optimization signal — OPTO framework generalizing autodiff to heterogeneous workflows. NeurIPS 2024. |
| 12 | [SAMMO: Symbolic Prompt Program Search](https://arxiv.org/abs/2404.02319) | [ACADEMIC] | `sources/arxiv-2404.02319/` | Apr 2024 | 2026-02-28 | KEY: Structure-aware multi-objective prompt optimization — symbolic representation enables structural transformations. Microsoft. |
| 13 | [EMO-Prompts: Evolutionary Multi-Objective Optimization of LLM Prompts](https://arxiv.org/abs/2401.09862) | [ACADEMIC] | `sources/arxiv-2401.09862/` | Jan 2024 | 2026-02-28 | KEY: First NSGA-II/SMS-EMOA application to prompt optimization — balances conflicting sentiment objectives; HVI up to 0.45. |
| 14 | [MORL-Prompt: Multi-Objective RL for Discrete Prompt Optimization](https://arxiv.org/abs/2402.11711) | [ACADEMIC] | `sources/arxiv-2402.11711/` | Feb 2024 | 2026-02-28 | KEY: Identifies "objective collapse" in scalarized RL; proposes HVI and product-of-rewards as multi-objective alternatives. EMNLP 2024 Findings. |
| 15 | [MOPO: Multi-Objective Prompt Optimization for Affective Text Generation](https://arxiv.org/abs/2412.12948) | [ACADEMIC] | `sources/arxiv-2412.12948/` | Dec 2024 | 2026-02-28 | KEY: Three-layer prompt architecture with NSGA-II; up to 34pp improvement; only 1–2pp loss per objective vs single-objective. COLING 2025. |
| 16 | [ParetoPrompt: Pareto Prompt Optimization](https://openreview.net/forum?id=HGCk5aaSvE) | [ACADEMIC] | N/A (OpenReview only) | 2024 | 2026-02-28 | KEY: RL-based multi-objective prompt optimization using dominance relationships; explores full Pareto front without scalarization. ICLR 2025. |
| 17 | [GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning](https://arxiv.org/abs/2507.19457) | [ACADEMIC] | `sources/arxiv-2507.19457/` | Jul 2025 | 2026-02-28 | KEY: Genetic-Pareto algorithm — reflection on execution traces + Pareto selection; outperforms GRPO by 6–20%, MIPROv2 by 10%+, 35× fewer rollouts. ICLR 2026 Oral. |
| 18 | [A Systematic Survey of Automatic Prompt Optimization Techniques](https://arxiv.org/abs/2502.16923) | [ACADEMIC] | `sources/arxiv-2502.16923/` | Feb 2025 | 2026-02-28 | KEY: 5-part APO taxonomy — seed initialization, candidate generation, inference/feedback, iteration depth, filter/retain. EMNLP 2025. |
| 19 | [DSPy Optimizers Documentation](https://dspy.ai/learn/optimization/optimizers/) | [TUTORIAL] | N/A | 2025 | 2026-02-28 | KEY: Lists all DSPy optimizers — BootstrapFewShot, MIPROv2, GEPA, SIMBA, BetterTogether; guidance on when to use each. |
| 20 | [GEPA optimize_anything Blog](https://gepa-ai.github.io/gepa/blog/2026/02/18/introducing-optimize-anything/) | [TUTORIAL] | N/A | Feb 2026 | 2026-02-28 | KEY: Universal text optimization API — 3 modes (single-task, multi-task, generalization); Pareto-efficient search + ASI; results across 8 domains. |
| 21 | [HiveMind: Contribution-Guided Online Prompt Optimization of LLM Multi-Agent Systems](https://arxiv.org/abs/2512.06432) | [ACADEMIC] | `sources/arxiv-2512.06432/` | Dec 2025 | 2026-02-28 | KEY: Shapley-value credit assignment for multi-agent prompt optimization; DAG-Shapley reduces LLM calls 80%+. AAAI 2026. |
| 22 | [BLPO: Bi-Level Prompt Optimization for Multimodal LLM-as-a-Judge](https://arxiv.org/abs/2602.11340) | [ACADEMIC] | `sources/arxiv-2602.11340/` | Feb 2026 | 2026-02-28 | KEY: Joint optimization of judge prompt + image-to-text conversion prompt for multimodal evaluation. |
| 23 | [MPO: Multimodal Prompt Optimization](https://arxiv.org/abs/2510.09201) | [ACADEMIC] | `sources/arxiv-2510.09201/` | Oct 2025 | 2026-02-28 | KEY: Unified framework optimizing text + visual prompts jointly across images, video, molecules. ICLR 2026 submission. |

:::

---

## Chapter Overview

**Total sections:** 7 (plus closing)  
**Estimated total length:** 13,000–15,000 words  
**Running example:** A team at a healthcare AI startup trying to optimize a clinical triage prompt that must simultaneously be accurate, safe, and concise — a natural multi-objective problem. Each section revisits this example to ground abstract algorithms in a concrete, high-stakes use case.

### Hook & Running Example Design

Imagine you're an ML engineer at a healthcare AI startup. Your team built a clinical triage chatbot that reads patient symptoms and assigns urgency levels. The zero-shot prompt works — sometimes. On Monday it correctly flags chest pain as urgent; on Tuesday it misses a textbook stroke presentation. Your PM asks: "Can't you just write a better prompt?" You try. After two weeks of manual iteration, you've tested 47 prompt variants. Some improve accuracy but make responses dangerously verbose. Others are concise but miss edge cases. You realize three things: (1) the space of possible prompts is vast and your manual search barely scratches the surface, (2) improving one quality (accuracy) often degrades another (safety, conciseness), and (3) what works for GPT-4 may not transfer to the cheaper model you need for production.

This is the prompt optimization problem — and it turns out that the same mathematical machinery that powers gradient descent, evolutionary algorithms, and multi-objective optimization can be adapted to search this space automatically. Over the past four years (2022–2026), researchers have developed increasingly sophisticated algorithms that treat prompts as parameters to be optimized, feedback as gradients, and LLMs themselves as both the system being optimized and the optimizer doing the searching.

Our clinical triage example will thread through every section. In Section 1, we'll formalize what it means to "optimize a prompt." In Section 2, we'll see how early methods like APE and OPRO would generate and score candidate triage instructions. In Section 3, we'll watch TextGrad compute "textual gradients" — natural language critiques that tell us *why* a triage prompt fails and *how* to fix it. In Section 4, evolutionary methods like EvoPrompt and GPO will maintain populations of triage prompts, crossing and mutating them like organisms. In Section 5, we'll finally confront the multi-objective nature of clinical triage — accuracy vs. safety vs. conciseness — using NSGA-II, MOPO, ParetoPrompt, and GEPA to find Pareto-optimal prompt sets. In Section 6, we'll explore how these algorithms apply to frontier use cases: multi-agent systems (where our triage bot becomes part of a larger clinical pipeline with credit assignment challenges), LLM-as-a-Judge evaluation, and vision-language prompt tuning. In Section 7, we'll survey the production frameworks (DSPy, TextGrad, GEPA's optimize_anything) that package these algorithms for real-world deployment.

**Hook Image:** The APO survey taxonomy diagram from `sources/arxiv-2502.16923/system-diagram.png` — a tree showing the full landscape of prompt optimization techniques. This orients the reader immediately to the breadth of the field before diving into individual algorithms.

---

## Section Plan

### Section 1: The Prompt Optimization Problem — Why Prompts Need Algorithms {#sec-problem}

**File:** `_01-the-prompt-optimization-problem.qmd`  
**Estimated length:** 1,500–1,800 words  
**Goal:** Formalize the prompt optimization problem mathematically; explain why it's hard (discrete, non-differentiable, high-dimensional); introduce the APO taxonomy as a roadmap for the chapter.  
**Running example application:** The clinical triage prompt is introduced as a concrete optimization target. We show how small prompt changes cause large accuracy swings (sensitivity), motivating the need for automated optimization.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| APO Survey | `sources/arxiv-2502.16923/` | `submission.tex` §1–§2, Fig 1 | Formal APO definition, 5-part taxonomy tree, sensitivity examples |
| OPRO Paper | `sources/arxiv-2309.03409/` | `intro.tex`, `approach.tex` | Mathematical formulation p* = argmax accuracy |
| GPO Paper | `sources/arxiv-2402.17564/` | `sections/` method intro | Formal optimization objective with expectation |

**Content outline:**
1. **The sensitivity problem** — concrete example: "Let's think step by step" vs "Take a deep breath and work on this problem step-by-step" yields 8% accuracy difference on GSM8K (cite OPRO). Applied to triage: rephrasing "Assess urgency" to "Carefully evaluate symptom severity and assign triage level" changes accuracy from 72% to 84%.
2. **Brief recap: optimization and gradient descent** — Since prompt optimization borrows heavily from optimization theory, briefly ground the reader. Objective function L(θ), gradient ∇L, update rule θ ← θ - α∇L. The optimization landscape metaphor: valleys (optima), ridges (saddle points), plateaus. Contrast: in weight optimization, θ ∈ ℝ^n is continuous and L is differentiable; in prompt optimization, p ∈ text-space is discrete and F is non-differentiable. This contrast motivates every algorithm in the chapter — they each find creative ways to approximate or circumvent the missing gradient.
3. **Formal problem statement** — define p* = argmax_{p} E_{(x,y)~D}[F(M(x;p), y)]. Explain each component: prompt space P (discrete, combinatorial), task model M, metric F, dataset D. Introduce the optimizer model M_O (used in most algorithms) as distinct from the task model M_T. The feedback function F(y, x) can return scalar scores, natural language critiques, or structured diagnostics — and the richness of this feedback is a key differentiator among methods. **Expand the search space taxonomy**: (a) Discrete Prompt Optimization (DPO) — natural language tokens, (b) Continuous Prompt Optimization (CPO) — learnable embedding vectors, (c) Hybrid Prompt Optimization (HPO) — combining both (e.g., KAPT uses discrete knowledge descriptions + continuous context vectors). Note that the scoring function F can itself be a *learned reward model* R_φ trained on human preferences (briefly; detailed in §2), a CLIP score, a task-specific metric, or even a pairwise LLM comparison.
4. **Why it's hard** — (a) discrete search space (no gradients), (b) non-differentiable objectives (accuracy is 0/1), (c) sensitivity to surface form, (d) expensive evaluation (each candidate requires LLM inference), (e) prompt-model coupling (optimal prompt depends on the LLM), (f) the "blindfolded optimizer" problem — without directional feedback, you're taking random steps on the optimization landscape (this motivates textual gradients in §3), (g) **reward hacking / over-optimization** — prompts can exploit weaknesses in the scoring function rather than genuinely improving quality (analogous to reward hacking in RLHF; mitigated by KL regularization and information bottlenecks like InfoRM), (h) **inverse scaling** — counterintuitively, prompt optimization effectiveness can *decrease* for larger, more capable models, because these models are already better at following ambiguous instructions.
5. **The APO taxonomy** — introduce the 5-part framework from the EMNLP 2025 survey as a roadmap: seed initialization → candidate generation → inference & feedback → iteration depth → filter & retain. Each subsequent section maps onto this taxonomy. **Convergence observation**: all paradigms (EA, RL, gradient, LLM-as-Optimizer) are increasingly converging on using LLMs as the core subroutine — the question shifts from "which algorithm?" to "what is the best meta-prompt for each optimization step?" (and from "optimize a single prompt" to "optimize the cognitive architecture of the agent itself," per §6).
6. **Four paradigms preview** — generate-and-select (§2), gradient-inspired (§3), evolutionary/search (§4), and the orthogonal dimension of single- vs multi-objective (§5). Note that these paradigms form a progression from "no feedback" (APE) to "scalar feedback" (OPRO) to "directional feedback" (TextGrad) to "population-based exploration" (EvoPrompt) — each addressing a limitation of the previous approach.

**Key equations:**
- Weight optimization: θ ← θ - α∇_θ L(θ) (continuous, differentiable)
- Prompt optimization: p* = argmax_{p ∈ P} E_{(x,y)~D}[F(M_T(x; p), y)] (discrete, non-differentiable)
- Accuracy score: S(p) = (1/N) Σ 𝟙{M(p,x_i) = y_i}
- Feedback function: F(y, x) → {scalar score, natural language critique, structured diagnostics}

**Visualizations:**
- D2 diagram: The 5-part APO taxonomy tree (recreated from survey)
- Table: Timeline of major prompt optimization papers (2022–2026) with method, paradigm, venue, key result

**Source images to embed:**
- `sources/arxiv-2502.16923/system-diagram.png` — APO taxonomy tree from the EMNLP 2025 survey

**Self-explanation prompts:**
- "Why can't we simply use gradient descent to optimize prompts, the way we optimize neural network weights?"
- "If the prompt space is discrete and infinite, how do the algorithms we'll study manage to find good prompts efficiently?"

---

### Section 2: Generate-and-Select — The First Wave (APE, OPRO, InstructZero) {#sec-first-wave}

**File:** `_02-generate-and-select.qmd`  
**Estimated length:** 1,800–2,000 words  
**Goal:** Explain the first generation of prompt optimization algorithms (2022–2023) that use LLMs to propose candidate prompts and score-based selection to find the best ones. Cover APE, OPRO, and InstructZero in mathematical detail.  
**Running example application:** APE generates 50 candidate triage instructions; OPRO iteratively refines them using a meta-prompt that tracks the best-scoring triage prompts so far; InstructZero uses Bayesian optimization to guide the search efficiently.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| APE Paper | `sources/arxiv-2211.01910/` | `3-method.tex` | Forward/reverse proposal modes, adaptive filtering, log-prob scoring |
| OPRO Paper | `sources/arxiv-2309.03409/` | `approach.tex`, `application.tex` | Meta-prompt structure (3 components), algorithm loop, ascending sort trick, GSM8K results |
| InstructZero Paper | `sources/arxiv-2306.03082/` | `sections/` method | Bayesian optimization in soft-prompt space, instruction-coupled kernel |

**Content outline:**
1. **APE: The foundation (Nov 2022)** — LLM proposes instructions from demonstrations (forward mode: infer instruction; reverse mode: infill). Multi-stage adaptive filtering as tournament selection. Key insight: prompts are programs to be synthesized. Results: matches human prompts on 19–21 of 24 tasks.
2. **Self-Refine: The simplest feedback loop** — Before OPRO, Self-Refine (Madaan et al. 2023) showed that LLMs can iteratively improve their own outputs: generate → self-critique → refine. The loop: y_0 = L(p,x), e_0 = L("critique", y_0), y_1 = L(p, x, y_0, e_0). This is output-level refinement, not prompt-level — but it establishes the key principle that LLM-generated feedback (even from the same model) drives optimization. Limitation: the prompt itself doesn't change; only the output does. This motivates OPRO.
3. **OPRO: LLM-as-Optimizer (Sep 2023)** — The meta-prompt as an optimization interface. Three components: meta-instructions (orange), trajectory history sorted ascending (blue), task exemplars (purple). Algorithm: generate 8 candidates per step at temperature 1.0, evaluate, update trajectory, repeat for 200 steps. The "Take a deep breath" discovery (80.2% on GSM8K vs 71.8% baseline). Mathematical formulation in detail. Key advance over APE: iterative refinement with memory of what worked.
4. **SPO: Reference-free optimization** — A significant limitation of APE/OPRO is requiring labeled ground truth for scoring. SPO overcomes this via pairwise LLM comparison: given two outputs from two candidate prompts, an LLM judge simply picks the better one. This enables prompt optimization for open-ended tasks (creative writing, summarization) where no ground truth exists. Connection to LLM-as-a-Judge (§6).
5. **InstructZero: Bayesian meets prompting (Jun 2023)** — The indirection trick: optimize soft prompts on an open-source LLM to generate instructions for a black-box LLM. Bayesian optimization with instruction-coupled kernel navigates the continuous proxy space. Best on all 32 BIG-Bench tasks.
6. **Preference-based prompt optimization (brief)** — Reward models trained on human preference data (Bradley-Terry model) can replace accuracy as the scoring function: P* = argmax_P E_y[R_φ(P,x,y)]. This connects prompt optimization to the RLHF pipeline — the prompt is optimized to maximize a learned reward rather than ground-truth accuracy. Brief treatment: the reader should understand that *any* scoring function F in the APO formulation can be a learned reward model, not just accuracy. **BPO (Black-Box Prompt Optimization)** takes this further by pre-training a dedicated lightweight prompt-rewriting model on preference data (original→optimized prompt pairs). This amortizes the optimization cost: instead of iterative search at inference time, BPO learns a *function* from bad prompts to good ones. Example: "Write a story ending with 'Are they really happy?'" → BPO rewrites to add "Ensure the story ends with the question without providing a response." Conceptually distinct from iterative methods (APE, OPRO) — it is a *learned rewriter* rather than a search algorithm.
7. **Comparative analysis** — APE is one-shot proposal + filter; Self-Refine is iterative output refinement; OPRO is iterative prompt refinement with trajectory memory; SPO drops the ground-truth requirement; InstructZero uses a continuous proxy; BPO learns a rewriting function; preference-based methods use learned rewards. Each represents a progressively richer feedback signal. The progression mirrors classical optimization: from random search (APE) → hill-climbing with memory (OPRO) → Bayesian surrogate (InstructZero) → amortized learned optimization (BPO).

**Key equations:**
- APE: ρ* = argmax_ρ E_{(Q,A)}[f(ρ, Q, A)] with f as execution accuracy or log probability
- OPRO: p* = argmax_p S(p) where S(p) = (1/N)Σ 𝟙{M_θ(p,x_i) = y_i}; meta-prompt = {meta-instructions} ∪ {trajectory sorted ascending} ∪ {task exemplars}
- InstructZero: optimize soft prompt z via BO to maximize accuracy of instruction I(z) on black-box LLM

**Visualizations:**
- D2 diagram: The OPRO optimization loop (meta-prompt → LLM → candidates → evaluation → trajectory update)
- Table: Head-to-head comparison of APE vs OPRO vs InstructZero (search strategy, requires gradient access?, sample efficiency, best reported result)

**Source images to embed:**
- `sources/arxiv-2305.03495/mainfig.png` — ProTeGi main figure (showing the textual gradient concept; serves as a bridge to Section 3)

**Self-explanation prompts:**
- "In OPRO, why are past solutions sorted in ascending order (worst to best) in the meta-prompt? What cognitive bias in LLMs does this exploit?"
- "What is the key advantage of InstructZero's approach of optimizing in a continuous soft-prompt space rather than directly in discrete instruction space?"

---

### Section 3: Textual Gradients — Backpropagation in Natural Language (ProTeGi, TextGrad, TRACE) {#sec-textual-gradients}

**File:** `_03-textual-gradients.qmd`  
**Estimated length:** 2,000–2,200 words  
**Goal:** Explain the "textual gradient" paradigm in mathematical depth — how natural language feedback from LLMs can function as gradients for optimization. Cover ProTeGi, TextGrad, and TRACE, showing increasing generality.  
**Running example application:** TextGrad computes a "gradient" on the triage prompt by asking an LLM to critique misclassified cases: "The prompt failed to flag this stroke case because it lacks instructions about neurological symptoms." The TGD optimizer then rewrites the prompt to incorporate this feedback.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| ProTeGi Paper | `sources/arxiv-2305.03495/` | `emnlp2023.tex` full | Minibatch textual gradients, beam search, bandit selection, 31% improvement |
| TextGrad Paper | `sources/arxiv-2406.07496/` | `sections/` method + experiments | Computation graph, Variables, chain rule via text, TGD optimizer, full analogy table, results |
| TRACE Paper | `sources/arxiv-2406.16218/` | `opto.tex`, `optimizer.tex` | OPTO formulation, trace oracle, OptoPrime, minimal subgraph propagator |

**Content outline:**
1. **Brief recap: the gradient problem** — In neural networks, ∇_θ L tells us exactly how to adjust each weight. In prompt optimization, the "parameters" are discrete tokens — no continuous gradient exists. This section traces three creative solutions to this fundamental problem, each building on the last: (a) bypass the problem via continuous proxies (soft prompts), (b) approximate discrete gradients (shortcut methods), (c) replace numerical gradients with natural language feedback (textual gradients). Frame this as a progression from "borrowing" gradients to "reinventing" them.
2. **Soft prompts: Continuous proxy optimization (background)** — Before textual gradients, researchers optimized continuous embedding vectors prepended to the input: c* = argmin_{c ∈ ℝ^{d×L}} E[ℓ(f(x;c), y)]. Standard gradient descent applies directly since c is continuous. Limitation: requires model weight access, produces uninterpretable prompts. Brief mention of CoOp/CoCoOp for VLMs (detailed in §6). This sets up the question: can we get gradient-like optimization for *human-readable* prompts via API-only access?
3. **Shortcut gradients: GReaTer, GCG, and PEZ** — Methods that compute approximate gradients on discrete prompts by exploiting model internals: (a) GReaTer computes task loss over intermediate reasoning steps rather than final answer, getting richer gradient signal for chain-of-thought optimization. (b) GCG uses gradients to identify which token positions to change and which replacement tokens are best (greedy coordinate-wise). (c) PEZ projects gradients from continuous soft-prompt space onto discrete vocabulary embeddings, producing readable tokens. All require white-box access but produce discrete, readable prompts. Useful context for understanding what TextGrad is trying to achieve *without* model access.
4. **ProTeGi: The pioneer (May 2023)** — Minibatch of training examples → LLM generates "gradient" (critique of current prompt) → edit prompt in "opposite semantic direction" → beam search over candidate edits → UCB-based bandit selection to allocate evaluation budget. The three sources of candidate diversity: (a) multiple failures per minibatch generate distinct gradients, (b) stochastic LLM sampling generates multiple edits per gradient, (c) beam search maintains W parallel optimization paths. Up to 31% improvement. Formalize using notation from existing ProTeGi doc: ρ^(k) for prompt at step k, g^(k) for textual gradient, c^(k) for minibatch score, B for batch size, W for beam width. Limitation: flat computation graph (single prompt → single LLM call).
5. **TextGrad: Backpropagation for compound AI (Jun 2024)** — Full analogy table: Variables ↔ Tensors, Functions ↔ Ops, Loss ↔ TextLoss, Gradients ↔ Criticisms, Chain Rule ↔ recursive LLM feedback. Mathematical chain rule: ∂L/∂v = ∪_{w∈Succ(v)} ∇_f(v, w, ∂L/∂w). TGD optimizer: x_new = LLM("Here is variable {x} and criticisms {∂L/∂x}. Produce improved variable."). Key advance over ProTeGi: handles compound systems with multiple interacting components. Results: GPQA 51%→55%, LeetCode-Hard 0.26→0.36, prompt optimization matches DSPy.
6. **TRACE: The generalization (Jun 2024)** — OPTO framework: (Θ, ω, T) where T is a trace oracle returning execution DAG + feedback. OptoPrime converts trace subgraph to pseudo-code for LLM reasoning. Key insight: execution traces carry richer signal than input-output pairs alone — the optimizer sees *which step* failed and *how*. This is the "Actionable Side Information" (ASI) concept that GEPA later formalizes.
7. **The gradient taxonomy** — Summarize the spectrum: soft prompts (real gradients, continuous, uninterpretable) → shortcut gradients (approximate real gradients, discrete, white-box) → textual gradients (LLM-generated critiques, discrete, black-box). Each trades off interpretability, model access requirements, and optimization fidelity. The field has converged on textual gradients as the most practical paradigm for API-based LLM optimization.

**Key equations:**
- TextGrad chain rule: ∂L/∂v = ∪_{w ∈ Successors(v)} ∇_f(v, w, ∂L/∂w)
- TGD update: x_new = TGD.step(x, ∂L/∂x) ≜ LLM("Criticisms on {x}: {∂L/∂x}. Produce improved {x}.")
- TRACE OPTO: τ = (f, g) where g is execution DAG, f is feedback; optimizer updates θ using τ

**Visualizations:**
- Side-by-side comparison table: Numerical gradient descent vs Textual gradient descent (8 rows: Variables, Functions, Loss, Gradients, Backprop, Update rule, Batch optimization, Constraints)
- D2 diagram: TextGrad computation graph for the triage example (Input → LLM Triage → Output → TextLoss → backward pass)

**Source images to embed:**
- `sources/arxiv-2305.03495/mainfig.png` — ProTeGi overview: the textual gradient pipeline
- `sources/arxiv-2305.03495/gd.png` — ProTeGi's gradient descent analogy diagram
- `sources/arxiv-2406.16218/figures/mw_figures.png` — TRACE MetaWorld robot optimization (showing breadth of OPTO)

**Self-explanation prompts:**
- "TextGrad's chain rule produces natural language 'gradients' at each node. How does this compare to numerical chain rule? What information is preserved or lost?"
- "Why does TRACE claim to subsume neural network backpropagation? What would the trace oracle look like for a standard neural network?"

---

### Section 4: Evolutionary and Search-Based Optimization (EvoPrompt, PromptBreeder, GPO, PromptAgent) {#sec-evolutionary}

**File:** `_04-evolutionary-and-search.qmd`  
**Estimated length:** 1,800–2,000 words  
**Goal:** Cover evolutionary algorithms and strategic search methods for prompt optimization. Explain how population-based methods explore the prompt space differently from gradient-inspired approaches, with mathematical detail on EvoPrompt's GA/DE operators, PromptBreeder's self-referential evolution, GPO's gradient-inspired trajectory retrieval, and PromptAgent's MCTS.  
**Running example application:** EvoPrompt maintains a population of 10 triage prompts, crosses the best-performing ones (accuracy champion × safety champion), and mutates offspring. GPO retrieves the most semantically similar past triage prompts to guide refinement. PromptAgent uses MCTS to plan a sequence of prompt refinements, looking ahead to avoid local optima.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| EvoPrompt Paper | `sources/arxiv-2309.08532/` | `3method.tex` | GA operators (roulette selection, LLM crossover, LLM mutation), DE operators (difference → mutation → crossover), results |
| PromptBreeder Paper | `sources/arxiv-2310.03714/` | `sections/` method | Self-referential mutation (task-prompts + mutation-prompts co-evolve), 9 mutation operators |
| GPO Paper | `sources/arxiv-2402.17564/` | `sections/` method | Gradient-optimizer analogy, relevance-based trajectory retrieval, cosine-decay edit distance, generation vs editing refinement |
| PromptAgent Paper | `sources/arxiv-2310.16427/` | `main.tex` method section | MCTS formulation (state=prompt, action=refinement, reward=accuracy), error-feedback-driven exploration |

**Content outline:**
1. **Brief recap: evolutionary algorithms** — Population of candidate solutions, fitness evaluation, selection, crossover, mutation, repeat. Key advantage over gradient methods: explores diverse regions of the search space simultaneously rather than following a single path. In prompt space, this means maintaining multiple *qualitatively different* prompts and combining their strengths. Contrast with textual gradients (§3) which refine a single prompt along one trajectory.
2. **EvoPrompt: LLM as evolutionary operator (Sep 2023)** — Two instantiations: (a) GA with roulette wheel selection, LLM crossover ("merge these two prompts"), LLM mutation ("alter this prompt randomly"), top-N survival. (b) DE adapting y = a + F(b-c) to natural language: LLM identifies differences between two prompts, mutates them, incorporates into base prompt. Population of N prompts, T generations. Up to 25% on BBH.
3. **PromptBreeder: Self-referential evolution (Oct 2023)** — The meta-level innovation: not just evolving task-prompts, but also evolving the mutation-prompts that govern how task-prompts change. Nine mutation operators including zero-order estimation, first-order estimation, lineage-based, and hyper-mutation. Outperforms CoT and Plan-and-Solve on arithmetic and commonsense reasoning. ICLR 2024.
4. **RLPrompt and classical metaheuristics** — Frame prompt optimization as RL: a small policy network (MLP on frozen DistilGPT-2) generates discrete prompt tokens (action), the frozen target LLM is the environment, and task performance is the reward. Trained via soft Q-learning. **Key surprising finding**: RL-discovered prompts are often ungrammatical gibberish ("thou WhereasYe WhereasOY") that nevertheless dramatically improve task performance — a form of "machine language" that programs the model's behavior through its discrete input interface. These prompts are surprisingly transferable across model architectures despite being uninterpretable. This deepens the interpretability-performance trade-off: the most effective prompts may not be human-readable. **Simulated Annealing (Plum)**: Classical metaheuristics also apply — Plum uses SA with Metropolis-Hastings acceptance: P(accept) = exp(-ΔE/T) where T decreases over iterations, allowing early exploration of worse solutions. Conceptually distinct from EA/MCTS/RL — SA is a single-trajectory method with stochastic acceptance, often simpler to implement.
5. **GPO: Gradient-inspired prompt optimization (Feb 2024)** — Systematic analogy table from the paper: update direction ↔ gradient+momentum (relevance-based trajectory retrieval using BGE embeddings selects the most *semantically similar* past prompts as demonstrations, not just the most recent), update method ↔ learning rate (cosine-decay edit distance constraint: d_max(t) = d_max · cos(πt/2T) gradually reduces allowed changes, balancing exploration→exploitation). Key ablation findings that challenge conventional wisdom: (a) reflection *hurts* (LLMs have limited self-reflection), (b) trajectory retrieval beats recency (+15%), (c) generation beats editing (+36%), (d) cosine decay beats fixed/linear (+10%). AAAI 2025.
6. **PromptAgent: Planning as optimization (Oct 2023)** — MCTS formulation: states are prompts, actions are refinements based on error analysis, rewards are task accuracy. UCT selection balances exploration/exploitation: UCT = Q(s,a)/N(s,a) + c√(ln N(s)/N(s,a)). Iteratively examines errors, generates feedback, refines prompts, simulates future rewards. 6–9% improvement on 12 tasks. ICLR 2024.
7. **Comparative analysis** — Population-based (EvoPrompt, PromptBreeder) vs trajectory-based (GPO) vs tree-search (PromptAgent) vs RL-based (RLPrompt). Trade-offs: diversity of exploration vs. depth of refinement vs. computational cost vs. interpretability. GPO's ablation results suggest the field has been over-indexing on reflection and under-indexing on trajectory memory.

**Key equations:**
- EvoPrompt GA: p_i' = Evo(p_{r1}, p_{r2}) via LLM crossover+mutation; selection probability ∝ s_i / Σs_j
- EvoPrompt DE: y = a + F(b-c) in language space → 4-step LLM process
- GPO: p* = argmax_{p~M_O} E_{(x,y)∈D}[F(M_T(x;p), y)]; edit distance constraint with cosine decay: d_max(t) = d_max · cos(πt / 2T)
- PromptAgent MCTS: UCT = Q(s,a)/N(s,a) + c√(ln N(s)/N(s,a))

**Visualizations:**
- D2 diagram: Side-by-side comparison of GA vs DE prompt evolution (showing crossover/mutation flow)
- Table: Method comparison — EvoPrompt vs PromptBreeder vs GPO vs PromptAgent (search type, population?, self-referential?, key innovation, best result)

**Source images to embed:**
- `sources/arxiv-2310.16427/Figures/eval_converge_plots/Standard/bigbench_causal_judgement.png` — PromptAgent convergence curve showing MCTS exploration
- `sources/arxiv-2305.03495/curves.png` — ProTeGi optimization curves (comparison baseline)

**Self-explanation prompts:**
- "In GPO, why does relevance-based trajectory retrieval outperform recency-based retrieval? What does this tell us about the structure of the prompt optimization landscape?"
- "PromptBreeder evolves both task-prompts and mutation-prompts. Why is this self-referential approach powerful? What are the risks of meta-level evolution?"

---

### Section 5: Multi-Objective Prompt Optimization (NSGA-II, MOPO, MORL-Prompt, ParetoPrompt, GEPA) {#sec-multi-objective}

**File:** `_05-multi-objective-prompt-optimization.qmd`  
**Estimated length:** 2,200–2,500 words  
**Goal:** Dedicated deep-dive into multi-objective prompt optimization. Cover the motivation (real-world prompts must balance competing objectives), the mathematical foundations (Pareto dominance, NSGA-II, hypervolume indicator), and all major methods: EMO-Prompts, MORL-Prompt, MOPO, SAMMO, ParetoPrompt, and GEPA. Clarify that GEPA uses Pareto selection but is primarily a single-objective optimizer with per-instance Pareto fronts, while MOPO/ParetoPrompt are truly multi-objective.  
**Running example application:** The clinical triage prompt must optimize three competing objectives: accuracy (correct urgency classification), safety (never under-triages critical cases), and conciseness (fits in context window, fast inference). Single-objective optimization of accuracy alone produces verbose prompts that miss safety edge cases. We show how NSGA-II, MOPO, ParetoPrompt, and GEPA each handle this trade-off differently.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| EMO-Prompts Paper | `sources/arxiv-2401.09862/` | `paper.tex` full | NSGA-II/SMS-EMOA for prompts, HVI metric, conflicting sentiment objectives, LLM as evolutionary operator |
| MORL-Prompt Paper | `sources/arxiv-2402.11711/` | `main.tex` full | Objective collapse problem, HVI reward, product-of-rewards, MGDA, soft Q-learning |
| MOPO Paper | `sources/arxiv-2412.12948/` | `acl_latex.tex` full | Three-layer prompt architecture, NSGA-II with co-evolving operator prompts, 34pp improvement |
| ParetoPrompt | N/A (OpenReview) | N/A | RL-based, dominance relationships, preference-based loss, no scalarization |
| GEPA Paper | `sources/arxiv-2507.19457/` | `gepa_main_algorithm.tex`, `gepa_description.tex` | Pareto-based candidate selection (Algorithm 2), per-instance Pareto front, frequency-weighted sampling |
| SAMMO Paper | `sources/arxiv-2404.02319/` | `main.tex` method | Structure-aware multi-objective metaprompt optimization, symbolic prompt representation |

**Content outline:**
1. **Why single-objective isn't enough** — The clinical triage example: optimizing accuracy alone produces a prompt that's 500 tokens long and misses safety constraints. Real-world objectives conflict: accuracy vs. safety vs. conciseness vs. cost vs. latency. Formally: f: P → ℝ^m with m ≥ 2 competing objectives.
2. **Brief recap: multi-objective optimization foundations** — Since many readers know MOO conceptually but need a reminder of the formalism: Pareto dominance (a ≻ b iff ∀i f_i(a) ≥ f_i(b) ∧ ∃j f_j(a) > f_j(b)), Pareto front as the set of non-dominated solutions, hypervolume indicator H(S) as the standard quality measure. Three classical approaches: (a) weighted sum scalarization F = Σ w_i f_i (simple but misses non-convex Pareto regions), (b) epsilon-constraint (maximize f_j subject to f_i ≥ ε_i), (c) evolutionary: NSGA-II (fast non-dominated sorting + crowding distance for diversity). Include the car-buying analogy (minimize cost, maximize mileage) as a quick motivating example before applying to prompts.
3. **Gradient conflicts in multi-objective settings** — When objectives conflict, their "gradients" (whether numerical or textual) point in opposing directions. The "perfect storm" of destructive interference requires three conditions: (a) conflicting gradient directions (cosine similarity < 0), (b) magnitude imbalance (one objective dominates), (c) high curvature (small changes cause large objective swings). In prompt optimization, this manifests as: improving accuracy-focused phrasing degrades conciseness, and vice versa. MGDA (Multiple Gradient Descent Algorithm) finds the minimum-norm vector in the convex hull of per-objective gradients — the direction that improves all objectives simultaneously. Brief treatment of how PCGrad and CAGrad address this for neural weights, and note that the analogous problem in textual gradient space remains underexplored.
3. **EMO-Prompts: NSGA-II for prompts (Jan 2024)** — First to apply classical MOEAs to prompt optimization. LLM (Llama 2 7B) as crossover/mutation operator. Two conflicting sentiment objectives. NSGA-II vs SMS-EMOA comparison: NSGA-II more consistent, SMS-EMOA occasionally higher peaks. HVI up to 0.45 (exceeding theoretical 0.44 ideal).
4. **MORL-Prompt: The objective collapse problem (Feb 2024)** — Key insight: averaging rewards in RL-based prompt optimization causes "objective collapse" — one objective dominates while others are sacrificed. Three alternatives: (a) HVI as RL reward (volume of dominated space), (b) product of rewards (robust to outliers), (c) MGDA (find gradient direction improving all objectives). Product of rewards is most effective. Application to style transfer and machine translation with 3 competing rewards each.
5. **MOPO: Three-layer evolutionary architecture (Dec 2024)** — Layer 1: task prompts (optimization target), Layer 2: operator prompts (co-optimized crossover/mutation instructions), Layer 3: fixed meta-prompts. NSGA-II selection preserving top-n per objective + Pareto front. Up to 34pp improvement over seed; only 1–2pp loss per objective vs single-objective optimization. COLING 2025.
6. **ParetoPrompt: RL on the Pareto front (ICLR 2025)** — Preference-based RL: train policy model using dominance relationships as preference signal. No scalarization needed — directly explores the Pareto front. Robust when training and test metrics differ.
7. **GEPA's Pareto selection: A hybrid approach (ICLR 2026)** — GEPA is primarily a single-metric optimizer but uses per-instance Pareto fronts for candidate selection. Algorithm 2: for each validation instance, find best-scoring candidates → collect unique candidates → prune dominated → frequency-weighted stochastic sampling. This isn't multi-objective in the traditional sense (multiple competing metrics) but rather multi-instance diversity preservation. Clarify the distinction. GEPA's `optimize_anything` API does support true multi-objective via the `scores` field in ASI.
8. **Taxonomy and comparison** — Table comparing all 6 methods across: optimization paradigm (evolutionary/RL/hybrid), number of objectives, Pareto exploration strategy, application domain, key result.

**Key equations:**
- Pareto dominance: a ≻ b iff ∀i f_i(a) ≥ f_i(b) ∧ ∃j f_j(a) > f_j(b)
- Hypervolume: H(S) = Λ({q ∈ ℝ^d | ∃p ∈ S: q ≤ p ∧ p_ref ≤ q})
- Weighted sum scalarization: F(p) = Σ w_i f_i(p) (limitation: misses non-convex Pareto regions)
- NSGA-II crowding distance: I[i]_distance = Σ_m (f_m[i+1] - f_m[i-1]) / (f_m^max - f_m^min)
- Gradient cosine similarity (conflict metric): cos(φ_{ij}) = g_i · g_j / (||g_i|| ||g_j||)
- MGDA: find d = argmin ||d||² s.t. d ∈ conv(g_1,...,g_m) — the direction improving all objectives
- MORL-Prompt product reward: R_prod = E[Π_i r_i(y,x)]
- GEPA Pareto selection: P(Φ) ∝ f[Φ] where f[Φ] = |{i : Φ ∈ P*[i]}|

**Visualizations:**
- D2 diagram: Pareto front for the triage example (accuracy vs safety vs conciseness) showing dominated and non-dominated solutions
- Table: Comprehensive comparison of EMO-Prompts vs MORL-Prompt vs MOPO vs ParetoPrompt vs GEPA (paradigm, #objectives, Pareto strategy, domain, key result)

**Source images to embed:**
- `sources/arxiv-2402.11711/figures/model_outline.png` — MORL-Prompt architecture showing the multi-objective RL pipeline
- `sources/arxiv-2402.11711/figures/hvi-over-time.png` — Hypervolume indicator convergence over training
- `sources/arxiv-2402.11711/figures/tst_style_content.png` — Style vs content trade-off in style transfer (visualizing objective collapse)
- `sources/arxiv-2412.12948/Plot_per_emotion.png` — MOPO per-emotion optimization trajectories

**Self-explanation prompts:**
- "Why does scalarization (weighted sum of objectives) fail to find all Pareto-optimal solutions? Draw a concave Pareto front and show which solutions scalarization misses."
- "GEPA uses 'per-instance Pareto fronts' while MOPO uses 'per-objective Pareto fronts.' What's the difference, and when would each be more appropriate?"

---

### Section 6: Applications — Agents, Judges, and Multimodal Prompt Tuning {#sec-applications}

**File:** `_06-applications.qmd`  
**Estimated length:** 2,500–3,000 words  
**Goal:** Show how prompt optimization algorithms from §2–§5 apply to three frontier use cases — each posing mathematical challenges that extend the standard single-prompt formulation p* = argmax F(M(x;p), y). Cover: (1) multi-agent/agentic systems with credit assignment, (2) LLM-as-a-Judge with rubric optimization, (3) vision-language and multimodal prompt tuning. For each, formalize how the problem differs mathematically from the standard formulation and survey the prominent strategies proposed to address these differences.  
**Running example application:** The clinical triage system evolves from a single prompt into a full agentic pipeline: a symptom extractor, a triage classifier, a safety checker, and a physician-facing explanation generator. Each module has its own prompt. When the system misclassifies a patient, *which prompt is at fault*? This is the credit assignment problem. Separately, the team uses an LLM-as-a-Judge to evaluate triage quality, and must optimize the judge's evaluation rubric. Finally, a radiologist wants to add chest X-ray interpretation via a vision-language model, requiring multimodal prompt tuning.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| HiveMind Paper | `sources/arxiv-2512.06432/` | Full | DAG-Shapley credit assignment, CG-OPO for multi-agent prompt optimization |
| BLPO Paper | `sources/arxiv-2602.11340/` | `paper.tex` | Bi-level prompt optimization for multimodal LLM-as-a-Judge |
| MPO Paper | `sources/arxiv-2510.09201/` | `main.tex`, `Sections/` | Multimodal prompt optimization across text/image/video/molecular modalities |
| GEPA Paper | `sources/arxiv-2507.19457/` | Agent/ARC-AGI sections | GEPA optimize_anything for agent architecture evolution |
| TRACE Paper | `sources/arxiv-2406.16218/` | `experiments.tex` | TRACE for heterogeneous workflow optimization including agent systems |
| DSPy Paper | `sources/arxiv-2310.03714/` | Agent sections | DSPy ReAct agent optimization with MIPROv2/GEPA |
| MIPRO Paper | `sources/arxiv-2406.11695/` | Full | Multi-stage pipeline optimization (the foundation for agent optimization) |
| TextGrad Paper | `sources/arxiv-2406.07496/` | Molecule + treatment plan sections | TextGrad applied to non-NLP domains (molecules, radiotherapy) |

**Content outline:**

1. **The multi-prompt challenge** — Transition from single-prompt optimization (p* = argmax F) to multi-prompt optimization where the system Φ has modules M_1,...,M_k each with its own prompt π_i. The compound optimization problem: ⟨π_1*,...,π_k*⟩ = argmax E[μ(Φ(x; π_1,...,π_k), m)]. This is fundamentally harder because: (a) the search space is exponentially larger (product of per-module prompt spaces), (b) prompts interact non-linearly (a good triage prompt may need a specific explanation prompt to work well), (c) credit assignment is ambiguous (end-to-end failure could be any module's fault).

2. **Agentic systems: Credit assignment and DAG optimization** — When agents interact in non-sequential DAG structures (e.g., a retriever feeds a reasoner which feeds a checker), optimizing all prompts jointly is intractable. The key insight from the "Agentic Systems" research doc: modifying an agent's prompting *pattern* (ReAct, CoT, ReWOO) is equivalent to modifying its cognitive architecture — so prompt optimization becomes *automated architecture search*. Approaches decompose along two axes — **Planner optimization** (high-level reasoning and tool selection) vs **Executor optimization** (precise tool invocation and formatting):
   - **MIPRO/DSPy approach**: Bayesian optimization treats each module's prompt as an independent variable, uses TPE surrogate to search the joint space. Works for small pipelines (2–5 modules) but struggles with complex DAGs.
   - **TRACE approach**: Full execution trace provides per-module feedback via minimal subgraph propagation. The optimizer sees *which* module's output caused the failure.
   - **HiveMind/Shapley approach (AAAI 2026)**: Quantify each agent's marginal contribution using Shapley values: φ_i = Σ_{S⊆N\{i}} [|S|!(|N|-|S|-1)!/|N|!] · [v(S∪{i}) - v(S)]. DAG-Shapley prunes non-viable coalitions by exploiting DAG structure, reducing LLM calls by 80%+. Underperforming agents get targeted prompt refinement.
   - **Mass (Multi-Agent System Search)**: Three-stage optimization: block-level prompt tuning → workflow topology search → joint system-level tuning. A structured approach to the intractable joint optimization problem.
   - **GEPA optimize_anything for agents**: Treats the entire agent system (code + prompts + control flow) as a single text artifact. The ARC-AGI case: evolves a 10-line stub into a 300+ line agent achieving 89.5% accuracy (vs 32.5% baseline). This is *architecture search*, not just prompt optimization.
   - **MMGRPO**: Multi-module GRPO groups LM calls by module across rollouts, handling variable-length agent trajectories. Combined with automatic prompt optimization, +11% accuracy.
   - **Tool description optimization**: Agent tool names and descriptions are themselves prompt optimization targets — Play2Prompt generates tool documentation data-free by letting the system "play" with tools to discover input-output mappings.

3. **LLM-as-a-Judge: Optimizing evaluation prompts** — LLM-as-a-Judge uses an LLM to evaluate outputs, often for classification (good/bad, 1-5 rating). The judge prompt is itself a prompt optimization target: p_judge* = argmax_{p} Corr(Judge(p, x), Human(x)). Key challenges: (a) the objective is alignment with human judgment, not task accuracy, (b) judges must be robust across domains and models, (c) multi-criteria evaluation (helpfulness, safety, style) is inherently multi-objective.
   - **BLPO (Feb 2026)**: Bi-level optimization for multimodal judges — jointly optimizes the judge prompt AND the image-to-text conversion prompt, addressing context window limits.
   - **SedarEval**: Self-adaptive rubrics customized per question rather than generic rubrics, mimicking human examination processes.
   - **Connection to multi-objective optimization (§5)**: Judge evaluation with multiple criteria (accuracy, safety, helpfulness) maps directly to the MOPO/ParetoPrompt framework. Each criterion is an objective; the Pareto front gives rubric configurations trading off criteria.

4. **Vision-language and multimodal prompt tuning** — Extension from text-only to multimodal optimization. Two paradigms:
   - **Soft/continuous prompt tuning (CoOp, CoCoOp, VPT)**: Learn continuous embedding vectors optimized via backpropagation. Mathematical formulation: optimize c* = argmin_{c ∈ ℝ^{d×L}} E[ℓ(f(x; c), y)] where c is a sequence of L learnable d-dimensional vectors prepended to the input. Key difference from discrete APO: operates in continuous space, uses actual gradients, but produces uninterpretable prompts. CoCoOp extends this by making prompts instance-conditional: c_i = c + h_θ(x_i), where a small network generates per-input adjustments. Multi-modal prompting tunes *both* textual and visual soft prompts simultaneously, addressing the **modality gap** — the structural disparity between vision and text embeddings in the shared CLIP-like space. Effective VLM prompts must act as "bridges" compensating for this imperfect alignment, which is why joint text+visual tuning consistently outperforms text-only tuning.
   - **Discrete/hard prompt optimization for MLLMs (MPO, ICLR 2026 submission)**: Extends discrete prompt optimization to multimodal inputs — optimizes text prompts AND visual prompts jointly. Uses alignment-preserving updates and Bayesian selection across images, videos, and molecular data.
   - **The Base-to-New Trade-off (BNT): A defining multi-objective problem** — When a VLM like CLIP is adapted via prompt tuning on "base" classes (e.g., 16 examples each of 10 flower species), the prompts overfit to these seen classes. Performance on unseen "new" classes (e.g., birds, cars) degrades — the prompt "forgets" the model's general pre-trained knowledge. This creates a classic Pareto conflict: max(Accuracy_base) vs max(Accuracy_new). Nearly all advanced VLM prompt tuning research addresses this trade-off. Three solution families:
     - *Ensembling general + specific*: Treat hand-crafted prompts ("a photo of a [CLASS]") and learned soft prompts as two "views," optimize mutual information between them to blend general and task-specific knowledge. KAPT combines discrete Wikipedia-sourced descriptions with continuous context vectors.
     - *Regularization*: CoPrompt adds a consistency loss anchoring learned prompt representations to the frozen pre-trained encoder, preventing excessive drift. This is the prompt-optimization analogue of weight decay in neural networks.
     - *Architectural decoupling (DPC)*: Clone the learnable prompt into two copies — one optimized for base classes, one for generalization — with separate gradient flows. This avoids the conflict where gradients for the two objectives point in opposite directions.
   - **Internal representation shift and RPO (Read-only Prompt Optimization)** — A subtle failure mode: standard prompt tuning corrupts the frozen VLM's pre-trained representations because learned prompt tokens interact with original tokens via self-attention. RPO fixes this with masked attention: prompts can *read* from original tokens but original tokens cannot *attend to* prompts. This one-way information flow lets prompts adapt to the task without degrading the model's general capabilities. Key insight: naive soft prompt optimization can be self-defeating — you optimize the prompt but simultaneously degrade the model's ability to use it.
   - **Key mathematical contrast**: Soft prompt tuning (CoOp) solves a continuous optimization problem with real gradients; discrete APO (OPRO, TextGrad) solves a combinatorial problem with textual "gradients." The choice depends on whether you have model access (soft) or only API access (discrete). The BNT adds a second dimension: even with model access, the optimization must navigate a Pareto front between specialization and generalization.

5. **Other application domains** — Briefly survey additional domains where prompt optimization has demonstrated significant impact:
   - **Code generation**: TextGrad achieves 20% relative improvement on LeetCode-Hard; GEPA optimize_anything generates CUDA kernels matching or beating baselines on 87% of KernelBench problems.
   - **Scientific discovery**: TextGrad designs drug-like molecules with competitive binding affinity; optimizes radiotherapy treatment plans surpassing clinician-designed plans.
   - **RAG systems**: DSPy/MIPROv2 optimizes multi-stage RAG pipelines (retriever prompt + reader prompt); SAMMO compresses and restructures retrieval-augmented prompts.
   - **Mathematical reasoning**: GEPA improves GPT-4.1-mini from 46.67% to 60% on AIME 2025 through pure prompt optimization.
   - **Key insight**: Each domain introduces domain-specific evaluation signals (compiler errors for code, docking scores for molecules, retrieval relevance for RAG) that serve as richer feedback than generic accuracy — explaining why trace-aware methods (TRACE, GEPA with ASI) excel in these settings.

**Key equations:**
- Multi-prompt optimization: ⟨π_1*,...,π_k*⟩ = argmax_{π_1,...,π_k} E_{(x,m)~T}[μ(Φ(x; π_1,...,π_k), m)]
- Shapley value for agent i: φ_i(v) = Σ_{S⊆N\{i}} [|S|!(|N|-|S|-1)!/|N|!] · [v(S∪{i}) - v(S)]
- Judge optimization: p_judge* = argmax_{p} Σ_i Corr(Judge(p, x_i), Human(x_i))
- BLPO bi-level: min_{p_judge} L_outer(p_judge, p_i2t*(p_judge)) s.t. p_i2t*(p_judge) = argmin_{p_i2t} L_inner(p_judge, p_i2t)
- Soft prompt optimization (CoOp): c* = argmin_{c ∈ ℝ^{d×L}} E_{(x,y)}[ℓ(f(x; c), y)]
- CoCoOp extension: c_i = c + h_θ(x_i) where h_θ is a learned instance-conditional network
- Base-to-New Trade-off: max Accuracy_base(c) vs max Accuracy_new(c) — a Pareto conflict
- Consistency regularization: L_total = L_task(c) + λ · D(f_prompted(x; c), f_frozen(x)) — anchoring to pre-trained representations

**Visualizations:**
- D2 diagram: The clinical triage pipeline as a DAG showing credit assignment challenge (symptom extractor → triage classifier → safety checker → explanation generator, with Shapley values annotated on each edge)
- D2 diagram: Soft prompt tuning vs discrete prompt optimization — architectural comparison showing where learnable parameters live in each paradigm (continuous embeddings prepended to input vs. text instructions in system prompt)
- Table: Application domain comparison — for each domain (agents, judges, multimodal, code, science, RAG), what is the optimization target, what feedback signal is available, which methods work best, and what is the key mathematical distinction from standard APO

**Source images to embed:**
- `sources/arxiv-2512.06432/Hivemind.png` — HiveMind multi-agent prompt optimization architecture with DAG-Shapley credit assignment
- `sources/arxiv-2507.19457/manual_figures/npueval_gepa_prompt.png` — GEPA prompt optimization for NPU kernels (showing non-NLP application)

**Self-explanation prompts:**
- "In a 4-module agent pipeline, why can't we simply optimize each module's prompt independently? What kind of interactions between modules make joint optimization necessary?"
- "Soft prompt tuning (CoOp) uses real gradients while TextGrad uses textual 'gradients.' Under what conditions would you prefer each approach, and what are the fundamental trade-offs?"
- "LLM-as-a-Judge optimization targets alignment with human judgment rather than task accuracy. How does this change the optimization landscape compared to standard prompt optimization?"
- "The Base-to-New Trade-off in VLMs is a Pareto conflict between specialization and generalization. RPO solves this by making prompts 'read-only' via masked attention. Why does preventing original tokens from attending to prompt tokens preserve generalization? What information flow does this protect?"

---

### Section 7: Frameworks and the State of the Art {#sec-frameworks}

**File:** `_07-frameworks-and-state-of-art.qmd`  
**Estimated length:** 1,800–2,200 words  
**Goal:** Survey the production-ready frameworks for prompt optimization as of 2026. For each framework, explain the core abstraction (programming paradigm, autodiff paradigm, execution-trace paradigm, universal optimizer paradigm), supported optimization algorithms, multi-objective and multi-agent support, and practical guidance on when to use which. Conclude with a decision guide.  
**Running example application:** The triage team evaluates frameworks for their now-complex system: DSPy for the multi-step pipeline (symptom extraction → triage classification → explanation), TextGrad for instance-level refinement of hard triage cases, TRACE for the heterogeneous workflow that mixes LLM calls with rule-based safety checks, and GEPA's optimize_anything for end-to-end optimization of the entire agent architecture.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DSPy Paper | `sources/arxiv-2310.03714/` | Full | Signatures, modules, teleprompters, BootstrapFewShot, compilation |
| MIPRO Paper | `sources/arxiv-2406.11695/` | Full | TPE-based Bayesian optimization, 3-stage pipeline, grounded proposal |
| DSPy Docs | N/A | Optimizers page | Full list of optimizers including GEPA, SIMBA, BetterTogether |
| GEPA optimize_anything | N/A (blog) | Full blog post | 3 modes, ASI, Pareto-efficient search, 8 case studies |
| TextGrad Paper | `sources/arxiv-2406.07496/` | Framework section | PyTorch-like API, Variable, TextLoss, TGD |
| TRACE Paper | `sources/arxiv-2406.16218/` | `usage.tex`, `code.tex` | OPTO API, node/bundle primitives, OptoPrime |
| SAMMO Paper | `sources/arxiv-2404.02319/` | Full | Symbolic prompt programs, structural transformations |

**Content outline:**

1. **DSPy + MIPROv2: The programming paradigm** — Signatures as typed interfaces (e.g., `"question -> answer"`), modules as composable building blocks (`Predict`, `ChainOfThought`, `ReAct`), teleprompters as compilers. MIPROv2's 3-stage optimization: (a) bootstrap demonstrations from training data via rejection sampling, (b) grounded instruction proposals analyzing program code + data + traces, (c) Bayesian surrogate search using Tree-structured Parzen Estimator (TPE) to search the joint instruction-demonstration space. Key strengths: optimizes entire multi-stage pipelines, not just single prompts; 13% accuracy improvement. Full optimizer ecosystem: BootstrapFewShot, BootstrapFewShotWithRandomSearch, KNNFewShot, COPRO, SIMBA, BetterTogether (meta-optimizer combining prompt + weight optimization). When to use: multi-step pipelines with 200+ training examples.

2. **TextGrad: The autodiff paradigm** — PyTorch-like API: `Variable` (trainable text), `TextLoss` (natural language objective), `TGD` optimizer. Define computation graph → forward pass → backward pass (textual chain rule) → TGD update step. Strengths: instance-level optimization (refine a specific code solution, molecule, treatment plan at test time), natural for compound AI systems where components interact. Limitations: each backward pass requires O(n) LLM calls for n edges; single-loss only (no native multi-objective). When to use: test-time refinement of individual hard cases; optimizing domain-specific artifacts (molecules, code, treatment plans).

3. **TRACE: The execution-trace paradigm** — OPTO as a general optimization abstraction: (Θ, ω, T) where T is the trace oracle. Two Python primitives: `node` (wraps objects as graph nodes, optionally trainable) and `@bundle` (decorator turning methods into operators). OptoPrime converts execution trace subgraph to pseudo-code, prompts LLM with ReAct-CoT for reasoning about the graph. Handles heterogeneous parameters (prompts + code + hyperparameters). Strengths: richest optimization signal of any framework (full execution DAG). When to use: complex workflows where failures need root-cause analysis across heterogeneous components.

4. **GEPA + optimize_anything: The universal optimizer (2025–2026)** — Three unified modes under one declarative API:
   - *Single-task search*: Solve one hard problem (circle packing, blackbox optimization)
   - *Multi-task search*: Solve related problems with cross-task transfer (CUDA kernels — improvements on one kernel transfer to others)
   - *Generalization*: Build skills that transfer to unseen examples (prompt optimization for AIME math, agent architecture discovery for ARC-AGI)
   - ASI (Actionable Side Information) as a first-class concept: diagnostic feedback the LLM reads during reflection — compiler errors, profiler traces, rendered images, structured scores.
   - Pareto-efficient search: per-task/metric Pareto frontier preserves candidates that excel at different things.
   - DSPy integration as `dspy.GEPA`: captures execution traces, identifies predictor behavior, proposes improvements.
   - Results: ARC-AGI 32.5%→89.5%, AIME 46.67%→60%, cloud scheduling 40% cost reduction, CUDA kernels 87% match/beat baseline.
   - When to use: any text optimization problem, especially when evaluation provides rich diagnostic feedback.

5. **PromptWizard, PhaseEvo, C-MOP, and emerging methods** — PromptWizard (Microsoft, ACL 2025 Findings): 4-stage self-evolving mechanism (mutate → score → critique → synthesize), joint instruction + example optimization, self-generated chain-of-thought steps. Improvements across 45 tasks with reduced API calls. PhaseEvo: multi-phase evolutionary combining LLM mutation with global search proficiency, evaluated on 35 benchmark tasks. C-MOP (Feb 2026): boundary-aware contrastive sampling + momentum-guided semantic clustering; enables 3B-parameter models to surpass larger domain-specific systems by 1.58–3.35%. **IAPO (Inference-Aware Prompt Optimization)**: jointly optimizes prompt AND inference configuration (temperature, Best-of-N sampling, top-p) — expanding the optimization problem beyond prompt text to include deployment parameters. This is a practical consideration often missed: the same prompt performs differently at temperature 0 vs 0.7.

6. **Multi-objective and multi-agent support comparison** — Table: which frameworks support multi-objective optimization and multi-agent/pipeline optimization?
   - DSPy/MIPROv2: single-metric, but multi-stage pipeline support via module-wise optimization; GEPA integration adds Pareto.
   - TextGrad: single-loss, compound AI graph support, no native multi-objective.
   - TRACE: single feedback, arbitrary workflow graphs, heterogeneous parameters.
   - GEPA optimize_anything: Pareto-efficient search + scores in ASI; multi-task mode enables cross-problem transfer; agent architecture evolution.
   - SAMMO: structure-aware multi-objective; symbolic prompt transformations.
   - PromptWizard: single-metric, single-prompt focus.

7. **Decision guide** — Flowchart and summary table:
   - Single prompt vs multi-stage pipeline? → Single: OPRO/GPO/EvoPrompt. Pipeline: DSPy/MIPROv2 or TRACE.
   - How much training data? → <10 examples: BootstrapFewShot. 10–200: BootstrapFewShotWithRandomSearch. 200+: MIPROv2. Any: GEPA.
   - Single vs multi-objective? → Single: any. Multi: GEPA, SAMMO, or MOPO with custom NSGA-II.
   - Instance-level vs prompt-level? → Instance (test-time): TextGrad. Prompt (compile-time): DSPy, GEPA.
   - Need to optimize code/architecture too? → GEPA optimize_anything or TRACE.
   - Budget for LLM calls? → Low (<100): BootstrapFewShot. Medium (100–1000): GEPA. High (1000+): MIPROv2 heavy mode.

**Key equations:**
- MIPROv2 TPE: model p(config | score > threshold) and p(config | score ≤ threshold), select configs maximizing their ratio (Expected Improvement)
- GEPA budget constraint: ⟨Π*, Θ*⟩ = argmax E[μ(Φ(x; ⟨Π,Θ⟩), m)] s.t. #rollouts ≤ B
- TRACE subgraph propagation complexity: O(WN² log N) time, O(WN) space

**Visualizations:**
- Table: Framework comparison matrix (DSPy/MIPROv2, TextGrad, TRACE, GEPA, PromptWizard, SAMMO) across dimensions: core abstraction, optimization target, search strategy, multi-objective?, agent/pipeline support?, multimodal?, open-source?, key use case, best-for scenario
- D2 diagram: Decision flowchart for selecting the right prompt optimization framework (branching on the 6 decision criteria above)

**Source images to embed:**
- `sources/arxiv-2404.02319/figures/overview.png` — SAMMO symbolic prompt program overview showing structural transformations
- `sources/arxiv-2404.02319/figures/headroom.png` — SAMMO headroom analysis showing where structural changes matter most

**Self-explanation prompts:**
- "DSPy optimizes demonstrations (few-shot examples) while TextGrad optimizes instructions. When would each approach be more effective, and why?"
- "GEPA's optimize_anything claims to subsume prompt optimization, code optimization, and agent architecture search under one API. What makes this possible? What are the limitations?"
- "The decision guide recommends different frameworks for different scenarios. Can you think of a use case that doesn't fit neatly into any of the recommended paths?"

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`  
**Estimated length:** 1,000–1,200 words

**Content:**

1. **Key takeaways (8 bullets):**
   - Prompt optimization is a well-defined optimization problem: p* = argmax E[F(M(x;p), y)], but the discrete, non-differentiable nature makes it fundamentally different from weight optimization.
   - Three paradigms have emerged: generate-and-select (APE, OPRO), textual gradients (ProTeGi, TextGrad, TRACE), and evolutionary/search (EvoPrompt, GPO, PromptBreeder, PromptAgent).
   - Textual gradients are the natural language analogue of numerical gradients — they provide rich, interpretable directional feedback via LLM critique.
   - GPO's key insight: trajectory retrieval beats reflection; generation beats editing; cosine decay controls exploration-exploitation.
   - Multi-objective prompt optimization is essential for real-world applications where accuracy, safety, cost, and other metrics compete. NSGA-II, hypervolume indicator, and Pareto-based selection are the core tools.
   - GEPA (ICLR 2026) represents the current state of the art: reflection on execution traces + Pareto-efficient candidate selection, outperforming both RL (GRPO) and prior prompt optimizers (MIPROv2) with dramatically fewer rollouts.
   - Multi-agent systems require credit assignment (Shapley values) to identify which module's prompt to optimize. LLM-as-a-Judge evaluation is itself a prompt optimization target (optimize the judge's rubric). Multimodal prompt tuning extends the formulation from discrete text to continuous embeddings or joint text-visual optimization.
   - The field is converging toward general-purpose text optimization (GEPA's optimize_anything) that subsumes prompts, code, agent architectures, and configurations under one API.

2. **Concept map** — D2 diagram showing: APE (2022) → OPRO, ProTeGi, EvoPrompt (2023) → TextGrad, GPO, InstructZero, PromptAgent, PromptBreeder (2023–2024) → MIPRO, TRACE, SAMMO, EMO-Prompts, MORL-Prompt (2024) → ParetoPrompt, MOPO, PromptWizard (2024–2025) → GEPA (2025–2026). Application branches: HiveMind/SHARP (multi-agent), BLPO/SedarEval (LLM-as-Judge), MPO/CoOp (multimodal). Color-coded by paradigm. Show relationships (e.g., TextGrad extends ProTeGi; GEPA builds on evolutionary + Pareto ideas; HiveMind adds Shapley credit to OPRO-style optimization).

3. **Retrieval practice questions (7):**
   - Q1: Explain the three components of OPRO's meta-prompt and why solutions are sorted ascending.
   - Q2: Write out TextGrad's chain rule for a two-step computation graph and explain how it differs from numerical backpropagation.
   - Q3: What is "objective collapse" in multi-objective prompt optimization, and which methods address it?
   - Q4: Compare GPO's relevance-based trajectory retrieval with OPRO's full-history approach. Why does GPO's approach work better?
   - Q5: Explain GEPA's Pareto-based candidate selection algorithm (Algorithm 2). Why is frequency-weighted stochastic sampling used instead of deterministic selection?
   - Q6: When would you choose DSPy/MIPROv2 over TextGrad for prompt optimization? Give a concrete scenario for each.
   - Q7: Design a multi-objective prompt optimization setup for a customer service chatbot that must balance helpfulness, brand voice consistency, and response length. Which algorithm would you choose and why?
   - Q8: In a multi-agent system with 4 modules, explain why Shapley-based credit assignment is preferred over simply comparing each module's output individually. What information does the Shapley value capture that per-module evaluation misses?

4. **Common mistakes section:**
   - Mistake: "I can just use a single accuracy metric for prompt optimization." Reality: real-world prompts must balance multiple objectives; single-metric optimization often degrades other important qualities.
   - Mistake: "More iterations always produce better prompts." Reality: diminishing returns; OPRO's best result came at step 107 of 200; over-optimization can lead to overfitting to the training distribution.
   - Mistake: "TextGrad computes actual mathematical gradients." Reality: textual gradients are natural language critiques that are *analogous* to gradients but operate in a fundamentally different (discrete, semantic) space.
   - Mistake: "GEPA is a multi-objective optimizer." Clarification: GEPA uses Pareto selection for per-instance diversity, but its primary mode is single-metric optimization. True multi-objective requires methods like MOPO or ParetoPrompt with explicit competing metrics.

5. **Curated resource list:**
   - Best intuitive introduction: [OPRO paper](https://arxiv.org/abs/2309.03409) — clear writing, simple algorithm
   - Best mathematical depth: [TextGrad paper](https://arxiv.org/abs/2406.07496) — rigorous PyTorch analogy
   - Best survey: [Ramnath et al. EMNLP 2025](https://arxiv.org/abs/2502.16923) — 5-part taxonomy
   - Best for practitioners: [DSPy documentation](https://dspy.ai/learn/optimization/optimizers/)
   - Best for multi-objective: [MORL-Prompt](https://arxiv.org/abs/2402.11711) — clearest exposition of objective collapse
   - State of the art: [GEPA paper](https://arxiv.org/abs/2507.19457) and [optimize_anything blog](https://gepa-ai.github.io/gepa/blog/2026/02/18/introducing-optimize-anything/)

---

## Source Image Catalog

**These are images from the downloaded sources that should be embedded in the chapter.**
The writing agent should copy these to `Automatic Prompt Optimization/images/` and embed them in the appropriate sections.

| # | Source Image Path | Caption (from paper) | Relevant Section(s) | Notes |
|---|---|---|---|---|
| 1 | `sources/arxiv-2502.16923/system-diagram.png` | APO taxonomy: 5-part framework for automatic prompt optimization | §1 Problem | Taxonomy overview — MUST include as chapter roadmap |
| 2 | `sources/arxiv-2305.03495/mainfig.png` | ProTeGi: Automatic prompt optimization with textual gradients | §3 Textual Gradients | Main pipeline diagram showing gradient analogy |
| 3 | `sources/arxiv-2305.03495/gd.png` | Gradient descent analogy for prompt optimization | §3 Textual Gradients | Side-by-side numerical vs textual GD |
| 4 | `sources/arxiv-2305.03495/curves.png` | Optimization curves showing convergence | §3 or §4 | Performance over iterations |
| 5 | `sources/arxiv-2402.11711/figures/model_outline.png` | MORL-Prompt: Multi-objective RL pipeline for prompt optimization | §5 Multi-Objective | Architecture showing HVI/Product/MGDA rewards |
| 6 | `sources/arxiv-2402.11711/figures/hvi-over-time.png` | Hypervolume indicator convergence during training | §5 Multi-Objective | Shows convergence of multi-objective optimization |
| 7 | `sources/arxiv-2402.11711/figures/tst_style_content.png` | Style vs content trade-off in text style transfer | §5 Multi-Objective | Visualizes objective collapse |
| 8 | `sources/arxiv-2412.12948/Plot_per_emotion.png` | MOPO per-emotion optimization trajectories | §5 Multi-Objective | Shows multi-objective optimization progress |
| 9 | `sources/arxiv-2406.16218/figures/mw_figures.png` | TRACE MetaWorld robot controller optimization | §3 Textual Gradients | Shows breadth of OPTO beyond prompts |
| 10 | `sources/arxiv-2404.02319/figures/overview.png` | SAMMO: Symbolic prompt program search overview | §6 Frameworks | Structure-aware approach |
| 11 | `sources/arxiv-2507.19457/manual_figures/npueval_gepa_prompt.png` | GEPA-optimized prompt for NPU kernel generation | §6 Frameworks | Example of GEPA in action on code tasks |
| 12 | `sources/arxiv-2310.16427/Figures/eval_converge_plots/Standard/bigbench_causal_judgement.png` | PromptAgent convergence on BBH causal judgement | §4 Evolutionary | MCTS optimization trajectory |
| 13 | `sources/arxiv-2512.06432/Hivemind.png` | HiveMind: DAG-Shapley credit assignment for multi-agent prompt optimization | §6 Applications | Shows multi-agent architecture with Shapley attribution |
| 14 | `sources/arxiv-2404.02319/figures/headroom.png` | SAMMO: headroom analysis for structural prompt transformations | §6 Applications | Shows performance gains from structural changes |

**Priority order for visuals:**

1. **Source images from downloaded papers** — canonical and authoritative
2. **D2 diagrams** — for concept maps, flowcharts, algorithm overviews, Pareto front illustrations
3. **Python/hvPlot** — for optimization curves, Pareto front visualizations
4. **Web downloads** — for images not in sources/
5. **generate_image** — last resort for custom illustrations

---

## Cross-Cutting Concerns

**Notation table:**

| Symbol | Meaning |
|--------|---------|
| p, ρ | Prompt / instruction (text string) |
| P | Prompt space (set of all possible prompts) |
| p* | Optimal prompt |
| M, M_T | Task model (the LLM performing the task) |
| M_O | Optimizer model (the LLM proposing prompt improvements) |
| F, f, μ | Metric / scoring function |
| S(p) | Accuracy score of prompt p |
| D, D_train, D_val | Dataset, training set, validation set |
| (x, y) | Input-output example pair |
| ∂L/∂v | Textual gradient of loss L with respect to variable v |
| ∇_f | Textual gradient operator for function f |
| Φ | Compound AI system |
| Π, π_i | Set of prompts / prompt for module i |
| f_i | i-th objective function (in multi-objective setting) |
| a ≻ b | Solution a Pareto-dominates solution b |
| H(S) | Hypervolume indicator of solution set S |
| B | Optimization budget (number of LLM calls) |
| ASI | Actionable Side Information (GEPA's diagnostic feedback) |
| π_1,...,π_k | Prompts for modules 1 through k in a multi-module system |
| φ_i | Shapley value for agent/module i |
| v(S) | Coalition value function (performance of agent subset S) |
| c ∈ ℝ^{d×L} | Continuous soft prompt (L vectors of dimension d) |
| p_judge | Judge evaluation prompt (in LLM-as-a-Judge setting) |
| R_φ(P,x,y) | Reward model score (learned from human preferences) |
| ρ^(k) | Prompt at iteration k (ProTeGi notation) |
| g^(k) | Textual gradient at iteration k |
| W | Beam width (number of prompts in beam search) |
| M_task, M_feedback, M_edit | Task LLM, feedback/gradient LLM, editor LLM (ProTeGi) |
| cos(φ_{ij}) | Gradient cosine similarity between objectives i and j |

**Concept map design:** D2 diagram with 5 semantic groups:
- **Green nodes**: Generate-and-select methods (APE, OPRO, InstructZero)
- **Blue nodes**: Textual gradient methods (ProTeGi, TextGrad, TRACE)
- **Orange nodes**: Evolutionary/search methods (EvoPrompt, PromptBreeder, GPO, PromptAgent)
- **Red nodes**: Multi-objective methods (EMO-Prompts, MORL-Prompt, MOPO, ParetoPrompt)
- **Purple nodes**: Frameworks (DSPy/MIPRO, GEPA, PromptWizard, AdalFlow)
- **Teal nodes**: Application domains (Multi-Agent/HiveMind, LLM-as-a-Judge/BLPO, Multimodal/MPO/CoOp)
- Edges show "extends" and "inspired by" relationships with year labels
- Timeline axis from left (2022) to right (2026)

**Prerequisite knowledge to recap:**
- Gradient descent basics (learning rate, loss function, chain rule) — recapped in §1 as foundation for the chapter
- Evolutionary algorithms basics (population, fitness, selection, crossover, mutation) — recapped in §4 introduction
- Multi-objective optimization basics (Pareto dominance, Pareto front, scalarization, NSGA-II) — recapped in §5 introduction with car-buying analogy
- Reinforcement learning basics (policy, reward, environment) — briefly touched in §4 (RLPrompt) and §5 (MORL-Prompt)
- LLM prompting (system prompt, few-shot examples, chain-of-thought) — assumed known
- RLHF/DPO basics (reward models, Bradley-Terry, preference data) — briefly recapped in §2 for preference-based prompt optimization; detailed treatment deferred to a separate chapter

**Common Misconceptions:**
1. "Textual gradients are actual mathematical gradients." — They are natural language critiques that serve an analogous *function* (providing directional improvement information) but operate in a fundamentally different space. They lack properties like linearity and additivity that numerical gradients have.
2. "OPRO/GEPA 'optimizes' by just asking the LLM to write a better prompt." — These methods use structured meta-prompts with optimization history, scoring trajectories, and systematic exploration strategies. The LLM is constrained by carefully designed contexts, not just asked to "do better."
3. "Multi-objective prompt optimization always requires evolutionary algorithms." — ParetoPrompt uses RL, MORL-Prompt uses soft Q-learning with multi-objective rewards, and GEPA uses reflection-based mutation with Pareto selection. The key ingredient is Pareto-aware selection, not the search algorithm.
4. "Prompt optimization makes manual prompt engineering obsolete." — These algorithms still require defining the right objectives, providing training data, and understanding the task. They automate the search but not the problem formulation.
5. "More compute always helps in prompt optimization." — GEPA achieves its best results with 100–500 evaluations while GRPO needs 5,000–25,000+. Reflection on rich feedback (execution traces, diagnostics) is more sample-efficient than blind search.
6. "Optimizing each module's prompt independently in a multi-agent system is equivalent to joint optimization." — Modules interact: a retriever prompt that produces verbose context may need a different reasoner prompt than one producing concise context. Independent optimization misses these interaction effects, which is why credit assignment (Shapley values) and joint optimization (MIPRO, TRACE) are necessary.
7. "Soft prompt tuning and discrete prompt optimization solve the same problem." — Soft prompts (CoOp) are continuous vectors optimized with real gradients but require model weight access and are uninterpretable. Discrete APO (OPRO, TextGrad) produces human-readable prompts via black-box API access. They address fundamentally different deployment scenarios.
8. "Self-Refine and TextGrad do the same thing — both use LLM feedback to improve." — Self-Refine improves the *output* (answer) while keeping the prompt fixed. TextGrad improves the *prompt* (or any variable in the computation graph) by propagating feedback backward. The optimization target is different: output-level vs. parameter-level optimization.
9. "The LLM-as-Optimizer just asks the model to write a better prompt — it's trivially simple." — OPRO, GPO, and GEPA use carefully structured meta-prompts with optimization trajectory history, systematic exploration strategies (temperature, trajectory retrieval, cosine decay), and principled selection mechanisms. GPO's ablation study shows that each design choice has measurable impact — random design performs far worse.

**Think Hard questions:**
1. Is there a fundamental limit to how well you can optimize a prompt for a given LLM? Is there a "Bayes-optimal" prompt for each task, and can we characterize it?
2. Textual gradients rely on an LLM to generate critiques. But the critique-generating LLM has its own biases and limitations. How does this "meta-model" problem affect optimization convergence?
3. Multi-objective prompt optimization produces a Pareto front of prompts. In practice, someone must choose a point on this front. How should this selection be made, and can it be automated?
4. GEPA outperforms RL (GRPO) for prompt optimization with 35× fewer rollouts. Does this mean RL is fundamentally ill-suited for discrete text optimization, or is GRPO just a weak baseline?
5. As LLMs become more capable (GPT-5, Claude 4, etc.), will the need for prompt optimization diminish? Or will the optimization landscape become more complex with more capable models? **Empirical evidence (inverse scaling law) suggests optimization effectiveness can *decrease* for larger models** — contradicting the intuition that "better models are easier to optimize."
6. The credit assignment problem in multi-agent systems (which module's prompt to blame) is analogous to the credit assignment problem in multi-layer neural networks (which layer's weights to blame). How deep does this analogy go? Could textual backpropagation through agent DAGs converge to something like standard backpropagation?
7. GPO found that LLM self-reflection actually *hurts* optimization performance. If LLMs are poor self-critics, what does this imply for Self-Refine and other reflection-based methods? Is there a way to reconcile GPO's finding with the success of TextGrad (which also relies on LLM critique)?
8. RLPrompt discovers effective but uninterpretable prompt tokens (essentially gibberish). Soft prompt tuning (CoOp) finds continuous vectors that are also uninterpretable. Is there a fundamental interpretability-performance trade-off in prompt optimization? Can we prove this formally?
9. **Reward hacking**: A prompt optimized against a scoring function can exploit weaknesses in the scorer rather than genuinely improving task quality. Is this fundamentally unavoidable whenever using proxy metrics, and does it imply that robust prompt optimization is inseparable from the challenge of AI alignment?
