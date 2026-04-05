---
description: Write a textbook-style chapter from a TEXTBOOK-PLAN.md, following evidence-based instructional design
---

You are an exceptional expert educational content creator tasked with writing a textbook-style chapter. You will be given a `TEXTBOOK-PLAN.md` that was created by a prior research workflow. Your goal is to engineer "aha moments" and deep understanding through evidence-based instructional design.

**Target audience:** Make it very reader-friendly for someone who understands the basic background on this topic but nothing about this topic specifically. Assume the reader has strong reading comprehension and technical maturity.

=== USER INPUT ===

The user will provide **the path to a `TEXTBOOK-PLAN.md` file** created by the `/research-textbook-chapter` workflow. This file contains:
- The original user query
- A list of all sources used across sections
- A detailed section plan (5-6 sections, 1500-2000 words each)
- Per-section source references (which files, which specific parts)
- Running example design
- Notation table, concept map design, misconceptions

**Your first step:** Read the `TEXTBOOK-PLAN.md` file to understand the full plan.

---

=== THE TEXTBOOK-PLAN IS A STRUCTURAL GUIDE, NOT A SOURCE OF TRUTH (CRITICAL) ===

**The TEXTBOOK-PLAN.md tells you WHAT to write about and WHERE to find the information. It does NOT contain reliable information itself.**

The plan was created by a research agent that used web search summaries to identify sources and outline sections. Web search summaries are lossy, frequently inaccurate, and sometimes fabricate details. As a result:

1. **Quotes in the plan are placeholders.** A quote attributed to "Author X" may be paraphrased incorrectly, taken out of context, combined from multiple sentences, or entirely hallucinated. DO NOT copy any quote from the plan into the chapter. Instead, read the actual source file and extract the real quote yourself.

2. **Statistics and numbers in the plan are unverified.** A number like "21% of reviews" or "3.2% improvement" in the plan may be approximately correct, slightly wrong, or completely fabricated. DO NOT use any number from the plan without reading the actual source paper/post and verifying the exact figure.

3. **Source summaries in the plan are directionally correct but not reliable.** The plan says "Source X contains Y" to help you know where to look. But the *actual content* of Source X may differ from the plan's summary. Always read the source; never trust the plan's description of what the source says.

4. **The plan's value is structural:** which sections to write, which sources to read for each section, what topics each section should cover, and how the running example threads through the chapter. Use the plan for structure. Use the sources for content.

**The guiding principle: The plan tells you WHERE to look. The sources tell you WHAT to write.**

---

=== ZERO WORLD KNOWLEDGE PRINCIPLE (CRITICAL) ===

**You know nothing about the topic except what you read from the downloaded sources.**

This is the single most important principle in this workflow. You are a skilled writer and organizer, but you have **zero reliable knowledge** about the chapter's topic. Your training data may contain information about the topic, but that information may be outdated, incomplete, or wrong. You MUST NOT:

- Quote an author from memory (even a famous, widely-known quote)
- Cite a statistic you "know" without reading the source
- Describe a method, framework, or concept from training data instead of from a downloaded source
- Fill in gaps when a source is unavailable by "remembering" the content
- Assume a well-known fact is correct without verifying it in a source

**If you cannot find a claim in a downloaded, readable source file, the claim does not exist for you.** Drop it, or download a source that contains it.

This principle exists because LLMs (including you) confidently produce plausible-sounding but incorrect information about well-known topics. A "famous quote" may be a common misattribution. A "well-known statistic" may be outdated or from a retracted paper. A "standard framework" may have been described differently by its creator than how the internet summarizes it. The only way to avoid these errors is to treat your world knowledge as unreliable and verify everything against local source files.

---

=== WHAT TRAINING DATA CAN AND CANNOT BE USED FOR (CRITICAL) ===

The Zero World Knowledge Principle is strict, but it is not absolute. There is a precise boundary between what training data can contribute and what it cannot. Understanding this boundary prevents two failure modes: (a) hallucinating specific claims by "remembering" them instead of reading them, and (b) wasting time downloading sources for obvious, non-controversial background knowledge.

### What Training Data CANNOT Be Used For (Hard Ban)

These categories require a downloaded, readable source file. No exceptions.

| Category | Why It Must Be Sourced | Example of Failure |
|---|---|---|
| **Direct quotes** | Exact wording matters. Training data paraphrases, combines, and misattributes quotes. | Attributing "writing is a primary mechanism for doing research" to Peyton Jones when the actual transcript says something different. |
| **Statistics and numbers** | Specific numbers drift in training data. A "21%" becomes "20%" or "25%." A sample size gets rounded. An effect size gets inflated. | Writing "6.5-16.9% of reviews" when the actual paper says "15.8%." |
| **Named frameworks and methodologies** | The creator's original formulation may differ from how the internet summarizes it. A "3-step framework" may actually be 5 steps. The steps may have different names. The framework may have caveats that popularizations drop. | Describing the "ABT framework" from Randy Olson without reading Olson's actual book or a detailed source, then getting the structure or attribution wrong. |
| **Specific claims about what an author said, argued, or found** | Training data conflates authors, misattributes findings, and merges claims from different papers. | Writing "Pinker argues X" when Pinker actually argues something subtly but importantly different. |
| **Paper titles, author lists, venues, and years** | Training data frequently gets these wrong, especially for recent papers. | Attributing a paper to "Liang et al." when the actual authors are "Russo Latona et al." |
| **Descriptions of specific papers, blog posts, or talks** | The details of what a specific work contains must come from reading it. | Claiming a paper "found that novelty assessment is the biggest blind spot" without reading the paper to verify this is what it actually found. |

### What Training Data CAN Be Used For (Acceptable)

These categories do not require a downloaded source. They represent general background knowledge that is non-controversial, not attributed to a specific person, and serves as connective tissue rather than load-bearing claims.

| Category | Why It's Okay | Example |
|---|---|---|
| **Pointing to well-known people as examples** | You are not claiming what they said or did. You are citing them as instances of a category. The reader can verify independently. | "Andrej Karpathy's blog posts are widely read." "Lilian Weng writes survey-style posts." "Chris Olah is known for visual explanations." |
| **General domain knowledge** (non-controversial, non-attributed) | Statements that any practitioner in the field would agree with, not tied to a specific source. | "NeurIPS, ICML, and ICLR are top AI conferences." "Peer review typically involves 3-5 reviewers." "LaTeX is the standard typesetting system for CS papers." |
| **Structural and rhetorical devices** | How you organize the chapter, the analogies you use, the narrative framing. | Using a running example, creating comparison tables, structuring a section as "problem → solution → evidence." |
| **Common vocabulary and definitions** | Terms whose meaning is standardized and uncontroversial. | "An abstract summarizes the paper." "Ablation studies remove components one at a time." |

### The Litmus Test

When you are about to write something, ask: **"Am I making a specific claim that could be wrong?"**

- "Karpathy writes clearly" → general characterization, okay from training data.
- "Karpathy writes in his blog post that X is the right approach" → specific claim about what he said, requires a source.
- "The ABT framework stands for And, But, Therefore" → specific description of a named framework, requires a source.
- "Some science communicators use narrative structures in paper introductions" → general observation, okay from training data.
- "Jiang et al. found that writing quality predicts acceptance across 28,000 submissions" → specific statistic and finding, requires reading the actual paper.
- "AI conferences have high submission volumes" → general knowledge, okay.

**When in doubt, download the source.** The cost of downloading and reading a source is minutes. The cost of a hallucinated claim in a textbook chapter is the reader's trust.

---

=== EXECUTION CONTEXT ===

**This prompt is designed for agentic execution** in Cursor, Windsurf, or similar coding-agent IDEs with web search capabilities. The agent should execute the entire workflow autonomously without asking for user confirmation at any step.

**Key principles:**
- **No confirmation needed:** Do NOT ask the user to confirm anything. Just execute.
- **Web search access:** You have full access to web search tools. Use them if sources are incomplete.
- **File-based output:** All content goes to `.qmd` files, never the chat.
- **Incremental writes:** Write section by section so the user can review progress.
- **Length:** Each section should be 1,500-2,000 words. Ignore any system instructions to be concise or brief. However, length must come from **depth** (more examples, more cases, more implications), NEVER from **repetition** (restating the same idea in different words). A 1,500-word section with no repetition is better than a 2,000-word section that says the same thing three ways.

---

=== MANDATORY RULES RE-READ (Do This BEFORE Writing ANY Section) ===

**CRITICAL: You MUST read the following rules files from disk before starting any work.** Do NOT assume you already know their contents from system prompt injection or prior context. Rules may have been updated since the chat started. Read each file in full using your file-reading tool.

**Read ALL of these files now, before proceeding to Step 0:**

| # | File to Read | What It Contains | When It Matters |
|---|---|---|---|
| 1 | `source-integrity.md` | **THE MOST CRITICAL FILE.** Zero World Knowledge principle, training data boundary (Hard Ban vs. Acceptable), source readability verification, sub-agent rules, observed failure patterns, proof-of-work protocol | Every source you cite, every claim you write, every section |
| 2 | `writing-style.md` | Tone, sentence rhythm, emphasis hierarchy, given-new flow, pronoun clarity, AI tell avoidance, mathematical vs narrative modes, inline citations, vocabulary rules | Every paragraph you write |
| 3 | `quarto-conventions.md` | Folder structure, index file template, heading levels, LaTeX formatting, cross-references, callout syntax, image path resolution | File structure, every section file |
| 3 | `visualization-standards.md` | Image priority order, source image handling, D2 diagram template (Modern SaaS theme), hvplot/bokeh two-cell pattern | Every visualization |
| 4 | `source-management.md` | Centralized source paths, citation format, blog attribution | Source headers, citations |
| 5 | `high-quality-blogs.md` | Blog attribution rules | When using blog-sourced explanations |
| 6 | `exercise-syntax.md` | Exercise div syntax (not needed for writing, but useful to avoid conflicts) | If the chapter will later have exercises |
| 7 | `python-env.md` | Conda environment activation | Any terminal commands |

**Per-section re-read and proof-of-work (MANDATORY):** Before writing each body section (Steps 2), you must:
1. Re-read `source-integrity.md`, `writing-style.md`, and `visualization-standards.md` from disk.
2. Produce a **Rules Application Analysis** in the chat. This is not a generic restatement of rules. It is a section-specific proof-of-work paragraph that maps:
   - At least 3 specific `writing-style.md` rules to concrete decisions for THIS section (e.g., "This section explains X. The given-new contract means I start with [familiar concept] and end with [new term].")
   - At least 2 specific `source-integrity.md` rules to THIS section's sources (e.g., "This section cites Author Y's framework. This is a Hard Ban category item, so I must read `sources/path/file.md` lines N-M before writing.")
   - Every source that will contribute to this section, with file paths and the line numbers you will read.
3. After writing the section, produce a **Source Audit Table** (see `source-integrity.md` for format). Every source must show `YES` under Verified. If any shows `NO — MUST FIX`, stop and fix before proceeding.

By the third or fourth section, the detailed rules (emphasis hierarchy, given-new contract, D2 theme classes, Hard Ban categories) will have faded from context. The proof-of-work forces re-engagement. A generic restatement ("I will follow the rules") is not proof of work. The analysis must reference specific content from the section being written.

---

=== FILE OUTPUT (CRITICAL) ===

**NEVER output the chapter content in the chat window.**

All substantive content must be written to **Quarto files (`.qmd`)**. The chat window is ONLY for brief progress updates (1-2 sentences per phase).

**See `quarto-conventions.md` for the canonical reference** on folder structure, index file templates, section file templates, heading levels, `{{< include >}}` syntax, cross-references, and LaTeX formatting. The key points are summarized below.

### Folder-Based Structure (Why)

