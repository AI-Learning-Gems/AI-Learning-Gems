# TEXTBOOK-PLAN: GRPO and RLVR — Reinforcement Learning for Task-Specific LLM Training

## User Query
> I want to understand in detail the GRPO algorithm and the new paradigm of RLVR which is used to train LLMs. Specifically, there's been a lot of talk in between Jan 2025 and Dec 2025 about GRPO, creating a lot of verifiable environments for LLMs models to be trained with RL. I mainly care about single-turn training for specific task performance which are not thinking/language modeling, and while I want you to include some details of multi-turn and training as thinking models, I want a dedicated section on how recent research has setup the eval harness to train for very dedicated tasks such as SQL generation. I think the key of this section should be best-practices for setting up the GRPO environment for complex cases; look for recent literature and scientific blogs on this, including from Sebastian Raschka, Lilliam Wang, Cameron Wolfe, and seminal or prominent papers on eval harnesses or RL environment setups for LLM training using verifiable rewards.
> Also describe briefly about how GRPO related to the traditional REINFORCE paradigm, how GRPO differs from PPO, and the newer GRPO variants worth discussing (and explain at least a 2-3 of these briefly). This could be an earlier section.

**Topic:** GRPO (Group Relative Policy Optimization) and RLVR (Reinforcement Learning with Verifiable Rewards)
**Prior Knowledge:** The reader understands basic ML, has exposure to RL concepts (policy, reward, gradient), and knows what LLMs are and how SFT (supervised fine-tuning) works. They do NOT know policy gradient methods in detail, nor GRPO/RLVR specifically.
**Learning Goals:** Deep understanding of GRPO algorithm, RLVR paradigm, how to design verifiable reward environments for specific tasks (SQL, code, structured output), GRPO variants, and practical best practices.
**Target Depth:** Graduate
**Output Folder:** `Reinforcement Learning/GRPO and RLVR`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (15 sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [DeepSeekMath: Pushing the Limits of Mathematical Reasoning](https://arxiv.org/abs/2402.03300) | [ACADEMIC] | `sources/arxiv-2402.03300/` | 2024-02-05 | 2026-02-25 | KEY: Original GRPO paper. Defines GRPO objective, outcome/process supervision, iterative RL. Unified paradigm comparing SFT/RFT/DPO/PPO/GRPO. |
| 2 | [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via RL](https://arxiv.org/abs/2501.12948) | [ACADEMIC] | `sources/arxiv-2501.12948/` | 2025-01-22 | 2026-02-25 | KEY: Seminal reasoning model paper. GRPO + RLVR at scale, R1-Zero pure RL training, multi-stage pipeline, cold-start data. |
| 3 | [DAPO: An Open-Source LLM RL System at Scale](https://arxiv.org/abs/2503.14476) | [ACADEMIC] | `sources/arxiv-2503.14476/` | 2025-03-18 | 2026-02-25 | KEY: Four GRPO improvements: Clip-Higher, Dynamic Sampling, Token-Level Loss, Overlong Reward Shaping. Outperforms R1-Zero on AIME. |
| 4 | [Understanding R1-Zero-Like Training: A Critical Perspective (Dr. GRPO)](https://arxiv.org/abs/2503.20783) | [ACADEMIC] | `sources/arxiv-2503.20783/` | 2025-03-26 | 2026-02-25 | KEY: Identifies two biases in GRPO: response-level length bias and question-level difficulty bias. Proposes Dr. GRPO (unbiased). Shows connection to RLOO. |
| 5 | [REINFORCE++: A Simple and Efficient Approach for Aligning LLMs](https://arxiv.org/abs/2501.03262) | [ACADEMIC] | `sources/arxiv-2501.03262/` | 2025-01-06 | 2026-02-25 | KEY: Critic-free alternative to GRPO. Global advantage normalization vs GRPO's prompt-level normalization. Improved stability. |
| 6 | [Sebastian Raschka: The State of RL for LLM Reasoning](https://sebastianraschka.com/blog/2025/the-state-of-rl-for-llm-reasoning.html) | [TUTORIAL] | N/A (URL blocked) | 2025-04-19 | 2026-02-25 | KEY: Overview of GRPO, RLVR, PPO comparison. DeepSeek R1 analysis. Discusses reward modeling approaches. (Content from web search summaries) |
| 7 | [Cameron Wolfe: Group Relative Policy Optimization (GRPO)](https://cameronrwolfe.substack.com/p/group-relative-policy-optimization) | [TUTORIAL] | N/A (URL blocked) | 2025-11-24 | 2026-02-25 | KEY: Deep walkthrough of GRPO algorithm. Part of 4-post series on RL for LLMs. (Content from web search summaries) |
| 8 | [Cameron Wolfe: GRPO++ Tricks for Making RL Actually Work](https://cameronrwolfe.substack.com/p/grpo-tricks-for-making-rl-actually) | [TUTORIAL] | N/A (URL blocked) | 2026-01-05 | 2026-02-25 | KEY: Practical improvements to GRPO training: entropy management, dynamic sampling, reward shaping. (Content from web search summaries) |
| 9 | [Cameron Wolfe: REINFORCE Easy Online RL for LLMs](https://cameronrwolfe.substack.com/p/reinforce-easy-online-rl-for-llms) | [TUTORIAL] | N/A (URL blocked) | 2025-09-29 | 2026-02-25 | KEY: REINFORCE-based methods for LLMs, GRPO as simpler alternative to PPO. (Content from web search summaries) |
| 10 | [Lilian Weng: Reward Hacking in Reinforcement Learning](https://lilianweng.github.io/posts/2025-05-01-reward-hacking/) | [TUTORIAL] | N/A (URL blocked) | 2025-05-01 | 2026-02-25 | KEY: Comprehensive analysis of reward hacking challenges relevant to RLVR reward design. (Content from web search summaries) |
| 11 | Reasoning-SQL: RL with SQL Tailored Partial Rewards | [ACADEMIC] | N/A | 2025 | 2026-02-25 | KEY: GRPO + SQL-tailored partial rewards. Schema-linking rewards, AI feedback, n-gram similarity, syntax checks. RL-only > SFT. |
| 12 | Reward-SQL: Stepwise Reasoning and Process-Supervised Rewards | [ACADEMIC] | N/A | 2025 | 2026-02-25 | KEY: Cold start then PRM supervision for text-to-SQL. GRPO + PRM yields optimal results. |
| 13 | PaVeRL-SQL: Partial-Match Rewards and Verbal RL | [ACADEMIC] | N/A | 2025 | 2026-02-25 | KEY: Two-track approach: verbal self-evaluation + CoT RL with GRPO. Continuous reward based on correctness fraction. |
| 14 | [HuggingFace TRL GRPOTrainer Documentation](https://huggingface.co/docs/trl/grpo_trainer) | [DOCUMENTATION] | N/A | 2025 | 2026-02-25 | KEY: Official implementation of GRPO in TRL library. API reference for GRPOTrainer, reward functions, sampling configuration. |
| 15 | [Label Studio RLVR Best Practices Guide](https://labelstud.io/) | [TUTORIAL] | N/A | 2025 | 2026-02-25 | KEY: Practical guide on designing verifiable reward functions. Binary rewards, format adherence, code execution verification. |

:::

---

## Chapter Overview

**Total sections:** 6 body sections + Introduction + Closing
**Estimated total length:** 10,000-14,000 words
**Running example:** *Ava, a data engineer at a growing e-commerce company, who wants to fine-tune a 7B model to convert natural-language business questions into SQL queries.* The running example progresses from Ava's initial frustration with SFT-only results, to discovering RLVR's potential, to understanding GRPO mechanics, to designing a multi-signal reward function, to setting up the full training environment, to evaluating and iterating.

### Hook and Running Example Design

Ava's e-commerce company has thousands of product tables, and her team fields dozens of ad-hoc data requests daily: "What were the top-selling items in the Northwest region last quarter, excluding returns?" A supervised fine-tuned model gets the SQL roughly right 60% of the time, but the remaining 40% produces queries that either crash, return wrong results, or hallucinate table names. The fundamental issue: SFT teaches the model *what correct SQL looks like*, but not *how to reason about correctness*. When the model generates `SELECT * FROM products WHERE region = 'Northwest'` instead of the correct join across `orders`, `products`, and `regions` tables, SFT has no mechanism to penalize this. The model simply memorized patterns without understanding execution semantics.

This is precisely the gap that Reinforcement Learning with Verifiable Rewards (RLVR) fills. Instead of showing the model correct SQL and hoping it generalizes, RLVR *executes* the model's generated SQL against a real database, compares the results to the expected output, and feeds back a simple binary signal: correct or incorrect. Combined with GRPO, an efficient, critic-free RL algorithm designed specifically for LLMs, this approach lets Ava's 7B model learn from its own mistakes, iterating toward queries that actually return the right data. By the end of this chapter, the reader will understand every piece of this pipeline: from the mathematical foundations of policy gradients, through GRPO's elegant group-based advantage estimation, to the practical engineering of reward functions that can train models for SQL, code generation, structured output, and beyond.

**Hook Image:** The GRPO architecture diagram from DeepSeekMath (Figure 4, `sources/arxiv-2402.03300/figures/GRPO.pdf`). This canonical diagram shows the group sampling, reward computation, and advantage normalization pipeline that is the heart of the algorithm. It bridges the informal "generate multiple answers and compare them" intuition with the formal mathematical objective.

---

## Section Plan

### Section 1: From REINFORCE to PPO {#sec-policy-gradients}

**File:** `_01-policy-gradient-foundations.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** The reader should understand the core idea of policy gradient methods (REINFORCE), why variance reduction matters, how baselines work, and how PPO stabilizes training with clipped objectives and a critic network. This establishes the "before" that makes GRPO's innovations clear.
**Running example application:** Ava imagines training her SQL model with vanilla REINFORCE: generating one SQL query per question, executing it, getting a reward, and updating. She quickly sees the problem: massive variance. One lucky correct query sends gradients in one direction; a string of failures sends them back. The model oscillates wildly. PPO helps by adding a critic to estimate "how well should I expect to do on this question?" but now Ava needs to train *two* large models simultaneously, doubling her GPU memory.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DeepSeekMath | `sources/arxiv-2402.03300/` | Section 4.1.1 (From PPO to GRPO) | PPO objective (Eq 1-2), value function overhead, KL penalty |
| Dr. GRPO | `sources/arxiv-2503.20783/` | Section 3 (RL Analysis), App A (Policy Gradient Derivations) | Full Monte Carlo PG derivation (Eq 7-9), baseline theory, advantage definition |
| Cameron Wolfe REINFORCE | N/A | Full post | REINFORCE for LLMs intuition, variance issues |

**Content outline:**
1. The policy gradient theorem: the core idea that we can optimize a non-differentiable reward by differentiating through the log-probability of actions (A-G structure: start with Ava's attempt)
2. REINFORCE (Monte Carlo policy gradient): sample trajectories, compute returns, weight gradients. High variance problem illustrated with SQL example.
3. Baselines for variance reduction: why subtracting a baseline doesn't bias the gradient (proof sketch from Dr. GRPO App A). Value functions as learned baselines leads to the actor-critic paradigm.
4. PPO: clipped surrogate objective, trust region idea. Why clipping prevents catastrophic policy updates. Memory cost: the critic model is as large as the policy.
5. The LLM-specific challenge: sparse rewards (only at end of sequence), value function training difficulty, 2x memory for critic.

**Key equations:**
- Policy gradient theorem: $\nabla_\theta \mathcal{J}(\pi_\theta) = \mathbb{E}[\nabla_\theta \log \pi_\theta(o|q) \cdot A(o, q)]$
- REINFORCE update with baseline: $\nabla_\theta \mathcal{J} = \mathbb{E}[\sum_t \nabla_\theta \log \pi_\theta(o_t | q, o_{<t}) (R(q,o) - B(q))]$
- PPO clipped objective: $\mathcal{J}_{PPO} = \mathbb{E}[\min(r_t(\theta) \hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_t)]$

**Visualizations:**
- D2 diagram: evolution from REINFORCE to Actor-Critic to PPO to GRPO
- Conceptual diagram of PPO's two-model architecture (actor + critic)

**Source images to embed:**
- `sources/arxiv-2501.03262/imgs/GRPO.png`: comparison of GRPO vs REINFORCE++ architecture
- `sources/arxiv-2402.03300/figures/GRPO.pdf`: GRPO pipeline figure (convert to PNG)

**Self-explanation prompts:**
1. "Why does subtracting a baseline from the return not change the expected gradient? What would happen if the baseline depended on the current action?"
2. "In the LLM context, why is training a value function particularly challenging compared to traditional RL?"

---

### Section 2: GRPO Core Algorithm {#sec-grpo-core}

**File:** `_02-grpo-core-algorithm.qmd`
**Estimated length:** 2,000-2,500 words
**Goal:** The reader should fully understand GRPO's mathematical formulation, its key insight (using group-relative rewards as a critic-free baseline), the advantage estimation mechanism, and the KL regularization approach. This is the most technically dense section.
**Running example application:** Ava discovers GRPO: instead of training a separate critic model, she generates G=16 SQL queries for each business question, executes all of them, and uses the group's mean reward as the baseline. Queries that return the correct results get positive advantage; those that fail get negative advantage. And the best part: she only needs one model in memory.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DeepSeekMath | `sources/arxiv-2402.03300/` | Sections 4.1.1-4.1.4 (GRPO sections) | Full GRPO objective (Eq 3), advantage calculation, outcome vs process supervision, iterative RL |
| DeepSeekMath HTML | N/A | Positions 21-22, 28 | Detailed formulation, Algorithm 1, unified paradigm table |
| DeepSeek-R1 | `sources/arxiv-2501.12948/` | Section 2 (GRPO section) | GRPO in R1 context, reward model design |
| Dr. GRPO | `sources/arxiv-2503.20783/` | Section 3 (RL Analysis) | GRPO as REINFORCE variant, connection to RLOO |

**Content outline:**
1. The key insight: group-relative advantages (A-G: Ava's "aha moment" comparing SQL queries within a group)
2. GRPO objective function: full mathematical derivation
   - Sampling G outputs per prompt
   - Computing rewards for each output
   - Normalizing: $\hat{A}_{i,t} = \frac{r_i - \text{mean}(\mathbf{r})}{\text{std}(\mathbf{r})}$
   - Clipped surrogate with group advantages
   - KL regularization via unbiased estimator (different from PPO's per-token KL penalty)
3. Outcome supervision vs Process supervision: when to use each
4. The connection to REINFORCE and RLOO: GRPO as group-relative REINFORCE (Dr. GRPO derivation showing equivalence up to scaling)
5. Memory and compute advantages: quantitative comparison: PPO requires policy + critic + reference + reward model (4 models); GRPO requires policy + reference (2 models, ~50% memory reduction)
6. The unified paradigm (DeepSeekMath Section 5.2): comparing SFT, RFT, DPO, Online RFT, PPO/GRPO through the lens of {Data Source, Reward Function, Algorithm}

**Key equations:**
- GRPO objective: $\mathcal{J}_{GRPO}(\theta) = \mathbb{E}[\frac{1}{G}\sum_{i=1}^G \frac{1}{|o_i|} \sum_{t} \min(r_{i,t}(\theta) \hat{A}_{i,t}, \text{clip}(r_{i,t}(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_{i,t})] - \beta D_{KL}[\pi_\theta || \pi_{ref}]$
- Group advantage: $\hat{A}_{i,t} = \frac{r_i - \text{mean}(\mathbf{r})}{\text{std}(\mathbf{r})}$
- KL estimator: $D_{KL} = \frac{\pi_{ref}(o_t|q, o_{<t})}{\pi_\theta(o_t|q, o_{<t})} - \log\frac{\pi_{ref}(o_t|q, o_{<t})}{\pi_\theta(o_t|q, o_{<t})} - 1$

**Visualizations:**
- Annotated diagram of the GRPO pipeline (from DeepSeekMath Figure 4)
- Side-by-side comparison table: PPO vs GRPO (architecture, memory, compute, stability)
- The unified paradigm table (from DeepSeekMath Table 10)

**Source images to embed:**
- `sources/arxiv-2402.03300/figures/GRPO.pdf`: Architecture diagram (MUST convert to PNG)
- `sources/arxiv-2501.12948/figures/ppo_vs_grpo.pdf`: PPO vs GRPO comparison from DeepSeek-R1

**Self-explanation prompts:**
1. "When would process supervision be preferred over outcome supervision? Think about a task where the intermediate steps matter as much as the final answer."
2. "GRPO removes the critic but introduces a new cost: generating G outputs per prompt. Under what conditions is this trade-off favorable?"

---

### Section 3: GRPO Variants {#sec-grpo-variants}

**File:** `_03-grpo-variants.qmd`
**Estimated length:** 2,000-2,500 words
**Goal:** The reader should understand the key failure modes of vanilla GRPO (entropy collapse, length bias, difficulty bias) and how each major variant addresses them. Covers DAPO, Dr. GRPO, REINFORCE++, and briefly mentions RLOO and GRPO-lambda.
**Running example application:** Ava deploys vanilla GRPO and notices two problems: (1) after a few hundred steps, her model starts generating the same safe, short SQL pattern for every question (entropy collapse); (2) incorrect queries get progressively longer, the model pads failing queries with unnecessary JOINs and subqueries, wasting tokens but receiving less penalty per token. She needs GRPO variants that fix these issues.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DAPO paper | `sources/arxiv-2503.14476/` | Section 3 (030method.tex) all subsections | Clip-Higher, Dynamic Sampling, Token-Level Loss, Overlong Reward Shaping |
| Dr. GRPO paper | `sources/arxiv-2503.20783/` | Sections 3.1-3.2 (Bias analysis + Dr. GRPO method) | Length bias, difficulty bias, removal of 1/abs(o_i) and std normalization |
| REINFORCE++ paper | `sources/arxiv-2501.03262/` | Full paper | Global advantage normalization, stability improvements |
| Cameron Wolfe GRPO++ | N/A | Full post | Practical tricks to make GRPO work |

**Content outline:**
1. Failure modes of vanilla GRPO (Ava's problems): setup with concrete SQL examples
2. **DAPO** (Decoupled Clip and Dynamic Sampling Policy Optimization): detailed treatment
   - *Clip-Higher*: decoupling epsilon_low and epsilon_high to prevent entropy collapse. Low-probability "exploration" tokens need room to grow.
   - *Dynamic Sampling*: filtering prompts with 100% or 0% accuracy (zero gradient problem). Over-sampling until batch is filled with informative prompts.
   - *Token-Level Loss*: replacing sample-level with token-level loss computation. Why 1/sum(abs(o_i)) instead of 1/G * 1/abs(o_i) matters for long-CoT.
   - *Overlong Reward Shaping*: soft punishment for truncated samples instead of hard penalty.
3. **Dr. GRPO** (GRPO Done Right): removing optimization biases
   - Response-level length bias: dividing by abs(o_i) under-penalizes long incorrect responses
   - Question-level difficulty bias: std normalization over-weights extreme (easy/hard) questions
   - The fix: remove 1/abs(o_i) and std(R), normalize by a constant instead
   - Connection to RLOO: Dr. GRPO advantage is equivalent to RLOO up to scaling
4. **REINFORCE++**: brief treatment
   - Global advantage normalization across entire batch instead of per-prompt
   - Integrates PPO stabilization techniques without critic
5. Brief mentions: GRPO-lambda (better credit assignment), GRPO-LEAD, XRPO

**Key equations:**
- DAPO objective with decoupled clip: clip(r, 1-epsilon_low, 1+epsilon_high)
- DAPO dynamic sampling constraint: 0 < count(correct outputs) < G
- Dr. GRPO unbiased advantage: A_tilde = R_i - mean(R) (no std, no 1/abs(o_i))
- RLOO equivalence: (G/(G-1)) * A_tilde = A_hat_RLOO

**Visualizations:**
- Comparison table: Vanilla GRPO vs DAPO vs Dr. GRPO vs REINFORCE++ (key modifications, advantages, trade-offs)
- DAPO entropy curves showing Clip-Higher's effect

**Source images to embed:**
- `sources/arxiv-2503.20783/figures/fig1.pdf`: Dr. GRPO bias illustration + incorrect response length reduction
- `sources/arxiv-2503.20783/figures/bias_illustration.pdf`: Visual explanation of length and difficulty biases
- `sources/arxiv-2503.14476/figures/entropy.png`: DAPO entropy curves
- `sources/arxiv-2503.14476/figures/score.png`: DAPO performance on AIME

**Self-explanation prompts:**
1. "If you remove the std normalization (as Dr. GRPO does), what mechanism prevents gradients from exploding when reward magnitudes differ across batches?"
2. "DAPO filters out prompts with 100% or 0% accuracy. Could this cause a distribution shift in the training data? How might you mitigate it?"

---

### Section 4: The RLVR Paradigm {#sec-rlvr}

**File:** `_04-rlvr-paradigm.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** The reader should understand RLVR as a training paradigm distinct from RLHF, how to design verifiable reward functions, the spectrum from binary to partial rewards, and the key considerations for reward quality (reward hacking, sparsity, format adherence).
**Running example application:** Ava designs her SQL reward function. She starts with a simple binary reward (1 if execution results match, 0 otherwise), but discovers problems: the model learns to game the system by generating `SELECT 1` for questions where the answer happens to be 1. She needs a more nuanced reward that checks format, syntax, execution correctness, and schema adherence.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DeepSeek-R1 | `sources/arxiv-2501.12948/` | Section 2 (R1-Zero training) | Verifiable reward design: accuracy + format rewards |
| Reasoning-SQL | N/A | Full paper summary | SQL-tailored partial rewards: schema-linking, AI feedback, n-gram similarity, syntax checks |
| Label Studio RLVR guide | N/A | Web search summary | Best practices: binary rewards, format adherence, code execution, robustness |
| Lilian Weng Reward Hacking | N/A | Web search summary | Reward hacking taxonomy, mitigation strategies |
| Sebastian Raschka State of RL | N/A | Web search summary | RLVR vs RLHF comparison, verifiable reward categories |

**Content outline:**
1. RLVR vs RLHF: a paradigm comparison (A-G: Ava's choice between hiring annotators vs. writing a SQL executor)
   - RLHF: subjective human preferences then learned reward model then optimization
   - RLVR: objective correctness criteria then rule-based verifier then direct optimization
   - When each is appropriate: RLVR for precision-critical, verifiable tasks; RLHF for subjective/creative tasks
2. The anatomy of a verifiable reward function
   - Binary rewards: correct/incorrect (DeepSeek-R1 style)
   - Partial/continuous rewards: graded correctness (Reasoning-SQL style)
   - Format rewards: penalizing missing tags, wrong output structure
   - Multi-signal rewards: combining multiple verifiable criteria
3. Reward design best practices
   - Execution-based verification (running SQL against a database, running code against tests)
   - Format adherence checking (regex, structural validation)
   - Schema-linking rewards (does the SQL reference valid tables/columns?)
   - Robustness against reward hacking (Lilian Weng's taxonomy)
4. The reward sparsity problem and mitigation
   - Why binary rewards can be too sparse for complex tasks
   - Process rewards vs outcome rewards
   - Curriculum learning: starting with easier questions where the model can get some correct

**Key equations:**
- Simple binary reward: R(q, o) = 1[execute(o) = gold_answer(q)]
- Multi-signal reward: R(q, o) = w1*R_exec + w2*R_format + w3*R_schema + w4*R_syntax
- DeepSeek-R1 reward: R = R_accuracy + R_format

**Visualizations:**
- D2 diagram: RLHF pipeline vs RLVR pipeline (side-by-side)
- Table: reward function design patterns for different task types (math, SQL, code, structured output)

**Source images to embed:**
- `sources/arxiv-2501.12948/figures/R1Pipieline_v0603.pdf`: DeepSeek-R1 training pipeline (shows RLVR stage)

**Self-explanation prompts:**
1. "Ava's binary SQL reward assigns 0 to a query that returns 99% correct rows but misses one edge case. How might partial rewards help? What are the risks of partial rewards?"
2. "Why is RLVR particularly resistant to reward hacking compared to RLHF? Can you think of a scenario where even verifiable rewards could be hacked?"

---

### Section 5: Building GRPO Environments for Specific Tasks {#sec-grpo-environments}

**File:** `_05-grpo-environments.qmd`
**Estimated length:** 2,000-2,500 words
**Goal:** This is the **key practical section** the reader cares most about. The reader should understand the end-to-end process of setting up a GRPO training environment for a specific task (SQL, code, tool-calling), including data preparation, reward function engineering, hyperparameter selection, infrastructure choices, and common pitfalls.
**Running example application:** Ava builds her complete SQL-GRPO training pipeline: preparing training questions, setting up the database executor, designing the multi-signal reward function, choosing group size and sampling parameters, handling edge cases (timeout queries, ambiguous answers), and monitoring training health metrics.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Reasoning-SQL | N/A | Full paper | SQL-specific GRPO setup: partial rewards, schema-linking, RL-only training |
| Reward-SQL | N/A | Full paper | Cold start + PRM supervision paradigm, stepwise reasoning chains |
| PaVeRL-SQL | N/A | Full paper | Two-track approach, continuous reward based on correctness fraction |
| TRL GRPOTrainer docs | N/A | API docs | GRPOTrainer API, reward function signature, vLLM integration |
| DAPO paper | `sources/arxiv-2503.14476/` | Section 3.5 (Dataset Transformation) | Answer format transformation for reliable reward signals |
| Cameron Wolfe GRPO++ | N/A | Full post | Practical tricks for large-scale GRPO |
| DeepSeek-R1 | `sources/arxiv-2501.12948/` | Section 2 (R1 pipeline) | Multi-stage training pipeline, cold-start data, reward model placement |

**Content outline:**
1. The GRPO training pipeline: end-to-end overview (A-G: Ava draws out her system architecture)
   - Components: base model, question dataset, reward function, sampling engine (vLLM), training framework (TRL/verl/OpenRLHF)
   - The generation-evaluation-update loop
2. **Data preparation best practices**
   - Question format: clear, unambiguous prompts with deterministic answers
   - DAPO's insight: transform answers into easily parseable formats (e.g., integers) to minimize verifier errors
   - Cold-start data: when to include SFT warm-up data (DeepSeek-R1 approach)
   - Difficulty curriculum: easy questions first to establish reward signal
3. **Reward function engineering for specific tasks**
   - **SQL generation**: execution-based rewards (run query, compare results), partial rewards for partial correctness, schema validation, syntax checking
   - **Code generation**: unit test execution (e2b/Judge0 sandboxes), compilation checking, output comparison
   - **Structured output** (JSON, XML): schema validation, field completeness, type checking
   - **Tool calling**: function signature correctness, argument validation, execution result checking
   - Anti-pattern: reward functions that are too easy to game
4. **Hyperparameter selection guidelines**
   - Group size G: larger = lower variance but higher compute cost (typical: 8-64)
   - KL coefficient beta: controls exploration vs. exploitation (typical: 0.01-0.1, or drop entirely for verifiable rewards)
   - Clipping epsilon: DAPO's insight on decoupled clipping (epsilon_low=0.2, epsilon_high=0.28)
   - Learning rate: typically 1e-6 to 5e-6 for RL fine-tuning
   - Number of training steps: monitor reward curves and entropy for convergence
5. **Monitoring and debugging GRPO training**
   - Key metrics: training reward, policy entropy, response length, KL divergence
   - Warning signs: entropy collapse (all responses identical), reward hacking, length explosion
   - Dynamic sampling: DAPO's approach to filtering uninformative prompts
6. **Infrastructure considerations**
   - Frameworks: TRL GRPOTrainer (HuggingFace), verl (ByteDance), OpenRLHF
   - Distributed sampling with vLLM
   - Memory optimization: LoRA vs full fine-tuning

**Key equations:**
- SQL multi-signal reward: R = 0.5*R_exec + 0.2*R_format + 0.2*R_schema + 0.1*R_syntax
- DAPO soft overlong punishment: R_length(y) = ((L_max - L_cache) - |y|) / L_cache for overlong responses

**Visualizations:**
- D2 diagram: complete GRPO training pipeline architecture (model, sampling, reward, update)
- Table: reward function recipes for SQL, code, structured output, and tool-calling tasks
- Checklist: "Is your GRPO environment ready?" diagnostic flowchart

**Source images to embed:**
- `sources/arxiv-2501.12948/figures/rl_infra.pdf`: DeepSeek RL infrastructure diagram

**Self-explanation prompts:**
1. "You're setting up GRPO for a JSON schema generation task. What reward signals would you use? How would you handle the case where the JSON is valid but semantically incorrect?"
2. "Why does DAPO transform math answers into integers? How could you apply a similar principle to SQL verification?"

---

### Section 6: Multi-Turn Training and Thinking Models {#sec-multi-turn}

**File:** `_06-multi-turn-thinking.qmd`
**Estimated length:** 1,200-1,500 words
**Goal:** Brief but informative treatment of how GRPO/RLVR extends to multi-turn scenarios (agentic tasks, dialogue) and the "thinking model" paradigm (R1-Zero, chain-of-thought emergence through RL). The reader should understand the key differences from single-turn training and why this area is rapidly evolving.
**Running example application:** Ava considers extending her SQL system to handle multi-turn conversations ("Show me last quarter's sales" then "Now break that down by category"). She also considers training the model to "think" about the query before generating SQL, using a think block for schema exploration and query planning.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DeepSeek-R1 | `sources/arxiv-2501.12948/` | Section 2 (R1-Zero, cold-start pipeline) | R1-Zero training without SFT, Aha moment, emergent self-reflection |
| Dr. GRPO | `sources/arxiv-2503.20783/` | Section 2 (Base model analysis), Section 3.3 (Template analysis) | Templates for thinking, base model capabilities, Aha moment in base models |
| DeepSeek-R1 | `sources/arxiv-2501.12948/` | Section 2.3 (Rejection sampling, multi-stage) | Multi-stage RL pipeline, distillation |

**Content outline:**
1. From single-turn to multi-turn: the challenge of delayed, compounding rewards
   - Multi-turn episode structure: state = conversation history
   - Credit assignment across turns
   - Verifiable rewards in multi-turn: end-of-episode task success
2. The thinking model paradigm (R1-Zero style)
   - Training with think and answer tags
   - Emergent reasoning behaviors: self-reflection, backtracking, verification
   - The "Aha moment" and Dr. GRPO's finding that it's already in base models
   - Process supervision for long chain-of-thought
3. Multi-stage training pipelines
   - DeepSeek-R1's full pipeline: RL on base then cold-start SFT then more RL then rejection sampling + SFT
   - Why pure RL alone (R1-Zero) works for math but may struggle for general tasks
4. Open questions and future directions
   - Extending RLVR beyond verifiable domains (semi-verifiable, LLM-as-judge)
   - Scaling GRPO to longer contexts and multi-turn episodes
   - Agentic RL: tool use, web browsing, code execution loops

**Key equations:**
- Multi-turn return: R_episode = sum of discounted rewards per turn
- R1-Zero reward: R = R_accuracy + R_format (simple binary)

**Visualizations:**
- D2 diagram: single-turn vs multi-turn GRPO training loop
- DeepSeek-R1 pipeline diagram (multi-stage)

**Source images to embed:**
- `sources/arxiv-2501.12948/figures/R1Pipieline_v0603.pdf`: Full R1 training pipeline
- `sources/arxiv-2503.20783/figures/exp1_algo_score_and_length_last.pdf`: Training dynamics comparison (GRPO vs Dr. GRPO)

**Self-explanation prompts:**
1. "Why did DeepSeek need a multi-stage pipeline (RL then SFT then RL then SFT) instead of just doing more RL? What does each stage contribute?"
2. "If the 'Aha moment' already exists in base models, what is RL actually teaching the model?"

---

## Source Image Catalog

**These are images from the downloaded sources that should be embedded in the chapter.**

| # | Source Image Path | Caption (from paper) | Relevant Sections | Notes |
|---|---|---|---|---|
| 1 | `sources/arxiv-2402.03300/figures/GRPO.pdf` | "GRPO pipeline: group sampling, reward computation, advantage normalization" | S2 GRPO Core | Architecture diagram. MUST include. Convert PDF to PNG. |
| 2 | `sources/arxiv-2501.12948/figures/ppo_vs_grpo.pdf` | "PPO vs GRPO comparison" | S2 GRPO Core | Side-by-side comparison. Convert PDF to PNG. |
| 3 | `sources/arxiv-2501.12948/figures/R1Pipieline_v0603.pdf` | "DeepSeek-R1 training pipeline overview" | S4 RLVR, S6 Multi-Turn | Full training pipeline. Convert PDF to PNG. |
| 4 | `sources/arxiv-2501.12948/figures/rl_infra.pdf` | "RL infrastructure for DeepSeek-R1" | S5 Environments | Infrastructure diagram. Convert PDF to PNG. |
| 5 | `sources/arxiv-2503.20783/figures/fig1.pdf` | "Dr. GRPO modifications: removing length and std normalization" | S3 Variants | Key diagram showing biases and fix. Convert PDF to PNG. |
| 6 | `sources/arxiv-2503.20783/figures/bias_illustration.pdf` | "Illustration of biases in GRPO: length bias and difficulty bias" | S3 Variants | Visual explanation of both biases. Convert PDF to PNG. |
| 7 | `sources/arxiv-2503.20783/figures/exp1_algo_score_and_length_last.pdf` | "Comparison of Dr. GRPO and GRPO: training dynamics and evaluation" | S3 Variants, S6 Multi-Turn | Shows reward + length curves for both. |
| 8 | `sources/arxiv-2503.14476/figures/entropy.png` | "Entropy of policy after Clip-Higher" | S3 Variants (DAPO) | Already PNG. Shows entropy recovery. |
| 9 | `sources/arxiv-2503.14476/figures/score.png` | "DAPO performance on AIME benchmark" | S3 Variants (DAPO) | Already PNG. DAPO outperforms R1-Zero. |
| 10 | `sources/arxiv-2501.03262/imgs/GRPO.png` | "GRPO architecture" | S1 Policy Gradients | Already PNG. Comparison diagram. |
| 11 | `sources/arxiv-2501.03262/imgs/REINFORCE++.png` | "REINFORCE++ architecture" | S3 Variants | Already PNG. REINFORCE++ vs GRPO. |
| 12 | `sources/arxiv-2501.12948/figures/reward_hacking.pdf` | "Reward hacking examples in RL training" | S4 RLVR | Failure modes. Convert PDF to PNG. |
| 13 | `sources/arxiv-2402.03300/figures/combined_figure_rl.pdf` | "RL training results comparison" | S2 GRPO Core | GRPO vs baselines on math. |
| 14 | `sources/arxiv-2402.03300/figures/pipeline.pdf` | "DeepSeekMath training pipeline" | S2 GRPO Core | Overall pipeline context. |

**Priority order for visuals:**
1. **Source images from downloaded papers**: canonical, authoritative
2. **D2 diagrams**: concept maps, pipeline architectures, comparisons
3. **Python/hvPlot**: if needed for custom visualizations
4. **generate_image**: last resort

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,000-1,500 words

**Content:**
1. Key takeaways (7 bullet points):
   - GRPO eliminates the critic model by using group-relative advantages, cutting memory by 50%
   - RLVR uses verifiable rewards (execution results, format checks) instead of learned reward models
   - Vanilla GRPO has known biases (length, difficulty): use DAPO or Dr. GRPO for production
   - Reward function design is the most critical engineering choice: binary is simple but sparse; partial rewards are richer but risk gaming
   - Dynamic sampling and entropy management are essential for stable long-horizon training
   - For specific tasks (SQL, code, structured output), execution-based verification is the gold standard
   - The thinking model paradigm (R1-Zero style) benefits from think tags but may not be necessary for all tasks
2. Completed concept map (D2 diagram): REINFORCE to PPO to GRPO to {DAPO, Dr. GRPO, REINFORCE++} with RLVR as the reward paradigm
3. Retrieval practice questions (6, with answers in collapsed callout)
4. Common mistakes section (5 items)
5. Curated resource list:
   - Sebastian Raschka: "The State of RL for LLM Reasoning" (Apr 2025)
   - Cameron Wolfe: GRPO series on "Deep (Learning) Focus" Substack (Sep 2025 - Jan 2026)
   - Lilian Weng: "Reward Hacking in RL" (May 2025)
   - HuggingFace TRL GRPOTrainer documentation
   - Original papers: DeepSeekMath, DeepSeek-R1, DAPO, Dr. GRPO

---

## Cross-Cutting Concerns

**Notation table:**

| Symbol | Meaning |
|--------|---------|
| $\pi_\theta$ | Current policy model (the LLM being trained) |
| $\pi_{\theta_{old}}$ | Old policy (before current update step) |
| $\pi_{ref}$ | Reference policy (usually the initial SFT model) |
| $q$ | Input prompt / question |
| $o, o_i$ | Generated output / the i-th output in a group |
| $o_{i,t}$ | The t-th token of the i-th output |
| $G$ | Group size (number of outputs sampled per prompt) |
| $r_i, R_i$ | Reward for the i-th output |
| $\mathbf{r}, \mathbf{R}$ | Vector of all rewards in a group |
| $\hat{A}_{i,t}$ | Estimated advantage for token t of output i |
| $r_{i,t}(\theta)$ | Importance sampling ratio: pi_theta / pi_theta_old |
| $\epsilon$ | Clipping parameter for PPO/GRPO |
| $\beta$ | KL divergence coefficient |
| $D_{KL}$ | KL divergence between current and reference policy |
| $R(q, o)$ | Return (total reward) for question-output pair |
| $V_\psi$ | Value function (critic) in PPO |

**Concept map design:** A hierarchical D2 diagram showing:
- Top level: "RL for LLMs" branches to "RLHF" and "RLVR"
- Under RLVR: "Reward Design" (binary, partial, multi-signal) and "Optimization" (REINFORCE, PPO, GRPO)
- Under GRPO: variants (DAPO, Dr. GRPO, REINFORCE++)
- Cross-connections: GRPO to "eliminate critic" to memory savings; RLVR to "verifiable reward" to SQL, Code, Math

**Prerequisite knowledge to recap:**
- What SFT (supervised fine-tuning) does and its limitations
- Basic calculus: gradients, expectation, variance
- Token-level autoregressive generation in LLMs
- What a reward function means in RL context

**Common Misconceptions:**
1. *"GRPO is fundamentally different from REINFORCE"*: Actually, GRPO is a variant of REINFORCE with a specific group-based baseline and PPO-style clipping. Dr. GRPO shows the exact connection.
2. *"Removing the critic sacrifices training quality"*: GRPO achieves comparable or better performance than PPO on mathematical reasoning, while being more memory-efficient.
3. *"Verifiable rewards only work for math and code"*: While easiest for verifiable domains, RLVR can be extended to any task with deterministic evaluation criteria (SQL execution, format validation, structured output schemas).
4. *"More RL training always helps"*: Lilian Weng's work on reward hacking shows that over-optimization against any reward signal can degrade model quality. Dynamic sampling and entropy monitoring are essential guardrails.
5. *"The Aha moment in thinking models is emergent from RL"*: Dr. GRPO's analysis shows that self-reflection behaviors already exist in base models; RL amplifies rather than creates them.

**Think Hard questions:**
1. When does RLVR fail? What happens when the verification criteria don't fully capture what "correct" means?
2. How do you handle the exploration-exploitation tradeoff in GRPO: the model needs diversity (exploration) to discover good solutions, but too much diversity slows convergence?
3. If GRPO's group-relative baseline introduces a bias toward the difficulty distribution of the training set, how does this affect generalization to out-of-distribution questions?
4. Can GRPO be applied to creative tasks (writing, design)? What would a "verifiable" reward look like for creative output?
5. As models become very capable (passing 90%+ on benchmarks), the dynamic sampling approach of DAPO filters out most prompts. What happens to training stability and efficiency at very high accuracy levels?
