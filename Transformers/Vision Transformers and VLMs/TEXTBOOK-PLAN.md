# TEXTBOOK-PLAN: Vision Transformers (ViTs) and Vision-Language Models (VLMs)

## User Query
> I want to understand ViTs and VLMs in detail. Assume I understand the details of CNNs and Transformers (but a short recap would be good). Do not hold back on the math. Look for edge cases and think of difficult questions a bright grad student might ask and seek to answer those. Also look for new seminal research findings (which high number of citations) which significantly change our understanding of ViTs and VLMs.

**Topic:** Vision Transformers (ViTs) and Vision-Language Models (VLMs)
**Prior Knowledge:** Strong understanding of CNNs (convolution, pooling, feature hierarchies, translation equivariance) and Transformers (self-attention, multi-head attention, positional encoding, layer normalization, residual connections). Short recap desired.
**Learning Goals:** Deep understanding of ViT architecture and math, how ViTs differ from CNNs internally, self-supervised ViT training methods (DeiT, MAE, DINO), contrastive vision-language learning (CLIP, SigLIP), and the full landscape of VLM architectures (Flamingo, BLIP-2, LLaVA, Llama 3.2 Vision). Include difficult grad-student questions, edge cases, recent seminal findings.
**Target Depth:** Graduate
**Output Folder:** `Transformers/Vision Transformers and VLMs/`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (21 sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [An Image is Worth 16x16 Words (ViT)](https://arxiv.org/abs/2010.11929) | [ACADEMIC] | `sources/arxiv-2010.11929/` | 2020-10 | 2026-02-14 | KEY: Original ViT paper. Patch embedding equations, CLS token, positional embedding, inductive bias discussion. |
| 2 | [DeiT: Training Data-Efficient Image Transformers](https://arxiv.org/abs/2012.12877) | [ACADEMIC] | `sources/arxiv-2012.12877/` | 2020-12 | 2026-02-14 | KEY: Distillation token for ViT training without massive data. 83.1% ImageNet with no external data. |
| 3 | [CLIP: Learning Transferable Visual Models](https://arxiv.org/abs/2103.00020) | [ACADEMIC] | `sources/arxiv-2103.00020/` | 2021-02 | 2026-02-14 | KEY: Contrastive language-image pretraining. 400M pairs, InfoNCE loss, zero-shot transfer, dual encoder architecture. |
| 4 | [Swin Transformer](https://arxiv.org/abs/2103.14030) | [ACADEMIC] | `sources/arxiv-2103.14030/` | 2021-03 | 2026-02-14 | KEY: Shifted window attention, hierarchical ViT, linear complexity. General-purpose backbone for detection/segmentation. |
| 5 | [DINO: Emerging Properties in Self-Supervised ViTs](https://arxiv.org/abs/2104.14294) | [ACADEMIC] | `sources/arxiv-2104.14294/` | 2021-04 | 2026-02-14 | KEY: Self-distillation without labels. Attention maps contain semantic segmentation information. |
| 6 | [XCiT: Cross-Covariance Image Transformers](https://arxiv.org/abs/2106.09681) | [ACADEMIC] | `sources/arxiv-2106.09681/` | 2021-06 | 2026-02-14 | SUPPLEMENTARY: Transposed attention with linear complexity. Relevant for efficient ViT variants. |
| 7 | [Early Convolutions Help Transformers See Better](https://arxiv.org/abs/2106.14881) | [ACADEMIC] | `sources/arxiv-2106.14881/` | 2021-06 | 2026-02-14 | SUPPLEMENTARY: Replacing ViT patch stem with small conv stack improves training stability and performance. |
| 8 | [Do Vision Transformers See Like CNNs?](https://arxiv.org/abs/2108.08810) | [ACADEMIC] | `sources/arxiv-2108.08810/` | 2021-08 | 2026-02-14 | KEY: Striking differences in internal representations. ViTs have more uniform representations, early global aggregation, strong residual propagation. |
| 9 | [MAE: Masked Autoencoders Are Scalable Vision Learners](https://arxiv.org/abs/2111.06377) | [ACADEMIC] | `sources/arxiv-2111.06377/` | 2021-11 | 2026-02-14 | KEY: Self-supervised ViT pretraining. 75% masking ratio, asymmetric encoder-decoder. ViT-H 87.8% on ImageNet-1K. |
| 10 | [Flamingo: a Visual Language Model for Few-Shot Learning](https://arxiv.org/abs/2204.14198) | [ACADEMIC] | `sources/arxiv-2204.14198/` | 2022-04 | 2026-02-14 | KEY: Perceiver Resampler + gated cross-attention. Interleaved image-text sequences. Few-shot VLM. |
| 11 | [BLIP-2: Bootstrapping Language-Image Pre-training](https://arxiv.org/abs/2301.12597) | [ACADEMIC] | `sources/arxiv-2301.12597/` | 2023-01 | 2026-02-14 | KEY: Q-Former bridges frozen vision + language models. 2-stage pretraining. 54x fewer params than Flamingo80B. |
| 12 | [SigLIP: Sigmoid Loss for Language Image Pre-Training](https://arxiv.org/abs/2303.15343) | [ACADEMIC] | `sources/arxiv-2303.15343/` (PDF only) | 2023-03 | 2026-02-14 | KEY: Pairwise sigmoid loss replaces softmax. Better scaling, works with smaller batches. 84.5% ImageNet zero-shot. |
| 13 | [DINOv2: Learning Robust Visual Features without Supervision](https://arxiv.org/abs/2304.07193) | [ACADEMIC] | `sources/arxiv-2304.07193/` | 2023-04 | 2026-02-14 | KEY: Scaled DINO with curated data pipeline. Foundation model features for classification, segmentation, depth without fine-tuning. |
| 14 | [LLaVA: Visual Instruction Tuning](https://arxiv.org/abs/2304.08485) | [ACADEMIC] | `sources/arxiv-2304.08485/` | 2023-04 | 2026-02-14 | KEY: GPT-4 generated instruction data. CLIP ViT + MLP projection + Vicuna LLM. Simple but effective architecture. |
| 15 | [What Matters When Building VLMs? (Idefics2)](https://arxiv.org/abs/2405.02246) | [ACADEMIC] | `sources/arxiv-2405.02246/` | 2024-05 | 2026-02-14 | KEY: Systematic ablation of VLM design decisions. Fully autoregressive + LoRA beats cross-attention. 8B model competitive with 4x larger. |
| 16 | [Cambrian-1: Vision-Centric Exploration of Multimodal LLMs](https://arxiv.org/abs/2406.16860) | [ACADEMIC] | `sources/arxiv-2406.16860/` | 2024-06 | 2026-02-14 | KEY: Multi-encoder approach with Spatial Vision Aggregator. No single encoder is best. Complementary features matter. |
| 17 | [SigLIP 2: Multilingual Vision-Language Encoders](https://arxiv.org/abs/2502.14786) | [ACADEMIC] | `sources/arxiv-2502.14786/` | 2025-02 | 2026-02-14 | KEY: Unified recipe: contrastive + captioning + self-supervised. Improvements at all scales. Better localization. |
| 18 | [ViT-22B: Scaling Vision Transformers to 22B Parameters](https://arxiv.org/abs/2302.05442) | [ACADEMIC] | `sources/arxiv-2302.05442/` | 2023-02 | 2026-02-14 | KEY: Largest dense ViT. Training stability techniques. Linear probe 89.5% ImageNet. |
| 19 | [Generalized Visual Language Models (Lilian Weng)](https://lilianweng.github.io/posts/2022-06-09-vlm/) | [TUTORIAL] | `sources/lilianweng.github.io/posts/2022-06-09-vlm/` | 2022-06 | 2026-02-14 | KEY: Excellent taxonomy of VLM approaches: joint training, frozen prefix, cross-attention, no training. |
| 20 | [D2L.ai: Transformers for Vision](https://d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer.html) | [TUTORIAL] | `sources/d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer/content.md` | 2023 | 2026-02-14 | KEY: Clear pedagogical ViT implementation in PyTorch. Stem, body, head decomposition. |
| 21 | [DINOv2 Artifacts Analysis](https://arxiv.org/abs/2309.16588) | [ACADEMIC] | `sources/arxiv-2309.16588/` | 2023-09 | 2026-02-14 | SUPPLEMENTARY: Artifacts in DINOv2 feature maps not present in DINO. Important for understanding self-supervised ViT limitations. |

:::

---

## Chapter Overview

**Total sections:** 5 body sections + introduction + closing = 7 files
**Estimated total length:** 9,000–12,000 words
**Running example:** **Dr. Maya Chen, a medical imaging researcher** who needs to build an AI system that can (a) classify retinal images for diabetic retinopathy, (b) answer free-text questions about medical scans, and (c) do this with limited labeled medical data. Her journey mirrors the field's progression: she starts with a ViT for classification, discovers she needs better pretraining strategies when her labeled dataset is small, then discovers CLIP-style models for connecting vision with language, and finally builds a VLM that can answer clinical questions about images.

### Hook & Running Example Design

Maya's problem is real and urgent: she has 50,000 retinal fundus images, only 2,000 of which are labeled by ophthalmologists, and she needs a system that can both classify disease severity AND explain its reasoning in natural language to assist clinicians. A CNN-based system she trained on the 2,000 labeled images achieves only 72% accuracy — not good enough for clinical deployment.

Her first breakthrough comes when she learns about Vision Transformers: by treating her retinal images as sequences of patches, she can leverage the same attention mechanism that powers GPT, gaining global receptive fields from layer 1. But ViTs are data-hungry — with only 2,000 labels, she's stuck. Her second breakthrough arrives with self-supervised pretraining: MAE lets her pretrain on all 50,000 unlabeled images by predicting masked patches, and DINOv2 gives her features that already encode anatomical structure without any labels.

The true paradigm shift comes when Maya discovers CLIP and contrastive vision-language learning: she can align her retinal images with ophthalmologists' text reports, creating a model that understands both visual patterns and medical language. Finally, she builds a full VLM — connecting her CLIP-pretrained vision encoder to a language model via a lightweight connector — creating a system that can answer "What abnormalities do you see in this fundus image?" with clinically accurate natural language.

Each section of this chapter follows Maya's journey, using her medical imaging problem to motivate the technical ideas before diving into the math.

---

## Section Plan

### Section 0: Introduction {#sec-introduction}

**File:** `_00-introduction.qmd`
**Estimated length:** 1,000–1,200 words
**Goal:** Set up the chapter's narrative arc; provide a brief CNN and Transformer recap to establish shared vocabulary; introduce the central question: "Can we apply Transformers directly to images?"
**Running example application:** Introduce Maya, her dataset, and why CNNs fall short for her problem (limited data, no language understanding). Tease the chapter's arc.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| ViT Paper | `sources/arxiv-2010.11929/` | `01_introduction.tex` | Motivation for applying Transformers to vision |
| D2L.ai ViT Tutorial | `sources/d2l.ai/.../content.md` | Opening paragraphs | CNN vs ViT framing |

**Content outline:**
1. Maya's medical imaging challenge — why CNNs aren't enough
2. Brief CNN recap (3 paragraphs): convolution as local template matching, feature hierarchies, translation equivariance as inductive bias. Key equation: convolution as $y_{i,j} = \sum_{m,n} K_{m,n} \cdot x_{i+m, j+n}$
3. Brief Transformer recap (3 paragraphs): self-attention as weighted aggregation over all positions, multi-head attention, $O(n^2)$ complexity. Key equation: $\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$
4. The key insight: "What if we treat image patches as tokens?" — setting up Section 1
5. Chapter roadmap: from ViT → what ViTs learn → pretraining → CLIP → VLMs

**Key equations:**
- Convolution: $y_{i,j} = \sum_{m,n} K_{m,n} \cdot x_{i+m, j+n}$
- Self-attention: $\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$

**Visualizations:** None (text-only introduction)
**Source images to embed:** None
**Self-explanation prompts:**
- "Before reading further, how would YOU apply a Transformer to an image? What challenges do you foresee?"

---

### Section 1: From Pixels to Patches — The Vision Transformer Architecture {#sec-vit-architecture}

**File:** `_01-vit-architecture.qmd`
**Estimated length:** 2,000–2,500 words
**Goal:** The reader should understand the full ViT architecture mathematically, including patch embedding, CLS token, positional encoding, and how it differs from CNNs. Also cover the Swin Transformer as the key architectural variant.
**Running example application:** Maya implements ViT for her retinal images. Walk through the exact shapes: 224×224 retinal image → 196 patches of 16×16×3 → linear projection to 768-dim → add CLS token → add positional embeddings → Transformer encoder → classification head.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| ViT Paper | `sources/arxiv-2010.11929/` | `03_method.tex` (all) | Exact equations (Eq 1-4), inductive bias discussion, hybrid architecture |
| ViT Paper | `sources/arxiv-2010.11929/` | `06_appendix.tex` | Self-attention details, model variants table |
| Swin Transformer | `sources/arxiv-2103.14030/` | `main.tex` Section 3 | Shifted window attention, hierarchical design, patch merging |
| D2L.ai ViT Tutorial | `sources/d2l.ai/.../content.md` | Stem, body, head sections | Implementation details, code snippets |
| Early Convolutions Help | `sources/arxiv-2106.14881/` | `vitconv.tex` Section 1-2 | Why convolutional stems improve ViT training stability |

**Content outline:**
1. **The patch embedding** (with Maya's retinal image as concrete example)
   - Reshaping $\mathbf{x} \in \mathbb{R}^{H \times W \times C}$ into $\mathbf{x}_p \in \mathbb{R}^{N \times (P^2 \cdot C)}$
   - Linear projection $\mathbf{E} \in \mathbb{R}^{(P^2 \cdot C) \times D}$
   - The equivalence to a Conv2d with kernel_size=stride=P
   - **Grad student question:** "Is the patch embedding really just a convolution? If so, why not use overlapping patches?" → discuss stride vs kernel size, and the "Early Convolutions" paper showing convolutional stems improve training
2. **The CLS token and positional embeddings**
   - $\mathbf{z}_0 = [\mathbf{x}_\text{class};\, \mathbf{x}^1_p\mathbf{E};\, \ldots;\, \mathbf{x}^N_p\mathbf{E}] + \mathbf{E}_{pos}$
   - Why 1D learned positional embeddings work (and why 2D doesn't help much — from the ViT appendix)
   - The CLS token: borrowed from BERT, aggregates global information
   - **Grad student question:** "Why not just use global average pooling instead of a CLS token?" → discuss the CLS vs GAP debate, cite the finding that they achieve comparable performance but CLS has conceptual advantages for downstream transfer
3. **The Transformer encoder for vision**
   - Pre-norm residual blocks: $\mathbf{z}'_\ell = \text{MSA}(\text{LN}(\mathbf{z}_{\ell-1})) + \mathbf{z}_{\ell-1}$
   - MLP block with GELU: $\mathbf{z}_\ell = \text{MLP}(\text{LN}(\mathbf{z}'_\ell)) + \mathbf{z}'_\ell$
   - Final representation: $\mathbf{y} = \text{LN}(\mathbf{z}_L^0)$
   - **Grad student question:** "Why pre-norm instead of post-norm?" → training stability at scale
4. **Inductive bias: ViT vs CNN**
   - CNNs: locality, weight sharing, translation equivariance baked into every layer
   - ViTs: only MLP layers are local/translationally equivariant; attention layers are global
   - 2D structure used only at patch extraction and (optionally) positional embedding
   - The key result: large-scale training trumps inductive bias
5. **Swin Transformer: hierarchical attention**
   - Shifted window scheme: $O(n)$ instead of $O(n^2)$
   - Patch merging for multi-scale features
   - Why Swin became the preferred backbone for detection/segmentation
6. **Fine-tuning at higher resolution**
   - Keeping patch size constant → more patches → longer sequence
   - 2D interpolation of positional embeddings
   - This is the only remaining "2D inductive bias injection"

**Key equations:**
- Patch embedding: $\mathbf{z}_0 = [\mathbf{x}_\text{class};\, \mathbf{x}^1_p\mathbf{E};\, \ldots;\, \mathbf{x}^N_p\mathbf{E}] + \mathbf{E}_{pos}$, with $\mathbf{E} \in \mathbb{R}^{(P^2 \cdot C) \times D}$, $\mathbf{E}_{pos} \in \mathbb{R}^{(N+1) \times D}$
- Encoder layers: $\mathbf{z}'_\ell = \text{MSA}(\text{LN}(\mathbf{z}_{\ell-1})) + \mathbf{z}_{\ell-1}$ and $\mathbf{z}_\ell = \text{MLP}(\text{LN}(\mathbf{z}'_\ell)) + \mathbf{z}'_\ell$
- Output: $\mathbf{y} = \text{LN}(\mathbf{z}_L^0)$
- Swin window attention complexity: $\Omega(\text{W-MSA}) = 4hwC^2 + 2M^2hwC$ vs global $\Omega(\text{MSA}) = 4hwC^2 + 2(hw)^2C$

**Visualizations:**
- D2 diagram: ViT architecture pipeline (image → patches → linear projection → Transformer → CLS → classification)
- D2 diagram: Swin Transformer shifted window illustration

**Source images to embed:**
- `sources/arxiv-2010.11929/images/model_scheme.png` — ViT architecture overview (MUST include)
- `sources/arxiv-2010.11929/images/visualizations/20200930_position_embeddings_17192124_1.png` — Learned positional embedding similarity (shows 2D structure emerges)
- `sources/arxiv-2103.14030/figs/HiT-arch-v2.png` — Swin Transformer architecture
- `sources/arxiv-2103.14030/figs/HiT-layer2.png` — Swin shifted window mechanism

**Self-explanation prompts:**
- "Given a 384×384 image with patch size 16, how many patches does ViT produce? What is the sequence length including the CLS token?"
- "Why might ViT's lack of inductive bias actually be an advantage at scale?"

---

### Section 2: What Do Vision Transformers Actually Learn? {#sec-vit-internals}

**File:** `_02-what-vits-learn.qmd`
**Estimated length:** 1,800–2,200 words
**Goal:** The reader should understand how ViTs build representations differently from CNNs, what attention heads learn, and be able to critically evaluate claims about ViT behavior.
**Running example application:** Maya wants to understand *why* her ViT model focuses on certain parts of the retinal image. She uses attention visualization to see if the model attends to the optic disc and blood vessels.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Do ViTs See Like CNNs? | `sources/arxiv-2108.08810/` | `arxiv.tex` Sections 3-5 | Key findings: uniform representations, early global aggregation, residual propagation |
| ViT Paper | `sources/arxiv-2010.11929/` | `06_appendix.tex` | Attention distance by depth figure, attention head examples |
| DINO Paper | `sources/arxiv-2104.14294/` | `approach.tex`, `ablations.tex` | Self-attention heads learn semantic segmentation |
| Dissecting Query-Key Interaction (2405.14880) | N/A (web search) | — | Early layers: perceptual grouping (similar tokens). Late layers: contextual info (dissimilar tokens). |
| Transformer Limitations (2402.08164) | N/A (web search) | — | Compositional failures, relational reasoning limitations |

**Content outline:**
1. **Five key differences between ViT and CNN representations** (from Raghu et al.)
   - More uniform representations across layers (vs hierarchical CNN features)
   - Early aggregation of global information via self-attention
   - Strong feature propagation via residual connections
   - Spatial information preserved until the final layer
   - ViTs can attend to distant patches from layer 1 — CNNs need many layers to achieve this
2. **What attention heads learn: the dual role of self-attention**
   - Early layers: attend to similar tokens (perceptual grouping — texture, color)
   - Late layers: attend to dissimilar tokens (contextual information)
   - Some heads learn distance-based patterns (local attention), others learn semantic patterns
   - The attention distance plot: early heads vary widely, later heads attend globally
3. **Positional embeddings: emergent 2D structure**
   - Despite using 1D learned positional embeddings, 2D spatial structure emerges
   - The positional embedding similarity matrix shows grid patterns
   - Row and column structure spontaneously learned from data
4. **Visualizing ViT decisions: methods and pitfalls**
   - Attention rollout (simple but naive — not all heads are equally important)
   - Gradient-weighted attention rollout (weights heads by gradient importance)
   - GradCAM adapted for ViTs (reshape token dimension to spatial grid)
   - **Grad student question:** "Can we just look at attention maps to understand what ViTs attend to?" → No — attention rollout ignores head importance, and attention ≠ contribution
5. **The misconceptions about Vision Transformers**
   - Misconception 1: "ViTs just learn convolutions" → They learn fundamentally different representations
   - Misconception 2: "Attention = importance" → Attention heads can attend broadly without contributing to the final output
   - Misconception 3: "Deeper is always better" → Deeper ViTs can actually decrease representational accuracy (untrained LayerNorm issue)
   - Misconception 4: "ViTs can do any visual reasoning" → They fail at relational/compositional tasks (same/different, spatial relations)

**Key equations:**
- Attention distance: $d_\text{attn}(h, \ell) = \frac{1}{N} \sum_{i=1}^{N} \sum_{j=1}^{N} A^{(h,\ell)}_{ij} \cdot \|p_i - p_j\|$
- CKA similarity between layer representations (for comparing ViT vs CNN layers)

**Visualizations:**
- Attention distance by depth plot (from ViT paper)
- Positional embedding similarity heatmap
- DINO attention maps showing semantic segmentation

**Source images to embed:**
- `sources/arxiv-2010.11929/images/visualizations/20201002_attention_distance_by_depth_main.png` — Attention distance by depth (shows early layers have both local and global heads)
- `sources/arxiv-2010.11929/images/visualizations/20201002_selected_attention_examples.png` — Example attention maps for different heads
- `sources/arxiv-2010.11929/images/head_tokens.png` — CLS token attention across heads and layers

**Self-explanation prompts:**
- "If ViTs can attend globally from layer 1, why don't they just ignore local structure entirely?"
- "Why would a self-supervised ViT (DINO) learn better semantic segmentation maps than a supervised ViT?"

---

### Section 3: Training ViTs — From Data Hunger to Self-Supervision {#sec-training-vits}

**File:** `_03-training-vits.qmd`
**Estimated length:** 2,000–2,500 words
**Goal:** The reader should understand why ViTs need special training recipes, the major self-supervised pretraining paradigms (DeiT distillation, MAE, DINO/DINOv2, BEiT), and how scaling laws apply to ViTs.
**Running example application:** Maya has only 2,000 labeled retinal images. She explores DeiT's distillation to learn from a CNN teacher, MAE's self-supervised pretraining on her 50,000 unlabeled images, and DINOv2's pretrained features for direct use without fine-tuning.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| DeiT Paper | `sources/arxiv-2012.12877/` | `introduction.tex`, `training.tex`, `token.tex` | Distillation token, hard vs soft distillation, training recipe |
| MAE Paper | `sources/arxiv-2111.06377/` | `mae.tex` | Asymmetric encoder-decoder, 75% masking ratio, reconstruction loss |
| DINO Paper | `sources/arxiv-2104.14294/` | `approach.tex` | Self-distillation: student-teacher with EMA, centering, sharpening |
| DINOv2 Paper | `sources/arxiv-2304.07193/` | `main.tex` Sections 2-3 | Curated data pipeline, 1B param teacher → distill to smaller models |
| ViT-22B | `sources/arxiv-2302.05442/` | `main.tex` Sections 2-3 | Training stability at scale: QK-norm, parallel layers, Adafactor |
| ViT Paper | `sources/arxiv-2010.11929/` | `04_experiments.tex` | Data requirements: ViT needs 14M+ images to beat ResNet |

**Content outline:**
1. **The data hunger problem** (with Maya's concrete scenario)
   - ViT-B trained from scratch on ImageNet-1K: ~79% (vs ResNet-50: ~80%)
   - ViT-L pre-trained on JFT-300M then fine-tuned: 87.8% — data scale is crucial
   - **Key plot:** ImageNet accuracy vs pre-training dataset size (ViT vs ResNet)
2. **DeiT: Learning from a CNN teacher**
   - The distillation token: a new learnable token (like CLS) trained to match CNN teacher output
   - Hard distillation (argmax of teacher) vs soft distillation (KL divergence)
   - Surprising finding: hard label distillation outperforms soft
   - The training recipe: strong data augmentation (RandAugment, Mixup, CutMix), Repeated Augmentation, label smoothing, stochastic depth
   - **Grad student question:** "Why does distilling from a CNN teacher into a ViT student work so well?" → The CNN teacher provides implicit locality bias that the ViT learns to internalize
3. **MAE: Learning by predicting masked patches**
   - Asymmetric design: encoder sees only visible patches (25%), decoder reconstructs all patches
   - Why asymmetry matters: encoder never processes mask tokens → much faster training
   - Mean squared error loss on pixel values of masked patches
   - Why 75% masking works: images have high spatial redundancy; low masking is too easy
   - Comparison to BERT's 15% masking: language has higher information density per token
   - **Grad student question:** "Why reconstruct pixels instead of learned tokens (like BEiT)?" → MAE shows pixel reconstruction works just as well and is simpler; BEiT's discrete tokens add unnecessary complexity for image classification
4. **DINO and DINOv2: Self-distillation and emerging properties**
   - Teacher-student framework with exponential moving average
   - Multi-crop training: global views (224×224) for teacher, local crops (96×96) for student
   - Centering + sharpening to prevent collapse
   - The remarkable finding: self-attention heads learn semantic segmentation without supervision
   - DINOv2 improvements: curated data pipeline, 1B param → distilled, foundation model features
   - **Grad student question:** "Why do DINO attention maps look like segmentation masks?" → The self-distillation objective forces the student to match the teacher's output for different crops of the same image, implicitly learning object boundaries
5. **Scaling laws for Vision Transformers**
   - "Getting ViT in Shape" (SoViT): shape-optimized ViTs match models 2× their size
   - Optimal scaling: width × 1.5, depth × 2.0, MLP × 2.6 per 10× compute increase
   - ViT-22B: training stability at scale requires QK-normalization, parallel attention+FFN, Adafactor
   - **Key insight:** Shape matters more than raw parameter count

**Key equations:**
- MAE reconstruction loss: $\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| \hat{\mathbf{x}}_i - \mathbf{x}_i \|^2$
- DINO loss: $\mathcal{L} = -\sum_{x \in \{x_1^g, x_2^g\}} \sum_{x' \neq x} p_t(x') \log p_s(x)$, where $p_s$ and $p_t$ are sharpened softmax outputs of student and teacher
- DeiT distillation: $\mathcal{L} = (1-\lambda)\mathcal{L}_\text{CE}(y_\text{cls}, y) + \lambda\mathcal{L}_\text{KD}(y_\text{dist}, y_\text{teacher})$

**Visualizations:**
- D2 diagram: MAE encoder-decoder architecture (encoder → visible patches only → lightweight decoder → full reconstruction)
- D2 diagram: DINO self-distillation pipeline (student-teacher with EMA, multi-crop)

**Source images to embed:**
- `sources/arxiv-2010.11929/images/dataset_analysis/imagenet_5shot.png` — Performance vs pre-training dataset size
- `sources/arxiv-2111.06377/fig/arch.png` — MAE architecture (asymmetric encoder-decoder)
- `sources/arxiv-2111.06377/fig/mask_sampling.png` — MAE masking examples (25% visible)

**Self-explanation prompts:**
- "Why does MAE use 75% masking while BERT uses only 15%? What does this tell us about the information density of images vs text?"
- "If you only had 5,000 unlabeled medical images, which pretraining strategy would you choose: MAE, DINO, or DeiT with a CNN teacher? Why?"

---

### Section 4: From Seeing to Understanding — CLIP and Contrastive Vision-Language Learning {#sec-clip}

**File:** `_04-clip-and-contrastive-learning.qmd`
**Estimated length:** 2,000–2,500 words
**Goal:** The reader should understand the CLIP training objective mathematically (InfoNCE loss), the SigLIP improvement, how zero-shot transfer works mechanically, and the significance of the contrastive paradigm for connecting vision and language.
**Running example application:** Maya realizes that her retinal images come paired with ophthalmologists' text reports. She can use CLIP-style contrastive learning to align visual features with clinical language, enabling zero-shot classification: "Is this image consistent with proliferative diabetic retinopathy?"

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| CLIP Paper | `sources/arxiv-2103.00020/` | `clip_paper.tex` Section 2 (Approach) | Training objective, architecture choices, temperature parameter, training details |
| CLIP Paper | `sources/arxiv-2103.00020/` | `clip_paper.tex` Section 3 (Experiments) | Zero-shot transfer results, prompt engineering |
| SigLIP Paper | `sources/arxiv-2303.15343/` | `paper.pdf` | Sigmoid loss, batch size analysis, efficiency improvements |
| SigLIP 2 Paper | `sources/arxiv-2502.14786/` | `document.tex` Sections 2-3 | Unified training recipe, captioning + self-supervised losses |
| Lilian Weng Blog | `sources/lilianweng.github.io/.../2022-06-09-vlm/` | Full post | VLM taxonomy, cross-attention mechanisms |

**Content outline:**
1. **The contrastive insight: matching not generating** (with Maya's paired data)
   - Why predicting exact captions is 3× slower than contrastive matching
   - From generative to contrastive: predicting "which text goes with which image"
   - CLIP's efficiency advantage over caption-generating models
2. **CLIP architecture deep dive**
   - Dual encoder: image encoder (ViT-L/14@336px or ResNet) + text encoder (Transformer)
   - No shared weights between encoders
   - Linear projection to shared embedding space (not nonlinear — this matters!)
   - Text encoder uses [EOS] token representation (like CLS)
   - **Grad student question:** "Why does CLIP use a linear projection instead of a nonlinear MLP?" → Nonlinear projections may be co-adapted with self-supervised image-only methods; at CLIP's scale, linear is sufficient
3. **The InfoNCE loss: mathematical derivation**
   - Given batch of $N$ (image, text) pairs, compute $N \times N$ similarity matrix
   - $\mathcal{L} = -\frac{1}{N}\sum_{i=1}^{N}\left[\log\frac{\exp(\text{sim}(\mathbf{I}_i, \mathbf{T}_i)/\tau)}{\sum_{j=1}^{N}\exp(\text{sim}(\mathbf{I}_i, \mathbf{T}_j)/\tau)} + \log\frac{\exp(\text{sim}(\mathbf{T}_i, \mathbf{I}_i)/\tau)}{\sum_{j=1}^{N}\exp(\text{sim}(\mathbf{T}_i, \mathbf{I}_j)/\tau)}\right]$
   - Symmetric cross-entropy: image→text matching + text→image matching
   - Temperature $\tau$: log-parameterized, learned during training, initialized to 0.07
   - **Grad student question:** "Why is the temperature learned, and why does it need to be clipped?" → Controls the peakiness of the softmax distribution over similarities. Too small → training instability (gradients explode); too large → uniform distribution (no learning signal). CLIP clips $\tau$ to prevent logits exceeding 100.
4. **SigLIP: from softmax to sigmoid**
   - Problem with InfoNCE: requires global normalization across the batch (communication overhead in distributed training)
   - SigLIP uses pairwise sigmoid: $\mathcal{L} = -\frac{1}{N}\sum_{i=1}^{N}\sum_{j=1}^{N}\left[y_{ij}\log\sigma(z_{ij}\cdot\tau + b) + (1-y_{ij})\log(1-\sigma(z_{ij}\cdot\tau + b))\right]$
   - Each (image, text) pair is independently classified as matching or not
   - Advantages: no global communication needed, better at small batch sizes, scales to 1M batch size
   - SigLIP 2 (2025): unified recipe adding captioning loss + self-supervised losses (self-distillation, masked prediction). Better localization and dense features.
5. **Zero-shot transfer: how it actually works**
   - At test time: embed class names as text → compute similarity with image embedding → argmax
   - Prompt engineering: "a photo of a {class}" beats just "{class}" by ~3%
   - Why prompt templates matter: training data is captions, not class names
   - The conceptual leap: from fixed label sets to open-vocabulary classification
   - **Key result:** CLIP matches ResNet-50 on ImageNet zero-shot (no training examples)
6. **What CLIP representations encode (and don't)**
   - CLIP features are semantic, not just visual — they encode language-grounded concepts
   - Limitations: CLIP struggles with spatial relationships, counting, negation
   - CLIP neurons activated by semantic concepts, not low-level features

**Key equations:**
- Cosine similarity: $\text{sim}(\mathbf{I}, \mathbf{T}) = \frac{\mathbf{I} \cdot \mathbf{T}}{\|\mathbf{I}\| \cdot \|\mathbf{T}\|}$
- InfoNCE (symmetric): $\mathcal{L}_\text{CLIP} = \frac{1}{2}\left(\mathcal{L}_{I \to T} + \mathcal{L}_{T \to I}\right)$, where $\mathcal{L}_{I \to T} = -\frac{1}{N}\sum_i \log\frac{\exp(\text{sim}(\mathbf{I}_i, \mathbf{T}_i)/\tau)}{\sum_j\exp(\text{sim}(\mathbf{I}_i, \mathbf{T}_j)/\tau)}$
- SigLIP loss: $\mathcal{L}_\text{SigLIP} = -\frac{1}{N}\sum_{i,j} \log\sigma\left((-1)^{\mathbb{1}[i \neq j]}(z_{ij}\tau + b)\right)$

**Visualizations:**
- D2 diagram: CLIP training (batch of N image-text pairs → similarity matrix → contrastive loss)
- hvPlot or D2: Comparison of InfoNCE vs SigLIP loss surfaces

**Source images to embed:**
- `sources/arxiv-2103.00020/main-diagrams.png` — CLIP overview (dual encoder + contrastive training + zero-shot inference)
- `sources/arxiv-2103.00020/pseudocode.png` — CLIP pseudocode (numpy-like)
- `sources/arxiv-2103.00020/zero-shot-transfer.png` — Zero-shot transfer performance across datasets
- `sources/arxiv-2502.14786/figures/siglip2_overview_figure.png` — SigLIP 2 training recipe overview

**Self-explanation prompts:**
- "Why is contrastive learning more efficient than generative (caption prediction) learning for vision-language alignment?"
- "What happens if you increase the batch size to infinity in the InfoNCE loss? How does this relate to mutual information?"

---

### Section 5: The VLM Architecture Zoo — Building Multimodal Intelligence {#sec-vlm-zoo}

**File:** `_05-vlm-architecture-zoo.qmd`
**Estimated length:** 2,200–2,800 words
**Goal:** The reader should understand the canonical VLM blueprint (vision encoder → connector → LLM), the key architectural variants (cross-attention vs autoregressive), specific systems (Flamingo, BLIP-2, LLaVA, Llama 3.2 Vision), and what recent ablation studies tell us about optimal VLM design.
**Running example application:** Maya builds her final system: a VLM that takes retinal images and answers clinical questions. She evaluates different architectures — should she use cross-attention (Flamingo-style) or a simple MLP connector (LLaVA-style)? Should she freeze the LLM or fine-tune with LoRA?

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Flamingo Paper | `sources/arxiv-2204.14198/` | `content.tex` Sections 2-4 | Perceiver Resampler, gated cross-attention, interleaved data |
| BLIP-2 Paper | `sources/arxiv-2301.12597/` | Sections 2-3 | Q-Former architecture, 2-stage pretraining, frozen models |
| LLaVA Paper | `sources/arxiv-2304.08485/` | `subtex/approach.tex` | MLP projection, visual instruction tuning, GPT-4 data generation |
| Idefics2 Paper | `sources/arxiv-2405.02246/` | `sections/model_architecture_choice.tex` | Architecture ablations, LoRA findings, perceiver vs no perceiver |
| Cambrian-1 Paper | `sources/arxiv-2406.16860/` | `arxiv.tex` Sections 2-3 | Multi-encoder, Spatial Vision Aggregator, no single encoder is best |
| Lilian Weng Blog | `sources/lilianweng.github.io/.../2022-06-09-vlm/` | Full taxonomy | Four VLM approaches: joint training, frozen prefix, cross-attention, no training |
| SigLIP 2 Paper | `sources/arxiv-2502.14786/` | Sections 4-5 | Vision encoder survey: training methodology > encoder size |

**Content outline:**
1. **The canonical VLM blueprint** (with Maya building her system)
   - Three components: vision encoder (CLIP/SigLIP/DINOv2) → connector → LLM
   - The design space: what to freeze, what to train, how to connect
   - Lilian Weng's taxonomy: (a) joint training, (b) frozen prefix, (c) cross-attention, (d) no training
2. **Flamingo: cross-attention with a Perceiver Resampler**
   - Perceiver Resampler: condenses spatiotemporal visual features into fixed-size tokens (64 or 128)
   - Gated cross-attention dense layers: inserted between LM layers, with learnable gating initialized to 0
   - Interleaved image-text input handling with masked cross-attention
   - Frozen vision encoder (NFNet) + frozen LM (Chinchilla 70B), only train cross-attention + resampler
   - **Grad student question:** "Why initialize the gating parameter to 0?" → So the model initially behaves exactly like the pre-trained LM, preserving language capabilities during early training
3. **BLIP-2: Q-Former bridges frozen models**
   - Two-stage pretraining: (1) vision-language representation from frozen image encoder, (2) generative from frozen LLM
   - Q-Former: lightweight transformer with learned query tokens that extract visual information
   - Cross-attention between learned queries and image encoder output
   - Self-attention among query tokens + text tokens
   - 54× fewer trainable parameters than Flamingo80B, better zero-shot VQA
4. **LLaVA: the surprisingly effective MLP**
   - Architecture: CLIP ViT-L/336px → 2-layer MLP → Vicuna-13B
   - Why an MLP works: the projection just needs to align embedding spaces, not transform features
   - GPT-4 generated instruction tuning data (158K samples)
   - Two-stage training: (1) align projector with caption data, (2) instruction fine-tune end-to-end
   - **Grad student question:** "Why does a simple MLP connector work as well as Q-Former?" → At sufficient resolution and with proper instruction tuning, the bottleneck isn't the connector but the data and training recipe
5. **Llama 3.2 Vision and modern cross-attention adapters**
   - Cross-attention layers added to frozen Llama 3.1 text backbone
   - Vision adapter bridges pre-trained image encoder to LLM
   - 6B image-text training pairs, SFT + RLHF
   - The trend: building on strong pre-trained text models rather than training from scratch
6. **What actually matters: lessons from Idefics2 and Cambrian-1**
   - **Idefics2 key findings:**
     - Fully autoregressive + LoRA (69.5%) beats cross-attention + LoRA (67.3%)
     - SigLIP-SO400M at 384px matches EVA-CLIP-5B at 224px
     - Resolution matters more than encoder size for OCR tasks
   - **Cambrian-1 key findings:**
     - No single vision encoder is best across all tasks
     - Self-supervised (DINO) and language-supervised (CLIP/SigLIP) encoders capture complementary features
     - Spatial Vision Aggregator (SVA) dynamically integrates multi-encoder features
   - **SigLIP 2 finding:** Training methodology > encoder size. A 400M SigLIP 2 outperforms 6B InternViT
   - **The connector design space:** Feature-preserving (retain all patch tokens) vs feature-compressing (reduce tokens)

**Key equations:**
- Perceiver Resampler: $\mathbf{Z} = \text{CrossAttn}(\mathbf{Q}_\text{learned}, \mathbf{K}_\text{visual}, \mathbf{V}_\text{visual})$, where $\mathbf{Q}_\text{learned} \in \mathbb{R}^{M \times D}$ and $M \ll N_\text{patches}$
- Q-Former queries: $\mathbf{Q} \in \mathbb{R}^{32 \times D}$, interact with image features via cross-attention
- LLaVA projection: $\mathbf{H}_v = W \cdot g(\mathbf{Z}_v)$, where $g$ is a 2-layer MLP with GELU
- Gated cross-attention (Flamingo): $\mathbf{y} = \tanh(\alpha) \cdot \text{CrossAttn}(\mathbf{x}, \mathbf{v}) + \mathbf{x}$, with $\alpha$ initialized to 0

**Visualizations:**
- D2 diagram: VLM blueprint comparison (Flamingo vs BLIP-2 vs LLaVA vs Llama 3.2 side by side)
- D2 diagram: Connector taxonomy tree (feature-preserving vs feature-compressing)

**Source images to embed:**
- `sources/arxiv-2204.14198/figures/fig2_overview_interleaved_v2.png` — Flamingo architecture overview
- `sources/arxiv-2204.14198/figures/fig3_resampler.png` — Perceiver Resampler detail
- `sources/arxiv-2204.14198/figures/fig4_xattn_dense.png` — Gated cross-attention dense layer
- `sources/arxiv-2301.12597/image/fig1.png` — BLIP-2 overview (Q-Former bridging frozen models)
- `sources/arxiv-2301.12597/image/fig2.png` — BLIP-2 Q-Former architecture detail
- `sources/arxiv-2304.08485/figures/llava_arch.png` — LLaVA architecture
- `sources/arxiv-2405.02246/images/architecture_idefics2.png` — Idefics2 architecture
- `sources/arxiv-2406.16860/Figures/VisionConnector/sva.png` — Cambrian-1 Spatial Vision Aggregator
- `sources/arxiv-2406.16860/Figures/VisionBackbone/mllm_interface_shared.png` — VLM interface comparison

**Self-explanation prompts:**
- "If you were building a VLM today with a limited compute budget, which architecture pattern would you choose? Consider the trade-offs between Flamingo-style cross-attention and LLaVA-style MLP projection."
- "Why might using multiple vision encoders (Cambrian-1) outperform scaling a single encoder?"

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,200–1,500 words

**Content:**

1. **Key takeaways (7 bullet points)**
   - ViT treats images as sequences of patches, applying standard Transformers to vision with minimal inductive bias
   - ViTs learn fundamentally different representations than CNNs: more uniform across layers, with early global information aggregation
   - Self-supervised pretraining (MAE, DINO) eliminates the need for massive labeled datasets
   - CLIP's contrastive learning connects vision and language, enabling zero-shot classification via natural language
   - SigLIP's sigmoid loss removes the need for global batch normalization, improving efficiency and scalability
   - VLM architecture is a three-part pipeline: vision encoder → connector → LLM, with the connector being the key design choice
   - Recent ablation studies show that training methodology and data quality matter more than raw model size

2. **Completed concept map (D2 diagram)**
   - Nodes: CNN → ViT → DeiT/MAE/DINO → CLIP/SigLIP → Flamingo/BLIP-2/LLaVA → Modern VLMs
   - Connections: architectural innovations, training paradigm shifts, component reuse

3. **Retrieval practice questions (7, with answers in collapsed callout)**
   - Q1: Write the ViT patch embedding equation. What are the dimensions of $\mathbf{E}$ and $\mathbf{E}_{pos}$?
   - Q2: Why does ViT use pre-norm (LayerNorm before attention) instead of post-norm?
   - Q3: What is the fundamental difference between MAE and DINO as self-supervised methods?
   - Q4: Derive the CLIP InfoNCE loss for a batch of $N=4$ pairs. How many positive and negative examples are there?
   - Q5: Why does SigLIP not need global batch normalization while CLIP does?
   - Q6: Compare the connector designs of BLIP-2 (Q-Former) and LLaVA (MLP). When would you prefer each?
   - Q7: Explain the Idefics2 finding that "fully autoregressive + LoRA" beats "cross-attention + LoRA." Why might this be?

4. **Common mistakes section**
   - Confusing attention weights with feature importance (attention ≠ contribution)
   - Thinking ViTs need massive datasets (DeiT, MAE, DINO solve this)
   - Assuming bigger encoder = better VLM (SigLIP 2 at 400M outperforms 6B models)
   - Ignoring resolution when comparing vision encoders (resolution matters for OCR)
   - Using CLS token features when patch-level features would be better (for dense tasks)

5. **Curated resource list**
   - [D2L.ai ViT Tutorial](https://d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer.html) — Best code-first ViT introduction
   - [Lilian Weng: Generalized Visual Language Models](https://lilianweng.github.io/posts/2022-06-09-vlm/) — Excellent VLM taxonomy
   - [pytorch-grad-cam](https://github.com/jacobgil/pytorch-grad-cam) — ViT visualization tools
   - [Google big_vision](https://github.com/google-research/big_vision) — Reference ViT/SigLIP implementations
   - [Cambrian-1 GitHub](https://github.com/cambrian-mllm/cambrian) — Multi-encoder VLM framework

---

## Source Image Catalog

**These are images from the downloaded sources that should be embedded in the chapter.**
The writing agent should copy these to `Transformers/Vision Transformers and VLMs/images/` and embed them in the appropriate sections.

| # | Source Image Path | Caption (from paper) | Relevant Section(s) | Notes |
|---|---|---|---|---|
| 1 | `sources/arxiv-2010.11929/images/model_scheme.png` | "Model overview. We split an image into fixed-size patches, linearly embed each of them, add position embeddings, and feed the resulting sequence of vectors to a standard Transformer encoder." | §1 Architecture | ViT architecture — MUST include |
| 2 | `sources/arxiv-2010.11929/images/visualizations/20200930_position_embeddings_17192124_1.png` | "Position embedding similarity. Each patch's position embedding compared to all others, showing emergent 2D structure." | §1 Architecture, §2 What ViTs Learn | Shows learned 2D spatial structure from 1D embeddings |
| 3 | `sources/arxiv-2010.11929/images/visualizations/20201002_attention_distance_by_depth_main.png` | "Mean attention distance for each head across layers. Some heads attend locally, others globally, from the lowest layers." | §2 What ViTs Learn | Critical for understanding attention head diversity |
| 4 | `sources/arxiv-2010.11929/images/visualizations/20201002_selected_attention_examples.png` | "Example attention maps for different heads and layers." | §2 What ViTs Learn | Visual evidence of what attention heads learn |
| 5 | `sources/arxiv-2010.11929/images/head_tokens.png` | "Attention from CLS token to all patch tokens, showing which patches the model attends to for classification." | §2 What ViTs Learn | CLS token attention patterns |
| 6 | `sources/arxiv-2010.11929/images/dataset_analysis/imagenet_5shot.png` | "Few-shot ImageNet accuracy vs pre-training dataset size for ViT and ResNet." | §3 Training ViTs | Key data requirements plot |
| 7 | `sources/arxiv-2103.14030/figs/HiT-arch-v2.png` | "Swin Transformer architecture with hierarchical feature maps and shifted window attention." | §1 Architecture | Swin architecture overview |
| 8 | `sources/arxiv-2103.14030/figs/HiT-layer2.png` | "Shifted window approach for computing self-attention." | §1 Architecture | Shifted window mechanism detail |
| 9 | `sources/arxiv-2111.06377/fig/arch.png` | "MAE architecture. During pre-training, the encoder operates only on visible patches (25%). The decoder reconstructs the full image." | §3 Training ViTs | MAE architecture — MUST include |
| 10 | `sources/arxiv-2111.06377/fig/mask_sampling.png` | "Example masked images (75% masked). The model must reconstruct masked patches." | §3 Training ViTs | Visual intuition for MAE masking |
| 11 | `sources/arxiv-2103.00020/main-diagrams.png` | "Summary of CLIP. Jointly train image and text encoders with contrastive loss. At test time, synthesize zero-shot classifiers from text." | §4 CLIP | CLIP overview — MUST include |
| 12 | `sources/arxiv-2103.00020/pseudocode.png` | "Numpy-like pseudocode for the core of an implementation of CLIP." | §4 CLIP | CLIP pseudocode |
| 13 | `sources/arxiv-2103.00020/zero-shot-transfer.png` | "Zero-shot CLIP vs. few-shot linear probes on various datasets." | §4 CLIP | Zero-shot transfer evidence |
| 14 | `sources/arxiv-2502.14786/figures/siglip2_overview_figure.png` | "SigLIP 2 training recipe: contrastive + captioning + self-supervised losses." | §4 CLIP | SigLIP 2 architecture |
| 15 | `sources/arxiv-2204.14198/figures/fig2_overview_interleaved_v2.png` | "Flamingo overview: processing interleaved image-text sequences with Perceiver Resampler and gated cross-attention." | §5 VLM Zoo | Flamingo architecture — MUST include |
| 16 | `sources/arxiv-2204.14198/figures/fig3_resampler.png` | "Perceiver Resampler: produces a fixed number of visual output tokens." | §5 VLM Zoo | Perceiver Resampler detail |
| 17 | `sources/arxiv-2204.14198/figures/fig4_xattn_dense.png` | "Gated cross-attention dense layer with tanh gating." | §5 VLM Zoo | Cross-attention mechanism detail |
| 18 | `sources/arxiv-2301.12597/image/fig1.png` | "BLIP-2 framework: bootstrap vision-language pre-training from frozen models." | §5 VLM Zoo | BLIP-2 overview — MUST include |
| 19 | `sources/arxiv-2301.12597/image/fig2.png` | "Q-Former architecture: querying transformer with learned queries." | §5 VLM Zoo | Q-Former detail |
| 20 | `sources/arxiv-2304.08485/figures/llava_arch.png` | "LLaVA network architecture." | §5 VLM Zoo | LLaVA architecture |
| 21 | `sources/arxiv-2405.02246/images/architecture_idefics2.png` | "Idefics2 architecture comparison." | §5 VLM Zoo | Architecture comparison |
| 22 | `sources/arxiv-2406.16860/Figures/VisionConnector/sva.png` | "Spatial Vision Aggregator for multi-encoder feature integration." | §5 VLM Zoo | Cambrian-1 connector |
| 23 | `sources/arxiv-2406.16860/Figures/VisionBackbone/mllm_interface_shared.png` | "VLM interface: vision encoder → connector → LLM." | §5 VLM Zoo | Canonical VLM blueprint |

**Priority order for visuals (the writing agent should follow this):**

1. **Source images from downloaded papers** — already in `sources/`. Canonical, authoritative, and high-quality.
2. **D2 diagrams** — for concept maps, flowcharts, and structural diagrams.
3. **Python/hvPlot** — for data visualizations, distributions, and function plots.
4. **Web downloads** — for images not in sources/ (search and download during writing).
5. **generate_image** — only as a last resort for custom illustrations.

---

## Cross-Cutting Concerns

**Notation table:**

| Symbol | Meaning |
|--------|---------|
| $\mathbf{x} \in \mathbb{R}^{H \times W \times C}$ | Input image (height × width × channels) |
| $\mathbf{x}_p \in \mathbb{R}^{N \times (P^2 \cdot C)}$ | Flattened image patches |
| $N = HW/P^2$ | Number of patches |
| $P$ | Patch size (e.g., 16) |
| $D$ | Transformer hidden dimension |
| $L$ | Number of Transformer layers |
| $\mathbf{E} \in \mathbb{R}^{(P^2 \cdot C) \times D}$ | Patch embedding projection matrix |
| $\mathbf{E}_{pos} \in \mathbb{R}^{(N+1) \times D}$ | Positional embedding matrix |
| $\mathbf{x}_\text{class}$ | Learnable CLS token |
| $\mathbf{z}_\ell$ | Hidden state at layer $\ell$ |
| $\text{MSA}(\cdot)$ | Multi-head self-attention |
| $\text{LN}(\cdot)$ | Layer normalization |
| $\tau$ | Temperature parameter (in contrastive loss) |
| $\text{sim}(\cdot, \cdot)$ | Cosine similarity |
| $\mathbf{I}_i, \mathbf{T}_i$ | Image and text embeddings for pair $i$ |
| $\sigma(\cdot)$ | Sigmoid function |
| $\mathcal{M}$ | Set of masked patch indices (MAE) |
| $\mathbf{Q}_\text{learned}$ | Learned query tokens (Q-Former, Perceiver) |

**Concept map design:**
- **Nodes:** CNN → ViT (patch embedding, CLS token, positional encoding) → ViT Training (DeiT, MAE, DINO, DINOv2) → Contrastive Learning (CLIP, SigLIP, SigLIP 2) → VLM Connectors (MLP, Q-Former, Perceiver Resampler, Cross-Attention) → VLM Systems (Flamingo, BLIP-2, LLaVA, Llama 3.2, Cambrian-1)
- **Connections:** "architecture", "pretraining paradigm", "frozen component", "trainable component"
- **Semantic classes:** Architecture nodes (blue), Training nodes (green), Contrastive nodes (orange), VLM nodes (purple)

**Prerequisite knowledge to recap:**
- CNN convolution operation, pooling, feature hierarchies (brief recap in intro)
- Self-attention mechanism, multi-head attention, positional encoding, LN, residual connections (brief recap in intro)
- BERT CLS token concept (brief mention in §1)
- Softmax and cross-entropy loss (used throughout)

**Common Misconceptions:**
1. "ViTs are just CNNs with extra steps" → They learn fundamentally different representations (§2)
2. "You need JFT-300M to train a ViT" → DeiT, MAE, and DINO solve this (§3)
3. "Attention maps = what the model looks at" → Attention ≠ contribution; need gradient methods (§2)
4. "Bigger vision encoder = better VLM" → Training recipe > size (SigLIP 2 result, §4-5)
5. "Q-Former is obviously better than a simple MLP" → LLaVA's MLP + good data is competitive (§5)
6. "ViTs can do any visual reasoning" → They fail at relational/compositional tasks (§2)
7. "CLIP = caption generation" → CLIP uses contrastive matching, NOT generation (§4)

**Difficult grad-student questions:**
1. "Is the ViT patch embedding really just a convolution? If so, what makes ViT different from a CNN at the first layer?" → Yes, mathematically equivalent to Conv2d with kernel=stride=P. The difference is that subsequent layers use global self-attention instead of local convolutions. (§1)
2. "Why does DINO learn semantic segmentation without supervision?" → Self-distillation with multi-crop forces the student to match teacher outputs for different views of the same object, implicitly learning object boundaries as invariant features. (§3)
3. "Why does MAE use 75% masking while BERT uses only 15%?" → Images have much higher spatial redundancy than language — neighboring pixels are highly correlated, so you need to mask much more to create a non-trivial task. (§3)
4. "In the InfoNCE loss, what happens as batch size N → ∞?" → The loss converges to maximizing a lower bound on mutual information I(Image; Text). The tightness of the bound improves with N, which is why CLIP uses batch sizes of 32K. (§4)
5. "Why initialize Flamingo's gating parameter to 0?" → So the model starts as the exact pre-trained LM with no visual input, preventing catastrophic forgetting of language capabilities during early VLM training. (§5)
