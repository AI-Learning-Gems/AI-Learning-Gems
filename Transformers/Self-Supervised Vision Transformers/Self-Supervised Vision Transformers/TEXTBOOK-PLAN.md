# TEXTBOOK-PLAN: Self-Supervised Vision Transformers (DINO to DINOv3 and Beyond)

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
> /research-textbook-chapter make the chaper for all the selfsupervised model in vit from dino 1 to 3 and other models related in this field

**Topic:** Self-supervised learning methods for Vision Transformers — DINO (v1), DINOv2, DINOv3, and related methods (MAE, BEiT, iBOT, I-JEPA, MoCo v3, DeiT)
**Prior Knowledge:** Strong understanding of CNNs and Transformers (self-attention, patch embeddings, ViT architecture). Familiarity with the parent chapter on Vision Transformers and VLMs is assumed but a brief ViT recap is included in Section 1.
**Learning Goals:** Deep understanding of why ViTs need self-supervision; the two major SSL paradigms (joint-embedding vs masked image modeling); the DINO lineage from v1 through v3; related methods and when to use each; emergent properties (attention-based segmentation, frozen features); common misconceptions and grad-student-level edge cases.
**Target Depth:** Graduate
**Output Folder:** `Transformers/Self-Supervised Vision Transformers/`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (25 sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [Emerging Properties in Self-Supervised Vision Transformers (DINO)](https://arxiv.org/abs/2104.14294) | [ACADEMIC] | `sources/arxiv-2104.14294/` | 2021-04 | 2026-06-15 | KEY: Original DINO paper. Self-distillation with no labels, multi-crop, momentum teacher. Emergent semantic segmentation in attention maps. |
| 2 | [DINOv2: Learning Robust Visual Features without Supervision](https://arxiv.org/abs/2304.07193) | [ACADEMIC] | `sources/arxiv-2304.07193/` | 2023-04 | 2026-06-15 | KEY: Combines DINO + iBOT + KoLeo losses. LVD-142M curated data pipeline. ViT-g 1B distilled to smaller models. Frozen features competitive with OpenCLIP. |
| 3 | [DINOv3 Technical Report](https://arxiv.org/abs/2508.10104) | [ACADEMIC] | `sources/arxiv-2508.10104/` | 2025-08 | 2026-06-15 | KEY: 7B ViT on 1.7B images. Gram anchoring fixes dense feature degradation at scale. Model family via distillation (ViT + ConvNeXt). |
| 4 | [Masked Autoencoders Are Scalable Vision Learners (MAE)](https://arxiv.org/abs/2111.06377) | [ACADEMIC] | `sources/arxiv-2111.06377/` | 2021-11 | 2026-06-15 | KEY: 75% masking, asymmetric encoder-decoder. Reconstructive (generative) SSL paradigm for ViT. |
| 5 | [BEiT: BERT Pre-Training of Image Transformers](https://arxiv.org/abs/2106.08254) | [ACADEMIC] | `sources/arxiv-2106.08254/` | 2021-06 | 2026-06-15 | KEY: Masked visual token prediction (discrete tokenizer). Foundational MIM approach predating MAE's pixel reconstruction. |
| 6 | [BEiT v2: Masked Image Modeling with Vector-Quantized Visual Tokenizers](https://arxiv.org/abs/2208.06366) | [ACADEMIC] | `sources/arxiv-2208.06366/` | 2022-08 | 2026-06-15 | KEY: VQ-KD tokenizer moves MIM from pixel-level to semantic-level targets. Patch aggregation strategy. |
| 7 | [iBOT: Image BERT Pre-Training with Online Tokenizer](https://arxiv.org/abs/2111.07832) | [ACADEMIC] | `sources/arxiv-2111.07832/` | 2021-11 | 2026-06-15 | KEY: Combines DINO-style self-distillation with masked patch prediction. Bridge between JE and MIM paradigms. |
| 8 | [I-JEPA: Joint-Embedding Predictive Architecture](https://arxiv.org/abs/2301.08243) | [ACADEMIC] | `sources/arxiv-2301.08243/` | 2023-01 | 2026-06-15 | KEY: Non-generative SSL. Predicts target block embeddings in latent space (not pixels). Minimal augmentations. |
| 9 | [MoCo v3 for ViT](https://arxiv.org/abs/2104.02057) | [ACADEMIC] | `sources/arxiv-2104.02057/` | 2021-04 | 2026-06-15 | SUPPLEMENTARY: Contrastive SSL adapted to ViT. Useful baseline for comparing JE paradigms. |
| 10 | [An Image is Worth 16x16 Words (ViT)](https://arxiv.org/abs/2010.11929) | [ACADEMIC] | `sources/arxiv-2010.11929/` | 2020-10 | 2026-06-15 | KEY: ViT architecture prerequisite. Patch embedding, [CLS] token, positional embeddings. |
| 11 | [DeiT: Training Data-Efficient Image Transformers](https://arxiv.org/abs/2012.12877) | [ACADEMIC] | `sources/arxiv-2012.12877/` | 2020-12 | 2026-06-15 | SUPPLEMENTARY: Supervised distillation (not SSL) but important contrast — DeiT trains ViT on ImageNet-1K alone via CNN teacher. |
| 12 | [Objectives Matter: Impact of SSL Objectives on ViT Representations](https://arxiv.org/abs/2304.13089) | [ACADEMIC] | `sources/arxiv-2304.13089/` | 2023-04 | 2026-06-15 | KEY: Systematic comparison of JE (DINO, MoCo-v3) vs REC (MAE) objectives. Explains why JE transfers better with linear probe. |
| 13 | [Beyond [cls]: MIM Representation Aggregation](https://arxiv.org/abs/2412.03215) | [ACADEMIC] | `sources/arxiv-2412.03215/` | 2024-12 | 2026-06-15 | KEY: MAE [CLS] token aggregates poorly vs JE methods. Patch tokens contain more usable info for MIM. |
| 14 | [Analyzing Local Representations of Self-Supervised ViTs](https://openreview.net/pdf?id=IzrLkbq1dc) | [ACADEMIC] | `sources/openreview.net/pdf/IzrLkbq1dc/` | 2023 | 2026-06-15 | KEY: MAE k-NN fails due to high-variance dimensions. DINO most robust for patch retrieval. |
| 15 | [Which Direction to Choose? Representation Power of Self-Supervised ViTs](https://arxiv.org/abs/2509.15272) | [ACADEMIC] | `sources/arxiv-2509.15272/` | 2025-09 | 2026-06-15 | SUPPLEMENTARY: Latent space probing of frozen DINO vs MAE features on downstream tasks. |
| 16 | [On the Road to DINOv2 Artifacts](https://arxiv.org/abs/2309.16588) | [ACADEMIC] | `sources/arxiv-2309.16588/` | 2023-09 | 2026-06-15 | KEY: Artifacts in DINOv2 dense feature maps not present in DINO v1. Important limitation discussion. |
| 17 | [Self-Supervised Representation Learning (Lilian Weng)](https://lilianweng.github.io/posts/2019-11-10-self-supervised/) | [TUTORIAL] | `sources/lilianweng.github.io/posts/2019-11-10-self-supervised/` | 2019-11 | 2026-06-15 | KEY: Foundational SSL framing — pretext tasks, why labels-from-data works. |
| 18 | [Contrastive Representation Learning (Lilian Weng)](https://lilianweng.github.io/posts/2021-05-31-contrastive/) | [TUTORIAL] | `sources/lilianweng.github.io/posts/2021-05-31-contrastive/` | 2021-05 | 2026-06-15 | KEY: Contrastive learning foundations — augmentations, SimCLR, positive/negative pairs. |
| 19 | [D2L: Transformers for Vision](https://d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer.html) | [TUTORIAL] | `sources/d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer/` | 2023 | 2026-06-15 | KEY: Pedagogical ViT implementation. Patch embedding as conv, pre-norm blocks. |
| 20 | [Understanding DINOv2 (Lightly AI)](https://www.lightly.ai/blog/dinov2) | [TUTORIAL] | `sources/lightly.ai/blog/dinov2/` | 2023 | 2026-06-15 | KEY: Engineer's guide to DINOv2 losses (DINO + iBOT + KoLeo), data curation, scaling tricks. |
| 21 | [DINOv3 Blog (Meta AI)](https://ai.meta.com/blog/dinov3-self-supervised-vision-model/) | [TUTORIAL] | `sources/ai.meta.com/blog/dinov3-self-supervised-vision-model/` | 2025-08 | 2026-06-15 | KEY: Accessible overview of DINOv3 scale, Gram anchoring motivation, model family, real-world impact. |
| 22 | [DINOv3 GitHub README](https://github.com/facebookresearch/dinov3) | [TUTORIAL] | `sources/github.com/facebookresearch/dinov3/` | 2025-08 | 2026-06-15 | KEY: Implementation reference, HuggingFace integration, model variants. |
| 23 | [I-JEPA Introduction (Debugger Cafe)](https://debuggercafe.com/jepa-series-part-1-introduction-to-i-jepa/) | [TUTORIAL] | `sources/debuggercafe.com/jepa-series-part-1-introduction-to-i-jepa/` | 2025-08 | 2026-06-15 | KEY: Clear three-component architecture explanation. Comparison with MAE and DINO. |
| 24 | [Emergent Object Binding (Towards Data Science)](https://towardsdatascience.com/emergent-object-binding-from-self-supervised-not-supervised-learning/) | [COMMUNITY] | `sources/towardsdatascience.com/emergent-object-binding-from-self-supervised-not-supervised-learning/` | 2025 | 2026-06-15 | KEY: NeurIPS 2025 perspective — SSL ViTs learn object binding; supervised ViTs do not. Community synthesis. |
| 25 | General reference (Masked Image Modeling survey landscape) | General reference (Masked Image Modeling: A Survey, IJCV 2025) | General reference (Masked Image Modeling: A Survey, IJCV 2025) | — | 2026-06-15 | Timeline of MIM methods (BEiT, MAE, iBOT, etc.). Use for historical framing only; paywalled full text not downloaded. |

:::

---

## Chapter Overview

**Total sections:** 6 body sections + introduction + closing = 8 files
**Estimated total length:** 9,500–12,000 words
**Running example:** **Dr. Maya Chen**, a medical imaging researcher (continuing from the parent ViT/VLM chapter) who has 50,000 unlabeled retinal fundus images and only 2,000 ophthalmologist-labeled scans. She cannot afford to pretrain a ViT from scratch on labels, but she can run self-supervised pretraining on all 50,000 images overnight.

### Hook & Running Example Design

Maya's supervised ViT, trained on 2,000 labels, plateaued at 72% accuracy — not enough for clinical deployment. Her colleague mentions that Meta released "DINOv2" features that work without fine-tuning for segmentation. Maya tries extracting features from her unlabeled scans with a pretrained DINOv2 ViT-S and discovers, to her surprise, that the attention maps already outline the optic disc and vessel boundaries — with zero segmentation labels.

This discovery raises a puzzle that drives the chapter: **why would a model trained with no labels produce better spatial structure than one trained on disease classifications?** The answer unfolds across three generations of DINO and the broader landscape of self-supervised ViT methods.

Maya's journey through this chapter mirrors the field's progression:

1. **Section 1** — She learns why ViTs are data-hungry and why self-supervision is the natural fix. She frames the two paradigms (joint-embedding vs masked modeling) before choosing a method.
2. **Section 2** — She implements DINO v1 on a subset of her data, watching emergent segmentation appear in attention maps. She uses k-NN evaluation because she has almost no labels.
3. **Section 3** — She tries MAE instead (reconstruct masked patches) and BEiT (predict visual tokens), comparing reconstructive vs discriminative objectives on her low-label regime.
4. **Section 4** — She discovers iBOT, which combines both worlds, and understands why DINOv2 adopted this hybrid loss.
5. **Section 5** — She scales up with DINOv2's curated data pipeline and KoLeo regularization, achieving frozen features that beat her supervised baseline.
6. **Section 6** — She evaluates DINOv3 (Gram anchoring, 7B teacher, distilled ViT-L) alongside alternatives (I-JEPA, MoCo v3) and builds a decision framework for her deployment.

Each section opens with Maya facing a concrete choice, then develops the math and architecture before returning to what she would actually run on her cluster.

**Hook Image:** DINO Figure 1 — self-attention maps from a ViT-S/8 trained with no supervision, showing emergent object segmentation from [CLS] token attention in the last layer. This image bridges Maya's clinical puzzle ("how can the model find vessels without labels?") to the technical mechanism (self-attention as implicit segmentation). Source path: describe in writing agent notes from `sources/arxiv-2104.14294/content.md` Figure 1 caption; during writing, download/render from arXiv HTML or paper figure URL and save to `Self-Supervised Vision Transformers/images/dino-attention-segmentation.png`.

---

## Section Plan

### Section 0: Introduction {#sec-introduction}

**File:** `_01-introduction.qmd`
**Estimated length:** 1,000–1,200 words
**Goal:** Motivate self-supervised ViT pretraining; brief ViT recap; introduce the two SSL paradigms and the DINO lineage roadmap.
**Running example application:** Maya's 72% supervised baseline vs glimpses of DINOv2 attention on unlabeled scans. Pose the chapter's central question.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| ViT Paper | `sources/arxiv-2010.11929/` | Introduction, patch embedding | Why ViTs need large data; patch token formulation |
| D2L ViT Tutorial | `sources/d2l.ai/.../content.md` | Model, Patch Embedding | Pedagogical patch-as-conv framing |
| Lilian Weng SSL | `sources/lilianweng.github.io/posts/2019-11-10-self-supervised/` | Opening sections | Pretext task definition; labels-from-data |
| DINO Paper | `sources/arxiv-2104.14294/` | Abstract, Figure 1 caption | Emergent segmentation hook |

**Content outline:**
1. Maya's problem restated: 50K unlabeled, 2K labeled retinal images
2. Brief ViT recap: patches → tokens → [CLS] → classifier (3–4 paragraphs max)
3. Why supervised ImageNet-scale pretraining is not always available
4. Two SSL paradigms preview: joint-embedding (DINO family) vs masked image modeling (MAE/BEiT)
5. Chapter roadmap: DINO v1 → hybrids → DINOv2 → DINOv3 → alternatives
6. D2 concept map: SSL paradigms → methods → downstream uses

**Key equations:** Patch embedding: $\mathbf{z}_0 = [\mathbf{x}_{\text{cls}}; \mathbf{E}\mathbf{x}_p^1; \ldots; \mathbf{E}\mathbf{x}_p^N] + \mathbf{E}_{\text{pos}}$

**Visualizations:** D2 concept map (paradigms); hook image (DINO attention segmentation)

**Source images to embed:** DINO Figure 1 (from `sources/arxiv-2104.14294/` — fetch during writing)

---

### Section 1: Why ViTs Need Self-Supervision {#sec-why-ssl}

**File:** `_02-why-vits-need-self-supervision.qmd`
**Estimated length:** 1,600–1,900 words
**Goal:** Reader understands ViT data hunger, the collapse problem in SSL, and the JE vs MIM paradigm split with enough rigor to choose an approach.
**Running example application:** Maya calculates she has 25× more unlabeled than labeled images. She learns that ViT-L needs ~300M images supervised but can learn from unlabeled data via SSL.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| ViT Paper | `sources/arxiv-2010.11929/` | Scaling discussion, inductive bias | Data requirements vs CNNs |
| D2L ViT | `sources/d2l.ai/.../content.md` | Summary section | Small-data failure mode |
| Lilian Weng SSL | `sources/lilianweng.github.io/posts/2019-11-10-self-supervised/` | Pretext tasks, evaluation protocol | Linear probe on ImageNet framing |
| Lilian Weng Contrastive | `sources/lilianweng.github.io/posts/2021-05-31-contrastive/` | Vision embedding, augmentations | Why augmentations matter for JE |
| Objectives Matter | `sources/arxiv-2304.13089/` | Introduction, JE vs REC comparison | Formal paradigm definitions |
| MoCo v3 | `sources/arxiv-2104.02057/` | ViT instability discussion | Why ViT + contrastive needs tricks |

**Content outline:**
1. ViT inductive bias gap: no translation equivariance, no locality prior (contrast with CNN recap)
2. The scaling law intuition: ViT performance jumps with data+compute (cite ViT paper — verify numbers from source)
3. Self-supervision defined: pretext tasks that manufacture labels from data (Lilian Weng framing)
4. **Paradigm 1 — Joint-Embedding (JE):** match representations across views (DINO, MoCo, SimCLR). Requires careful augmentations. Collapse problem and fixes (momentum teacher, stop-gradient, centering).
5. **Paradigm 2 — Masked Image Modeling (MIM/REC):** reconstruct masked patches or tokens (MAE, BEiT). High masking ratio; asymmetric encoder-decoder.
6. Evaluation protocols: linear probing, k-NN, fine-tuning — and why they give different rankings (preview Objectives Matter findings)
7. Maya's decision tree: if she needs frozen features for segmentation → lean JE; if she will fine-tune heavily → MIM competitive

**Key equations:** Collapse as trivial constant solution; contrastive InfoNCE sketch (optional, from Lilian Weng)

**Visualizations:** D2 diagram — two paradigms side by side with method examples; hvPlot — hypothetical scaling curve (synthetic data labeled clearly as illustrative)

**Source images to embed:** None required; use D2 paradigm diagram

---

### Section 2: DINO v1 — Self-Distillation with No Labels {#sec-dino-v1}

**File:** `_03-dino-v1.qmd`
**Estimated length:** 1,800–2,000 words
**Goal:** Reader can explain DINO's teacher-student architecture, loss, multi-crop strategy, and why ViT-specific emergent properties appear.
**Running example application:** Maya trains DINO on 10K unlabeled retinal scans. She visualizes [CLS] attention and sees vessel-like boundaries emerge.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DINO Paper | `sources/arxiv-2104.14294/` | Sec. 3 (method), Algorithm 1, Fig. 2 | Self-distillation loss, centering, temperature |
| DINO Paper | `sources/arxiv-2104.14294/` | Sec. 4 (emergent properties), Figs. 1, 3, 4 | Attention segmentation, k-NN performance |
| DINO Paper | `sources/arxiv-2104.14294/` | Ablations (Tab. 7, 8) | Momentum, multi-crop, patch size importance |
| Lilian Weng Contrastive | `sources/lilianweng.github.io/posts/2021-05-31-contrastive/` | BYOL/SimCLR context | Connection to non-contrastive JE methods |

**Content outline:**
1. Historical context: BYOL → DINO as "self-distillation with no labels" (same-architecture student/teacher)
2. Architecture walkthrough with D2 diagram: student + teacher ViT, projection heads, EMA update
3. **Multi-crop strategy:** 2 global (224²) + N local (96²) crops; local-to-global correspondence objective
4. **Loss function:** cross-entropy between centered/sharpened teacher softmax and student softmax over prototype dimensions
5. **Anti-collapse mechanisms:** momentum encoder (required), centering, temperature scheduling — ablation evidence
6. **Emergent properties (the DINO surprise):**
   - [CLS] self-attention maps contain semantic segmentation (Fig. 1, 3, 4)
   - Excellent k-NN classifiers without fine-tuning
   - Small patches (/8) critical for dense features
7. Comparison: DINO + ViT vs DINO + ResNet vs supervised ViT (verify numbers from source tables)
8. Maya extracts attention maps; thresholding at 60% mass gives vessel-like masks (PASCAL VOC Jaccard discussion — verify from source)

**Key equations:**
- DINO loss: $\mathcal{L} = \sum_{x \in \{x_1^g, x_2^g\}} \sum_{\substack{x' \in V \\ x' \neq x}} H(P_t(x), P_s(x'))$
- EMA teacher update: $\theta_t \leftarrow \lambda \theta_t + (1-\lambda)\theta_s$
- Centering: $P_t(x) = \text{softmax}((g_t(f_t(x)) - c)/\tau_t)$

**Visualizations:** D2 — DINO training loop (Fig. 2 recreation); source images Figs. 1, 3, 4

**Source images to embed:**
- DINO Figure 1 (attention segmentation) — MUST include
- DINO Figure 2 (architecture) — MUST include
- DINO Figure 4 (supervised vs DINO segmentation comparison)

---

### Section 3: Masked Image Modeling — MAE, BEiT, and BEiT v2 {#sec-mim-mae-beit}

**File:** `_04-masked-image-modeling.qmd`
**Estimated length:** 1,700–2,000 words
**Goal:** Reader understands the reconstructive SSL paradigm, why 75% masking works, and the progression from pixels → visual tokens → semantic tokens.
**Running example application:** Maya tries MAE on her data — fast training (encoder sees only 25% of patches) but her linear probe on [CLS] underperforms DINO. She learns why.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| MAE Paper | `sources/arxiv-2111.06377/` | Sec. 1–3, Fig. 1 | Asymmetric encoder-decoder, 75% masking rationale |
| MAE Paper | `sources/arxiv-2111.06377/` | Fig. 5, ablation tables | Masking ratio sweep |
| BEiT Paper | `sources/arxiv-2106.08254/` | Method, visual tokenizer | Discrete token prediction (BERT-for-images) |
| BEiT v2 Paper | `sources/arxiv-2208.06366/` | VQ-KD, patch aggregation | Semantic-level MIM |
| Beyond [cls] | `sources/arxiv-2412.03215/` | Introduction, Fig. 1 | MAE [CLS] aggregation weakness |
| Objectives Matter | `sources/arxiv-2304.13089/` | REC vs JE transfer analysis | Why MAE needs fine-tuning for classification |

**Content outline:**
1. Motivation: BERT-style pretraining comes to vision (BEiT first, MAE simplifies)
2. **MAE architecture:** encoder on visible patches only; lightweight decoder; mask tokens after encoder
3. **Why 75% masking:** images have spatial redundancy; high mask ratio forces semantic understanding (MAE Sec. 1 analysis)
4. **Reconstruction target:** pixel MSE on masked patches only (asymmetric loss)
5. **BEiT difference:** predict discrete visual tokens from dVAE tokenizer, not raw pixels
6. **BEiT v2 upgrade:** VQ-KD trains semantic tokenizer; patch aggregation for global representation
7. Strengths vs weaknesses: MAE excels at fine-tuning and dense tasks; weak frozen [CLS] for linear probe (Beyond [cls], Objectives Matter)
8. Maya's experiment: MAE pretrain → fine-tune beats her supervised baseline; frozen features do not

**Key equations:**
- MAE loss: $\mathcal{L}_{MAE} = \frac{1}{|\mathcal{M}|}\sum_{i \in \mathcal{M}} \|\hat{\mathbf{x}}_i - \mathbf{x}_i\|_2^2$ on masked patches only
- Masking ratio $|\mathcal{M}|/N \approx 0.75$

**Visualizations:** D2 — MAE encoder-decoder flow; source MAE Figure 1 architecture

**Source images to embed:**
- MAE Figure 1 (architecture diagram) — MUST include
- MAE Figure 2 or 5 (reconstruction / masking ratio) — optional

---

### Section 4: iBOT and Hybrid Objectives {#sec-ibot-hybrid}

**File:** `_05-ibot-hybrid-objectives.qmd`
**Estimated length:** 1,500–1,800 words
**Goal:** Reader understands how iBOT bridges JE and MIM, and why DINOv2 combines DINO + iBOT + KoLeo losses.
**Running example application:** Maya learns that patch-level objectives fix DINO's weakness on dense prediction — exactly what she needs for vessel segmentation.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| iBOT Paper | `sources/arxiv-2111.07832/` | Method, masked patch distillation | Online tokenizer, patch-level loss |
| DINOv2 Paper | `sources/arxiv-2304.07193/` | Sec. 4 (losses), KoLeo, iBOT terms | Combined loss formulation |
| Lightly DINOv2 Blog | `sources/lightly.ai/blog/dinov2/` | Patch objective, KoLeo sections | Engineer's explanation of separate heads |
| DINO Paper | `sources/arxiv-2104.14294/` | Comparison with iBOT predecessors | Context for hybrid approach |

**Content outline:**
1. The limitation of pure DINO: strong global [CLS] features, weaker patch-level semantics for dense tasks
2. **iBOT idea:** apply DINO-style self-distillation at patch level with random masking (~40–50% mask ratio)
3. Separate projection heads for DINO (CLS) and iBOT (patches) — why sharing fails at scale (DINOv2 finding)
4. **KoLeo regularizer:** spread [CLS] features uniformly on hypersphere; prevents collapse; helps k-NN
5. **Combined DINOv2 loss:** $\mathcal{L} = \mathcal{L}_{DINO} + \mathcal{L}_{iBOT} + \lambda_{KoLeo}\mathcal{L}_{KoLeo}$ (verify $\lambda$ from source)
6. Why this hybrid beats either alone: global semantics + local patch alignment
7. Maya uses pretrained DINOv2 instead of training iBOT from scratch

**Key equations:** iBOT patch loss (cross-entropy on masked patch tokens); KoLeo regularizer (minimum pairwise distance maximization — read exact form from DINOv2 source Sec. 4)

**Visualizations:** D2 — multi-loss training diagram (student/teacher with CLS + patch heads)

**Source images to embed:** DINOv2 Figure 1 (PCA visualization of patch features) if available in HTML source during writing

---

### Section 5: DINOv2 — Scaling Self-Supervised ViTs {#sec-dinov2}

**File:** `_06-dinov2.qmd`
**Estimated length:** 1,800–2,000 words
**Goal:** Reader understands DINOv2's data curation pipeline, training stability improvements, distillation, and frozen-feature benchmarks.
**Running example application:** Maya downloads DINOv2 ViT-L frozen weights, linear-probes her 2K labels, and beats her supervised ViT without pretraining from scratch.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DINOv2 Paper | `sources/arxiv-2304.07193/` | Sec. 3 (data pipeline), Fig. 3 | LVD-142M curation, retrieval, deduplication |
| DINOv2 Paper | `sources/arxiv-2304.07193/` | Sec. 4, 7 | Losses, scaling curves, benchmarks |
| DINOv2 Paper | `sources/arxiv-2304.07193/` | Distillation section | ViT-g 1B → smaller models |
| Lightly DINOv2 Blog | `sources/lightly.ai/blog/dinov2/` | Data curation, training tricks | 2× faster, 3× less memory claims — verify |
| DINOv2 Artifacts | `sources/arxiv-2309.16588/` | Full paper | Grid-like artifacts in dense features; limitations |
| OpenReview Local Reps | `sources/openreview.net/pdf/IzrLkbq1dc/` | MAE vs DINO patch analysis | k-NN and patch retrieval comparisons |

**Content outline:**
1. From DINO to foundation model: goal of frozen features competitive with CLIP
2. **LVD-142M data pipeline:** curated seeds → retrieval from 1.2B uncurated → deduplication → clustering rebalance (Fig. 3)
3. **Training improvements:** FSDP, mixed precision, longer schedules, high-res fine-tuning phase
4. **Model scaling:** ViT-g (1B params) teacher; distillation to ViT-S/B/L/g
5. **Benchmark story:** frozen features on classification, segmentation, depth — verify table numbers from source only
6. **Known limitations:** DINOv2 artifacts paper — grid patterns in dense features at high resolution; not present in DINO v1
7. Maya's workflow: extract features → train linear head on 2K labels → deploy frozen backbone for segmentation adapter

**Key equations:** Data pipeline is procedural; KoLeo and combined loss from Section 4 recur here at scale

**Visualizations:** D2 — LVD-142M curation pipeline; source DINOv2 Fig. 2 scaling plot; source Fig. 3 data pipeline

**Source images to embed:**
- DINOv2 Figure 3 (data processing pipeline) — MUST include
- DINOv2 Figure 2 (scaling performance) — recommended
- DINOv2 Artifacts figures (if writing limitations subsection)

---

### Section 6: DINOv3, Alternatives, and Choosing a Method {#sec-dinov3-landscape}

**File:** `_07-dinov3-and-landscape.qmd`
**Estimated length:** 2,000–2,200 words
**Goal:** Reader understands DINOv3's Gram anchoring and scale; can compare I-JEPA, MoCo v3, DeiT; has a decision framework for method selection.
**Running example application:** Maya evaluates DINOv3 ViT-L distilled, I-JEPA, and off-the-shelf DINOv2 for her deployment constraints (frozen backbone, segmentation, limited GPU).

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DINOv3 Paper | `sources/arxiv-2508.10104/` | Sec. 1, 3–5 | Gram anchoring, 7B training, distillation family |
| DINOv3 Meta Blog | `sources/ai.meta.com/blog/dinov3-self-supervised-vision-model/` | Full post | Accessible motivation, real-world impact |
| DINOv3 GitHub | `sources/github.com/facebookresearch/dinov3/` | README, model table | Available checkpoints, HuggingFace usage |
| I-JEPA Paper | `sources/arxiv-2301.08243/` | Method, masking strategy | JEPA paradigm, latent prediction |
| I-JEPA Debugger Cafe | `sources/debuggercafe.com/.../content.md` | Architecture, comparisons | Three-component diagram explanation |
| MoCo v3 | `sources/arxiv-2104.02057/` | ViT training recipe | Contrastive baseline |
| DeiT | `sources/arxiv-2012.12877/` | Distillation token | Supervised alternative (not SSL) for contrast |
| Which Direction | `sources/arxiv-2509.15272/` | Frozen MAE vs DINO analysis | Practical feature comparison |
| TDS Object Binding | `sources/towardsdatascience.com/.../content.md` | DINOv2 object binding | Emergent properties at scale |

**Content outline:**
1. **DINOv3 motivation:** dense feature degradation at scale (DINOv2 problem); Gram anchoring solution (preserve patch similarity structure)
2. **Scale:** 7B ViT, 1.7B images, constant hyperparameter schedules, axial RoPE
3. **Gram anchoring:** secondary Gram matrix loss from anchor network; prevents dense feature collapse during long training (read Sec. 4 carefully)
4. **Model family:** distillation from ViT-7B to ViT-S/B/L + ConvNeXt variants; HuggingFace deployment
5. **Benchmarks:** frozen backbone SOTA on detection, segmentation, depth — verify numbers from source only
6. **Related methods (not DINO lineage):**
   - **I-JEPA:** predict latent embeddings, not pixels; no hand-crafted augmentations; JEPA as third paradigm
   - **MoCo v3:** contrastive JE with ViT-specific training fixes
   - **DeiT (supervised):** distillation token — when labels exist but are scarce
7. **Decision framework for Maya (and readers):**

| Need | Recommended starting point |
|------|---------------------------|
| Frozen features, segmentation | DINOv2/DINOv3 |
| Fine-tune on small labeled set | MAE pretrain → fine-tune |
| No augmentations / latent prediction | I-JEPA |
| Maximum off-the-shelf quality (2025) | DINOv3 ViT-L distilled |
| Legacy baseline / ablation | MoCo v3 |

8. Think Hard preview: artifacts, evaluation protocol choice, domain shift from web to medical

**Key equations:** Gram anchoring loss (read from DINOv3 Sec. 4 — do not guess formula in chapter without reading source)

**Visualizations:** D2 — DINO lineage timeline (v1→v2→v3); D2 — method selection flowchart; source DINOv3 Fig. 3 high-res dense features

**Source images to embed:**
- DINOv3 Figure 3 (high-resolution dense feature similarity maps) — MUST include
- DINOv3 Figure 2 (benchmark comparison across model families) — recommended

---

## Source Image Catalog

**These are images from the downloaded sources that should be embedded in the chapter.**
The writing agent should copy these to `Self-Supervised Vision Transformers/images/` and embed them in the appropriate sections.

| # | Source Image Path | Caption (from paper) | Relevant Section(s) | Notes |
|---|---|---|---|---|
| 1 | Fetch from arXiv HTML/PDF for `arxiv-2104.14294` Figure 1 | "Self-attention from a ViT with 8×8 patches trained with no supervision... unsupervised object segmentations" | §2 DINO v1, §0 Intro | Hook image — MUST include |
| 2 | Fetch for `arxiv-2104.14294` Figure 2 | "Self-distillation with no labels" architecture diagram | §2 DINO v1 | Canonical training diagram |
| 3 | Fetch for `arxiv-2104.14294` Figure 4 | "Segmentations from supervised versus DINO" | §2 DINO v1 | Supervised vs SSL attention comparison |
| 4 | Fetch for `arxiv-2111.06377` Figure 1 | "Our MAE architecture" — asymmetric encoder-decoder | §3 MIM | Canonical MAE diagram — MUST include |
| 5 | Fetch for `arxiv-2304.07193` Figure 3 | "Overview of our data processing pipeline" | §5 DINOv2 | LVD-142M curation — MUST include |
| 6 | Fetch for `arxiv-2304.07193` Figure 2 | Scaling performance across vision tasks | §5 DINOv2 | Scaling plot |
| 7 | Fetch for `arxiv-2508.10104` Figure 3 | "High-resolution dense features" cosine similarity maps | §6 DINOv3 | Shows Gram anchoring quality — MUST include |
| 8 | Fetch for `arxiv-2508.10104` Figure 2 | DINOv3 family benchmark comparison | §6 DINOv3 | Model family performance |
| 9 | Fetch for `arxiv-2304.07193` Figure 1 | PCA components of patch features | §4 iBOT hybrid | Optional — patch semantics visualization |

**Note on image acquisition:** Sources were downloaded as arXiv HTML markdown (not LaTeX with figure PDFs). During writing, fetch figures from arXiv figure URLs embedded in the HTML, or use `magick` on downloaded PDFs. Follow visualization-standards.md: convert PDF figures at 400 DPI with trim.

**Priority order for visuals:**

1. **Source images from papers** — canonical architecture and result figures
2. **D2 diagrams** — paradigm maps, training loops, decision flowcharts
3. **Python/hvPlot** — masking ratio curves, loss component ablations (synthetic/verified data only)
4. **Web downloads** — during writing if HTML figures unavailable
5. **generate_image** — not recommended for this chapter (data-heavy figures)

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,200–1,500 words

**Content:**
1. Key takeaways (6–7 bullets): two SSL paradigms; DINO lineage v1→v2→v3; emergent segmentation; hybrid losses; data curation at scale; Gram anchoring; method selection
2. Completed concept map (D2 diagram): paradigms → methods → evaluation → deployment
3. Retrieval practice questions (6–7, with answers in collapsed callout):
   - Why does DINO produce segmentation in attention maps but supervised ViT does not?
   - What is the fundamental difference between MAE and DINO objectives?
   - Why does DINOv2 combine three losses instead of using DINO alone?
   - What problem does Gram anchoring solve in DINOv3?
   - When would you choose I-JEPA over DINO?
   - Why does MAE underperform on k-NN but excel after fine-tuning?
4. Common mistakes section (5 items):
   - Using k-NN to evaluate MAE without feature preprocessing
   - Assuming DINOv2 artifacts don't exist
   - Confusing DeiT (supervised distillation) with DINO (self-supervised)
   - Using global [CLS] features from MAE for dense prediction
   - Skipping data curation when scaling SSL
5. Curated resource list:
   - [DINO paper](https://arxiv.org/abs/2104.14294)
   - [DINOv2 paper](https://arxiv.org/abs/2304.07193)
   - [DINOv3 paper](https://arxiv.org/abs/2508.10104)
   - [MAE paper](https://arxiv.org/abs/2111.06377)
   - [DINOv3 GitHub](https://github.com/facebookresearch/dinov3)
   - [Lilian Weng — Self-Supervised Learning](https://lilianweng.github.io/posts/2019-11-10-self-supervised/)

---

## Cross-Cutting Concerns

**Notation table:**

| Symbol | Definition | Valid Values | Example (Maya's retinal ViT-S/16) |
|--------|------------|--------------|-------------------------------------|
| $N$ | Number of image patches | Positive integers | $196$ for $224×224$ image, $16×16$ patches |
| $p$ | Patch size (pixels) | Typically 8, 14, or 16 | $16$ |
| $\mathbf{x}_{\text{cls}}$ | Class token embedding | $\mathbb{R}^d$ | Learnable vector prepended to patch sequence |
| $\mathbf{E}$ | Patch embedding projection | $\mathbb{R}^{d \times cp^2}$ | Linear proj. of flattened $16×16×3$ patch |
| $\theta_s, \theta_t$ | Student / teacher parameters | Model weights | ViT-S weights; $\theta_t$ from EMA |
| $\lambda$ | EMA momentum coefficient | $(0, 1)$ | Typically $\approx 0.996$ (verify from DINO source) |
| $\tau_s, \tau_t$ | Student / teacher temperature | $(0, \infty)$ | Sharpen teacher, smooth student |
| $\mathcal{M}$ | Set of masked patch indices | Subset of $\{1,\ldots,N\}$ | 75% of patches in MAE |
| $P_s, P_t$ | Student / teacher output distributions | Simplex over $K$ prototypes | After softmax + centering |
| $\mathcal{L}_{DINO}$ | Image-level distillation loss | $\mathbb{R}_{\geq 0}$ | Cross-entropy on [CLS] outputs |
| $\mathcal{L}_{iBOT}$ | Patch-level distillation loss | $\mathbb{R}_{\geq 0}$ | Cross-entropy on masked patch tokens |
| $\mathcal{L}_{KoLeo}$ | Feature spreading regularizer | $\mathbb{R}_{\geq 0}$ | Applied to batch of [CLS] features |
| $\mathcal{L}_{MAE}$ | Pixel reconstruction loss | $\mathbb{R}_{\geq 0}$ | MSE on masked patches only |

**Concept map design:** D2 diagram with three columns:
- **Column 1 (input):** Unlabeled images → augmentations OR masking
- **Column 2 (paradigms):** Joint-Embedding box (DINO, MoCo, iBOT) | Masked Modeling box (MAE, BEiT) | Predictive box (I-JEPA)
- **Column 3 (outputs):** [CLS] features | patch features | dense maps
- **Bottom row:** Evaluation modes (linear probe, k-NN, fine-tune) → downstream tasks (classification, segmentation, depth)
- Color: `input` for data, `process` for training objectives, `output` for feature types, `highlight` for DINO lineage path

**Prerequisite knowledge to recap:**
- ViT patch embedding and [CLS] token (brief, from parent chapter)
- Self-attention mechanism (one paragraph)
- Softmax, cross-entropy, MSE loss
- Linear probing vs fine-tuning evaluation

**Common Misconceptions:**
1. **"MAE and DINO are interchangeable."** They optimize different objectives; MAE reconstructs pixels, DINO matches views. Frozen-feature rankings differ sharply (Objectives Matter).
2. **"Self-supervised always beats supervised."** Supervised ViT can win on in-domain classification; SSL wins on label efficiency and emergent dense features.
3. **"DINO attention maps ARE segmentation masks."** They are smooth, not optimized for segmentation; thresholding is a probe, not a trained head.
4. **"DINOv2/DINOv3 features are perfect."** DINOv2 artifacts paper documents grid-like dense feature artifacts at high resolution.
5. **"DeiT is a self-supervised method."** DeiT uses a supervised CNN teacher for distillation — it needs labels (via the teacher), unlike DINO.

**Think Hard questions:**
1. Why does reducing patch size (ViT-S/8 vs /16) disproportionately help DINO's k-NN and segmentation quality?
2. If MAE's [CLS] token aggregates poorly, what mechanisms could fix this without full fine-tuning? (Beyond [cls] paper direction)
3. Does Gram anchoring in DINOv3 solve the artifacts problem from DINOv2, or are they separate issues?
4. Why might I-JEPA outperform DINO on low-level tasks (depth, counting) despite weaker augmentations?
5. When pretraining on medical images (Maya's domain), which parts of web-scale DINOv2/DINOv3 transfer, and which require domain-specific SSL?

**Math Background assessment:** Math Background appendix: **not needed** as a separate file. The chapter uses cross-entropy, MSE, EMA updates, and softmax — all at graduate ML level and derived inline. KoLeo regularizer and Gram anchoring should be explained from source formulas in Sections 4–6, not assumed.