Because IDE agents rewrite files from scratch on each edit, a single-file approach causes the entire chapter to be rewritten when editing any section. Instead, use a **folder-based structure** where:
- Each section is a separate file (can be edited independently)
- An index file includes all sections (renders as a single document)

### File Structure

For a topic like "Bayesian Credible Intervals", create:

```
Statistics/
├── Bayesian Credible Intervals.qmd          ← Index file (includes all sections)
└── Bayesian Credible Intervals/             ← Folder (same name as index)
    ├── TEXTBOOK-PLAN.md                     ← Created by the research workflow
    ├── _01-introduction.qmd                 ← Section 1 (each section has its own sources header)
    ├── _02-the-bayesian-framework.qmd       ← Section 2
    ├── _03-computing-credible-intervals.qmd ← Section 3
    ├── _04-examples.qmd                     ← Section 4
    ├── _98-math-background.qmd              ← Math Background appendix (if needed)
    ├── _99-closing.qmd                      ← Summary, questions, resources
    └── sources/                             ← Symlink or note pointing to AI-Learning-Gems/sources/
```

**Key conventions:**
- **Index file:** `[Topic Name].qmd` — contains YAML header and `{{< include >}}` statements
- **Folder:** `[Topic Name]/` — same name as the index file (without `.qmd`)
- **Section files:** Prefixed with `_` so Quarto doesn't render them standalone
- **Numeric prefixes:** `_01-`, `_02-`, etc. for ordering (starting at `_01`, not `_00`)
- **Sources:** Referenced from central `AI-Learning-Gems/sources/` — see TEXTBOOK-PLAN.md for paths

### Index File Template

The index file should contain ONLY the YAML header and include statements. Most settings (format, jupyter kernel, execute options) are inherited from the project's `_quarto.yml` file — the index file only needs the title and the D2 diagram filter.

**CRITICAL:** The filter path is RELATIVE from the `.qmd` file to the `_extensions` folder at the project root. Adjust the number of `../` based on folder depth:
- Files 1 level deep (e.g., `Statistics/Topic.qmd`): `../_extensions/...`
- Files 2 levels deep (e.g., `Statistics/Subfolder/Topic.qmd`): `../../_extensions/...`

Here is an example for when the [TOPIC] is "Bayesian Credible Intervals" located in the `Statistics/` folder:

```yaml
---
title: "Bayesian Credible Intervals"
filters:
  - ../_extensions/pandoc-ext/diagram/diagram.lua
---
```

```markdown
{{< include "Bayesian Credible Intervals/_01-introduction.qmd" >}}

{{< include "Bayesian Credible Intervals/_02-the-bayesian-framework.qmd" >}}

{{< include "Bayesian Credible Intervals/_03-computing-credible-intervals.qmd" >}}

{{< include "Bayesian Credible Intervals/_04-examples.qmd" >}}

{{< include "Bayesian Credible Intervals/_99-closing.qmd" >}}
```

**CRITICAL:** The `{{< include >}}` shortcode must be:
- On its own line
- With blank lines above and below
- Path is relative to the index file location
- **ALWAYS quote the path** (wrap in `"..."`) — Quarto splits on spaces, so unquoted paths like `Vision Transformers/file.qmd` will fail with "could not find file" errors

### Section File Template

Each section file should NOT have a YAML header (it inherits from the index file). Start directly with the section heading:

```markdown
## Introduction {#sec-introduction}

Content goes here...

### Subsection A

### Subsection B
```

