# TEXTBOOK-PLAN: Expected Click-Through Rate (ECTR) Prediction with Calibrated Transformer Models

## User Query
> I have a train on ECTR that is an expected click through rate model where basically for a query and document pair in search, I have to predict the value of the click through rate. For a new query-document pair, I want to know the click-through rate. I have a lot of click data but how do I convert that into a CTR prediction? I can use a BERT-like model with query and document concatenated with CLS token to predict a binary class. But how do I make the value calibrated? How do I make the probability truly reflect the click-through rate? What are different ways to do this? I need the probability to be calibrated and realistic for CTR because it's important. I have millions of positive query-document pairs from historical logs, and can trivially create negatives including hard negatives. How do I train these models and do calibration so the probability score is really good? Or is there a different approach using BERT transformers? Also, what features should I use? I can pass product category and other document info. Assume I have all information about the document (Amazon product). What are useful features people have used?

**Topic:** Expected Click-Through Rate (ECTR) Prediction: From Click Logs to Calibrated Probabilities Using Transformer Models
**Prior Knowledge:** BERT/transformer architecture basics, binary classification, basic ML concepts
**Learning Goals:** (1) Understand how to formulate CTR prediction from raw click data, (2) Learn model architectures for combining text with non-text features, (3) Master calibration techniques for producing well-calibrated probabilities, (4) Learn feature engineering for product search, (5) Understand position bias and its mitigation, (6) Know training data construction strategies
**Target Depth:** GRADUATE
**Output Folder:** `Search/Expected Click-Through Rate Prediction`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (30 sources)"}

