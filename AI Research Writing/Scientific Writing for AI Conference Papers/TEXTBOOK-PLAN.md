# TEXTBOOK-PLAN: Scientific Writing for AI Conference Papers vs. Technical Blog Posts

## User Query
> Do deep factual research on the difference between writing for a main conference paper at an AI research conference versus writing an AI technical blog post. I want to focus on the scientific writing itself: the wording, the way you say things, the way you frame ideas, the way you research and present information, and the style of the writing. What do people in AI talk about when it comes to this? To understand this, do deep factual research. Look for details from professors in AI and CS, top researchers in AI and CS, and how they frame the writing itself. How do they talk about writing? How much do they really care about style? How does writing style influence readers? How do top researchers use their writing to influence people? I want you to deeply understand this and write a very detailed textbook chapter which captures all of it. Particularly for main conference papers, I want the chapter to be instructive: it should have a lot of details on what you should do and what you should not do. Each of those details should be very well sourced in this chapter, drawing from the absolute experts in AI, how they write, the style of their writing, the way they present ideas, how they do background research, how they present related work, and what they do differently. Capture all of this in the chapter. CRITICAL: One entire subsection should be concrete instructions on the style guidelines and best-practices for scientific writing. It should be similar to writing-style.md, but for scientific conference paper writing in AI and CS.

