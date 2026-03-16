# Update Plan for Mixture of Experts in Transformers

**Date:** 2026-03-16
**New Sources Provided:** 7

## Source Triage

### (A) REINFORCES — Integrated

| # | Source | Affects Section | What It Adds |
|---|--------|-----------------|--------------|
| 1 | [Comprehensive MoE Survey (arxiv 2503.07137)](https://arxiv.org/abs/2503.07137) | TEXTBOOK-PLAN.md | Reference survey for taxonomy validation |
| 2 | [Survey on MoE in LLMs (arxiv 2407.06204)](https://arxiv.org/abs/2407.06204) | TEXTBOOK-PLAN.md | Reference survey for terminology completeness |
| 3 | [MoE Survey GitHub (withinmiaov)](https://github.com/withinmiaov/A-Survey-on-Mixture-of-Experts-in-LLMs) | TEXTBOOK-PLAN.md | Curated paper list |
| 4 | [Sebastian Raschka MoE Gallery](https://sebastianraschka.com/llm-architecture-gallery/moe/) | _01-introduction | Confirmed terminology: "sparse" vs "dense", shared experts, latent MoE |

### (B) EXTENDS — Integrated (within scope)

| # | Source | Affects Section | What It Adds | Estimated Words |
|---|--------|-----------------|--------------|-----------------|
| 5 | [Maarten Grootendorst Visual Guide](https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-mixture-of-experts) | _01-introduction | Dense-vs-MoE decoder block diagram | ~30 (caption) |
| 6 | [Raschka LLMs-from-scratch MoE code](https://github.com/rasbt/LLMs-from-scratch/tree/main/ch04/07_moe) | _02-routing | PyTorch MoE implementation (~30 lines) | ~200 |
| 7 | [ST-MoE (arxiv 2202.08906)](https://arxiv.org/abs/2202.08906) | _03-load-balancing-loss | Router z-loss for training stability | ~120 |
| 8 | [Sparse Upcycling (arxiv 2212.05055)](https://arxiv.org/abs/2212.05055) | _06-moe-in-the-wild | Sparse upcycling concept | ~100 |

### (C) OUT-OF-SCOPE — Noted for future

| # | Source | Why Out of Scope | Suggested Future Chapter |
|---|--------|-------------------|--------------------------|
| 1 | Annotated Transformer (nlp.seas.harvard.edu) | Covers standard transformer internals, not MoE-specific | "The Transformer Architecture" chapter |
| 2 | Raschka Jan 2024 newsletter | Broad paper roundup, not MoE-focused | General reference |
| 3 | Raschka MoE FAQ | Too brief (251 chars), already covered in chapter | N/A |

## Concept Additions (from terminology audit)

| Concept | Where Added | Type |
|---|---|---|
| Explicit "dense" vs "sparse" definition | _01-introduction (Chapter Overview) | (A) |
| "Conditional computation" term | _01-introduction (Chapter Overview) | (A) |
| Dense-vs-MoE decoder block diagram | _01-introduction (after MoE equation) | (B) |
| Router z-loss | _03-load-balancing-loss (after alpha discussion) | (B) |
| Sparse upcycling | _06-moe-in-the-wild (before "The Trend") | (B) |
| PyTorch MoE code | _02-routing (new subsection before Think Hard) | (B) |

## Estimated Impact

- Sections modified: _01-introduction, _02-routing, _03-load-balancing-loss, _06-moe-in-the-wild
- Estimated total new words: ~530
- Sections at capacity: None (all additions are <10% of section word count)

## Changes Made

- `_01-introduction.qmd`: +80 words (explicit dense/sparse/conditional-computation definitions, Grootendorst diagram)
- `_02-routing.qmd`: +200 words (PyTorch MoE code subsection with ~30-line implementation)
- `_03-load-balancing-loss.qmd`: +120 words (router z-loss paragraph with ST-MoE citation)
- `_06-moe-in-the-wild.qmd`: +100 words (sparse upcycling paragraph)

## Word Count Impact

| Section | Before | After | Change |
|---------|--------|-------|--------|
| _01-introduction | ~2,500 | ~2,580 | +3.2% |
| _02-routing | ~2,200 | ~2,400 | +9.1% |
| _03-load-balancing | ~2,400 | ~2,520 | +5.0% |
| _06-moe-in-the-wild | ~1,700 | ~1,800 | +5.9% |

## Notes

- The Grootendorst visual guide has ~50 more excellent images. Consider using additional ones if the chapter is later expanded (e.g., the routing animation diagram, the expert specialization heatmap from ST-MoE).
- The two survey papers (2503.07137 and 2407.06204) contain comprehensive taxonomies of routing strategies (hash routing, Sinkhorn, BASE layer, Soft MoE, SMEAR, etc.) that are out of scope for this chapter but could form the basis of an "Advanced MoE Routing" chapter.
- Expert offloading/caching (for inference on consumer hardware) is an active research area that could be a standalone section if the chapter is later expanded.

---

## Update: 2026-03-16 (Tier 2 Concepts from Survey Analysis)

### Sources Analyzed
1. [Comprehensive MoE Survey (arxiv 2503.07137)](https://arxiv.org/abs/2503.07137) — all 7 sections read
2. [Survey on MoE in LLMs (arxiv 2407.06204)](https://arxiv.org/abs/2407.06204) — all 6 sections read
3. [Soft MoE (Puigcerver et al., ICLR 2024)](https://arxiv.org/abs/2308.00951)
4. [Mixture-of-Depths (Raposo et al., 2024)](https://arxiv.org/abs/2404.02258)
5. [ST-MoE (Zoph et al., 2022)](https://arxiv.org/abs/2202.08906)
6. [DeepSeekMoE (Dai et al., 2024)](https://arxiv.org/abs/2401.06066)
7. [DeepSpeed-MoE (Rajbhandari et al., 2022)](https://arxiv.org/abs/2201.05596)

### Triage Results
- (B) Extends: Soft MoE term, Mixture-of-Depths, TopK-vs-Softmax ordering, shared expert formal definition, sparse-to-dense distillation, MoE overfitting tendency
- (C) Out of scope: MoPE/LoRA-MoE, MoA (Mixture-of-Attention), continual/meta/RL/federated learning with MoE, MoE theory, CV applications, hash routing, Sinkhorn routing, BASE layer, SMEAR, Top-P routing, MoEfication

### Changes Made
- `_02-routing.qmd`: +~80 words (TopK-then-Softmax vs Softmax-then-TopK ordering paragraph)
- `_05-alternative-routing.qmd`: +~60 words (Soft MoE row in comparison table + explanatory sentence)
- `_06-moe-in-the-wild.qmd`: +~120 words (shared expert definition, sparse-to-dense distillation, MoE overfitting, Mixture-of-Depths)
- `_99-closing.qmd`: +2 rows in curated resources table (Raschka MoE code, MoE survey)

### Word Count Impact
| Section | Change |
|---------|--------|
| _02-routing | +~80 words (~3.5%) |
| _05-alternative-routing | +~60 words (~3%) |
| _06-moe-in-the-wild | +~120 words (~7%) |
| _99-closing | +2 table rows |

### Notes
- All Tier 1 concepts (dense/sparse definition, conditional computation, router z-loss, sparse upcycling, decoder diagram, PyTorch code) were added in the previous update pass.
- This pass added the 6 most important Tier 2 concepts identified from reading both surveys section by section.
- Remaining out-of-scope concepts (MoPE, MoA, MoD as a full topic, hash/Sinkhorn routing, CV applications) are documented above for potential future chapters.

