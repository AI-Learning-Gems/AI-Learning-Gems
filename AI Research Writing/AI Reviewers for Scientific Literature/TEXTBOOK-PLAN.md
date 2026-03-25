# TEXTBOOK-PLAN: AI Reviewers for Scientific Literature

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
> I want to understand everything there is to know about AI reviewers being used for Scientific Literature, to the point where I can create my own which can run locally to evaluate my papers. It should be runnable via Cursor. I want 3 levels: one which uses LLM world knowledge only from a strong model like Claude Opus 4.6; a RAG based one which just searches web summaries and points out flaws based on similar papers; a deep research one, which deeply understands the background of the field and the related work to the current one, and can provide meaningful and insightful critique. To me, these are the 3 levels at which reviewers at major conferences tend to use AI to review...but I could be totally wrong. Find me sources from research in HCI or AI conferences, which studies how reviewers tend to use AI reviews. Also deeply understand what are all the problems and patterns of AI review. My goal is to make my papers receive high scores and be absolutely bulletproof against AI reviewers.

**Topic:** AI Reviewers for Scientific Literature: Understanding, Building, and Defending Against Them
**Prior Knowledge:** The user has written an existing chapter on Scientific Writing for AI Conference Papers (sections _01 through _99), which includes a section on AI reviewers (_05-ai-reviewer.qmd). The user understands the basics of AI reviewing from that section and wants to go much deeper.
**Learning Goals:** (1) Comprehensive understanding of AI review landscape and all known failure modes; (2) How human reviewers actually use AI in practice (HCI research); (3) Build three tiers of local AI reviewer systems; (4) Make papers "AI-reviewer-resistant" through writing and research quality improvements.
**Target Depth:** RESEARCHER
**Output Folder:** `AI Research Writing/AI Reviewers for Scientific Literature`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (28 sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|---|---|---|---|---|---|
| 1 | [Russo Latona et al., "The AI Review Lottery" (2024)](https://arxiv.org/abs/2405.02150) | [ACADEMIC] | `sources/arxiv-2405.02150/` | 2024-05 | 2026-03-21 | KEY: 15.8% of ICLR 2024 reviews AI-assisted; 4.9pp acceptance boost for borderline papers |
| 2 | [Thakkar et al., "Can LLM feedback enhance review quality?" ICLR 2025 RCT (Nature Machine Intelligence)](https://arxiv.org/abs/2504.09737) | [ACADEMIC] | `sources/arxiv-2504.09737/` | 2025-04 | 2026-03-21 | KEY: 27% of reviewers updated after LLM feedback; blinded evaluators preferred updated reviews 89% |
| 3 | [Shen et al., "Mind the Blind Spots" (EMNLP 2025)](https://aclanthology.org/2025.emnlp-main.1805/) | [ACADEMIC] | `sources/arxiv-2502.17086/` | 2025-02 | 2026-03-21 | KEY: Focus-level evaluation framework; LLMs over-focus on technical validity, neglect novelty; 59.42% fewer critical entities |
| 4 | [PRISMM-Bench, Multimodal inconsistency detection](https://arxiv.org/abs/2510.16505) | [ACADEMIC] | `sources/arxiv-2510.16505/` | 2025-10 | 2026-03-21 | KEY: 27.8-53.9% performance from 21 multimodal models on detecting figure-text inconsistencies |
| 5 | [Keuper et al., "Prompt injection attacks on LLM reviews" (2025)](https://arxiv.org/abs/2509.10248) | [ACADEMIC] | `sources/arxiv-2509.10248/` | 2025-09 | 2026-03-21 | KEY: White-text injection achieves up to 100% positive ratings; >95% acceptance bias in many models |
| 6 | [LLM-REVal: Can We Trust LLM Reviewers Yet?](https://arxiv.org/abs/2510.12367) | [ACADEMIC] | `sources/arxiv-2510.12367/` | 2025-10 | 2026-03-21 | KEY: LLMs systematically inflate scores for LLM-authored papers; bias against critical statements |
| 7 | [Justice in Judgment: Unveiling (Hidden) Bias in LLM-assisted Peer Reviews](https://arxiv.org/abs/2509.13400) | [ACADEMIC] | `sources/arxiv-2509.13400/` | 2025-09 | 2026-03-21 | KEY: Affiliation bias favoring highly ranked institutions; gender bias detected across 9 LLMs |
| 8 | [OpenNovelty: LLM-powered Agentic Novelty Assessment (2026)](https://arxiv.org/abs/2601.01576) | [ACADEMIC] | `sources/arxiv-2601.01576/` | 2026-01 | 2026-03-21 | KEY: Agentic system for verifiable novelty assessment; deployed on 500+ ICLR 2026 submissions |
| 9 | [Sharma et al., "Do LLMs Favor LLMs?" (2026)](https://arxiv.org/abs/2601.20920) | [ACADEMIC] | `sources/arxiv-2601.20920/` | 2026-01 | 2026-03-21 | KEY: 125K+ paper-review pairs; rating compression in fully LLM reviews; human oversight reduces leniency |
| 10 | [MARG: Multi-Agent Review Generation (Allen AI, 2024)](https://arxiv.org/abs/2401.04259) | [ACADEMIC] | `sources/arxiv-2401.04259/` | 2024-01 | 2026-03-21 | KEY: Multi-agent system reduces generic comments from 60% to 29%; 3.7 good comments per paper |
| 11 | [Breaking the Reviewer: Adversarial Attacks on LLM Reviewers (EMNLP 2025 Findings)](https://arxiv.org/abs/2506.11113) | [ACADEMIC] | `sources/arxiv-2506.11113/` | 2025-06 | 2026-03-21 | KEY: Superficial text modifications flip borderline reject to accept; rubric-anchored defenses help |
| 12 | [Compound Deception: 100 Fabricated Citations at NeurIPS 2025](https://arxiv.org/abs/2602.05930) | [ACADEMIC] | `sources/arxiv-2602.05930/` | 2026-02 | 2026-03-21 | KEY: 100 hallucinated citations in 51 accepted papers; five-category taxonomy of failure modes |
| 13 | [In-Paper Prompt Injection Attacks and Defenses for AI Reviewers](https://arxiv.org/abs/2511.01287) | [ACADEMIC] | `sources/arxiv-2511.01287/` | 2025-11 | 2026-03-21 | KEY: Both static and iterative attacks achieve near-100% acceptance; detection defenses proposed |
| 14 | [RefereeSim cross-section consistency study](https://openreview.net/pdf?id=QXyeIJ9PQ3) | [ACADEMIC] | `sources/arxiv-2510.16505/` (referenced in PRISMM-Bench context) | 2025 | 2026-03-21 | KEY: Only 36.4% of LLMs caught abstract-methods sample-size discrepancy |
| 15 | [Poldrack, ai-peer-review Python tool](https://github.com/poldrack/ai-peer-review) | [CODE] | `sources/github.com/poldrack/ai-peer-review/` | 2025-05 | 2026-03-21 | KEY: Multi-LLM meta-review tool; supports Claude, GPT-4o, Gemini, DeepSeek, Llama |
| 16 | [MARG reviewer (Allen AI)](https://github.com/allenai/marg-reviewer) | [CODE] | `sources/github.com/allenai/marg-reviewer/` | 2024-01 | 2026-03-21 | KEY: Multi-agent review with Docker; open-source implementation of the MARG paper |
| 17 | [AgentReview (EMNLP 2024)](https://github.com/Ahren09/AgentReview) | [CODE] | `sources/github.com/Ahren09/AgentReview/` | 2024 | 2026-03-21 | KEY: Peer review simulation framework with configurable reviewer attributes |
| 18 | [SEA: Standardization, Evaluation, Analysis (EMNLP 2024)](https://github.com/ecnu-sea/SEA) | [CODE] | `sources/github.com/ecnu-sea/SEA/` | 2024 | 2026-03-21 | KEY: Three-module framework (Standardize, Evaluate, Analyze) with fine-tuned Mistral-7B |
| 19 | [DeepReviewer v2 (ACL 2025)](https://github.com/ResearAI/DeepReviewer-v2) | [CODE] | `sources/github.com/ResearAI/DeepReviewer-v2/` | 2025 | 2026-03-21 | KEY: Human-like deep thinking for paper review; PDF-to-markdown pipeline |
| 20 | [Pangram Labs, "21% of ICLR Reviews are AI-Generated" (2025)](https://www.pangram.com/blog/pangram-predicts-21-of-iclr-reviews-are-ai-generated) | [TUTORIAL] | `sources/pangram.com/blog/pangram-predicts-21-of-iclr-reviews-are-ai-generated/` | 2025-11 | 2026-03-21 | KEY: 21% fully AI-generated; 50%+ showed some AI use in ICLR 2026 reviews |
| 21 | [Poldrack, "Reviewing scientific papers with AI: Part 3" (Substack)](https://russpoldrack.substack.com/p/reviewing-scientific-papers-with-29f) | [TUTORIAL] | `sources/russpoldrack.substack.com/p/reviewing-scientific-papers-with-29f/` | 2025-05 | 2026-03-21 | KEY: Complete implementation walkthrough; built entire tool with Claude Code for <$10 |
| 22 | [ICLR 2026 LLM policy](https://blog.iclr.cc/2025/11/19/iclr-2026-response-to-llm-generated-papers-and-reviews/) | [TUTORIAL] | `sources/blog.iclr.cc/2025/11/19/iclr-2026-response-to-llm-generated-papers-and-reviews/` | 2025-11 | 2026-03-21 | KEY: Mandatory disclosure; desk-rejection for undisclosed LLM use; reviewer sanctions |
| 23 | [ICML 2026 LLM Policy](https://icml.cc/Conferences/2026/LLM-Policy) | [TUTORIAL] | `sources/icml.cc/Conferences/2026/LLM-Policy/` | 2025 | 2026-03-21 | KEY: Two-policy framework (A=no LLM, B=permissive); watermark detection |
| 24 | [ICML 2026, "On Violations of LLM Review Policies"](https://blog.icml.cc/2026/03/18/on-violations-of-llm-review-policies/) | [TUTORIAL] | `sources/blog.icml.cc/2026/03/18/on-violations-of-llm-review-policies/` | 2026-03 | 2026-03-21 | KEY: 795 reviews flagged; 497 papers desk-rejected; 51 reviewers removed |
| 25 | [IOP Publishing, "AI and Peer Review 2025" survey](https://ioppublishing.org/ai-and-peer-review-2025-conclusion/) | [COMMUNITY] | `sources/ioppublishing.org/ai-and-peer-review-2025-conclusion/` | 2025 | 2026-03-21 | KEY: 50%+ researchers used AI for reviewing; views becoming more polarized |
| 26 | [OpenNovelty website and reports](https://www.opennovelty.org/) | [TUTORIAL] | `sources/opennovelty.org/` | 2026-01 | 2026-03-21 | KEY: Public novelty reports for 500+ ICLR 2026 submissions |
| 27 | [Chen et al., "Envisioning Future of Peer Review" (CHIWORK 2025)](https://discovery.ucl.ac.uk/id/eprint/10208390/) | [ACADEMIC] | `sources/discovery.ucl.ac.uk/id/eprint/10208390/` | 2025-06 | 2026-03-21 | KEY: HCI within-subject experiment with 24 reviewers; reduced workload but not time or quality |
| 28 | [Kanada, "How I Use ChatGPT During Peer Review" (Medium, 2026)](https://medium.com/@nirvana_shamrock_bear_975/how-i-use-chatgpt-during-peer-review-reading-section-by-section-with-ai-ab25ac9138ef) | [COMMUNITY] | `sources/medium.com/@nirvana_shamrock_bear_975/how-i-use-chatgpt-during-peer-review-reading-section-by-section-with-ai-ab25ac9138ef/` | 2026-02 | 2026-03-21 | KEY: Practitioner walkthrough of section-by-section dialogical AI review process |

:::

---

## Chapter Overview

**Total sections:** 6 (plus introduction and closing)
**Estimated total length:** 10,000-12,000 words
**Running example:** Priya (from the companion chapter "Scientific Writing for AI Conference Papers") is preparing to submit TokenMix to NeurIPS. She wants to pre-screen her paper using AI reviewers at three levels of sophistication before submission, then use the feedback to make her paper bulletproof against both human and AI reviewers. Each section will follow Priya's journey through building and using progressively more capable AI review systems, while simultaneously teaching the reader the research landscape of AI-assisted peer review.

### Hook & Running Example Design

Priya stares at the three reviews of her TokenMix paper that just arrived from NeurIPS. Two are thoughtful, specific, and fair. The third reads like it was written by someone who spent ten minutes with the paper: vague praise ("the methodology is commendable"), a generic weakness about "limited baselines" that ignores the eight baselines she already included, and a recommendation to "consider evaluating on more diverse datasets" despite the paper reporting results on four standard benchmarks. The language is eerily polished. She suspects Reviewer 3 fed her paper to an LLM and submitted whatever came out.

She is not paranoid. At ICLR 2026, Pangram Labs found that 21% of reviews were fully AI-generated. At ICML 2026, 795 reviews were flagged and 497 papers were desk-rejected because their reciprocal reviewers violated LLM policies. Priya's gut feeling has empirical backing.

But Priya is a systems thinker. Instead of complaining, she decides to build the weapon that is being used against her. If lazy reviewers can use an LLM to generate a review in five minutes, she can use the *same* technology to stress-test her paper before submission. Her plan: build three AI review systems of increasing sophistication, run her paper through all three, and fix every weakness before a single human or AI reviewer sees it.

This chapter follows Priya's journey. Along the way, it answers three questions that every AI researcher now faces: (a) What does the AI review landscape actually look like in 2025-2026, and how should you think about it? (b) How can you build your own AI reviewer at three levels of depth? (c) How do you write papers that are genuinely robust to both shoddy AI reviews and rigorous human reviews?

**Hook Image:** The ICML 2026 "On Violations of LLM Review Policies" blog post contains a figure showing the distribution of flagged reviews. This is a strong motivating image because it concretizes the problem: real numbers, real consequences, real desk-rejected papers. Source: `sources/blog.icml.cc/2026/03/18/on-violations-of-llm-review-policies/images/`.

---

## Section Plan

### Section 1: The AI Review Landscape in 2025-2026 {#sec-landscape}

**File:** `_01-landscape.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** Give the reader a comprehensive, data-backed picture of where AI reviewing stands right now. Prevalence, detection, conference policies, and the emerging arms race between AI reviewers, AI-written papers, and detection systems.
**Running example application:** Priya reads about the ICLR 2026 scandal and the ICML desk-rejections. She realizes AI review is not a hypothetical future problem; it is the current reality of the conferences she submits to.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|---|---|---|---|
| AI Review Lottery (Russo Latona et al., 2024) | `sources/arxiv-2405.02150/` | `simple.tex` | 15.8% prevalence, 4.9pp acceptance boost, detection methodology |
| ICLR 2025 RCT (Thakkar et al., 2025) | `sources/arxiv-2504.09737/` | `main.tex` | 27% update rate, 89% preference, no impact on decisions |
| Pangram Labs ICLR analysis | `sources/pangram.com/blog/pangram-predicts-21-of-iclr-reviews-are-ai-generated/` | Full post | 21% fully AI-generated, 50%+ some AI, detection categories |
| ICLR 2026 LLM policy | `sources/blog.iclr.cc/2025/11/19/iclr-2026-response-to-llm-generated-papers-and-reviews/` | Full post | Disclosure requirements, desk-rejection policy, reviewer sanctions |
| ICML 2026 LLM Policy + Violations | `sources/icml.cc/Conferences/2026/LLM-Policy/` and `sources/blog.icml.cc/2026/03/18/on-violations-of-llm-review-policies/` | Full posts | Two-policy framework, 795 flagged reviews, 497 desk-rejected papers, watermark detection |
| IOP Publishing survey | `sources/ioppublishing.org/ai-and-peer-review-2025-conclusion/` | Full post | 50%+ researchers use AI for reviewing, polarized attitudes |
| NeurIPS 2025 hallucinated citations | `sources/arxiv-2602.05930/` | LaTeX source | 100 fake citations, five-category taxonomy, 1% of accepted papers |

**Content outline:**
1. The scale of AI reviewing (prevalence data from 2024 to 2026 across venues)
2. How AI reviews are detected (Pangram EditLens, GPTZero, ICML watermarking)
3. Conference policy responses (ICLR mandatory disclosure, ICML two-policy framework, desk-rejection consequences)
4. The parallel crisis: hallucinated citations in AI-written papers (NeurIPS 2025)
5. Researcher attitudes (IOP/Frontiers surveys: 50%+ use AI, views polarizing)

**Key equations:** None (this is a landscape/data section)
**Visualizations:** Timeline D2 diagram showing the escalation from 2024-2026; a bar chart (hvplot) comparing prevalence rates across conferences
**Source images to embed:** ICML violations distribution figure from `sources/blog.icml.cc/2026/03/18/on-violations-of-llm-review-policies/images/`

---

### Section 2: How Reviewers Actually Use AI (The HCI Evidence) {#sec-how-reviewers-use-ai}

**File:** `_02-how-reviewers-use-ai.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** Ground the reader's understanding in empirical HCI research on how *humans* use AI for reviewing. This maps onto the user's "three levels" thesis: (1) zero-shot world-knowledge prompting, (2) RAG-assisted section-by-section review, (3) deep research with literature grounding. Validate or challenge the user's three-level model against published evidence.
**Running example application:** Priya interviews three colleagues about how they use AI to review. She discovers the three patterns match roughly the three levels she plans to build.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|---|---|---|---|
| Chen et al., "Envisioning Future of Peer Review" (CHIWORK 2025) | `sources/discovery.ucl.ac.uk/id/eprint/10208390/` | Full PDF | Within-subject experiment: 24 HCI reviewers, reduced workload but not quality; tasks valued (summarization, retrieval, idea generation) |
| Kanada, "How I Use ChatGPT During Peer Review" (Medium 2026) | `sources/medium.com/@nirvana_shamrock_bear_975/how-i-use-chatgpt-during-peer-review-reading-section-by-section-with-ai-ab25ac9138ef/` | Full post | Section-by-section dialogical approach; translation as reading aid |
| Do LLMs Favor LLMs (Sharma et al., 2026) | `sources/arxiv-2601.20920/` | LaTeX source | 17.5% of abstracts, 26.65% of reviews show LLM modification; human oversight reduces rating compression |
| IOP Publishing survey | `sources/ioppublishing.org/ai-and-peer-review-2025-conclusion/` | Full post | 21% for grammar, 13% for summarization, 2% for full review generation |
| Manusights blog, "AI Peer Review: How Common Is It in 2026?" | `sources/manusights.com/blog/ai-reviewing-your-paper/` | Full post | Practitioner perspective on AI review adoption |

**Content outline:**
1. The three observed levels of AI-assisted reviewing in practice (grounded in HCI data)
   - Level 1: "Give me a quick take" (zero-shot world knowledge; most common)
   - Level 2: "Help me understand this paper" (section-by-section RAG-like dialogue; Kanada's approach)
   - Level 3: "What does the literature say?" (deep research with retrieval; rarest, most valuable)
2. What the CHIWORK 2025 experiment found (workload reduction yes, quality improvement no)
3. The spectrum from tool-assisted human review to fully automated review
4. Why human oversight matters: the rating compression problem (Sharma et al.)

**Key equations:** None
**Visualizations:** D2 diagram showing the three levels as a spectrum from fully human to fully automated review
**Source images to embed:** None (custom D2 diagrams)

---

### Section 3: What AI Reviewers Get Wrong (The Complete Failure Taxonomy) {#sec-failure-modes}

**File:** `_03-failure-modes.qmd`
**Estimated length:** 2,000-2,500 words
**Goal:** A comprehensive, empirically grounded catalog of every known failure mode of AI reviewers. This is the section the reader will keep returning to when building their own systems and when writing papers to defend against AI review.
**Running example application:** Priya runs her TokenMix paper through a vanilla GPT-4 reviewer and catalogs every failure: generic praise, missed novelty, inflated scores, failure to catch a deliberate inconsistency she planted between abstract and methods.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|---|---|---|---|
| Mind the Blind Spots (Shen et al., EMNLP 2025) | `sources/arxiv-2502.17086/` | LaTeX source, sections on focus-level evaluation | Novelty blindness; 59.42% fewer critical entities; target and aspect facet framework |
| PRISMM-Bench (2025) | `sources/arxiv-2510.16505/` | LaTeX source | 27.8-53.9% on multimodal inconsistency; 17% of ICLR 2025 papers had flagged inconsistencies |
| LLM-REVal (2025) | `sources/arxiv-2510.12367/` | LaTeX source | Systematic inflation for LLM-authored papers; bias against critical statements |
| Justice in Judgment (2025) | `sources/arxiv-2509.13400/` | LaTeX source | Affiliation bias; gender bias; hidden bias in soft ratings |
| Do LLMs Favor LLMs (Sharma et al., 2026) | `sources/arxiv-2601.20920/` | LaTeX source | Rating compression; leniency toward weaker papers; spurious LLM-LLM affinity |
| Breaking the Reviewer (EMNLP 2025 Findings) | `sources/arxiv-2506.11113/` | LaTeX source | Adversarial text modifications flip decisions; rubric keyword exploitation |
| Prompt injection attacks (Keuper et al., 2025) | `sources/arxiv-2509.10248/` | LaTeX source | White-text injection; >95% acceptance bias; multilingual attacks |
| In-Paper Prompt Injection (2025) | `sources/arxiv-2511.01287/` | LaTeX source | Static and iterative attacks; detection defenses |

**Content outline:**
1. **Novelty blindness** — LLMs focus on technical validity, miss whether an idea is new (Mind the Blind Spots)
2. **Rating inflation and leniency** — Systematic acceptance bias; rating compression (LLM-REVal, Do LLMs Favor LLMs)
3. **Cross-section consistency failure** — Cannot hold the whole paper in working memory (RefereeSim: 36.4% detection)
4. **Multimodal inconsistency failure** — Cannot reliably cross-check figures, tables, equations against text (PRISMM-Bench: 27.8-53.9%)
5. **Social bias** — Affiliation favoritism, gender bias, seniority bias (Justice in Judgment)
6. **Linguistic bias** — Favors LLM-generated writing style; penalizes critical/cautionary language (LLM-REVal)
7. **Adversarial vulnerability** — Prompt injection, paraphrase attacks, rubric keyword gaming (Breaking the Reviewer, Keuper et al.)
8. **Genericness and hallucination** — Vague praise/criticism without grounding; hallucinated references in reviews

**Key equations:** None (empirical results)
**Visualizations:** Large D2 concept map showing the complete failure taxonomy with semantic classes; hvPlot radar chart comparing human vs. LLM reviewer focus across the Mind the Blind Spots facets
**Source images to embed:** Figures from the Mind the Blind Spots paper (radar charts); PRISMM-Bench performance tables

---

### Section 4: Building Your Own AI Reviewer (Three Tiers) {#sec-building-reviewer}

**File:** `_04-building-reviewer.qmd`
**Estimated length:** 2,000-2,500 words
**Goal:** Hands-on implementation guide for building three tiers of AI reviewer that the reader can run locally via Cursor. This section is implementation-focused with code, architecture diagrams, and practical instructions.
**Running example application:** Priya builds each tier, runs them on her TokenMix paper, compares the quality of feedback, and discovers which issues each tier catches.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|---|---|---|---|
| Poldrack ai-peer-review | `sources/github.com/poldrack/ai-peer-review/` | README, source code | Architecture, multi-LLM meta-review, API integration pattern |
| Poldrack blog post | `sources/russpoldrack.substack.com/p/reviewing-scientific-papers-with-29f/` | Full post | Implementation narrative; cost (<$10); Claude Code development story |
| MARG reviewer (Allen AI) | `sources/github.com/allenai/marg-reviewer/` | README, Docker setup | Multi-agent architecture; distributing paper across agents |
| DeepReviewer v2 | `sources/github.com/ResearAI/DeepReviewer-v2/` | README, source code | Nine-agent architecture; PDF-to-markdown pipeline; cost optimization |
| SEA framework | `sources/github.com/ecnu-sea/SEA/` | README, source code | Three-module framework; fine-tuned Mistral-7B; mismatch scoring |
| AgentReview | `sources/github.com/Ahren09/AgentReview/` | README, source code | Peer review simulation; configurable reviewer attributes |
| OpenNovelty | `sources/arxiv-2601.01576/` and `sources/opennovelty.org/` | LaTeX + website | Novelty assessment pipeline: extract, retrieve, analyze, synthesize |
| MARG paper | `sources/arxiv-2401.04259/` | LaTeX source | Multi-agent review reduces generic comments from 60% to 29% |

**Content outline:**
1. **Architecture overview** — The three tiers and what each adds
2. **Tier 1: Zero-Shot World Knowledge Reviewer** — Single LLM call with structured review prompt; implementation with Claude/GPT API; prompt design based on conference review criteria; limitations (novelty blindness, genericness). Code example.
3. **Tier 2: RAG-Augmented Reviewer** — Add semantic search over related papers; retrieve similar abstracts/methods from Semantic Scholar API or local corpus; augment the review prompt with retrieved context; catches missing baselines and related work gaps. Code example.
4. **Tier 3: Deep Research Reviewer** — Multi-agent architecture inspired by MARG and OpenNovelty; agents for novelty assessment, method analysis, experiment validation, literature grounding; builds a local knowledge graph of the field; produces verifiable critiques with citations. Architecture diagram.
5. **Meta-review synthesis** — Combining outputs from all three tiers (following Poldrack's approach)
6. **Running it locally in Cursor** — Setup instructions; API keys; cost estimates per paper

**Key equations:** None (implementation section)
**Visualizations:** D2 diagram showing the three-tier architecture with data flow; code blocks for each tier
**Source images to embed:** MARG architecture figure from `sources/arxiv-2401.04259/`; OpenNovelty pipeline from the paper

---

### Section 5: Making Your Paper AI-Reviewer-Resistant {#sec-defense}

**File:** `_05-defense.qmd`
**Estimated length:** 2,000-2,500 words
**Goal:** The practical payoff section. Concrete strategies for writing papers that cannot be condemned by shoddy AI reviewers. This section connects back to the companion chapter's style guide and anatomy sections, extending them with AI-specific defenses.
**Running example application:** Priya takes the feedback from all three tiers, maps each weakness to a specific defense strategy, and rewrites her paper section by section.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|---|---|---|---|
| Mind the Blind Spots (Shen et al.) | `sources/arxiv-2502.17086/` | LaTeX source | What LLMs focus on (technical validity); how to exploit their focus patterns |
| Breaking the Reviewer (EMNLP 2025) | `sources/arxiv-2506.11113/` | LaTeX source | Rubric-anchored defenses work; how reviewers latch onto rubric keywords |
| LLM-REVal | `sources/arxiv-2510.12367/` | LaTeX source | Writing style bias; revisions guided by LLM reviews can improve quality |
| ICLR 2025 RCT | `sources/arxiv-2504.09737/` | LaTeX source | LLM feedback improved reviews 89% of the time; pre-submission self-review is effective |
| Existing companion chapter (AI reviewer section) | Referenced directly | `_05-ai-reviewer.qmd` | Internal consistency, explicit novelty, structured parseability, LLM-detectable language avoidance |

**Content outline:**
1. **The defense mindset** — Your paper faces two audiences: human reviewers who check novelty and depth, AI reviewers who check structure and consistency. Optimize for both.
2. **Defense Strategy 1: Maximize internal consistency** — Numbers in abstract match results; contributions list maps 1:1 to sections; all claims traceable to evidence. (Addresses cross-section failure)
3. **Defense Strategy 2: Make novelty unmistakable** — "To the best of our knowledge, this is the first..."; explicit comparison table against closest prior work; novelty claim in abstract sentence 1. (Addresses novelty blindness)
4. **Defense Strategy 3: Structure for parseability** — Numbered contributions; bold best results; labeled ablations; "Our contributions are:" bullet list. (Exploits what LLMs are good at)
5. **Defense Strategy 4: Avoid LLM-detectable language** — Remove "commendable," "meticulous," "intricate"; replace with domain-specific precise language. (Reduces detection risk)
6. **Defense Strategy 5: Pre-submission AI self-review** — Run all three tiers before submitting; fix every weakness the AI finds. (ICLR RCT evidence)
7. **Defense Strategy 6: Write for the rubric** — Conference review forms have specific criteria; map each criterion to a specific paper section; make the mapping explicit. (Addresses rubric-anchoring finding)
8. **What NOT to do** — Prompt injection is manipulation, not defense; LLM-detectable language avoidance is about quality, not gaming

**Key equations:** None
**Visualizations:** D2 diagram mapping each failure mode to its defense strategy; checklist table (pre-submission checklist format)
**Source images to embed:** None (custom D2 diagrams and tables)

---

### Section 6: The Ethics and Future of AI Reviewing {#sec-ethics-future}

**File:** `_06-ethics-future.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** Place the technical content in ethical and forward-looking context. Cover the prompt injection arms race, the selection pressure problem (well-written incremental > poorly-written breakthrough), conference policy evolution, and the emerging hybrid model.
**Running example application:** Priya reflects on the ethical line between legitimate optimization and manipulation, and decides where she personally draws it.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|---|---|---|---|
| Prompt injection attacks (Keuper et al.) | `sources/arxiv-2509.10248/` | LaTeX source | White-text attacks; 100% positive ratings; multilingual attacks |
| In-Paper Prompt Injection | `sources/arxiv-2511.01287/` | LaTeX source | Attack-defense dynamics; detection countermeasures |
| ICML 2026 violations | `sources/blog.icml.cc/2026/03/18/on-violations-of-llm-review-policies/` | Full post | Real-world enforcement: 497 desk-rejected papers; reviewer removal |
| ICLR 2026 policy | `sources/blog.iclr.cc/2025/11/19/iclr-2026-response-to-llm-generated-papers-and-reviews/` | Full post | Mandatory disclosure; hallucinated references as Code of Ethics violation |
| NeurIPS hallucinated citations | `sources/arxiv-2602.05930/` | LaTeX source | 100 fake citations passed peer review; systemic integrity risk |
| Do LLMs Favor LLMs | `sources/arxiv-2601.20920/` | LaTeX source | Selection pressure: LLM reviews favor LLM-style writing |

**Content outline:**
1. **The manipulation spectrum** — Legitimate (pre-submission self-review, clear structuring) vs. manipulation (prompt injection, white-text attacks)
2. **The prompt injection arms race** — Current attacks, detection methods, adaptive adversaries
3. **The selection pressure problem** — If LLMs reward structure over novelty, does this create an evolutionary pressure toward incremental papers?
4. **The integrity crisis** — Hallucinated citations, fabricated reviews, eroding trust
5. **Conference policy evolution** — From "don't use AI" to "use AI responsibly" to "we will watermark and detect"
6. **The emerging hybrid model** — ICLR RCT shows AI feedback improves human reviews without changing decisions; the future is human+AI, not AI-replacing-human

**Key equations:** None
**Visualizations:** D2 diagram showing the arms race cycle (attack → detection → adaptive attack → improved detection)
**Source images to embed:** None (custom D2 diagrams)

---

## Source Image Catalog

**These are images from the downloaded sources that should be embedded in the chapter.**

| # | Source Image Path | Caption (from paper) | Relevant Section(s) | Notes |
|---|---|---|---|---|
| 1 | `sources/blog.icml.cc/2026/03/18/on-violations-of-llm-review-policies/images/` | ICML 2026 review violation statistics | §1 Landscape | Distribution of flagged reviews; motivating image for the hook |
| 2 | `sources/arxiv-2502.17086/figures/` | Focus-level evaluation radar charts | §3 Failure Modes | Radar charts comparing human vs LLM reviewer focus across target/aspect facets |
| 3 | `sources/arxiv-2510.16505/figs/` | PRISMM-Bench multimodal model performance | §3 Failure Modes | Bar chart showing 27.8-53.9% performance range across 21 models |
| 4 | `sources/arxiv-2401.04259/` (figures) | MARG multi-agent architecture diagram | §4 Building Reviewer | Architecture showing how agents distribute paper sections |
| 5 | `sources/arxiv-2601.01576/` (figures) | OpenNovelty four-phase pipeline | §4 Building Reviewer | Extract → Retrieve → Analyze → Synthesize pipeline |
| 6 | `sources/arxiv-2509.10248/` (figures) | Prompt injection attack effectiveness | §6 Ethics | Showing success rate of white-text attacks |
| 7 | `sources/pangram.com/blog/pangram-predicts-21-of-iclr-reviews-are-ai-generated/images/` | ICLR 2026 AI review prevalence | §1 Landscape | Prevalence breakdown by detection category |

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
1. Key takeaways (7-9 bullet points covering the landscape, failure modes, three-tier system, defense strategies, and ethics)
2. Completed concept map (D2 diagram showing the full chapter architecture: landscape → how reviewers use AI → failure modes → building your own → defense strategies → ethics)
3. Retrieval practice questions (7-9, with answers in collapsed callout)
4. Common mistakes section (5 most common mistakes when dealing with AI review)
5. Curated resource list (the best tools, papers, and blogs with verified URLs)
6. Pre-submission checklist (a printable checklist incorporating all defense strategies)

---

## Cross-Cutting Concerns

**Notation table:** This chapter is not heavily mathematical. No notation table is needed.

**Concept map design:** Top-to-bottom flow using the Modern SaaS D2 theme:
- Input (indigo): "Your Paper" → the starting point
- Process (emerald): "AI Review Landscape," "How Reviewers Use AI," "Failure Taxonomy"
- Decision (amber): "Three-Tier AI Reviewer System" (Level 1, 2, 3 as sub-nodes)
- Output (blue): "Defense Strategies" (6 strategies as sub-nodes)
- Highlight (rose): "AI-Reviewer-Resistant Paper" → the goal
- Container (gray): Group the three tiers; group the six defense strategies

**Prerequisite knowledge to recap:** The reader should have read (or have access to) the companion chapter "Scientific Writing for AI Conference Papers." Specifically, the anatomy section (_03) and style guide (_04) are referenced in Defense Strategy sections. The AI reviewer section (_05) provides the foundation that this chapter extends dramatically.

**Common Misconceptions:**
1. "AI reviewers are just bad reviewers" — Actually, they excel at structure, consistency, and writing quality evaluation. Their failure modes are specific and predictable.
2. "If 21% of reviews are AI-generated, writing quality doesn't matter" — The opposite: AI reviewers are *better* at evaluating surface-level quality than humans. Writing matters more, not less.
3. "AI reviewers can be easily fooled with prompt injection" — While technically true, conferences are deploying countermeasures (watermarking, detection). Getting caught results in desk-rejection and sanctions.
4. "Building an AI reviewer requires fine-tuning" — The three-tier system in Section 4 uses API calls, prompt engineering, and RAG. No fine-tuning required.
5. "Making papers AI-resistant means gaming the system" — The defense strategies (consistency, explicit novelty, structured formatting) make papers better for *all* readers, not just AI.

**Think Hard questions:**
1. If LLM reviewers systematically overlook novelty while rewarding clear structure, does this create a selection pressure toward well-written incremental papers over poorly-written breakthrough papers?
2. Is there a fundamental tension between making papers "AI-reviewer-resistant" (structured, explicit, consistent) and making them compelling for human readers (surprising, subtle, narrative-driven)?
3. If pre-submission AI self-review becomes universal, does the bar for paper quality rise, or does every paper converge toward the same LLM-optimized template?
4. Should authors be required to disclose that they used AI to self-review their paper before submission?
5. If 50% of reviews show AI involvement and 21% are fully AI-generated, at what point does the peer review system lose its epistemic authority?

**Math Background assessment:** Math Background appendix: not needed. This chapter is empirical and implementation-focused, with no significant mathematical content above basic statistics.