**Topic:** Scientific Writing for AI Conference Papers vs. Technical Blog Posts
**Prior Knowledge:** Reader understands basic academic publishing (conferences, journals) and has read AI blog posts, but has never written a conference paper or been through peer review.
**Learning Goals:** (1) Understand the deep structural and stylistic differences between conference papers and blog posts; (2) Learn concrete, actionable writing guidelines for AI conference papers, sourced from top researchers; (3) Develop a reference-grade style guide for scientific paper writing in AI/CS.
**Target Depth:** GRADUATE
**Output Folder:** `AI Research Writing/Scientific Writing for AI Conference Papers`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (32 sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [Simon Peyton Jones — "How to Write a Great Research Paper"](https://simon.peytonjones.org/great-research-paper/) | [ACADEMIC] | `sources/simon.peytonjones.org/great-research-paper/` | 2016 | 2026-03-19 | KEY: Seven concrete suggestions for paper writing; "writing is a primary mechanism for doing research, not just reporting it." Emphasizes: identify one key idea, tell a story, nail contributions to the mast. |
| 2 | [Simon Peyton Jones — Slides (PDF)](https://www.cis.upenn.edu/~sweirich/icfp-plmw15/slides/peyton-jones.pdf) | [ACADEMIC] | `sources/cis.upenn.edu/~sweirich/icfp-plmw15/slides/` | 2015 | 2026-03-19 | KEY: Full slide deck for the talk. Visual examples of good vs. bad abstracts and introductions. |
| 3 | [Sebastian Farquhar — "How to Write ML Papers"](https://sebastianfarquhar.com/on-research/2024/11/04/how_to_write_ml_papers/) | [TUTORIAL] | `sources/sebastianfarquhar.com/on-research/2024/11/04/how_to_write_ml_papers/` | 2024-11 | 2026-03-19 | KEY: DeepMind researcher's highly opinionated guide. Concrete abstract formula (2+1+1+1 sentences), introduction structure, advice on figures. References Foerster and Steinhardt. |
| 4 | [Jacob Steinhardt — "Advice for Authors"](https://jsteinhardt.stat.berkeley.edu/blog/advice-for-authors) | [ACADEMIC] | `sources/jsteinhardt.stat.berkeley.edu/blog/advice-for-authors/` | 2017 | 2026-03-19 | KEY: UC Berkeley professor. "Local style matters more than global structure." Consistent phrasing, avoid complex sentences, be precise (e.g., "accuracy" not "performance"). Two-sentence abstract opening strategy. |
| 5 | [Alex Irpan — "Blog Posts and Research Papers"](https://www.alexirpan.com/2018/03/07/blog-paper.html) | [TUTORIAL] | `sources/alexirpan.com/2018/03/07/blog-paper.html/` | 2018-03 | 2026-03-19 | KEY: Direct comparison. "Blog posts encourage stating opinions; papers encourage stating truths." Papers have higher burden of proof. Blogs better for debatable topics. Blogs can use multimedia front and center. |
| 6 | [Henning Schulzrinne — "Writing Systems and Networking Articles"](https://www.cs.columbia.edu/~hgs/etc/writing-style.html) | [ACADEMIC] | `sources/cs.columbia.edu/~hgs/etc/writing-style.html/` | ~2010 | 2026-03-19 | KEY: Columbia professor. Detailed writing guide for CS papers. Covers abstract, intro, related work, body, figures. Four categories of technical results. Recommends Strunk & White. |
| 7 | [Michael Ernst — "How to Write a Technical Paper"](https://pag.csail.mit.edu/~mernst/advice/write-technical-paper.html) | [ACADEMIC] | `sources/pag.csail.mit.edu/~mernst/advice/write-technical-paper.html/` | ~2018 | 2026-03-19 | KEY: MIT/UW professor. "The purpose of research is to increase human knowledge, so communicating your work is crucial." Convince readers: you solved the problem, it's hard, it's important. Know your audience. |
| 8 | [Frédo Durand — "Notes on Writing" (PDF)](https://people.csail.mit.edu/fredo/PUBLI/writing.pdf) | [ACADEMIC] | `sources/people.csail.mit.edu/fredo/PUBLI/` | ~2015 | 2026-03-19 | KEY: MIT professor. "Papers can be rejected based on poor writing alone." Shorter sentences, simpler English. Sell ideas, not implementations. Start with overview and figures. |
| 9 | [Gopen & Swan — "The Science of Scientific Writing" (1990)](https://yunliweb.its.unc.edu/pdf/GopenGD_SwanJA1990AS_ScientificWriting.pdf) | [ACADEMIC] | `sources/yunliweb.its.unc.edu/pdf/` | 1990 | 2026-03-19 | KEY: Most-cited article in American Scientist history. Reader-expectation framework: topic position (old info) → stress position (new info). "Information is interpreted more easily if it is placed where readers expect to find it." |
| 10 | [Rachel Thomas / fast.ai — "Advice for Better Blog Posts"](https://www.fast.ai/posts/2019-05-13-blogging-advice.html) | [TUTORIAL] | `sources/fast.ai/posts/2019-05-13-blogging-advice.html/` | 2019-05 | 2026-03-19 | KEY: Choose one specific target audience. Combine stories, statistics, research, visuals. Don't be too general. Motivation before algorithms. |
| 11 | [Jason Wei — "Practicing AI Research"](https://www.jasonwei.net/blog/practicing-ai-research) | [TUTORIAL] | `sources/jasonwei.net/blog/practicing-ai-research/` | ~2023 | 2026-03-19 | KEY: Google Brain researcher. Four research skills: idea conception, experiment design, writing, maximizing impact. "Spend extra effort on abstracts and introductions, use simple language." |
| 12 | [CMU 10717: The Art of the Paper (Zachary Lipton)](https://github.com/acmi-lab/cmu-10717-the-art-of-the-paper) | [COURSE] | `sources/github.com/acmi-lab/cmu-10717-the-art-of-the-paper/` | 2022 | 2026-03-19 | KEY: Full CMU ML Dept course. "Failures of writing nearly always betray failures of critical thinking." Covers: anatomy of CS conference paper, style & mechanics, rebuttal writing. |
| 13 | [Jim Kurose — "Writing a Good Introduction"](https://www-net.cs.umass.edu/kurose/writing/intro-style.html) | [ACADEMIC] | `sources/www-net.cs.umass.edu/kurose/writing/intro-style.html/` | ~2010 | 2026-03-19 | KEY: UMass professor. Five-paragraph intro formula: motivation → problem → thesis/contribution → differentiation → roadmap. |
| 14 | [SPUR Lab — "Writing a Related Work Section"](https://www.spur.science/resources/related_work) | [ACADEMIC] | `sources/spur.science/resources/related_work/` | ~2023 | 2026-03-19 | KEY: Three goals: show novelty, demonstrate field knowledge, bring readers up to speed. Thematic organization, 1 page in 2-column format. |
| 15 | [Distill.pub — "Communicating with Interactive Articles"](https://distill.pub/2020/communicating-with-interactive-articles) | [ACADEMIC] | `sources/distill.pub/2020/communicating-with-interactive-articles/` | 2020 | 2026-03-19 | KEY: Theory of interactive research communication. Interactive articles improve recall and engagement vs. static PDFs. Synthesizes education, journalism, and visualization research. |
| 16 | [Steven Pinker — "Why Academics' Writing Stinks" / The Sense of Style](https://stevenpinker.com/files/pinker/files/pinker_2014_why_academics_writing_stinks.pdf) | [TEXTBOOK] | `sources/stevenpinker.com/files/pinker/files/pinker_2014_why_academics_writing_stinks.pdf` | 2014 | 2026-03-19 | KEY: "The curse of knowledge" as primary cause of bad academic writing. Advocates classic style: concrete language, conversational tone. |
| 17 | [Jiang et al. — "What Drives Paper Acceptance?" (ICLR 2017-2025 study)](https://openreview.net/forum?id=iSqOXQ7bCc) | [ACADEMIC] | `sources/arxiv-2509.25701/` | 2025 | 2026-03-19 | KEY: Large-scale empirical study of 28K+ ICLR submissions. Clearer writing, balanced visual presentation, and better structure correlate with higher acceptance. "Factors beyond scientific novelty significantly shape acceptance outcomes." |
| 18 | [Ermis et al. — "Counterfactual LLM Framework for Measuring Rhetorical Style"](https://arxiv.org/abs/2512.19908) | [ACADEMIC] | `sources/arxiv-2512.19908/` | 2025 | 2026-03-19 | KEY: "Visionary framing significantly predicts downstream attention, including citations and media attention, even after controlling for peer-review evaluations." |
| 19 | [Devi Parikh, Dhruv Batra, Stefan Lee — "How We Write Rebuttals"](https://medium.com/@deviparikh/how-we-write-rebuttals-dc84742fece1) | [TUTORIAL] | `sources/medium.com/@deviparikh/how-we-write-rebuttals-dc84742fece1/` | ~2020 | 2026-03-19 | KEY: "Focus on having a champion." Write rebuttals to arm your champion reviewer. Audience is the Area Chair. |
| 20 | [Jakob Foerster — "How to ML Paper: A Brief Guide"](https://docs.google.com/document/d/16R1E2ExKUCP5SlXWHr-KzbVDx9DBUclra-EbU8IB-iE/edit) | [ACADEMIC] | `sources/jakobfoerster.com/how-to-ml-paper/` (partial) | ~2022 | 2026-03-19 | KEY: Oxford professor's brief guide for ML paper structure. Referenced by Farquhar. Google Docs format. |
| 21 | [Andrej Karpathy — "A Survival Guide to a PhD"](https://karpathy.github.io/2016/09/07/phd/) | [TUTORIAL] | `sources/karpathy.github.io/2016/09/07/phd/` | 2016 | 2026-03-19 | KEY: Reading material ≠ understanding. You must re-derive concepts from memory. Evaluating whether topics produce meaningful contributions. |
| 22 | [Bill Freeman — "How to Write a Good CVPR Paper" (slides)](https://billf.mit.edu/sites/default/files/documents/cvprPapers.pdf) | [ACADEMIC] | `sources/sites.google.com/view/making-reviews-great-again/` | 2020 | 2026-03-19 | KEY: 34-page CVPR presentation. High-quality papers require multiple revisions. The critical step is beginning to write. (PDF behind login; tutorial page downloaded instead.) |
| 23 | [Pangram Labs — "21% of ICLR Reviews are AI-Generated"](https://www.pangram.com/blog/pangram-predicts-21-of-iclr-reviews-are-ai-generated) | [ACADEMIC] | `sources/pangram.com/blog/pangram-predicts-21-of-iclr-reviews-are-ai-generated/` | 2025-11 | 2026-03-19 | KEY: Analysis of all 75,800 ICLR 2026 reviews; 21% fully AI-generated, 50%+ showed some AI use, 1% of manuscripts fully AI-generated. Graham Neubig initiated investigation. |
| 24 | [Liang et al. — "Monitoring AI-Modified Content at Scale" (ICML 2024)](https://proceedings.mlr.press/v235/liang24b.html) | [ACADEMIC] | `sources/arxiv-2405.02150/` | 2024 | 2026-03-19 | KEY: 6.5-16.9% of reviews AI-modified. Adjective frequency spikes: "commendable" 9.8x, "meticulous" 34.7x, "intricate" 11.2x. Lower-confidence, deadline-adjacent reviews more likely AI. |
| 25 | [ICLR 2025 LLM Review Feedback RCT (Nature Machine Intelligence)](https://arxiv.org/abs/2504.09737) | [ACADEMIC] | `sources/arxiv-2504.09737/` | 2025-04 | 2026-03-19 | KEY: 20K+ reviews, 27% of reviewers updated; 89% blinded evaluation found LLM feedback improved quality; +80 words length; no acceptance impact. Published in Nature MI. |
| 26 | [Shen et al. — "Mind the Blind Spots" (EMNLP 2025)](https://aclanthology.org/2025.emnlp-main.1805/) | [ACADEMIC] | `sources/arxiv-2502.17086/` | 2025 | 2026-03-19 | KEY: Focus-level evaluation framework. LLMs over-focus on technical validity, neglect novelty assessment. 59.42% fewer critical entities in weakness sections vs humans. 676 reviews, 3,657 annotated items. |
| 27 | [RefereeSim — Cross-section consistency study](https://openreview.net/pdf?id=QXyeIJ9PQ3) | [ACADEMIC] | `sources/openreview.net/forum/QXyeIJ9PQ3/` | 2025 | 2026-03-19 | KEY: Only 36.4% (4/11) LLMs caught abstract-methods sample-size discrepancy. Cohere and Gemini succeeded; DeepSeek, Llama, OpenAI failed. |
| 28 | [PRISMM-Bench — Multimodal inconsistency detection](https://arxiv.org/html/2510.16505v2) | [ACADEMIC] | `sources/arxiv-2510.16505/` | 2025 | 2026-03-19 | KEY: 26.1-54.2% performance from 21 leading multimodal models detecting inconsistencies across text, figures, tables, equations in real papers. |
| 29 | [Prompt injection attacks on LLM reviews](https://arxiv.org/html/2509.10248v2/) | [ACADEMIC] | `sources/arxiv-2509.10248/` | 2025 | 2026-03-19 | KEY: White-text hidden injections achieve up to 100% acceptance rates. Mean rating increase 1.24-1.64 points. Actual submissions found with "IGNORE ALL PREVIOUS INSTRUCTIONS." |
| 30 | [LLM bias in peer review — affiliation and status](https://openreview.net/forum?id=iXvaR93WqE) | [ACADEMIC] | `sources/openreview.net/forum/iXvaR93WqE/` | 2025 | 2026-03-19 | KEY: LLMs favor highly-ranked institutions and senior authors. Biases can shift acceptance for borderline papers. Hidden biases persist even under Chain-of-Thought prompting. |
| 31 | [ICLR 2026 LLM policy](https://blog.iclr.cc/2025/11/19/iclr-2026-response-to-llm-generated-papers-and-reviews/) | [ACADEMIC] | `sources/blog.iclr.cc/2025/11/19/iclr-2026-response-to-llm-generated-papers-and-reviews/` | 2025-11 | 2026-03-19 | KEY: Mandatory LLM disclosure, desk-rejection for undisclosed use, hallucinated content = Code of Ethics violation. Reviewer's own papers can be desk-rejected for bad-faith LLM reviews. |
| 32 | [ICML 2026 LLM two-policy framework](https://icml.cc/Conferences/2026/LLM-Policy) | [ACADEMIC] | `sources/icml.cc/Conferences/2026/LLM-Policy/` | 2026 | 2026-03-19 | KEY: Policy A (no LLM) vs Policy B (permissive). Authors can require Policy A reviews. Watermark detection found 795 violations, 497 desk rejections. |

:::

---

## Chapter Overview

**Total sections:** 7 (plus introduction and closing)
**Estimated total length:** 12,000-16,000 words
**Running example:** Two versions of the same technical contribution: a fictional method called "TokenMix" (a data augmentation technique for language models). We follow the same author writing up TokenMix as (a) a blog post for a broad ML audience and (b) a NeurIPS main conference submission. The running example shows how the same underlying idea gets expressed, structured, hedged, cited, and visualized differently in each medium. Key scenes: the hook is the author receiving a desk-reject with the comment "poorly written; contribution unclear" despite strong empirical results, then learning how to rewrite the same content.

### Hook & Running Example Design

The chapter opens with a scenario every early-career AI researcher dreads: you submit your first paper to a top venue, and the reviews come back brutal. Not because the method is bad, but because the *writing* is bad. One reviewer writes "contribution unclear," another says "paper is hard to follow," and the third says "reads more like a blog post than a research paper." The empirical results are strong, but the paper is rejected.

This is not a hypothetical. Zachary Lipton (CMU) teaches an entire graduate course on scientific writing because "failures of writing nearly always betray failures of critical thinking." A large-scale study of 28,000+ ICLR submissions (Jiang et al., 2025) found that writing clarity, visual presentation quality, and paper structure independently predict acceptance, even controlling for scientific novelty. Writing is not decoration on top of research; it *is* part of the research.

The running example follows our author rewriting their TokenMix contribution twice: once as a blog post (for a technical audience that reads Lilian Weng and Chris Olah) and once as a NeurIPS submission (for three anonymous reviewers who each have 20 papers to review in two weeks). Each section of the chapter shows a specific aspect of writing (the abstract, the introduction, the related work, the experimental section, the figures) and contrasts how the same content looks in each medium. By the end, the reader will have a concrete mental model for "what makes conference paper writing different from blog post writing" and a reference-grade style guide they can return to.

The hook also establishes a key framing: the difference between papers and blogs is not "formal vs. informal." It is a difference in *purpose*, *audience*, *burden of proof*, and *genre conventions*. Understanding these four axes transforms vague advice ("write more formally") into actionable principles.

**Hook Image:** The D2 concept map from @sec-two-genres (Section 2) showing the four axes (purpose, audience, burden of proof, genre conventions) with concrete examples from paper and blog on each axis. This image bridges the hook's narrative and the chapter's analytical framework.

---

## Section Plan

### Section 1: Introduction — Why Writing Is the Research {#sec-introduction}

**File:** `_01-introduction.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** Convince the reader that writing quality is not cosmetic; it is a load-bearing part of the research process in AI. Establish why this chapter exists and what it will deliver.
**Running example application:** Introduce the TokenMix scenario: strong results, desk-rejected for "poorly written; contribution unclear." Set up the central question.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| [CMU 10717 Syllabus] | `sources/github.com/acmi-lab/cmu-10717-the-art-of-the-paper/README.md` | Course description paragraph | Lipton quote: "failures of writing nearly always betray failures of critical thinking" |
| [Jiang et al., 2025 (ICLR acceptance study)] | `sources/arxiv-2509.25701/` | Abstract and key findings | Writing clarity independently predicts acceptance across 28K+ submissions |
| [Simon Peyton Jones] | `sources/simon.peytonjones.org/great-research-paper/` | Opening section | "Writing is a primary mechanism for doing research, not just reporting it" |
| [Michael Ernst] | `sources/pag.csail.mit.edu/~mernst/advice/write-technical-paper.html/` | Opening section | "The purpose of research is to increase human knowledge, so communicating your work is crucial" |
| [Frédo Durand] | `sources/people.csail.mit.edu/fredo/PUBLI/writing.pdf` | Opening pages | "Papers can be rejected based on poor writing alone" |
| [Ermis et al., 2025 (Rhetorical style study)] | `sources/arxiv-2512.19908/` | Abstract | "Visionary framing significantly predicts downstream attention, including citations" |

**Content outline:**
1. The TokenMix hook: strong results, brutal reviews, all about writing
2. The empirical case: writing quality predicts paper acceptance (Jiang et al. 2025) and citation impact (Ermis et al. 2025)
3. Writing as a research tool, not a report: Peyton Jones ("writing IS doing research"), Lipton ("failures of writing betray failures of thinking"), Ernst ("communicating is the purpose")
4. What this chapter delivers: a systematic comparison of two genres (paper vs blog), culminating in a reference-grade style guide for conference papers
5. Roadmap paragraph previewing the 6 sections

**Key equations:** None
**Visualizations:** None (save the concept map for Section 2)
**Source images to embed:** None

---

### Section 2: Two Genres, One Author — Papers vs. Blog Posts as Communication Systems {#sec-two-genres}

**File:** `_02-two-genres.qmd`
**Estimated length:** 2,000-2,500 words
**Goal:** Build a systematic framework for understanding the differences between conference papers and blog posts. Not just "formal vs. informal" but a structured comparison across four axes: purpose, audience, burden of proof, and genre conventions. This section is the analytical backbone of the chapter.
**Running example application:** Show the same TokenMix "hook paragraph" written in both genres side by side. The blog version opens with a story; the paper version opens with a problem statement.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| [Alex Irpan — "Blog Posts and Research Papers"] | `sources/alexirpan.com/2018/03/07/blog-paper.html/` | Full post | "Blog posts encourage stating opinions; papers encourage stating truths." Burden of proof difference. Blog: multimedia front-and-center. Paper: supplemental. |
| [Distill.pub — Communicating with Interactive Articles] | `sources/distill.pub/2020/communicating-with-interactive-articles/` | Introduction and "Why Interactive?" sections | Interactive articles improve recall and engagement vs static formats. The spectrum from paper to blog to interactive article. |
| [Rachel Thomas — Blogging Advice] | `sources/fast.ai/posts/2019-05-13-blogging-advice.html/` | Audience section | "Choose one specific target audience member" for blog posts. |
| [Hedging in scientific writing] | `sources/stevenpinker.com/files/pinker/files/pinker_2014_why_academics_writing_stinks.pdf` | Hedging section | Role of hedging language in papers vs. directness in blogs. |
| [Steven Pinker — Sense of Style] | `sources/stevenpinker.com/files/pinker/files/pinker_2014_why_academics_writing_stinks.pdf` | Curse of knowledge chapter | Papers assume shared context; blogs must bridge knowledge gaps. |

**Content outline:**
1. **Axis 1: Purpose** — Paper = "contribute a verifiable claim to the scientific record." Blog = "teach, explain, or argue to a broad audience." The paper's claim will be cited and built upon; the blog's explanation will be bookmarked and shared. Different purposes create different constraints.
2. **Axis 2: Audience** — Paper = 3 anonymous reviewers with domain expertise, plus future researchers searching for citations. Blog = anyone interested, from undergrads to industry engineers. The paper audience is hostile by design (they are *looking* for flaws). The blog audience is benevolent (they chose to read).
3. **Axis 3: Burden of proof** — Paper = every claim must be supported by evidence, citations, or proofs. Hedging language ("we observe that," "results suggest") is expected. Blog = the author's reputation is the primary warrant. "I think X" is acceptable. Direct claims ("this is wrong") are encouraged.
4. **Axis 4: Genre conventions** — Paper = rigid structure (abstract, intro, related work, method, experiments, conclusion), page limits, LaTeX templates, anonymous review. Blog = flexible structure, no page limits, author-branded, multimedia-first.
5. **Side-by-side comparison table** — A comprehensive mapping table showing the same writing task (opening hook, making a claim, citing prior work, showing results, visual presentation) in paper vs. blog format.
6. **The convergence zone** — Where the two genres overlap: Distill.pub as a hybrid. Some blog posts become papers (Irpan's RL critique). Some papers read like blogs (Karpathy's style).

**Key equations:** None
**Visualizations:**
- D2 concept map: Four axes (purpose, audience, burden of proof, conventions) with paper and blog branches
- Comparison table: paper vs. blog across ~8 writing tasks

**Source images to embed:** None

---

### Section 3: Anatomy of a Conference Paper — Section by Section {#sec-anatomy}

**File:** `_03-anatomy.qmd`
**Estimated length:** 2,500-3,000 words
**Goal:** Walk through each section of a standard AI conference paper (abstract, introduction, related work, method, experiments, conclusion) with concrete, sourced advice on what to write, how to write it, and what mistakes to avoid. This is the most instructive section of the chapter.
**Running example application:** For each section, show the TokenMix version: what the abstract looks like, what the introduction structure is, how related work is organized, etc.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| [Farquhar — "How to Write ML Papers"] | `sources/sebastianfarquhar.com/on-research/2024/11/04/how_to_write_ml_papers/` | Abstract and Introduction sections | Abstract formula: 2+1+1+1 sentences. Introduction: 2-3+2-4+2-4 sentences. Avoid lengthy recaps. |
| [Steinhardt — "Advice for Authors"] | `sources/jsteinhardt.stat.berkeley.edu/blog/advice-for-authors/` | Abstract and Introduction advice | Two-sentence abstract opening strategy. "Don't make readers wait." "Don't beat around the bush." |
| [Peyton Jones — Slides] | `sources/cis.upenn.edu/~sweirich/icfp-plmw15/slides/` | "Nail your contributions" section | Introduction = 1 page: problem via example + contributions list. Abstract = 4 sentences. |
| [Kurose — Writing a Good Introduction] | `sources/www-net.cs.umass.edu/kurose/writing/intro-style.html/` | Full page | Five-paragraph formula: motivation → problem → thesis → differentiation → roadmap. |
| [SPUR Lab — Related Work] | `sources/spur.science/resources/related_work/` | Full page | Three goals, thematic organization, ~1 page, final paragraph for contributions. |
| [Schulzrinne — Writing Technical Articles] | `sources/cs.columbia.edu/~hgs/etc/writing-style.html/` | Paper structure section | Four categories of technical results. Abstract 100-150 words. Body structure. |
| [Michael Ernst — Technical Paper] | `sources/pag.csail.mit.edu/~mernst/advice/write-technical-paper.html/` | Structure sections | Convince readers: solved it, it's hard, it's important. Each section gets a mini-introduction. |
| [Wei — Practicing AI Research] | `sources/jasonwei.net/blog/practicing-ai-research/` | Writing section | "Spend extra effort on abstracts and introductions, use simple language, make figures stand-alone." |

**Content outline:**
1. **The Abstract** (subsection)
   - Farquhar's formula: 2 evidence sentences + 1 method teaser + 1 importance + 1 contribution = 150-250 words
   - Steinhardt's two-sentence opening: something the reader agrees with → something surprising
   - Peyton Jones's four-sentence formula: problem → why interesting → what your solution achieves → what follows
   - Common mistakes: too vague, too long, no concrete results, reads like an intro
   - TokenMix example abstract (paper version vs. blog teaser paragraph)

2. **The Introduction** (subsection)
   - Kurose's five-paragraph formula: motivation → problem → contribution → differentiation → roadmap
   - Peyton Jones: "1 page; describe the problem with an example, then state your contributions. Nothing more."
   - Farquhar: avoid lengthy prior work recaps, avoid future work speculation
   - Steinhardt: "Don't make readers wait. Spell out the payoff early."
   - "Nail your contributions to the mast" — use explicit bullet points for contributions
   - Wei: "Frame results in broader context so readers understand importance"
   - Common mistakes: burying the contribution, excessive background, no example
   - TokenMix intro: paper version with contribution bullets vs. blog version building narrative

3. **Related Work** (subsection)
   - Three goals (SPUR Lab): show novelty, demonstrate knowledge, bring readers up to speed
   - Thematic organization: 2-4 categories, not paper-by-paper
   - Final paragraph: "The main contributions of our work..."
   - Positioning: how to be generous to prior work while showing your gap
   - ~1 page in 2-column format
   - Common mistakes: listing papers without analysis, adversarial framing of competitors

4. **Method / Approach** (subsection)
   - Ernst: explain both what AND why at every step
   - Durand: sell ideas and solutions, not implementations
   - Use figures to ground the explanation
   - Start with high-level overview, then zoom into details
   - Notation consistency
   - Common mistakes: jumping into equations without motivation, missing algorithmic pseudocode

5. **Experiments** (subsection)
   - Schulzrinne: performance evaluation through analysis, simulation, or measurement
   - Baselines, datasets, metrics, ablation studies
   - Table design: clear baselines, bold best results, standard deviations
   - "Make figures stand-alone" (Wei) — every figure should be interpretable without reading the text
   - Common mistakes: cherry-picked metrics, missing error bars, no ablation, unfair baselines

6. **Conclusion** (subsection)
   - Restate contributions (not the abstract verbatim)
   - Limitations (mandatory at many venues)
   - Future work: frame as limitations, not speculation (Farquhar)
   - Brevity: 0.5-1 page

**Key equations:** None (this section is about structure, not math)
**Visualizations:**
- D2 diagram: flowchart showing the standard paper structure with approximate page allocations
- Example table: before/after of a badly-structured abstract vs. a well-structured one

**Source images to embed:** None

---

### Section 4: A Style Guide for Scientific Paper Writing in AI {#sec-style-guide}

**File:** `_04-style-guide.qmd`
**Estimated length:** 2,500-3,000 words
**Goal:** Provide a comprehensive, reference-grade style guide for scientific conference paper writing in AI/CS. This section should be structured like writing-style.md but adapted for the scientific paper genre. Every rule should be sourced from experts. This is the section readers will bookmark and return to.
**Running example application:** Each rule includes a BAD/GOOD example pair drawn from (fictionalized) TokenMix paper text.

**CRITICAL NOTE:** This is the section the user specifically requested. It must be structured as concrete, actionable rules with DO/DON'T examples, organized into subsections. It parallels the textbook writing-style.md but for the scientific paper domain.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| [Steinhardt — "Advice for Authors"] | `sources/jsteinhardt.stat.berkeley.edu/blog/advice-for-authors/` | Style advice sections | Consistent phrasing, avoid complex sentences, be concise, be precise ("accuracy" not "performance") |
| [Gopen & Swan — "Science of Scientific Writing" (1990)] | `sources/yunliweb.its.unc.edu/pdf/` | Full paper | Topic position → stress position. Reader-expectation framework. Context on left, new info on right. |
| [Durand — Writing Notes] | `sources/people.csail.mit.edu/fredo/PUBLI/writing.pdf` | Style recommendations | Shorter sentences, simpler English, avoid introducing two ideas in one sentence, use redundancy (preview-explain-recap). |
| [Pinker — Sense of Style / Why Academics' Writing Stinks] | `sources/stevenpinker.com/files/pinker/files/pinker_2014_why_academics_writing_stinks.pdf` | Curse of knowledge chapter | Nominalizations, zombie nouns, compulsive hedging, metadiscourse |
| [Schulzrinne — Writing Technical Articles] | `sources/cs.columbia.edu/~hgs/etc/writing-style.html/` | Style sections | Strunk & White recommendations, tense usage, figure design |
| [Ernst — Technical Paper] | `sources/pag.csail.mit.edu/~mernst/advice/write-technical-paper.html/` | Style sections | Write for readers not yourself, explain what AND why, cut irrelevant details |
| [CMU 10717 — Art of the Paper] | `sources/github.com/acmi-lab/cmu-10717-the-art-of-the-paper/README.md` | Course description | "The scientific voice (e.g., what we mean by 'we'), and the {how, when, and why} of citations" |
| [Hedging literature] | `sources/stevenpinker.com/files/pinker/files/pinker_2014_why_academics_writing_stinks.pdf` | Key patterns | May/might/could/suggest/observe — when and how to hedge |

**Content outline:**

1. **Sentence-Level Style** (subsection)
   - **Gopen & Swan's Given-New Contract for scientific writing:** Topic position (old info, what reader knows) → stress position (new info, what's important). Every sentence should flow old → new. SOURCE: Gopen & Swan 1990, most-cited article in American Scientist history.
   - **One idea per sentence:** Durand: "Avoid introducing two ideas in one sentence." SOURCE: Durand, Notes on Writing.
   - **Keep sentences short and simple:** Durand: "Use shorter sentences and simpler English — most readers aren't native speakers." SOURCE: Durand. Non-native speakers of English now produce the majority of AI papers.
   - **Subject-verb proximity:** Do not front-load long modifiers before the main verb. SOURCE: Gopen & Swan, Steinhardt.
   - **Avoid nominalizations ("zombie nouns"):** Pinker's term for verbs turned into nouns (-tion, -ment, -ness). "The optimization of the loss function was performed" → "We optimized the loss function." SOURCE: Pinker 2014.
   - **Be precise, not vague:** Steinhardt: use "accuracy" or "F1" not "performance." Use "3 layers" not "several layers." SOURCE: Steinhardt.
   - DO/DON'T table with ~6 example pairs

2. **Paragraph-Level Style** (subsection)
   - **One claim per paragraph:** Standard academic writing rule.
   - **Topic sentence first:** The first sentence of every paragraph should state its main point. Readers (and reviewers) skim topic sentences.
   - **Durand's preview-explain-recap pattern:** "Use redundancy: preview, explain, then recap." SOURCE: Durand.
   - **Ernst's mini-introductions:** Each section should open with a 1-2 sentence overview of what the section covers and how parts relate. SOURCE: Ernst.
   - **Transition sentences:** Connect paragraphs with bridging logic, not just "Additionally" or "Moreover."

3. **The Scientific Voice** (subsection)
   - **"We" in scientific writing:** The scientific "we" (even single authors use "we" in CS). Lipton's CMU course covers "what we mean by 'we'." SOURCE: CMU 10717.
   - **Active vs. passive voice:** Active voice for your contributions ("We propose..."). Passive for known facts or methods by others ("X has been shown to..."). Not a binary rule — use passive when the agent is irrelevant.
   - **Hedging and confidence calibration:** Papers require calibrated confidence. "We show" = strong claim (backed by proof/experiment). "We observe" = empirical finding. "Results suggest" = tentative. "We hypothesize" = speculation. Use hedging where appropriate, but excessive hedging signals uncertainty. Table of hedge verbs with their confidence levels.
   - **Tense usage:** Present tense for established facts and your claims. Past tense for experimental procedure ("We trained the model..."). Future tense sparingly, for future work only.

4. **Citation and Attribution Style** (subsection)
   - **When to cite:** Every factual claim not your own. Every method you use. Every dataset. Every baseline.
   - **How to cite:** Parenthetical (Author et al., 2024) for background. Narrative "Author et al. (2024) showed..." for emphasis.
   - **Over-citation vs. under-citation:** Under-citation = reviewers think you missed key work (reject). Over-citation = noise, hard to read.
   - **Self-citation etiquette:** Necessary for building on your own work. Excessive = annoying to reviewers. Third-person during blind review.
   - **arXiv vs. published:** Always cite the peer-reviewed version if available. Conference papers over arXiv preprints.

5. **Figure and Table Design** (subsection)
   - **Figures must be self-contained:** Wei: "Make figures stand-alone." Caption + axes + legend must tell the story without reading text.
   - **Resolution and format:** Vector (PDF/SVG) for diagrams, 300+ DPI for plots. Color-blind-safe palettes.
   - **Table design:** Bold best results. Include standard deviations. Clear baselines. Schulzrinne's recommendations.
   - **Architecture figures:** Start writing with the overview figure (Durand). The main figure should explain your method at a glance.
   - **Size and placement:** Fill column width or page width. Never tiny figures. Caption below figures, above tables.

6. **Common Anti-Patterns** (subsection)
   - Table of 10-12 common writing anti-patterns with BAD/GOOD examples:
     - Vague openings ("In recent years, X has gained increasing attention...")
     - Burying the contribution
     - Synonym cycling (inconsistent terminology)
     - Marketing language ("state-of-the-art," "novel," "groundbreaking" without evidence)
     - Starting sentences with "It is" or "There are"
     - Dangling modifiers
     - Walls of text without visual breaks
     - Equations without explanation
     - Undefined notation
     - Unnecessary formalism for simple ideas

**Key equations:** None
**Visualizations:**
- Table: hedging verbs ranked by confidence level
- Table: 10-12 anti-patterns with BAD/GOOD examples
- Table: DO/DON'T sentence-level examples (~6 pairs)

**Source images to embed:** None

---

### Section 5: Writing for the AI Reviewer — How LLMs Read Your Paper {#sec-ai-reviewer}

**File:** `_05-ai-reviewer.qmd`
**Estimated length:** 2,200-2,800 words
**Goal:** Equip the reader with a deep, evidence-based understanding of the new reality: a substantial fraction of peer reviews at top AI conferences are now written (or heavily assisted) by LLMs. This section explains what LLM reviewers focus on, what they miss, how they differ from human reviewers, what biases they carry, and how to write papers that are robust and convincing to both AI and human reviewers. It also covers the ethical and strategic implications of this shift, including prompt injection attacks and conference detection policies.
**Running example application:** Show how the TokenMix paper would be evaluated differently by an LLM reviewer vs. a human reviewer. The LLM praises the well-structured method section but misses the novelty of the approach relative to prior work. The human reviewer catches the novelty but complains about figure clarity. This illustrates the complementary blind spots.

**CRITICAL NOTE:** This is a new reality in AI publishing that most writing guides do not cover. The reader needs to understand: (a) how prevalent AI reviewing is, (b) what LLM reviewers actually do well and poorly, (c) concrete writing strategies that are robust to both reviewer types, and (d) the ethical boundaries (what is legitimate writing optimization vs. what is manipulation).

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| [Pangram Labs — ICLR 2026 analysis] | `sources/pangram.com/blog/pangram-predicts-21-of-iclr-reviews-are-ai-generated/` | Key statistics | 21% of ICLR 2026 reviews fully AI-generated; 50%+ showed AI use; 1% of papers fully AI-generated |
| [Liang et al. — "Monitoring AI-Modified Content at Scale" (ICML 2024)](https://proceedings.mlr.press/v235/liang24b.html) | `sources/arxiv-2405.02150/` | Adjective analysis | 6.5-16.9% of reviews AI-modified; "commendable" 9.8x, "meticulous" 34.7x, "intricate" 11.2x increase |
| [ICLR 2025 LLM Feedback RCT (Nature MI)](https://arxiv.org/abs/2504.09737) | `sources/arxiv-2504.09737/` | Key findings | 27% of reviewers updated after LLM feedback; 89% found feedback improved quality; no impact on acceptance decisions |
| [Shen et al. — "Mind the Blind Spots" (EMNLP 2025)](https://aclanthology.org/2025.emnlp-main.1805/) | `sources/arxiv-2502.17086/` | Blind spot analysis | LLMs over-focus on technical validity, neglect novelty assessment; 59.42% fewer critical entities in weakness sections vs humans |
| [RefereeSim cross-section study] | `sources/openreview.net/forum/QXyeIJ9PQ3/` | Cross-section consistency | Only 36.4% of LLMs caught abstract-methods sample size discrepancy; DeepSeek, Llama, OpenAI models failed entirely |
| [PRISMM-Bench multimodal inconsistency] | `sources/arxiv-2510.16505/` | Performance results | 26.1-54.2% performance detecting inconsistencies across text, figures, tables, equations |
| [Prompt injection attacks on LLM reviews](https://arxiv.org/html/2509.10248v2/) | `sources/arxiv-2509.10248/` | Attack effectiveness | White-text injection achieves up to 100% acceptance; mean rating increase of 1.24-1.64 points |
| [LLM bias in peer review (affiliation, status)](https://openreview.net/forum?id=iXvaR93WqE) | `sources/openreview.net/forum/iXvaR93WqE/` | Bias findings | LLMs favor highly-ranked institutions and senior authors; rating inflation for lower-quality papers |
| [ICLR 2026 LLM policy](https://blog.iclr.cc/2025/11/19/iclr-2026-response-to-llm-generated-papers-and-reviews/) | `sources/blog.iclr.cc/2025/11/19/iclr-2026-response-to-llm-generated-papers-and-reviews/` | Policy details | Mandatory disclosure, desk-rejection for undisclosed extensive LLM use, Code of Ethics violations |
| [ICML 2026 LLM policy](https://icml.cc/Conferences/2026/LLM-Policy) | `sources/icml.cc/Conferences/2026/LLM-Policy/` | Two-policy framework | Policy A (no LLM) vs Policy B (permissive); watermark-based detection; 795 violations found |
| [LLM reviewer quality comparison (Peer Review Congress)](https://peerreviewcongress.org/abstract/quality-and-comprehensiveness-of-peer-reviews-of-journal-submissions-produced-by-large-language-models-vs-humans/) | `sources/peerreviewcongress.org/abstract/llm-vs-human-review-quality/` | Strengths/weaknesses scores | LLMs: 4.12 vs humans: 2.70 for identifying strengths; LLMs: 3.72 vs humans: 1.80 for writing feedback |
| [NEJM AI — LLM feedback usefulness](https://ai.nejm.org/doi/abs/10.1056/AIoa2400196) | `sources/peerreviewcongress.org/abstract/llm-vs-human-review-quality/` (paywalled; related data from Peer Review Congress) | Overlap findings | LLM-human feedback overlap (30.85-39.23%) matches human-human overlap (28.58-35.25%); 82.4% found LLM feedback better than some human reviewers |

**Content outline:**

1. **The scale of the shift: how many reviews are AI-generated?** (subsection)
   - Pangram Labs finding: 21% of ICLR 2026 reviews fully AI-generated, 50%+ showed some AI use
   - Liang et al. (ICML 2024): 6.5-16.9% at ICLR 2024, NeurIPS 2023, CoRL 2023, EMNLP 2023
   - The trend line: from ~7% in 2023 to ~21% in 2026, tracking with LLM capability improvements
   - The linguistic fingerprints: "commendable" (9.8x), "meticulous" (34.7x), "intricate" (11.2x) frequency spikes (Liang et al.)
   - Why this happens: reviewer overload (NeurIPS went from 9,467 submissions in 2020 to 21,575 in 2025), unpaid labor, tight deadlines
   - Conference responses: ICLR 2026 mandatory disclosure + desk rejection; ICML 2026 two-policy framework with watermark detection

2. **What LLM reviewers are good at — and what they miss** (subsection)
   - **Strengths of LLM reviewers:**
     - Better at identifying and articulating strengths/weaknesses (4.12 vs 2.70 human scores)
     - More constructive feedback on writing, organization, tables, figures (3.72 vs 1.80)
     - Consistent structure and coverage of standard evaluation criteria
     - LLM-human feedback overlap (30.85-39.23%) matches human-human overlap (28.58-35.25%), suggesting comparable breadth
   - **Critical blind spots of LLM reviewers:**
     - **Novelty assessment:** "Significantly biased focus towards examining technical validity while overlooking novelty assessment" (Shen et al., EMNLP 2025). LLMs can tell if your method is sound, but struggle to judge whether it is *new*.
     - **Cross-section consistency:** Only 36.4% of tested LLMs caught a basic sample-size discrepancy between abstract and methods. DeepSeek, Llama, and OpenAI models failed entirely (RefereeSim study). LLMs read sections somewhat independently; they struggle to hold the whole paper in coherent memory.
     - **Multimodal inconsistency:** 26.1-54.2% performance detecting mismatches between text, figures, tables, and equations (PRISMM-Bench). If your figure contradicts your text, an LLM reviewer may not catch it.
     - **Weakness identification depth:** LLMs produce 59.42% fewer critical entities in weakness sections vs humans (Shen et al.). They tend to surface-level critique.
     - **Rating inflation:** LLMs inflate ratings for lower-quality papers while aligning more closely with human judgments on stronger papers. They have an acceptance bias (>95% positive in many configurations).
   - **Biases of LLM reviewers:**
     - Favor authors from highly-ranked institutions (affiliation bias)
     - Favor senior authors with long publication histories (status bias)
     - Susceptible to stylistic cues: small modifications without changing factual content can flip borderline decisions

3. **How to write papers robust to both AI and human reviewers** (subsection — the actionable core)
   - **Maximize internal consistency.** LLMs struggle with cross-section verification, but when they *do* check, they check numbers and specific claims. Make sure your abstract numbers match your methods, your methods match your results tables, and your conclusion accurately restates your findings. Treat your paper as a contract where every claim in the abstract has a corresponding evidence cell in the results.
   - **Make novelty explicit.** LLMs under-evaluate novelty. If your paper's novelty is subtle (e.g., a new theoretical connection rather than a new architecture), spell it out in plain language: "To the best of our knowledge, this is the first work to..." Human reviewers pick up implicit novelty from context; LLM reviewers often do not.
   - **Structure for parseability.** LLMs evaluate papers section by section. Use clear section headings, numbered contributions in the introduction, explicit "Our contributions are" lists, and clearly labeled ablation studies. This helps both LLM and human reviewers who are skimming.
   - **Avoid LLM-detectable language.** If your paper reads like it was written by ChatGPT, a reviewer (human or AI-detection tool) may flag it. Avoid the telltale adjectives: "commendable," "meticulous," "intricate," "innovative," "notable." Use precise, domain-specific language instead of generic praise words.
   - **Make figures genuinely informative.** LLMs are weak at reading figures (26.1-54.2% accuracy on multimodal consistency). This means your figures must be backed up by text that restates their key findings. Do not rely on figures alone to make your argument. But human reviewers DO look at figures carefully, so invest in high-quality visuals regardless.
   - **Calibrate your hedging for dual audiences.** LLMs reward confident language ("we show" over "we observe"), but human reviewers penalize overclaiming. The sweet spot: make strong claims where your evidence is strong, hedge where it is weak, and clearly mark the boundary.
   - **Pre-check with AI tools.** Before submitting, run your paper through an LLM-based review tool yourself. The ICLR 2025 study showed 89% of researchers found LLM feedback improved review quality. If an LLM finds a weakness, a reviewer (human or AI) will too. Fix it before submission.

4. **The ethics of writing for AI reviewers** (subsection)
   - **What is legitimate:** Structuring clearly, making claims explicit, ensuring internal consistency, pre-submission LLM self-review. These improve the paper for all readers.
   - **What is manipulation:** Prompt injection (white text, hidden instructions), gaming rubric cues with superficial keyword stuffing, fabricating results that pass automated checks. Prompt injection attacks can increase ratings by 1.24-1.64 points, but papers have been withdrawn and authors sanctioned.
   - **The detection arms race:** ICML 2026 watermarks PDFs with hidden LLM instructions, detecting 795 policy violations from 506 reviewers, resulting in 497 desk rejections. ICLR 2026 uses Pangram-style detection and AC verification.
   - **The principle:** Write your paper to be genuinely good, not to game the reviewer. If your paper is robust to both AI and human review, it is simply a well-written paper.

5. **The future: hybrid reviewing and what it means for authors** (subsection)
   - ICLR 2025 RCT results: LLM feedback to reviewers increased review length by 80 words, improved informativeness, extended author-reviewer discussion. But no impact on acceptance decisions.
   - The trend toward "LLM-assisted review" rather than "LLM-generated review" — reviewers use LLMs as a first pass, then apply judgment.
   - What this means for authors: your paper will be read by both a machine and a human. The machine will check structure, consistency, and surface-level writing quality. The human will check novelty, significance, and deep technical correctness. Write for both.

**Key equations:** None
**Visualizations:**
- Table: LLM reviewer strengths vs weaknesses vs human reviewer strengths vs weaknesses (side-by-side comparison)
- Table: "Detectable AI language" — adjective frequency spikes from Liang et al.
- D2 diagram: The dual-audience model — how your paper is read by both AI and human reviewers, with what each evaluates

**Source images to embed:** None

---

### Section 6: How Top Researchers Write — The Craft Behind Influential Papers {#sec-top-researchers}

**File:** `_06-top-researchers.qmd`
**Estimated length:** 1,800-2,200 words
**Goal:** Examine how the most influential AI researchers use writing as a tool for impact. Go beyond structural advice to show how writing choices (framing, naming, storytelling, simplicity) determine whether a paper shapes the field or gets forgotten. Show that top researchers *do* care deeply about writing, contrary to the misconception that "only results matter."
**Running example application:** Compare how a journeyman researcher and a top researcher would frame the same TokenMix contribution. The difference is not in the results; it is in the framing.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| [Ermis et al., 2025 — Rhetorical style study] | `sources/arxiv-2512.19908/` | Abstract and findings | "Visionary framing significantly predicts downstream attention, including citations and media attention." |
| [Peyton Jones] | `sources/simon.peytonjones.org/great-research-paper/` | "Tell a Story" section | The narrative arc: problem → interesting → my idea → works → compares to others. |
| [CMU 10717 — Art of the Paper] | `sources/github.com/acmi-lab/cmu-10717-the-art-of-the-paper/README.md` | Course description | "Superior writing skills are often what differentiates influential scientists from their peers. Strong writers are better able to convince the wider field of what problems are worth solving." |
| [Jason Wei — Practicing AI Research] | `sources/jasonwei.net/blog/practicing-ai-research/` | Impact maximization section | The four skills. Writing as its own skill, separate from research. |
| [ABT Framework (And, But, Therefore)] | General concept (Randy Olson, *Houston, We Have a Narrative*, 2015) | Definition | Randy Olson's framework from storytelling literature applied to scientific papers. |
| [Nature — Art of Scientific Storytelling] | General reference (Nature Reviews Molecular Cell Biology, 2020) | Key points | Framing stories to "get where you want to go." |

**Content outline:**
1. **The myth that "only results matter"** — Lipton (CMU 10717): "Superior writing skills are often what differentiates influential scientists from their peers." The evidence from Ermis et al. 2025: visionary framing predicts citations independent of peer review scores. Writing IS the leverage.
2. **Naming as influence** — The power of naming your method well: "Attention Is All You Need," "ResNet," "BERT," "Chain-of-Thought." Names that stick enter the community's vocabulary and become shorthand. A good name is a meme in the Dawkins sense. Contrast with forgettable names.
3. **Storytelling in scientific papers** — Peyton Jones: "Tell a story." The ABT (And, But, Therefore) framework from science communication: "Language models can solve many NLP tasks (And). But they require task-specific fine-tuning (But). Therefore, we propose..." Every great paper has this narrative structure, whether explicit or implicit.
4. **Simplicity as a signal of mastery** — The best papers are the easiest to read. "Attention Is All You Need" is remarkably clear. Karpathy's papers and blog posts are legendary for accessibility. Durand: "Use shorter sentences, simpler English." The paradox: making hard ideas look simple is the hardest writing skill.
5. **Framing your contribution generously** — How to make a paper feel larger than its results. Wei: "Choose topics that are simple, general, and enduring." Frame your method as a general principle, not a task-specific trick. Show downstream implications. But avoid overclaiming (the "novel" "state-of-the-art" "groundbreaking" trap).
6. **The post-publication writing** — Wei's fourth skill: maximizing impact. Twitter threads, blog post summaries, conference talks. The paper is the first draft of your contribution's public narrative; the promotion is the second.

**Key equations:** None
**Visualizations:**
- D2 diagram or table: The ABT framework applied to a paper introduction

**Source images to embed:** None

---

### Section 7: The Art of the Technical Blog Post — And What Papers Can Learn From It {#sec-blog-craft}

**File:** `_07-blog-craft.qmd`
**Estimated length:** 1,800-2,200 words
**Goal:** Cover the craft of writing excellent AI technical blog posts, and then flip the lens: what can conference paper authors learn from the best blog writers? This section completes the comparison by giving the blog genre its own thorough treatment and showing that the two genres can inform each other.
**Running example application:** Show the TokenMix blog post version in full: how it opens with a hook, uses figures differently, explains the method with animations/interactive elements in mind, and links to code.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| [Rachel Thomas — Blogging Advice] | `sources/fast.ai/posts/2019-05-13-blogging-advice.html/` | Full post | Choose one audience, combine persuasion methods, motivation before algorithms, don't be too general. |
| [Alex Irpan — Blog vs. Paper] | `sources/alexirpan.com/2018/03/07/blog-paper.html/` | Full post | Blogs = free to be opinionated. Lower burden of proof. Multimedia front-and-center. |
| [Distill.pub — Interactive Articles] | `sources/distill.pub/2020/communicating-with-interactive-articles/` | Key sections | Interactive articles improve recall, engagement. The future of research communication. |
| [Andrej Karpathy] | `sources/karpathy.github.io/2016/09/07/phd/` | Blog post style | "The Unreasonable Effectiveness of RNNs" as exemplar blog post. Code-heavy, builds from scratch. |
| [Lilian Weng] | General reference (lilianweng.github.io) | Blog post style | Survey-style posts with exhaustive citations. Almost paper-like rigor but blog accessibility. |
| [Chris Olah] | General reference (colah.github.io) | Blog post style | Visual explanations, interactive diagrams. "Understanding LSTM Networks" as gold standard. |

**Content outline:**
1. **The blog post genre in AI** — Blogs as the informal academy. Irpan: "blogs encourage stating opinions." Karpathy, Olah, Weng, Alammar as defining voices. Why blogs matter: they teach concepts that papers assume, they provide the intuition that papers can't afford to give, and they reach 100x the audience.
2. **Blog writing best practices** (sourced from Thomas, Irpan, and exemplar analysis)
   - **Know your one reader:** Thomas: "Choose one specific target audience member." Not "ML practitioners" but "a second-year PhD student who knows PyTorch but hasn't seen attention mechanisms."
   - **Motivation before formalism:** Thomas: "Provide motivation and context before explaining algorithms." Blogs get this right more often than papers.
   - **Visual-first explanation:** Olah and Alammar's approach: design the diagram first, then write around it. Blogs can embed interactive visualizations, animations, code playgrounds.
   - **Show your code:** Blogs often include runnable code. This is a feature papers can't easily match (but appendices and GitHub links can approximate).
   - **Be opinionated:** Irpan: "Blog posts are much more free to be opinionated." State what you think. Take sides on debates. This is what readers come for.
   - **Length and depth:** Go deep on one topic rather than surface-level breadth. Thomas: "Don't be too general."
3. **What papers can learn from blogs**
   - Better opening hooks (blogs never start with "In recent years...")
   - More and better figures (blogs use 10-20 images; papers use 3-5)
   - Clearer intuitive explanations before formalism
   - Running examples that thread through the whole piece
   - Karpathy's "Recipe for Training Neural Networks" — a blog post that influenced the field more than many papers
4. **What blogs can learn from papers**
   - Rigorous citation and attribution
   - Systematic literature review, not cherry-picked references
   - Reproducibility: specify versions, seeds, hardware
   - Limitation awareness: acknowledge what your approach does NOT do
5. **The convergence: Distill.pub and the future** — Distill as the experiment in merging paper rigor with blog accessibility. Interactive articles as a third genre. Why it worked, why it stopped, and what it means for the future of research communication.

**Key equations:** None
**Visualizations:**
- D2 diagram: spectrum from "formal paper" to "blog post" to "interactive article" with example publications at each point

**Source images to embed:** None

---

## Source Image Catalog

**This chapter is primarily text and writing advice. No canonical figures from downloaded papers need to be embedded.** The visualizations are all D2 concept maps and tables that will be created during writing.

However, the writing agent should consider downloading these if high-resolution versions are needed:
- Bill Freeman's CVPR 2020 slides (https://billf.mit.edu/sites/default/files/documents/cvprPapers.pdf) — specific slides showing good vs. bad figure design could be captured as screenshots for the figures/tables subsection
- Simon Peyton Jones's slide examples of good vs. bad abstracts from his talk slides

**Priority order for visuals (the writing agent should follow this):**
1. **D2 diagrams** — for concept maps, flowcharts, comparison frameworks
2. **Tables** — for DO/DON'T comparisons, hedging verb rankings, style rules
3. **Side-by-side text examples** — formatted as callout boxes showing paper vs. blog versions of the same content
4. **Web downloads** — for any needed screenshots of exemplary paper formatting

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,000-1,500 words

**Content:**
1. **Key takeaways** (8-9 bullet points):
   - Writing quality independently predicts paper acceptance and citation impact
   - Papers and blogs differ on four axes: purpose, audience, burden of proof, genre conventions
   - The abstract and introduction carry disproportionate weight in peer review; invest heavily in them
   - Follow concrete structural formulas (Farquhar's abstract, Kurose's intro, SPUR Lab's related work)
   - The style guide rules (Gopen & Swan's given-new, Steinhardt's precision, Durand's simplicity) apply to every sentence
   - At least 21% of conference reviews are now AI-generated; write for dual audiences by maximizing internal consistency, making novelty explicit, and structuring for parseability
   - Top researchers treat writing as a separate, cultivated skill (Wei, Lipton)
   - Papers and blogs can learn from each other: papers need better hooks and figures; blogs need better citations and limitations
   - The future of research communication lies between the two genres (Distill.pub model) and involves hybrid AI-human reviewing

2. **Concept map** (D2 diagram): Complete map showing the chapter's key concepts and their relationships

3. **Retrieval practice questions** (6-7 questions with answers in collapsed callout):
   - What are the four axes that distinguish papers from blog posts?
   - Describe Farquhar's abstract formula. What goes in each sentence?
   - What is the "topic position → stress position" principle from Gopen & Swan?
   - Name three common anti-patterns in conference paper introductions.
   - What is the ABT (And, But, Therefore) framework?
   - Why does Steinhardt advise using "accuracy" instead of "performance"?
   - What did the Jiang et al. 2025 study find about writing quality and paper acceptance?
   - What percentage of ICLR 2026 reviews were found to be AI-generated, and what are the key blind spots of LLM reviewers?
   - Name three concrete strategies for writing papers that are robust to both AI and human reviewers.

4. **Common mistakes section**: Top 5 mistakes first-time paper authors make (sourced from the chapter)

5. **Curated resource list** (verified URLs only):
   - Simon Peyton Jones's talk and slides
   - Sebastian Farquhar's guide
   - Jacob Steinhardt's advice
   - CMU 10717 course materials
   - Gopen & Swan's 1990 paper
   - Rachel Thomas's blogging advice
   - Alex Irpan's comparison post

---

## Cross-Cutting Concerns

**Notation table:** This chapter is not mathematical. No notation table is needed.

**Concept map design:** A D2 concept map in Section 99 that ties the chapter together. Nodes:
- **Center:** "Scientific Writing in AI" (highlight class)
- **Left branch (Paper genre):** purpose → verifiable claim; audience → reviewers (human + AI); burden → high; conventions → rigid structure; style → hedged, precise, concise
- **Right branch (Blog genre):** purpose → teach/explain; audience → broad; burden → reputation-based; conventions → flexible; style → opinionated, visual, narrative
- **Bottom:** Convergence zone (Distill.pub, blog→paper, paper→blog)
- **Top-left:** Dual audience model: AI reviewer (checks: structure, consistency, writing quality) + Human reviewer (checks: novelty, significance, deep correctness)
- **Top-right:** Impact factors: naming, framing, storytelling, simplicity
- Use `container` class for grouping, `input` for blog nodes, `process` for paper nodes, `highlight` for the center, `output` for impact factors, `decision` for AI reviewer nodes.

**Prerequisite knowledge to recap:**
- What a conference paper is (NeurIPS, ICML, ICLR, ACL, CVPR) and how peer review works (3 reviewers, area chair, acceptance rate ~20-25%)
- What a technical blog post is (hosted on personal sites, Substack, Medium)
- Basic familiarity with LaTeX (not essential but helpful)

**Common Misconceptions:**

1. **"Only results matter; writing is cosmetic."** — False. Jiang et al. (2025) showed writing quality independently predicts acceptance. Ermis et al. (2025) showed rhetorical framing predicts citations. Lipton: "failures of writing nearly always betray failures of critical thinking."

2. **"A conference paper is just a more formal version of a blog post."** — False. The difference is structural, not just tonal. Papers have a rigid section architecture, a burden-of-proof system (citations, ablations), and genre conventions (hedging, anonymous review) that blogs do not.

3. **"Hedging is a sign of weakness."** — False. Appropriate hedging ("results suggest" vs. "we prove") signals scientific maturity and calibrated confidence. It protects claims from being overstated and criticized.

4. **"You should write the paper after the research is done."** — False. Peyton Jones: "Writing is a primary mechanism for doing research, not just reporting it." Ernst: "The process of writing clarifies your thinking."

5. **"Blog posts are easier to write than papers."** — Misleading. Good blog posts require different skills (visual design, narrative arc, audience calibration) that are just as demanding. Olah's "Understanding LSTM Networks" and Alammar's "The Illustrated Transformer" required enormous craft.

6. **"AI reviewers are easy to fool."** — Dangerously misleading. While prompt injection attacks exist and can inflate ratings, conferences are deploying watermark-based detection (ICML 2026 caught 795 violations), Pangram-style content analysis, and AC verification. Authors caught manipulating AI reviewers face desk rejection and Code of Ethics sanctions. The better strategy is to write a genuinely good paper that convinces both AI and human readers.

7. **"If 21% of reviews are AI-generated, writing quality doesn't matter because AI can't judge quality."** — The opposite. LLM reviewers are *better* than humans at evaluating surface-level writing quality, organization, and clarity (4.12 vs 2.70 scores). They reward well-structured papers and penalize vague, poorly organized ones. Writing quality matters more, not less, in the age of AI reviewing.

**Think Hard questions:**

1. If a paper's writing quality independently predicts acceptance (Jiang et al. 2025), does this mean peer review is biased toward well-written papers with weak results, or that good writing is a reliable signal of clear thinking?

2. Distill.pub was an attempt to merge the best of papers and blogs: peer-reviewed, but interactive and visual. It shut down in 2021. Why might it have been unsustainable, and what would a successful version look like?

3. Alex Irpan argues that blogs are "much more free to be opinionated" than papers. Is this always a strength? When does opinion in a blog become a liability?

4. The ABT (And, But, Therefore) framework from science communication maps naturally onto paper introductions. But does forcing a narrative arc onto a paper risk distorting the science to fit a story?

5. Non-native English speakers produce the majority of AI conference papers. Durand advises "shorter sentences, simpler English." Is there a tension between simplicity for international readers and the sophisticated prose style that top venues reward?

6. If LLM reviewers systematically overlook novelty while rewarding technical validity and clear structure, does this create a selection pressure toward well-written incremental papers over poorly-written breakthrough papers? What would this do to the field over time?

7. ICML 2026 lets authors require "Policy A" (no LLM) reviews. Should authors always opt for human-only reviews, or are there scenarios where LLM-assisted reviews would actually serve the paper better?

**Math Background assessment:** This chapter is not mathematical. Math Background appendix: not needed.
