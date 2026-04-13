# TEXTBOOK-PLAN v2: Bayesian Statistics (Multi-Quantity Parallel Approach)

> **CRITICAL DISCLAIMER FOR THE WRITING AGENT**
>
> This TEXTBOOK-PLAN.md is a **structural guide only**. The quotes, statistics, and specific claims
> are PLACEHOLDERS from web search summaries and may be wrong. DO NOT copy them into the chapter.
> Read the actual source files listed in each section's "Sources needed" table.
>
> **The plan tells you WHERE to look. The sources tell you WHAT to write.**

> **THE CHAPTER IS INCOMPLETE — MOST SOURCES WERE NEVER READ**
>
> The current chapter (files `_01` through `_99`) was written using only ~7 of 34 available sources.
> The other 27 sources were not downloaded, not extracted from PDF, or silently ignored. They have
> NOW been downloaded, OCR'd, and verified readable. **You MUST read ALL sources listed in this plan
> and integrate their content into the chapter.** This is not just about adding the five-quantity
> NOIR framing. Every section has sources that were never consulted. Examples:
>
> - Section 3 (Updating): MIT OCW Lec 12 has worked examples never used. Stephen Tu's Dirichlet derivation is needed for the new star-rating model.
> - Section 4 (Conjugate Priors): Cook's 47-page Compendium and Bayes Rules Ch5 were never read. MIT Lec 15 has conjugate worked examples.
> - Section 5 (Credible Intervals): Wikipedia's credible interval article (HPD vs equal-tailed) and Statsig's comparison were never consulted.
> - Section 6 (MCMC): Eric Jang's VI/ELBO tutorial, Gelman's Bayesian Workflow paper, and Stan's posterior predictive guide were never read.
> - Section 7 (Hierarchical): Gelman BDA3 Ch5 and PyMC's multilevel modeling example were never integrated.
>
> **If you write from the existing chapter text without reading the sources, you are perpetuating gaps.**

## User Query
> I want to understand Bayesian probability and statistics in depth, building on a strong frequentist foundation. The chapter should use multiple data types (binary, categorical/ordinal, count, continuous) in parallel throughout, all tied to the same Amazon headphones product. This prevents conflating binary random variables with probabilities and shows how the Bayesian framework applies uniformly across different data types.

**Topic:** Bayesian Statistics (multi-quantity parallel approach)
**Prior Knowledge:** Strong frequentist statistics (NOIR levels, MLE, CIs, hypothesis testing, linear regression)
**Learning Goals:** Deep understanding of Bayesian updating across all major data types, conjugate priors for each, credible intervals, MCMC, hierarchical models
**Target Depth:** Graduate
**Output Folder:** `Statistics/Bayesian Statistics`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (34 sources)"}

