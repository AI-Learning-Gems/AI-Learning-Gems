# Handoff Prompt: Rewrite Bayesian Statistics Chapter (Multi-Quantity Parallel Approach)

> **READ THIS BOX BEFORE ANYTHING ELSE.**
>
> The current chapter was written using only **7 of 34 available sources.** The other 27 sources
> were either not downloaded, not extracted from PDF, or silently ignored by previous agents.
> As a result, the chapter is **missing critical content** from:
>
> - **Gelman's BDA3** (the definitive Bayesian textbook, 677 pages, now OCR'd)
> - **The Dirichlet-Multinomial derivation** (Stephen Tu, needed for the star-rating model)
> - **All five conjugate family references** (Cook's 47-page Compendium, Bayes Rules Ch5)
> - **The Bayesian workflow paper** (Gelman 2020, needed for the MCMC section)
> - **MIT OCW worked examples** (Lec 12 and 15, conjugate prior derivations)
> - **Variational inference** (Eric Jang's ELBO tutorial)
> - **Credible interval details** (Wikipedia, Statsig comparison)
> - **Hierarchical model examples** (PyMC multilevel, Stan posterior predictive)
>
> Your job is not just to add the multi-quantity framing. **Your job is to read ALL 34 sources
> and write a chapter that actually reflects what those sources contain.** The multi-quantity
> approach is the structural change; but the content must come from the sources, and most of
> the sources have never been read. If you skip sources, you are repeating the exact failure
> mode that produced the current incomplete chapter.

## Your Task

You are rewriting an existing Bayesian Statistics textbook chapter. The chapter needs TWO kinds of changes:

**Change 1 (Structural): Multi-quantity parallel approach.** Replace the single-quantity example (product return rate) with five quantities about the same Amazon headphones, each mapping to a different conjugate family. This prevents students from conflating binary random variable values with probabilities.

**Change 2 (Content): Integrate ALL 34 sources.** The current chapter was written from ~7 sources. There are 27 additional sources on disk that contain critical content for every section. You must read them and integrate their content. This is not about the NOIR data types alone. Examples of what's missing:

- **S2 (Bayesian Leap):** Gelman BDA3 Ch1-2 on Bayesian philosophy. Gundersen's Probabilistic ML post. Douglas Yao's freq-vs-Bayes comparison.
- **S3 (Updating):** MIT OCW Lec 12 worked examples. Stephen Tu's Dirichlet-Multinomial derivation. Evan Miller's star rating Bayesian approach.
- **S4 (Conjugate Priors):** Cook's complete Compendium of Conjugate Priors. MIT OCW Lec 15. Bayes Rules Ch5 (Gamma-Poisson). Gelman Jeffreys on flat priors.
- **S5 (Credible Intervals):** Wikipedia credible interval article (HPD vs equal-tailed). Statsig comparison. Evan Miller credible intervals for star ratings.
- **S6 (MCMC):** Eric Jang's ELBO/VI tutorial. Gelman Bayesian Workflow paper. Stan posterior predictive checks.
- **S7 (Hierarchical):** Gelman BDA3 Ch5. PyMC multilevel modeling (Radon example).

**Both changes are equally important. Do not do one without the other.**

**Read this entire prompt before doing anything.** Then follow the instructions in order.

---

## Critical Context Files to Read FIRST

Read these files in this exact order before making any changes:

### 1. The Updated Plan (YOUR PRIMARY GUIDE)
**`/Users/adivekar/workplace/AI-Learning-Gems/Statistics/Bayesian Statistics/TEXTBOOK-PLAN-v2.md`**

This is the new plan created after extensive discussion with the user. It specifies:
- Five quantities about the same Amazon headphones product (binary, ordinal, categorical, count, continuous)
- Which conjugate family maps to each quantity
- How each section should present all five quantities in parallel
- Which sources to read for each section (all 23 sources are downloaded and verified on disk)

### 2. The Existing Chapter Files (WHAT YOU'RE MODIFYING)
All in `/Users/adivekar/workplace/AI-Learning-Gems/Statistics/Bayesian Statistics/`:
- `Bayesian Statistics.qmd` (index file)
- `Bayesian Statistics/_01-introduction.qmd` (introduction)
- `Bayesian Statistics/_02-the-bayesian-leap.qmd` (frequentist vs Bayesian philosophy)
- `Bayesian Statistics/_03-bayesian-updating.qmd` (Beta-Binomial mechanics)
- `Bayesian Statistics/_04-conjugate-priors-and-choosing.qmd` (conjugate families + prior choice)
- `Bayesian Statistics/_05-credible-intervals-and-testing.qmd` (credible intervals, Bayes factors)
- `Bayesian Statistics/_06-computational-methods.qmd` (MCMC, HMC, VI, PyMC)
- `Bayesian Statistics/_07-bayesian-regression-and-hierarchical.qmd` (regression + hierarchical)
- `Bayesian Statistics/_99-closing.qmd` (takeaways, exercises, resources)

**Read ALL of these files in full before making changes.** The existing prose has been extensively edited for precision, engagement, and technical correctness. Preserve what works; change what the new plan requires.

### 3. The Workflow Rules
- `/Users/adivekar/workplace/AI-Learning-Gems/.agent/workflows/write-textbook-chapter.md` (the writing workflow)
- `/Users/adivekar/workplace/AI-Learning-Gems/.agent/rules/writing-style.md` (prose rules)
- `/Users/adivekar/workplace/AI-Learning-Gems/.agent/rules/source-management.md` (source rules)
- `/Users/adivekar/workplace/AI-Learning-Gems/.agent/rules/quarto-conventions.md` (formatting rules)
- `/Users/adivekar/workplace/AI-Learning-Gems/.agent/rules/exercise-syntax.md` (exercise syntax)
- `/Users/adivekar/workplace/AI-Learning-Gems/.agent/rules/visualization-standards.md` (visualization rules)

### 4. The Old Plan (FOR REFERENCE ONLY — do NOT follow it)
`/Users/adivekar/workplace/AI-Learning-Gems/Statistics/Bayesian Statistics/TEXTBOOK-PLAN.md`
This is the v1 plan with the old MedScreen clinical trial example. It is outdated. Use TEXTBOOK-PLAN-v2.md instead.

---

## What Changed and Why

### The Core Problem We're Fixing

The current chapter uses a single binary quantity (product return rate / positive ratings) throughout, which causes students to conflate the random variable values {0, 1} with the probability parameter θ ∈ [0, 1]. The user's insight: by showing MULTIPLE data types in parallel (where the observation space and parameter space are clearly different), the reader naturally separates "what the random variable produces" from "what the parameter is."

### The Five Quantities (Same Amazon Headphones, $79)

| # | Quantity | Data Type | Observation Space | Likelihood | Conjugate Prior | Parameter Space |
|---|---|---|---|---|---|---|
| 1 | **Return rate** | Binary | {returned, not returned} | Binomial | Beta | θ ∈ [0,1] |
| 2 | **Star rating** | Ordinal | {1, 2, 3, 4, 5} | Multinomial | Dirichlet | **p** ∈ Δ⁴ (5-simplex) |
| 3 | **Return reason** | Categorical | {Defective, Wrong fit, Changed mind, Better price, Other} | Multinomial | Dirichlet | **q** ∈ Δ⁴ |
| 4 | **Customer questions/day** | Count | {0, 1, 2, ...} | Poisson | Gamma | λ ∈ (0, ∞) |
| 5 | **Battery life** (hours) | Continuous | (0, ∞) | Normal | Normal | μ ∈ ℝ |

### Concrete Data for the Running Example

Use these numbers consistently across all sections:
- **Return rate:** 3 returns out of 20 buyers
- **Star ratings:** {2 one-star, 1 two-star, 2 three-star, 5 four-star, 10 five-star} = 20 total, average ~3.8
- **Return reasons:** {1 Defective, 1 Wrong fit, 1 Changed mind} = 3 returns
- **Customer questions:** ~2 questions per day observed over 7 days (total 14)
- **Battery life:** 5 reported values: {28, 31, 29, 32, 30} hours (claimed: 30h)

### How Each Section Changes

**Section 1 (Introduction):**
- Hook: present all five questions about the headphones (not just one)
- Notation table: include symbols for ALL five conjugate families
- The "five-quantity table" (shown above) appears here and is referenced throughout
- The core question is no longer "what is P(θ > 0.70)?" but rather "should you buy these headphones?" which requires answering five different sub-questions

**Section 2 (Bayesian Leap):**
- Show the frequentist limitation for EACH of the five quantities
- The "category error" explanation applies to all: for star ratings, the freq can't say "P(p₅ > 0.4) = 0.73"; for battery life, can't say "P(μ > 29) = 0.82"
- The side-by-side table gets rows for each data type

**Section 3 (Bayesian Updating):**
- PRIMARY worked example: Beta-Binomial with return rate (already mostly done)
- NEW SECONDARY worked example: Dirichlet-Multinomial with star ratings
- Show that the "multiply and normalize" recipe is structurally identical for both
- Sequential updating for both quantities

**Section 4 (Conjugate Priors) — MAJOR REWRITE:**
- Present ALL FIVE conjugate families in parallel, one per quantity
- Each family: prior form, likelihood, update rule, worked example with headphones data
- The "five-quantity table" reappears with filled-in posterior parameters
- Prior sensitivity: show how different priors change each posterior
- "When conjugacy breaks down" preview: Dirichlet-Multinomial ignores star ordering

**Section 5 (Credible Intervals):**
- Credible intervals computed for return rate AND star rating distribution
- Bayes factor: "is the return rate below 15%?"
- Posterior predictive: "what rating will the next buyer give?"
- Decision: "should you buy?" combining evidence from multiple quantities

**Section 6 (Computational Methods):**
- MOTIVATION CHANGE: The Dirichlet-Multinomial ignores ordering. An ordinal model (cumulative link) respects it but has no conjugate posterior → need MCMC
- PyMC model for ordinal star ratings or price-dependent return rate
- Compare conjugate (fast but approximate) vs MCMC (general but slow) posteriors

**Section 7 (Hierarchical):**
- Pool return rates across 8 headphones products
- Partial pooling: Sony (500 ratings) barely moves, new brand (8 ratings) shrinks toward group mean

**Section 99 (Closing):**
- Takeaways reference all five quantities
- Retrieval questions use the headphones example
- Common mistake: "conflating observation space with parameter space"

---

## Technical Precision Requirements

The user cares deeply about technical precision. Several specific requirements emerged from the conversation:

### 1. The "Category Error" Framing for Frequentist Limitations

When explaining why the frequentist cannot compute P(θ > 0.70):
- Do NOT say "the probability is either 0 or 1; you just don't know which" (this is WRONG)
- DO say: "θ is a fixed constant, so 'θ > 0.70' is a deterministic fact (like '3 < 5'), not a random event. Writing P(θ > 0.70) is a category error: there is no random variable for a probability to act on."

### 2. The CI Procedure/Realization Distinction

When comparing CIs and credible intervals, distinguish THREE objects:
- The CI **procedure** h_α(·): a function from samples to intervals
- The CI itself: a pair of **random variables** (θ̂_L, θ̂_H) with P(θ̂_L ≤ θ ≤ θ̂_H) ≥ 0.95 (probability over the sample)
- A CI **realization**: specific numbers (e.g., 0.548 to 0.889) that either contain θ or don't — no probability attaches

### 3. Bayesian Probability Statements

When explaining why the Bayesian CAN compute P(θ > 0.70 | data):
- Always state WHY: "because the Bayesian treats θ as a random variable with a posterior distribution, P(θ > 0.70 | data) is a well-defined probability: the integral of the posterior density from 0.70 to 1"

### 4. Star Ratings Are 1-5 Integers

Individual Amazon ratings are integers {1, 2, 3, 4, 5}, NOT 0.5 increments. The displayed average is continuous (e.g., 3.8). Be precise about this distinction.

### 5. No Binarization of Star Ratings

Do NOT convert star ratings to "positive" (4-5) vs "negative" (1-3). The whole point of the multi-quantity approach is to show star ratings as their own data type (ordinal/categorical) with their own conjugate family (Dirichlet-Multinomial). The return rate handles the binary case.

---

## Sources Available (All 34 Verified on Disk — Zero Failures)

All sources are in `/Users/adivekar/workplace/AI-Learning-Gems/sources/`. Every source listed below has been downloaded, verified non-empty, and confirmed to contain readable content (.md, .tex, or .txt with >500 characters).

### Core Bayesian Theory Sources
| # | Source | Path |
|---|---|---|
| 1 | Sosa et al. "The Bayesian Way" (arXiv 2025, 56pp) | `sources/arxiv-2512.05883/` |
| 2 | Gelman et al. BDA3 (2013 textbook, PDF) | `sources/users.aalto.fi/` |
| 3 | MIT 18.05 Bayesian Lectures | `sources/ocw.mit.edu/18-05-spring-2022/` |
| 4 | Probabilitycourse.com Ch9 (Bayesian Inference) | `sources/probabilitycourse.com/chapter9/` |
| 5 | Probabilitycourse.com Ch8 (Frequentist Inference) | `sources/probabilitycourse.com/chapter8/` |

### Conjugate Prior / Multi-Quantity Sources (NEW for v2)
| # | Source | Path |
|---|---|---|
| 6 | Wikipedia Conjugate Prior (complete table) | `sources/en.wikipedia.org/wiki/Conjugate_prior/` |
| 7 | Evan Miller: Ranking Items with Star Ratings (Dirichlet) | `sources/evanmiller.org/ranking-items-with-star-ratings/` |
| 8 | Evan Miller: Bayesian Average Ratings | `sources/evanmiller.org/bayesian-average-ratings/` |
| 9 | Stephen Tu: Dirichlet Conjugate Prior (PDF) | `sources/stephentu.github.io/writeups/` |
| 10 | Cook: Compendium of Conjugate Priors (47pp PDF) | `sources/johndcook.com/` |
| 11 | Bayes Rules Ch5: Conjugate Families | `sources/bayesrulesbook.com/chapter-5/` |
| 12 | District Data Labs: Bayesian Star Rating Means | `sources/districtdatalabs.silvrback.com/` |

### Blog / Tutorial Sources
| # | Source | Path |
|---|---|---|
| 13 | Gundersen: Conjugacy in Bayesian Inference | `sources/gregorygundersen.com/blog/2019/` |
| 14 | Gundersen: Hamiltonian Monte Carlo | `sources/gregorygundersen.com/blog/2020/` |
| 15 | Gundersen: Probabilistic ML | `sources/gregorygundersen.com/blog/2018/` |
| 16 | VanderPlas: Frequentism and Bayesianism | `sources/jakevdp.github.io/` |
| 17 | Eric Jang: Variational Bayes | `sources/blog.evjang.com/` |
| 18 | Bayesian Spectacles: Misconceptions | `sources/bayesianspectacles.org/` |
| 19 | StatsWithR: Freq vs Bayes Comparison | `sources/statswithr.com/` |
| 20 | Douglas Yao: Freq vs Bayesian | `sources/douglasyao.github.io/` |
| 21 | Cforssen: Bayesian Coin Tossing Demo | `sources/cforssen.gitlab.io/` |

### Interval / Testing Sources
| # | Source | Path |
|---|---|---|
| 22 | Wikipedia: Credible Interval | `sources/en.wikipedia.org/wiki/Credible_interval/` |
| 23 | Statsig: Credible vs Confidence Intervals | `sources/statsig.com/` |
| 24 | Gelman: Jeffreys and Philosophy of Statistics (PDF) | `sources/stat.columbia.edu/gelman/research/published/` |

### Computational / PyMC Sources
| # | Source | Path |
|---|---|---|
| 25 | Gelman: Bayesian Workflow (2020, PDF) | `sources/stat.columbia.edu/gelman/research/unpublished/` |
| 26 | PyMC: GLM Linear Regression | `sources/pymc.io/GLM_linear/` |
| 27 | PyMC: Hierarchical Partial Pooling | `sources/pymc.io/hierarchical_partial_pooling/` |
| 28 | PyMC: Multilevel Modeling | `sources/pymc.io/projects/examples/en/latest/case_studies/multilevel_modeling/` |
| 29 | Stan: Posterior Predictive Checks | `sources/mc-stan.org/` |
| 30 | Statology: First Bayesian Model | `sources/statology.org/` |
| 31 | Think Bayes 2e (Downey) | `sources/allendowney.github.io/ThinkBayes2/` |
| 32 | Strimmer: Choosing Priors | `sources/strimmerlab.github.io/` |

### Reader's Own Notes
| # | Source | Path |
|---|---|---|
| 33 | User's frequentist notes (statistics-1) | `sources/statistics-1/` |
| 34 | User's statistical models notes (statistics-2) | `sources/statistics-2/` |

---

## MANDATORY FIRST STEP: Read ALL Unread Sources (Do This Before Writing ANYTHING)

**All 7 PDFs have been OCR'd and extracted to markdown.** Every source is now readable. But many sources were NEVER READ by any previous agent. The current chapter was written from only ~7 of the 34 sources. The rest were either not downloaded, not extracted, or silently ignored.

**You MUST read every source listed below before writing any section that references it. This is the single most important instruction in this handoff.**

### Sources for the NEW multi-quantity approach (never read by any agent)

These are entirely new sources downloaded for the five-quantity parallel approach. No agent has ever read them.

| # | Source | File to Read | Size | Needed For |
|---|---|---|---|---|
| 11 | Evan Miller Star Ratings | `sources/evanmiller.org/ranking-items-with-star-ratings/content.md` | 21KB | S3 (Dirichlet-Multinomial), S4, S5 |
| 12 | Evan Miller Bayesian Average | `sources/evanmiller.org/bayesian-average-ratings/content.md` | 14KB | S3, S4 |
| 13 | **Stephen Tu Dirichlet** | `sources/stephentu.github.io/writeups/dirichlet-conjugate-prior.md` | 11KB | **S3 (CRITICAL: Dirichlet-Multinomial derivation)** |
| 14 | Cook Compendium | `sources/johndcook.com/CompendiumOfConjugatePriors.md` | 134KB | S4 (all 5 conjugate families) |
| 16 | Bayes Rules Ch5 | `sources/bayesrulesbook.com/chapter-5/content.md` | 90KB | S4 (Gamma-Poisson) |
| 19 | District Data Labs | `sources/districtdatalabs.silvrback.com/.../content.md` | 41KB | S3-S4 (star rating estimation) |

### Previously-undownloaded sources, now OCR'd (never read)

| # | Source | File to Read | Size | Needed For |
|---|---|---|---|---|
| 2 | **Gelman BDA3** | `sources/users.aalto.fi/BDA3/BDA3.md` | 2.3MB | S2, S4, **S7 (Ch5 hierarchical)** — read Ch1-5 |
| 3a | MIT Lec 12 | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec12/lec12-bayesian-updating.md` | 10KB | S3 |
| 3b | MIT Lec 15 | `sources/ocw.mit.edu/18-05-spring-2022/bayesian-lectures/lec15/lec15-conjugate-priors.md` | 11KB | S4 |
| 15 | Eric Jang VI | `sources/blog.evjang.com/.../content.md` | 64KB | S6 (ELBO, VI) |
| 17 | Gelman Jeffreys | `sources/stat.columbia.edu/gelman/research/published/jeffreys.md` | 13KB | S4 (flat priors) |
| 18 | Gelman Workflow | `sources/stat.columbia.edu/gelman/research/unpublished/Bayesian_Workflow_article.md` | 232KB | S6 (workflow) |
| 22 | Gundersen Probabilistic ML | `sources/gregorygundersen.com/blog/2018/.../content.md` | 19KB | S2 |
| 25 | Statsig CI comparison | `sources/statsig.com/.../content.md` | 34KB | S5 |
| 26 | Wikipedia Credible Interval | `sources/en.wikipedia.org/wiki/Credible_interval/content.md` | 330KB | S5 |
| 29 | PyMC Multilevel | `sources/pymc.io/projects/examples/en/latest/.../content.md` | 18KB | S7 |
| 30 | Stan Posterior Predictive | `sources/mc-stan.org/.../content.md` | 32KB | S6 |

### Broken source (drop)

| # | Source | Action |
|---|---|---|
| 27 | Strimmer Choosing Priors | 404 page. Use Gelman Jeffreys (#17) + Bayes Rules Ch5 (#16) instead. |

### Sources to re-verify (were read before, chapter is being restructured)

| # | Source | File to Read | Size |
|---|---|---|---|
| 1 | Sosa et al. arXiv | `sources/arxiv-2512.05883/main.tex` | 154KB |
| 4 | Gundersen Conjugacy | `sources/gregorygundersen.com/blog/2019/03/16/conjugacy/content.md` | 15KB |
| 5 | Gundersen HMC | `sources/gregorygundersen.com/blog/2020/07/05/hmc/hmc.md` | 24KB |
| 6 | VanderPlas | `sources/jakevdp.github.io/.../content.md` | 130KB |
| 7 | Probabilitycourse Ch9 | `sources/probabilitycourse.com/chapter9/` (multiple files) | 15KB |
| 9 | Bayesian Spectacles | `sources/bayesianspectacles.org/.../content.md` | 13KB |
| 10 | Wikipedia Conjugate Prior | `sources/en.wikipedia.org/wiki/Conjugate_prior/content.md` | 652KB |

**Total: 24 sources that must be read before writing. The per-section source scouring protocol in the write-textbook-chapter workflow handles this, but you must not skip any source.**

---

## What to Preserve from the Existing Chapter

The existing chapter has good bones. Preserve:
- The conversational, engaging tone (addresses reader as "you")
- The precise frequentist/Bayesian distinction language (category error framing)
- The CI procedure/realization/random-variable distinction
- All correct mathematical derivations (Beta-Binomial update, posterior mean formula, etc.)
- The D2 diagrams and hvplot visualizations (update content but keep the format)
- Exercise blocks (update content to reference the five quantities)
- The "problem-connector" sentences at the start of each section that tie back to the running example

---

## Execution Strategy

Given the scope of changes, I recommend:

1. **Read all existing sections first** (understand what's there)
2. **Read TEXTBOOK-PLAN-v2.md** (understand what needs to change)
3. **Read the key new sources** (especially Evan Miller star ratings, Wikipedia conjugate table, Bayes Rules Ch5)
4. **Rewrite sections incrementally**, starting with the Introduction (which sets up the five-quantity framing) and proceeding through each body section
5. **For each section:** read the relevant sources per the plan, then write

The biggest changes are in:
- **S1 (Introduction):** New five-quantity hook and notation table
- **S3 (Updating):** Add Dirichlet-Multinomial worked example alongside Beta-Binomial
- **S4 (Conjugate Priors):** MAJOR rewrite to present all five families in parallel
- **S6 (MCMC):** New motivation: ordinal model for star ratings (respecting ordering) needs MCMC

The smallest changes are in:
- **S2 (Bayesian Leap):** Add rows to the comparison table for each data type
- **S5 (Credible Intervals):** Add credible interval for star rating distribution
- **S7 (Hierarchical):** Mostly fine as-is (already uses multi-product framing)
- **S99 (Closing):** Update takeaways and questions to reference all five quantities

---

## Quality Standards

Follow ALL rules in `writing-style.md`, `quarto-conventions.md`, and `exercise-syntax.md`. Key reminders:
- No em dashes (zero)
- No banned AI words (delve, tapestry, leverage, etc.)
- Every displayed equation has a lead-in phrase and punctuation
- Every new symbol defined immediately with "where"
- Bold used sparingly (1-2 per section)
- Sentences vary in length (Gary Provost principle)
- Mathematical paragraphs use simple English; narrative paragraphs use precise word choice
- Every inline citation is a clickable hyperlink
- Image paths are relative to the INDEX file, not the section file
