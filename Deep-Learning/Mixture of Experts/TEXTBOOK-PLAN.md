# TEXTBOOK-PLAN: Mixture of Experts in Transformers

## User Query
> I want to understand Mixture-of-experts models in transformers and other deep learning variants. Particularly, I want to understand this answer in depth: "How do Mixture of Experts (MoE) models learn to distribute work evenly when the act of 'picking' an expert is a non-differentiable step function?" The user provided a detailed LinkedIn-style post explaining the differentiability paradox: the distinction between the Count (discrete, non-differentiable fraction of tokens routed to an expert) and the Probability (continuous, differentiable average softmax score), and how the auxiliary loss multiplies these two quantities to chain differentiable math to actual assignments. The user also referenced three key papers: Shazeer et al. 2017 (the OG MoE paper), Fedus et al. 2021 (Switch Transformers), and Gale et al. 2022 (MegaBlocks).

**Topic:** Mixture of Experts (MoE) in Transformers
**Prior Knowledge:** The reader understands standard transformer architecture (self-attention, FFN layers), softmax, backpropagation, and basic optimization. They do NOT know how MoE works.
**Learning Goals:** Deep understanding of: (1) what MoE layers are and where they sit in a transformer, (2) how routing/gating works and why top-k creates a differentiability problem, (3) the exact mechanism of the auxiliary load-balancing loss (the f_i * P_i trick), (4) why naive approaches fail, (5) capacity factors and token dropping, (6) modern alternatives (expert choice routing, auxiliary-loss-free balancing, ReLU routing), (7) real-world MoE architectures (Mixtral, DeepSeek-V3).
**Target Depth:** Graduate
**Output Folder:** `Deep-Learning/Mixture of Experts`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (30+ sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [Outrageously Large Neural Networks: The Sparsely-Gated MoE Layer (Shazeer et al., ICLR 2017)](https://arxiv.org/abs/1701.06538) | [ACADEMIC] | `sources/arxiv-1701.06538/` | 2017-01-23 | 2026-03-15 | KEY: The foundational modern MoE paper. Introduces noisy top-k gating, importance loss, and load-balancing loss. Contains the canonical MoE architecture diagram. 4109 citations. |
| 2 | [Switch Transformers: Scaling to Trillion Parameter Models (Fedus et al., JMLR 2021)](https://arxiv.org/abs/2101.03961) | [ACADEMIC] | `sources/arxiv-2101.03961/` | 2021-01-11 | 2026-03-15 | KEY: Simplifies MoE to top-1 routing, introduces the canonical f_i * P_i auxiliary loss formulation, capacity factor, and token dropping. 3440 citations. |
| 3 | [MegaBlocks: Efficient Sparse Training with MoE (Gale et al., MLSys 2023)](https://arxiv.org/abs/2211.15841) | [ACADEMIC] | `sources/arxiv-2211.15841/` | 2022-11-29 | 2026-03-15 | KEY: Block-sparse GPU kernels for MoE, eliminating token dropping. Key for understanding modern efficient MoE implementations. |
| 4 | [GShard: Scaling Giant Models with Conditional Computation (Lepikhin et al., 2020)](https://arxiv.org/abs/2006.16668) | [ACADEMIC] | `sources/arxiv-2006.16668/` | 2020-06-30 | 2026-03-15 | KEY: 600B parameter MoE for translation. Introduces top-2 gating with random routing for the second expert. Contains excellent MoE architecture diagrams. |
| 5 | [Mixture-of-Experts with Expert Choice Routing (Zhou et al., NeurIPS 2022)](https://arxiv.org/abs/2202.09368) | [ACADEMIC] | `sources/arxiv-2202.09368/` | 2022-02-18 | 2026-03-15 | KEY: Reverses routing: experts choose tokens instead of tokens choosing experts. Achieves perfect load balance by construction. |
| 6 | [Auxiliary-Loss-Free Load Balancing Strategy for MoE (Wang et al., 2024)](https://arxiv.org/abs/2408.15664) | [ACADEMIC] | `sources/arxiv-2408.15664/` | 2024-08-28 | 2026-03-15 | KEY: The DeepSeek loss-free balancing approach. Uses dynamic bias terms instead of auxiliary losses. Eliminates interference gradients. |
| 7 | [DeepSeek-V3 Technical Report (DeepSeek-AI, 2024)](https://arxiv.org/abs/2412.19437) | [ACADEMIC] | `sources/arxiv-2412.19437/` | 2024-12-27 | 2026-03-15 | KEY: 671B MoE with 37B active params. Uses auxiliary-loss-free balancing and multi-token prediction. State of the art open-source model. |
| 8 | [Mixtral of Experts (Jiang et al., 2024)](https://arxiv.org/abs/2401.04088) | [ACADEMIC] | `sources/arxiv-2401.04088/` | 2024-01-08 | 2026-03-15 | KEY: 47B total / 13B active params, top-2 routing across 8 experts. Popularized open-source MoE models. |
| 9 | [ReMoE: Fully Differentiable MoE with ReLU Routing (Wang et al., ICLR 2025)](https://arxiv.org/abs/2412.14711) | [ACADEMIC] | `sources/arxiv-2412.14711/` | 2024-12-19 | 2026-03-15 | KEY: Replaces TopK+Softmax routing entirely with ReLU, achieving full differentiability. Shows the field is actively solving the differentiability paradox. |
| 10 | [Demons in the Detail: On Implementing Load Balancing Loss (Qiu et al., 2025)](https://arxiv.org/abs/2501.11873) | [ACADEMIC] | `sources/arxiv-2501.11873/` | 2025-01-21 | 2026-03-15 | KEY: Shows micro-batch vs global-batch LBL calculation matters hugely. Micro-batch inhibits expert specialization. |
| 11 | [HuggingFace: Mixture of Experts Explained](https://huggingface.co/blog/moe) | [TUTORIAL] | `sources/huggingface.co/blog/moe/content.md` | 2023 | 2026-03-15 | KEY: 47K char comprehensive guide. Covers basics, training, serving, fine-tuning. Good overview for the tutorial angle. |
| 12 | [Cameron Wolfe — "MoE: The Birth and Rise of Conditional Computation"](https://cameronrwolfe.substack.com/p/conditional-computation-the-birth) | [TUTORIAL] | `sources/cameronrwolfe.substack.com/p/conditional-computation-the-birth/content.md` | 2024 | 2026-03-15 | KEY: 83K char deep dive on MoE history from Jacobs 1991 to modern transformers. Excellent exposition. |
| 13 | [Cameron Wolfe — "MoE LLMs"](https://cameronrwolfe.substack.com/p/moe-llms) | [TUTORIAL] | `sources/cameronrwolfe.substack.com/p/moe-llms/content.md` | 2024 | 2026-03-15 | KEY: 81K char on modern MoE LLMs (Grok, DeepSeek-v3). Covers practical deployment and efficiency. |
| 14 | [Maarten Grootendorst — "A Visual Guide to MoE"](https://www.maartengrootendorst.com/blog/moe/) | [TUTORIAL] | `sources/maartengrootendorst.com/blog/moe/content.md` | 2024 | 2026-03-15 | KEY: 47K char visual-first explanation. 50+ diagrams. Good for visual learners. |
| 15 | [Michael Brenndoerfer — "Auxiliary Balancing Loss in MoE"](https://mbrenndoerfer.com/writing/auxiliary-balancing-loss-mixture-of-experts-moe) | [TUTORIAL] | N/A (web reference) | 2024 | 2026-03-15 | KEY: Interactive article on the auxiliary loss formulation. Clear mathematical walk-through. |
| 16 | [Michael Brenndoerfer — "Top-K Routing in MoE"](https://mbrenndoerfer.com/writing/top-k-routing-mixture-of-experts-expert-selection) | [TUTORIAL] | N/A (web reference) | 2024 | 2026-03-15 | KEY: Interactive guide to top-k routing mechanics. |
| 17 | [Michael Brenndoerfer — "Gating Networks: Router Architecture"](https://mbrenndoerfer.com/writing/moe-gating-networks-router-architecture-design) | [TUTORIAL] | N/A (web reference) | 2024 | 2026-03-15 | KEY: Router architecture design details. |
| 18 | [Michael Brenndoerfer — "MoE Load Balancing: Token Distribution & Expert Collapse"](https://mbrenndoerfer.com/writing/moe-load-balancing-expert-collapse-token-distribution) | [TUTORIAL] | N/A (web reference) | 2024 | 2026-03-15 | KEY: Expert collapse dynamics explained. |
| 19 | [Epoch AI — "How do MoE models compare to dense models in inference?"](https://epochai.substack.com/p/how-do-mixture-of-experts-models-24-12-20) | [TUTORIAL] | N/A (web reference) | 2024-12-20 | 2026-03-15 | KEY: Thorough analysis of dense vs sparse inference economics. Prefill vs decoding tradeoffs. |
| 20 | [Adaptive Mixtures of Local Experts (Jacobs, Jordan, Nowlan, Hinton, 1991)](https://doi.org/10.1162/neco.1991.3.1.79) | [ACADEMIC] | N/A (original, not on arXiv) | 1991 | 2026-03-15 | KEY: The original 1991 MoE paper. Introduced gating network + expert network framework. |
| 21 | [HuggingFace: MoEs in Transformers (Feb 2026)](https://huggingface.co/blog/moe-transformers) | [TUTORIAL] | N/A (web reference) | 2026-02 | 2026-03-15 | Covers MoE as first-class citizens in HF Transformers library. |
| 22 | [Lilian Weng — "How to Train Really Large Models on Many GPUs?"](https://lilianweng.github.io/posts/2021-09-25-train-large/) | [TUTORIAL] | N/A (web reference) | 2021-09-25 | 2026-03-15 | Mentions MoE in context of distributed training. Expert choice routing update. |
| 23 | [makeMoE: Implement a Sparse MoE from Scratch (HuggingFace blog)](https://huggingface.co/blog/AviSoori1x/makemoe-from-scratch) | [TUTORIAL] | N/A (web reference) | 2024 | 2026-03-15 | Practical from-scratch MoE implementation. |
| 24 | [Routing and Balancing Losses with MoE (DEV Community)](https://forem.com/lewis_won/routing-and-balancing-losses-with-mixture-of-experts-19be) | [COMMUNITY] | N/A (web reference) | 2024 | 2026-03-15 | Concise summary of routing variants and losses. |
| 25 | [Theoretical Framework for ALF-LB (Han & Zhong, 2025)](https://arxiv.org/abs/2512.03915) | [ACADEMIC] | N/A (referenced) | 2025-12-03 | 2026-03-15 | Theoretical analysis of DeepSeek's loss-free balancing as primal-dual optimization. |
| 26 | [Cameron Wolfe — "nanoMoE: MoE from Scratch in PyTorch"](https://cameronrwolfe.substack.com/p/nano-moe) | [TUTORIAL] | N/A (web reference) | 2025 | 2026-03-15 | From-scratch PyTorch MoE implementation guide. |
| 27 | [HuggingFace — "Review of Load Balancing in MoE LLMs"](https://huggingface.co/blog/NormalUhr/moe-balance) | [TUTORIAL] | N/A (web reference) | 2025 | 2026-03-15 | Historical evolution of load balancing strategies. |
| 28 | [Coupling Experts and Routers via Auxiliary Loss (2025)](https://arxiv.org/abs/2512.23447) | [ACADEMIC] | N/A (referenced) | 2025-12 | 2026-03-15 | Expert-Router Coupling loss. Novel auxiliary loss approach. |
| 29 | [Sebastian Raschka — "A Dream of Spring for Open-Weight LLMs"](https://magazine.sebastianraschka.com/p/a-dream-of-spring-for-open-weight) | [TUTORIAL] | N/A (web reference) | 2026-02 | 2026-03-15 | Covers recent MoE architectures (Trinity, Qwen3-MoE). |
| 30 | [The 4 MoE Architectures (Towards AI, 2026)](https://pub.towardsai.net/the-4-mixture-of-experts-architectures-how-to-train-100b-models-at-10b-cost-be8038b224e0) | [COMMUNITY] | N/A (web reference) | 2026-02 | 2026-03-15 | Taxonomy of MoE architectural patterns. |

:::

---

## Chapter Overview

**Total sections:** 6 (plus closing)
**Estimated total length:** 10,000-12,000 words
**Running example:** A single transformer layer processing the sentence "The bank approved the loan for the riverside property." The word "bank" must be routed to an expert that understands finance (for "approved the loan") or geography (for "riverside property"), depending on context. This sentence provides a concrete, revisitable example of why different tokens need different experts, why routing is hard, and why load balance matters (if all ambiguous words go to one "disambiguation expert," that expert becomes a bottleneck).

### Hook & Running Example Design

Imagine you run a hospital emergency department with eight specialist doctors on call: a cardiologist, a neurologist, a trauma surgeon, and so on. When a patient arrives, the triage nurse must decide instantly which specialist to send them to. The nurse cannot consult the doctors first (too slow), cannot send the patient to all eight (too expensive), and must make this assignment before knowing the diagnosis. Worse, the nurse must learn to triage from scratch, with no medical training, by observing which assignments produce good outcomes.

This is exactly the situation inside a Mixture of Experts transformer layer. Each token (our "patient") enters the layer, a small router network (our "triage nurse") computes a quick score for each expert (our "specialists"), and the top-k scoring experts process the token. The router learns entirely through backpropagation. There is no hand-coded rulebook.

But here is the paradox that trips up nearly everyone who studies MoE: the act of picking the top-k experts is a hard, discrete decision. You either send the patient to the cardiologist or you don't. There is no "send 60% of the patient." In calculus terms, the gradient of a hard selection is zero almost everywhere, and undefined at the boundary. So how does the router learn anything at all? The answer, which we will build toward through this chapter, involves a clever trick: the model tracks two separate quantities (the actual fraction of tokens sent to each expert, and the average probability the router assigns to each expert) and multiplies them together in an auxiliary loss. This multiplication chains differentiable probability gradients to non-differentiable assignment counts, allowing the model to learn balanced routing despite the discrete selection step.

We will start from the basics: what is an MoE layer, and where does it sit inside a transformer? Then we will build up the gating/routing mechanism, confront the differentiability paradox head-on, derive the auxiliary loss, and trace the evolution from the 2017 Shazeer paper through Switch Transformers, Expert Choice, Mixtral, and DeepSeek-V3's auxiliary-loss-free approach. By the end, you will understand not just the "what" of MoE, but the "why" behind every design decision.

**Hook Image:** The canonical MoE architecture diagram from Shazeer et al. 2017 (`sources/arxiv-1701.06538/moe-bigpicture2.png`), which shows an MoE layer embedded within a recurrent language model with the gating network selecting two experts. This bridges the hospital triage analogy to the actual architecture: you can see the "triage nurse" (gating network) at the top, the "specialists" (expert networks) at the bottom, and the sparse selection. We will also use the Switch Transformer's simplified architecture diagram (`sources/arxiv-2101.03961/images/Attention_Switch_Transformer.png`) to show how MoE fits into the modern transformer stack.

---

## Section Plan

### Section 1: What Is a Mixture of Experts? {#sec-what-is-moe}

**File:** `_01-what-is-moe.qmd`
**Estimated length:** 1,800-2,000 words
**Goal:** The reader understands what an MoE layer is, where it sits inside a transformer, and why sparse conditional computation is valuable. They should be able to draw the architecture from memory.
**Running example application:** Introduce the sentence "The bank approved the loan for the riverside property." Show which part of the transformer gets replaced by MoE (the FFN layer). Each token enters the MoE layer and gets routed to a small subset of expert FFNs.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Shazeer et al. 2017 | `sources/arxiv-1701.06538/main.tex` | Section 1 (Intro) + Section 2 (Structure of MoE layer) | The MoE output equation y = Σ G(x)_i E_i(x). The big-picture diagram. |
| Switch Transformers | `sources/arxiv-2101.03961/21-0998.tex` | Section 2.1 | Switch Transformer architecture diagram. How MoE replaces FFN. |
| GShard | `sources/arxiv-2006.16668/` | Figures: transformer_enc_moe_and_ff.png, moe.png | Architecture diagrams comparing standard FFN vs MoE replacement. |
| HuggingFace MoE Guide | `sources/huggingface.co/blog/moe/content.md` | Opening sections | Accessible explanation of dense vs sparse. |
| Cameron Wolfe Part 1 | `sources/cameronrwolfe.substack.com/p/conditional-computation-the-birth/content.md` | History section | The 1991 Jacobs/Jordan/Nowlan/Hinton origin story. |
| Maarten Grootendorst | `sources/maartengrootendorst.com/blog/moe/content.md` | Dense vs Sparse section | Visual comparison of dense vs sparse layers. |

**Content outline:**
1. The idea of conditional computation: not all parameters active for every input (motivation from scaling)
2. History: Jacobs et al. 1991 introduced MoE with gating networks + expert networks
3. The modern MoE layer: replace the FFN in a transformer with N expert FFNs + a router
4. The core equation: $y = \sum_{i=1}^{n} G(x)_i E_i(x)$, with worked numerical example
5. Dense vs sparse: total parameters vs active parameters (Mixtral: 47B total, 13B active)
6. Where MoE layers go: every-other layer, every layer, or selectively

**Key equations:** The MoE output equation (Eq. 1 from Shazeer 2017).
**Visualizations:**
- Source image: MoE big picture from Shazeer 2017 (moe-bigpicture2.png)
- Source image: Switch Transformer architecture (Attention_Switch_Transformer.png)
- Source image: GShard MoE vs FFN comparison (transformer_enc_moe_and_ff.png)
- D2 concept map: Dense FFN vs MoE FFN side-by-side
**Source images to embed:** `sources/arxiv-1701.06538/moe-bigpicture2.png`, `sources/arxiv-2101.03961/images/Attention_Switch_Transformer.png`, `sources/arxiv-2006.16668/transformer_enc_moe_and_ff.png`

---

### Section 2: Routing — How the Router Picks Experts {#sec-routing}

**File:** `_02-routing.qmd`
**Estimated length:** 2,000-2,200 words
**Goal:** The reader understands the full routing pipeline (linear projection → noisy logits → top-k selection → softmax normalization → weighted combination), and confronts the differentiability paradox: top-k is a hard discrete operation with zero gradients.
**Running example application:** Walk through the routing for the token "bank." Show the router computing scores for 8 experts, adding Gaussian noise, selecting top-2, and applying softmax only over those 2. Show the actual numbers: logits, post-noise logits, which experts survive top-k, and the final gate weights.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Shazeer et al. 2017 | `sources/arxiv-1701.06538/main.tex` | Section 2.1 (Gating Network), Eqs 2-5 | The noisy top-k gating equations: H(x), KeepTopK, G(x). |
| Switch Transformers | `sources/arxiv-2101.03961/21-0998.tex` | Section 2 | Simplified top-1 routing. |
| GShard | `sources/arxiv-2006.16668/` | Model section | Top-2 routing with random second expert. |
| Mixtral | `sources/arxiv-2401.04088/main.tex` | Architecture section | Top-2 routing across 8 experts in a modern LLM. |
| Brenndoerfer — Top-K Routing | N/A (web) | Full article | Interactive explanation of top-k selection. |
| Brenndoerfer — Gating Networks | N/A (web) | Full article | Router architecture design. |

**Content outline:**
1. The router as a simple linear layer: $h(x) = W_g \cdot x$ where $W_g \in \mathbb{R}^{d_{model} \times n}$
2. Noisy top-k gating (Shazeer 2017): add Gaussian noise before top-k to encourage exploration
3. The KeepTopK operation: keep top k values, set rest to $-\infty$
4. Softmax over surviving experts only: produces gate weights that sum to 1 over the k selected experts
5. **The differentiability paradox:** The KeepTopK function is a hard step function. Its gradient is zero almost everywhere. During the forward pass, it works fine (you just pick the top k). During backpropagation, the gradient is zero for all non-selected experts and undefined at the selection boundary. So how does the router learn?
6. Why gradients DO flow to the selected experts: softmax is differentiable over the k surviving logits. The router learns which experts to prefer for which tokens through the softmax-weighted outputs. But it has NO gradient signal about non-selected experts. This is the core asymmetry.
7. Top-1 (Switch) vs Top-2 (GShard/Mixtral) tradeoffs: simplicity vs stability

**Key equations:**
- $H(x)_i = (x \cdot W_g)_i + \text{StandardNormal}() \cdot \text{Softplus}((x \cdot W_{noise})_i)$
- $G(x) = \text{Softmax}(\text{KeepTopK}(H(x), k))$
- The KeepTopK piecewise definition
- The Mixtral formulation: $y = \sum_{i \in \text{Top}_2(x)} G(x)_i \cdot E_i(x)$

**Visualizations:**
- D2 diagram: The full routing pipeline (input token → linear projection → noise → top-k → softmax → weighted sum)
- hvPlot: Visualization of softmax scores across 8 experts for the token "bank," showing how top-2 selection zeros out 6 experts
- D2 diagram: The gradient flow problem (forward path works, backward path has zero gradients for non-selected experts)
**Source images to embed:** None (custom diagrams preferred here)

---

### Section 3: The Auxiliary Load-Balancing Loss — Bridging Discrete and Differentiable {#sec-load-balancing-loss}

**File:** `_03-load-balancing-loss.qmd`
**Estimated length:** 2,200-2,500 words
**Goal:** This is the CORE section of the chapter. The reader understands: (1) why expert collapse happens, (2) the exact formulation of the auxiliary loss (the f_i * P_i trick), (3) WHY it works (multiplying a non-differentiable count by a differentiable probability chains gradients to assignments), (4) why simpler alternatives fail, and (5) the hyperparameter α and its tradeoffs.
**Running example application:** Show a batch of 8 tokens being routed to 4 experts. Walk through the f_i and P_i vectors numerically. Show what happens when experts are imbalanced (f = [0.5, 0.25, 0.25, 0.0]) vs balanced (f = [0.25, 0.25, 0.25, 0.25]). Compute the loss in both cases. Show the gradient flow.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Switch Transformers | `sources/arxiv-2101.03961/21-0998.tex` | Lines 253-279: "A Differentiable Load Balancing Loss" | THE canonical formulation: loss = α · N · Σ(f_i · P_i), with f_i (Eq 2) and P_i (Eq 3). |
| Shazeer et al. 2017 | `sources/arxiv-1701.06538/main.tex` | Section "Balancing Expert Utilization" (lines 167-182) | The importance loss L_importance = w · CV(Importance(X))^2 and separate load loss. |
| Demons in the Detail | `sources/arxiv-2501.11873/` | Main findings | Why micro-batch vs global-batch calculation of f_i matters hugely. |
| Brenndoerfer — Auxiliary Loss | N/A (web) | Full article | Clear mathematical walk-through of the loss. |
| Brenndoerfer — Load Balancing | N/A (web) | Full article | Expert collapse dynamics. |

**Content outline:**
1. **Expert collapse: the self-reinforcing death spiral.** If Expert 3 starts slightly better, it receives more tokens, gets more gradient updates, improves further, and the router sends it even more tokens. Soon, Expert 3 handles 80% of all tokens while Experts 1, 2, and 4 atrophy. This wastes most of the model's parameters.
2. **Shazeer's original approach (2017):** Two separate losses: (a) L_importance = CV(Importance)^2, where Importance is the batchwise sum of gate values. This encourages equal total gate weight but doesn't guarantee equal token counts. (b) A separate load-balancing loss (in the appendix).
3. **Switch Transformers' unified formulation (2021):** The key insight. Define two vectors across N experts:
   - $f_i$: the fraction of tokens actually dispatched to expert $i$ (an indicator function, non-differentiable)
   - $P_i$: the average router probability allocated to expert $i$ (a softmax average, differentiable)
   - The loss: $\mathcal{L}_{aux} = \alpha \cdot N \cdot \sum_{i=1}^{N} f_i \cdot P_i$
4. **Why the multiplication works (the deep insight):** The f-vector is non-differentiable (it's a count). The P-vector IS differentiable (it's a softmax average). The product $f_i \cdot P_i$ creates a quantity where the gradient with respect to the router weights flows through $P_i$, but the MAGNITUDE of that gradient is scaled by $f_i$. If expert $i$ has a high count (many tokens), the gradient pushing down its probability is large. If expert $i$ has a low count, the gradient is small. This is how the discrete world (actual assignments) influences the continuous world (probability gradients).
5. **Why only tracking P_i fails:** If you only penalize high $P_i$ without considering $f_i$, the router can cheat. It assigns a near-100% softmax score to expert 3 on a few tokens (inflating $P_3$) while routing most tokens elsewhere. High confidence, zero utilization. The multiplication with $f_i$ catches this.
6. **Why only tracking f_i fails:** $f_i$ has zero gradients (it's a step function). You can't optimize it directly. There is no way to backpropagate through an argmax.
7. **The scaling factor:** $\alpha = 10^{-2}$ in Switch Transformers. Too large → overwhelms the primary task loss → model learns to balance but not to solve the task. Too small → expert collapse. The N factor keeps the loss constant as expert count varies.
8. **Worked numerical example:** Compute loss for imbalanced vs balanced case. Show the gradient direction.

**Key equations:**
- $f_i = \frac{1}{T} \sum_{x \in \mathcal{B}} \mathbb{1}\{\text{argmax } p(x) = i\}$
- $P_i = \frac{1}{T} \sum_{x \in \mathcal{B}} p_i(x)$
- $\mathcal{L}_{aux} = \alpha \cdot N \cdot \sum_{i=1}^{N} f_i \cdot P_i$
- The minimum of $\sum f_i P_i$ under uniform routing: $\sum (1/N)(1/N) = 1/N$

**Visualizations:**
- D2 diagram: The expert collapse death spiral (positive feedback loop: better expert → more tokens → more training → even better → even more tokens)
- hvPlot: Bar chart showing f_i and P_i for a balanced vs imbalanced scenario (side by side)
- D2 diagram: Gradient flow through the f_i * P_i product (showing where gradients are zero and where they flow)
- hvPlot: The loss landscape as a function of routing distribution (showing the minimum at uniform)
**Source images to embed:** None (custom visualizations for this section)

---

### Section 4: Capacity Factors, Token Dropping, and the Systems View {#sec-capacity-and-systems}

**File:** `_04-capacity-and-systems.qmd`
**Estimated length:** 1,500-1,800 words
**Goal:** The reader understands the practical systems-level challenges: capacity factors (how many tokens can each expert handle?), token dropping (what happens when an expert overflows?), the MegaBlocks approach (dropless MoE), and the tension between balance and specialization.
**Running example application:** Continue the batch of 8 tokens across 4 experts. With capacity factor 1.25, each expert can handle at most 1.25 * (8/4) = 2.5 → rounded to 3 tokens. Show what happens when Expert 3 receives 5 tokens but can only handle 3: 2 tokens are dropped.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Switch Transformers | `sources/arxiv-2101.03961/21-0998.tex` | Capacity factor section | The capacity factor formula and design choices. |
| MegaBlocks | `sources/arxiv-2211.15841/main.tex` | Main paper | Block-sparse approach that eliminates token dropping entirely. |
| Demons in the Detail | `sources/arxiv-2501.11873/` | Global vs micro-batch | Micro-batch LBL inhibits specialization; global-batch preserves it. |
| HuggingFace MoE Guide | `sources/huggingface.co/blog/moe/content.md` | Training and serving sections | Practical challenges: VRAM, all-to-all communication. |

**Content outline:**
1. **Capacity factor:** When N experts share a batch of T tokens, each expert's "fair share" is T/N. The capacity factor $C$ sets the maximum tokens per expert to $C \cdot T/N$. Typical values: 1.0-1.5.
2. **Token dropping:** If more tokens than the capacity are routed to one expert, excess tokens are dropped (skipped, passed through a residual connection). This can hurt model quality.
3. **The MegaBlocks solution:** Use block-sparse matrix operations to allow variable-sized expert batches. No token dropping needed. Key insight: reframe MoE as a block-sparse matrix multiplication.
4. **The balance-specialization tradeoff:** The "Demons in the Detail" paper shows that aggressive per-micro-batch load balancing forces uniform routing even within domain-specific sequences (e.g., code), preventing expert specialization. Global-batch balancing is better: balance over the corpus, not per sequence.
5. **Systems costs:** All-to-all communication, memory footprint (all experts must be in memory), expert parallelism.

**Key equations:**
- Expert capacity: $\text{capacity} = C \cdot T / N$
- Effective compute: only $k/N$ of parameters active per token

**Visualizations:**
- Source image: MegaBlocks token dropping diagram (`sources/arxiv-2211.15841/images/token-dropping.png`)
- Source image: MegaBlocks block-sparse format (`sources/arxiv-2211.15841/images/block-sparse-format.png`)
- Source image: MegaBlocks vs standard MoE explained (`sources/arxiv-2211.15841/images/mixture-of-experts-explained.png`)
- D2 diagram: Capacity overflow scenario (tokens being dropped when expert is full)
**Source images to embed:** `sources/arxiv-2211.15841/images/token-dropping.png`, `sources/arxiv-2211.15841/images/block-sparse-format.png`, `sources/arxiv-2211.15841/images/mixture-of-experts-explained.png`

---

### Section 5: Beyond Top-K — Alternative Routing Strategies {#sec-alternative-routing}

**File:** `_05-alternative-routing.qmd`
**Estimated length:** 1,800-2,000 words
**Goal:** The reader understands three major alternatives to standard top-k+auxiliary-loss routing: (1) Expert Choice routing (Zhou et al., NeurIPS 2022), (2) Auxiliary-Loss-Free Load Balancing (Wang et al. / DeepSeek, 2024), and (3) Fully Differentiable Routing via ReLU (ReMoE, ICLR 2025). Each solves the differentiability/balance problem differently.
**Running example application:** Revisit the 8 tokens / 4 experts scenario under each routing paradigm. In Expert Choice, each expert picks its top-2 tokens (instead of each token picking top-2 experts). In Loss-Free Balancing, expert biases shift routing without auxiliary gradients. In ReMoE, all experts compute continuous gate values via ReLU.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Expert Choice Routing | `sources/arxiv-2202.09368/` | Main paper | Reversed routing paradigm. Experts select tokens, not vice versa. |
| Loss-Free Balancing | `sources/arxiv-2408.15664/` | Main paper | Dynamic bias terms, no auxiliary loss, no interference gradients. |
| DeepSeek-V3 | `sources/arxiv-2412.19437/` | Architecture section | How loss-free balancing works at 671B scale. |
| ReMoE | `sources/arxiv-2412.14711/` | Main paper | ReLU routing replaces TopK+Softmax entirely. Full differentiability. |
| Epoch AI | N/A (web) | Full article | Dense vs MoE inference tradeoffs. |

**Content outline:**
1. **Expert Choice Routing (Zhou et al., NeurIPS 2022):** Flip the routing: instead of each token choosing its top-k experts, each expert chooses its top-k tokens. This guarantees perfect load balance by construction (each expert processes exactly $k$ tokens). Tokens may go to 0, 1, or many experts. 2x faster training convergence than Switch Transformer.
2. **Auxiliary-Loss-Free Load Balancing (DeepSeek, 2024):** The auxiliary loss produces "interference gradients" that conflict with the task loss. Solution: add an expert-wise bias $b_i$ to the routing scores before top-k selection. After each training step, increase $b_i$ for underloaded experts and decrease it for overloaded ones. This is a control-theoretic approach (the bias acts as a feedback controller). No gradient interference because the biases are not part of the loss.
3. **ReMoE: Fully Differentiable Routing (ICLR 2025):** Replace the entire TopK+Softmax pipeline with ReLU: $G(x)_i = \text{ReLU}(W_g \cdot x + b)_i$. ReLU is differentiable everywhere except at 0 (where it has a subgradient). Sparsity emerges naturally (many ReLU outputs are zero). No need for top-k at all. Outperforms vanilla TopK MoE across model sizes.
4. **Comparison table:** Summarize all routing strategies (Standard Top-K, Expert Choice, Loss-Free, ReMoE) on dimensions: differentiability, load balance mechanism, token dropping, implementation complexity, empirical results.

**Key equations:**
- Expert Choice: $S_{ij} = \text{Softmax}(W_g \cdot x_j)_i$, then each expert $i$ selects top-k tokens by $S_{ij}$
- Loss-Free: $\tilde{s}_i = s_i + b_i$, then top-k on $\tilde{s}$. Update: $b_i \leftarrow b_i - \gamma \cdot \text{sign}(f_i - 1/N)$
- ReMoE: $G(x)_i = \text{ReLU}(W_g x + b)_i$

**Visualizations:**
- D2 diagram: "Token chooses expert" vs "Expert chooses token" (side by side)
- Source image: Expert Choice figure from the paper (`sources/arxiv-2202.09368/figs/` if available, or from Switch Transformers `ec_fig_v1.png`)
- Source image: Loss-free balancing dynamics (`sources/arxiv-2408.15664/figs/EC_fig.png`)
- D2 diagram: Timeline showing how biases adapt in loss-free balancing
**Source images to embed:** `sources/arxiv-2101.03961/images/ec_fig_v1.png`, `sources/arxiv-2408.15664/figs/EC_fig.png`

---

### Section 6: MoE in the Wild — Mixtral, DeepSeek-V3, and the Modern Landscape {#sec-moe-in-the-wild}

**File:** `_06-moe-in-the-wild.qmd`
**Estimated length:** 1,500-1,800 words
**Goal:** The reader understands how MoE is deployed in modern production LLMs. They can explain the architecture of Mixtral 8x7B and DeepSeek-V3, understand the tradeoffs between dense and MoE models for inference, and appreciate why MoE is becoming the dominant paradigm at the frontier.
**Running example application:** Conclude the running example by placing our MoE layer inside a Mixtral-style architecture. Show that our token "bank" passes through 32 layers, each with a different top-2 expert selection. The selected experts may differ at each layer, so the token "accesses" different subsets of the total parameter space at each layer.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Mixtral | `sources/arxiv-2401.04088/main.tex` | Full paper | 8 experts, top-2, 47B/13B active, Apache 2.0 license. |
| DeepSeek-V3 | `sources/arxiv-2412.19437/` | Architecture + training sections | 671B/37B active, loss-free balancing, multi-token prediction, 14.8T tokens. |
| Cameron Wolfe MoE LLMs | `sources/cameronrwolfe.substack.com/p/moe-llms/content.md` | Grok, DeepSeek sections | Modern MoE LLM landscape. |
| Sebastian Raschka | N/A (web) | Architecture comparison | Qwen3-MoE, Trinity, and other recent models. |
| Epoch AI | N/A (web) | Dense vs MoE inference | When MoE wins vs dense at inference. |
| HuggingFace MoE Guide | `sources/huggingface.co/blog/moe/content.md` | Serving section | Fine-tuning and serving challenges. |

**Content outline:**
1. **Mixtral 8x7B (Jan 2024):** Architecture (same as Mistral 7B but with 8 expert FFNs per layer, top-2 routing). 47B total, 13B active. Matches Llama 2 70B at much lower inference cost. The paper that popularized open-source MoE.
2. **DeepSeek-V3 (Dec 2024):** 671B total, 37B active. Uses DeepSeekMoE architecture with fine-grained experts (more, smaller experts). Auxiliary-loss-free balancing. Multi-token prediction. Trained on 14.8T tokens for only 2.788M H800 GPU hours. Remarkably stable training with no loss spikes.
3. **The dense vs MoE inference tradeoff:** MoE models require ALL experts in memory, even though only $k/N$ activate. Prefill (processing input) can be memory-bandwidth-bound, where MoE doesn't help much. Decoding (generating tokens one at a time) is where MoE shines: fewer active parameters → faster per-token generation.
4. **Rule of thumb:** An 8-way sparse MoE has inference economics similar to a dense model at about half its total size. A Mixtral 47B acts like a ~25-30B dense model for inference cost, but with 47B of capacity.
5. **The trend:** GPT-4 (rumored MoE), Grok-1 (confirmed MoE), DeepSeek-V3, Qwen3-MoE, Trinity. The frontier is moving toward MoE as the default architecture for large-scale models.
6. **Open challenges:** Serving complexity, expert parallelism, fine-tuning instability, and the memory footprint problem.

**Key equations:** None (this section is architectural/empirical, not mathematical).
**Visualizations:**
- Table: Comparison of Mixtral, DeepSeek-V3, Grok-1, Qwen3-MoE (total params, active params, experts, top-k, training tokens, training cost)
- D2 diagram: A token's journey through a 32-layer Mixtral model, showing different expert selections at each layer
- Source images: Mixtral architecture diagram from the paper if available
**Source images to embed:** Check `sources/arxiv-2401.04088/images/` for Mixtral figures.

---

## Source Image Catalog

**These are images from the downloaded sources that should be embedded in the chapter.**
The writing agent should copy these to `Mixture of Experts/images/` and embed them in the appropriate sections.

| # | Source Image Path | Caption (from paper) | Relevant Section(s) | Notes |
|---|---|---|---|---|
| 1 | `sources/arxiv-1701.06538/moe-bigpicture2.png` | "A Mixture of Experts (MoE) layer embedded within a recurrent language model. The sparse gating function selects two experts to perform computations." | §1 What Is MoE | The canonical MoE architecture diagram. MUST include. Hook image. |
| 2 | `sources/arxiv-2101.03961/images/Attention_Switch_Transformer.png` | Switch Transformer architecture showing MoE layer replacing FFN in transformer | §1 What Is MoE | Shows modern transformer + MoE layout. Key architecture diagram. |
| 3 | `sources/arxiv-2006.16668/transformer_enc_moe_and_ff.png` | GShard: Transformer encoder with MoE extension vs standard feed-forward | §1 What Is MoE | Side-by-side comparison of standard FFN vs MoE replacement. |
| 4 | `sources/arxiv-2006.16668/moe.png` | GShard MoE layer diagram | §1 What Is MoE | Alternative MoE visualization from GShard. |
| 5 | `sources/arxiv-2101.03961/images/ec_fig_v1.png` | Expert capacity and routing in Switch Transformer | §5 Alternative Routing | Expert choice routing comparison diagram. |
| 6 | `sources/arxiv-2211.15841/images/mixture-of-experts-explained.png` | Standard MoE routing explained | §4 Capacity and Systems | How MoE routing and token assignment works. |
| 7 | `sources/arxiv-2211.15841/images/token-dropping.png` | Token dropping in standard MoE | §4 Capacity and Systems | Shows tokens being dropped when capacity is exceeded. |
| 8 | `sources/arxiv-2211.15841/images/block-sparse-format.png` | Block-sparse format for dropless MoE | §4 Capacity and Systems | MegaBlocks' approach to avoiding token dropping. |
| 9 | `sources/arxiv-2211.15841/images/blocksparse-moe-explained.png` | Block-sparse MoE explained | §4 Capacity and Systems | How block-sparse MoE works. |
| 10 | `sources/arxiv-2408.15664/figs/EC_fig.png` | Expert load comparison between auxiliary-loss and loss-free methods | §5 Alternative Routing | Shows how loss-free balancing achieves better balance. |
| 11 | `sources/arxiv-1701.06538/capacity.png` | Perplexity vs model capacity at fixed compute budget | §1 What Is MoE / §6 MoE in the Wild | Shows the benefit of adding experts (capacity) without adding compute. |
| 12 | `sources/arxiv-1701.06538/computation.png` | Perplexity vs computational budget | §6 MoE in the Wild | Shows MoE FLOP efficiency vs dense models. |
| 13 | `sources/arxiv-2101.03961/images/perp_vs_speed.png` | Pre-training speed vs quality for Switch Transformers | §6 MoE in the Wild | Demonstrates the 7x speedup claim. |
| 14 | `sources/arxiv-2101.03961/images/loss_vs_log_params.png` | Scaling curves: loss vs parameters | §6 MoE in the Wild | MoE scaling advantage over dense models. |

**Priority order for visuals (the writing agent should follow this):**

1. **Source images from downloaded papers** — already in `sources/`. Canonical, authoritative, and high-quality.
2. **D2 diagrams** — for concept maps, flowcharts, and structural diagrams.
3. **Python/hvPlot** — for data visualizations, distributions, and function plots.
4. **Web downloads** — for images not in sources/ (search and download during writing).
5. **generate_image** — only as a last resort for custom illustrations.

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,000-1,500 words

**Content:**
1. **Key takeaways (7 bullet points):**
   - MoE replaces the FFN layer in a transformer with N expert FFNs + a lightweight router, activating only k << N experts per token
   - The router is a simple linear layer followed by noisy top-k selection and softmax
   - Top-k selection is non-differentiable, creating a gradient dead zone for non-selected experts
   - The auxiliary load-balancing loss bridges discrete routing and differentiable optimization by multiplying the token count fraction (f_i, non-differentiable) by the router probability fraction (P_i, differentiable)
   - Expert choice routing and auxiliary-loss-free balancing are modern alternatives that address the limitations of the f_i * P_i approach
   - MoE models have inference economics roughly equivalent to a dense model at half their total parameter count
   - The frontier is shifting toward MoE as the default architecture: Mixtral, DeepSeek-V3, Grok, and Qwen3-MoE all use sparse expert architectures

2. **Completed concept map (D2 diagram):** Full concept map connecting all topics: MoE Layer → Router → Top-K Selection → Differentiability Paradox → Auxiliary Loss → Expert Collapse → Capacity Factor → Alternative Routing → Modern Architectures

3. **Retrieval practice questions (7, with answers in collapsed callout):**
   - What are the two components of an MoE layer?
   - Why can't gradients flow through the top-k selection?
   - What are the two vectors f_i and P_i in the auxiliary loss, and which is differentiable?
   - Why does multiplying f_i by P_i solve the load balancing problem?
   - What is the "cheating" failure mode if you only penalize P_i without considering f_i?
   - How does Expert Choice routing achieve perfect load balance by construction?
   - How does DeepSeek-V3's auxiliary-loss-free method avoid interference gradients?

4. **Common mistakes section:**
   - Confusing total parameters with active parameters
   - Thinking top-k routing is fully differentiable
   - Assuming experts specialize by "topic" (they specialize at the token/syntax level)
   - Forgetting that ALL experts must be in memory for inference

5. **Curated resource list (best intuitive resources — verified URLs only):**
   - HuggingFace MoE Guide, Maarten Grootendorst Visual Guide, Cameron Wolfe deep dives, Michael Brenndoerfer interactive articles, makeMoE from scratch

---

## Cross-Cutting Concerns

**Notation table:**

| Symbol | Definition | Valid Values | Example (running example) |
|---|---|---|---|
| $n$ or $N$ | Number of experts in the MoE layer | Positive integer, typically 4-256 | 8 (Mixtral), 4 (running example) |
| $k$ | Number of experts selected per token (top-k) | Positive integer, $1 \leq k \leq N$ | 2 (Mixtral), 1 (Switch Transformer) |
| $x$ | Input token representation | $x \in \mathbb{R}^{d_{model}}$ | Hidden state for the token "bank" |
| $W_g$ | Router weight matrix | $W_g \in \mathbb{R}^{d_{model} \times N}$ | Maps 4096-dim hidden state to 8 expert scores |
| $E_i(x)$ | Output of expert $i$ on input $x$ | $E_i(x) \in \mathbb{R}^{d_{model}}$ | Expert 3's FFN output for "bank" |
| $G(x)_i$ | Gate value (weight) for expert $i$ on input $x$ | $[0, 1]$, with $\sum_{\text{top-k}} G(x)_i = 1$ | $G(\text{"bank"})_3 = 0.65$ |
| $H(x)_i$ | Noisy routing logit for expert $i$ | $\mathbb{R}$ (unbounded) | Raw score before top-k |
| $f_i$ | Fraction of tokens dispatched to expert $i$ (the "Count") | $[0, 1]$, with $\sum f_i = 1$ | $f_3 = 0.5$ (expert 3 gets half the tokens) |
| $P_i$ | Average router probability for expert $i$ (the "Probability") | $[0, 1]$, with $\sum P_i = 1$ | $P_3 = 0.4$ |
| $\alpha$ | Auxiliary loss coefficient | $\mathbb{R}^+$, typically $10^{-2}$ | $\alpha = 0.01$ |
| $C$ | Capacity factor | $\mathbb{R}^+$, typically $1.0$-$1.5$ | $C = 1.25$ |
| $T$ | Number of tokens in a batch | Positive integer | $T = 2048$ |
| $b_i$ | Expert bias (in loss-free balancing) | $\mathbb{R}$ (adjusted dynamically) | $b_3 = -0.1$ (depressed, expert overloaded) |
| $\gamma$ | Bias update speed (in loss-free balancing) | $\mathbb{R}^+$, small | $\gamma = 0.001$ |

**Concept map design:** A top-down D2 diagram with 5 tiers:
1. **Input tier (input class):** Token representation $x$
2. **Router tier (process class):** Linear projection → Noisy logits → Top-K selection → Softmax weights
3. **Expert tier (decision class):** N expert FFNs, only k activated
4. **Training tier (highlight class):** Expert collapse problem → Auxiliary loss (f_i * P_i) → Balance-specialization tradeoff
5. **Evolution tier (output class):** Standard Top-K → Expert Choice → Loss-Free → ReLU Routing

**Prerequisite knowledge to recap:**
- Standard transformer architecture (attention + FFN layers)
- Softmax function and its properties (differentiable, outputs sum to 1)
- Backpropagation and gradient flow through computational graphs
- What it means for a function to be differentiable (gradients exist) vs non-differentiable (gradients are zero or undefined)
- argmax and indicator functions (the $\mathbb{1}\{\cdot\}$ notation)

**Common Misconceptions:**

1. **"MoE experts specialize by topic (Expert 1 = math, Expert 2 = code, Expert 3 = biology)."** In reality, experts specialize at the syntactic/token level, not the semantic/topic level. The same expert might handle function definitions across all programming languages, or handle punctuation tokens regardless of domain.

2. **"The top-k routing is fully differentiable because we apply softmax."** The softmax is differentiable, but it only runs on the k surviving logits. The selection of WHICH k logits survive is the non-differentiable step. Gradients flow through the softmax weights of selected experts but cannot update the router's preferences for non-selected experts.

3. **"MoE models are always faster at inference than dense models with the same total parameters."** MoE requires ALL parameters in memory (high VRAM), and during the prefill phase (processing input tokens in parallel), memory bandwidth is often the bottleneck, not compute. MoE primarily helps during autoregressive decoding (one token at a time).

4. **"The auxiliary loss directly optimizes the token counts f_i."** The f_i values are non-differentiable (they come from an argmax/indicator function). The auxiliary loss gradient flows only through the P_i values (the differentiable softmax probabilities). The f_i values act as scaling factors, not optimization targets.

5. **"You need the auxiliary loss to train MoE models."** DeepSeek-V3 demonstrates that auxiliary-loss-free training via dynamic bias terms can achieve both better load balance AND better model performance, since it eliminates the interference gradients from the auxiliary loss.

**Think Hard questions:**

1. **The fundamental tradeoff:** The auxiliary loss pushes toward uniform routing, but the task loss pushes toward routing tokens to the best expert. At what point does "too much balance" hurt model quality? How can you tell if your model is over-balanced?

2. **Scaling the trick:** The f_i * P_i auxiliary loss works well with 8-64 experts. As we scale to thousands of micro-experts (a trend in DeepSeek-style architectures), does this simple multiplication still provide a strong enough gradient signal? What happens when N is very large and each f_i is very close to 1/N?

3. **The specialization paradox:** We want experts to specialize (so they can handle different inputs differently), but we also want them to be equally loaded (so no compute is wasted). These goals are fundamentally in tension. Is there a way to achieve both simultaneously, or is it always a Pareto tradeoff?

4. **Why not soft routing?** If the differentiability problem comes from hard top-k selection, why not use soft routing where ALL experts process every token with softmax weights? (Answer: because that destroys the compute savings of sparse activation. You'd activate all N experts for every token.)

5. **Gradient signal asymmetry:** Selected experts get gradient updates from both the task loss (through their outputs) and the auxiliary loss (through P_i). Non-selected experts only get indirect signal through the auxiliary loss via P_i. Does this create a training dynamics asymmetry? Is it problematic?

**Math Background assessment:** This chapter uses indicator functions ($\mathbb{1}\{\cdot\}$), softmax, argmax, and basic calculus concepts (differentiable vs non-differentiable, gradient flow). These are all standard undergraduate-level concepts that should be explained inline. The auxiliary loss derivation involves understanding why the product of a non-differentiable quantity with a differentiable one produces useful gradients, which is the core "aha moment" and should be derived from scratch in Section 3. **Math Background appendix: not needed.** All required math can be developed inline in the main sections.