| # | Source | Type | Local Path | Summary |
|---|--------|------|------------|---------|
| 1 | [Sosa et al., "The Bayesian Way" (arXiv, 2025)](https://arxiv.org/abs/2512.05883) | [ACADEMIC] | `sources/arxiv-2512.05883/` | 56-page Bayesian inference intro: estimation, credible intervals, Bayes factors, conjugacy, asymptotics |
| 2 | [Gelman et al., BDA3 (2013)](https://sites.stat.columbia.edu/gelman/book/) | [TEXTBOOK] | `sources/users.aalto.fi/BDA3/` | Definitive Bayesian textbook, Ch1-5: single/multiparameter models, hierarchical models |
| 3 | [MIT 18.05 Bayesian Lectures](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/) | [COURSE] | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/` | Bayesian updating, conjugate priors (Beta, Normal) |
| 4 | [Gundersen: Conjugacy in Bayesian Inference](https://gregorygundersen.com/blog/2019/03/16/conjugacy/) | [TUTORIAL] | `sources/gregorygundersen.com/blog/2019/` | Beta-Binomial derivation, sequential updating, benefits of conjugacy |
| 5 | [Gundersen: Hamiltonian Monte Carlo](https://gregorygundersen.com/blog/2020/07/05/hmc/) | [TUTORIAL] | `sources/gregorygundersen.com/blog/2020/` | HMC explanation for MCMC section |
| 6 | [VanderPlas: Frequentism and Bayesianism](http://jakevdp.github.io/blog/2014/03/11/frequentism-and-bayesianism-a-practical-intro/) | [TUTORIAL] | `sources/jakevdp.github.io/` | Philosophical comparison, confidence vs credible intervals |
| 7 | [Probabilitycourse.com Ch9](https://www.probabilitycourse.com/chapter9/9_1_0_bayesian_inference.php) | [TEXTBOOK] | `sources/probabilitycourse.com/chapter9/` | Prior/posterior, MAP, MMSE, Bayesian hypothesis testing |
| 8 | [Probabilitycourse.com Ch8](https://www.probabilitycourse.com/chapter8/8_1_0_intro.php) | [TEXTBOOK] | `sources/probabilitycourse.com/chapter8/` | Reader's frequentist baseline |
| 9 | [Bayesian Spectacles: Misconceptions](https://www.bayesianspectacles.org/) | [TUTORIAL] | `sources/bayesianspectacles.org/` | Bayes factor misinterpretations |
| 10 | [Wikipedia: Conjugate Prior](https://en.wikipedia.org/wiki/Conjugate_prior) | [REFERENCE] | `sources/en.wikipedia.org/wiki/Conjugate_prior/` | Complete table of all conjugate families including Dirichlet-Multinomial |
| 11 | [Evan Miller: Ranking Items with Star Ratings](https://www.evanmiller.org/ranking-items-with-star-ratings.html) | [TUTORIAL] | `sources/evanmiller.org/ranking-items-with-star-ratings/` | Dirichlet prior for star ratings, Bayesian credible intervals for average rating |
| 12 | [Evan Miller: Bayesian Average Ratings](https://www.evanmiller.org/bayesian-average-ratings.html) | [TUTORIAL] | `sources/evanmiller.org/bayesian-average-ratings/` | Bayesian averaging for binary ratings |
| 13 | [Stephen Tu: Dirichlet Conjugate Prior](https://stephentu.github.io/writeups/dirichlet-conjugate-prior.pdf) | [ACADEMIC] | `sources/stephentu.github.io/writeups/` | Formal Dirichlet-Multinomial and Dirichlet-Categorical conjugacy derivation |
| 14 | [Cook: Compendium of Conjugate Priors](https://www.johndcook.com/CompendiumOfConjugatePriors.pdf) | [REFERENCE] | `sources/johndcook.com/` | Complete reference for all conjugate pairs |
| 15 | [Eric Jang: Variational Bayes](https://blog.evjang.com/2016/08/variational-bayes.html) | [TUTORIAL] | `sources/blog.evjang.com/` | ELBO derivation, mean-field VI |
| 16 | [Bayes Rules Ch5: Conjugate Families](https://www.bayesrulesbook.com/chapter-5) | [TEXTBOOK] | `sources/bayesrulesbook.com/chapter-5/` | Beta-Binomial, Gamma-Poisson conjugate families with examples |
| 17 | [Gelman: Jeffreys and Philosophy of Statistics](https://stat.columbia.edu/~gelman/research/published/jeffreys.pdf) | [ACADEMIC] | `sources/stat.columbia.edu/gelman/research/published/` | Flat priors are problematic, weakly informative priors |
| 18 | [Gelman: Bayesian Workflow (2020)](https://stat.columbia.edu/~gelman/research/unpublished/Bayesian_Workflow_article.pdf) | [ACADEMIC] | `sources/stat.columbia.edu/gelman/research/unpublished/` | Full Bayesian workflow: model building, checking, improvement |
| 19 | [District Data Labs: Bayesian Star Rating Means](https://districtdatalabs.silvrback.com/computing-a-bayesian-estimate-of-star-rating-means) | [TUTORIAL] | `sources/districtdatalabs.silvrback.com/` | Bayesian estimation for ordinal star ratings with MovieLens example |
| 20 | [PyMC: GLM Linear Regression](https://www.pymc.io/projects/docs/en/v5.7.0/learn/core_notebooks/GLM_linear.html) | [TUTORIAL] | `sources/pymc.io/GLM_linear/` | Bayesian linear regression with NUTS |
| 21 | [PyMC: Hierarchical Partial Pooling](https://www.pymc.io/projects/examples/en/latest/case_studies/hierarchical_partial_pooling.html) | [TUTORIAL] | `sources/pymc.io/hierarchical_partial_pooling/` | Partial pooling concept |
| 22 | [Gundersen: Probabilistic ML](https://gregorygundersen.com/blog/2018/06/13/probabilistic-ml/) | [TUTORIAL] | `sources/gregorygundersen.com/blog/2018/` | Bayesian approach to ML, parameter uncertainty, marginalization |
| 23 | [StatsWithR: Frequentist vs Bayesian](https://statswithr.com/foundational-statistics/frequentist-vs-bayesian-statistics-a-comparison) | [TUTORIAL] | `sources/statswithr.com/` | Clear side-by-side comparison table |
| 24 | [Douglas Yao: Frequentist vs Bayesian](https://douglasyao.github.io/blogs/2020/10/04/frequentist-bayesian.html) | [TUTORIAL] | `sources/douglasyao.github.io/` | Worked comparison with same dataset |
| 25 | [Statsig: Credible vs Confidence Intervals](https://www.statsig.com/perspectives/credible-vs-confidence-intervals) | [TUTORIAL] | `sources/statsig.com/` | Clear distinction of interval types |
| 26 | [Wikipedia: Credible Interval](https://en.wikipedia.org/wiki/Credible_interval) | [REFERENCE] | `sources/en.wikipedia.org/wiki/Credible_interval/` | HPD vs equal-tailed credible intervals |
| 27 | [Strimmer Lab: Choosing Priors](https://strimmerlab.github.io/publications/lecture-notes/MATH20802/choosing-priors-in-bayesian-analysis.html) | [COURSE] | `sources/strimmerlab.github.io/` | Informative/uninformative/weakly informative priors |
| 28 | [Think Bayes 2e (Downey)](https://allendowney.github.io/ThinkBayes2/) | [TEXTBOOK] | `sources/allendowney.github.io/ThinkBayes2/` | Code-first Bayesian intro, discrete approximation |
| 29 | [PyMC: Multilevel Modeling](https://www.pymc.io/projects/examples/en/latest/case_studies/multilevel_modeling.html) | [TUTORIAL] | `sources/pymc.io/projects/examples/en/latest/case_studies/multilevel_modeling/` | Radon example, hierarchical Bayesian models |
| 30 | [Stan: Posterior Predictive Checks](https://mc-stan.org/docs/stan-users-guide/posterior-predictive-checks.html) | [TUTORIAL] | `sources/mc-stan.org/` | Bayesian workflow, prior/posterior predictive checks |
| 31 | [Statology: First Bayesian Model](https://www.statology.org/your-first-bayesian-model/) | [TUTORIAL] | `sources/statology.org/` | Step-by-step PyMC tutorial |
| 32 | [Cforssen: Bayesian Coin Tossing Demo](https://cforssen.gitlab.io/tif285-book/content/BayesianStatistics/BayesianBasics/demo-BayesianBasics.html) | [TUTORIAL] | `sources/cforssen.gitlab.io/` | Beta-Binomial updating visualization |
| 33 | User's notes (statistics-1) | [NOTES] | `sources/statistics-1/` | Reader's frequentist foundation |
| 34 | User's notes (statistics-2) | [NOTES] | `sources/statistics-2/` | Reader's statistical models foundation |

:::

---

## MANDATORY: Source Readability Audit — COMPLETED

All 7 PDF sources have been OCR'd and extracted to markdown. Every source is now readable.

### Extracted PDFs (verified readable)

| # | Source | Extracted File | Size |
|---|---|---|---|
| 2 | Gelman BDA3 | `sources/users.aalto.fi/BDA3/BDA3.md` | 2.3 MB (677 pages) |
| 3a | MIT OCW Lec 12 | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec12/lec12-bayesian-updating.md` | 10 KB |
| 3b | MIT OCW Lec 15 | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec15/lec15-conjugate-priors.md` | 11 KB |
| 13 | Stephen Tu Dirichlet | `sources/stephentu.github.io/writeups/dirichlet-conjugate-prior.md` | 11 KB |
| 14 | Cook Compendium | `sources/johndcook.com/CompendiumOfConjugatePriors.md` | 134 KB |
| 17 | Gelman Jeffreys | `sources/stat.columbia.edu/gelman/research/published/jeffreys.md` | 13 KB |
| 18 | Gelman Workflow | `sources/stat.columbia.edu/gelman/research/unpublished/Bayesian_Workflow_article.md` | 232 KB |

### Broken Source (drop)

| # | Source | Issue |
|---|---|---|
| 27 | Strimmer Choosing Priors | 404 page (191 bytes). Use Gelman Jeffreys (#17) + Bayes Rules Ch5 (#16) instead. |

---

## CRITICAL: Sources That Were NEVER Read or Integrated Into the Chapter

**The following sources exist on disk and are readable, but were NEVER read by any previous agent and are NOT reflected in the current chapter text.** The writing agent MUST read ALL of these and integrate their content where the plan specifies. This is not optional.

### Sources for the NEW multi-quantity approach (never existed before)

These are entirely new sources that were downloaded for the v2 plan. No previous agent has ever read them. The writing agent must read them in full before writing any section that references them.

| # | Source | File to Read | Needed For |
|---|---|---|---|
| 11 | Evan Miller Star Ratings | `sources/evanmiller.org/ranking-items-with-star-ratings/content.md` (21KB) | S3 (Dirichlet-Multinomial updating), S4 (conjugate families), S5 (credible intervals for star ratings) |
| 12 | Evan Miller Bayesian Average | `sources/evanmiller.org/bayesian-average-ratings/content.md` (14KB) | S3 (Bayesian averaging for binary), S4 (conjugate families) |
| 13 | Stephen Tu Dirichlet | `sources/stephentu.github.io/writeups/dirichlet-conjugate-prior.md` (11KB) | **S3 (CRITICAL: Dirichlet-Multinomial conjugacy derivation)**, S4 |
| 14 | Cook Compendium | `sources/johndcook.com/CompendiumOfConjugatePriors.md` (134KB) | S4 (all five conjugate families reference) |
| 16 | Bayes Rules Ch5 | `sources/bayesrulesbook.com/chapter-5/content.md` (90KB) | S4 (Gamma-Poisson examples, conjugate family pedagogy) |
| 19 | District Data Labs | `sources/districtdatalabs.silvrback.com/.../content.md` (41KB) | S3-S4 (Bayesian star rating estimation, MovieLens example) |

### Sources that existed but were marked N/A and never read

These sources were in the v1 plan as N/A (not downloaded). They have NOW been downloaded and OCR'd. No previous agent has read them. The writing agent must read them.

| # | Source | File to Read | Needed For |
|---|---|---|---|
| 2 | Gelman BDA3 | `sources/users.aalto.fi/BDA3/BDA3.md` (2.3MB — read Ch1-5 only) | S2 (philosophy), S4 (conjugate families), S7 (hierarchical models Ch5) |
| 3 | MIT OCW Lec 12 | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec12/lec12-bayesian-updating.md` | S3 (updating mechanics) |
| 3 | MIT OCW Lec 15 | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec15/lec15-conjugate-priors.md` | S4 (conjugate prior worked examples) |
| 15 | Eric Jang VI | `sources/blog.evjang.com/.../content.md` (64KB) | S6 (variational inference, ELBO) |
| 17 | Gelman Jeffreys | `sources/stat.columbia.edu/gelman/research/published/jeffreys.md` (13KB) | S4 (why flat priors fail) |
| 18 | Gelman Workflow | `sources/stat.columbia.edu/gelman/research/unpublished/Bayesian_Workflow_article.md` (232KB) | S6 (Bayesian workflow: prior/posterior predictive checks) |
| 22 | Gundersen Probabilistic ML | `sources/gregorygundersen.com/blog/2018/.../content.md` (19KB) | S2 (Bayesian approach to ML) |
| 25 | Statsig CI comparison | `sources/statsig.com/.../content.md` (34KB) | S5 (credible vs confidence intervals) |
| 26 | Wikipedia Credible Interval | `sources/en.wikipedia.org/wiki/Credible_interval/content.md` (330KB) | S5 (HPD vs equal-tailed intervals) |
| 29 | PyMC Multilevel | `sources/pymc.io/projects/examples/en/latest/.../content.md` (18KB) | S7 (hierarchical models, Radon example) |
| 30 | Stan Posterior Predictive | `sources/mc-stan.org/.../content.md` (32KB) | S6 (posterior predictive checks) |

### Sources that WERE read previously (verify still integrated correctly)

These sources were read by previous agents and are reflected in the current chapter, but the chapter is being restructured. The writing agent should re-read them to verify the existing content is correct and adapt it to the multi-quantity framing.

| # | Source | File to Read |
|---|---|---|
| 1 | Sosa et al. arXiv | `sources/arxiv-2512.05883/main.tex` (154KB) |
| 4 | Gundersen Conjugacy | `sources/gregorygundersen.com/blog/2019/03/16/conjugacy/content.md` (15KB) |
| 5 | Gundersen HMC | `sources/gregorygundersen.com/blog/2020/07/05/hmc/hmc.md` (24KB) |
| 6 | VanderPlas | `sources/jakevdp.github.io/.../content.md` (130KB) |
| 7 | Probabilitycourse Ch9 | `sources/probabilitycourse.com/chapter9/` (multiple files, 15KB total) |
| 9 | Bayesian Spectacles | `sources/bayesianspectacles.org/.../content.md` (13KB) |
| 10 | Wikipedia Conjugate Prior | `sources/en.wikipedia.org/wiki/Conjugate_prior/content.md` (652KB) |

---

## Chapter Overview

**Total sections:** 6 (plus introduction and closing)
**Estimated total length:** 10,000-12,000 words
**Running example:** Five observable quantities about the SAME Amazon wireless headphones ($79), each mapping to a different data type and conjugate family:

| # | Quantity | Data Type | Observation Space | Likelihood | Conjugate Prior | Parameter |
|---|---|---|---|---|---|---|
| 1 | **Return rate** | Binary | {returned, not returned} | Bernoulli/Binomial | Beta | True return probability $\theta \in [0,1]$ |
| 2 | **Star rating** | Ordinal (treated as categorical) | {1, 2, 3, 4, 5} | Categorical/Multinomial | Dirichlet | Probability vector $\mathbf{p} = (p_1,...,p_5) \in \Delta^4$ |
| 3 | **Return reason** | Categorical (unordered) | {Defective, Wrong fit, Changed mind, Better price, Other} | Categorical/Multinomial | Dirichlet | Probability vector $\mathbf{q} \in \Delta^4$ |
| 4 | **Customer questions/day** | Count | {0, 1, 2, 3, ...} | Poisson | Gamma | True rate $\lambda \in (0, \infty)$ |
| 5 | **Battery life** (hours) | Continuous | $(0, \infty)$ | Normal (known var) | Normal | True mean $\mu \in \mathbb{R}$ |

**Pedagogical rationale:** By progressing all five quantities in parallel, the reader sees that the Bayesian framework (prior x likelihood -> posterior) is IDENTICAL in structure for every data type. Only the specific distributions change. This prevents the common misconception of conflating binary random variable values with probabilities (since the parameter space and observation space are clearly different for star ratings, counts, and continuous data).

### Hook & Running Example Design

You are on Amazon looking at a $79 pair of wireless headphones with 20 ratings. The product page shows a 4.1-star average. Should you buy?

But "should you buy?" actually requires answering FIVE different questions about these headphones, each involving a different kind of data:

1. **Will I have to return them?** (binary: 3 out of 20 buyers returned them)
2. **What's the true star rating distribution?** (ordinal: you see {2 one-star, 1 two-star, 2 three-star, 5 four-star, 10 five-star})
3. **If returns happen, why?** (categorical: {1 Defective, 1 Wrong fit, 1 Changed mind})
4. **How active is customer support?** (count: the listing shows ~2 customer questions per day)
5. **How long does the battery really last?** (continuous: claimed 30h, actual reports vary)

Each question involves a different kind of measurement. Each requires a different statistical model. But the Bayesian approach handles ALL of them the same way: encode prior knowledge, observe data, compute the posterior via Bayes' rule. The only thing that changes is which distributions you plug in.

**Hook Image:** D2 diagram showing the five quantities branching from a single product, each with its data type, observation space, and conjugate pair. This introduces the "one framework, five instantiations" theme.

---

## Section Plan

### Section 1: Introduction {#sec-introduction}

**File:** `_01-introduction.qmd`
**Goal:** Set up the five-quantity running example, establish the core question, introduce the Bayesian framework at a high level.

**Key changes from v1:**
- Hook uses the five-quantity framing (not just binary)
- Chapter overview previews how each section applies to ALL five quantities
- Notation table includes symbols for all five conjugate families
- D2 concept map shows the five data types branching from "Bayes' Rule"

---

### Section 2: The Bayesian Leap {#sec-bayesian-leap}

**File:** `_02-the-bayesian-leap.qmd`
**Goal:** Freq vs Bayesian philosophy. Why treating theta as a random variable matters.

**Key changes from v1:**
- Show the freq limitation for EACH of the five quantities (not just binary)
- The "category error" explanation (P(theta > x) not valid for fixed theta) applies to ALL five
- Side-by-side table now has rows for each data type showing what "parameter as random variable" means

**Sources needed (READ ALL OF THESE — most were never consulted for the current chapter):**

| Source | Local Path | What to Extract |
|---|---|---|
| VanderPlas | `sources/jakevdp.github.io/` | Philosophical distinction |
| Sosa et al. | `sources/arxiv-2512.05883/` | Formal framework, Sections 1-2 |
| Probabilitycourse Ch9 | `sources/probabilitycourse.com/chapter9/` | Motivating examples |
| **Gelman BDA3 Ch1-2** | `sources/users.aalto.fi/BDA3/BDA3.md` | **NEVER READ.** Bayesian philosophy, notation, single-parameter models |
| **Gundersen Probabilistic ML** | `sources/gregorygundersen.com/blog/2018/.../content.md` | **NEVER READ.** Bayesian approach to ML, marginalization |
| **Douglas Yao freq vs Bayes** | `sources/douglasyao.github.io/.../content.md` | **NEVER READ.** Worked comparison with same dataset |
| **StatsWithR comparison** | `sources/statswithr.com/.../content.md` | **NEVER READ.** Side-by-side comparison table |

---

### Section 3: Bayesian Updating {#sec-bayesian-updating}

**File:** `_03-bayesian-updating.qmd`
**Goal:** Full mechanical derivation of Bayesian updating. PRIMARY worked example: Beta-Binomial (return rate). SECONDARY: show the same structure for Dirichlet-Multinomial (star ratings).

**Key changes from v1:**
- Primary example: Beta-Binomial with return rate (3 returns out of 20 buyers)
- After the full Beta-Binomial derivation, show the Dirichlet-Multinomial update for star ratings
- The "multiply and normalize" recipe is shown to be IDENTICAL in structure
- Sequential updating demonstrated for BOTH quantities

**Sources needed (READ ALL — the Dirichlet sources are entirely new and critical):**

| Source | Local Path | What to Extract |
|---|---|---|
| Gundersen conjugacy | `sources/gregorygundersen.com/blog/2019/` | Beta-Binomial derivation |
| **Stephen Tu Dirichlet** | `sources/stephentu.github.io/writeups/dirichlet-conjugate-prior.md` | **NEVER READ. CRITICAL: Dirichlet-Multinomial conjugacy derivation** |
| **Evan Miller star ratings** | `sources/evanmiller.org/ranking-items-with-star-ratings/content.md` | **NEVER READ.** Dirichlet prior for star ratings, credible intervals |
| **Evan Miller Bayesian average** | `sources/evanmiller.org/bayesian-average-ratings/content.md` | **NEVER READ.** Bayesian averaging |
| **MIT 18.05 Lec 12** | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec12/lec12-bayesian-updating.md` | **NEVER READ.** Bayesian updating worked examples |
| Sosa et al. | `sources/arxiv-2512.05883/` | Formal derivation |
| **District Data Labs** | `sources/districtdatalabs.silvrback.com/.../content.md` | **NEVER READ.** Bayesian star rating estimation with MovieLens |

**Key equations:**
- Beta-Binomial: Beta(alpha, beta) x Binomial(n, k) -> Beta(alpha+k, beta+n-k)
- Dirichlet-Multinomial: Dir(alpha_1,...,alpha_K) x Multi(n_1,...,n_K) -> Dir(alpha_1+n_1,...,alpha_K+n_K)

---

### Section 4: Conjugate Priors and Choosing Your Prior {#sec-conjugate-priors}

**File:** `_04-conjugate-priors-and-choosing.qmd`
**Goal:** Present ALL FIVE conjugate families in parallel. Each one applied to its corresponding headphones quantity.

**Key changes from v1 (MAJOR):**
- This section now covers FIVE conjugate families (not just three):
  1. Beta-Binomial (return rate) - review from S3
  2. Dirichlet-Multinomial (star ratings AND return reasons)
  3. Gamma-Poisson (customer questions/day)
  4. Normal-Normal (battery life)
- Each family shown with the SAME product but different quantity
- Prior sensitivity analysis: show how different priors change the posterior for each
- "When conjugacy breaks down" preview (ordinal: star ratings have ordering that Dirichlet ignores)

**Sources needed (READ ALL — this section gets the BIGGEST rewrite with 5 conjugate families):**

| Source | Local Path | What to Extract |
|---|---|---|
| **Wikipedia Conjugate Prior** | `sources/en.wikipedia.org/wiki/Conjugate_prior/content.md` | Complete conjugate table (Dirichlet-Multinomial row!) |
| **Cook Compendium** | `sources/johndcook.com/CompendiumOfConjugatePriors.md` | **NEVER READ. 47-page reference for ALL conjugate pairs** |
| **Bayes Rules Ch5** | `sources/bayesrulesbook.com/chapter-5/content.md` | **NEVER READ. Gamma-Poisson examples, conjugate family pedagogy** |
| **MIT 18.05 Lec 15** | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec15/lec15-conjugate-priors.md` | **NEVER READ.** Conjugate prior worked examples |
| **Gelman Jeffreys** | `sources/stat.columbia.edu/gelman/research/published/jeffreys.md` | **NEVER READ.** Flat priors problem, weakly informative priors |
| **Gelman BDA3 Ch2-3** | `sources/users.aalto.fi/BDA3/BDA3.md` | **NEVER READ.** Single and multi-parameter models, conjugate analysis |
| **District Data Labs** | `sources/districtdatalabs.silvrback.com/.../content.md` | **NEVER READ.** Star rating Bayesian estimation |

**Key equations (all five):**
- Beta(a,b) + Binom(n,k) -> Beta(a+k, b+n-k)
- Dir(alpha) + Multi(n) -> Dir(alpha + n)
- Gamma(a,b) + Poisson(sum_x, n) -> Gamma(a+sum_x, b+n)
- N(mu_0, sigma_0^2) + N(x_bar, sigma^2/n) -> N(mu_n, sigma_n^2)

---

### Section 5: Credible Intervals and Hypothesis Testing {#sec-credible-intervals}

**File:** `_05-credible-intervals-and-testing.qmd`
**Goal:** Extract decisions from posteriors. Show credible intervals, Bayes factors, posterior predictive for MULTIPLE quantities.

**Key changes from v1:**
- Credible interval computed for return rate (Beta posterior) AND for star rating distribution (Dirichlet posterior mean)
- CI vs credible interval comparison with the precise freq/Bayes distinction (category error, procedure vs. realization)
- Bayes factor for: "is the return rate below 15%?"
- Posterior predictive: "if one more person buys, what rating will they give?"
- Decision theory: "should you buy these headphones?" combining evidence from multiple quantities

**Sources needed (READ ALL — credible interval sources were never consulted):**

| Source | Local Path | What to Extract |
|---|---|---|
| Sosa et al. | `sources/arxiv-2512.05883/` | Formal Bayes factor definitions |
| Probabilitycourse Ch9 | `sources/probabilitycourse.com/chapter9/` | Bayesian hypothesis testing |
| Evan Miller star ratings | `sources/evanmiller.org/ranking-items-with-star-ratings/content.md` | Credible intervals for star ratings |
| **Wikipedia Credible Interval** | `sources/en.wikipedia.org/wiki/Credible_interval/content.md` | **NEVER READ.** HPD vs equal-tailed intervals, formal definitions |
| **Statsig CI comparison** | `sources/statsig.com/.../content.md` | **NEVER READ.** Clear credible vs confidence interval distinction |
| **Bayesian Spectacles** | `sources/bayesianspectacles.org/.../content.md` | Bayes factor misconceptions |

---

### Section 6: Computational Methods {#sec-computational-methods}

**File:** `_06-computational-methods.qmd`
**Goal:** When conjugacy fails, how MCMC/HMC/VI step in. Motivate with ordinal star rating model (treating ordering seriously requires MCMC).

**Key changes from v1:**
- Motivation: the Dirichlet-Multinomial for star ratings IGNORES the ordering (5>4>3>2>1). An ordinal regression model respects it, but has no conjugate posterior -> need MCMC.
- Show PyMC model for ordinal star ratings (cumulative link model)
- Compare the Dirichlet-Multinomial (conjugate, ignores ordering) vs ordinal regression (MCMC, respects ordering) posteriors
- This is the pedagogical bridge: conjugacy was a shortcut; MCMC handles the general case

**Sources needed (READ ALL — MCMC section sources were almost entirely unread):**

| Source | Local Path | What to Extract |
|---|---|---|
| Gundersen HMC | `sources/gregorygundersen.com/blog/2020/` | HMC explanation |
| **Eric Jang VI** | `sources/blog.evjang.com/.../content.md` | **NEVER READ.** ELBO derivation, mean-field VI |
| **Gelman Bayesian Workflow** | `sources/stat.columbia.edu/gelman/research/unpublished/Bayesian_Workflow_article.md` | **NEVER READ.** Full Bayesian workflow (232KB!) |
| **Stan Posterior Predictive** | `sources/mc-stan.org/.../content.md` | **NEVER READ.** Prior/posterior predictive checks |
| PyMC GLM | `sources/pymc.io/GLM_linear/content.md` | PyMC model specification |
| **Statology first model** | `sources/statology.org/.../content.md` | **NEVER READ.** Step-by-step PyMC tutorial |

---

### Section 7: Bayesian Regression and Hierarchical Models {#sec-bayesian-regression-hierarchical}

**File:** `_07-bayesian-regression-and-hierarchical.qmd`
**Goal:** Extend to multiple products. Hierarchical model pools data across 8 wireless headphones in the same price range.

**Key changes from v1:**
- Hierarchical model pools return rates across 8 products
- Show partial pooling: Product A (Sony, 500 ratings) barely moves, Product B (new brand, 8 ratings) shrinks toward the group mean
- Bayesian regression: return rate as function of price tier

**Sources needed (READ ALL — hierarchical sources were never integrated):**

| Source | Local Path | What to Extract |
|---|---|---|
| PyMC hierarchical | `sources/pymc.io/hierarchical_partial_pooling/content.md` | Partial pooling concept |
| **Gelman BDA3 Ch5** | `sources/users.aalto.fi/BDA3/BDA3.md` | **NEVER READ.** Hierarchical models chapter — the definitive reference |
| **PyMC Multilevel** | `sources/pymc.io/projects/examples/en/latest/case_studies/multilevel_modeling/content.md` | **NEVER READ.** Radon example, multi-level Bayesian models |

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
- Key takeaways referencing ALL five quantities
- Completed concept map with all five conjugate families
- Retrieval questions using the headphones example
- Common mistakes (including: conflating observation space with parameter space)

---

## Cross-Cutting Concerns

### The Five-Quantity Parallel Table

This table should appear in the Introduction and be referenced throughout:

| Quantity | Data Type | Observation | Parameter | Prior | Likelihood | Posterior |
|---|---|---|---|---|---|---|
| Return rate | Binary | {0, 1} | $\theta \in [0,1]$ | Beta($\alpha, \beta$) | Binomial | Beta($\alpha', \beta'$) |
| Star rating | Ordinal | {1,2,3,4,5} | $\mathbf{p} \in \Delta^4$ | Dir($\boldsymbol{\alpha}$) | Multinomial | Dir($\boldsymbol{\alpha}'$) |
| Return reason | Categorical | {A,B,C,D,E} | $\mathbf{q} \in \Delta^4$ | Dir($\boldsymbol{\gamma}$) | Multinomial | Dir($\boldsymbol{\gamma}'$) |
| Questions/day | Count | {0,1,2,...} | $\lambda \in (0,\infty)$ | Gamma($a, b$) | Poisson | Gamma($a', b'$) |
| Battery life | Continuous | $(0, \infty)$ | $\mu \in \mathbb{R}$ | Normal($\mu_0, \sigma_0^2$) | Normal | Normal($\mu_n, \sigma_n^2$) |

### Common Misconceptions (updated)

1. **"P(theta > 0.70) means the probability is 0 or 1"** - No, it is a category error: theta is fixed in freq framework, so P(theta > 0.70) is not a valid probability expression.
2. **"Binary data means the parameter is also binary"** - No: X in {0,1} but theta in [0,1]. The five-quantity table makes this clear.
3. **"A confidence interval has a 95% probability of containing theta"** - No: the 95% is a property of the CI procedure (pair of random variables), not of any specific realized interval.
4. **"Flat priors are non-informative"** - No: a uniform prior on theta is not uniform on log(theta).
5. **"Star ratings should be averaged as if they were continuous"** - The Dirichlet-Multinomial treats each star level as a separate category, preserving the distribution shape rather than collapsing to a single mean.

### Think Hard Questions (updated)

1. Why does the Dirichlet-Multinomial ignore the ordering of star ratings, and when does this matter?
2. If the prior only matters when data is scarce, why bother specifying it carefully?
3. When does the Bayesian posterior converge to the frequentist MLE? (Bernstein-von Mises)
4. Why can't you just use the Dirichlet-Multinomial for continuous data by binning?
5. How does partial pooling in hierarchical models relate to regularization in frequentist regression?

### Math Background Assessment

The chapter uses these above-10th-grade concepts:
- MLE (Section 2-3): derived from scratch
- Beta function and Beta distribution (Section 3): derived from scratch
- Dirichlet distribution (Section 3-4): NEW, needs derivation or review
- Gamma distribution (Section 4): brief review needed
- Fisher Information (Section 2, Bernstein-von Mises): assumed
- Logistic regression (Section 6): assumed from prior knowledge

**Recommendation:** Add `_98-math-background.qmd` covering: Dirichlet distribution (the K-dimensional generalization of Beta), Gamma distribution properties, and a brief Fisher Information refresher.