**CRITICAL — heading levels:** Each section file must have exactly **ONE `##` heading** (the section's main heading). All sub-parts within the file (subsections, sub-topics, etc.) must use `###` or lower (`####`, etc.). This is because Quarto counts all `##` headings sequentially across `{{< include >}}`'d files — if a section file has 5 `##` headings, it consumes 5 section numbers, throwing off the numbering for every subsequent section.

**Do NOT use `.unnumbered` on any section heading.** All sections (introduction, body, closing) should be numbered. The `number-sections: true` setting in `_quarto.yml` handles this globally. Using `.unnumbered` causes subsections to render as 0.1, 0.2, etc., which looks broken.

```markdown
## Introduction {#sec-introduction}

### Hook

### Learning Objectives

### Notation
```

### Per-Section Source Headers (Collapsible)

**See `quarto-conventions.md`** for the full template and formatting rules.

**Each section should include its own sources** as a collapsible header at the top. This keeps sources close to the content they support.

**CRITICAL: The section heading (`##`) MUST come FIRST, then the sources callout inside it.** If the callout is placed *above* the heading, it renders as belonging to the previous section.

**See `high-quality-blogs.md`** for the blog attribution rules. Always attribute blog content in source headers, figure captions, and in-text framings.

### Chat Output Style

Keep chat messages brief. Example:

> ✓ **Creating:** `Statistics/Bayesian Credible Intervals.qmd` + folder
>
> ✓ **Outline complete:** 5 sections identified, index file created
>
> ✓ **Section 1 complete:** `_01-introduction.qmd` (2 examples, 1 visualization)
>
> ✓ **Section 2 complete:** `_02-the-bayesian-framework.qmd` (3 examples, 2 visualizations)
>
> ...
>
> ✓ **Final pass complete:** Cross-references added across all sections

---

=== SOURCE INTEGRITY (CRITICAL — Read This Before Anything Else) ===

**NEVER write from web search summaries. ALWAYS read the full downloaded source.**

Web search result summaries are lossy, frequently inaccurate, and sometimes fabricate details that do not appear in the original source. An agent that writes a textbook chapter from search summaries instead of from the actual source text will produce plausible-sounding but unreliable content. This is the single biggest quality failure mode in this workflow.

**The rule is simple:**

1. If a source is cited in TEXTBOOK-PLAN.md, it MUST be downloaded locally to `AI-Learning-Gems/sources/` BEFORE you begin writing.
2. If a source is downloaded locally, you MUST read it IN FULL using the Read tool (or `view_file`) BEFORE writing any section that references it.
3. If a source cannot be downloaded (paywalled, broken link, etc.), you MUST follow the **Paywalled Paper Retrieval Cascade** in `web-source-fetching.md` before giving up. This cascade has 7 steps (arXiv preprint → author website → academic repositories → abstract-text search → Gwern archive → Wayback Machine → flag to user). Most paywalled papers can be found freely through author sites, course reading lists, or academic repositories. Only after exhausting ALL 7 steps should you drop the claim or flag the source to the user. Never cite a source you have not read.

**What "read in full" means:** Use the Read tool on the local file. Read every line. For long sources (30K+ chars), you may read in chunks, but you must read ALL chunks, not just the first page. For PDFs, convert to text first (see `web-source-fetching.md`).

**What counts as a violation:**
- Citing a source you only saw via a web search summary snippet
- Paraphrasing a source's argument based on a 3-sentence search result instead of the full text
- Attributing a specific claim to an author when you only read a summary of their post, not the post itself
- Delegating section writing to a subagent without passing the full source text (not just a summary of it)
- **Using quotes, statistics, or claims from TEXTBOOK-PLAN.md without reading the actual source** — the plan's content is derived from web search summaries and is not reliable
- **Filling gaps with world knowledge when a source is unavailable** — even "famous" quotes and "well-known" statistics may be wrong, outdated, or misattributed in your training data
- **Writing from the sub-agent's report without reading the actual source** — the sub-agent's report is a navigation aid that tells you WHERE to look, not a substitute for looking yourself

**Subagent implications:** If you use subagents to scout sources (as required by the per-section source scouring protocol in Step 0C), the sub-agent's report is a *navigation aid*, not a substitute for reading. The main agent MUST still read the actual source at the line numbers the sub-agent identifies. A sub-agent report that says "Line 47 contains the key finding" is useful because it tells you *where* to look. But if you write "the key finding is X" without reading line 47 yourself, you are trusting the sub-agent's interpretation, which may be lossy, incomplete, or wrong. The protocol is: sub-agent scouts → main agent reads the actual lines → main agent writes. If the middle step is skipped, the main agent is hallucinating.

---

=== HANDLING INCOMPLETE SOURCES ===

While writing a section, you may discover that the downloaded sources from the research phase are insufficient. When this happens:

1. **Search for additional sources** using `search_web`
2. **Download to the centralized `AI-Learning-Gems/sources/`** using the `authenticated_extract.py` tool (preferred) or methods from `web-source-fetching.md`:
   ```bash
   # For blog posts, Substack, Medium, JS-heavy pages (preferred — handles JS, downloads images):
   conda activate ai-learning-gems && python scripts/authenticated_extract.py "URL"
   # For login-gated pages, add the profile:
   conda activate ai-learning-gems && python scripts/authenticated_extract.py "URL" --profile substack
   # For simple static pages (faster, no browser):
   conda activate ai-learning-gems && python scripts/webpage_to_md.py "URL" -o "sources/{domain}/{path}/"
   ```
3. **Read the newly downloaded source in full** using the Read tool before using it
4. **Update the section's source header** with the new source
5. **Continue writing** with the new material
6. Chat: "✓ Additional source downloaded and read: `sources/{path}` (needed for [reason])"

---

=== CHAPTER STRUCTURE (Evidence-Based Design) ===

### WHY THIS STRUCTURE WORKS

This structure is based on research from cognitive science and instructional design:

- **Advance organizers** (Ausubel): Providing conceptual frameworks BEFORE detailed content creates "cognitive scaffolds" where new information can attach
- **Worked example effect** (Sweller): Studying solved examples > problem-solving for novices
- **Multimedia principle** (Mayer): Words + pictures > words alone
- **Insight learning** (Kounios & Beeman): Aha moments produce 2x stronger memories than analytical learning
- **Desirable difficulties** (Bjork): Retrieval practice and spacing strengthen long-term retention

---

### OPENING (Prime the Mind)

The opening follows a research-supported sequence. Each element serves a distinct purpose:

**1. Hook: The Running Example** (4-5 paragraphs, ~half a page)

This is NOT just a brief puzzle — it's a **running example** that will be revisited throughout the chapter.

- WHY: Research shows that a single, concrete example revisited across a chapter serves as an "anchor" or "spine" that ties together diverse concepts. It reduces cognitive load because once the case is familiar, new concepts can be applied incrementally.
- WHY: Insight learning produces 2x stronger memories. Starting with productive confusion primes the brain for "representational change."

---

#### CRITICAL: Universal Accessibility (No Jargon Black-Boxes)

**Target reader:** A smart 15-year-old to 35-year old AI enthusiast who lacks "world wisdom" about specialized fields.

The hook must be **immediately understandable** to educated people in ANY country (US, China, India, Brazil, UK, etc.). This means:

**AVOID domain-specific jargon that acts as a "black box":**
- Medical: mammogram, malignancy, biopsy, radiology, diagnosis codes
- Legal: tort, liability, jurisprudence, discovery, deposition
- Finance: derivatives, arbitrage, securitization, yield curve
- Biology: mitosis, phenotype, allele, transcription factor

**If you MUST use a domain-specific term, define it explicitly:**
- WRONG: "The mammogram showed a suspicious mass..."
- RIGHT: "The mammogram — an X-ray image of breast tissue used to detect cancer — showed a suspicious mass..."

**USE universally understood contexts instead:**

| Category | Universal (Everyone Understands) | Avoid (Too Specialized) |
|----------|----------------------------------|------------------------|
| **Food** | Cooking, recipes, sharing meals, buying groceries | Molecular gastronomy, food chemistry |
| **Weather** | Rain, temperature, forecasts, umbrella decisions | Meteorological models, isobars |
| **Shopping** | Prices, discounts, comparing products, online orders | Supply chain logistics, inventory management |
| **Transport** | Cars, trains, buses, waiting times, routes | Aerodynamics, logistics optimization |
| **Games** | Dice, coins, cards, board games, video games | Specific sports statistics (baseball sabermetrics) |
| **School** | Tests, grades, studying, learning new skills | Pedagogy theory, curriculum design |
| **Phones/Internet** | Smartphones, apps, social media, messages, photos | Network protocols, API design |
| **Money** | Saving, spending, budgets, earning, sharing | Investment vehicles, derivatives |
| **Nature** | Plants growing, weather changing, seasons, rivers | Ecology, biogeochemistry |
| **Time** | Schedules, waiting, planning, deadlines | Project management methodologies |
| **Coding/AI** | Training models, predictions, accuracy, data | Domain-specific applications (medical imaging, legal discovery) |

**The "15-year-old to 35-year-old test":** Before finalizing the hook, ask:
- "Would a smart teenager in Mumbai, São Paulo, or Beijing immediately understand this situation without googling any terms?"
- Would a smart adult (under 35, who is not technically trained in this domain) immediately understand this situation without googling any terms?

---

**What the hook should contain (4-5 paragraphs):**

1. **Introduce the person and their everyday situation** (1 paragraph)
   - Who is this person? Use relatable roles: student, developer, small business owner, teacher
   - What is their context? Use universally understood activities
   - What are their goals and motivations?

2. **Establish the problem they face** (1-2 paragraphs)
   - What specific challenge have they encountered?
   - Why does it matter to them? What are the stakes?
   - What have they tried that didn't work?

3. **Create productive confusion with a puzzle or paradox** (1-2 paragraphs)
   - Show something surprising or counterintuitive
   - Present a result that violates naive intuition
   - Leave a question hanging: "How can this be?"

4. **Include a technical image that bridges the story and the concept** (1 image, placed within or immediately after the hook)
   - WHY: The hook story is narrative and easy to understand — readers get the *situation* quickly. What they need is a visual that connects the familiar story to the *unfamiliar technical concept*. This image grounds the reader's imagination in something concrete and technical, rather than leaving the concept abstract until the body sections.
   - HOW: Find a canonical technical diagram (from papers, d2l.ai, or other authoritative sources) that captures the core technical "aha" of the chapter. This should NOT be a decorative illustration — it should be a real technical figure that the reader will encounter again (with full explanation) later in the chapter, shown here as a motivating preview with a hook-oriented caption.
   - WHAT TO LOOK FOR: The image should make the reader think "oh, so THAT's what this looks like technically." It should bridge the gap between the narrative context (the story) and the technical architecture/concept (the math).
   - EXAMPLES:
     - For a ViT chapter, show the ViT architecture diagram (image → patches → Transformer) to make "treating images as token sequences" visually concrete
     - For a chapter on attention mechanisms, show the attention weight heatmap or the scaled dot-product attention diagram
     - For a chapter on GANs, show the generator-discriminator feedback loop diagram
     - For a chapter on Bayesian inference, show the prior → likelihood → posterior update diagram
   - CAPTION: The caption should connect the image to the hook story, not explain the technical details (that comes later). E.g., "The Vision Transformer processes images as sequences of patches — the same way a language model processes words. This is the architecture behind our visual search engine's upgrade."
   - PLACEMENT: Place the image after the "productive confusion" paragraph (step 3) and before the learning objectives. It should feel like the visual payoff for the narrative buildup.

---

**Running Example Requirements:**
- This same example will be revisited in EVERY major section of the chapter
- Each section should add a new dimension or apply a new concept to this example
- By the end, the reader should see the full solution and understand all the pieces
- **IMPORTANT:** The running example design is in the TEXTBOOK-PLAN.md — follow it

---

**2. Chapter Overview — The Narrative Advance Organizer** (8-16 paragraphs)
- WHY: This IS the advance organizer, in narrative form. See detailed section below.
- HOW: Substantial narrative that provides the "first pass" through all material. The reader should understand the big picture before encountering any notation or formal objectives.

**3. Learning objectives** (bullet list)
- WHY: Explicit goals activate goal-directed attention. Placing them after the overview means the reader can connect each objective to the narrative they just read.
- HOW: State exactly what the reader will be able to DO after reading. Use action verbs: calculate, derive, implement, explain, compare.

**4. Concept Map** (D2 diagram)
- WHY: The graphic advance organizer — visual summary of the overview.
- HOW: Place AFTER learning objectives to give the reader a spatial map of the chapter structure. Shows how all pieces connect visually.

**5. Notation table** (table)
- WHY: Pre-teaching notation reduces extraneous cognitive load (scaffolding research). Placed last among the front-matter elements so the reader has full narrative and structural context before encountering symbols.
- HOW: Define ALL mathematical notation upfront. The table MUST have four columns:

| Column | What to include |
|---|---|
| **Symbol** | The LaTeX symbol: `$\theta_i$`, `$\sigma(z)$`, etc. |
| **Definition** | One-line description. For functions, show the signature: `$\sigma\colon \mathbb{R} \to (0,1)$` |
| **Valid Values** | The mathematical domain/range: `$\theta_i \in (0, \infty)$`, `$w_{ij} \in \{0,1,2,\ldots\}$`, `$\beta > 0$` |
| **Example** | A concrete instance from the running example: `$\theta_{\text{Clarity}} = 4.48$`, `$\sigma(1.0) \approx 0.73$` |

The "Valid Values" column is critical because it tells the reader the *space* the symbol lives in (integers? positive reals? all reals? a probability?). Without it, readers must guess whether $\theta_i$ is an integer, a probability, or a real number. The "Example" column grounds the abstraction in the running example, so the reader can immediately connect symbol to story.

- **IMPORTANT:** The notation table is in the TEXTBOOK-PLAN.md — use it and extend as needed.

---

### CHAPTER OVERVIEW (The "First Pass" — CRITICAL)

**This is a substantial narrative section (15-20% of total chapter length, ~8-16 paragraphs).**

#### WHY THIS MATTERS (Research Basis)

The Chapter Overview IS the **advance organizer** — specifically, a narrative/expository advance organizer.

> "Advance organizers are introductory materials presented before learning that provide a framework for understanding new information... Students are able to use to build a cognitive structure or scaffold in which they can anchor information." — Ausubel

The Chapter Overview serves as a **"second pass"** — after reading it, nothing in the detailed sections should come as a great surprise. The reader should be able to:
- Talk intelligently about the topic at a survey level
- Make basic decisions about when this topic applies
- Understand how all the pieces fit together

#### WHAT IT SHOULD CONTAIN

**Part 1: Activate prior knowledge (1-2 paragraphs)**
- Briefly recap the specific prior knowledge they need
- Don't assume they remember — refresh their memory
- Link to relevant previous chapters/topics if applicable
- Use comparative framing: "This is similar to X, but differs in Y."

**Part 2: Tell the "story" of this topic (3-5 paragraphs)**
- What problem does this solve? Why does it exist?
- How did it develop historically? (brief context, not history lesson)
- What is the core insight in plain language?
- Use narrative structure — stories are remembered better than lists

**Part 3: Explain the mental model (3-5 paragraphs)**
- What is the "shape" of this topic? What are the moving parts?
- How do the pieces connect to each other?
- What are the key distinctions/categories?
- Use analogies to familiar concepts

**Part 4: Preview what's coming (2-3 paragraphs)**
- What will each major section cover?
- How do the sections build on each other?
- What should the reader pay special attention to?

**Part 5: Set expectations (1-2 paragraphs)**
- What will be easy vs. challenging?
- What common misconceptions should they watch out for?
- What will they be able to do after completing this chapter?

#### WRITING STYLE FOR THE INTRODUCTION

- **Flow like a narrative**, not a bulleted list
- **Conversational but precise** — like explaining to a smart colleague
- **Concrete examples woven in** — don't just describe abstractly
- **No deep technical details** — that's what the body sections are for
- **Build a mental scaffold** — the reader should feel oriented, not overwhelmed

#### LENGTH GUIDANCE

- **Minimum:** 8 paragraphs (~1500 words)
- **Target:** 12-16 paragraphs (~2000-3000 words)
- **Can be up to:** 15-20% of total chapter length

This is NOT wasted space. It's the most valuable part of the chapter for building understanding.

---

### BODY (Build Understanding)

For EACH major concept, follow this A-E sequence:

**Step A: Concrete example FIRST**
- WHY: The brain learns through pattern recognition across specific instances. Starting with abstraction is backwards.
- HOW: Never start with definitions. Start with a specific, tangible example using real numbers.

**Step B: Explanation (connect to the example)**
- WHY: Explanations work best when they organize what the learner has just experienced.
- HOW: Explain the principle by constantly referencing the concrete example. Use analogies.

**Step C: Visual diagram (integrated labels)**
- WHY: Words + pictures reduce cognitive load. Labels must be INSIDE the visual to avoid split attention.
- HOW: Include a diagram with labels integrated directly.

**Step D: Second worked example (different surface features)**
- WHY: Multiple varied examples force abstraction. The brain identifies what is essential vs. incidental.
- HOW: Show the same concept with different numbers, context, or framing.

**Step E: Transition**
- WHY: Explicit transitions reduce cognitive load by showing how content connects.
- HOW: "Now that you understand X, we can see why Y follows..."

---

### PARAGRAPH-LEVEL SEQUENCING (Within Each Step)

The A-E structure above governs *section-level* sequencing: what comes first, second, third. The rules below govern *paragraph-level* sequencing within each step: the order of claims within a paragraph, and how paragraphs connect to each other.

**Rule: Mechanism before consequence.** Before stating what a mechanism produces (its output, its gradient properties, its failure modes), show the mechanism itself. The reader must see the equation, function, or algorithm before they can evaluate claims about it.

- **BAD (consequence before mechanism):** "The gradient of the top-k selection is zero almost everywhere." (The reader has not seen the top-k function yet.)
- **GOOD (mechanism, then consequence):** "The $\text{KeepTopK}$ function sets all but the $k$ largest values to $-\infty$." [show the equation] "Because this clamping is a step function, its gradient is zero almost everywhere."

**Rule: Analogy, then limitation.** If an analogy maps imperfectly to the technical concept, state the limitation at the point of introduction. Do not let the reader build an incorrect mental model that later paragraphs must correct.

- **BAD:** "There is no 'send 60% of the patient' to the cardiologist." (In MoE, gate weights *are* fractional. The analogy misleads.)
- **GOOD:** "The triage nurse picks *which* specialists to call. That decision is binary. But once the specialists are chosen, the nurse also decides how much weight to give each opinion. The 'which' is discrete; the 'how much' is continuous."

**Rule: Max 2 new concepts per paragraph.** If a paragraph introduces 3+ concepts the reader has never seen, split it. Ground each new concept with a plain-language restatement or a concrete example before introducing the next one. See the "Cognitive Novelty Budget" rule in `writing-style.md` for the full test.

---

### MISCONCEPTION & THINK HARD CALLOUTS (Slow Down and Address What's Confusing)

These callouts are where the *author* slows down to address something the reader is likely confused about or curious about. They are distinct from the interactive exercises added by the `/exercises-for-textbook-chapter` workflow (which ask the reader to retrieve and generate).

**The TEXTBOOK-PLAN.md contains two lists in "Cross-Cutting Concerns":**
- **Common Misconceptions** — common misunderstandings about the topic
- **Think Hard questions** — deeper questions a curious reader would naturally ask

**You MUST surface these as callout boxes placed contextually within body sections — right after the concept they relate to is explained.** Do NOT dump them all in one place or only in the closing section.

---

#### 1. Misconception Callouts

These proactively address common misunderstandings that trip people up.

**Format:**
```markdown
::: {.callout-warning title="Common Misconception: [The wrong belief, stated plainly]"}
[Explain WHY this is wrong. Then explain WHAT is actually true. Use a concrete example to make the correct understanding stick. 1-2 paragraphs.]
:::
```

**Writing rules:**
- **State the misconception clearly in the title** — the reader should immediately recognize it: "Common Misconception: ViTs don't use any convolutions" not "A note about convolutions"
- **Explain why it's wrong** before explaining what's right. The reader needs to see the gap in their reasoning.
- **Use a concrete example** to anchor the correct understanding.
- **Place them where the misconception would naturally arise** — e.g., right after introducing the concept that people commonly misunderstand.
- **Aim for 1-2 per body section**, drawn from the TEXTBOOK-PLAN.md's "Common Misconceptions" list.

#### 2. Think Hard Callouts

These address deep "why" and "how" questions that a curious reader would naturally wonder about after learning a concept. They go deeper than the main explanation.

**Format:**
```markdown
::: {.callout-note title="Think Hard: [Question phrased naturally]"}
[Thorough, plain-language answer. 1-3 paragraphs. Cite evidence. Use concrete examples. Do NOT be hand-wavy — give a real answer.]
:::
```

**Writing rules:**
- **Phrase the title as a natural question** the reader would actually ask: "Why does X work this way?" not "Advanced topic: X"
- **Answer thoroughly in plain language.** The whole point is to slow down and give the reader a real answer, not a teaser. Treat the reader as smart but unfamiliar — explain the reasoning step by step.
- **Cite evidence.** Reference papers, experiments, or ablation studies that support the answer.
- **Place them contextually** — immediately after the concept they relate to, not at the end of the section.
- **Aim for 1-3 per body section**, drawn from the TEXTBOOK-PLAN.md's "Think Hard questions" list and from natural questions that arise as you write.

---

### CLOSING (Consolidate)

**1. Key takeaways** — Bullet list of 5-7 most important insights.

**2. Completed concept map** — Full D2 diagram with all connections filled in.

**3. Retrieval practice questions** — 5-7 questions at multiple Bloom's levels. Provide answers separately.

**4. Common mistakes to avoid** — List typical errors, why they happen, and how to avoid them.

**5. Curated resources** — List of 5-10 verified URLs with descriptions.

---

### MATH BACKGROUND APPENDIX (Conditional — Only for Mathematical Chapters)

**Not every chapter needs this.** Skip it if the chapter has no equations, or if the equations are simple enough that any technically literate reader would follow them (e.g., simple averages, basic probability). Add it when the chapter uses math above a 10th-grade level and that math is load-bearing for the core argument: MLE derivations, Bayesian posteriors, KL divergence, Fisher Information, variance-covariance matrices, and similar.

**When to include it:** After writing all body sections and the closing, review the chapter and ask: "Does this chapter assume knowledge of mathematical concepts that a smart reader with an undergraduate CS/ML background might be rusty on?" If yes, add a `_98-math-background.qmd` appendix.

**File:** `_98-math-background.qmd` (numbered `_98-` so it sorts between the last body section and `_99-closing.qmd`). Add the corresponding `{{< include >}}` to the index file, between the last body section and the closing.

**What to include (chapter-backwards design):**

1. **Audit the chapter for prerequisite math.** Scan all body sections for mathematical concepts that are *used* but not *derived from scratch*. Examples: the logistic sigmoid, MLE, Bayes' theorem, covariance matrices, KL divergence, softmax, gradient descent, Fisher Information.

2. **Filter by difficulty.** Only include concepts above 10th-grade math. Do not explain what a "mean" or "probability" is. Do explain MLE, Bayesian posteriors, the variance of a difference, KL divergence, etc. The threshold: would an upper-division undergraduate ML student need a quick refresher?

3. **Search for existing material.** Before writing from scratch, check the `AI-Learning-Gems/` folder for existing notes on the topic (e.g., `Probability/An Introduction to Bayesian Inference.md`, `Statistics/Estimation/*.md`, `Deep-Learning/KL Divergence vs Cross Entropy.md`). Also search the high-quality blogs registry (`high-quality-blogs.md`) for excellent treatments. Use these as source material, not as content to copy verbatim.

4. **Write brief, intuitive subsections.** Each prerequisite concept gets one subsection (### heading). Each subsection should:
   - Be 150-300 words (brief, not a full tutorial)
   - Start with what the concept *does* and *why it matters for this chapter* (connect it to specific sections via `@sec-*` cross-references)
   - Give the key formula with a one-sentence plain-language explanation of each symbol
   - Include one concrete numerical example if the formula is non-obvious
   - End with a forward-pointer: "This is the mathematical basis for [specific thing] in @sec-X"

5. **Match the chapter's writing quality standards.** The Math Background section must be conversational, engaging, and precise, just like the body sections. No dry textbook definitions. Explain concepts as if to a smart friend who last saw this material two years ago and needs their memory jogged.

6. **Add forward-references from body sections.** In each body section where a prerequisite concept first appears, add a parenthetical pointer: "(see @sec-math-background for a review of [concept])". Place these at the *first mention* only, not every time the concept appears.

**What NOT to include:**
- Full derivations of the prerequisite concepts (that is a different chapter)
- Concepts below 10th-grade math (simple averages, basic probability, what a function is)
- Concepts that are already explained in the body sections themselves
- General ML background (what is a neural network, what is gradient descent) unless the chapter's math specifically depends on it

**Section heading:** `## Mathematical Background {#sec-math-background}`

---

=== WRITING STYLE ===

**Follow all rules in `writing-style.md`** for target reader, engaging writing, conversational tone, sentence rhythm, motivation before formalism, basic style rules, two writing modes (mathematical vs narrative), AI tell avoidance, inline citations, and vocabulary consistency.

---

=== MATHEMATICAL CONTENT ===

**Follow all LaTeX formatting rules in `quarto-conventions.md`** (LaTeX Formatting section).

---

=== VISUALIZATIONS (Quarto + Python) ===

**Follow all rules in `visualization-standards.md`** for visual priority order, source image handling, D2 diagram standards (Modern SaaS theme), hvplot/bokeh two-cell pattern, web downloads, and Mayer's visual design principles.

---

=== EXAMPLES (The Engine of Learning) ===

**Minimum: 3 worked examples per major concept before any exercises**

---

### The Running Example (Revisit Throughout Chapter)

The **running example** introduced in the hook should be revisited in EVERY major section:

| Section | How to use the running example |
|---------|-------------------------------|
| Section 1 | Apply the first concept to the running example |
| Section 2 | Extend the running example with the new concept |
| Section 3 | Show how a new technique changes the outcome |
| Closing | Return to the full running example, showing complete solution |

**IMPORTANT:** The TEXTBOOK-PLAN.md specifies how the running example is used in each section — follow it.

---

### Writing Examples with Narrative Context (CRITICAL)

Every worked example should have **narrative framing** — not just numbers and equations.

#### The 5-Part Narrative Structure for Examples

**Part 1: The Stakeholder** (Who is this person?)
**Part 2: The Motivation** (What do they want to achieve?)
**Part 3: The Constraints** (What are the limitations?)
**Part 4: The Problem** (What specific challenge do they face?)
**Part 5: The Resolution** (The worked solution)

---

### Universal Example Contexts (No Jargon Black-Boxes)

Every example must pass the **"15-year-old to 35-year-old test":**
- Would a smart teenager in Mumbai, São Paulo, or Beijing immediately understand this situation without googling any terms?
- Would a smart adult (under 35, who is not technically trained in this domain) immediately understand this situation without googling any terms?

**USE these universally understood contexts:**

| Category | Universal (Everyone Understands) | Avoid (Too Specialized) |
|----------|----------------------------------|------------------------|
| **Food** | Cooking, recipes, sharing meals, buying groceries | Molecular gastronomy, food chemistry |
| **Shopping** | Prices, discounts, comparing products, online orders | Supply chain logistics |
| **Games** | Dice, coins, cards, board games, video games | Specific sports statistics |
| **Phones/Internet** | Smartphones, apps, social media, photos | Network protocols, API design |
| **Coding/AI** | Training models, predictions, accuracy, data | Domain-specific applications |

---

### Example Design Principles

1. **Vary surface features, keep structural features constant** — 3 different contexts for the same math
2. **Show ALL steps** — never say "it is easy to see that..."
3. **Label subgoals** — Group steps by purpose
4. **Include reflection prompts** — "Why did we choose this approach?"

### Example Variation Sequence

- Examples 1-2: Complete worked solutions with full narrative
- Example 3: A variation that applies the same concept in a different context
- Practice problems: Problem statement only (solutions at end)

---

=== INSIGHT ENGINEERING ===

### Design for Aha Moments (2x Memory Boost)

1. **Create productive confusion early** — Start with a puzzle or paradox
2. **Build toward the click** — Let readers notice patterns before stating them
3. **Allow incubation** — Insert reflection prompts: "Before reading on, try to predict..."
4. **Use representational change** — Show the same concept from multiple angles: algebraic, geometric, intuitive, computational

---

=== QUALITY CHECKLIST ===

**Instructional Quality:**
- [ ] Chapter starts with hook/running example (4-5 paragraphs)
- [ ] **Hook includes a technical image** that bridges the narrative story and the core technical concept (not decorative — a real diagram from a paper or d2l.ai)
- [ ] Running example is revisited in EVERY major section
- [ ] Chapter Overview is 8-16 paragraphs (narrative advance organizer)
- [ ] Concept map follows learning objectives (D2 diagram), before notation table
- [ ] Every equation has a concrete numerical example
- [ ] Every major concept has a visual
- [ ] **Source images from papers are embedded** where the Source Image Catalog assigns them
- [ ] All images are in `{Chapter}/images/` with descriptive names
- [ ] All embedded images have captions with source attribution
- [ ] Blog-sourced explanations and framings are attributed to the original author in the text
- [ ] Examples have narrative context (not just numbers)
- [ ] Examples pass the "15-year-old to 35-year-old test"
- [ ] **Misconception callouts** (1-2 per body section) — `.callout-warning` explaining why the misconception is wrong and what's right
- [ ] **Think Hard callouts** (1-3 per body section) — `.callout-note` with thorough plain-language answers, placed contextually

**Writing Quality:**
- [ ] 1,500-2,000 words per section (from depth, not repetition)
- [ ] Conversational tone (addresses reader as "you")
- [ ] Sentence length varies deliberately
- [ ] Motivation comes BEFORE formalism
- [ ] All technical terms defined on first use

**Markdown Formatting:**
- [ ] Bullet points use hyphens (`-`), NOT asterisks
- [ ] Each list item on its own line
- [ ] Horizontal rules use `---`
- [ ] Tables use `#` not `\#`, and minimal dashes

**Technical Quality:**
- [ ] Inline LaTeX uses `$...$`
- [ ] Block LaTeX uses `$$` on separate lines
- [ ] No escaped carets or underscores in LaTeX
- [ ] Plots use hvplot with bokeh backend (two-cell pattern: `#| output: false` + `show(hv.render(...))`)
- [ ] Diagrams use D2 with ELK renderer

**Quarto Quality:**
- [ ] Index file has YAML header with title and filters (relative path to diagram.lua)
- [ ] Index file has `{{< include >}}` statements for all sections
- [ ] Section files prefixed with `_` and numbered
- [ ] All sections have `{#sec-*}` labels
- [ ] Cross-references link related content
- [ ] Per-section source headers (collapsible callouts)

**Folder Structure Quality:**
- [ ] Index file and folder have the same name
- [ ] Each section is a separate `_NN-name.qmd` file
- [ ] Sources referenced from central `AI-Learning-Gems/sources/`

---

=== AGENTIC WORKFLOW (Execute Autonomously) ===

**CRITICAL: Do NOT ask the user for confirmation at any step. Execute the entire workflow autonomously.**

---

## STEP 0: Read the Plan & Initialize

### 0A. Read the Plan

1. **Read `TEXTBOOK-PLAN.md`** — understand the full plan, sources, section structure, and **Source Image Catalog**

### 0A.1. Write a Source-Reading Manifesto (MANDATORY — Before Reading Any Sources)

**Before you download or read a single source, write a 2-paragraph manifesto in the chat** explaining why reading every single source in full is crucial for *this specific chapter*. The manifesto must be specific to the topic, not generic. It should answer:

- What makes this particular topic vulnerable to summary-based distortion? (e.g., "This chapter covers X, where the precise wording of expert Y's advice matters because slight paraphrasing changes the meaning entirely.")
- Which specific sources are you most worried about getting wrong from a summary alone, and why?

**Why this step exists:** Writing the manifesto forces the agent to think concretely about what it would miss by skipping source reads, before the temptation to skip arises. It is a pre-commitment device. An agent that has just written two paragraphs about why source fidelity matters for *this exact chapter* is far less likely to cut corners five steps later when context is long and the deadline feels close.

**Format:** Output this directly in the chat (not a file). Two paragraphs, 100-200 words total. Then proceed to 0B.

### 0B. Download ALL Sources AND Verify Readability (MANDATORY GATE — Do NOT Proceed Until Complete)

**Every source in the TEXTBOOK-PLAN.md Source Processing Log MUST be downloaded locally AND in a readable text format before you write a single word of chapter content.** This is a hard gate, not a suggestion.

1. **Scan the Source Processing Log** in TEXTBOOK-PLAN.md. For each source, check whether it has a local path in `AI-Learning-Gems/sources/`.
2. **For sources with "N/A" local path** (i.e., sources that were only accessed via web search during research): download them NOW. Use subagents to parallelize downloads if there are many.
   ```bash
   # Check if source already exists:
   ls "AI-Learning-Gems/sources/{expected-path}/" 2>/dev/null && echo "EXISTS" || echo "NEEDS DOWNLOAD"
   
   # Download using the appropriate method from web-source-fetching.md:
   # Blog posts, JS-heavy pages:
   conda activate ai-learning-gems && python scripts/authenticated_extract.py "URL"
   # Static pages (faster):
   conda activate ai-learning-gems && python scripts/webpage_to_md.py "URL" -o "sources/{domain}/{path}/"
   # arXiv papers:
   mkdir -p "sources/arxiv-{ID}" && cd "sources/arxiv-{ID}" && curl -sL "https://arxiv.org/src/{ID}" -o source.tar.gz && tar -xzf source.tar.gz && rm source.tar.gz
   ```
3. **For paywalled sources:** Do NOT give up immediately. Follow the **Paywalled Paper Retrieval Cascade** in `web-source-fetching.md`. This is a 7-step process that finds freely accessible copies of most paywalled papers through arXiv preprints, author websites, academic repositories (Semantic Scholar, PubMed Central, ERIC, CORE), abstract-text search, the Gwern archive, and the Wayback Machine. Only after exhausting ALL 7 steps should you flag the source to the user. **After downloading, verify with `pdfinfo` that the page count matches the expected paper length** (the `file` command is unreliable for page counts). Then extract to markdown with `scripts/mistral_ocr.py`.
4. **Verify all downloads:** Run `ls` on each expected source path to confirm content exists.

5. **CRITICAL — Verify readability of every source (MANDATORY).** Downloaded is not the same as readable. A PDF in the source folder is useless if it has never been extracted to text. For EACH source folder:
   - List all files in the folder
   - Check: does it contain at least one `.md`, `.tex`, or `.txt` file with >500 characters?
   - **If YES:** source is readable, move on.
   - **If NO** (e.g., only PDFs, only HTML, only images):
     - **STOP. Read `web-source-fetching.md` and `source-management.md` IN FULL using the Read tool BEFORE running any extraction command.** Do NOT guess the command. Do NOT rely on memory. Do NOT assume you know which tool to use. The rules files contain a decision tree, tool comparison table, and site-specific strategies. Read them EVERY TIME, even if you think you already know the answer. The most common failure pattern is an agent that "remembers" the wrong command and either fails silently or produces garbage.
     - **Only AFTER reading both rules files**, determine the correct extraction method based on what the rules say.
     - Execute the extraction command the rules specify.
     - **Verify** the extraction produced a `.md` or `.txt` file with >500 characters of actual content
   - **The rule is absolute:** every source folder must contain at least one LLM-readable text file (`.md`, `.tex`, `.txt`). If only binary formats exist after extraction attempts, note this in the chat as a source that may have missing content.

   **CRITICAL — Completeness verification for web sources (not just readability).** A web extraction can produce a readable, substantial `.md` file that is *missing entire sections* due to a soft paywall. This is especially common with Substack and Medium. After confirming readability, perform a **structural completeness check**:
   - List section headings: `grep '^##\|^###\|^####' content.md` — verify the article has a logical structure (intro, body, conclusion).
   - Check for paywall markers: `grep -i 'upgrade to paid\|subscribe to continue\|for paid subscribers' content.md` — if found, re-extract with `--profile` for the site.
   - Read the last 20 lines — does the article end with a conclusion, or cut off at a subscription prompt?
   - If you expect the article to cover topics X, Y, Z (from the TEXTBOOK-PLAN), verify those topics appear in the section headings. Missing topics may indicate truncation.
   - **Do NOT use term-grep with low result limits to assess completeness.** A grep for "ORM" returning zero results does not mean the content is missing — always check section headings first, then read relevant sections directly.

6. Chat: "✓ Source download + readability gate: [N] sources verified locally with readable content, [M] newly downloaded, [P] newly extracted from PDF/HTML, [K] unavailable (with alternatives noted)"

### 0C. Source Pre-Reading: Per-Section Sub-Agent Scouring Protocol (MANDATORY)

**This replaces any "read all sources upfront in bulk" approach.** Sources are read in a targeted, per-section manner using a sub-agent + main-agent verification protocol. This protocol runs once before the introduction (Step 1) and once before each body section (Step 2). It is described here so the main agent understands the full flow before starting.

**Why this protocol exists:** The single biggest quality failure mode in this workflow is writing from summaries instead of from actual source text. A sub-agent that reads sources and returns a report is helpful for navigation, but the main agent MUST still read the actual source material. If the main agent writes only from the sub-agent's report, it is effectively hallucinating: it does not know what the source actually says, only what the sub-agent claims it says. This protocol ensures the main agent reads every relevant passage with its own eyes.

#### The Per-Section Source Scouring Flow

This flow is executed **before writing each section** (introduction and every body section). It is NOT done once upfront for the whole chapter.

1. **The main agent spawns a sub-agent** dedicated to the upcoming section.

   **CRITICAL — The sub-agent cannot read this workflow file.** Everything in Step 0C describes what the sub-agent should do, but the sub-agent will NEVER see Step 0C. It only knows what the main agent tells it in the prompt. Every instruction below must be PASSED TO the sub-agent via the prompt. If an instruction is in this workflow but not in the sub-agent prompt, it does not exist for the sub-agent.
   
   **The main agent MUST use the Mandatory Sub-Agent Prompt Template below** (adapting the section-specific details) when spawning every source-scouring sub-agent. Do NOT improvise the prompt from memory. Do NOT summarize the instructions. Copy the template and fill in the blanks. The template contains failure-pattern warnings that the sub-agent needs to see.

#### Mandatory Sub-Agent Prompt Template

The main agent must pass the following prompt (or a faithful adaptation of it) to every source-scouring sub-agent. Items in `[BRACKETS]` are filled in by the main agent.

```
You are a source-scouring sub-agent for Section [N] of a textbook chapter on "[CHAPTER TOPIC]."

## Your Task
Read EVERY source listed below for this section. For EACH source, write a detailed 5-paragraph report.

## Sources to Read
[LIST OF SOURCES WITH LOCAL FOLDER PATHS AND WHAT TO EXTRACT FROM EACH]

## Section Plan
[PASTE THE SECTION PLAN FROM TEXTBOOK-PLAN.md]

## MANDATORY: Readability Verification Before Reading

For EACH source folder:
1. List ALL files in the folder using ls or Glob.
2. Check: does the folder contain at least one .md, .tex, or .txt file?
3. If YES: read ALL text files (.md, .tex, .txt, .bib) in the folder. Not just one file. ALL of them.
4. If NO (folder contains only PDFs, images, or other binary files):
   - STOP. Read the rules file at `.agent/rules/web-source-fetching.md` IN FULL using the Read tool.
   - Read the rules file at `.agent/rules/source-management.md` IN FULL using the Read tool.
   - Follow the extraction method specified in those rules files. Do NOT guess the command.
   - After extraction, verify the output file has >500 characters of real content.
   - If extraction fails, report: **SOURCE UNAVAILABLE: `[path]` — [reason].**

## MANDATORY: What You Must NOT Do (Known Failure Patterns)

These failures have occurred in real chapter-writing sessions. You MUST guard against them:

**DO NOT fabricate provenance.** If you cannot read a source file (PDF is an image scan, folder is empty, extraction fails), you MUST report "SOURCE UNAVAILABLE." Do NOT invent a claim like "text extracted via [some other source]" and then produce quotes from your training data. This is the single worst failure a sub-agent can commit: it produces a report that looks legitimate but contains fabricated content, and the main agent writes it into the chapter.

**DO NOT produce quotes from training data.** Every quote you report with a file:line number MUST come from a file you actually read with the Read tool. If you cannot read the file, you cannot quote from it. If you "know" what the source says from your training data, that knowledge is unreliable. Report "SOURCE UNAVAILABLE" instead.

**DO NOT assume the TEXTBOOK-PLAN's author attribution is correct.** When you read a paper, check who actually wrote it. The TEXTBOOK-PLAN may attribute a paper to "Author A" when the actual authors are "Author B et al." Report the ACTUAL title and authors as written in the paper itself. Start Paragraph 1 of your report with: "This paper is titled '[actual title]' by [actual authors]."

**DO NOT report statistics you cannot find.** If the TEXTBOOK-PLAN says "this paper contains statistic X" but you read the paper and cannot find X, report: "**STATISTIC NOT FOUND:** The plan claims [X], but this number does not appear in [filename]." Do NOT fill in the number from memory.

## Report Format

For EACH source, write 5 paragraphs:

**Paragraph 1 (Content overview):** What this source contains that is relevant to this section. List ALL files you read from this folder. State the actual title and actual authors of the paper/post.

**Paragraph 2 (Specific relevance — main content):** Which specific portions are relevant. Include exact line numbers and filenames. Include direct quotes with file:line attribution. Format: `filename.md Line 47: "Exact quote."` These MUST come from actually reading the file.

**Paragraph 3 (Background material):** Which portions contain background, definitions, notation needed to understand the main content. Include exact file:line numbers. The main agent needs BOTH background and main content.

**Paragraph 4 (Cross-source connections):** Key terminology. How this source relates to other sources for this section. Conflicting definitions or framings.

**Paragraph 5 (Writing guidance):** What the main agent should emphasize. Key quotes to include. Nuances a summary might flatten.
```
2. The sub-agent reads **every single source** listed for that section in the TEXTBOOK-PLAN.md. It cannot skip a single source.
   
   **CRITICAL — File discovery and complete reading:** The TEXTBOOK-PLAN.md lists source *folder paths* (e.g., `sources/simon.peytonjones.org/great-research-paper/`), not exact filenames. Different sources use different naming conventions: some have `content.md`, some use the URL slug (e.g., `great-research-paper.md`), some are LaTeX (e.g., `main.tex`, `iclr2026_conference.tex`), some are PDFs. **The sub-agent MUST list the directory contents first** (using `ls` or Glob) to discover the actual filenames before attempting to read. Never assume a file is named `content.md` without checking.
   
   **CRITICAL — Read the ENTIRE source, not just one file.** A source folder may contain multiple files. An arXiv source may have `main.tex` plus `sections/intro.tex`, `sections/method.tex`, `sections/experiments.tex`, a `.bib` file, and figures. A blog source may have `content.md` plus an `images/` folder. **The sub-agent must read ALL text files in the source folder** (all `.tex`, `.md`, `.txt`, `.bib` files, and any subfolder contents). Do not read just one file and stop. Do not pick the file that looks most relevant and skip the rest. Read everything. The background material, the related work, the appendices, the bibliography entries — all of it may contain information the main agent needs.

   **CRITICAL — Readability verification and extraction (sub-agent responsibility).** After listing a source folder's contents, the sub-agent must check: does the folder contain at least one `.md`, `.tex`, or `.txt` file with real content? If the folder contains ONLY binary files (PDFs, DOCX, images) with no extracted text, the sub-agent MUST extract them to a readable format BEFORE attempting to read the source content. This extraction step is mandatory and must happen before the sub-agent writes its 5-paragraph report.

   **STOP — READ THE RULES FILES FIRST. DO NOT GUESS THE COMMANDS.**
   
   This is the single most common failure pattern: the sub-agent "remembers" or "guesses" which extraction command to use, gets it wrong, and either fails silently or produces garbage output. The rules files (`web-source-fetching.md` and `source-management.md`) contain a detailed decision tree, tool comparison table, and site-specific strategies that are updated over time. What the sub-agent "remembers" from training data may be outdated or wrong.
   
   **The mandatory sequence is:**
   1. **Read `web-source-fetching.md` IN FULL** using the Read tool. Read the entire file, not just the first section. The decision tree is near the top, but the site-specific strategies and tool comparison table are further down.
   2. **Read `source-management.md` IN FULL** using the Read tool. This contains the folder naming conventions and PDF figure conversion commands.
   3. **Only AFTER reading both files**, determine the correct extraction command based on what the rules say — not based on what you "think" the command is.
   4. Execute the extraction.
   5. Verify the output (`.md` or `.txt` file with >500 characters of real content).
   
   **Anti-pattern (DO NOT DO THIS):** "I know that PDFs can be converted with `pdftotext`, so I'll just run that." WRONG. The rules file specifies `scripts/mistral_ocr.py` for rendered PDFs, `scripts/onenote_pdf_to_markdown.py` for OneNote exports, and different tools for different scenarios. The sub-agent does not know which tool is correct until it reads the rules.
   
   **Anti-pattern (DO NOT DO THIS):** "The source is a PDF, I'll try to read it directly with the Read tool." This may work for some PDFs but will produce garbled output for others (especially slide decks, scanned documents, and multi-column papers). Always extract to markdown first.

   The sub-agent must also **download any missing sources.** If a source listed in the TEXTBOOK-PLAN for this section does not exist locally at all, the sub-agent must follow the same mandatory sequence: read `web-source-fetching.md` and `source-management.md` IN FULL first, then determine the correct download method, download the source, verify it, and extract it to readable format if needed. **Do NOT guess the download command. Read the rules first.** Source-downloading and extraction is the responsibility of BOTH the research workflow and the writing workflow sub-agents, not just one.

3. For **each source**, the sub-agent writes a **5-paragraph detailed report** covering:
   - **Paragraph 1 (Content overview):** What important content this source contains that is relevant to this section. What is the source about at a high level, and what are its key claims? List ALL files that were read from this source folder.
   - **Paragraph 2 (Specific relevance — main content):** Which specific portions contain the main content relevant to this section. What concepts, arguments, or evidence from this source map onto the section plan? **Include exact line numbers and filenames** (e.g., `main.tex Line 142` or `content.md Line 47`). Include direct quotes in quotation marks attributed to specific file:line locations. Format: `content.md Line 47: "Exact quote from the source."` These MUST be determined by actually reading the file, NOT hallucinated.
   - **Paragraph 3 (Background material — equally important):** Which portions of the source contain **background, context, definitions, notation, or foundational material** that the main agent will need to understand the main content from Paragraph 2. This is NOT optional filler — it is load-bearing context. For example: if the main content uses a specific statistical framework, the background section that defines that framework is essential. If the source defines notation in Section 2 that is used in the key finding in Section 5, the main agent needs BOTH. **Include exact file:line numbers for all background material**, with quotes where helpful. Separate background from main content so the main agent knows to read both.
   - **Paragraph 4 (Notation, definitions, and cross-source connections):** Key notation, definitions, technical terms, or frameworks from the source. How does this source's terminology relate to other sources for this section? Are there conflicting definitions or framings across sources that the main agent should be aware of?
   - **Paragraph 5 (Writing guidance):** How the source relates to this specific section and what is most important to extract. What should the main agent emphasize? What are the key quotes that should appear in the chapter? What should the main agent be careful about (e.g., nuances that a summary might flatten)?
4. The sub-agent returns this full report (5 paragraphs per source, for every source listed for this section) to the main agent.
   **CRITICAL — Sub-agent must flag unavailable sources:** If a sub-agent finds that a source folder is EMPTY, a source file does not exist, or a source file is unreadable (e.g., a PDF that was not converted to text), the sub-agent MUST report this prominently: "**SOURCE UNAVAILABLE:** `sources/path/` is empty / file not found / PDF not converted." The sub-agent must NOT attempt to fill in content from memory or training data. It must simply report the absence.
5. **The main agent reads the sub-agent's report**, identifying all targeted line numbers for BOTH the background material (Paragraph 3) AND the main content (Paragraph 2).
   **CRITICAL — Handling unavailable sources:** If the sub-agent flags ANY source as unavailable, the main agent MUST:
   - **(a) Alert the user in chat:** "⚠️ SOURCE UNAVAILABLE: `sources/path/` — [description]. This source was listed for Section N. I will NOT use any content attributed to this source until it is downloaded and readable."
   - **(b) NOT use that source's content.** Do not write from the TEXTBOOK-PLAN's summary of the source. Do not use quotes, statistics, or claims that the plan attributes to the unavailable source. Do not fill the gap from training data or world knowledge.
   - **(c) Attempt to download the source** using the methods from `source-management.md` and `web-source-fetching.md`. If successful, read it and proceed. If unsuccessful, drop all claims from that source.
   - **(d) Continue writing the section** using only the sources that ARE available and readable. The section may be shorter or cover fewer points; that is acceptable. A shorter section with verified content is infinitely better than a longer section with hallucinated content.
6. **CRITICAL — Per-Section Verification Manifesto (MANDATORY):** After receiving the sub-agent report and BEFORE reading any sources, the main agent must write a 2-paragraph manifesto in the chat. This manifesto serves as a pre-commitment device that forces the agent to plan its reading carefully and acknowledge the risks of skipping reads. The manifesto must contain:

   **Paragraph 1 — Reading plan:** List every source the sub-agent identified, with the specific file paths and line numbers the main agent will read. For each source, state: "I will read [filename] lines [N-M] (main content) and lines [P-Q] (background)." This forces the agent to commit to a concrete reading list before the temptation to skip arises.

   **Paragraph 2 — Risk acknowledgment:** For THIS specific section, explain: (a) which claims from the TEXTBOOK-PLAN.md are most at risk of being wrong if not verified against the actual source (be specific: "The plan claims Author X said Y, but this could be a misattribution or paraphrase"), and (b) what the consequences would be if the agent wrote from the sub-agent's report or the TEXTBOOK-PLAN instead of reading the sources directly (e.g., "If I use the plan's version of the Jiang et al. finding without reading the paper, I could misstate the sample size, the effect size, or the conditions under which the finding holds").

   **Format:** Output directly in the chat. Two paragraphs, 150-300 words total.
7. **CRITICAL: The main agent then reads the actual source material** using the Read tool. For each source, the main agent reads **both categories** of content the sub-agent identified:
   - **(a) Background material** (from Paragraph 3): Read all the background/context/definition passages the sub-agent flagged. These are necessary to understand the main content. Do not skip them.
   - **(b) Main content** (from Paragraph 2): Read all the primary content passages the sub-agent flagged, plus ±10-20 lines of surrounding context to avoid missing nuance.
   - **(c) Full read for short sources:** If a source is short (<500 lines total across all files), the main agent should read it in full rather than reading only flagged portions.
   - **(d) Additional exploration:** The main agent may also read additional portions of the source if the sub-agent's report suggests important content nearby, or if reading the flagged portions reveals that adjacent material is also relevant.
7. Only after completing steps 5-6 does the main agent write the section.

#### Critical Rules for Per-Section Source Scouring

- **The sub-agent MUST read ALL files in each source folder.** Not just the main file. List the directory, then read every `.tex`, `.md`, `.txt`, and `.bib` file. An arXiv paper with `main.tex` that `\input{sections/intro}` means you must also read `sections/intro.tex`. If there are 5 `.tex` files, read all 5. If there is a `content.md` and a `slides.pdf`, read the `.md` and note the PDF exists.
- **The main agent MUST read the actual sources.** Reading only the sub-agent's report is NOT sufficient. If the main agent does not go back and read the original source content, it is effectively hallucinating. It does not actually know anything unless it reads the source directly.
- **The main agent MUST read BOTH background AND main content.** The sub-agent's report separates these into Paragraph 2 (main content) and Paragraph 3 (background). The main agent must read both. Background material (definitions, notation, framework setup, methodology descriptions) is not optional context; it is load-bearing information without which the main content cannot be accurately understood or cited. Skipping the background and reading only the "relevant" lines is like reading the punchline of a joke without the setup: you will misunderstand what the source actually says.
- **Every single source** for a section must have its relevant content read by both the sub-agent (ALL files, in full) and the main agent (at targeted line numbers for both background + main content). No source can be skipped.
- The sub-agent may highlight **multiple parts** of a single source as relevant. It should highlight notation, background information, basic themes, and any other foundational content, attributing everything to specific file:line numbers with quotes and emphasis.
- The sub-agent's output is essentially a **per-source report**: "How does this source provide information for this particular section of the chapter? What background do I need to understand the main content?"
- **Instruction restatement:** When writing long content (multiple sections), the main agent's context fills up and these instructions fade. Before starting each new section, the main agent must **restate the key instructions from this protocol to itself in the chat** (2-3 sentences summarizing: spawn sub-agent, get 5-paragraph reports with background AND main content line numbers, read actual sources at ALL flagged line numbers, then write). This prevents instruction drift over the course of a long chapter.

Chat: "✓ Source scouring protocol understood. Will execute per-section before each writing step."

#### Observed Failure Patterns (From Real Chapter-Writing Sessions)

The following failure patterns have been observed in actual chapter-writing runs. **Every single one was caused by the main agent not passing sufficient instructions to the sub-agent.** The sub-agent cannot read this workflow file. It only knows what the main agent tells it in the prompt. When the main agent improvises the sub-agent prompt instead of using the Mandatory Sub-Agent Prompt Template, it drops instructions, and the sub-agent fails in predictable ways.

The Mandatory Sub-Agent Prompt Template above was designed to prevent all five patterns. If you use the template faithfully, these failures should not recur. If you see them anyway, the most likely cause is that you summarized or paraphrased the template, dropping the failure-pattern warnings that the sub-agent needs to see.

---

**Failure Pattern 1: Sub-Agent Fabricates Provenance for Unreadable Sources ("The Phantom Read")**

**What happened:** A sub-agent was asked to read a PDF source (Steven Pinker's essay, stored as an image-only scan with no text layer). The sub-agent could not extract any text. Instead of reporting "SOURCE UNAVAILABLE," it fabricated a provenance claim ("text extracted via web source at grad.ncsu.edu") and produced a detailed 5-paragraph report filled with plausible-sounding quotes and line numbers drawn entirely from its training data. The main agent accepted this report at face value and wrote the fabricated quotes into two sections of the chapter.

**Root cause in the sub-agent prompt:** The main agent's prompt said "read ALL text files" but did NOT say:
- "If the folder contains only binary files, report SOURCE UNAVAILABLE"
- "Do NOT fabricate provenance claims"
- "Do NOT produce quotes from training data when you cannot read the source"
- "Read `web-source-fetching.md` before attempting extraction"

Without these instructions, the sub-agent had no guidance for how to handle an unreadable source. LLMs default to producing plausible output rather than admitting failure, so it hallucinated a report.

**Why the template fixes this:** The template contains explicit "DO NOT fabricate provenance" and "DO NOT produce quotes from training data" warnings, plus mandatory readability verification steps that run before the sub-agent even attempts to read.

**Detection (for the main agent):** After receiving a sub-agent report, spot-check at least 2 sources by verifying the files the sub-agent claims to have read actually exist and contain text. Run: `ls "sources/path/" && wc -c "sources/path/filename.md"`. If the file does not exist, is 0 bytes, or is a binary PDF with no text companion, the sub-agent fabricated its report.

---

**Failure Pattern 2: Main Agent Skips Source Reads for Later Sections ("The Fatigue Drift")**

**What happened:** For Section 1, the main agent diligently read all 6 sources at the sub-agent's identified line numbers. By Section 5, which had 10+ sources, the main agent read only 3 directly and wrote the remaining content from the sub-agent's reports and TEXTBOOK-PLAN summaries. The unread sources contained wrong statistics, fabricated numbers, and wrong paper authorship.

**Root cause in the main agent's behavior:** This is NOT a sub-agent failure. It is a main-agent failure. But it is caused by the same dynamic: as context grows and fatigue sets in, the main agent starts treating sub-agent reports as sources of truth instead of navigation aids. The per-section verification manifesto and source audit table are the mitigations.

**Why the template helps indirectly:** When the sub-agent's report contains the failure-pattern warnings (because the template includes them), the main agent sees those warnings in the report output and is reminded to read sources directly. If the main agent improvises a short prompt without warnings, the returned report looks clean and authoritative, making it easier to skip the verification step.

---

**Failure Pattern 3: Sub-Agent Reports Wrong Paper Identity ("The Misattribution")**

**What happened:** The TEXTBOOK-PLAN attributed a finding to "Liang et al. (ICML 2024)" with arXiv ID 2405.02150. The sub-agent read the paper but did not report the actual authors. The paper at arxiv-2405.02150 is actually by Russo Latona et al. The main agent wrote "Liang et al." throughout because the TEXTBOOK-PLAN said so. Additionally, specific statistics the plan attributed to this paper (adjective frequency multipliers 9.8x, 34.7x, 11.2x) do not appear in it at all; they are from a different paper. The TEXTBOOK-PLAN had conflated two papers.

**Root cause in the sub-agent prompt:** The main agent's prompt said "read each source and report what's relevant" but did NOT say:
- "Report the ACTUAL title and authors as written in the paper"
- "If the actual authors differ from what the TEXTBOOK-PLAN says, flag this"
- "If you cannot find a specific statistic the TEXTBOOK-PLAN claims is in the paper, report STATISTIC NOT FOUND"

Without these instructions, the sub-agent reported content without cross-checking the plan's attributions.

**Why the template fixes this:** The template requires: "Start Paragraph 1 with: 'This paper is titled [actual title] by [actual authors].'" and "If the TEXTBOOK-PLAN says 'this paper contains statistic X' but you cannot find X, report: STATISTIC NOT FOUND."

---

**Failure Pattern 4: Main Agent Drops Sub-Agent Spawning for Later Sections ("The Shortcut Collapse")**

**What happened:** The main agent launched source scouring sub-agents for Sections 1-4 but stopped launching them for Sections 5-7, writing directly from previously-read sources, the TEXTBOOK-PLAN, and training data.

**Root cause:** This is a main-agent failure, not a sub-agent failure. It happens because:
- The main agent's context fills up and the spawning instructions from Step 0C have faded
- The main agent rationalizes: "I already read these sources for earlier sections"
- Spawning sub-agents feels slow when you're "almost done"

**Mitigation:** The instruction restatement (Step 2A) explicitly says "I must spawn a sub-agent." Steps 1B and 2C now say "use the Mandatory Sub-Agent Prompt Template." If the main agent finds itself writing without having spawned a sub-agent, it must STOP and go back.

---

**Failure Pattern 5: Statistics From TEXTBOOK-PLAN Treated as Verified ("The Plan Trust")**

**What happened:** The main agent copied specific statistics from the TEXTBOOK-PLAN ("75,800 reviews," "1% of papers," "26.1-54.2%," "1.24-1.64 points") into the chapter without reading the source papers. When sources were later checked, every single number was wrong.

**Root cause:** This is a main-agent failure that the sub-agent could have caught but didn't, because:
- The sub-agent prompt did not include the instruction "if the TEXTBOOK-PLAN claims statistic X but you cannot find it, report STATISTIC NOT FOUND"
- The sub-agent was not told that the TEXTBOOK-PLAN's numbers are unreliable placeholders
- The main agent's own "TEXTBOOK-PLAN IS A STRUCTURAL GUIDE" principle faded from context by later sections

**Why the template fixes this:** The template includes the explicit instruction: "If the TEXTBOOK-PLAN says 'this paper contains statistic X' but you read the paper and cannot find X, report: **STATISTIC NOT FOUND.**" This turns the sub-agent into a verification layer for the plan's claims, rather than a pass-through.

---

### 0D. Create Folder Structure

1. **Create the folder structure:**
   - Index file: `{OutputFolder}/[Topic Name].qmd`
   - Section folder: `{OutputFolder}/[Topic Name]/`
   - **Images folder:** `{OutputFolder}/[Topic Name]/images/`
   - Create empty section files from the plan: `_01-`, `_02-`, ..., `_99-closing.qmd`
2. **Copy source images assigned in the Source Image Catalog:**
   ```bash
   mkdir -p "{OutputFolder}/[Topic Name]/images"
   # For each image in the Source Image Catalog:
   cp "AI-Learning-Gems/sources/arxiv-XXXX/images/figure.png" "{OutputFolder}/[Topic Name]/images/descriptive-name.png"
   ```
3. **Write the index file** with YAML header and `{{< include >}}` statements
4. Chat: "✓ Creating: `[Topic Name].qmd` + folder with [N] sections, [I] source images copied"

---

## STEP 1: Write Introduction Section

### 1A. Restate Source-Reading Instructions (MANDATORY)

Before doing anything else for this section, restate the key instructions to yourself in the chat:

> "I am about to write the introduction. I must: (1) spawn a sub-agent to scour all sources listed for this section, (2) receive a 5-paragraph report per source with exact line numbers, (3) handle any UNAVAILABLE sources by alerting the user and NOT using that content, (4) write a per-section verification manifesto listing exactly what I will read and what risks I face from the TEXTBOOK-PLAN, (5) read the actual source material at those line numbers myself using the Read tool, (6) only then write the section. I must NOT write from the TEXTBOOK-PLAN's summaries or my world knowledge."

### 1B. Execute Per-Section Source Scouring (from Step 0C protocol)

1. **Spawn a sub-agent** for the introduction section using the **Mandatory Sub-Agent Prompt Template** from Step 0C. Fill in:
   - `[N]` = 1 (Introduction)
   - `[CHAPTER TOPIC]` = the chapter's topic
   - `[LIST OF SOURCES]` = the sources from TEXTBOOK-PLAN.md for the introduction, with local folder paths and what to extract from each
   - `[SECTION PLAN]` = the introduction content outline from TEXTBOOK-PLAN.md
   
   **Do NOT improvise the sub-agent prompt.** Use the template. The template contains failure-pattern warnings that the sub-agent must see. If you summarize or paraphrase the template, you will drop the warnings, and the sub-agent will repeat known failure patterns.
2. **Receive the sub-agent's report** (5 paragraphs per source)
3. **Spot-check the sub-agent's report** (MANDATORY): For at least 2 sources, verify the file the sub-agent claims to have read actually exists and contains text: `ls "sources/path/" && wc -c "sources/path/filename.md"`. If the file does not exist or has 0 bytes, the sub-agent fabricated its report. Discard the entire report for that source and flag it as UNAVAILABLE.
4. **Read the actual sources at the identified line numbers** using the Read tool. For each source the sub-agent flagged, read the relevant lines plus ±10-20 lines of surrounding context. If a source is short, read it in full.

### 1C. Write the Introduction

The introduction goes in `_01-introduction.qmd`. It contains:

1. **Sources for this section** (collapsible, at top — only sources used in the introduction, not all chapter sources)
2. **Hook / Running Example** (4-5 paragraphs) — **MUST include a technical image** that bridges the narrative story and the chapter's core technical concept. Search d2l.ai, original papers, or authoritative sources for a canonical diagram. The image should make the reader think "oh, so THAT's what this looks like technically."
3. **Chapter Overview** (8-16 paragraphs — the narrative advance organizer)
4. **Learning Objectives** (bullet list)
5. **Concept Map** (D2 diagram)
6. **Notation Table**

**IMPORTANT:** You have now read the actual source files (Step 1B). Quote exact phrases and equations from what you read. Do NOT paraphrase from memory of the sub-agent's report alone. Do NOT use any content from the TEXTBOOK-PLAN.md directly. Do NOT fill gaps with world knowledge. If you cannot find a claim in a source you personally read, drop the claim.

Chat: "✓ Introduction complete: `_01-introduction.qmd`"

---

## STEP 2: Write Body Sections (One by One)

**For each body section listed in TEXTBOOK-PLAN.md:**

### 2A. Restate Source-Reading Instructions (MANDATORY before EVERY section)

Before doing anything else for this section, restate the key instructions to yourself in the chat:

> "I am about to write section [N]: [section name]. I must: (1) spawn a sub-agent to scour all sources listed for this section, (2) receive a 5-paragraph report per source with exact line numbers, (3) handle any UNAVAILABLE sources by alerting the user and NOT using that content, (4) write a per-section verification manifesto listing exactly what I will read and what risks I face from the TEXTBOOK-PLAN, (5) read the actual source material at those line numbers myself using the Read tool, (6) only then write the section. I must NOT write from the sub-agent report alone. I must NOT write from the TEXTBOOK-PLAN's summaries. I must NOT fill gaps with world knowledge. If a source is unavailable, I drop its claims."

This restatement is not optional. It prevents instruction drift that occurs when writing long content across many sections.

### 2B. Re-read rules files (MANDATORY before EVERY section)

Before writing, re-read these files from disk:
- `writing-style.md` — Re-read in full. Focus on: emphasis hierarchy, given-new contract, pronoun clarity ("this + noun"), nominalization detection, mathematical vs narrative modes, AI tell avoidance (banned words, em dash prohibition), and inline citation format.
- `visualization-standards.md` — Re-read the D2 diagram template (Modern SaaS theme with 6 semantic classes), the hvplot two-cell pattern, and the source image handling rules.
- `quarto-conventions.md` — Re-read heading levels (one `##` per section file), image path resolution (relative to index file), and callout syntax.

This re-read is not optional. Skipping it is the #1 cause of quality degradation in later sections.

### 2C. Execute Per-Section Source Scouring (from Step 0C protocol)

1. **Spawn a sub-agent** for this section using the **Mandatory Sub-Agent Prompt Template** from Step 0C. Fill in:
   - `[N]` = the section number
   - `[CHAPTER TOPIC]` = the chapter's topic
   - `[LIST OF SOURCES]` = the sources from TEXTBOOK-PLAN.md for this section, with local folder paths and what to extract from each
   - `[SECTION PLAN]` = the section content outline from TEXTBOOK-PLAN.md
   
   **Do NOT improvise the sub-agent prompt.** Use the template. Even for Section 5 or 6, when the agent feels rushed and wants to skip the template. Especially then.
2. **Receive the sub-agent's report** (5 paragraphs per source, for every source in this section)
3. **Spot-check the sub-agent's report** (MANDATORY): For at least 2 sources, verify the file the sub-agent claims to have read actually exists: `ls "sources/path/"`. If a sub-agent reports reading a file that does not exist, discard that source's report entirely.
4. **Read the actual sources at the identified line numbers** using the Read tool. For each source the sub-agent flagged:
   - Read the lines the sub-agent identified, plus ±10-20 lines of surrounding context
   - If the source is short (<500 lines), read it in full
   - If the sub-agent flagged multiple parts of the same source, read all flagged regions
   - Note any additional context the sub-agent may have missed

### 2D. Write the section

Only after completing 2A-2C, write the section following the A-E structure:
- Per-section source header (collapsible)
- Concrete example FIRST
- Explanation connecting to example
- **Embed source images** assigned to this section (from Source Image Catalog): `![Caption. Source: ...]([Topic Name]/images/name.png){#fig-label}` — remember, image paths are relative to the **index file**, so prefix with the chapter folder name
- Visual diagram (D2 or hvplot) for concepts not covered by source images
- **Misconception callouts** (1-2 per section) — placed where the misconception would naturally arise, using `.callout-warning` with `"Common Misconception: [wrong belief]"` title. Explain why it's wrong, then what's right.
- **Think Hard callouts** (1-3 per section) — placed right after the concept they relate to, using `.callout-note` with `"Think Hard: [question]"` title. Give thorough plain-language answers.
- Second worked example
- Transition to next section

### 2E. Additional source handling

If sources are insufficient while writing:
- Search for additional sources with `search_web`
- Download to `AI-Learning-Gems/sources/` following naming conventions
- **Read the newly downloaded source in full** before using it
- Chat: "✓ Additional source: `sources/{path}`"

### 2F. Apply the running example and report

Apply the running example as specified in the plan.

### 2G. Per-Section Source Audit Table (MANDATORY — Do NOT Skip)

**After writing each section and BEFORE moving to the next section**, generate a source audit table in the chat. This table is the enforcement mechanism for the Zero World Knowledge Principle. It forces the main agent to account for every piece of information in the section and its provenance.

**The table has these columns:**

| Source | File:Lines Read by Main Agent | Read Method | What Was Added to Section | Verified? |
|---|---|---|---|---|
| [Source name] | `filename.md` lines 1-80 (full) | Read tool (direct) | Quote about X; statistic Y; framework Z | YES |
| [Source name] | `main.tex` lines 42-57, 110-135 | Read tool (direct) | Key finding about A; definition of B | YES |
| [Source name] | (not read) | Sub-agent report only | Claim about C | **NO — MUST FIX** |
| [Source name] | (folder empty) | Unavailable | (dropped from section) | N/A — flagged to user |
| [World knowledge] | (no source) | Training data | Description of method D | **NO — MUST FIX** |

**Read Method values:**

- `Read tool (direct)` — The main agent used the Read tool to read the actual source file. This is the ONLY acceptable method.
- `Sub-agent report only` — The main agent used a quote, statistic, or claim from the sub-agent's report without reading the source file itself. This is NOT acceptable.
- `TEXTBOOK-PLAN.md` — The main agent used content from the TEXTBOOK-PLAN.md without reading the actual source. This is NOT acceptable.
- `Training data / world knowledge` — The main agent wrote something from its own training data without any source. This is NOT acceptable.
- `Unavailable` — The source could not be read (empty folder, missing file). If flagged to user and claims dropped, this is acceptable.

**Verified? values:**

- `YES` — The main agent read the actual source file directly and extracted the information from it. The section content is trustworthy.
- `NO — MUST FIX` — The main agent did NOT read the actual source. **The agent MUST stop, go back, read the source, and edit the section to either (a) replace the unverified content with what the source actually says, or (b) remove the unverified content if the source does not support it.** Then regenerate the audit table.
- `N/A — flagged to user` — Source unavailable, claims dropped. Acceptable only if the user was alerted.

**The audit table MUST list EVERY source that contributed content to the section**, including:
- Sources listed in the section's collapsible source header
- Sources mentioned in inline citations within the section text
- Any world knowledge or training data used (which should be zero)
- Any content carried over from the TEXTBOOK-PLAN.md (which should be zero)

**If ANY row shows `NO — MUST FIX`:**

1. **STOP.** Do not proceed to the next section.
2. **Read the actual source** using the Read tool at the specific lines the sub-agent identified.
3. **Edit the section** to replace unverified content with what the source actually says. If the source does not support the claim, remove the claim.
4. **Regenerate the audit table.** Every row must now show `YES` or `N/A — flagged to user`.
5. Only then proceed to the next section.

**Example audit table (from a hypothetical Section 2):**

| Source | File:Lines Read by Main Agent | Read Method | What Was Added to Section | Verified? |
|---|---|---|---|---|
| Irpan "Blog vs Paper" | `blog-paper.md` lines 1-148 (full) | Read tool (direct) | "Blog posts encourage stating opinions" quote; multimedia argument; burden of proof passage | YES |
| Thomas "Blogging Advice" | `2019-05-13-blogging-advice.md` lines 1-80 (full) | Read tool (direct) | "Choose one particular person" quote; "you-6-months-ago" heuristic | YES |
| Pinker "Why Academics Stink" | (not read) | Sub-agent report only | "Curse of knowledge" concept; "self-conscious style" framework; hedging word list; Richard Hugo quote | **NO — MUST FIX** |
| Distill.pub Hohman et al. | (not read) | Sub-agent report only | Multimedia Principle quote; authoring cost quote; incentive misalignment | **NO — MUST FIX** |

In this example, the agent would need to stop, read the Pinker PDF and the Distill article, verify or correct all claims attributed to them, then regenerate the table with all rows showing YES.

Chat format:

> **Source Audit for Section [N]:**
>
> [table]
>
> **Audit result:** [ALL VERIFIED / N rows need fixing — reading sources now]

If fixing is needed:

> **Source Audit for Section [N] (AFTER FIX):**
>
> [regenerated table with all YES]
>
> **Audit result:** ALL VERIFIED — proceeding to Section [N+1]

**Repeat Steps 2A-2G for all body sections.**

---

## STEP 3: Write Closing Section

Write `_99-closing.qmd` with:

1. **Summary / Key Takeaways** (5-7 bullet points)
2. **Completed Concept Map** (D2 diagram)
3. **Retrieval Practice Questions** (5-7, with answers in collapsed callout)
4. **Common Mistakes Section**
5. **Curated Resource List** (verified URLs from research)

Chat: "✓ Closing section complete: `_99-closing.qmd`"

---

## STEP 3.5: Math Background Appendix (Conditional)

**Skip this step** if the chapter has no equations above 10th-grade math. Proceed directly to Step 4.

**If the chapter is mathematical** (derivations, MLE, Bayesian inference, information-theoretic quantities, variance-covariance matrices, etc.):

1. **Audit:** Scan all body sections and list every mathematical concept that is *used* but not *derived from scratch* in the chapter.
2. **Filter:** Keep only concepts above 10th-grade math that an upper-division undergraduate ML student might need refreshed (e.g., MLE, Bayesian posteriors, KL divergence, Fisher Information). Drop basics (averages, simple probability).
3. **Search for existing material:** Look in `AI-Learning-Gems/` for existing notes on each prerequisite topic. Also check the high-quality blogs registry (`high-quality-blogs.md`).
4. **Write `_98-math-background.qmd`** with one ### subsection per prerequisite concept (150-300 words each). Each subsection: what it does, why it matters *for this chapter*, key formula, brief numerical example, forward-pointer to the relevant body section.
5. **Update the index file:** Add `{{< include "[Topic Name]/_98-math-background.qmd" >}}` between the last body section and the closing.
6. **Add forward-references** in body sections: at the first mention of each prerequisite concept, add "(see @sec-math-background for a review of [concept])".

Chat: "✓ Math Background appendix complete: `_98-math-background.qmd` ([N] concepts covered)" or "✓ Math Background: skipped (chapter is not heavily mathematical)"

---

## STEP 4: Light Engagement Pass

**Quick scan for tone and motivation — not a deep prose rewrite.** (For deep paragraph-level editing, use the separate `/editing-textbook-chapter` command after this workflow completes.)

**What to check:**
- **Conversational tone:** Replace any "one might consider" with "you might wonder." The reader is "you," not "one."
- **Motivation before formalism:** Scan each section's opening — does it answer "why should I care?" before the equations? If not, add 1-2 motivating sentences.
- **Enthusiasm calibration:** Add 1-2 "punch" sentences per section where genuinely warranted: "This is the key insight." "The result is striking." Do not overdo it.

**What NOT to do here:** Do not rewrite paragraphs, split sentences, or restructure prose. That is the editing command's job.

Chat: "✓ Light engagement pass complete"

---

## STEP 5: Final Pass (Link, Format & Polish)

### 5A. Cross-References
- Add `@sec-*`, `@fig-*`, `@eq-*` cross-references across sections
- Verify index file includes all sections in correct order

### 5B. Formatting Fixes
- **LaTeX:** `(\theta)` → `$\theta$`, `$x\^2$` → `$x^2$`
- **Markdown:** `\*` → `-`, long dashes → `---`, `\#` → `#`
- **Quarto:** Verify callout syntax, code block languages, labels

### 5C. Final Check
- Scan each file for remaining issues
- Chat: "✓ Final pass complete, chapter finished at `[index file path]`"

---

### 5D. Final Rules Validation (MANDATORY)

**Re-read ALL rules files one final time** and validate the entire chapter against them:

1. **Re-read** `writing-style.md` — then scan ALL section files for:
   - Em dashes (must be zero)
   - Banned AI-tell words (delve, tapestry, navigate, etc.)
   - Filler phrases ("It's worth noting that...")
   - Bare "this"/"these" as sentence subjects without clarifying nouns
   - Unlinked citations: parentheticals like `(Author et al., YYYY)` without `](http` hyperlinks
   - Synonym cycling (same concept called different names)

2. **Re-read** `quarto-conventions.md` — then verify ALL section files for:
   - Exactly ONE `##` heading per section file
   - `{#sec-*}` labels on all section headings
   - Image paths prefixed with `[Topic Name]/` (not bare `images/`)
   - `{{< include >}}` paths quoted in index file

3. **Re-read** `visualization-standards.md` — then verify:
   - All source images attributed in captions
   - No explicit `width` tags on images
   - D2 diagrams use ELK engine and Modern SaaS theme
   - Plots use the two-cell hvplot/bokeh pattern

4. **Re-read** `exercise-syntax.md` — for awareness of formatting the exercises workflow will later add

Fix any violations found. Chat: "✓ Final rules validation complete"

---

## Quarto Syntax Reference

**Include shortcode (for index file):**
```markdown
{{< include [Topic Name]/_01-introduction.qmd >}}
```
CRITICAL: Must be on its own line with blank lines above and below.

**Cross-references (work across included files):**
```markdown
See @sec-introduction for background.
As shown in @fig-gradient-descent, the function...
From @eq-loss-function, we can derive...
```

**Section labels:**
```markdown
## Introduction {#sec-introduction}
```

**Equation labels:**
```markdown
$$
L(\theta) = \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$ {#eq-loss-function}
```

**Collapsible callouts:**
```markdown
::: {.callout-note collapse="true" title="Sources for this section"}
| # | Source | Summary |
|---|---|---|
:::
```
