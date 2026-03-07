# TEXTBOOK-PLAN: Learning from Preference Data

## User Query
> I want to understand a lot about Preference Learning, specifically some of the older models [...] which are relevant in today's LLM RL training steps. This should cover Bradley Terry and other models mentioned. There should also be a section dedicated to how these models are used to train current LLMs using RLHF [and DPO]. The focus should be MOSTLY on classical preference models (BT, TrueSkill, Elo, etc.) with only one detailed section on RLHF/DPO. There should be one section on how preference data is collected. The working example should be selection of the best TTS model.

**Topic:** Learning from Preference Data — Classical Pairwise Comparison Models, Bayesian Ranking Systems, and Their Application to Modern LLM Alignment
**Prior Knowledge:** Reader has strong technical/mathematical maturity. Understands basic probability, logistic regression, MLE, and Bayesian inference at a conceptual level. Has heard of RLHF but does not know the mathematical details. Does NOT know BT, TrueSkill, Plackett-Luce, or how these connect to DPO/RLHF.
**Learning Goals:** Deep, graduate-level understanding of: (1) BT model from first principles with full derivation, (2) Bayesian preference models (TrueSkill, Glicko) and their contrast with frequentist BT, (3) the broader landscape of ranking methods (Elo, Thurstone, PL, PageRank, voting methods), (4) how to collect high-quality preference data, (5) practical extensions (multi-criteria, annotator heterogeneity, ties, contextual preferences), (6) how BT becomes the neural reward model in RLHF, and how DPO eliminates it.
**Target Depth:** Graduate
**Output Folder:** `Preference Learning/Learning from Preference Data`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (35 sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [DPO Paper — Rafailov et al. 2023](https://arxiv.org/abs/2305.18290) | [ACADEMIC] | `sources/arxiv-2305.18290/` | 2023-05 | 2026-03-07 | KEY: BT-based reward reparameterization; DPO loss. Teaser diagram. |
| 2 | [Unification Survey — Raheja & Pochhi 2026](https://arxiv.org/abs/2601.06108) | [ACADEMIC] | `sources/arxiv-2601.06108/` | 2026-01 | 2026-03-07 | KEY: Unifies RLHF/DPO/IPO/KTO/SimPO under 3 axes. |
| 3 | [Christiano et al. 2017](https://arxiv.org/abs/1706.03741) | [ACADEMIC] | `sources/arxiv-1706.03741/` | 2017-06 | 2026-03-07 | KEY: Foundational RLHF. Setup diagram. |
| 4 | [InstructGPT — Ouyang et al. 2022](https://arxiv.org/abs/2203.02155) | [ACADEMIC] | `sources/arxiv-2203.02155/` | 2022-03 | 2026-03-07 | KEY: Production-scale RLHF. Canonical pipeline diagram. |
| 5 | [Hunter 2004 — MM Algorithms for BT](https://projecteuclid.org/journals/annals-of-statistics/volume-32/issue-1/MM-algorithms-for-generalized-Bradley-Terry-models/10.1214/aos/1079120141.full) | [ACADEMIC] | N/A | 2004 | 2026-03-07 | KEY: "Observed Wins = Expected Wins" interpretation. |
| 6 | [Bradley & Terry 1952](https://en.wikipedia.org/wiki/Bradley%E2%80%93Terry_model) | [ACADEMIC] | N/A | 1952 | 2026-03-07 | KEY: Original BT model. |
| 7 | [Thurstone 1927 — Law of Comparative Judgment](https://en.wikipedia.org/wiki/Law_of_comparative_judgment) | [ACADEMIC] | N/A | 1927 | 2026-03-07 | KEY: Gaussian noise model; probit formulation. |
| 8 | [Luce 1959 — Choice Axiom](http://www.scholarpedia.org/article/Luce's_choice_axiom) | [ACADEMIC] | N/A | 1959 | 2026-03-07 | KEY: IIA; ratio-scale choice. Foundation for BT and PL. |
| 9 | [McFadden 1974 — Conditional Logit](https://eml.berkeley.edu/books/choice2nd/Ch03_p34-75.pdf) | [ACADEMIC] | N/A | 1974 | 2026-03-07 | KEY: Random utility model; Gumbel → logit. Nobel 2000. |
| 10 | [Plackett-Luce explainer](https://statisticaloddsandends.wordpress.com/2024/04/24/what-is-the-plackett-luce-model/) | [TUTORIAL] | N/A | 2024-04 | 2026-03-07 | KEY: PL generalizes BT to full rankings. |
| 11 | [Fürnkranz & Hüllermeier 2010](https://link.springer.com/book/10.1007/978-3-642-14125-6) | [TEXTBOOK] | N/A | 2010 | 2026-03-07 | KEY: Canonical preference learning reference. |
| 12 | [HuggingFace pref-tuning blog](https://huggingface.co/blog/pref-tuning) | [TUTORIAL] | `sources/huggingface.co/blog/pref-tuning/` | 2024 | 2026-03-07 | KEY: Practical DPO/IPO/KTO comparison. |
| 13 | [Brenndoerfer — BT tutorial](https://mbrenndoerfer.com/writing/bradley-terry-model-pairwise-preferences-rankings) | [TUTORIAL] | `sources/mbrenndoerfer.com/` | 2024 | 2026-03-07 | KEY: Interactive visual BT tutorial. |
| 14 | [Brenndoerfer — Human Preference Data Collection](https://mbrenndoerfer.com/writing/human-preference-data-collection-rlhf-alignment) | [TUTORIAL] | `sources/mbrenndoerfer.com/writing/human-preference-data-collection-rlhf-alignment/` | 2024 | 2026-03-07 | KEY: Data collection best practices for preference annotation. |
| 15 | [LMSYS Chatbot Arena blog](https://lmsys.org/blog/2023-12-07-leaderboard/) | [TUTORIAL] | N/A | 2023-12 | 2026-03-07 | KEY: BT for ranking 90+ LLMs. Elo→BT transition. |
| 16 | [Rao-Kupper 1967 / Davidson 1970](https://encyclopediaofmath.org/wiki/Paired_comparison_model) | [ACADEMIC] | N/A | 1967/1970 | 2026-03-07 | KEY: BT extensions for ties. |
| 17 | [Herbrich et al. 2007 — TrueSkill](https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/) | [ACADEMIC] | N/A | 2007 | 2026-03-07 | KEY: Bayesian skill rating. Factor graphs, expectation propagation. |
| 18 | [Glickman — Glicko/Glicko-2](http://www.glicko.net/glicko.html) | [ACADEMIC] | N/A | 1999/2012 | 2026-03-07 | KEY: Rating deviation, volatility. Extends Elo with uncertainty. |
| 19 | [Optimal Design for Human Preference Elicitation (arXiv 2404.13895)](https://arxiv.org/abs/2404.13895) | [ACADEMIC] | N/A | 2024-04 | 2026-03-07 | KEY: Information-gathering policies for preference elicitation. |
| 20 | [Crowdsourcing Pairwise Comparisons (arXiv 2305.20042)](https://dl.acm.org/doi/10.1145/3610183) | [ACADEMIC] | N/A | 2023 | 2026-03-07 | KEY: Pairwise comparisons reduce bias vs. majority-vote; O(N log N) scaling. |
| 21 | Existing: `Bradley-Terry Model Explained - Derivations.md` | [EXISTING] | local | — | 2026-03-07 | KEY: Comprehensive BT derivation + contextual BT + multi-annotator + multi-criteria + statsmodels code. |
| 22 | Existing: `TrueSkill.md` | [EXISTING] | local | — | 2026-03-07 | KEY: Bayesian inference primer, TrueSkill model, factor graphs, batch updates, contextual extension, multi-criteria TrueSkill. |
| 23 | Existing: `Ranking Methods Beyond Elo.md` | [EXISTING] | local | — | 2026-03-07 | KEY: BT, Thurstone, Glicko/Glicko-2, TrueSkill, PageRank, Borda, Copeland, Kemeny-Young. Proves Elo≡BT mathematically. |
| 24 | Existing: `Ranking Options With Multi-Criteria Pairwise Preferences.md` | [EXISTING] | local | — | 2026-03-07 | KEY: BTL + AHP combined approach. Saaty's scale, consistency ratio, worked TTS example. |
| 25 | Existing: `Ranking TTS Models With Annotator Heterogeneity.md` | [EXISTING] | local | — | 2026-03-07 | KEY: Pooled vs. fixed-effects vs. random-effects (GLMM) for handling annotator disagreement. |
| 26 | [Lilian Weng — "Reward Hacking in RL"](https://lilianweng.github.io/posts/2024-11-28-reward-hacking/) | [TUTORIAL] | N/A | 2024-11 | 2026-03-07 | KEY: Taxonomy of reward hacking failure modes in RLHF. Potential-based reward shaping (Ng et al.). Mitigations. |
| 27 | [Lilian Weng — "Thinking about High-Quality Human Data"](https://lilianweng.github.io/posts/2024-02-05-human-data-quality/) | [TUTORIAL] | N/A | 2024-02 | 2026-03-07 | KEY: Annotator management, task design, wisdom of crowds, quality assurance for RLHF labeling. |
| 28 | [Cameron Wolfe — "Reward Models"](https://cameronrwolfe.substack.com/p/reward-models) | [TUTORIAL] | N/A | 2024 | 2026-03-07 | KEY: BT as foundation for RM training. RM architecture details. Practical training considerations. |
| 29 | [Cameron Wolfe — "Direct Preference Optimization"](https://cameronrwolfe.substack.com/p/direct-preference-optimization) | [TUTORIAL] | N/A | 2024 | 2026-03-07 | KEY: Accessible DPO deep-dive with code-level detail. BT → DPO derivation walkthrough. |
| 30 | [Nathan Lambert — "The DPO Debate"](https://www.interconnects.ai/p/the-dpo-debate) | [TUTORIAL] | N/A | 2024 | 2026-03-07 | KEY: DPO vs PPO driven by data quality, not optimizer. Open-source community limitations. |
| 31 | [Nathan Lambert — "Why Reward Models Are Key"](https://www.interconnects.ai/p/why-reward-models-matter) | [TUTORIAL] | N/A | 2024 | 2026-03-07 | KEY: RMs still important in DPO era. Per-token reward analysis gap. Auditing LLM representations. |
| 32 | [Sebastian Raschka — "LLM Training: RLHF and Its Alternatives"](https://magazine.sebastianraschka.com/p/llm-training-rlhf-and-its-alternatives) | [TUTORIAL] | N/A | 2024 | 2026-03-07 | KEY: Modern 3-stage pipeline overview. DPO efficiency vs RLHF benchmarks. |
| 33 | [BAIR Blog — "Rethinking the Role of PPO in RLHF" (P3O)](https://bair.berkeley.edu/blog/2023/10/16/p3o/) | [TUTORIAL] | N/A | 2023-10 | 2026-03-07 | KEY: Mismatch between pairwise RM training and absolute RL optimization. P3O applies comparative learning throughout. |
| 34 | [Gregory Gundersen — "The Fisher Information"](https://gregorygundersen.com/blog/2019/11/21/fisher-information/) | [TUTORIAL] | N/A | 2019-11 | 2026-03-07 | KEY: Rigorous Fisher Information derivation. Foundation for CI computation in BT models. |
| 35 | [Gregory Gundersen — "Asymptotic Normality of MLEs"](https://gregorygundersen.com/blog/2019/11/28/asymptotic-normality-mle/) | [TUTORIAL] | N/A | 2019-11 | 2026-03-07 | KEY: Why MLE estimates are asymptotically normal with variance = inverse Fisher Information. Justifies CI formulas for BT. |

:::

---

## Chapter Overview

**Total sections:** 6 (plus introduction and closing)
**Estimated total length:** 10,000–12,000 words
**Running example:** A product manager at a tech company is evaluating **C = 20 Text-to-Speech (TTS) engines** — an actual project the author undertook. They need to determine which sounds most natural by collecting pairwise human preferences from 10 annotators working in parallel. The example begins simply (3 engines, basic BT), scales through real challenges (20 engines, experimental design, batch annotation), explores Bayesian alternatives (TrueSkill for online updating), addresses messy realities (annotator disagreement, multi-criteria evaluation of warmth/clarity/shrillness), and connects to LLM alignment in the final section.

### Hook & Running Example Design

The chapter opens with a deceptively simple scenario: you have three TTS engines and 300 pairwise human judgments. Which engine is best? And — critically — *how much* better is it? Simple win-counting gives an answer, but it ignores the strength-of-schedule problem. The Bradley-Terry model gives a principled answer by assigning each engine a latent "skill" parameter, and the opening section reveals that this 1952 model is mathematically equivalent to logistic regression.

The hook deepens when we reveal the intellectual lineage: Thurstone (1927, psychophysics) → Zermelo (1929, chess) → Bradley & Terry (1952, statistics) → Luce (1959, mathematical psychology) → Elo (1960, chess) → McFadden (1974, econometrics, Nobel Prize) → Glicko (1999) → TrueSkill (2007, Xbox Live) → RankNet (2005, web search) → Christiano et al. (2017, deep RL from preferences) → InstructGPT (2022, RLHF at scale) → DPO (2023). The same mathematical structure — a logistic function of score differences — has been independently discovered across six fields over a century.

The running TTS example recurs in every section: Section 1 uses 3 engines for the core BT derivation; Section 2 covers Bayesian alternatives (TrueSkill for batch online ranking with 10 parallel annotators, Glicko, Elo); Section 3 surveys the full landscape (Thurstone, Plackett-Luce, PageRank, voting methods); Section 4 covers how to actually collect the preference data (experiment design, annotation UI, quality control, adaptive pair selection); Section 5 handles practical extensions for real-world messiness (multi-criteria via BT+AHP, annotator heterogeneity via GLMM, ties, contextual preferences); Section 6 bridges to RLHF and DPO in one comprehensive section.

**Hook Image:** The InstructGPT pipeline diagram (`sources/arxiv-2203.02155/figs/InstructGPT_Diagram3.1.png`) is the hook image — it shows how human preference data flows through the RLHF pipeline. The reader sees it early, recognizes the preference data collection step, and realizes the entire chapter is about understanding the mathematical models that power that step. It reappears with full explanation in Section 6.

---

## Section Plan

### Section 1: The Bradley-Terry Model — A Mathematical Foundation for Preference {#sec-bradley-terry}

**File:** `_01-bradley-terry-model.qmd`
**Estimated length:** 2,000 words
**Goal:** The reader should understand the BT model from first principles: the core assumption, re-parameterization to log-abilities, the logistic regression equivalence, the MLE objective, the "Observed Wins = Expected Wins" interpretation, graph connectivity for convergence, and confidence intervals. They should be able to set up and solve a small BT problem.
**Running example application:** 3 TTS engines (Clarity, Brio, Sonus) with a 3×3 win matrix. Full numerical walkthrough from raw data → log-likelihood → solved parameters → predicted probabilities → confidence intervals → "Can we distinguish Clarity from Sonus?"

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Existing: BT Derivations | `Preference Learning/Bradley-Terry Model Explained - Derivations.md` | Sections 1–9 | Full derivation, TTS example, solved numerical values, CIs, graph connectivity |
| Existing: 1. Ranking Preferences | `Preference Learning/1. Ranking Preferences...` | Sections 1–9 | Same content, cross-reference for consistency |
| Hunter 2004 | N/A | "W_i = E[W_i]" section | Observed-equals-expected interpretation |
| Brenndoerfer tutorial | `sources/mbrenndoerfer.com/` | Interactive examples | Visual intuition |
| Gundersen — Fisher Information | gregorygundersen.com | Full derivation | Rigorous foundation for CI computation; why MLE is asymptotically normal |

**Content outline:**
1. **The problem: ranking from pairwise comparisons** — TTS example, win matrix, why simple win-counting fails (strength-of-schedule). [Concrete example first]
2. **The core assumption: P(i > j) = θ_i / (θ_i + θ_j)** — Scale indeterminacy, constraint choices.
3. **Re-parameterization to log-abilities: P(i > j) = σ(λ_i - λ_j)** — The logistic sigmoid connection. The "aha moment."
4. **Maximum Likelihood Estimation** — Full derivation: likelihood → log-likelihood → gradient condition → "Observed Wins = Expected Wins."
5. **The logistic regression connection** — Design matrix X with +1/-1 encoding. Training with statsmodels/GLM. No intercept. Worked code.
6. **Convergence and confidence** — Connected comparison graph, strongly connected win graph. Fisher Information → variance-covariance matrix → SE → 95% CI. Testing pairwise differences: Var(λ_i − λ_j). The "statistical tie" conclusion.
7. **Solved numerical example** — Full walkthrough with TTS numbers.

**Key equations:**
- $P(i \succ j) = \frac{\theta_i}{\theta_i + \theta_j} = \sigma(\lambda_i - \lambda_j)$
- Log-likelihood: $\ell(\Lambda) = \sum_i W_i \log(\theta_i) - \sum_{i<j} n_{ij} \log(\theta_i + \theta_j)$
- Gradient condition: $W_i = \sum_{j \neq i} n_{ij} P(i \succ j)$
- $\text{Var}(\hat{\lambda}_i - \hat{\lambda}_j) = \text{Var}(\hat{\lambda}_i) + \text{Var}(\hat{\lambda}_j) - 2\text{Cov}(\hat{\lambda}_i, \hat{\lambda}_j)$

**Visualizations:** D2 concept map, Graphviz connected/disconnected graphs, sigmoid plot, CI visualization.
**Source images to embed:** None (custom diagrams).

**Self-explanation prompts:**
1. "If you multiply all θ parameters by 10, what happens to the probabilities? Why?"
2. "You ran a BT model on 20 engines and the top two have scores 2.1 and 1.9 with SEs of 0.3. Can you conclude engine 1 is better?"

---

### Section 2: Bayesian Preference Models — TrueSkill, Glicko, and Online Rating Systems {#sec-bayesian-models}

**File:** `_02-bayesian-preference-models.qmd`
**Estimated length:** 2,000 words
**Goal:** The reader should understand the Bayesian alternative to BT: modeling skill as a *distribution* (μ, σ²) rather than a point estimate. They should understand TrueSkill's generative model (skill → performance → outcome), the Elo system and its mathematical equivalence to BT, Glicko's rating deviation, and the key distinction between offline (BT) vs. online (Elo/Glicko/TrueSkill) preference systems. They should know when to use each.
**Running example application:** We now have 10 annotators working in parallel on the TTS evaluation. BT requires all data before fitting; TrueSkill can update incrementally in batches. We show how TrueSkill handles batch updates from 10 simultaneous annotators, tracks uncertainty (σ) that shrinks with more data, and naturally handles the addition of a 21st TTS engine without re-computing from scratch.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Existing: TrueSkill.md | `Preference Learning/TrueSkill.md` | Full file | Bayesian primer, TrueSkill model, factor graph, batch updates, worked 1v1 example |
| Existing: Ranking Methods Beyond Elo.md | `Preference Learning/Ranking Methods Beyond Elo.md` | Sections on Elo, Glicko, TrueSkill | Elo derivation, Elo≡BT proof, Glicko formulas, comparison table |
| Glickman — Glicko site | N/A | Papers | RD update formulas, g(RD) dampening |
| Microsoft TrueSkill page | N/A | Overview | Factor graph diagram |

**Content outline:**
1. **The limitation of BT: no uncertainty, no online updates** — BT gives point estimates. It doesn't know how *certain* it is about each engine. Adding a new engine requires re-solving from scratch. Motivate the Bayesian approach.
2. **Skill as a distribution: the Gaussian prior** — Each engine has skill N(μ, σ²). μ = best guess, σ = uncertainty. New engines start with high σ. After many comparisons, σ shrinks.
3. **TrueSkill's generative model** — Skill → Performance (adds β² game noise) → Team performance (sum) → Outcome (difference > 0). Factor graph visualization. Expectation propagation for approximate inference.
4. **The Elo rating system and its equivalence to BT** — Elo expected score formula. The key derivation: if R_i = 400·log₁₀(θ_i), then Elo's expected score IS the BT probability. The K-factor update rule. Why LMSYS switched from Elo to BT (stability, no order dependence, CIs).
5. **Glicko and Glicko-2: Elo with uncertainty** — Rating deviation (RD) that increases with inactivity. The g(RD) dampening function. Glicko-2 adds volatility σ.
6. **Batch TrueSkill for parallel annotation** — The key practical section. Freeze priors → calculate individual deltas → aggregate → apply. Diverse batch selection algorithm (informativeness + diversity penalty). The complete live UI workflow for 10 annotators.
7. **Offline vs. online: when to use which** — BT for static retrospective analysis; TrueSkill for live annotation systems; Elo for simple production leaderboards. Summary comparison table.

**Key equations:**
- TrueSkill: $P_i \sim \mathcal{N}(\mu_i, \sigma_i^2 + \beta^2)$; team performance $t \sim \mathcal{N}(\sum \mu_i, \sum(\sigma_i^2 + \beta^2))$
- Elo ≡ BT: $E_A = \frac{1}{1+10^{(R_B-R_A)/400}}$ where $R_i = 400 \log_{10}(\theta_i)$
- Elo update: $R'_A = R_A + K(S_A - E_A)$
- Glicko: $E_j = \frac{1}{1+10^{-g(RD_j)(r-r_j)/400}}$ where $g(RD) = \frac{1}{\sqrt{1 + 3q^2 RD^2/\pi^2}}$

**Visualizations:** Factor graph for TrueSkill 1v1, comparison table (BT vs. Elo vs. Glicko vs. TrueSkill), batch annotation workflow diagram.
**Source images to embed:** None (custom diagrams).

**Self-explanation prompts:**
1. "In TrueSkill, a new engine starts with μ=25, σ=8.33. After 20 comparisons, σ drops to 3.1. What does this mean practically?"
2. "Why is the Elo system order-dependent (processing game 1 before game 2 gives different results than game 2 before game 1), while BT is not?"

---

### Section 3: A Century of Preference Models — From Thurstone to the Chatbot Arena {#sec-model-landscape}

**File:** `_03-preference-model-landscape.qmd`
**Estimated length:** 2,000 words
**Goal:** The reader should understand the intellectual lineage across six fields, see how BT relates to Thurstone (Gaussian vs. logistic), Luce's Choice Axiom (IIA), Plackett-Luce (listwise), McFadden's discrete choice (econometrics), and the alternative families of ranking methods: graph-based (PageRank, Rank Centrality), voting-theoretic (Borda, Copeland, Kemeny-Young, Ranked Pairs), and spectral methods. Critically, they should understand *why BT dominates in practice* despite these alternatives having theoretical advantages, and the recent 2024 evidence that social choice methods may outperform BT/Elo for noisy heterogeneous preferences.
**Running example application:** When LMSYS Chatbot Arena needed to rank 90+ LLMs from 800K+ crowdsourced votes, they chose BT over Elo. But recent 2024 research suggests Copeland or Ranked Pairs might have been even better. We use this as a lens to survey the full landscape.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Existing: Ranking Methods Beyond Elo.md | local | Full survey | BTL, Thurstone, PageRank, Borda, Copeland, Kemeny-Young, Minimax |
| Existing: Ranking Options With Multi-Criteria.md | local | Thurstone, AHP sections | Thurstone Case V derivation |
| Ryan 2024 — "Better than Elo" | nickcdryan.com | Full analysis | Copeland and Ranked Pairs outperform Elo for imperfect voters |
| DeepMind — Soft Condorcet Optimization (arXiv 2411.00119) | N/A | Abstract + results | SCO rankings outperform Elo |
| Negahban, Oh, Shah — Rank Centrality | N/A | Algorithm + results | Matches BT MLE performance, model-free |
| arXiv 2312.08358 — RLHF implicitly uses Borda count | N/A | Key finding | Hidden context → Borda aggregation → counter-intuitive results |
| Langville & Meyer — "Who's #1?" | N/A | Method comparison | When to use which method |
| Wikipedia: Thurstone, Luce, PL | N/A | Historical sections | Dates, key contributions |
| McFadden 1974 | N/A | Conditional logit | Random utility, Gumbel → logit |
| LMSYS blog | N/A | Dec 2023 | Why BT over Elo |
| Plackett-Luce explainer | N/A | Model definition | Sequential choice |

**Content outline:**
1. **The timeline: a universal mathematical idea** — Visual timeline from Thurstone 1927 → DPO 2023. Six fields, one equation.
2. **Thurstone's model (1927): Gaussian noise** — Probit formulation: $P(i \succ j) = \Phi((\mu_i - \mu_j)/\sigma\sqrt{2})$. Case V simplification. BT is the logistic special case. When are they different? (Almost never — the logistic and Gaussian CDFs differ by <2% everywhere.)
3. **Luce's Choice Axiom (1959): IIA** — The matching law: $P(a|S) = u(a)/\sum u(s)$. When IIA breaks: the "red bus / blue bus" problem. Nested logit and mixed logit as fixes.
4. **Plackett-Luce: from pairs to rankings** — Sequential choice process. Why this matters for RLHF: annotators rank K responses → $\binom{K}{2}$ pairs vs. PL likelihood directly. PL is more data-efficient when you have full rankings.
5. **McFadden and discrete choice (1974)** — Random utility model, Gumbel (extreme value) distribution → logit formula, Nobel Prize 2000. BT as conditional logit special case.
6. **Beyond probabilistic models: graph and voting methods** — This is where the alternatives live. Three families:
   - **Graph-based:** PageRank on preference graphs (items are nodes, edges weighted by win counts; rank = stationary distribution of random walk). Rank Centrality (Negahban et al.): model-free, matches BT MLE performance, computationally simpler. The theoretical connection: BT scores are "scaled PageRanks" under quasi-symmetry.
   - **Voting-theoretic:** Borda Count (total wins = simple and intuitive but manipulable). Copeland's method (count pairwise "majority wins" — a Condorcet method). Kemeny-Young (find the ranking minimizing disagreement with observed preferences — NP-hard but optimal). Ranked Pairs (resolves cycles by locking in the strongest pairwise majorities first). The Condorcet paradox: when no single ranking is consistent with all pairwise majorities.
   - **The 2024 reappraisal:** Ryan (2024) and DeepMind's Soft Condorcet Optimization show Copeland and Ranked Pairs outperform Elo when voters are heterogeneous/imperfect — exactly the setting of crowdsourced LLM evaluation. The surprising finding that standard RLHF *implicitly* uses Borda count aggregation (arXiv 2312.08358), which can produce counter-intuitive results with hidden context.
7. **Why BT still dominates in practice (and when it shouldn't)** — BT's advantages: principled probabilistic model with confidence intervals, logistic regression connection (use any GLM solver), natural connection to neural reward models. Alternatives' advantages: no parametric assumptions, better handling of intransitivity and voter heterogeneity. The practical takeaway: use BT for reward model training and offline analysis; consider Copeland/Ranked Pairs for leaderboards with diverse evaluators. Comparison table covering all methods.

**Key equations:**
- Thurstone: $P(i \succ j) = \Phi\left(\frac{\mu_i - \mu_j}{\sigma\sqrt{2}}\right)$
- Luce: $P(a | S) = \frac{u(a)}{\sum_{s \in S} u(s)}$
- Plackett-Luce: $P(\sigma) = \prod_{k=1}^{n} \frac{u(\sigma(k))}{\sum_{l=k}^{n} u(\sigma(l))}$
- McFadden: $P(i | C) = \frac{e^{V_i}}{\sum_{j \in C} e^{V_j}}$
- Borda: $B_i = \sum_{j \neq i} w_{ij}$ (total wins)
- Copeland: $C_i = |\{j : w_{ij} > w_{ji}\}|$ (count of pairwise majority wins)

**Visualizations:** D2 timeline diagram, comparison table (10+ methods across 5 dimensions: model type, data requirements, handles intransitivity?, online/offline, CI available?), "red bus / blue bus" IIA diagram, preference graph for PageRank illustration.
**Source images to embed:** None (custom diagrams).

**Self-explanation prompts:**
1. "An RLHF annotator ranks 4 responses: y_3 > y_1 > y_4 > y_2. How many pairwise preference pairs does this produce? Write them out. How would Plackett-Luce use this ranking differently than BT?"
2. "Copeland outperforms Elo for heterogeneous voters (Ryan 2024). Why might it still be worse than BT for training a reward model for RLHF? (Hint: what does BT give you that Copeland doesn't?)"

---

### Section 4: Collecting Preference Data — Experiment Design, Annotation, and Quality Control {#sec-data-collection}

**File:** `_04-collecting-preference-data.qmd`
**Estimated length:** 1,800 words
**Goal:** The reader should understand the complete pipeline for collecting high-quality pairwise preference data: designing the experiment (pair selection strategy, number of comparisons), building the annotation interface (UI best practices, forced choice vs. tie option, randomization), ensuring quality (gold standard questions, inter-annotator agreement, filtering), and scaling efficiently (adaptive sampling, circulant designs, batch workflows). This is the most practically actionable section.
**Running example application:** We are setting up the actual TTS evaluation with 20 engines, 5 input texts per engine (100 samples), 10 annotators working in parallel via a web UI. We walk through the complete workflow: pair selection → UI design → quality control → adaptive refinement.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Brenndoerfer — Data Collection blog | `sources/mbrenndoerfer.com/writing/human-preference-data-collection-rlhf-alignment/` | Full article | Best practices, UI design, annotation guidelines |
| Lilian Weng — High-Quality Human Data | lilianweng.github.io | Full post | Annotator management, task design, wisdom of crowds, quality assurance frameworks |
| Existing: Bradley-Terry Derivations.md | local | Q on C=20 experimental design | Circulant tournament, adaptive sampling |
| Existing: TrueSkill.md | local | Batch selection, diverse batch algorithm | Diversity penalty algorithm for parallel annotation |
| Existing: Ranking Methods Beyond Elo.md | local | Section on active sampling | Hybrid adaptive sampling algorithm, outcome uncertainty |
| arXiv 2404.13895 — Optimal Design for Preference Elicitation | N/A | Abstract + method | Information-gathering policies |
| arXiv 2305.20042 — Crowdsourcing Pairwise Comparisons | N/A | Key results | O(N log N) comparisons, bias reduction vs. majority-vote |

**Content outline:**
1. **Why pairwise comparisons beat absolute ratings** — Cognitive load argument. Humans are better at relative judgments. No calibration needed across annotators. The 2023 study showing pairwise comparisons reduce bias vs. majority-vote.
2. **Designing the experiment: which pairs to compare** — The problem: C(20,2) = 190 pairs × 5 texts = 950 comparisons per annotator. Static designs: circulant tournament (k-neighbor, 79% pair reduction). The connectivity requirement. Spanning tree as bare minimum.
3. **Adaptive pair selection: maximizing information per comparison** — The "most uncertain pair" heuristic: query the pair where P(i > j) ≈ 0.5. The hybrid algorithm: Phase 1 (warm-start with random spanning tree + extra random pairs) → Phase 2 (adaptive refinement via outcome uncertainty). Budget allocation.
4. **Building the annotation interface** — Anonymity (generic "Sample 1" / "Sample 2" labels). Randomized presentation order. Clear question framing. Forced choice with optional tie. Logging: (annotator_id, winner, loser, text_id, timestamp).
5. **Quality control** — Gold standard "trap" questions (obvious winner). Inter-annotator agreement (Krippendorff's α, Fleiss' κ). Filtering low-quality annotators. The "10% gold question" rule. **Annotator management (adapted from Weng 2024):** selecting annotators with matched skillsets, training sessions, regular feedback and calibration cycles. The "wisdom of the crowd" insight: non-expert annotators produce quality labels with proper QA, including agreement-based weighting to downweight spammers.
6. **Scaling with parallel annotators** — The batch workflow: select k pairs → dispatch to k annotators → collect asynchronously → batch update model → repeat. Diverse batch selection (informativeness + diversity penalty to avoid redundant pairs).

**Key equations:**
- Circulant design: $C \times k$ total pairs, each item in $2k$ comparisons
- Outcome uncertainty: $\text{Uncertainty}(i,j) = 1 - |2 \cdot P(i > j) - 1|$
- Scaling: Pairwise comparisons achieve same accuracy with $O(N \log N)$ labels vs. $O(N)$ for absolute ratings

**Visualizations:** Annotation UI mockup (side-by-side TTS comparison), circulant tournament diagram, adaptive sampling loop flowchart.
**Source images to embed:** None (custom diagrams).

**Self-explanation prompts:**
1. "You have 100 TTS samples and a budget of 1000 comparisons (~20% of all pairs). Describe your two-phase strategy for selecting which pairs to annotate."
2. "An annotator gets 3 out of 10 gold-standard questions wrong. What should you do with their other annotations?"

---

### Section 5: Practical Extensions — Multi-Criteria, Annotator Heterogeneity, Ties, and Context {#sec-practical-extensions}

**File:** `_05-practical-extensions.qmd`
**Estimated length:** 1,800 words
**Goal:** The reader should understand how to handle four common real-world complications: (a) multi-criteria evaluation using BT+AHP or BT+weighted aggregation, (b) annotator heterogeneity using random-effects/GLMM models, (c) ties using Rao-Kupper/Davidson extensions, (d) contextual preferences where the ranking depends on the input. They should have practical guidance for their own preference evaluation projects.
**Running example application:** Our TTS evaluation now faces real-world messiness: we want separate rankings on warmth, clarity, and shrillness; some annotators are unreliable; some pairs sound genuinely identical; and Engine A is great at news text but terrible at poetry.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Existing: Ranking Options With Multi-Criteria.md | local | Full file | BTL + AHP combined approach, Saaty's scale, consistency ratio, worked example |
| Existing: Ranking TTS Models With Annotator Heterogeneity.md | local | Full file | Pooled vs. fixed-effects vs. random-effects (GLMM) |
| Existing: 3. Modeling Multiple Preference Criteria.md | local | Full file | Descriptive (learned weights) vs. prescriptive (imposed weights), z-score normalization |
| Existing: Bradley-Terry Derivations.md | local | Q on contextual BT, Q on ties, Q on annotators | Conditional BT with features, tie-handling approaches, GLMM equations |
| Existing: TrueSkill.md | local | Multi-criteria TrueSkill section | Independent TrueSkill per criterion + AHP aggregation |
| Rao-Kupper/Davidson | N/A | Model definitions | Threshold parameter for ties |

**Content outline:**
1. **Multi-criteria preferences: "best" has many dimensions** — The problem: Engine A wins on clarity but loses on warmth. How to combine? Two approaches:
   - **Descriptive (data-driven):** Fit independent BT per criterion → use criterion skill-differences as features → fit logistic regression on "overall" preference → discover weights. The equation: $P(i \succ j | \text{Overall}) = \sigma(\sum_k w_k \Delta_{ij}^k)$.
   - **Prescriptive (business-driven):** Fit independent BT per criterion → z-score normalize → apply imposed weights (equal, ordered, AHP-derived). Saaty's scale, consistency ratio.
   - Worked example: Orion/Lyra/Cygnus TTS with clarity vs. pleasantness.
2. **Annotator heterogeneity: not all judges are equal** — Three approaches:
   - **Pooled:** Simple aggregation. Flawed: loud raters dominate; non-independence → overconfident SEs.
   - **Fixed effects:** $P_k(i \succ j) = \sigma((\lambda_i + \delta_{ik}) - (\lambda_j + \delta_{jk}))$. Too many parameters.
   - **Random effects (GLMM):** $\lambda_{ik} = \lambda_i + \epsilon_{ik}$ where $\epsilon_{ik} \sim \mathcal{N}(0, \tau_i^2)$. The recommended approach: separates global skill from annotator bias; τ² gives "controversiality" score. Use `lme4::glmer` or `BradleyTerry2::BTm`.
3. **Handling ties: "they sound the same"** — Standard BT has no tie mechanism. Extensions: Rao-Kupper (threshold η₀), Davidson (separate tie probability). Practical: split ties 0.5/0.5 as simple approximation.
4. **Contextual preferences: skill depends on the input** — $\lambda_i(x) = \lambda_i + \phi(x)^T \beta_i$. The "base skill + interaction" model. Feature engineering for input texts. The design matrix becomes larger. This is the bridge to neural reward models (Section 6).

**Key equations:**
- Multi-criteria (descriptive): $P(i \succ j | \text{Overall}) = \sigma\left(\sum_k w_k (\hat{\lambda}_i^k - \hat{\lambda}_j^k)\right)$
- Random effects: $P_k(i \succ j) = \sigma(\alpha_k(\lambda_i - \lambda_j))$ where α_k is annotator reliability
- Contextual BT: $P(i \succ j | x) = \sigma((\lambda_i + \phi(x)^T\beta_i) - (\lambda_j + \phi(x)^T\beta_j))$

**Visualizations:** Multi-criteria aggregation diagram, annotator reliability distribution, contextual BT feature-engineering table.
**Source images to embed:** None (custom diagrams).

**Self-explanation prompts:**
1. "After fitting a random-effects model, you find τ²_EngineA ≈ 0 and τ²_EngineB is very large. What does this tell you about each engine?"
2. "Engine A beats Engine B on news text, but Engine B beats Engine A on poetry. Can the basic BT model represent this? What do you need?"

---

### Section 6: From Classical Models to LLM Alignment — Reward Models, RLHF, and DPO {#sec-rlhf-dpo}

**File:** `_06-rlhf-and-dpo.qmd`
**Estimated length:** 2,000 words
**Goal:** The reader should understand how the classical BT model becomes the neural reward model in RLHF, the full 3-stage RLHF pipeline, and the complete DPO derivation that eliminates the reward model. They should see this as the natural culmination of all the preference learning theory from previous sections — BT's logistic model of preference becomes the loss function for training billion-parameter neural networks. Brief mention of DPO successors (IPO, KTO, SimPO) as pointers for further reading.
**Running example application:** The TTS scenario culminates: the contextual BT model from Section 5 (where skill is a function of input) is replaced by a neural network R_θ(x, y) that takes raw audio and outputs a scalar reward. Same BT loss, neural architecture. Then we show the LLM parallel and the DPO insight.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DPO Paper | `sources/arxiv-2305.18290/` | `main.tex` Sections 3–4 | KL objective → closed-form → reparameterization → DPO loss |
| InstructGPT | `sources/arxiv-2203.02155/` | Section 3, Figure 2 | 3-stage pipeline diagram |
| Christiano 2017 | `sources/arxiv-1706.03741/` | Sections 2–3 | Reward from trajectory preferences, setup diagram |
| Existing: (Rough).md | local | Q on reward model, normalization, DPO | Training loop, normalization, pairwise accuracy |
| Existing: Policy Optimization chapter | `Post-Training LLMs/Policy Gradient/2.1...` | Sections 2.2–2.3 | DPO derivation with Z(x) cancellation |
| Unification Survey 2026 | `sources/arxiv-2601.06108/` | Sections 3–5 | Three-axis taxonomy, IPO/KTO/SimPO brief |
| Cameron Wolfe — Reward Models | cameronrwolfe.substack.com | Full post | BT as RM foundation, architecture details, practical training |
| Cameron Wolfe — DPO | cameronrwolfe.substack.com | Full post | Accessible DPO walkthrough with code |
| Nathan Lambert — "The DPO Debate" | interconnects.ai | Key arguments | DPO vs PPO driven by data quality, not optimizer choice |
| Nathan Lambert — "Why Reward Models Matter" | interconnects.ai | Key arguments | RMs still important in DPO era; per-token reward gaps |
| Lilian Weng — Reward Hacking | lilianweng.github.io | Taxonomy + mitigations | Failure modes, potential-based shaping, KL penalty analysis |
| Sebastian Raschka — RLHF and Alternatives | magazine.sebastianraschka.com | Pipeline overview | DPO efficiency vs RLHF benchmarks |
| BAIR Blog — P3O | bair.berkeley.edu/blog | Mismatch analysis | Pairwise RM training vs. absolute RL optimization tension |

**Content outline:**
1. **From λ_i to R_θ(x, y): the conceptual leap** — Static BT → Conditional BT → Neural BT. The reward model IS the BT skill parameter, computed by a neural network. $P(y_w \succ y_l | x) = \sigma(R_\theta(x, y_w) - R_\theta(x, y_l))$. Same loss, same math, different parametrization. Architecture: text/audio encoder + pooling + MLP scalar head. The TTS ↔ LLM parallel (same loss, different modality).
2. **Training the reward model** — The BT loss for neural networks: two forward passes (y_w and y_l through the same model), compute difference, sigmoid, negative log-likelihood. Training loop pseudocode. Worked numerical example: initial scores (1.5, 1.2) → loss 0.56 → backprop → updated scores (2.1, 0.9) → loss 0.26. **Evaluation:** pairwise preference accuracy (the primary metric; baseline = 50%, good = 75%+). Average test loss as secondary metric. **Avoid:** tracking absolute average reward (meaningless due to scale invariance).
3. **The RLHF pipeline: SFT → Reward Model → PPO** — Three stages with InstructGPT diagram. SFT: teach the format. RM: learn latent reward from preferences (BT loss). PPO: optimize policy to maximize learned reward with KL penalty. **Reward normalization:** why absolute reward scale is arbitrary → center on SFT model's average score: $R'_\theta(y) = R_\theta(y) - \mu_{ref}$. **Reward hacking (adapted from Weng 2024):** policy exploits RM flaws → concrete examples (modifying unit tests, mimicking user biases) → mitigations: KL penalty, constrained optimization, ensemble RMs. **The pairwise-absolute mismatch (BAIR P3O):** RM is trained on *pairwise* comparisons but PPO uses *absolute* rewards — this inconsistency can cause instability. The 4-model memory footprint problem (policy, critic, RM, reference).
4. **DPO: eliminating the reward model** — The key derivation in 4 steps: (a) KL-constrained objective has closed-form optimal policy (Boltzmann distribution); (b) rearrange to get $r(x,y) = \beta \log \frac{\pi^*(y|x)}{\pi_{ref}(y|x)} + \beta \log Z(x)$; (c) substitute into BT → Z(x) cancels because BT only cares about reward *differences*; (d) the DPO loss. "Your language model is secretly a reward model." Algorithm pseudocode: forward passes on (y_w, y_l) through both π_θ and π_ref → compute log ratios → loss → backprop. RLHF vs. DPO comparison table (models: 4→2, stages: 3→2, stability: low→high). **Limitations:** likelihood displacement, SFT sensitivity, requires paired data.
5. **Beyond DPO: a brief survey** — IPO (regularization to prevent overfitting), KTO (unpaired binary feedback — works when you only have thumbs up/down, not preference pairs), SimPO (no reference model), ORPO (merges SFT + preference tuning). The three-axis framework (Raheja & Pochhi 2026): preference model × regularization × data distribution. **The Lambert insight (interconnects.ai):** DPO vs PPO performance is driven primarily by *data quality* (e.g., the UltraFeedback dataset) and hyperparameter exploration, not optimizer choice. The open-source community's bottleneck is data and evaluation, not algorithms. **Reward models still matter (Lambert):** even in the DPO era, explicit RMs serve as auditing tools for LLM representations; we still lack understanding of basic RM properties like per-token reward variation. Pointers for further reading rather than deep treatment. The key insight: all these methods are variations on the same BT-derived loss function, differing in how they handle regularization and data format.

**Key equations:**
- RM loss: $\mathcal{L}_{RM} = -\mathbb{E}[\log \sigma(R_\theta(x, y_w) - R_\theta(x, y_l))]$
- Pairwise accuracy: $A = \frac{1}{N}\sum \mathbb{1}(R_\theta(y_w) > R_\theta(y_l))$ (primary RM eval metric; 50% = random, 75%+ = good)
- Reward normalization: $R'_\theta(y) = R_\theta(y) - \mu_{ref}$ where $\mu_{ref} = \mathbb{E}[R_\theta(\hat{y}_{SFT})]$
- RLHF: $\max_{\pi_\theta} \mathbb{E}[r_\phi(x,y)] - \beta D_{KL}(\pi_\theta \| \pi_{ref})$
- Optimal policy: $\pi^*(y|x) = \frac{1}{Z(x)}\pi_{ref}(y|x)\exp(\frac{1}{\beta}r(x,y))$
- DPO loss: $\mathcal{L}_{DPO} = -\mathbb{E}\left[\log \sigma\left(\beta\left(\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)} - \log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right)\right)\right]$

**Visualizations:**
- Source image: InstructGPT pipeline (`sources/arxiv-2203.02155/figs/InstructGPT_Diagram3.1.png`)
- Source image: DPO teaser (`sources/arxiv-2305.18290/figures/diagrams/teaser.png`)
- Source image: Christiano setup (`sources/arxiv-1706.03741/setup.png`)
- Table: RLHF vs. DPO comparison
- D2 diagram: information flow in DPO

**Source images to embed:**
- `sources/arxiv-2203.02155/figs/InstructGPT_Diagram3.1.png`
- `sources/arxiv-2305.18290/figures/diagrams/teaser.png`
- `sources/arxiv-1706.03741/setup.png`

**Self-explanation prompts:**
1. "In the DPO derivation, why does Z(x) cancel? What property of BT makes this possible?"
2. "DPO and RLHF train on the same preference data. So where did the reward model go?"

---

## Source Image Catalog

| # | Source Image Path | Caption | Relevant Section(s) | Notes |
|---|---|---|---|---|
| 1 | `sources/arxiv-2203.02155/figs/InstructGPT_Diagram3.1.png` | "Three steps: SFT, RM training, RL via PPO" | §6 RLHF, §Hook | Canonical RLHF pipeline — MUST include |
| 2 | `sources/arxiv-2305.18290/figures/diagrams/teaser.png` | "DPO directly optimizes the policy vs. RLHF pipeline" | §6 DPO | DPO pipeline comparison — MUST include |
| 3 | `sources/arxiv-1706.03741/setup.png` | "Reward learning from trajectory preferences" | §6 RLHF | Christiano's original preference learning setup |
| 4 | `sources/arxiv-2305.18290/figures/results/frontier.png` | "Reward vs. KL frontier" | §6 DPO | DPO vs. PPO performance |
| 5 | `sources/arxiv-2305.18290/figures/results/survey.png` | "GPT-4 win rates on summarization" | §6 DPO | DPO vs. PPO vs. SFT |

**Priority order for visuals:**
1. **Source images from papers** — canonical, authoritative
2. **D2 diagrams** — concept maps, flowcharts, timelines
3. **Python/hvPlot** — sigmoid plots, data visualizations
4. **Graphviz** — graph connectivity illustrations, factor graphs

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,200 words

**Content:**
1. **Key takeaways** (7 bullets):
   - BT converts pairwise preferences into quantitative skill scores via $P(i \succ j) = \sigma(\lambda_i - \lambda_j)$, equivalent to logistic regression.
   - TrueSkill adds Bayesian uncertainty tracking (μ, σ²), enabling online updates and batch annotation workflows.
   - Elo is mathematically equivalent to BT ($R_i = 400 \log_{10} \theta_i$) but processes data sequentially; BT is preferred for batch analysis.
   - Efficient data collection uses adaptive pair selection (query the most uncertain pair) with diversity constraints for parallel annotation.
   - Real-world complications (multi-criteria, annotator disagreement, ties, context-dependence) each have principled BT extensions.
   - In RLHF, a neural network replaces the static BT parameter, trained with the same BT loss to become a "reward model."
   - DPO eliminates the reward model by showing the policy implicitly defines the reward through BT reparameterization.
2. **Concept map** (D2): Thurstone → BT → Elo → Glicko → TrueSkill (Bayesian branch); BT → Luce → PL (listwise branch); BT → RankNet → RLHF RM → DPO (neural branch)
3. **Retrieval practice questions** (7, with collapsed answers)
4. **Common mistakes** (5): win percentages instead of BT, trusting overlapping CIs, pooled annotator model, absolute reward scores, BT with intransitive data
5. **Curated resources** (verified URLs): Hunter 2004, Brenndoerfer tutorials, LMSYS blog, TrueSkill docs, Rafailov 2023 DPO, Fürnkranz & Hüllermeier 2010, Lilian Weng "Reward Hacking" and "High-Quality Human Data", Cameron Wolfe "Reward Models" and "DPO", Nathan Lambert "The DPO Debate", Gregory Gundersen "Fisher Information"

---

## Cross-Cutting Concerns

**Notation table:**

| Symbol | Definition |
|--------|-----------|
| $C$ | Total number of items to be ranked |
| $\theta_i$ | BT strength parameter; $\theta_i \in (0, \infty)$ |
| $\lambda_i$ | Log-ability: $\lambda_i = \log(\theta_i)$; $\lambda_i \in \mathbb{R}$ |
| $\sigma(z)$ | Logistic sigmoid: $1/(1+e^{-z})$ |
| $w_{ij}, n_{ij}, W_i$ | Win counts, total comparisons, total wins |
| $\mu_i, \sigma_i^2$ | TrueSkill/Glicko skill mean and variance |
| $\beta^2$ | TrueSkill performance variance |
| $R_i, K$ | Elo rating and K-factor |
| $RD_i$ | Glicko ratings deviation |
| $x$ | Prompt / input context |
| $y, y_w, y_l$ | Response; preferred; dispreferred |
| $R_\theta(x,y), r_\phi(x,y)$ | Neural reward model |
| $\pi_\theta, \pi_{ref}$ | Policy; reference policy |
| $\beta$ (RLHF) | KL-penalty coefficient |
| $Z(x)$ | Partition function |

**Concept map design:** D2 diagram with 3 branches from BT: (1) Bayesian branch (Elo → Glicko → TrueSkill), (2) Listwise branch (Luce → PL), (3) Neural branch (RankNet → RLHF RM → DPO → IPO/KTO). Historical roots: Thurstone (1927), Zermelo (1929).

**Prerequisite knowledge to recap:** Logistic regression, Bayes' theorem, Gaussian distributions, MLE, basic gradient descent.

**Common Misconceptions:**
1. **"BT and DPO are unrelated."** DPO is a direct mathematical consequence of BT reparameterization.
2. **"TrueSkill and BT are completely different."** TrueSkill uses a Bayesian framework where BT is the likelihood model. The probit link in TrueSkill approximates BT's logit link.
3. **"Preference learning = AI alignment."** Preference learning is application-agnostic (statistics 1927, economics 1974). RLHF is one application.
4. **"Higher reward = better model."** Only reward *differences* are meaningful; absolute scale is arbitrary.
5. **"More data is always better."** SE scales as $1/\sqrt{N}$. Adaptive design focuses comparisons where they matter.

**Think Hard questions:**
1. BT has scale indeterminacy. How does this interact with DPO's β parameter?
2. Real preferences can be intransitive (A≻B≻C≻A). What happens when you fit BT to intransitive data?
3. When you aggregate 1000 annotators into one BT model, you assume shared preferences. What if there are genuine subpopulations?
4. TrueSkill batch updates treat all annotations as independent given the prior. When does this approximation break down?
5. The contextual BT model $\lambda_i(x) = \lambda_i + \phi(x)^T\beta_i$ is a linear model. What if the preference interaction is nonlinear? (This motivates the neural reward model.)







