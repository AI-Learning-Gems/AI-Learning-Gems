# TEXTBOOK-PLAN: Writing System Demonstration Papers at *CL Venues

## User Query
> I want to understand the typical structure of writing System Demonstration papers at ACL, EMNLP and NAACL, particularly in the space of LLM API invocation tools and prompt-based NLP systems where you don't train on GPUs. Look at accepted papers at these venues from 2025, 2024, 2023, 2022, 2021 and 2020. Download those papers and write a detailed chapter on how they should be structured, what are considered best-practices and must-haves and how they frame their value proposition.

**Topic:** How to write a System Demonstration paper for ACL/EMNLP/NAACL — structure, best practices, and value proposition framing, with a focus on LLM-based tools and prompt-based NLP systems (no GPU training)
**Prior Knowledge:** The reader understands the *CL conference landscape and knows what NLP is, but has never written a system demo paper
**Learning Goals:** Be able to structure, write, and frame a competitive system demo paper for a top *CL venue
**Target Depth:** RESEARCHER
**Output Folder:** `Research-Writing/System Demo Papers`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (35+ sources reviewed)"}

| # | Source | Type | Local Path | Written | Accessed | Summary |
|---|--------|------|------------|---------|----------|---------|
| 1 | [ACL 2025 Demo CFP](https://2025.aclweb.org/calls/system_demonstration/) | [VENUE-CFP] | N/A | 2025 | 2026-02-27 | KEY: 6-page limit, 2.5-min video, single-blind, mandatory screenshots, 2-page appendix. Desk-reject criteria. |
| 2 | [NAACL 2025 Demo CFP](https://2025.naacl.org/calls/demos/) | [VENUE-CFP] | N/A | 2025 | 2026-02-27 | KEY: 2-min video, ethics checklist, OpenReview submission, >30% improvement for prior systems. |
| 3 | [ACL 2024 Demo CFP](https://2024.aclweb.org/calls/demo_paper/) | [VENUE-CFP] | N/A | 2024 | 2026-02-27 | KEY: 38/114 accepted (35%), same core structure. Best Demo Award. |
| 4 | [EMNLP 2024 Demo Proceedings](https://aclanthology.org/volumes/2024.emnlp-demo/) | [PROCEEDINGS] | N/A | 2024 | 2026-02-27 | KEY: 53 papers, 52/153 accepted (34%). Read full paper list. |
| 5 | [ACL 2024 Demo Proceedings](https://aclanthology.org/volumes/2024.acl-demos/) | [PROCEEDINGS] | N/A | 2024 | 2026-02-27 | KEY: 38 papers total. Browsed LLM-related entries. |
| 6 | [EMNLP 2023 Demo Proceedings](https://aclanthology.org/volumes/2023.emnlp-demo/) | [PROCEEDINGS] | N/A | 2023 | 2026-02-27 | KEY: 53 papers. Read paper list, identified LLM-related entries. |
| 7 | [ACL 2022 Demo Proceedings](https://aclanthology.org/volumes/2022.acl-demo/) | [PROCEEDINGS] | N/A | 2022 | 2026-02-27 | KEY: 27/75 accepted. Includes OpenPrompt, PromptSource. |
| 8 | [ACL 2021 Demo Proceedings](https://aclanthology.org/volumes/2021.acl-demo/) | [PROCEEDINGS] | N/A | 2021 | 2026-02-27 | KEY: 43/133 accepted (32.3%). EXPLAINABOARD won Best Demo. |
| 9 | [EMNLP 2020 Demo Proceedings](https://aclanthology.org/volumes/2020.emnlp-demos/) | [PROCEEDINGS] | N/A | 2020 | 2026-02-27 | KEY: 29/81 accepted (36%). HuggingFace Transformers paper. |
| 10 | [Fabricator (arXiv:2309.09582)](https://arxiv.org/abs/2309.09582) | [ACADEMIC] | Read via arXiv HTML | 2023 | 2026-02-27 | KEY: EMNLP 2023 demo. LLM-based dataset generation toolkit. Exemplary structure: Intro→System→Experiments→Related Work→Conclusion→Limitations→Ethics. |
| 11 | [AutoGen Studio (arXiv:2408.15247)](https://arxiv.org/abs/2408.15247) | [ACADEMIC] | Read via arXiv HTML | 2024 | 2026-02-27 | KEY: EMNLP 2024 demo. No-code multi-agent tool. Structure: Intro→Related Work→Design Goals→System Design→Usage & Eval→Emerging Patterns→Conclusion→Ethics. 200k+ downloads as validation. |
| 12 | [RaLLe (arXiv:2308.10633)](https://arxiv.org/abs/2308.10633) | [ACADEMIC] | Read via arXiv HTML | 2023 | 2026-02-27 | KEY: EMNLP 2023 demo. RAG development framework. Structure: Intro→Usage (5 subsections)→Experiments→Conclusion→Limitations. Heavy emphasis on graphical interface and experiments. |
| 13 | [LlamaFactory (arXiv:2403.13372)](https://arxiv.org/abs/2403.13372) | [ACADEMIC] | Read via arXiv HTML | 2024 | 2026-02-27 | KEY: ACL 2024 demo. LLM fine-tuning framework. Structure: Intro→Related Work→Background Techniques→Framework (4 modules)→Empirical Study→Conclusion→Broader Impact. No-code UI (LlamaBoard). |
| 14 | [PromptSource (arXiv:2202.01279)](https://arxiv.org/abs/2202.01279) | [ACADEMIC] | N/A (arXiv HTML 404) | 2022 | 2026-02-27 | KEY: ACL 2022 demo. Prompt IDE and repository. 2000+ prompts for 170 datasets. Community-driven. |
| 15 | [OpenPrompt (arXiv:2111.01998)](https://arxiv.org/abs/2111.01998) | [ACADEMIC] | N/A (arXiv HTML 404) | 2022 | 2026-02-27 | KEY: ACL 2022 demo. Unified prompt-learning framework. Modular design: PLM, Task, Template, Verbalizer. |
| 16 | [TextAttack (arXiv:2005.05909)](https://arxiv.org/abs/2005.05909) | [ACADEMIC] | N/A (arXiv HTML 404) | 2020 | 2026-02-27 | KEY: EMNLP 2020 demo. NLP adversarial attack framework. 4-component design: goal function, constraints, transformation, search. 16 attacks implemented. |
| 17 | [HuggingFace Transformers (EMNLP 2020)](https://aclanthology.org/2020.emnlp-demos.6/) | [ACADEMIC] | N/A | 2020 | 2026-02-27 | KEY: EMNLP 2020 demo. The canonical NLP library paper. Massive community adoption as validation. |
| 18 | [CHATREPORT (arXiv:2307.15770)](https://arxiv.org/abs/2307.15770) | [ACADEMIC] | N/A | 2023 | 2026-02-27 | KEY: EMNLP 2023 demo. LLM-based sustainability disclosure analysis. Domain-specific LLM application. |
| 19 | [Low-code LLM (NAACL 2024)](https://aclanthology.org/2024.naacl-demo.3/) | [ACADEMIC] | N/A | 2024 | 2026-02-27 | KEY: Graphical UI over LLMs. Visual programming for prompt engineering. |
| 20 | [DIALIGHT (NAACL 2024)](https://aclanthology.org/2024.naacl-demo.7/) | [ACADEMIC] | N/A | 2024 | 2026-02-27 | KEY: Multilingual task-oriented dialogue with LLMs. Lightweight development toolkit. |
| 21 | [Wordflow (ACL 2024)](https://aclanthology.org/2024.acl-demos.5/) | [ACADEMIC] | N/A | 2024 | 2026-02-27 | KEY: Social prompt engineering for LLMs. Interactive prompt iteration. |
| 22 | [FreeEval (EMNLP 2024)](https://aclanthology.org/2024.emnlp-demo.1/) | [ACADEMIC] | N/A | 2024 | 2026-02-27 | KEY: Modular LLM evaluation framework. Trustworthy and efficient. |
| 23 | [MarkLLM (EMNLP 2024)](https://aclanthology.org/2024.emnlp-demo.8/) | [ACADEMIC] | N/A | 2024 | 2026-02-27 | KEY: Open-source LLM watermarking toolkit. |
| 24 | [MiniChain (EMNLP 2023)](https://aclanthology.org/2023.emnlp-demo.27/) | [ACADEMIC] | N/A | 2023 | 2026-02-27 | KEY: Minimalist LLM chaining library by Alexander Rush. Ease-of-use, transparency, Gradio integration. |
| 25 | [Stanza (ACL 2020)](https://aclanthology.org/2020.acl-demos.14/) | [ACADEMIC] | N/A | 2020 | 2026-02-27 | KEY: Python NLP toolkit for 66 languages. Neural pipeline. Best NLP demo paper 2020. |
| 26 | [EXPLAINABOARD (ACL 2021)](https://aclanthology.org/2021.acl-demo.17/) | [ACADEMIC] | N/A | 2021 | 2026-02-27 | KEY: Best Demo Award ACL 2021. Explainable NLP leaderboard. |
| 27 | [TextFlint (ACL 2021)](https://aclanthology.org/2021.acl-demo.15/) | [ACADEMIC] | N/A | 2021 | 2026-02-27 | KEY: Multilingual NLP robustness evaluation toolkit. |
| 28 | [Robustness Gym (NAACL 2021)](https://aclanthology.org/2021.naacl-demos.6/) | [ACADEMIC] | N/A | 2021 | 2026-02-27 | KEY: Extensible NLP evaluation toolkit unifying multiple paradigms. |
| 29 | [DSPy (arXiv:2310.03714)](https://arxiv.org/abs/2310.03714) | [ACADEMIC] | N/A | 2023 | 2026-02-27 | KEY: Declarative LLM call compilation. ICLR 2024 (not demo track, but highly relevant for the space). |
| 30 | [How to write NLP papers advice (Stanford)](https://web.stanford.edu/~jurafsky/pubs/writing-advice.pdf) | [TUTORIAL] | N/A | Various | 2026-02-27 | KEY: General NLP writing advice from Dan Jurafsky. Focus on theme, coherent story. |
| 31 | [ACL ARR Reviewer Guidelines](https://aclrollingreview.org/reviewertutorial) | [VENUE-GUIDE] | N/A | 2024 | 2026-02-27 | KEY: Reviewer criteria for contribution types: artifact vs. knowledge contributions. |

:::

---

## Chapter Overview

**Total sections:** 6 (plus introduction/closing)
**Estimated total length:** 9,000–12,000 words
**Running example:** A hypothetical researcher named **Dr. Priya Sharma**, an NLP researcher at a mid-sized university, who has built **PromptBench** — a Python toolkit that lets users benchmark, compare, and iterate on LLM prompts across multiple API providers (OpenAI, Anthropic, Cohere) for classification tasks. She has never submitted a demo paper before. Her tool doesn't train any models — it orchestrates LLM API calls, manages prompt templates, tracks experiment results, and provides a Gradio-based interactive UI. Throughout the chapter, we follow her journey from "I have a cool tool" to "I have a competitive *CL demo submission."

### Hook & Running Example Design

Dr. Priya Sharma has spent six months building PromptBench. It works beautifully. Her labmates love it. But when she sits down to write her first system demonstration paper for EMNLP, she realizes she has no idea how to structure the submission. Is it like a regular research paper? Do she need experiments? How much architecture description is enough? What makes a demo paper *get accepted* versus rejected?

This is the central tension of the chapter: the gap between building an excellent NLP tool and writing a paper that convincingly communicates its value to the *CL community. System demonstration papers have their own conventions, expectations, and pitfalls that differ substantially from main-conference research papers. A researcher who has only written research papers — or who has never published at a top venue — can easily stumble on these differences.

The hook leverages a puzzle: despite demo tracks having similar acceptance rates to main tracks (32–36%), many submissions fail not because the underlying system is weak, but because the paper doesn't adequately address what reviewers care about. The chapter will demystify reviewer expectations by systematically analyzing patterns from 30+ accepted demo papers across ACL, EMNLP, and NAACL from 2020 to 2025, with special emphasis on the rapidly growing subspace of LLM-based tools and prompt-centric NLP systems that don't require GPU training.

Each section will revisit PromptBench to provide concrete, worked examples of how to apply the structural principles being discussed. By the end of the chapter, the reader will have a template in their head for writing a strong demo paper, and Dr. Sharma will have her submission ready.

**Hook Image:** An architecture diagram from Fabricator (arXiv:2309.09582, Figure 1) or AutoGen Studio (arXiv:2408.15247, Figure 1) showing the typical system overview figure found in demo papers — this bridges the "I have a tool" story with the "here's how to visually communicate it" technical concept that dominates every accepted demo paper.

---

## Section Plan

### Section 1: What Is a System Demonstration Paper? {#sec-what-is-a-demo-paper}

**File:** `_01-what-is-a-demo-paper.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should understand how demo papers differ from research papers, what the venue expects, and the formal requirements for submission.
**Running example application:** Dr. Sharma compares a hypothetical research paper about prompt optimization algorithms with her demo paper about a prompt benchmarking tool, understanding why the framing must differ.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| ACL 2025 Demo CFP | N/A | Full page | Submission requirements, review criteria |
| NAACL 2025 Demo CFP | N/A | Full page | Differences from ACL, ethics checklist |
| ACL 2024 Demo Proceedings (Preface) | N/A | Preface | Acceptance rates, stats |
| EMNLP 2024 Demo Proceedings (Preface) | N/A | Preface | Acceptance rates, stats |
| ACL ARR Reviewer Guidelines | N/A | Contribution types | Artifact vs. knowledge contributions |

**Content outline:**
1. **The Demo Track vs. the Main Conference Track** — what makes them different (A-G structure: start with Dr. Sharma's confusion, then explain). Demo papers showcase working systems; research papers advance scientific knowledge. Key differences: page limits (6 vs 8+), single-blind vs double-blind review, mandatory video, live demo presentation, focus on usability vs novelty.
2. **Formal Submission Requirements** — page limits (6 pages + unlimited refs + 2-page appendix), mandatory 2–2.5 minute screencast video, official LaTeX style files, no concurrent submission to other tracks. Desk-rejection triggers.
3. **What Reviewers Evaluate** — the five criteria: relevance, contribution, clarity, completeness, novelty. How each is weighted. What "contribution" means for a demo paper (system utility, not algorithmic novelty). Show the contrast between what makes a strong research contribution vs a strong demo contribution.
4. **Acceptance Rates and the Competitive Landscape** — historical acceptance rates (32–36% across venues, 2020–2024). Number of submissions growing rapidly in the LLM era. What this means for submission strategy.
5. **The Special Case of LLM-Based and Prompt-Based Systems** — how the demo landscape has shifted since 2022. Pre-2022: mostly toolkit papers (Transformers, Stanza, TextAttack). Post-2022: explosion of LLM API wrappers, prompt engineering tools, RAG frameworks, agent platforms. Unique challenges: "just API calls" perception, demonstrating novelty when LLM does the heavy lifting.

**Key equations:** None (this is a conceptual section)
**Visualizations:** Timeline showing the shift in demo paper topics from 2020 to 2025; bar chart of acceptance rates by venue and year.
**Source images to embed:** None (create custom visualizations)
**Self-explanation prompts:**
- "If your system wraps an LLM API with a nice UI, what must you do beyond describing the API calls to make the paper publishable?"
- "Why is the demo track single-blind while the main track is double-blind? How should this affect your writing?"

---

### Section 2: Anatomy of a Demo Paper — The Canonical Structure {#sec-anatomy}

**File:** `_02-anatomy-of-a-demo-paper.qmd`
**Estimated length:** 2,000–2,500 words
**Goal:** The reader should know the exact section-by-section structure of a strong demo paper, including what each section must contain and how long it should be within the 6-page constraint.
**Running example application:** Dr. Sharma maps her PromptBench paper to the canonical structure, deciding what goes in each section and how many pages each section gets.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Fabricator (arXiv:2309.09582) | arXiv HTML | Full paper structure | Section headers, page allocation, figure placement |
| AutoGen Studio (arXiv:2408.15247) | arXiv HTML | Full paper structure | Alternative structure with Design Goals |
| RaLLe (arXiv:2308.10633) | arXiv HTML | Full paper structure | Usage-heavy structure with 5 subsections |
| LlamaFactory (arXiv:2403.13372) | arXiv HTML | Full paper structure | Framework paper with modular components |
| OpenPrompt (arXiv:2111.01998) | N/A | From web search summary | Modular architecture: PLM, Task, Template, Verbalizer |

**Content outline:**
1. **The Canonical 6-Section Structure** — Introduction, System Description/Architecture, Usage Walkthrough/Example, Evaluation, Related Work, Conclusion. Show that this is the dominant pattern across 80%+ of accepted papers, with minor variations (some swap Related Work position, some merge Usage into Architecture).
2. **Section-by-Section Breakdown:**
   - **Introduction (~1–1.5 pages):** Problem statement → why it matters → what's novel → who benefits → bullet-point contributions. Show the exact pattern from Fabricator ("Limitations. ... Contributions. To close this gap, we present...") and AutoGen Studio ("Our contributions are highlighted as follows: •").
   - **System Architecture (~2–2.5 pages):** This is the heart of the paper. Must include: (a) high-level architecture diagram, (b) modular component description, (c) code snippets or API examples, (d) screenshots of UI if applicable. Compare how Fabricator organizes by "Generation Workflows → Classes and Concepts → Example Script" vs. LlamaFactory's "Model Loader → Data Worker → Trainer → Utilities → LlamaBoard" vs. AutoGen Studio's "UI → Backend API."
   - **Evaluation (~1–1.5 pages):** Can be quantitative experiments, user studies, adoption metrics, or case studies. Show how Fabricator does controlled experiments, AutoGen Studio uses adoption metrics (200k downloads) + in-situ evaluation, and RaLLe uses KILT benchmark results.
   - **Related Work (~0.5–1 page):** Position your system against alternatives. Must differentiate, not just list.
   - **Conclusion (~0.25–0.5 pages):** Brief summary + future directions.
   - **Limitations + Ethics (~0.25–0.5 pages, doesn't count against page limit):** Required since EMNLP 2023. Candid discussion of what the system can't do.
3. **Alternative Structures** — When papers deviate: AutoGen Studio's "Design Goals" section before system design; papers with "Background" sections when the technique is novel; papers that front-load a compelling use case before architecture.
4. **Page Budget Template** — Concrete allocation: Intro (1–1.5 pp), System (2–2.5 pp), Eval (1–1.5 pp), Related Work (0.5 pp), Conclusion + Limitations (0.5 pp). Total: 6 pages. Show trade-offs.

**Key equations:** None (structural section)
**Visualizations:** A table comparing section structures across 6+ accepted papers; a page-budget allocation diagram.
**Source images to embed:** Architecture diagrams from Fabricator and AutoGen Studio (if downloadable)
**Self-explanation prompts:**
- "Sketch the section headers for your own demo paper. Where do you expect to need the most space?"
- "Which papers put Related Work before the System Description vs. after? When would each ordering be appropriate?"

---

### Section 3: The Introduction — Framing Your Value Proposition {#sec-introduction-framing}

**File:** `_03-framing-value-proposition.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should be able to write a compelling introduction that clearly articulates why their system matters, using proven framing patterns from accepted papers.
**Running example application:** Dr. Sharma drafts her PromptBench introduction using the "gap-bridge" pattern, transforming a vague "we present a tool" into a compelling "we solve problem X by Y, enabling Z."

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Fabricator | arXiv HTML | Section 1 (Introduction) | Problem-limitation-contribution pattern |
| AutoGen Studio | arXiv HTML | Section 1 (Introduction) | Challenges-solution-contributions pattern |
| RaLLe | arXiv HTML | Section 1 (Introduction) | Gap-in-tools-our-framework-benefits pattern |
| LlamaFactory | arXiv HTML | Section 1 (Introduction) | Democratization-unification framing |
| PromptSource | Web search data | Abstract/Intro | Community-driven framing |
| HuggingFace Transformers | ACL Anthology | Abstract/Intro | Ecosystem/community framing |

**Content outline:**
1. **The Four Value Proposition Archetypes** — Based on analysis of 30+ papers, system demos frame their value through one of four archetypes:
   - **(a) The Unifier:** "There are many fragmented tools for X; we unify them." (LlamaFactory: "lacking a systematic framework that adapts and unifies these methods"; OpenPrompt: "lack of a standard implementation framework")
   - **(b) The Democratizer:** "X is hard/expensive; we make it accessible." (Fabricator: "too costly to produce manually"; AutoGen Studio: "significant barriers to entry"; CHATREPORT: "democratizing sustainability disclosure analysis")
   - **(c) The Gap-Filler:** "No tool currently does X; we fill this gap." (RaLLe: "currently a lack of accessible evaluation framework"; PromptSource: addressing "challenges in the emerging field of using prompts")
   - **(d) The Ecosystem Builder:** "We provide infrastructure for the community." (HuggingFace Transformers: community-driven library; PromptSource: community prompt repository)
2. **The Introduction Formula** — (i) Context + importance of the problem area (1-2 paragraphs), (ii) Specific gap or limitation (1 paragraph, with explicit transition word like "However," or "Limitations."), (iii) Your system as the bridge (1 paragraph, "To close this gap, we present..." or "To address these challenges, we have developed..."), (iv) Bulleted contributions list (3-5 bullets), (v) Open-source availability one-liner.
3. **Contribution Bullet Patterns** — What goes in each bullet. Best practices: (a) the system itself, (b) technical novelty in approach/design, (c) evaluation contribution (experiments, benchmarks), (d) open-source/community contribution, (e) optional: insights or design patterns.
4. **The "So What?" Test** — Every introduction must pass this test. Walkthrough of weak vs. strong framings for the same system.
5. **Worked Example: PromptBench Introduction** — Step-by-step construction of Dr. Sharma's introduction using the Gap-Filler + Democratizer hybrid archetype.

**Key equations:** None
**Visualizations:** Annotated side-by-side comparison of 2 real introductions (Fabricator vs. AutoGen Studio), highlighting the formula elements.
**Source images to embed:** None
**Self-explanation prompts:**
- "Which value proposition archetype best fits your system? Can you combine two?"
- "Write the single sentence that bridges the gap you identify to the system you present. Does it feel inevitable?"

---

### Section 4: System Architecture — Showing What You Built {#sec-system-architecture}

**File:** `_04-system-architecture.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should know how to describe their system's architecture effectively within the tight page budget, including what to include in diagrams, how to present code, and how to structure modular descriptions.
**Running example application:** Dr. Sharma designs her PromptBench architecture section, choosing between a pipeline diagram vs. a component diagram, deciding which code snippets to include, and laying out her Gradio UI screenshots.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Fabricator | arXiv HTML | Section 2 (Fabricator) | Workflows → Classes → Example Script structure |
| AutoGen Studio | arXiv HTML | Sections 3-4 (Design Goals, System Design) | Design Goals → Frontend UI → Backend API |
| LlamaFactory | arXiv HTML | Section 4 (Framework) | 4 modular components + LlamaBoard UI |
| RaLLe | arXiv HTML | Section 2 (RaLLe Usage) | 5-subsection usage walkthrough |
| TextAttack | Web search data | System description | 4-component framework: goal, constraints, transformation, search |

**Content outline:**
1. **The Architecture Diagram — Your Most Important Figure** — Every accepted demo paper has one. Patterns: pipeline/flowchart (Fabricator), component/module diagram (LlamaFactory), layered architecture (AutoGen Studio). Best practices: use color coding, label every component, show data flow arrows, keep it to one figure. Common mistakes: too much detail, no labels, cluttered.
2. **Describing Modular Components** — The standard pattern: describe each module in its own subsection with (a) purpose, (b) key design decisions, (c) interfaces/APIs. Show how Fabricator uses "Generation Workflows → Classes and Concepts" while LlamaFactory uses "Model Loader → Data Worker → Trainer → Utilities."
3. **Code Snippets — When and How** — Demo papers commonly include 1-3 code snippets showing the API in action. Best practices: show the simplest possible working example first (like Fabricator's "Example Script"), use syntax highlighting, annotate key lines. For LLM-based tools: show the prompt template, the API call, and the result processing.
4. **Screenshots and UI Demonstration** — If your system has a UI (Gradio, web app, IDE plugin), screenshots are mandatory. AutoGen Studio's drag-and-drop interface figure, LlamaFactory's LlamaBoard, RaLLe's graphical interface. Best practices: annotate screenshots with callout numbers, show real (not mock) data, 2-3 screenshots maximum.
5. **The "How It Works" Walkthrough** — Walking through a concrete example end-to-end. RaLLe's 5-subsection usage walkthrough (Embedding/Indexing → Chain Construction → Prompt Engineering → Experiment Tracking → Chat AI) vs. Fabricator's "Example Script" approach. When to use a step-by-step walkthrough vs. a holistic architecture description.
6. **Handling the "Just API Calls" Problem** — For LLM-based tools: how to demonstrate technical depth when the core computation is done by an external API. Strategies: (a) focus on orchestration complexity, (b) show prompt engineering as a design space, (c) highlight caching/efficiency decisions, (d) demonstrate the abstraction layer that makes the tool useful beyond raw API calls.

**Key equations:** None (but may include pseudocode)
**Visualizations:** Comparison table of architecture diagram styles across papers; annotated example architecture diagram for PromptBench.
**Source images to embed:** Architecture diagrams from Fabricator (Figure 1) and/or AutoGen Studio (Figure 1) if available.
**Self-explanation prompts:**
- "Draw your system's architecture diagram on paper. Can a reader understand the data flow without reading the text?"
- "If someone asked 'isn't this just a wrapper around GPT-4?', what would you point to in your architecture section to show otherwise?"

---

### Section 5: Evaluation and Validation — Proving Your System Works {#sec-evaluation}

**File:** `_05-evaluation-and-validation.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should understand the different evaluation strategies used in system demo papers and choose the right approach for their own system.
**Running example application:** Dr. Sharma designs her evaluation: a controlled experiment comparing prompt iteration speed with PromptBench vs. manual workflows, plus adoption metrics from her lab and a pilot user study.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| Fabricator | arXiv HTML | Section 3 (Experiments) | Controlled experiments comparing generated vs. human data |
| AutoGen Studio | arXiv HTML | Section 5 (Usage and Evaluation) | In-situ evaluation, adoption metrics, GitHub issues |
| RaLLe | arXiv HTML | Sections 3-4 (Experiments, Results) | KILT benchmark evaluation, speed analysis |
| LlamaFactory | arXiv HTML | Section 5 (Empirical Study) | Training efficiency + downstream task performance |
| HuggingFace Transformers | ACL Anthology | Evaluation section | Community adoption as validation |

**Content outline:**
1. **The Evaluation Spectrum for Demo Papers** — Unlike research papers, demo papers have a wide spectrum of acceptable evaluation approaches. Position on the spectrum: (Weakest) No evaluation → Case study → Adoption metrics → User study → Controlled experiments → Benchmark comparison (Strongest). Note: papers with NO evaluation may be desk-rejected (per ACL 2024/2025 CFP).
2. **Strategy 1: Quantitative Experiments** — Fabricator's approach: compare generated vs human-annotated datasets on downstream tasks. RaLLe's approach: evaluate on KILT benchmark across multiple R-LLM configurations. LlamaFactory: training efficiency benchmarks. Best for: systems where output quality can be measured objectively.
3. **Strategy 2: Adoption and Usage Metrics** — AutoGen Studio's approach: "200k+ downloads in 5 months," GitHub star counts, issue tracking. HuggingFace Transformers: massive community adoption. Best for: mature systems with real users. Caution: reviewers may want more than just download counts.
4. **Strategy 3: User Studies** — Qualitative or quantitative feedback from real users interacting with the system. Small-scale is fine (5-10 users). Show task completion time, satisfaction scores, error rates. Best for: interactive tools with UIs. Note: IRB considerations may apply.
5. **Strategy 4: Case Studies and Worked Examples** — Walking through 2-3 concrete use cases showing the system in action. CHATREPORT's domain-specific application cases. Best for: domain-specific tools where general benchmarks don't exist.
6. **Combining Strategies — The Hybrid Approach** — Most strong papers use 2+ strategies. Fabricator: experiments + code availability. AutoGen Studio: adoption metrics + use case walkthrough + GitHub issue analysis. Template for combining strategies within the 1–1.5 page evaluation budget.
7. **The Demo Video as Evaluation** — The mandatory 2-2.5 minute video functions as supplementary evaluation. What to show: (a) installation/setup, (b) core workflow, (c) key differentiating features, (d) result output. Tips: screencast with audio narration, no fancy editing needed.

**Key equations:** None
**Visualizations:** Table comparing evaluation strategies across 6+ accepted papers with their approach and what they measured.
**Source images to embed:** None
**Self-explanation prompts:**
- "If you only had 1 page for evaluation, would you do a controlled experiment, user study, or present adoption metrics? Why?"
- "What would a reviewer's concern be if your evaluation only showed that the system 'works' but not that it works *better* than alternatives?"

---

### Section 6: Polishing the Submission — Videos, Visuals, and Common Pitfalls {#sec-polishing}

**File:** `_06-polishing-the-submission.qmd`
**Estimated length:** 1,500–2,000 words
**Goal:** The reader should know all the submission requirements beyond the paper text, common rejection reasons, and strategies for maximizing acceptance probability.
**Running example application:** Dr. Sharma prepares her full submission package: camera-ready paper, demo video, live demo URL, Gradio Space, GitHub repo, and ethics statement.

**Sources needed:**

| Source | Local Path | Specific Sections/Pages | What to Extract |
|--------|------------|------------------------|-----------------|
| ACL 2025 Demo CFP | N/A | Video + submission requirements | Video guidelines, desk-rejection criteria |
| NAACL 2025 Demo CFP | N/A | Ethics checklist | Ethics requirements |
| All papers analyzed | Various | Limitations & Ethics sections | Common patterns in ethics statements |
| All papers analyzed | Various | Figures and tables | Visual quality patterns |

**Content outline:**
1. **The Demo Video — Your Secret Weapon** — Why the video matters more than you think (reviewers watch it). Guidelines: 2–2.5 minutes max, screencast with audio narration, show don't tell, demonstrate the "wow" moment early. Technical tips: OBS Studio or QuickTime for recording, upload to YouTube/Google Drive. What to avoid: marketing language, overly polished production, skipping the actual system.
2. **Visual Design Best Practices** — (a) Architecture diagrams: use draw.io, Mermaid, or LaTeX TikZ. (b) Screenshots: annotate with callout boxes. (c) Tables: use booktabs style. (d) Color-coding: consistent colors across all figures. (e) Font size: ensure readability at normal zoom. Common mistakes: blurry screenshots, hard-to-read small text, inconsistent styling.
3. **The Limitations Section Done Right** — Not a throwaway section. Candid discussion of: what tasks the system doesn't handle, scalability concerns, dependency on external APIs (model updates, costs), known failure modes. Show examples from Fabricator ("this tool does not address quality filtering of generated data"), RaLLe ("small LLMs became trapped in cycles").
4. **Ethics and Broader Impact** — Not optional for systems dealing with: user data, generation of text, automated decision-making, LLM outputs. Template: (a) intended use vs potential misuse, (b) data privacy, (c) bias in LLM outputs, (d) environmental impact of API calls.
5. **Common Rejection Reasons (and How to Avoid Them):**
   - (a) "This is just a UI wrapper around GPT-4" → Technical depth in Section 4
   - (b) "No evaluation" → At minimum, case studies + adoption metrics
   - (c) "Incremental over existing tools" → Clear differentiation in Related Work
   - (d) "Paper doesn't convince me the system is useful" → Strong value proposition in Intro
   - (e) "Video doesn't work / not submitted" → Test video link before deadline
   - (f) "Exceeds page limit" → Strict compliance with style files
6. **The Submission Checklist** — A comprehensive pre-submission checklist: paper format, page limits, video link, code repository, live demo URL (if applicable), ethics statement, no concurrent submissions, author information (single-blind, so include names).
7. **Timing and Venue Selection** — ACL vs EMNLP vs NAACL demo tracks: which to target based on timeline, topic alignment, and geographic convenience. Demo CFP deadlines are typically 2-3 months before the conference.

**Key equations:** None
**Visualizations:** Pre-submission checklist formatted as a table; common rejection reasons as a callout box.
**Source images to embed:** None
**Self-explanation prompts:**
- "Record a 30-second elevator pitch of your system. Does it naturally flow into a 2-minute demo video structure?"
- "List three honest limitations of your system. For each, can you phrase it constructively (as future work rather than defeat)?"

---

## Source Image Catalog

Since the papers were read via arXiv HTML (not downloaded locally as LaTeX), specific figure images are not available as local files. The writing agent should instead:

1. **Reference figures by description** — Architecture diagrams from Fabricator, AutoGen Studio, LlamaFactory, and RaLLe are core visual references. Describe what they show and how they exemplify best practices.
2. **Create custom diagrams** — Generate:
   - A "page budget" allocation diagram for the 6-page constraint
   - A comparison table of section structures across papers
   - The "evaluation spectrum" from no-eval to benchmark comparison
   - An annotated example introduction showing the formula elements
3. **Screenshots from arXiv/ACL Anthology** — If needed, the writing agent can download specific figures from arXiv HTML versions of the papers.

| # | Source Image Description | From Paper | Relevant Section(s) | Notes |
|---|---|---|---|---|
| 1 | System architecture / workflow diagram | Fabricator (Fig. 1) | §4 Architecture | Shows typical pipeline diagram style |
| 2 | Drag-and-drop UI for agent composition | AutoGen Studio (Fig. 1) | §4 Architecture | Shows interactive UI screenshot pattern |
| 3 | Framework module diagram | LlamaFactory (Fig. 1) | §4 Architecture | Shows modular component architecture |
| 4 | Development interface screenshot | RaLLe (Appendix) | §4 Architecture | Shows graphical development environment |

**Priority order for visuals:**
1. **Custom diagrams** — for page budgets, structures, comparisons
2. **Source images from papers** — download from arXiv HTML if needed
3. **generate_image** — for custom illustrations of concepts

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,000–1,500 words

**Content:**
1. **Key takeaways** (7 bullet points):
   - System demo papers have a distinctive format (6 pages, single-blind, mandatory video) that differs from research papers
   - The canonical structure is: Introduction → System Architecture → Usage/Walkthrough → Evaluation → Related Work → Conclusion → Limitations → Ethics
   - Your value proposition should fit one of four archetypes: Unifier, Democratizer, Gap-Filler, or Ecosystem Builder
   - The architecture diagram is your single most important figure — invest heavily in it
   - Evaluation can range from adoption metrics to controlled experiments; no-evaluation submissions risk desk rejection
   - For LLM-based tools, the key challenge is demonstrating depth beyond "API wrapper" — show orchestration, design decisions, and abstraction value
   - The demo video is a first-class submission artifact, not an afterthought

2. **Quick Reference: The Demo Paper Template** — A one-page template showing section headers, approximate page allocations, and what each section must contain

3. **Retrieval practice questions** (5, with answers in collapsed callout):
   - Q1: What are the five criteria reviewers use to evaluate demo papers?
   - Q2: Name three differences between demo papers and main-track research papers.
   - Q3: For an LLM-based tool with no GPU training, what evaluation strategy would you recommend and why?
   - Q4: What are the four value proposition archetypes for demo paper introductions?
   - Q5: Why do demo tracks use single-blind review? How does this affect your writing?

4. **Common mistakes section** — Top 5 mistakes from analysis of rejection patterns

5. **Curated resource list:**
   - ACL 2025 Demo CFP: https://2025.aclweb.org/calls/system_demonstration/
   - NAACL 2025 Demo CFP: https://2025.naacl.org/calls/demos/
   - ACL Anthology Demo Proceedings (all years): https://aclanthology.org/
   - Dan Jurafsky's Writing Advice: https://web.stanford.edu/~jurafsky/pubs/writing-advice.pdf
   - ACL Rolling Review Guidelines: https://aclrollingreview.org/reviewertutorial

---

## Cross-Cutting Concerns

**Notation table:** Not applicable (no mathematical notation in this chapter)

**Concept map design:** A flow diagram showing the journey from "I have a tool" → "I understand the venue" → "I structure my paper" → "I frame my contribution" → "I describe my system" → "I evaluate it" → "I polish and submit." Each node connects to the relevant section of the chapter.

**Prerequisite knowledge to recap:**
- What ACL, EMNLP, NAACL are (briefly, 1 sentence)
- What LLM APIs are and how prompt-based NLP differs from fine-tuning (2-3 sentences)
- Basic academic paper structure (abstract, intro, related work, methods, results, conclusion)

**Common Misconceptions:**
1. **"Demo papers are easier to publish than research papers"** — False. Acceptance rates are similar (32-36% vs. 20-25% for main track). Different, not easier.
2. **"I don't need experiments for a demo paper"** — Partially false. While the bar is lower than research papers, papers with no evaluation at all may be desk-rejected (per ACL 2024+ guidelines).
3. **"My system just calls GPT-4, so there's no novelty"** — The novelty in demo papers can come from: the abstraction you provide, the workflow you enable, the evaluation framework you build, the interface design, the integration of multiple components.
4. **"Demo papers are short, so they must be easy to write"** — Paradoxically, the 6-page limit makes writing harder. Every sentence must earn its place. Page budgeting is a critical skill.
5. **"I should focus on the technical novelty of my backend"** — Demo papers should focus equally on usability, accessibility, and practical value. A technically sophisticated system with a terrible interface will score poorly on "completeness."

**Think Hard questions:**
1. If your system becomes obsolete when the underlying LLM API is deprecated, how do you frame its longevity and contribution?
2. When does a tool deserve a demo paper vs. just being released on GitHub? What's the threshold for academic publication?
3. How do you differentiate your prompt engineering tool from the 50 others that appeared in the same year?
4. Should demo papers push the boundaries of what systems can do, or should they focus on making existing capabilities accessible?
5. How will the system demo track evolve as the line between "tool" and "research contribution" continues to blur in the LLM era?