| # | Source | Type | Local Path | Summary |
|---|--------|------|------------|---------|
| 1 | [On Calibration of Modern Neural Networks (Guo et al., 2017)](https://arxiv.org/abs/1706.04599) | [ACADEMIC] | `sources/arxiv-1706.04599/` | KEY: Foundational calibration paper. ECE, reliability diagrams. Temperature scaling. |
| 2 | [BERT4CTR (Wang et al., KDD 2023)](https://arxiv.org/abs/2308.11527) | [ACADEMIC] | `sources/arxiv-2308.11527/` | KEY: Uni-Attention for BERT + non-textual features. Two-step joint training. 190M pairs, 90 features. |
| 3 | [CTR-BERT (Amazon, NeurIPS 2021)](https://neurips2021-nlp.github.io/papers/20/CameraReady/camera_ready_final.pdf) | [ACADEMIC] | `sources/neurips2021-nlp.github.io/papers/20/ctr-bert.pdf` | KEY: Twin-BERT + late fusion MLP. 1.5B→70M knowledge distillation. |
| 4 | [DeepFM (Guo et al., 2017)](https://arxiv.org/abs/1703.04247) | [ACADEMIC] | `sources/arxiv-1703.04247/` | KEY: FM+DNN for automatic low+high order feature interactions. |
| 5 | [CTRL (Li et al., Huawei 2023)](https://arxiv.org/abs/2306.02841) | [ACADEMIC] | `sources/arxiv-2306.02841/` | KEY: Contrastive alignment of collaborative + language model. Two-stage > end-to-end. Gradient mismatch. |
| 6 | [DLRM (Naumov et al., Meta 2019)](https://arxiv.org/abs/1906.00091) | [ACADEMIC] | `sources/arxiv-1906.00091/` | KEY: Foundational embedding-based CTR architecture. Interaction layers, model parallelism. |
| 7 | [Practical Lessons from Predicting Clicks at Facebook (ADKDD 2014)](https://quinonero.net/Publications/predicting-clicks-facebook.pdf) | [ACADEMIC] | `sources/quinonero.net/Publications/predicting-clicks-facebook.pdf` | **MUST-READ**: Downsampling recalibration formula. Normalized Entropy metric. Boosted trees + LR. Data freshness. |
| 8 | [Scale Calibration of Deep Ranking Models (Google, KDD 2022)](https://marc.najork.org/papers/kdd2022-calrank.pdf) | [ACADEMIC] | `sources/marc.najork.org/papers/kdd2022-calrank.pdf` | KEY: Calibrated ranking losses (multi-objective, reference-based). Translation-invariant losses cause score drift. |
| 9 | [DCAF-BERT (Amazon)](https://assets.amazon.science/db/32/647b9dba4f7e8740780d63b90aa5/dcaf-bert-a-distilled-cachable-adaptable-factorized-model-for-improved-ads-ctr-prediction.pdf) | [ACADEMIC] | `sources/assets.amazon.science/dcaf-bert/dcaf-bert.pdf` | KEY: Factorized BERT with cacheable towers, adaptation layers for non-textual features. |
| 10 | [adPredictor: Bayesian CTR (Graepel et al., ICML 2010)](https://quinonero.net/Publications/AdPredictorICML2010-final.pdf) | [ACADEMIC] | `sources/quinonero.net/Publications/AdPredictorICML2010.pdf` | RELEVANT: Bayesian online learning with per-feature uncertainty for CTR. |
| 11 | [Cold Start via Empirical Bayes (Amazon)](https://assets.amazon.science/b5/2f/a9d9581d4f8eab473a4ab4a8ad35/addressing-cold-start-in-product-search-via-empirical-bayes.pdf) | [ACADEMIC] | `sources/assets.amazon.science/cold-start/cold-start-empirical-bayes.pdf` | KEY: Beta-Binomial smoothed CTR for cold-start products. |
| 12 | [Predicting Clicks for New Ads (Yahoo Labs)](https://www.cs.cmu.edu/~xuerui/papers/ctr.pdf) | [ACADEMIC] | `sources/cs.cmu.edu/xuerui/papers/ctr.pdf` | RELEVANT: CTR estimation for new ads, feature engineering. |
| 13 | [Nudging Click Models for Position Bias (Amazon)](https://assets.amazon.science/2b/8e/4040c50644279fdaaedfd134cf79/nudging-neural-click-prediction-models-to-pay-attention-to-position.pdf) | [ACADEMIC] | `sources/amazon.science/position-bias/nudging-position-bias.pdf` | KEY: Position bias in CTR, debiasing techniques at Amazon. |
| 14 | [MDPI: Deep Learning CTR Survey (2025)](https://www.mdpi.com/2079-9292/14/18/3734) | [ACADEMIC] | `sources/mdpi.com/2079-9292/14/18/3734/survey.pdf` | RELEVANT: Comprehensive survey of CTR architectures. |
| 15 | [BERT CTR: Multimodal Fusion (ethen8181 blog)](http://ethen8181.github.io/machine-learning/deep_learning/tabular/bert_ctr/bert_ctr.html) | [TUTORIAL] | `sources/ethen8181.github.io/.../bert_ctr/bert_ctr.md` | **MUST-READ**: Full PyTorch code. Late fusion. Two-stage training. Differential LR. |
| 16 | [AutoGluon Multimodal Text Tutorial](https://auto.gluon.ai/0.4.0/tutorials/text_prediction/multimodal_text.html) | [TUTORIAL] | `sources/auto.gluon.ai/.../multimodal_text.md` | RELEVANT: Late fusion architecture diagram. Differential LR config. |
| 17 | [How to Measure and Mitigate Position Bias (Eugene Yan)](https://eugeneyan.com/writing/position-bias/) | [TUTORIAL] | `sources/eugeneyan.com/writing/position-bias/position-bias.md` | KEY: RandTopN, Boltzmann exploration, IPW, position-as-feature. |
| 18 | [Calibrating CTR with Transfer Learning (Instacart)](https://tech.instacart.com/calibrating-ctr-prediction-with-transfer-learning-in-instacart-ads-99c978a28d53) | [TUTORIAL] | N/A (Medium paywall) | KEY: Transfer learning outperforms Platt/isotonic for calibration. |
| 19 | [scikit-learn Calibration Guide](https://scikit-learn.org/stable/modules/calibration.html) | [TUTORIAL] | N/A | KEY: Practical API for Platt/isotonic. Reliability diagrams. |
| 20 | [Rules of ML: Rule 36 (Google)](https://developers.google.com/machine-learning/guides/rules-of-ml#rule_36_avoid_feedback_loops_with_positional_features) | [TUTORIAL] | N/A | KEY: Position-as-feature during training, constant at inference. |
| 21 | [Focal Loss (Lin et al., 2017)](https://arxiv.org/abs/1708.02002) | [ACADEMIC] | N/A | RELEVANT: Focal loss for class imbalance. |
| 22 | [Label Smoothing (Müller et al., NeurIPS 2019)](https://proceedings.neurips.cc/paper/2019/hash/f1748d6b0fd9d439f71450117eba2725-Abstract.html) | [ACADEMIC] | N/A | RELEVANT: Label smoothing improves calibration during training. |

:::

---

## Chapter Overview

**Total sections:** 6 (plus closing)
**Estimated total length:** 9,000–12,000 words
**Running example:** An ML engineer named Priya at an e-commerce company (loosely modeled on Amazon) tasked with building an ECTR model for product search. She starts with raw click logs, iterates through increasingly sophisticated model architectures and calibration strategies, and ultimately deploys a calibrated system that accurately predicts click probability for ad bidding and ranking.

### Hook & Running Example Design

Priya has just been handed a dataset: 50 million search sessions from the last quarter. Each row records a user query ("wireless noise-canceling headphones"), a product that was shown, and a binary label — clicked or not clicked. Her manager tells her: "Build me a model that predicts the probability a user will click on a product. But I don't want just any probability — a 15% prediction had better mean that 15 out of 100 users actually click. Our entire ad auction depends on this number being *right*."

She quickly trains a BERT-based cross-encoder. The AUC looks great — 0.82. She deploys it. Within a week, the ads team is furious: the predicted probabilities are consistently 2–3× too high, the auction is overvaluing low-quality ads, and revenue is down. The model's *ranking* is fine but its *probabilities* are lies. Thus begins Priya's journey into the world of calibration — a deceptively simple concept that turns out to be one of the most critical (and most neglected) aspects of production ML systems.

Through the chapter, we follow Priya as she discovers that (a) her training data's negative sampling strategy silently corrupted probabilities, (b) her BERT model is inherently overconfident due to depth and complexity, (c) position bias in her logs makes items look more or less popular than they truly are, and (d) there are elegant post-hoc and in-training solutions that can fix all of this.

**Hook Image:** The reliability diagram from Guo et al. (2017) comparing a well-calibrated LeNet with a poorly-calibrated ResNet — showing the dramatic gap between predicted confidence and actual accuracy in modern deep networks. This image bridges the intuition of "what calibration means" with the core technical challenge. (Source: `sources/arxiv-1706.04599/` if downloaded, otherwise reproduced from the paper's Figure 1.)

---

## Section Plan

### Section 1: The CTR Prediction Problem — From Click Logs to Binary Classification {#sec-problem-formulation}

**File:** `_01-problem-formulation.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should understand the full pipeline from raw click logs to a binary classification task, including how to define positive/negative labels, what "expected CTR" actually means mathematically, and why naive approaches produce uncalibrated models.
**Running example application:** Priya explores her raw click log data. She discovers the 0.8% positive rate (extreme class imbalance), realizes she needs to define what counts as a "negative" (impression without click? or never-shown pair?), and formulates her first model: P(click | query, document).

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------------|-----------------|
| Facebook ADKDD 2014 | Full paper | Downsampling recalibration formula, Normalized Entropy metric, data freshness, online joiner |
| adPredictor (ICML 2010) | Introduction | Bayesian CTR foundations, per-feature uncertainty |
| Yahoo Labs CTR paper | Introduction | CTR estimation for new ads |
| Instacart CTR blog | Introduction | Definition of calibration, what pCTR means |
| scikit-learn calibration guide | Introduction | Formal definition of calibration |

**Content outline:**
1. **What is CTR prediction?** — Definition as a conditional probability estimation problem, P(click | query, document, context). Distinction between pointwise CTR (per-impression) vs. aggregate CTR.
2. **From click logs to training data** — How to construct (query, document, label) triples from historical impression logs. The tension between "impressions without clicks" as true negatives vs. "unseen documents" as candidate negatives.
3. **Why this is harder than standard binary classification** — The extreme class imbalance (typical CTR: 0.5%–5% for product search). The crucial difference between good *ranking* (AUC) and good *probability estimation* (calibration/log loss). **Normalized Entropy** (NE) from Facebook ADKDD as a scale-invariant metric: $NE = \frac{\text{Log Loss}}{-(p \log p + (1-p)\log(1-p))}$ where p is the background CTR.
4. **The calibration contract** — Formal definition: a model f is calibrated if P(Y=1 | f(X)=p) = p for all p ∈ [0,1]. Why this matters for downstream applications (ad auctions: expected_revenue = pCTR × bid; ranking fusion with other signals; threshold-based decisions). Historical perspective: from logistic regression (inherently calibrated) through boosted trees + LR (Facebook 2014) to deep networks (systematically miscalibrated).

**Key equations:**
- $\text{CTR} = P(\text{click} | q, d, c) = \frac{\text{Number of clicks for } (q, d)}{\text{Number of impressions for } (q, d)}$
- Calibration definition: $P(Y=1 \mid \hat{p}(X) = p) = p, \quad \forall p \in [0,1]$
- Expected Calibration Error: $\text{ECE} = \sum_{m=1}^{M} \frac{|B_m|}{n} \left| \text{acc}(B_m) - \text{conf}(B_m) \right|$

**Visualizations:**
- Reliability diagram comparing a calibrated vs. uncalibrated model (from Guo et al.)
- Example of raw click log data → training examples transformation (table/diagram)

**Self-explanation prompts:**
1. "Why might a model with AUC=0.85 still produce terrible probability estimates? Can you construct a scenario where this happens?"
2. "If your training data has 1% positive rate and you randomly undersample negatives to 50/50, what happens to raw model probabilities?"

---

### Section 2: Model Architectures — From Cross-Encoders to Multi-Modal Transformers {#sec-model-architectures}

**File:** `_02-model-architectures.qmd`
**Estimated length:** 1,800–2,200 words
**Goal:** The reader should understand the spectrum of model architectures for CTR prediction, from simple cross-encoders to sophisticated multi-modal frameworks that combine text with tabular features.
**Running example application:** Priya starts with a simple BERT cross-encoder (query + [SEP] + title → [CLS] → sigmoid), discovers it ignores categorical features like brand and category, then evolves to multi-modal architectures.

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------------|-----------------|
| BERT4CTR paper (2308.11527) | Sections 2–3 | Uni-Attention mechanism, architecture diagram, two-step joint training |
| CTR-BERT paper (NeurIPS 2021) | Full paper | Twin BERT encoders, late fusion, knowledge distillation |
| DCAF-BERT paper (Amazon) | Full paper | Factorized BERT with cacheable towers, adaptation layers |
| CTRL paper (2306.02841) | Sections 2–4 | Contrastive alignment, two-stage training > end-to-end, gradient mismatch |
| DLRM paper (1906.00091) | Model section | Foundational embedding architecture, interaction layers |
| DeepFM paper (1703.04247) | Sections 2–3 | FM + DNN architecture, feature embedding |
| ethen8181 blog | Full post | PyTorch implementation of BERT + tabular late fusion |
| AutoGluon tutorial | Architecture diagram | Late fusion: text backbone + categorical tower + numerical tower → aggregator |

**Content outline:**
1. **The naive cross-encoder** — Query + [SEP] + Document → BERT → [CLS] → Linear → Sigmoid. This is the simplest BERT-based CTR model. It handles text beautifully but completely ignores non-textual features (price, rating, category, brand). The architecture diagram, input format with special tokens, and why the [CLS] representation captures query-document interaction.
2. **Adding non-textual features: three paradigms** — (a) Late fusion / ensemble: BERT processes text separately, MLP processes features separately, outputs are concatenated and fed to a final layer (ethen8181 blog has full PyTorch code, AutoGluon tutorial has clean architecture diagram). Simple but limited cross-information. (b) Token-ization: Convert each feature into a pseudo-token and prepend to the text sequence. Rich interaction but expensive (more tokens = O(n²) attention). (c) Uni-Attention (BERT4CTR): Non-textual features attend to textual tokens but not vice versa (asymmetric attention). Best of both worlds — rich interaction, lower cost.
3. **The CTR-BERT / DCAF-BERT approach** — Amazon's production systems: twin BERT-like encoders for query and product text (factorized for caching), late fusion with tabular features, knowledge distillation from a 1.5B-parameter teacher. DCAF-BERT adds adaptation layers for non-textual features and cacheable query/document towers. Why factorization enables pre-computation of product embeddings for low-latency serving.
4. **Two-stage training: why it beats end-to-end** — CTRL's finding (Huawei): training collaborative model and language model separately with contrastive alignment outperforms joint end-to-end training. Root cause: gradient magnitude mismatch between the two modalities (language model gradients dominate). Practical recipe: (a) freeze BERT, train tabular head. (b) Unfreeze, fine-tune with differential learning rates (ethen8181: BERT lr=1e-4, head lr=1e-3).
5. **Foundational deep CTR models** — DLRM (Meta, 2019): embedding tables for categorical features → dot-product interactions → MLP → prediction. The foundational architecture all modern CTR systems extend. DeepFM (FM + DNN, automatic low+high order feature interactions), DCN (explicit feature crossing), Wide & Deep (memorization + generalization). When to use a BERT-based approach vs. these simpler architectures. The key insight: BERT excels when *textual understanding* is the bottleneck; DeepFM/DCN/DLRM excel when *feature interactions* are the bottleneck.
6. **Practical architecture decision tree** — When to use each architecture based on data characteristics, latency requirements, and feature availability.

**Key equations:**
- Cross-encoder: $\hat{y} = \sigma(W \cdot \text{BERT}([CLS] \, q \, [SEP] \, d \, [SEP]) + b)$
- DLRM interaction: $\hat{y} = \sigma(W_{\text{top}} \cdot [\text{concat}(\text{dense\_out}, \text{pairwise\_dot}(e_1, \ldots, e_k, \text{dense\_out}))])$
- DeepFM: $\hat{y} = \sigma(y_{FM} + y_{DNN})$ where $y_{FM} = \langle w, x \rangle + \sum_{i=1}^{n}\sum_{j=i+1}^{n} \langle v_i, v_j \rangle x_i x_j$
- Knowledge distillation: $\mathcal{L}_{KD} = \alpha \cdot \mathcal{L}_{CE}(y, \hat{y}_s) + (1-\alpha) \cdot \text{KL}(\hat{y}_t \| \hat{y}_s)$
- CTRL contrastive loss: $\mathcal{L}_{\text{align}} = -\log \frac{\exp(\text{sim}(z_c, z_l) / \tau)}{\sum_j \exp(\text{sim}(z_c, z_{l,j}) / \tau)}$

**Visualizations:**
- Architecture comparison diagram: naive cross-encoder vs. late fusion vs. BERT4CTR Uni-Attention vs. CTR-BERT vs. DLRM
- D2 flow diagram showing data flow from features → model → prediction
- ethen8181 blog's late fusion architecture image (`sources/ethen8181.github.io/.../images/bert_ctr.png`)

**Self-explanation prompts:**
1. "Why can't you simply concatenate product price and rating as text tokens ('$29.99') into the BERT input? What would go wrong?"
2. "CTR-BERT uses two separate BERT encoders for query and product. What key advantage does this give for production serving?"
3. "CTRL shows that training the collaborative model and language model end-to-end performs worse than two-stage training. What is the root cause?"

---

### Section 3: Training Data Construction — Negatives, Sampling, and Bias {#sec-training-data}

**File:** `_03-training-data.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should understand the critical decisions in constructing training data from click logs: what constitutes a negative, how to create hard negatives, how negative sampling affects calibration, and how to account for position bias.
**Running example application:** Priya realizes her model's miscalibration stems partly from her 50/50 negative downsampling. She discovers the correction formula, implements hard negative mining using BM25, and adds position debiasing.

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------------|-----------------|
| Facebook ADKDD 2014 | Sections 3–4 | Downsampling recalibration formula with derivation, data freshness effects |
| Eugene Yan position bias blog | Full post | RandTopN, Boltzmann, position-as-feature |
| Amazon Position Bias paper | Full paper | Position bias debiasing at Amazon scale, PAL implementation |
| Google Rules of ML Rule 36 | Rule 36 | Position feature at training, constant at inference |

**Content outline:**
1. **Types of negatives for CTR prediction** — (a) *Impression negatives*: shown but not clicked. These are "easy" and represent the natural distribution. (b) *Random negatives*: randomly sampled documents never shown for this query. Very easy for the model. (c) *Hard negatives*: documents that are superficially similar but not clicked. BM25 top-k retrievals that weren't relevant, or other products in the same category. Why the choice of negatives fundamentally affects both model quality AND calibration.
2. **Negative downsampling and its calibration cost** — When you have 99% negatives and downsample to 50/50, the model learns P(click) ≈ 0.5 as the base rate. The correction formula: $p_{\text{true}} = \frac{p'}{p' + (1 - p') / w}$ where $w$ is the negative keep-rate. Worked example with Priya's data: actual base rate 1%, downsampled to 50/50 (w = 1/99), raw prediction p' = 0.6 → corrected p ≈ 0.015.
3. **Hard negative mining strategies** — BM25 negatives (lexically similar but irrelevant), in-batch negatives (other positive documents in the same training batch), model-mined negatives (using a previous model checkpoint to find confusing pairs). The risk of false negatives (a "negative" that's actually relevant but just wasn't clicked in this session).
4. **Position bias in click data** — Why higher-ranked items get more clicks regardless of relevance. Three debiasing approaches: (a) Inverse Propensity Weighting (IPW): weight each click by 1/P(examined | position). (b) Position-Aware Learning (PAL): include position as a training feature, set to position=1 at inference (Google's Rule 36). (c) Randomization: shuffle top results to measure true position bias. Trade-offs between debiasing quality and user experience impact.

**Key equations:**
- Downsampling correction: $p_{\text{calibrated}} = \frac{p'}{p' + \frac{1 - p'}{w}}$ where $w = \frac{|D_{\text{neg,kept}}|}{|D_{\text{neg,total}}|}$
- IPW loss: $\mathcal{L}_{IPW} = -\sum_i \frac{y_i}{\hat{P}(\text{exam} | \text{pos}_i)} \log \hat{y}_i$
- Examination probability: $P(\text{click} | q, d, \text{pos}) = P(\text{exam} | \text{pos}) \cdot P(\text{rel} | q, d)$

**Visualizations:**
- Diagram: impression log → training data pipeline (showing different negative strategies)
- Plot: CTR by position (exponential decay, illustrating position bias)
- Before/after reliability diagram: model trained with and without downsampling correction

**Self-explanation prompts:**
1. "You train a model on 50/50 sampled data and get p'=0.3 for a query-document pair. The original negative sampling rate was 5%. What is the corrected probability?"
2. "A colleague argues that position bias doesn't matter because 'we'll just retrain the model every week.' Why is this reasoning flawed?"

---

### Section 4: Calibration Techniques — Making Predictions Honest {#sec-calibration-techniques}

**File:** `_04-calibration-techniques.qmd`
**Estimated length:** 2,000–2,500 words
**Goal:** The reader should deeply understand the full taxonomy of calibration techniques: post-hoc methods (temperature scaling, Platt scaling, isotonic regression, histogram binning), in-training methods (label smoothing, focal loss), and hybrid approaches (transfer learning for calibration). They should know when to use each and why temperature scaling is the recommended default.
**Running example application:** Priya applies temperature scaling to her cross-encoder and sees ECE drop from 0.15 to 0.02. She then experiments with label smoothing during training, which prevents overconfidence in the first place.

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------------|-----------------|
| Guo et al. 2017 (1706.04599) | Sections 4–5 | Temperature scaling, comparison of methods, reliability diagrams, ECE |
| Google CalRank (KDD 2022) | Full paper | Calibrated ranking losses, multi-objective calibration, reference-based approach, translation-invariant loss pitfalls |
| Facebook ADKDD 2014 | Section 5 | Normalized Entropy, calibration monitoring |
| Instacart blog | Full post | Transfer learning for calibration, comparison with Platt/isotonic |
| scikit-learn calibration | CalibratedClassifierCV | Practical API for Platt/isotonic |
| Müller et al. 2019 (NeurIPS) | Abstract, Section 3 | Label smoothing improves calibration |

**Content outline:**
1. **Why are deep neural networks miscalibrated?** — Guo et al.'s key finding: modern networks (especially deeper, wider ones with batch norm) produce overconfident predictions. The reliability diagram as a diagnostic tool: plotting predicted confidence vs. actual accuracy in bins. ECE as the scalar summary. The paradox: *better accuracy often means worse calibration* in deep networks.
2. **Post-hoc calibration methods (The Big Four):**
   - **(a) Temperature Scaling** — Learn a single scalar T that divides logits before sigmoid: $\hat{p}_{\text{cal}} = \sigma(z / T)$. Preserves ranking. Astonishingly simple and effective. Optimize T on a held-out validation set by minimizing NLL. The temperature T > 1 "softens" overconfident predictions. Why this works: it doesn't need to change the model at all — just rescale its outputs.
   - **(b) Platt Scaling** — Fit a logistic regression A·z + B on top of model logits. Two parameters instead of one. More flexible than temperature scaling but risk of overfitting on small calibration sets. Originally designed for SVMs.
   - **(c) Isotonic Regression** — Non-parametric: learn a monotonically increasing step function that maps scores to probabilities. Most flexible, but can overfit. Needs ≥1000 calibration samples. Well-suited for large CTR datasets.
   - **(d) Histogram Binning** — Divide predicted scores into bins, replace each bin's predictions with the empirical positive rate. Simple but loses fine-grained information. Extension: Bayesian Binning into Quantiles (BBQ).
3. **In-training calibration methods:**
   - **(a) Label Smoothing** — Replace hard labels (0/1) with soft labels (ε, 1−ε). Prevents the model from learning extreme logits. Müller et al. showed it has a similar calibration effect to temperature scaling but acts during training. Typical ε = 0.05–0.1 for CTR.
   - **(b) Focal Loss** — $\mathcal{L}_{FL} = -\alpha (1-\hat{p})^\gamma \log(\hat{p})$. Down-weights easy examples, focuses training on hard cases. Addresses class imbalance AND can improve calibration by preventing the model from "wasting capacity" on trivially-classified negatives. Gamma typically 1–2 for CTR.
   - **(c) Mixup / Data Augmentation** — Creating interpolated training examples can improve calibration by regularizing the model's prediction surface.
4. **Calibrated ranking losses (Google CalRank)** — The CalRank paper shows that standard ranking losses (pairwise, listwise) are *translation-invariant* — they only care about relative order, not absolute scores, causing score drift. Three solutions: (a) Multi-objective: jointly optimize ranking + calibration losses. (b) Multi-task: separate output heads for ranking and calibration. (c) Reference-based: anchor scores to a calibrated reference model. Deployed in Google Sponsored Search.
5. **Transfer learning for calibration** — Instacart's finding: warm-starting from a previously trained model (transfer learning) improves calibration more than any post-hoc method. The intuition: a warm-started model has better-conditioned feature representations, producing less extreme logits. This can be combined with post-hoc methods.
6. **Practical calibration recipe** — Step-by-step: (1) Train with label smoothing (ε=0.1). (2) Apply downsampling correction if applicable. (3) Apply temperature scaling on held-out set. (4) Validate with reliability diagram and ECE. (5) Monitor calibration drift in production via Normalized Entropy (Facebook).

**Key equations:**
- Temperature scaling: $\hat{p}_{\text{cal}} = \sigma\left(\frac{z}{T}\right)$, optimize $T^* = \arg\min_T -\sum_i [y_i \log \sigma(z_i/T) + (1-y_i)\log(1-\sigma(z_i/T))]$
- Label smoothing: $y_{\text{smooth}} = (1 - \epsilon) \cdot y + \epsilon \cdot 0.5$ (for binary case)
- Focal loss: $\mathcal{L}_{FL} = -\alpha_t (1 - p_t)^\gamma \log(p_t)$, where $p_t = \hat{p}$ if $y=1$, else $1-\hat{p}$
- ECE: $\text{ECE} = \sum_{m=1}^{M} \frac{|B_m|}{n} \left| \text{acc}(B_m) - \text{conf}(B_m) \right|$
- Brier Score: $\text{BS} = \frac{1}{n} \sum_{i=1}^{n} (\hat{p}_i - y_i)^2$

**Visualizations:**
- Reliability diagrams: before and after temperature scaling (side-by-side)
- Comparison plot: ECE of different calibration methods across model types
- D2 diagram: calibration pipeline (Train → Hold-out split → Learn T → Evaluate)
- Temperature scaling visual: logit histogram before and after scaling

**Self-explanation prompts:**
1. "Temperature scaling with T=1.5 means the model becomes less confident. If original logit z=2.0 (→ p=0.88), what is the calibrated probability?"
2. "Why does label smoothing help with calibration? What would happen if you used too much smoothing (ε=0.5)?"

---

### Section 5: Feature Engineering — What Makes a Good ECTR Feature? {#sec-features}

**File:** `_05-features.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should understand the complete taxonomy of features used in production CTR models for product search, including textual features, categorical features, numerical features, behavioral features, and cross features.
**Running example application:** Priya enriches her model beyond just query text + product title. She adds product category, brand, price, star rating, historical CTR, and query-document match features, seeing significant AUC gains.

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------------|-----------------|
| CTR-BERT paper | Section 2 | Feature categorization for product ads |
| Feature engineering for search blog | Full post | BM25, semantic scores, counter features, categorical encoding |
| BERT4CTR paper | Section 3 | How non-textual features are encoded |

**Content outline:**
1. **Textual features** — (a) *Query text*: the raw user query. (b) *Product title*: the product's name/headline. (c) *Product description*: detailed text (often truncated for BERT). (d) *Query-document text overlap*: exact match fraction, BM25 score, Jaccard similarity. (e) *Semantic similarity*: cosine similarity of pre-computed query and document embeddings (from a separate bi-encoder).
2. **Categorical features** — (a) *Product category* (hierarchy: Electronics > Headphones > Wireless). Encoding strategies: one-hot (high cardinality problem), learned embeddings (the preferred approach in deep models), target encoding (mean CTR per category). (b) *Brand*: especially important for branded queries. (c) *Fulfillment type*: Prime, FBA, seller-fulfilled. (d) *Product condition*: new, renewed, used.
3. **Numerical features** — (a) *Price*: log-transformed, or price relative to category average. (b) *Star rating*: 1–5 scale. (c) *Number of reviews*: log-transformed. (d) *Age of product listing* (recency/freshness). (e) *Image quality score* (if available). (f) *Product popularity/sales rank*.
4. **Behavioral/historical features** — (a) *Historical CTR for this (query, product) pair* — the single most powerful feature, but has cold-start problem for new pairs. (b) *Query-level CTR*: average CTR across all products for this query. (c) *Product-level CTR*: average CTR for this product across all queries. (d) *User-level engagement*: past clicks/purchases in this category. (e) *Session context*: number of queries in session, time of day, device type.
5. **Cross features and feature interactions** — (a) *Query-category match*: does the query typically lead to this category? (b) *Price sensitivity by category*: electronics buyers are more price-sensitive than grocery buyers. (c) *Brand affinity*: does this user have a history of clicking on this brand? (d) How DeepFM/DCN learn these automatically vs. manual cross-feature engineering.
6. **Feature engineering best practices** — Start simple (text features + category), add complexity gradually. Log-transform skewed numericals. Use target encoding carefully (smoothed, with cross-validation). Avoid feature leakage (e.g., using post-click conversion data). Monitor feature drift over time.

**Key equations:**
- BM25: $\text{BM25}(q, d) = \sum_{t \in q} \text{IDF}(t) \cdot \frac{f(t, d) \cdot (k_1 + 1)}{f(t, d) + k_1 \cdot (1 - b + b \cdot |d|/\text{avgdl})}$
- Target encoding (smoothed): $\hat{\mu}_c = \frac{n_c \cdot \bar{y}_c + m \cdot \bar{y}_{\text{global}}}{n_c + m}$
- Feature embedding: $e_{\text{category}} = \text{Embedding}(\text{category\_id}) \in \mathbb{R}^d$

**Visualizations:**
- Feature taxonomy table with examples for Amazon product search
- Feature importance bar chart (typical ranking of feature types by AUC contribution)
- D2 diagram: feature pipeline from raw data → engineered features → model input

**Self-explanation prompts:**
1. "Historical CTR for a (query, product) pair is the best feature. But why can't you just use it directly as your prediction? What problems arise?"
2. "Why should you log-transform price and review count before feeding them into a neural network?"

---

### Section 6: Putting It All Together — Training, Serving, and Monitoring {#sec-deployment}

**File:** `_06-deployment.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should understand how to put together a complete ECTR system, from training pipeline to serving architecture to production monitoring.
**Running example application:** Priya deploys her calibrated model. She sets up daily calibration monitoring, implements online recalibration for distribution drift, and handles cold-start for new products.

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------------|-----------------|
| CTR-BERT paper | Section 5 | Online experiments, distribution shift, retraining |
| Facebook ADKDD 2014 | Sections 5–6 | Data freshness, online joiner, feature staleness |
| Cold Start via Empirical Bayes (Amazon) | Full paper | Beta-Binomial smoothed CTR for new products |
| Google CalRank (KDD 2022) | Section 5 | Deployed calibrated ranking in Google Sponsored Search |
| Instacart blog | Later sections | Production calibration monitoring, transfer learning schedules |

**Content outline:**
1. **The complete training pipeline** — Step-by-step recipe: (a) Collect impression logs with positions. (b) Construct training pairs (impression negatives + BM25 hard negatives at configurable ratio). (c) Apply negative downsampling with correction formula. (d) Train BERT cross-encoder or multi-modal model with label smoothing and focal loss. (e) Apply temperature scaling on held-out set. (f) Validate with reliability diagram + ECE + AUC + log loss. Note Facebook's finding: data freshness matters enormously — models trained on data >1 week old lose significant calibration.
2. **Evaluation metrics hierarchy** — Why you need BOTH ranking metrics AND calibration metrics: AUC-ROC (ranking quality), Log Loss (probability quality), ECE (calibration quality), Brier Score (overall probability accuracy), **Normalized Entropy** (Facebook: scale-invariant calibration metric, NE=1.0 means no better than background CTR). How to use all five together. Group-wise calibration: checking calibration within subgroups (by category, by query frequency, by position).
3. **Loss function selection** — When to use binary cross-entropy, when to use focal loss (extreme imbalance, γ=1–2), when to use CalRank calibrated ranking losses (when both ranking and calibration matter, e.g., ad auctions). The pragmatic recommendation: BCE with label smoothing for calibrated models; focal loss for highly imbalanced scenarios; CalRank multi-objective for systems needing both ranking and calibration.
4. **Serving architecture** — Two-stage retrieval: fast candidate retrieval (BM25 + ANN) followed by expensive cross-encoder re-ranking. Caching product embeddings for factorized models (DCAF-BERT's cacheable towers). Latency budgets: typical P99 < 50ms for re-ranking. Knowledge distillation to meet latency: large teacher model captures text understanding, small student model serves in production (CTR-BERT: 1.5B → 70M).
5. **Monitoring and maintenance** — Calibration drift: how model calibration degrades as user behavior and product catalog change. Daily calibration score tracking (Normalized Entropy + ECE on recent data). Online recalibration: periodically re-fitting the temperature T on fresh data without retraining the model. Retraining schedule: how often to retrain the full model (weekly/monthly) vs. just recalibrating (daily). Facebook's online joiner for real-time feature freshness.
6. **Handling cold-start** — Amazon's solution: **Beta-Binomial smoothed CTR** via empirical Bayes (Cold Start paper). $\hat{\text{CTR}}_c = \frac{\text{clicks}_c + \alpha}{\text{impressions}_c + \alpha + \beta}$ where (α, β) are estimated from the category-level Beta prior. New products with no historical CTR: fall back to category-level smoothed estimates and textual features. New queries: rely on semantic similarity to known queries. Warm-up strategies: initial impressions at random positions to collect unbiased data.

**Key equations:**
- Log Loss: $\text{LL} = -\frac{1}{n}\sum_{i=1}^{n} \left[y_i \log \hat{p}_i + (1-y_i)\log(1-\hat{p}_i)\right]$
- Brier Score: $\text{BS} = \frac{1}{n}\sum_{i=1}^{n}(\hat{p}_i - y_i)^2$
- Decomposition: $\text{BS} = \text{REL} - \text{RES} + \text{UNC}$ (reliability - resolution + uncertainty)
- Normalized Entropy: $\text{NE} = \frac{\text{LL}}{-(p\log p + (1-p)\log(1-p))}$ where $p$ = background CTR
- Beta-Binomial smooth: $\hat{\text{CTR}}_c = \frac{\text{clicks}_c + \alpha}{\text{impressions}_c + \alpha + \beta}$

**Visualizations:**
- End-to-end system architecture diagram (data pipeline → training → serving → monitoring)
- Calibration drift plot over time (ECE on daily batches)
- Decision flowchart: "Which architecture and calibration method should I use?"

**Self-explanation prompts:**
1. "You notice your model's ECE doubled over the last month but AUC stayed the same. What likely happened, and what's the cheapest fix?"
2. "Your manager wants a single number to evaluate your ECTR model. Which metric do you choose and why?"

---

## Source Image Catalog

**These are images from sources that should be embedded in the chapter.**

All arXiv LaTeX sources have been downloaded with figures. Key images:

| # | Source | Image Path | Caption | Section |
|---|--------|-----------|---------|--------|
| 1 | Guo et al. 1706.04599 | `sources/arxiv-1706.04599/fig/reliability-cifar100.pdf` | Reliability diagrams (calibrated vs uncalibrated) | §1, §4 |
| 2 | Guo et al. 1706.04599 | `sources/arxiv-1706.04599/fig/depth-confidence.pdf` | ECE vs model depth | §4 |
| 3 | BERT4CTR 2308.11527 | `sources/arxiv-2308.11527/GoodFigures/uni_attention_new.png` | Uni-Attention architecture | §2 |
| 4 | BERT4CTR 2308.11527 | `sources/arxiv-2308.11527/GoodFigures/jt_KDD_V8.png` | Two-step joint training | §2 |
| 5 | DeepFM 1703.04247 | `sources/arxiv-1703.04247/img/architecture-deepfm.png` | DeepFM architecture | §2 |
| 6 | DLRM 1906.00091 | `sources/arxiv-1906.00091/net.png` | DLRM architecture | §2 |
| 7 | ethen8181 blog | `sources/ethen8181.github.io/.../images/bert_ctr.png` | Late fusion: BERT + tabular → MLP | §2 |
| 8 | Eugene Yan blog | `sources/eugeneyan.com/writing/position-bias/images/` | Position bias decay curves | §3 |
| 9 | CTRL 2306.02841 | `sources/arxiv-2306.02841/figure/` | Contrastive alignment architecture | §2 |

**Note:** Guo figures are vector PDFs — need `brew install poppler` for conversion, or reproduce as plots.

**Priority order for visuals:**
1. **Source images from downloaded papers** — canonical, authoritative
2. **D2 diagrams** — for architecture comparisons, pipelines, decision trees
3. **Python/hvPlot** — for reliability diagrams, feature importance, calibration curves
4. **generate_image** — only for custom illustrations

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,000–1,500 words

**Content:**
1. **Key takeaways** (7 bullet points):
   - CTR prediction is a *probability estimation* problem, not just a ranking problem — calibration is non-negotiable for ad auctions and decision-making.
   - The negative sampling correction formula ($p = p'/(p' + (1-p')/w)$) is the single most important calibration step when using downsampled training data.
   - Temperature scaling (one scalar T) is astonishingly effective for post-hoc calibration of deep networks — always try it first.
   - Label smoothing during training acts as a regularizer that prevents overconfidence and improves calibration "for free."
   - Position bias silently corrupts click labels — use PAL (position-as-feature, constant at inference) or IPW to debias.
   - BERT-based cross-encoders are powerful for leveraging textual understanding, but must be combined with tabular features via architectures like BERT4CTR or CTR-BERT.
   - Historical CTR, BM25 match score, and product category embedding are typically the three most impactful features.

2. **Completed concept map** (D2 diagram linking all concepts: click logs → training data → model architecture → loss function → calibration → evaluation → serving → monitoring)

3. **Retrieval practice questions** (7, with answers in collapsed callout):
   - Q1: What is the difference between AUC and ECE? Can a model have excellent AUC but terrible calibration?
   - Q2: Derive the downsampling correction formula from Bayes' rule.
   - Q3: You're building a CTR model for a new product category with no historical data. What features and fallback strategies would you use?
   - Q4: Why does temperature scaling preserve ranking but change probabilities?
   - Q5: Compare and contrast Platt scaling, isotonic regression, and temperature scaling. When would you choose each?
   - Q6: Design a position debiasing experiment. How would you measure whether your debiasing actually improved the model?
   - Q7: Your model predicts p=0.8 for a query-product pair, but the true CTR is only 0.15. List three possible reasons for this discrepancy.

4. **Common mistakes section**:
   - Training on downsampled data without applying the correction formula
   - Using AUC as the sole evaluation metric (ignoring log loss and ECE)
   - Not accounting for position bias in click labels
   - Feature leakage: using post-click conversion data in features
   - Deploying a model without monitoring calibration drift

5. **Curated resource list** (reading priority order):
   - [BERT4CTR (KDD 2023)](https://arxiv.org/abs/2308.11527) — Directly answers how to combine BERT + non-textual features
   - [ethen8181 blog](http://ethen8181.github.io/machine-learning/deep_learning/tabular/bert_ctr/bert_ctr.html) — Full working PyTorch code for BERT + tabular CTR
   - [Practical Lessons from Predicting Clicks at Facebook (ADKDD 2014)](https://quinonero.net/Publications/predicting-clicks-facebook.pdf) — Calibration fundamentals, downsampling formula, Normalized Entropy
   - [Scale Calibration of Deep Ranking Models (Google CalRank, KDD 2022)](https://marc.najork.org/papers/kdd2022-calrank.pdf) — Calibrated ranking losses
   - [CTRL (2023)](https://arxiv.org/abs/2306.02841) — Why two-stage training beats end-to-end
   - [Guo et al., "On Calibration of Modern Neural Networks" (2017)](https://arxiv.org/abs/1706.04599) — The foundational calibration paper
   - [Eugene Yan, "How to Measure and Mitigate Position Bias"](https://eugeneyan.com/writing/position-bias/) — Best practical guide
   - [DLRM (Meta, 2019)](https://arxiv.org/abs/1906.00091) — Foundational embedding-based CTR architecture
   - [Cold Start via Empirical Bayes (Amazon)](https://assets.amazon.science/b5/2f/a9d9581d4f8eab473a4ab4a8ad35/addressing-cold-start-in-product-search-via-empirical-bayes.pdf) — Beta-Binomial smoothing for new products

---

## Cross-Cutting Concerns

**Notation table:**

| Symbol | Meaning |
|--------|---------|
| $q$ | Search query |
| $d$ | Document (product) |
| $c$ | Context (position, device, time, etc.) |
| $y \in \{0, 1\}$ | Binary click label |
| $\hat{p}$ or $\hat{y}$ | Predicted click probability |
| $z$ | Logit (pre-sigmoid output) |
| $T$ | Temperature parameter |
| $w$ | Negative sampling rate (fraction kept) |
| $\epsilon$ | Label smoothing parameter |
| $\gamma$ | Focal loss focusing parameter |
| $\alpha$ | Focal loss / KD weighting parameter |
| ECE | Expected Calibration Error |
| BS | Brier Score |
| pCTR | Predicted Click-Through Rate |

**Concept map design:** A D2 diagram with the following node groups:
- **Data** (yellow): Click Logs, Impression Negatives, Hard Negatives, Downsampled Data
- **Models** (blue): Cross-Encoder, BERT4CTR, CTR-BERT, DCAF-BERT, CTRL, DLRM, DeepFM, Wide & Deep
- **Calibration** (green): Temperature Scaling, Platt Scaling, Isotonic Regression, Label Smoothing
- **Bias** (red): Position Bias, Selection Bias, Sampling Bias
- **Evaluation** (purple): AUC, Log Loss, ECE, Brier Score, Reliability Diagram

**Prerequisite knowledge to recap:** Binary classification and sigmoid function, cross-entropy loss, BERT architecture basics (tokenization, [CLS] token, fine-tuning), basic concepts of precision/recall/AUC.

**Common Misconceptions:**
1. **"High AUC means good predictions"** — AUC measures ranking, not probability quality. A model with AUC=0.90 can have wildly miscalibrated probabilities.
2. **"Just add a sigmoid and you get probabilities"** — The sigmoid output of a deep network is NOT a calibrated probability. Modern deep networks are systematically overconfident.
3. **"More data always improves calibration"** — More data improves accuracy but can actually *worsen* calibration if the data is biased (e.g., position bias) or if the model overfits to the training distribution.
4. **"Downsampling negatives to 50/50 is just class balancing"** — It fundamentally changes the model's learned base rate. Without the correction formula, all probabilities are inflated.
5. **"Calibration is a one-time step"** — Calibration degrades continuously as the data distribution shifts. It requires ongoing monitoring and periodic recalibration.

**Think Hard questions:**
1. Is there a fundamental tension between optimizing for ranking (AUC) and optimizing for calibration (ECE)? Can you construct a theoretical example where improving one necessarily worsens the other?
2. If you had access to explicit relevance judgments (from human annotators) instead of click data, would calibration still be a problem? Why or why not?
3. How should calibration techniques change when the CTR model is used in a multi-stage pipeline (retrieval → re-ranking → ad auction)? Does each stage need separate calibration?
4. Position bias debiasing requires knowing the position-specific examination probability P(exam | pos). But this probability itself depends on the relevance of items shown in those positions. How do you break this circular dependency?
5. In a production system, would you prefer a less accurate but well-calibrated model, or a more accurate but poorly calibrated model? Under what conditions does your answer change?
