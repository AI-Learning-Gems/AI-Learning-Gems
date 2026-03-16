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
| 1 | `writing-style.md` | Tone, sentence rhythm, emphasis hierarchy, given-new flow, pronoun clarity, AI tell avoidance, mathematical vs narrative modes, inline citations, vocabulary rules | Every paragraph you write |
| 2 | `quarto-conventions.md` | Folder structure, index file template, heading levels, LaTeX formatting, cross-references, callout syntax, image path resolution | File structure, every section file |
| 3 | `visualization-standards.md` | Image priority order, source image handling, D2 diagram template (Modern SaaS theme), hvplot/bokeh two-cell pattern | Every visualization |
| 4 | `source-management.md` | Centralized source paths, citation format, blog attribution | Source headers, citations |
| 5 | `high-quality-blogs.md` | Blog attribution rules | When using blog-sourced explanations |
| 6 | `exercise-syntax.md` | Exercise div syntax (not needed for writing, but useful to avoid conflicts) | If the chapter will later have exercises |
| 7 | `python-env.md` | Conda environment activation | Any terminal commands |

**Per-section re-read (MANDATORY):** Before writing each body section (Steps 2), re-read `writing-style.md` and `visualization-standards.md`. By the third or fourth section, the detailed rules (emphasis hierarchy, given-new contract, D2 theme classes) will have faded from context. The quality difference between "re-read rules, then write" and "write from memory" is stark.

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
3. **Update the section's source header** with the new source
4. **Continue writing** with the new material
5. Chat: "✓ Additional source downloaded: `sources/{path}` (needed for [reason])"

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

1. **Read `TEXTBOOK-PLAN.md`** — understand the full plan, sources, section structure, and **Source Image Catalog**
2. **Read key downloaded sources** — `view_file` on the most important sources listed in the plan
3. **Create the folder structure:**
   - Index file: `{OutputFolder}/[Topic Name].qmd`
   - Section folder: `{OutputFolder}/[Topic Name]/`
   - **Images folder:** `{OutputFolder}/[Topic Name]/images/`
   - Create empty section files from the plan: `_01-`, `_02-`, ..., `_99-closing.qmd`
4. **Copy source images assigned in the Source Image Catalog:**
   ```bash
   mkdir -p "{OutputFolder}/[Topic Name]/images"
   # For each image in the Source Image Catalog:
   cp "AI-Learning-Gems/sources/arxiv-XXXX/images/figure.png" "{OutputFolder}/[Topic Name]/images/descriptive-name.png"
   ```
5. **Write the index file** with YAML header and `{{< include >}}` statements
6. Chat: "✓ Creating: `[Topic Name].qmd` + folder with [N] sections, [I] source images copied"

---

## STEP 1: Write Introduction Section

The introduction goes in `_01-introduction.qmd`. It contains:

1. **Sources for this section** (collapsible, at top — only sources used in the introduction, not all chapter sources)
2. **Hook / Running Example** (4-5 paragraphs) — **MUST include a technical image** that bridges the narrative story and the chapter's core technical concept. Search d2l.ai, original papers, or authoritative sources for a canonical diagram. The image should make the reader think "oh, so THAT's what this looks like technically."
3. **Chapter Overview** (8-16 paragraphs — the narrative advance organizer)
4. **Learning Objectives** (bullet list)
5. **Concept Map** (D2 diagram)
6. **Notation Table**

**IMPORTANT:** Read the downloaded sources (`view_file`) before writing. Quote exact equations from LaTeX sources.

Chat: "✓ Introduction complete: `_01-introduction.qmd`"

---

## STEP 2: Write Body Sections (One by One)

**For each body section listed in TEXTBOOK-PLAN.md:**

0. **Re-read rules files (MANDATORY before EVERY section):**
   Before writing, re-read these files from disk:
   - `writing-style.md` — Re-read in full. Focus on: emphasis hierarchy, given-new contract, pronoun clarity ("this + noun"), nominalization detection, mathematical vs narrative modes, AI tell avoidance (banned words, em dash prohibition), and inline citation format.
   - `visualization-standards.md` — Re-read the D2 diagram template (Modern SaaS theme with 6 semantic classes), the hvplot two-cell pattern, and the source image handling rules.
   - `quarto-conventions.md` — Re-read heading levels (one `##` per section file), image path resolution (relative to index file), and callout syntax.

   This re-read is not optional. Skipping it is the #1 cause of quality degradation in later sections.

1. **Read the plan** for this section — which sources, which specific parts, what to extract
2. **Read relevant downloaded sources** — `view_file` on the files listed
3. **If sources are insufficient:**
   - Search for additional sources with `search_web`
   - Download to `AI-Learning-Gems/sources/` following naming conventions
   - Chat: "✓ Additional source: `sources/{path}`"
4. **Write the section** following A-E structure:
   - Per-section source header (collapsible)
   - Concrete example FIRST
   - Explanation connecting to example
   - **Embed source images** assigned to this section (from Source Image Catalog): `![Caption. Source: ...]([Topic Name]/images/name.png){#fig-label}` — remember, image paths are relative to the **index file**, so prefix with the chapter folder name
   - Visual diagram (D2 or hvplot) for concepts not covered by source images
   - **Misconception callouts** (1-2 per section) — placed where the misconception would naturally arise, using `.callout-warning` with `"Common Misconception: [wrong belief]"` title. Explain why it's wrong, then what's right.
   - **Think Hard callouts** (1-3 per section) — placed right after the concept they relate to, using `.callout-note` with `"Think Hard: [question]"` title. Give thorough plain-language answers.
   - Second worked example
   - Transition to next section
5. **Apply the running example** as specified in the plan
6. Chat: "✓ Section [N] complete: `_0N-name.qmd` ([X] examples, [Y] visualizations)"

**Repeat for all body sections.**

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
