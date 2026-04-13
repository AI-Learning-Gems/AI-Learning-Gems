# TEXTBOOK-PLAN: Bayesian Statistics

## User Query
> I want to understand Bayesian probability in a lot of detail and Bayesian statistics in a lot of detail. Assume I have a good understanding of frequentist statistics. I feel like there's a lot of gaps because it's just not intuitive on what's the point of it. I mean like I get that the main point is that the unknown population parameters are random variables instead of fixed values as in frequentist. But the point is like okay, but what is the consequence of that and how does why do you have these credible intervals which seem like confidence intervals? Why do you have how do you do Bayesian parameter estimation? How do you do Bayesian linear regression? What is this idea of a Bayesian network? What is a PyMC model? How do you update priors? What is the whole deal with PyMC and Gaussian mixture models and there's so much stuff which I feel like it needs to be explained a lot better.

**Topic:** Bayesian Statistics (from the ground up, building on strong frequentist foundation)
**Prior Knowledge:** Strong understanding of frequentist statistics including: NOIR levels, population vs sample, statistics vs parameters, estimators (bias, MSE, variance), statistical models (sample space, parameter space, well-specified vs mis-specified, identifiable parameters, parametric vs nonparametric), point estimation (MLE), interval estimation (confidence intervals), hypothesis testing, linear regression (OLS). Has seen the Bayesian inference intro from probabilitycourse.com ch9 (prior/posterior, MAP, comparison to ML, MMSE) but does not deeply understand the consequences and applications.
**Learning Goals:** Deep understanding of: (1) why Bayesian thinking matters and what it buys you over frequentist, (2) the mechanics of prior-likelihood-posterior updating, (3) conjugate priors and why they matter, (4) credible intervals vs confidence intervals, (5) Bayesian parameter estimation, (6) computational methods (MCMC, variational inference) and why they're needed, (7) practical Bayesian modeling with PyMC, (8) Bayesian linear regression, (9) hierarchical models.
**Target Depth:** Graduate
**Output Folder:** `Statistics/Bayesian Statistics`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (30 sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [The Bayesian Way (Sosa et al., arXiv 2025)](https://arxiv.org/abs/2512.05883) | [ACADEMIC] | `sources/arxiv-2512.05883/` | Dec 2025 | 2026-03-13 | KEY: 56-page comprehensive intro to Bayesian inference covering estimation, credible intervals, Bayes factors, loss functions, conjugacy, asymptotics |
| 2 | [Bayesian Data Analysis 3e (Gelman et al.)](https://sites.stat.columbia.edu/gelman/book/) | [TEXTBOOK] | `sources/users.aalto.fi/BDA3/BDA3.pdf` | 2013 | 2026-03-13 | KEY: Definitive Bayesian textbook. Chapters 1-5 on fundamentals (single/multiparameter models, hierarchical models). Free PDF available. |
| 3 | [MIT 18.05 Lec 12: Bayesian Updating](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/) | [COURSE] | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec12-bayesian-updating.pdf` | 2022 | 2026-03-13 | KEY: Undergraduate-level Bayesian updating with discrete and continuous priors |
| 4 | [MIT 18.05 Lec 15: Conjugate Priors (Beta, Normal)](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_lec15.pdf) | [COURSE] | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec15-conjugate-priors.pdf` | 2022 | 2026-03-13 | KEY: Beta-Binomial and Normal-Normal conjugate prior derivations with worked examples |
| 5 | [Gundersen: Conjugacy in Bayesian Inference](https://gregorygundersen.com/blog/2019/03/16/conjugacy/) | [TUTORIAL] | `sources/gregorygundersen.com/blog/2019/03/16/conjugacy/` | 2019 | 2026-03-13 | KEY: Excellent derivation of Beta-Binomial conjugacy, sequential updating visualization, benefits of conjugacy |
| 6 | [Gundersen: Probabilistic ML](https://gregorygundersen.com/blog/2018/06/13/probabilistic-ml/) | [TUTORIAL] | N/A (fetched via WebFetch) | 2018 | 2026-03-13 | KEY: Bayesian approach to ML as inferring parameters with uncertainty, marginalization |
| 7 | [Gundersen: Hamiltonian Monte Carlo](https://gregorygundersen.com/blog/2020/07/05/hmc/) | [TUTORIAL] | N/A | 2020 | 2026-03-13 | USEFUL: HMC explanation for MCMC section |
| 8 | [VanderPlas: Frequentism and Bayesianism (5-part series)](http://jakevdp.github.io/blog/2014/03/11/frequentism-and-bayesianism-a-practical-intro/) | [TUTORIAL] | `sources/jakevdp.github.io/blog/2014/03/11/frequentism-and-bayesianism/` | 2014 | 2026-03-13 | KEY: Philosophical comparison, Python examples, confidence vs credible intervals, MCMC implementation |
| 9 | [Probabilitycourse.com Ch9: Bayesian Inference](https://www.probabilitycourse.com/chapter9/9_1_0_bayesian_inference.php) | [TEXTBOOK] | `sources/probabilitycourse.com/chapter9/` | N/A | 2026-03-13 | KEY: Prior/posterior, MAP, ML comparison, MMSE, Bayesian hypothesis testing, credible intervals, solved problems |
| 10 | [Probabilitycourse.com Ch8: Frequentist Inference](https://www.probabilitycourse.com/chapter8/8_1_0_intro.php) | [TEXTBOOK] | `sources/probabilitycourse.com/chapter8/` | N/A | 2026-03-13 | KEY: Reader's baseline for frequentist methods (point estimation, MLE, CIs, hypothesis testing, regression) |
| 11 | [Bayesian Spectacles: Popular Misconceptions about Bayesian Inference](https://www.bayesianspectacles.org/popular-misconceptions-about-bayesian-inference-preface/) | [TUTORIAL] | `sources/bayesianspectacles.org/popular-misconceptions/` | 2023 | 2026-03-13 | KEY: Common Bayes factor misinterpretations, prior-posterior confusion |
| 12 | [StatsWithR: Frequentist vs Bayesian Comparison](https://statswithr.com/foundational-statistics/frequentist-vs-bayesian-statistics-a-comparison) | [TUTORIAL] | N/A | 2024 | 2026-03-13 | USEFUL: Clear side-by-side comparison table of philosophies |
| 13 | [Douglas Yao: Understanding Frequentist vs Bayesian](https://douglasyao.github.io/blogs/2020/10/04/frequentist-bayesian.html) | [TUTORIAL] | N/A | 2020 | 2026-03-13 | USEFUL: Worked comparison with same dataset |
| 14 | [Statsig: Credible vs Confidence Intervals](https://www.statsig.com/perspectives/credible-vs-confidence-intervals) | [TUTORIAL] | N/A | 2024 | 2026-03-13 | KEY: Clear distinction of what the two interval types actually mean |
| 15 | [StackExchange: Credible vs Confidence Intervals](https://stats.stackexchange.com/questions/2272/whats-the-difference-between-a-confidence-interval-and-a-credible-interval) | [COMMUNITY] | N/A | 2010-2024 | 2026-03-13 | USEFUL: Multiple perspectives on the philosophical difference |
| 16 | [Wikipedia: Credible Interval](https://en.wikipedia.org/wiki/Credible_interval) | [COMMUNITY] | N/A | ongoing | 2026-03-13 | USEFUL: HPD vs equal-tailed credible intervals |
| 17 | [Wikipedia: Conjugate Prior](https://en.wikipedia.org/wiki/Conjugate_prior) | [COMMUNITY] | N/A | ongoing | 2026-03-13 | USEFUL: Comprehensive table of conjugate prior families |
| 18 | [Strimmer Lab: Choosing Priors](https://strimmerlab.github.io/publications/lecture-notes/MATH20802/choosing-priors-in-bayesian-analysis.html) | [COURSE] | N/A | 2023 | 2026-03-13 | KEY: Informative/uninformative/weakly informative priors, Jeffreys prior |
| 19 | [Caltech BE103: Choice of Prior](http://bebi103.caltech.edu.s3-website-us-east-1.amazonaws.com/2020b/content/lecture_notes/lecture_02/choice_of_prior.html) | [COURSE] | N/A | 2020 | 2026-03-13 | USEFUL: Practical prior selection workflow |
| 20 | [Gelman: Bayes, Jeffreys, and Philosophy of Statistics](https://stat.columbia.edu/~gelman/research/published/jeffreys.pdf) | [ACADEMIC] | N/A | 2013 | 2026-03-13 | USEFUL: Why flat priors are problematic, weakly informative priors recommendation |
| 21 | [Think Bayes 2e (Allen Downey)](https://allendowney.github.io/ThinkBayes2/) | [TEXTBOOK] | N/A | 2021 | 2026-03-13 | USEFUL: Code-first Bayesian intro, discrete approximation approach, free online |
| 22 | [PyMC: GLM Linear Regression](https://www.pymc.io/projects/docs/en/v5.7.0/learn/core_notebooks/GLM_linear.html) | [TUTORIAL] | N/A | 2024 | 2026-03-13 | KEY: Bayesian linear regression in PyMC with NUTS sampling |
| 23 | [PyMC: Hierarchical Partial Pooling](https://www.pymc.io/projects/examples/en/latest/case_studies/hierarchical_partial_pooling.html) | [TUTORIAL] | N/A | 2024 | 2026-03-13 | KEY: Hierarchical models, partial pooling concept with baseball data |
| 24 | [PyMC: Multilevel Modeling Primer](https://www.pymc.io/projects/examples/en/stable/case_studies/multilevel_modeling.html) | [TUTORIAL] | N/A | 2024 | 2026-03-13 | USEFUL: Radon example for hierarchical Bayesian models |
| 25 | [MCMC Visualizer (hudsong.dev)](https://hudsong.dev/tools/mcmc) | [TUTORIAL] | N/A | 2024 | 2026-03-13 | USEFUL: Interactive visualization of Metropolis-Hastings algorithm |
| 26 | [Eric Jang: Variational Methods Mean-Field Approximation](https://blog.evjang.com/2016/08/variational-bayes.html) | [TUTORIAL] | N/A | 2016 | 2026-03-13 | USEFUL: Intuitive ELBO derivation, mean-field VI |
| 27 | [Stan User's Guide: Posterior Predictive Checks](https://mc-stan.org/docs/stan-users-guide/posterior-predictive-checks.html) | [TUTORIAL] | N/A | 2024 | 2026-03-13 | USEFUL: Bayesian workflow, prior/posterior predictive checks |
| 28 | [Statology: Your First Bayesian Model](https://www.statology.org/your-first-bayesian-model/) | [TUTORIAL] | N/A | 2024 | 2026-03-13 | USEFUL: Step-by-step PyMC tutorial with code |
| 29 | [Gelman: Bayesian Workflow](https://stat.columbia.edu/~gelman/research/unpublished/Bayesian_Workflow_article.pdf) | [ACADEMIC] | N/A | 2020 | 2026-03-13 | KEY: Full Bayesian workflow paper: model building, inference, checking, improvement |
| 30 | [Cforssen: Bayesian Coin Tossing Demo](https://cforssen.gitlab.io/tif285-book/content/BayesianStatistics/BayesianBasics/demo-BayesianBasics.html) | [TUTORIAL] | N/A | 2023 | 2026-03-13 | USEFUL: Step-by-step Beta-Binomial updating visualization |
| 31 | User's own handwritten notes (statistics-1, statistics-2) | [NOTES] | `sources/statistics-1/`, `sources/statistics-2/` | 2023-2024 | 2026-03-13 | KEY: Reader's own frequentist foundation (NOIR, inference, statistical models, parametric/nonparametric) |

:::

---

## Chapter Overview

**Total sections:** 6 (plus introduction and closing)
**Estimated total length:** 10,000-12,000 words
**Running example:** A medical diagnostics company trying to estimate the effectiveness rate of a new rapid blood test. They have limited trial data (small sample) but also have historical data from previous-generation tests. The running example progresses from simple proportion estimation (is the test accurate?) through increasingly sophisticated Bayesian methods.

### Hook & Running Example Design

You are a statistician at MedScreen, a diagnostics startup. Your team just ran a small clinical trial for a new rapid blood test: out of 20 patients with a confirmed condition, the test correctly detected it in 15 cases. Your CEO asks: "What's the accuracy rate of our test?"

A frequentist would say: "Our point estimate is 15/20 = 75%, and here's a 95% confidence interval." But you know something the raw data doesn't capture: MedScreen's previous-generation test had a 70% accuracy rate across thousands of patients. And tests in this class, industry-wide, tend to have accuracy rates between 60% and 85%. Should you throw away all that prior knowledge just because you ran a new trial?

This is the fundamental question that Bayesian statistics answers. Instead of treating the unknown accuracy rate as a single fixed number to be estimated, Bayesian statistics treats it as a random variable with a probability distribution. Your prior knowledge about the accuracy rate (from historical tests) combines with the new trial data to produce an updated distribution: the posterior. From this posterior, you can extract everything a frequentist could (point estimates, intervals) and more (direct probability statements like "there is a 92% probability the accuracy exceeds 70%").

The hook image will be a D2 diagram contrasting the frequentist and Bayesian inference pipelines side by side, showing how the same data flows through each framework and produces different kinds of output. The frequentist pipeline produces a point estimate and confidence interval; the Bayesian pipeline takes an additional input (the prior) and produces a full posterior distribution from which you can extract point estimates, credible intervals, and direct probability statements.

Throughout this chapter, we will return to MedScreen's problem at increasing levels of sophistication: first estimating a single proportion, then comparing two test versions, then modeling accuracy as a function of patient characteristics (Bayesian regression), and finally pooling data across multiple hospital sites (hierarchical models).

**Hook Image:** D2 diagram (to be created during writing) contrasting frequentist vs Bayesian inference pipelines. Frequentist: Data -> Likelihood -> Point Estimate + CI. Bayesian: Prior + Data -> Likelihood x Prior -> Posterior -> Point Estimate + Credible Interval + Direct Probability Statements. This diagram appears in the introduction and is referenced throughout.

---

## Section Plan

### Section 1: The Bayesian Leap: From Fixed Parameters to Random Variables {#sec-bayesian-leap}

**File:** `_01-the-bayesian-leap.qmd`
**Estimated length:** 1,800-2,000 words
**Goal:** The reader should understand the fundamental philosophical shift from frequentist to Bayesian thinking, why it matters practically, and what it buys you. They should leave this section saying "I see why I'd want to do this."
**Running example application:** MedScreen's CEO asks "what's the accuracy?" and we show that the frequentist answer (75% +/- CI) throws away useful historical information, while the Bayesian answer incorporates it naturally.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| VanderPlas: Frequentism and Bayesianism | `sources/jakevdp.github.io/.../` | Part I | Philosophical distinction, probability definitions |
| The Bayesian Way (arXiv) | `sources/arxiv-2512.05883/main.tex` | Sections 1-2 | Historical context, formal framework |
| Probabilitycourse Ch9.1.0 | `sources/probabilitycourse.com/chapter9/9_1_0_bayesian_inference/content.md` | Full section | Motivating examples (election, communication channel) |
| User's own notes (statistics-1/13.md) | `sources/statistics-1/13.md` | Bayesian vs frequentist side note | Reader's existing understanding to build on |

**Content outline:**
1. Open with MedScreen example: same data, two different frameworks (A-E: concrete example first, then generalize)
2. Recap the frequentist worldview the reader already knows: $\Theta$ is fixed, data is random, probability = long-run frequency (connect explicitly to statistics-2 notes on statistical models)
3. The Bayesian worldview: $\Theta$ is a random variable with a distribution. Probability = degree of belief. This is not just a philosophical nicety; it changes what you can compute.
4. The three concrete consequences of treating $\Theta$ as random: (a) you can make direct probability statements about $\Theta$, (b) you can incorporate prior knowledge formally, (c) you get a full distribution over $\Theta$ instead of a point estimate
5. Side-by-side comparison table: what each framework assumes, what it produces, what questions it can answer
6. When Bayesian and frequentist give the same answer (large samples, flat priors) vs when they diverge (small samples, strong prior information)

**Key equations:** Bayes' theorem: $p(\theta | x) = \frac{p(x|\theta) p(\theta)}{p(x)}$ with each term named explicitly
**Visualizations:**
- D2 diagram: Frequentist vs Bayesian pipeline (the hook image)
- hvplot: Same coin-flip data analyzed both ways, showing how the Bayesian posterior shrinks toward the prior with small n

---

### Section 2: The Mechanics of Bayesian Updating {#sec-bayesian-updating}

**File:** `_02-bayesian-updating.qmd`
**Estimated length:** 2,000-2,200 words
**Goal:** The reader should be able to take a prior, a likelihood, and mechanically compute a posterior. They should understand the role of each component and why the normalizing constant matters (or doesn't).
**Running example application:** MedScreen's Beta-Binomial model: prior belief about test accuracy (Beta distribution), binomial likelihood from trial data, and the resulting posterior. Concrete numbers throughout.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Probabilitycourse Ch9.1.1 | `sources/probabilitycourse.com/chapter9/9_1_1_prior_and_posterior/content.md` | Full section | Prior/posterior derivation with Uniform-Geometric example |
| Gundersen: Conjugacy | `sources/gregorygundersen.com/blog/2019/03/16/conjugacy/` (WebFetch content) | Full post | Beta-Binomial derivation, sequential updating, benefits of conjugacy |
| MIT 18.05 Lec 15 | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec15-conjugate-priors.pdf` | Beta-Binomial section | Worked conjugate prior examples |
| The Bayesian Way (arXiv) | `sources/arxiv-2512.05883/main.tex` | Sections on posterior computation | Formal derivation, proportionality argument |

**Content outline:**
1. The three ingredients: prior $p(\theta)$, likelihood $p(x|\theta)$, and the posterior $p(\theta|x)$. Define each with the MedScreen example.
2. The recipe: multiply prior by likelihood, normalize. Walk through the full Beta-Binomial calculation step-by-step with concrete numbers ($\alpha=3, \beta=1$ prior, 15/20 successes).
3. Why the normalizing constant $p(x) = \int p(x|\theta)p(\theta)d\theta$ is the hard part (and when you can ignore it). The "proportional to" shortcut.
4. MAP estimation: the mode of the posterior. Derive it for Beta-Binomial. Show it's a weighted average of MLE and prior mode. Compare to the MLE the reader already knows.
5. Posterior mean vs MAP vs MLE: when they agree and when they differ. Concrete numerical comparison for the MedScreen example.
6. Sequential updating: the posterior becomes the next prior. Show with an hvplot animation of the Beta distribution updating after each batch of trial data.

**Key equations:**
- Bayes' rule: $p(\theta|x) \propto p(x|\theta) \cdot p(\theta)$
- Beta-Binomial: $\text{Beta}(\alpha, \beta) \times \text{Binomial}(m, n) \to \text{Beta}(\alpha + m, \beta + n - m)$
- MAP estimate: $\hat{\theta}_{MAP} = \frac{m + \alpha - 1}{n + \alpha + \beta - 2}$
- Posterior mean: $E[\theta|x] = \frac{m + \alpha}{n + \alpha + \beta}$

**Visualizations:**
- hvplot: Prior, likelihood, and posterior on the same axis (three curves) for the MedScreen Beta-Binomial example
- hvplot: Sequential updating animation showing the posterior after 5, 10, 15, 20 observations
- D2 diagram: The update cycle (prior -> data -> posterior -> becomes new prior -> more data -> updated posterior)

---

### Section 3: Conjugate Priors and Choosing Your Prior {#sec-conjugate-priors}

**File:** `_03-conjugate-priors-and-choosing.qmd`
**Estimated length:** 1,800-2,000 words
**Goal:** The reader should understand what conjugate priors are, why they're computationally convenient, know the major conjugate families, and have a practical framework for choosing priors (informative, weakly informative, Jeffreys).
**Running example application:** MedScreen needs to choose a prior for their test accuracy. What happens with different prior choices? We show how the prior affects the posterior and when it matters.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Gundersen: Conjugacy | (WebFetch content) | Full post | Benefits of conjugacy, sequential learning |
| Wikipedia: Conjugate Prior | N/A | Table of conjugate families | Reference table |
| MIT 18.05 Lec 15 | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec15-conjugate-priors.pdf` | Normal-Normal section | Normal-Normal conjugacy derivation |
| Strimmer Lab: Choosing Priors | N/A | Full page | Informative/uninformative/weakly informative framework |
| Gelman: Jeffreys and Philosophy | N/A | Sections on weak priors | Why flat priors fail, weakly informative recommendation |
| The Bayesian Way (arXiv) | `sources/arxiv-2512.05883/main.tex` | Conjugacy sections | Formal treatment of conjugate families |

**Content outline:**
1. What conjugacy means and why it matters: the posterior stays in the same family as the prior. Computational tractability (no integrals to solve).
2. The major conjugate families table: Beta-Binomial, Normal-Normal (known variance), Normal-Inverse-Gamma (unknown mean and variance), Gamma-Poisson, Dirichlet-Multinomial. For each: prior, likelihood, posterior, and the hyperparameter update rule.
3. The Normal-Normal conjugacy worked example: estimating mean test accuracy across hospitals when variance is known. Full derivation showing posterior mean is a precision-weighted average of prior mean and sample mean.
4. The prior sensitivity question: what happens when you change the prior? hvplot showing same data with different priors: strong informative, weakly informative, flat/uniform, Jeffreys.
5. Practical prior selection framework: (a) informative priors from domain knowledge, (b) weakly informative priors as default, (c) why "uninformative" priors are a myth (non-invariance under reparametrization), (d) Jeffreys prior as a principled alternative.
6. When conjugacy breaks: most real problems don't have conjugate solutions. This motivates computational methods (next section).

**Key equations:**
- Normal-Normal: posterior precision = prior precision + data precision; posterior mean = precision-weighted average
- Jeffreys prior: $p(\theta) \propto \sqrt{I(\theta)}$ where $I(\theta)$ is Fisher information

**Visualizations:**
- Table: Major conjugate families with prior, likelihood, posterior, update rules
- hvplot: Prior sensitivity analysis showing 4 different priors on the same data producing 4 different posteriors
- hvplot: Normal-Normal precision weighting: as n grows, data dominates the prior

---

### Section 4: Credible Intervals and Bayesian Hypothesis Testing {#sec-credible-intervals}

**File:** `_04-credible-intervals-and-testing.qmd`
**Estimated length:** 1,800-2,000 words
**Goal:** The reader should understand credible intervals (and how they differ from confidence intervals), HPD intervals, Bayesian hypothesis testing via Bayes factors, and the posterior predictive distribution.
**Running example application:** MedScreen needs to answer: "Is there a 95% probability our test accuracy exceeds 70%?" (a question frequentist CI cannot directly answer). They also need to compare two test versions (Bayesian hypothesis testing).

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Probabilitycourse Ch9.1.9 | `sources/probabilitycourse.com/chapter9/9_1_9_bayesian_interval_estimation/content.md` | Full section | Credible interval definition and construction |
| Statsig: Credible vs Confidence | N/A | Full article | Clear comparison of interpretations |
| Wikipedia: Credible Interval | N/A | HPD section | Highest posterior density definition |
| Bayesian Spectacles: Misconceptions | `sources/bayesianspectacles.org/popular-misconceptions/` | Full article | Bayes factor misconceptions, prior-posterior confusion |
| The Bayesian Way (arXiv) | `sources/arxiv-2512.05883/main.tex` | Bayes factors, credible intervals | Formal definitions, Bayes factor interpretation scale |

**Content outline:**
1. Credible intervals: the Bayesian analog of confidence intervals. Definition: $P(a \leq \theta \leq b | \text{data}) = 1-\alpha$. This directly answers "what's the probability the parameter is in this range?"
2. The key difference from confidence intervals (with a concrete example): a 95% CI means "if I repeated this experiment many times, 95% of intervals would contain $\theta$." A 95% credible interval means "given my data and prior, there's a 95% probability $\theta$ is in this range." The Bayesian statement is what most people *think* a confidence interval means.
3. HPD (Highest Posterior Density) intervals: the shortest interval containing 95% of the posterior mass. Why this is preferred over equal-tailed intervals for skewed posteriors.
4. Computing credible intervals for the MedScreen example from the Beta posterior. Concrete numbers.
5. Bayesian hypothesis testing: instead of p-values, use Bayes factors. The Bayes factor $BF_{10} = \frac{P(\text{data}|H_1)}{P(\text{data}|H_0)}$ measures the relative evidence. Kass-Raftery interpretation scale.
6. Common misconceptions about Bayes factors: they measure relative evidence, not absolute probability. A large BF doesn't mean the hypothesis is "true." The prior odds still matter.
7. Posterior predictive distribution: predicting new data given observed data. $p(\tilde{x}|x) = \int p(\tilde{x}|\theta) p(\theta|x) d\theta$. MedScreen uses this to predict how many of the next 100 patients the test will correctly detect.

**Key equations:**
- Credible interval: $P(a \leq \theta \leq b | x) = 1 - \alpha$
- Bayes factor: $BF_{10} = \frac{P(x|H_1)}{P(x|H_0)} = \frac{\int p(x|\theta_1)p(\theta_1|H_1)d\theta_1}{\int p(x|\theta_0)p(\theta_0|H_0)d\theta_0}$
- Posterior predictive: $p(\tilde{x}|x) = \int p(\tilde{x}|\theta) p(\theta|x) d\theta$

**Visualizations:**
- hvplot: Posterior distribution with credible interval shaded, HPD vs equal-tailed comparison
- D2 diagram: Bayes factor interpretation scale (anecdotal, moderate, strong, very strong, extreme)
- hvplot: Posterior predictive distribution for MedScreen's next 100 patients

---

### Section 5: When Conjugacy Fails: MCMC and Computational Bayesian Methods {#sec-computational-methods}

**File:** `_05-computational-methods.qmd`
**Estimated length:** 2,000-2,200 words
**Goal:** The reader should understand why computational methods are needed (most real posteriors aren't conjugate), how MCMC works intuitively, what the Metropolis-Hastings algorithm does, how NUTS/HMC improves on it, and get a first look at variational inference. They should also see a PyMC model in action.
**Running example application:** MedScreen's problem becomes non-conjugate: they want to model test accuracy as a function of patient age (logistic regression with a prior on coefficients). No closed-form posterior exists; we need MCMC.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| MCMC Visualizer | N/A | Interactive tool | Intuition for M-H algorithm |
| Gundersen: Hamiltonian Monte Carlo | N/A | Full post | HMC explanation, why gradients help |
| VanderPlas Part IV | `sources/jakevdp.github.io/.../` | MCMC section | Python MCMC implementation comparison |
| Eric Jang: Variational Bayes | N/A | Full post | ELBO, mean-field approximation intuition |
| PyMC: GLM Linear Regression | N/A | Full notebook | Practical MCMC with NUTS in PyMC |
| Statology: First Bayesian Model | N/A | Full tutorial | Step-by-step PyMC model building |
| Stan User's Guide: Predictive Checks | N/A | Predictive checking sections | Prior/posterior predictive checks workflow |

**Content outline:**
1. Why we need computation: most real posteriors are intractable (no conjugacy). The normalizing constant $p(x) = \int p(x|\theta)p(\theta)d\theta$ is an integral over all of parameter space, which is often impossible to compute analytically.
2. The MCMC idea: instead of computing $p(\theta|x)$ analytically, *sample* from it. If you can generate thousands of samples from the posterior, you can approximate anything: means, variances, credible intervals, predictions.
3. Metropolis-Hastings explained with the "random walk on a mountain" analogy: propose a move, accept if the new spot is higher (more probable), sometimes accept even if lower. After many steps, you've sampled proportionally to the posterior.
4. Problems with basic M-H: random walk is slow, correlated samples, poor scaling to high dimensions.
5. Hamiltonian Monte Carlo (HMC) and NUTS: using gradient information to make smarter proposals. The "ball rolling on a surface" analogy. NUTS automatically tunes the trajectory length.
6. Variational inference as an alternative: instead of sampling, *approximate* the posterior with a simpler distribution. Minimize KL divergence (maximize ELBO). Faster but potentially less accurate. When to use VI vs MCMC.
7. A complete PyMC example: MedScreen's logistic regression model. Define priors, likelihood, run MCMC, check diagnostics (trace plots, R-hat, effective sample size), extract posteriors.
8. The Bayesian workflow: prior predictive check -> fit model -> convergence diagnostics -> posterior predictive check -> iterate.

**Key equations:**
- M-H acceptance ratio: $\alpha = \min\left(1, \frac{p(\theta'|x) q(\theta|\theta')}{p(\theta|x) q(\theta'|\theta)}\right)$
- ELBO: $\mathcal{L}(q) = E_q[\log p(x, \theta)] - E_q[\log q(\theta)]$

**Visualizations:**
- D2 diagram: The computational Bayesian landscape (conjugate -> MCMC -> VI -> ABC)
- hvplot: Trace plot from MCMC showing convergence (simulated)
- hvplot: Posterior density estimated from MCMC samples vs true conjugate posterior (showing accuracy)
- Code block: Complete PyMC model specification (5-10 lines of Python)

---

### Section 6: Bayesian Linear Regression and Hierarchical Models {#sec-bayesian-regression-hierarchical}

**File:** `_06-bayesian-regression-and-hierarchical.qmd`
**Estimated length:** 2,000-2,200 words
**Goal:** The reader should understand how Bayesian thinking extends to regression (priors on coefficients, posterior predictive intervals instead of just prediction intervals), and how hierarchical models enable partial pooling across groups. They should see the connection to the frequentist regression they already know.
**Running example application:** MedScreen deploys the test across 8 hospitals. Each hospital has different patient populations and sample sizes (some large, some tiny). How to estimate hospital-specific accuracy rates while sharing information across hospitals? Hierarchical Bayesian model with partial pooling.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| PyMC: GLM Linear Regression | N/A | Full notebook | Bayesian linear regression with uncertainty bands |
| PyMC: Hierarchical Partial Pooling | N/A | Full notebook | Baseball batting averages, shrinkage toward population mean |
| PyMC: Multilevel Modeling | N/A | Radon example | Hierarchical model structure, varying intercepts |
| BDA3 (Gelman) | `sources/users.aalto.fi/BDA3/BDA3.pdf` | Chapter 5: Hierarchical models | Formal treatment of exchangeability, hierarchical structure |
| The Bayesian Way (arXiv) | `sources/arxiv-2512.05883/main.tex` | Regression and hierarchical sections | Formal definitions |

**Content outline:**
1. Bayesian linear regression: the frequentist reader knows $y = X\beta + \epsilon$. The Bayesian version puts priors on $\beta$ and $\sigma^2$. The posterior $p(\beta, \sigma | y, X)$ gives a distribution over regression lines instead of a single line.
2. Mapping Bayesian to frequentist regression: OLS = flat prior. Ridge regression = Normal prior on $\beta$. Lasso = Laplace prior on $\beta$. The reader already knows regularization; now they see it's Bayesian.
3. Posterior predictive intervals: for a new input $x_{new}$, the predictive distribution integrates over all plausible regression lines. This produces wider, more honest uncertainty bands than frequentist prediction intervals.
4. Hierarchical models: the problem of small samples at the group level. No pooling vs complete pooling vs partial pooling (with the MedScreen multi-hospital example).
5. The hierarchical model structure: individual hospital parameters $\theta_j$ are drawn from a population distribution $\theta_j \sim N(\mu, \tau^2)$, where $\mu$ and $\tau$ themselves have hyperpriors. Data from all hospitals informs the population-level parameters, which in turn pulls small-sample hospitals toward the group mean.
6. Shrinkage and partial pooling: hospitals with more data shrink less; hospitals with less data shrink more. This automatic, data-adaptive regularization is one of the most powerful features of Bayesian statistics.
7. Connection to the bigger picture: hierarchical Bayesian models are the natural framework for meta-analysis, mixed-effects models, and many ML techniques (Bayesian neural networks, Gaussian processes).

**Key equations:**
- Bayesian regression: $p(\beta, \sigma | y, X) \propto p(y | X, \beta, \sigma) \cdot p(\beta) \cdot p(\sigma)$
- Hierarchical model: $\theta_j | \mu, \tau \sim N(\mu, \tau^2)$, $\mu \sim N(\mu_0, \sigma_0^2)$, $\tau \sim \text{Half-Cauchy}(0, s)$
- Shrinkage: $\hat{\theta}_j^{Bayes} \approx \frac{n_j}{n_j + \kappa} \bar{x}_j + \frac{\kappa}{n_j + \kappa} \mu$ (pooling toward grand mean)

**Visualizations:**
- hvplot: Bayesian regression with uncertainty band (fan of plausible regression lines) vs single OLS line
- D2 diagram: Hierarchical model plate diagram showing hospital-level and population-level
- hvplot: Shrinkage plot showing hospital estimates pulled toward grand mean, with degree of shrinkage proportional to sample size

---

## Source Image Catalog

**This chapter is primarily math-heavy and conceptual.** Source images from downloaded papers are not the primary visualization strategy. Instead, most visuals will be:

1. **D2 diagrams** for concept maps and flowcharts (frequentist vs Bayesian pipeline, update cycle, computational landscape, hierarchical plate diagram, Bayes factor scale)
2. **Python/hvplot** for all data visualizations (prior/likelihood/posterior curves, sequential updating, prior sensitivity, credible intervals, MCMC trace plots, regression uncertainty bands, shrinkage plots)

The arXiv paper `sources/arxiv-2512.05883/` contains no separate figure files (pure LaTeX, no images directory). The probabilitycourse.com sources have some images already downloaded, but these are low-resolution web graphics. We will generate higher-quality versions programmatically.

| # | Planned Visual | Type | Section | Notes |
|---|---|---|---|---|
| 1 | Frequentist vs Bayesian pipeline diagram | D2 | S1 | Hook image; side-by-side comparison of the two frameworks |
| 2 | Prior + likelihood = posterior overlay plot | hvplot | S2 | Three curves on one axis for Beta-Binomial MedScreen example |
| 3 | Sequential Bayesian updating animation | hvplot | S2 | Beta posterior after 5, 10, 15, 20 observations |
| 4 | Bayesian update cycle diagram | D2 | S2 | Prior -> Data -> Posterior -> becomes new Prior |
| 5 | Conjugate families reference table | Markdown table | S3 | Beta-Binomial, Normal-Normal, Gamma-Poisson, etc. |
| 6 | Prior sensitivity comparison plot | hvplot | S3 | Same data, 4 different priors, 4 different posteriors |
| 7 | Normal-Normal precision weighting plot | hvplot | S3 | Posterior mean as n grows (data dominates prior) |
| 8 | Credible interval with HPD comparison | hvplot | S4 | Posterior with shaded CI; HPD vs equal-tailed |
| 9 | Bayes factor interpretation scale | D2 | S4 | Color-coded scale: anecdotal through extreme |
| 10 | Posterior predictive distribution | hvplot | S4 | Distribution of predicted outcomes for next 100 patients |
| 11 | Computational landscape diagram | D2 | S5 | Conjugate -> MCMC -> VI -> ABC decision tree |
| 12 | MCMC trace plot | hvplot | S5 | Simulated trace showing convergence |
| 13 | MCMC samples vs true posterior | hvplot | S5 | Histogram of samples overlaid on analytical posterior |
| 14 | Bayesian regression uncertainty fan | hvplot | S6 | Multiple regression lines from posterior samples |
| 15 | Hierarchical model plate diagram | D2 | S6 | Hospital-level and population-level parameters |
| 16 | Shrinkage plot | hvplot | S6 | Hospital estimates pulled toward grand mean |

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,000-1,500 words

**Content:**
1. Key takeaways (7 bullet points):
   - Bayesian statistics treats unknown parameters as random variables with distributions, not fixed unknowns
   - The posterior combines prior knowledge with observed data via Bayes' rule
   - Conjugate priors make computation easy; most real problems need MCMC or variational inference
   - Credible intervals answer the question people actually want: "what's the probability the parameter is in this range?"
   - Bayesian hypothesis testing via Bayes factors measures the weight of evidence for one model over another
   - Hierarchical models enable partial pooling: borrowing strength across groups while respecting group-level variation
   - The Bayesian workflow (prior predictive check, fit, diagnose, posterior predictive check) is a principled iterative modeling process
2. Completed concept map (D2 diagram): Full Bayesian statistics concept map showing relationships between all major concepts covered in the chapter
3. Retrieval practice questions (6, with answers in collapsed callout):
   - "What is the fundamental difference between frequentist and Bayesian treatment of unknown parameters?"
   - "If you observe 7 heads in 10 coin flips with a Beta(2,2) prior, what is the posterior distribution?"
   - "Why can't you say a 95% confidence interval has a 95% probability of containing the true parameter?"
   - "When does the MAP estimate equal the MLE?"
   - "Why is MCMC needed for most real Bayesian models?"
   - "What is partial pooling and why is it useful?"
4. Common mistakes section:
   - Confusing credible intervals with confidence intervals
   - Thinking flat priors are "non-informative" (they're not, due to reparametrization non-invariance)
   - Interpreting Bayes factors as absolute probabilities rather than relative evidence
   - Using MCMC without checking convergence diagnostics
   - Overcomplicating the model before checking the simple version
5. Curated resource list (verified URLs):
   - Think Bayes 2e (free online, code-first) by Allen Downey
   - Bayesian Data Analysis 3e (free PDF) by Gelman et al.
   - Statistical Rethinking by Richard McElreath (with video lectures)
   - PyMC documentation and example gallery
   - MIT 18.05 course materials

---

## Cross-Cutting Concerns

**Notation table:**

| Symbol | Definition | Valid Values | Example (MedScreen) |
|--------|-----------|-------------|---------------------|
| $\theta$ | Unknown parameter (random variable in Bayesian framework) | Depends on model; often $\theta \in \Theta \subseteq \mathbb{R}^d$ | Test accuracy rate $\theta \in [0, 1]$ |
| $p(\theta)$ | Prior distribution: our belief about $\theta$ before seeing data | A valid PDF/PMF over $\Theta$ | $\text{Beta}(3, 1)$ centered around 0.75 |
| $p(x \mid \theta)$ | Likelihood: probability of observing data $x$ given $\theta$ | Function of $\theta$ for fixed $x$; $\geq 0$ | $\text{Binomial}(20, \theta)$ evaluated at $x = 15$ |
| $p(\theta \mid x)$ | Posterior distribution: updated belief after observing data | A valid PDF/PMF over $\Theta$ | $\text{Beta}(18, 6)$ |
| $p(x)$ | Evidence / marginal likelihood: $\int p(x \mid \theta) p(\theta) d\theta$ | Positive real number (normalizing constant) | $\int_0^1 \binom{20}{15} \theta^{15}(1-\theta)^5 \cdot \text{Beta}(\theta;3,1) d\theta$ |
| $\hat{\theta}_{MAP}$ | MAP estimate: mode of posterior | A single value in $\Theta$ | $\hat{\theta}_{MAP} = 0.77$ |
| $\hat{\theta}_{MLE}$ | MLE: mode of likelihood (frequentist point estimate) | A single value in $\Theta$ | $\hat{\theta}_{MLE} = 15/20 = 0.75$ |
| $\alpha, \beta$ | Hyperparameters of the Beta prior | $\alpha > 0, \beta > 0$ | $\alpha = 3, \beta = 1$ |
| $BF_{10}$ | Bayes factor comparing model 1 to model 0 | Positive real number | $BF_{10} = 4.2$ means data is 4.2x more likely under $H_1$ |
| $\text{KL}(q \| p)$ | KL divergence from $q$ to $p$ | $\geq 0$; $= 0$ iff $q = p$ | Measures how far variational approximation is from true posterior |
| $\mathcal{L}(q)$ | ELBO (Evidence Lower Bound) | Real number $\leq \log p(x)$ | Optimization target in variational inference |

**Concept map design:** A single D2 diagram with the following structure:
- **Input nodes** (indigo): Observed Data, Prior Knowledge
- **Process nodes** (emerald): Bayes' Rule, MCMC Sampling, Variational Inference, Conjugate Update
- **Decision nodes** (amber): Is posterior conjugate? Is model hierarchical?
- **Output nodes** (blue): Posterior Distribution, Credible Intervals, Bayes Factors, Predictions
- **Highlight node** (rose): "Parameters are Random Variables" as the central insight
- **Container**: "Bayesian Statistics Framework" grouping all nodes
- Arrows showing the flow from data + prior through computation to inference outputs

**Prerequisite knowledge to recap:**
- Bayes' rule from probability (prior + likelihood + marginal = posterior). Reader knows this from probability but needs it re-framed for statistical inference.
- Maximum likelihood estimation (MLE). Reader knows this thoroughly from frequentist statistics; it serves as the reference point for MAP.
- Confidence intervals. Reader knows the construction and interpretation; contrast with credible intervals is a central theme.
- Linear regression (OLS). Reader knows the frequentist version; Bayesian regression is presented as a direct extension.
- Probability distributions: Beta, Normal, Binomial, Poisson, Gamma. Reader knows these from probability; we use them as priors and likelihoods.

**Common Misconceptions:**

1. **"Bayesian statistics is just adding a prior to your likelihood."** While mechanically true, this misses the deeper point: the Bayesian framework changes what questions you can answer. You go from "what parameter value maximizes the data probability?" to "what is the full distribution of plausible parameter values?"

2. **"Flat priors are non-informative / objective."** A uniform prior on $\theta$ is not uniform on $\log \theta$ or $\theta^2$. "Non-informative" priors are a myth; every prior is informative under some reparametrization. The modern recommendation is weakly informative priors that encode basic domain constraints.

3. **"A 95% credible interval and a 95% confidence interval mean the same thing."** They coincide numerically in many cases (large samples, weak priors) but have fundamentally different interpretations. The credible interval makes a probability statement about the parameter; the confidence interval makes a frequency statement about the procedure.

4. **"A large Bayes factor proves the hypothesis."** A Bayes factor of 100 means the data is 100x more likely under $H_1$ than $H_0$, but the posterior odds also depend on prior odds. If $H_1$ was a priori extremely unlikely, even a large Bayes factor may not make it probable.

5. **"MCMC gives you the exact posterior."** MCMC produces samples that, with enough iterations and proper convergence, approximate the posterior arbitrarily well. But it is an approximation. Convergence diagnostics (R-hat, effective sample size, trace plots) are essential.

**Think Hard questions:**

1. "If two researchers use different priors on the same data and get different posteriors, is Bayesian statistics subjective? Is that a problem?" (Gets at the prior subjectivity debate and the role of likelihood dominance with enough data.)

2. "You have a Beta(1,1) prior (uniform) and observe 0 successes in 10 trials. The MLE is 0. What is the posterior mean? Why is this different, and which answer is more useful?" (Gets at regularization through priors and the problem of MLE at boundaries.)

3. "In what sense is ridge regression 'secretly Bayesian'? What prior does it correspond to, and what does the regularization parameter $\lambda$ control in Bayesian terms?" (Bridges frequentist regularization to Bayesian priors on regression coefficients.)

4. "A hospital with 5 patients (3 correct detections) and a hospital with 500 patients (350 correct detections) both have 60% raw accuracy. Should they receive the same accuracy estimate? Why might a hierarchical model give them different estimates?" (Gets at partial pooling and shrinkage.)

5. "If you had infinite data, would the prior matter? What happens to the posterior as $n \to \infty$?" (Gets at the Bernstein-von Mises theorem: posterior concentrates on true parameter regardless of prior, i.e., Bayesian and frequentist answers converge.)

**Math Background assessment:** This chapter uses the following mathematical concepts above 10th-grade level:

| Concept | Section(s) Used | Derived or Assumed? |
|---------|----------------|---------------------|
| Bayes' Rule (conditional probability) | All sections | Assumed (from probability course) |
| Beta distribution (PDF, mean, variance, mode) | S2, S3, S4 | Derived for specific cases, properties assumed |
| Integration (for normalizing constant, marginal likelihood) | S2, S4, S5 | Assumed (calculus background) |
| Maximum Likelihood Estimation | S1, S2 | Assumed (reader's frequentist background) |
| Fisher Information | S3 (Jeffreys prior) | Briefly introduced, not derived from scratch |
| KL Divergence | S5 (variational inference) | Briefly introduced, not derived from scratch |
| Linear Algebra (for regression) | S6 | Assumed (reader's linear algebra background) |

The reader's existing notes show strong comfort with probability distributions, MLE, confidence intervals, and linear regression. Fisher Information and KL divergence are the two concepts that may need brief explanation. A `_98-math-background.qmd` appendix is **not needed**: Fisher Information can be explained in a 2-sentence aside, and KL divergence needs only a 1-paragraph intuitive explanation within the variational inference subsection. The chapter is not proof-heavy; it emphasizes computation and intuition over formal derivation.

Math Background appendix: **not needed.**
