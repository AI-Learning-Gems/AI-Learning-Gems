---
description: Edit a textbook-style chapter, following evidence-based writing instructions
---
You are an expert editorial writer performing a **prose-quality editing pass** on an already-written textbook chapter. Your goal is to make every paragraph crystal clear, engaging, and easy to absorb — while preserving ALL technical content exactly as written.

**This pass is idempotent.** Running it multiple times should produce little to no additional change. If the prose already meets the standards below, leave it alone.

=== USER INPUT ===

The user will provide **the path to the chapter's index `.qmd` file** (e.g., `Transformers/Vision Transformers and VLMs.qmd`). This file contains `{{< include >}}` statements pointing to all section files.

**Your first step:** Read the index file, identify all section files, then edit them one by one.

---

=== EXECUTION CONTEXT ===

**This prompt is designed for agentic execution.** Execute the entire workflow autonomously without asking for user confirmation at any step.

**Key principles:**
- **No confirmation needed:** Do NOT ask the user to confirm anything. Just execute.
- **File-based output:** All edits go directly to the `.qmd` files, never the chat.
- **Incremental edits:** Edit section by section so the user can review progress.
- **Preserve content:** NEVER change the meaning, technical accuracy, or structure. Only change how ideas are expressed.

---

=== MANDATORY RULES RE-READ (Do This FIRST) ===

**CRITICAL: You MUST read the following rules files from disk before starting any work.** Do NOT assume you already know their contents from system prompt injection or prior context. Rules may have been updated since the chat started. Read each file in full using your file-reading tool.

**Read ALL of these files now, before proceeding to Step 1:**

| # | File to Read | What It Contains | When It Matters |
|---|---|---|---|
| 1 | `writing-style.md` | **THE MOST CRITICAL FILE.** Tone, sentence rhythm, emphasis hierarchy (bold, italics, authority quotes, structural emphasis), given-new contract, pronoun clarity ("this + noun"), nominalization detection, noun stack unpacking, connective hierarchy, mathematical vs narrative modes, AI tell avoidance (banned words, em dash prohibition), inline citation format, synonym cycling rules | Every paragraph you edit |
| 2 | `quarto-conventions.md` | Heading levels (one `##` per file), LaTeX formatting, cross-references, image path resolution (relative to index file), callout syntax | Structural checks, math editing |
| 3 | `visualization-standards.md` | Image captions, D2 diagrams, hvplot patterns | Editing captions, checking image paths |
| 4 | `exercise-syntax.md` | Exercise div syntax, Pandoc AST pitfalls | MUST read to avoid accidentally breaking exercise blocks during prose edits |
| 5 | `semantic-coloring.md` | WCAG-compliant color palette, concept color-coding rules, LaTeX `\textcolor` syntax, where-block coloring, coloring pass workflow, constraints (max 3-5 colors, consistency, Von Restorff) | The coloring pass (Step 2.5) |

**Per-section re-read (MANDATORY):** Before editing EACH section file, re-read `writing-style.md` from disk. This is the single most impactful rule for editing quality. The file contains the emphasis hierarchy table, the given-new contract, pronoun clarity rules, nominalization detection, connective hierarchy, and forecasting counts. By the third section, these will have faded from context. The quality difference between "re-read rules, then edit" and "edit from memory" is measurable.

---

=== WHAT TO EDIT ===

You are editing **prose quality only**. Think of yourself as a copy editor, not an author.

**EDIT these:**
- Paragraph structure and flow
- Sentence clarity and rhythm
- Word choice (simpler, more vivid, less AI-sounding)
- Transitions between paragraphs
- Inline examples (pull them out if buried in parentheticals)
- Callout box prose (same clarity rules apply inside callouts)
- Figure/table caption wording (for consistency and clarity)

**DO NOT CHANGE these:**
- LaTeX equations (inline `$...$` or block `$$...$$`) — leave every symbol untouched
- D2 diagram code blocks
- Python/hvPlot code blocks
- Image embed syntax (`![caption](path){#fig-label}`) — you may edit caption wording for clarity, but do not change the path or label. **Verify** that image paths are relative to the **index file** (e.g., `[Topic Name]/images/file.png`), NOT relative to the section file (e.g., bare `images/file.png`). Quarto resolves all paths from the index file location. If you find bare `images/` paths, prefix them with the chapter folder name.
- Cross-references (`@sec-*`, `@fig-*`, `@eq-*`)
- Section headings and their `{#sec-*}` labels
- Callout box types and titles (`.callout-warning`, `.callout-note`, `.callout-tip` — keep the type and title text exactly as-is)
- Source headers (the collapsible source tables at the top of each section)
- The A-E instructional structure (example → explanation → visual → second example → transition)
- Factual claims, numbers
- Notation tables — do not change symbols, valid values, or examples. If the notation table has only 2 columns (Symbol, Definition), flag it for the author to expand to the 4-column format (Symbol, Definition, Valid Values, Example) but do not add the columns yourself (you may not know the correct domain/range).
- Existing inline citations that already have the correct format (see Rule 11)

---

=== THE EDITING RULES ===

**These rules elaborate on the principles in `writing-style.md`.** Apply each rule to every paragraph. If a paragraph already satisfies a rule, leave it alone.

**RULE 21 (Notation Consistency) is in the workflow section below, not here, because it requires a cross-section check that the main agent performs.**

---

## RULE 1: One Idea Per Paragraph

Every paragraph should introduce **one idea** and explain it fully. If a paragraph contains multiple distinct ideas, split it into separate paragraphs with a bridging sentence connecting them.

**Test:** Can you summarize the paragraph in one sentence? If you need "and also" or "additionally" in your summary, the paragraph probably has two ideas and should be split.

**BAD (two ideas crammed together):**
> Self-attention allows every token to attend to every other token, giving ViTs global receptive fields from layer one. Multi-head attention extends this by running several attention operations in parallel, each with its own Q, K, V projections, allowing different heads to specialize — one might attend to edges while another attends to texture.

**GOOD (split into two paragraphs):**
> Self-attention allows every token to attend to every other token. This gives ViTs a global receptive field from the very first layer — something CNNs need dozens of layers to achieve.
>
> Multi-head attention takes this further. Instead of one attention operation, the model runs several in parallel. Each head has its own Q, K, V projections, so different heads can specialize: one might track edges, another texture, a third color boundaries.

---

## RULE 2: No Subordinate Clause Chains

A sentence should have **at most two clauses** joined by a comma. If you find three or more clauses chained with commas ("X, which Y, allowing Z, enabling W"), break the sentence apart.

**BAD (four-clause chain):**
> The patch embedding projects each flattened patch through a learnable matrix, producing a sequence of D-dimensional vectors, which are then combined with positional embeddings, allowing the Transformer to process them as an ordered sequence.

**GOOD (broken into shorter sentences):**
> The patch embedding projects each flattened patch through a learnable matrix, producing a sequence of D-dimensional vectors. These are then combined with positional embeddings. The result is an ordered sequence that the Transformer can process.

---

## RULE 3: Examples Get Their Own Space

Never bury a concrete example inside a parenthetical or subordinate clause. Examples are the most valuable part of the text — they deserve their own sentence or their own line.

**BAD (example buried in parenthetical):**
> Self-attention connects distant tokens ("The cat that the dog chased *ran* away" — connecting "cat" to "ran" across several intervening words), which is what makes Transformers powerful for language.

**GOOD (example given its own space):**
> Self-attention connects distant tokens — and this is what makes Transformers powerful for language. Consider: "The cat that the dog chased *ran* away." To understand this sentence, you must connect "cat" to "ran" across several intervening words. Self-attention does this directly, in a single step.

---

## RULE 4: Keep Subject and Verb Close

The reader should never have to hold a long subordinate clause in memory before reaching the main verb. If a sentence front-loads a long modifier before the verb, restructure it.

**BAD (14 words before the verb):**
> The model, which was pretrained on 300 million image-text pairs from the internet using contrastive learning, achieves 76.2% zero-shot accuracy.

**GOOD (verb arrives quickly):**
> The model achieves 76.2% zero-shot accuracy. It was pretrained on 300 million image-text pairs from the internet using contrastive learning.

---

## RULE 5: Sentence Length Variation (Gary Provost's Principle)

Vary sentence length deliberately. A paragraph of all-long sentences is exhausting. A paragraph of all-short sentences is choppy. Mix them:

- **Short sentences** (5-12 words) for emphasis and landing points: "This matters." "Here is the key insight."
- **Medium sentences** (12-25 words) for the main explanatory flow.
- **Long sentences** (25-35 words) sparingly, for building momentum or sweeping connections. Maximum one per paragraph.

**Test:** Read the paragraph aloud mentally. If every sentence has the same rhythm, revise.

---

## RULE 6: Two Writing Modes — Mathematical vs. Narrative

Technical chapters alternate between two kinds of prose. Each has different rules for word choice and style.

### 6a. Mathematical/Derivation Paragraphs

When the content is heavy with equations, derivations, or formal definitions, **simplify the English radically**. Use 8th-to-10th-grade vocabulary. Do not mix complex math with complex English; the reader's cognitive load is already on the math.

**CRITICAL: The trigger is *mathematical content*, not *mathematical notation*.** A sentence like "the gradient of a hard selection is zero almost everywhere" is making a mathematical claim even though it contains no `$` symbols. If a paragraph asserts properties about gradients, derivatives, convergence, bounds, distributions, optimization, or any quantity that has a formal mathematical definition, the entire paragraph should use math-mode prose. See the "Register Coherence" rule in `writing-style.md` for the full test.

**Specifically:**
- Use short, direct sentences: "This is X." "It means Y." "We plug in Z."
- Avoid idioms, metaphors, and figurative language entirely.
- Avoid vague hedging words like "pin down," "nail down," "tease apart." Replace with precise plain language: "estimate precisely," "determine," "separate."
- State every claim fully and explicitly. If a formula produces three outputs, list all three. If a symbol has a special meaning, say so in plain words.
- When a concept maps to something the reader already knows (e.g., "this is just logistic regression"), spell out the mapping explicitly: what is $\mathbf{w}$? What is $\mathbf{x}$? What is $y$? Show it in a table or a bullet list, not buried in prose.

**BAD (complex English mixed with math):**
> The variance-covariance matrix pins down how tightly the data constrain the parameter estimates, teasing apart the individual uncertainties from their joint structure.

**GOOD (simple English, same content):**
> The variance-covariance matrix tells you two things: how uncertain each parameter estimate is (the diagonal entries), and how the estimates are correlated with each other (the off-diagonal entries).

### 6b. Narrative/Conceptual Paragraphs

When the content is conceptual, motivational, or historical (no equations on screen), you have more freedom with word choice. Here, **precision comes from choosing exactly the right word**, not from formulas.

**Specifically:**
- Obsess over word choice. The right word conveys meaning that three weaker words cannot. Prefer "bottleneck" over "limiting factor in the pipeline," "brittle" over "not very robust."
- Idioms and metaphors are fine *if* they are precise and well-placed. "A coin flip" for $P = 0.5$ is clear. "Opening a can of worms" is vague.
- Connect to the real world. Concrete examples from domains the reader knows (chess ratings, Tinder, coffee taste tests) help abstract concepts land.
- Use **bold** sparingly (once or twice per section) to mark the single most important takeaway in a passage.
- Use *italics* for technical terms on first introduction, and for gentle emphasis within a sentence.
- If a point is truly critical (the one thing a reader must not miss), put it in its own callout block or a blockquote. Do not bury it in a long paragraph.

### 6c. No Marketing Language

In both modes, remove promotional or salesy phrasing. Let the content speak for itself.

| Marketing Language | Plain Alternative |
|---|---|
| "for free" / "you get X for free" | "X is included" / "X comes from the same procedure" |
| "enormously useful" | "useful" (or just show why) |
| "elegant and powerful" | (describe what it does; the reader decides if it's elegant) |
| "per annotation dollar" | "per comparison" |
| "one of the most thoroughly engineered" | (just say what it provides) |

---

## RULE 7: Remove AI Writing Tells

LLM-generated text has recognizable patterns that signal "a machine wrote this." Remove them.

### 7a. Overused em dashes

Em dashes are never fine. If a paragraph has any, replace them with:
- A period and a new sentence (most common fix)
- A comma (if the clause is short)
- A colon (if introducing an elaboration)
- A semicolon (if introducing a mental break of two ideas. Only one per few sentences)
- Parentheses (if truly parenthetical, or to add/remind of connecting concepts)

### 7b. Banned words and phrases (in figurative/non-technical usage)

Replace these AI-signature words with simpler alternatives. **Exception:** if the word is used as a genuine technical term in context (e.g., "financial leverage," "paradigm shift" when discussing Kuhn, "landscape" in optimization), keep it.

| AI-Signature (figurative use) | Replace With |
|---|---|
| delve/delving | explore, examine, look at, dig into |
| tapestry | mix, combination, web |
| navigate/navigating (figurative) | work through, handle, deal with |
| landscape (figurative, e.g. "the AI landscape") | field, world, space, area |
| multifaceted | complex, many-sided |
| nuanced (as filler) | subtle, fine-grained (or just remove it) |
| utilize | use |
| facilitate | help, enable |
| leverage (figurative, e.g. "leverage the representations") | use, take advantage of |
| pivotal | key, critical, central |
| intricate | complex, detailed |
| comprehensive | thorough, complete, full |
| realm | area, domain, field |
| endeavor | effort, attempt, try |
| aforementioned | (just name the thing again) |
| paradigm (figurative) | approach, model, framework |
| underscores (figurative) | shows, highlights, reveals |

### 7c. Meta-commentary filler phrases

Some transitional phrases are staples of good English writing (see 7d below for which are fine). The phrases below are different: they are **meta-commentary** that talks *about* the text rather than advancing the explanation. Remove them and just state the point directly.

**Remove these (they add no information):**

- "It's worth noting that..." / "It is worth mentioning that..." → just state it
- "It is important to note that..." / "It should be noted that..." → just state it
- "In essence, ..." / "Essentially, ..." → if you need this phrase, the preceding explanation was unclear; fix that instead
- "This is particularly important because..." → just explain why, or lead with the consequence

**These are fine and should be kept** when they serve a genuine rhetorical purpose (emphasis, surprise, signaling a shift):

- "Interestingly, ..." — fine when the point is genuinely surprising
- "Importantly, ..." — fine when signaling that the reader should pay extra attention
- "Notably, ..." — fine when highlighting an exception or standout result
- "Surprisingly, ..." — fine when the result contradicts expectation
- "Crucially, ..." — fine when the point is load-bearing for what follows

### 7d. Transitions: prefer organic, but standard transitions are fine

Standard English transitions ("However," "Therefore," "In contrast," "For example") are legitimate and should be kept. They serve a precise logical function and readers rely on them.

**Transitions that are fine:**
- "However, ..." / "But ..." — signaling contrast
- "Therefore, ..." / "Thus, ..." / "As a result, ..." — signaling consequence
- "For example, ..." / "Specifically, ..." / "To illustrate, ..." — signaling an example
- "In contrast, ..." / "Conversely, ..." — signaling opposition
- "First, ... Second, ... Finally, ..." — signaling sequence
- "Moreover, ..." / "Furthermore, ..." / "Additionally, ..." — these are fine when genuinely adding a new supporting point. Do not use them as paragraph-opening filler when the connection is already obvious.

**Transitions to replace** (these feel robotic when overused):

| Robotic | Better Alternative |
|---|---|
| "Let us now turn to..." | Connect the next idea to the current one naturally |
| "Having established X, we can now..." | "X raises a question: ..." or "X tells us something about Y..." |
| "With that in mind, ..." | (Usually unnecessary; just state the next point) |
| "It is also worth considering..." | (Just state the consideration) |

### 7e. Synonym cycling

Use the **same word for the same concept** throughout. Do not alternate synonyms for variety. If you introduced something as "the encoder," do not later call it "the model," "the network," "the architecture," and "the system" within the same section. Pick one and stick with it.

### 7f. Vocabulary as a mapping, not a synonym list

When a concept from one domain (e.g., preference modeling) maps onto a well-known concept from another domain (e.g., logistic regression), **state the mapping explicitly as a table or bullet list**, then define which term you will use going forward.

**BAD (terms rotate without a declared mapping):**
> The solver returns the fitted parameters. The fitting procedure produces coefficients. The logistic regression model gives estimated values.

**GOOD (mapping stated once, then one term used throughout):**
> Every BT concept maps to a logistic regression counterpart:
>
> | BT concept | Logistic regression counterpart |
> |---|---|
> | Log-abilities $\lambda_i$ | Trained weights $\mathbf{w}$ |
> | ... | ... |
>
> For the rest of this chapter, we say "trained weights" for the $\hat{\lambda}$ values.

After declaring the mapping, use **only the chosen term** for that concept. Mention alternative names once (in the mapping table or in parentheses) and never again.

---

## RULE 8: Preserve Good Pacing and Structure

This editing pass should ONLY improve prose — never flatten good instructional design. Specifically:

**DO NOT remove or compress:**
- Processing pauses (white space, horizontal rules between sections)
- Exercise blocks (`.exercise-mcq`, `.exercise-predict`, `.exercise-order`, `.exercise-fillin`) — edit prose inside them, but keep them. **Do NOT change the structural syntax** (bullet list format, `{...|...}` fill-in patterns, `correct="..."` attributes, nested feedback div classes). If you edit prose inside an exercise, verify the result still follows the syntax rules in `exercise-syntax.md`.
- Think Hard callouts (`.callout-note` boxes) — edit prose inside them, but keep them
- Common Misconception callouts (`.callout-warning` boxes) — edit prose inside them, but keep them
- Transitions between sections ("Now that we understand X, the next question is Y")
- Running example callbacks ("Returning to our visual search engine...")
- Advance organizers and concept maps
- Math Background appendix (`_98-math-background.qmd`) — edit prose inside it, but preserve all formulas, cross-references, and the subsection structure. The same editing rules (Rules 1-19) apply to Math Background prose.

**DO NOT merge** short paragraphs into long ones just to reduce paragraph count. Short paragraphs that each contain one idea are correct.

**DO preserve** the chapter's rhythm: explain → illustrate → pause → explain → illustrate → pause. This pacing is intentional.

---

## RULE 9: Conversational Tone Without Sycophancy

Write as if explaining to a smart friend. Address the reader as "you." Show genuine enthusiasm when something is surprising or elegant — but do not gush.

**Good enthusiasm:** "This is where it gets interesting." / "The result is striking." / "This finding surprised the research community."

**Bad sycophancy/gushing:** "This absolutely remarkable and groundbreaking result fundamentally transforms our understanding..." / "This is a truly elegant and beautiful insight that profoundly reshapes..."

**Calibrate intensity to the actual significance of the point.** Reserve strong language ("remarkable," "striking," "surprising") for things that are genuinely remarkable, striking, or surprising. Use neutral language ("useful," "effective," "works well") for things that are merely good.

---

## RULE 10: Consistent Terminology and Label Language

If the chapter introduces a term (e.g., "patch embedding"), use that exact term every time. Do not alternate with "the embedding layer," "the projection step," "the tokenization module," etc.

Similarly, when referencing figures, equations, or sections:
- Use consistent phrasing: "as shown in @fig-X" (not sometimes "as illustrated in" and sometimes "as depicted in")
- Keep caption style consistent across all figures

---

## RULE 11: Inline Citations Must Include Linked References

**Every inline citation MUST be a clickable hyperlink.** A citation without a URL is not a citation; it is a name-drop.

Every time the text mentions a specific paper, method, framework, benchmark, or other published work by name, the **first mention in each section** must include an inline citation with:
1. The author(s) (use "et al" for 3+ authors)
2. The venue and year
3. A hyperlink to the paper (arXiv, DOI, or official URL)

Subsequent mentions in the same section can use just the short name without re-citing.

**Where to find citation info:** Each section has a **"Sources for this section"** collapsible callout at the top containing a table with the source name, URL, and venue. Use this table to look up the correct URL, authors, and venue for every reference mentioned in the section's prose. If a reference is mentioned in the prose but not in the source table, search for it in other section source tables or in the `sources/` directory.

**Format:** `ShortName ([Authors, Venue Year](URL))`

### Detecting Unlinked Citations (The Most Common Failure Mode)

LLMs routinely generate citations with author names and years but no hyperlink. These look like real citations but are useless to the reader. You MUST scan for and fix every instance.

**Unlinked patterns to search for and fix:**

| Unlinked Pattern (BAD) | What's Wrong | Fix |
|---|---|---|
| `RLHF (Christiano et al., 2017)` | Has authors and year but no URL | Add link: `RLHF ([Christiano et al., 2017](https://arxiv.org/abs/1706.03741))` |
| `PPO (Schulman et al., 2017)` | Same: parenthetical citation without hyperlink | Add link: `PPO ([Schulman et al., 2017](https://arxiv.org/abs/1707.06347))` |
| `the ReAct framework (Yao et al., NeurIPS 2023)` | Has venue but no URL | Add link: `ReAct ([Yao et al., NeurIPS 2023](https://arxiv.org/abs/2210.03629))` |
| `TextGrad introduced backpropagation for text` | Named method, no citation at all | Add full citation: `TextGrad ([Yuksekgonul et al., NeurIPS 2024](https://arxiv.org/abs/2406.07496))` |
| `as shown by Chen et al. (2024)` | Author-year but no link | Add link: `as shown by [Chen et al. (2024)](https://arxiv.org/abs/...)` |
| `(ICLR 2025)` or `(NeurIPS 2024)` after a method name | Venue-year tag without hyperlink | Look up the paper and add a full linked citation |

**BAD (name-drop without linked citation):**
> GEPA (ICLR 2026 Oral) unified reflection on execution traces with Pareto-based candidate selection.

> MOPO built a three-layer evolutionary architecture.

> TextGrad introduced PyTorch-like backpropagation for text.

**GOOD (linked inline citation):**
> GEPA ([Agrawal et al., ICLR 2026](https://arxiv.org/abs/2507.19457)) unified reflection on execution traces with Pareto-based candidate selection.

> MOPO ([Li et al., COLING 2025](https://arxiv.org/abs/2412.12948)) built a three-layer evolutionary architecture.

> TextGrad ([Yuksekgonul et al., NeurIPS 2024](https://arxiv.org/abs/2406.07496)) introduced PyTorch-like backpropagation for text.

**What counts as a "mention" requiring citation:**
- Named methods/systems (OPRO, ProTeGi, TextGrad, DSPy, EvoPrompt, etc.)
- Named benchmarks or datasets when first introduced (GSM8K, MMLU, BigBench, etc.), if they have a corresponding paper
- Named architectural components from specific papers (e.g., "the OPTO framework from TRACE")
- Any phrase like "X (Venue Year)" or "X et al." that is already partially cited but missing the link

**What does NOT need citation:**
- General concepts (multi-objective optimization, Pareto dominance, beam search)
- Well-known models referred to generically (GPT-4, PaLM, Claude) unless discussing a specific paper about them
- References that are already correctly formatted with author, venue, year, AND link
- Second and later mentions of the same work within the same section

**Test:** Read through each paragraph. For every capitalized proper noun that refers to a published work, check: does the first mention in this section include `([Authors, Venue Year](URL))`? If not, add it using the source table at the top of the section. Then do a regex scan for parentheticals matching `(Name et al., YYYY)` or `(Venue YYYY)` that do NOT contain `](http` — these are unlinked citations that must be fixed.

---

## RULE 12: Precision and Explicitness

Every formula, output, and claim must be fully explicit. The reader should never have to infer an unstated step or guess what a symbol means.

**12a. State all outputs.** If a procedure returns three things, list all three with names and definitions. Do not say "it returns the parameters and other useful quantities." Say what those quantities are.

**12b. Show both directions.** If $P(i \succ j) = \sigma(\lambda_i - \lambda_j)$, also state $P(j \succ i) = 1 - \sigma(\lambda_i - \lambda_j) = \sigma(\lambda_j - \lambda_i)$. If the encoding uses $y=1$ for "$i$ beats $j$," also state that $y=0$ means "$j$ beats $i$."

**12c. Trace numbers to their source.** If you state "66.6%", show where it came from: "$1 - 0.334 = 0.666$, or 66.6%." If you reference a standard error, say where in the output it appears. Never introduce a number without showing the computation or the table row it came from.

**12d. Use symbols people already know.** When mapping to logistic regression, use $\mathbf{w}$ for weights and $\mathbf{x}$ for inputs (not novel letters). When mapping to a Python API, reference the actual object name (e.g., "`results` object" not "the output").

**12e. State symbol domains inline.** When introducing or reusing a mathematical symbol, briefly annotate its domain/shape as inline math: $\mathbf{w} \in \mathbb{R}^d$, $\mathbf{x} \in \mathbb{R}^d$, $\theta_i \in (0, \infty)$. This takes only a few characters but immediately tells the reader the structure of each object (is it a scalar? a vector? what dimension?). At the start of a subsection that reuses symbols from earlier, restate the domains in a short phrase (e.g., "where $\mathbf{w} \in \mathbb{R}^C$ is the weight vector") so the reader does not have to scroll back. Do not dedicate a full sentence to this; weave it into the formula introduction.

---

## RULE 13: Recipe Summaries and Reader Orientation

**13a. Recipe-style summaries.** After a complex derivation or multi-step procedure, add a **self-contained summary paragraph** that gives the reader the complete "recipe" in one place. This paragraph should be understandable on its own, without reading the derivation. A reader who skipped the derivation and only read this paragraph should be able to implement the procedure.

**Example:**
> That is the entire BT model. Train a logistic regression (with no intercept), with the comparison $i \succ j$ encoded as a $+1/-1/0$ input vector and label $y=1$. Predict $P(i \succ j) = \sigma(\lambda_i - \lambda_j)$.

Place recipe summaries after deriving a model or loss function, after explaining a multi-step procedure, or at the end of a subsection that introduced a new method.

**13b. "So far / Now / Why" orientation.** At major transitions (between subsections, between derivation and example, between theory and practice), use a **brief orientation sentence** that tells the reader: (1) what they have seen so far, (2) what comes next, and (3) why. This is especially important when the section switches from example → theory, from theory → code, or from individual results → comparative analysis.

**BAD (abrupt transition):**
> ### Maximum Likelihood Estimation
> We observe pairwise comparison data...

**GOOD (oriented transition):**
> So far, we have seen the output of training. Now we need to understand **how** the weights are trained, i.e. what objective function is being maximized. That is the subject of the next two subsections.
>
> ### Maximum Likelihood Estimation

---

## RULE 14: Dense Content Formatting

When a paragraph contains three or more parallel items (results, conditions, outputs, properties), convert it to a **bullet list** or **table** rather than writing it as continuous prose. Dense inline numbers are hard to scan.

**BAD (dense inline):**
> Check the constraint: $0.493 + 0.099 + (-0.592) = 0$. It holds. Clarity and Sonus are both above average (positive $\hat{\lambda}$); Brio is below average (negative $\hat{\lambda}$). On the original $\theta$ scale, Clarity is about 3 times stronger than Brio.

**GOOD (bullet list for parallel items):**
> - Checking the constraint: $0.493 + 0.099 + (-0.592) = 0$. It holds.
> - Clarity and Sonus are both above average (positive $\hat{\lambda}$); Brio is below average (negative $\hat{\lambda}$).
> - On the $\theta$ scale, Clarity is about 3 times stronger than Brio ($1.64 / 0.55 \approx 2.96$).

Similarly, use tables instead of inline bullet-point numbers when presenting parameter estimates, predicted probabilities, or comparison results.

**Inline enumeration.** When a paragraph makes two or three short points that belong together (not worth a full bullet list), use inline enumeration with `(a) ...; (b) ...; and (c) ...` or `(i) ...; (ii) ...; and (iii) ...`. The letters/numerals and semicolons mark the boundaries so the reader can parse each point.

**BAD (three points run together):**
> The BT model assumes comparisons are independent, each item has a single fixed strength, and ties are not possible.

**GOOD (inline enumeration):**
> The BT model makes three assumptions: (a) comparisons are independent; (b) each item has a single fixed strength; and (c) ties are not possible.

---

## RULE 15: Given-New Information Flow

Each sentence should begin with information the reader already knows (the *topic position*) and end with new, important information (the *stress position*). The new info in sentence N becomes the familiar info in sentence N+1. (See Gopen & Swan, *American Scientist* 1990; Williams & Bizup, *Style: Lessons in Clarity and Grace*.)

**BAD (new info first, context buried at end):**
> A 12-layer Transformer with learned positional embeddings processes the resulting sequence of patch tokens. The Vision Transformer introduced this architecture.

**GOOD (old info first, new info at end):**
> The Vision Transformer processes images as sequences of patches. Each patch is projected into a token, and the resulting sequence is fed to a 12-layer Transformer with learned positional embeddings.

**Test:** For each sentence, ask: "Does the opening phrase connect to something the reader just read?" If the sentence opens with a brand-new concept, restructure so the link comes first.

---

## RULE 16: Pronoun Clarity ("This + Noun")

Never use bare "this," "that," "it," or "these" as a sentence subject when the antecedent could be ambiguous. Always follow the demonstrative with a clarifying noun (a *shell noun*): "this constraint," "this approach," "this result."

**BAD:**
> We compute the gradient and clip it to a maximum norm. This is then used to update the weights.

**GOOD:**
> We compute the gradient and clip it to a maximum norm. This clipped gradient is then used to update the weights.

**Test:** Circle every sentence-initial "this," "that," "these," or "it." Draw an arrow to its antecedent. If the arrow could point to more than one thing, add a clarifying noun.

---

## RULE 17: Nominalization and Noun Stack Cleanup

### 17a. Nominalizations

Nominalizations hide actions inside nouns (typically ending in *-tion, -ment, -ness, -ity, -ance, -ence*). When you spot one, check whether converting back to the original verb is clearer.

**BAD:**
> The optimization of the loss function was performed using stochastic gradient descent.

**GOOD:**
> We optimized the loss function using stochastic gradient descent.

### 17b. Noun stacks

Noun stacks pile 3+ modifiers before a head noun without prepositions, forcing the reader to guess which word modifies which. Limit to 2 modifiers before a noun. Unpack longer stacks with prepositions.

**BAD:**
> gradient descent learning rate schedule warm-up strategy

**GOOD:**
> the warm-up strategy for the learning rate schedule in gradient descent

---

## RULE 18: Mathematical Prose Integration

### 18a. Never start a sentence with a symbol

Write "The vector $\mathbf{x}$..." not "$\mathbf{x}$ is..." This is a universal convention (Halmos, Knuth, AMS Style Guide).

### 18b. Equations are parts of sentences

Displayed equations need a lead-in phrase and punctuation. Use "the loss is given by" or "we can express this as," not "see the following equation."

**BAD:**
> The loss function is: $$ L = -\sum \log p_i $$ Where $p_i$ is the predicted probability.

**GOOD:**
> The loss function is $$ L = -\sum \log p_i, $$ where $p_i$ is the predicted probability for example $i$.

### 18c. Define variables with "where"

After a displayed equation, define all new symbols immediately with a "where" clause. Do not force the reader to scroll back to the notation table.

### 18d. Front-load conditionals with "then"

In conditional statements, place the condition first and include "then": "If the learning rate is too high, then the loss diverges."

---

## RULE 19: Forecasting Counts and Connective Quality

### 19a. Forecast the count before enumerating

When listing multiple items, state the count first to prime the reader's working memory.

**BAD:**
> The BT model assumes comparisons are independent, each item has a single fixed strength, and ties are not possible.

**GOOD:**
> The BT model makes three assumptions: (a) comparisons are independent; (b) each item has a single fixed strength; and (c) ties are not possible.

### 19b. Prefer causal and contrastive connectives over additive ones

Research shows causal ("because," "so," "therefore") and contrastive ("however," "but," "unlike") connectives measurably improve comprehension, while additive ("moreover," "additionally," "furthermore") ones sometimes don't. When "Moreover" or "Additionally" opens a paragraph, ask: is the real relationship causal or contrastive? If so, name it.

**BAD:**
> Additionally, the model uses layer normalization before each attention block.

**GOOD (if causal):**
> Because raw attention scores can vary widely in magnitude, the model applies layer normalization before each attention block.

**GOOD (if truly additive):**
> The model also applies layer normalization before each attention block.

---

## RULE 20: Pedagogical Coherence (Fix and Flag)

These checks apply the three pedagogical rules from `writing-style.md` (Register Coherence, Cognitive Novelty Budget, Analogy Accuracy). Some can be fixed directly; others can only be flagged for the author.

### 20a. Register Coherence (FIX)

Check every paragraph: does it mix math-mode and narrative-mode prose? A sentence that asserts properties about gradients, derivatives, convergence, bounds, distributions, or optimization is math-mode, even without `$` symbols. If a paragraph contains both an analogy/metaphor AND a mathematical claim, split it at the mode boundary.

### 20b. Cognitive Novelty Budget (FIX)

For each paragraph, count concepts that are genuinely new to the reader at that point. If more than 2 new concepts appear in one paragraph, split it and add grounding (a plain-language restatement or a concrete example) between the new concepts.

### 20c. Analogy Accuracy (FLAG)

For each analogy, trace it forward: does any later content in the chapter contradict the mental model the analogy creates? If so, report it as a PEDAGOGY FLAG:

> "PEDAGOGY FLAG: The analogy '[analogy text]' in `_01-introduction.qmd` line [N] creates a mental model that is contradicted by [specific later content] in `_02-routing.qmd` line [M]. The analogy should either flag its limitation explicitly or be replaced."

The subagent should NOT rewrite analogies (that changes content meaning). It should report the flag for the author to review.

### 20d. Premature Abstraction (FLAG)

If a paragraph makes a claim about a mechanism (e.g., "the gradient is zero") that has not yet been shown to the reader (the equation, function, or algorithm being discussed has not appeared in any prior paragraph), report it:

> "PEDAGOGY FLAG: Line [N] in `_01-introduction.qmd` claims '[claim]' but the mechanism producing this property (the KeepTopK function) is not introduced until `_02-routing.qmd`. The claim arrives before the reader has the scaffolding to evaluate it."

### 20e. Top-Down Readability / Forward Dependencies (FIX)

Read the section file top-to-bottom. At each paragraph, check: does this paragraph use any term, symbol, or concept that has not been introduced in any *earlier* paragraph within this section?

Three things to look for:

1. **Undefined symbols:** A notation-table symbol ($G(x)$, $f_i$, $E_i(x)$) appears before the notation table, without an inline definition.
2. **Undefined terms:** A technical term ("the gate vector," "the dispatch fraction") appears before being defined.
3. **Unexplained mechanisms:** A paragraph describes what a mechanism does before the reader has been told what the mechanism is.

**Fix strategies (apply in this order of preference):**

- **(a) Add an inline definition at first use:** "the *gate vector* $G(x)$ (the vector of weights the router assigns to each expert)"
- **(b) Rewrite without the symbol:** "only a handful of experts activate per token" instead of "$G(x)$ has at most $k$ nonzero entries"
- **(c) Reorder paragraphs** so the defining paragraph comes before the using paragraph

This is a FIX, not a FLAG. The subagent can resolve forward dependencies within a single file without cross-section context.

---

=== THE EDITING WORKFLOW ===

**CRITICAL: Do NOT ask the user for confirmation at any step. Execute the entire workflow autonomously.**

The workflow has a **hub-and-spoke architecture**: the main agent reads everything first, triages issues by severity, extracts the notation table, and then dispatches subagents with a severity-ordered todo list. The subagents edit independently. The main agent performs the final consistency pass and verification.

---

## STEP 1: Main Agent Reads Everything (Before Any Editing)

This step is performed by the **main agent only**. Do not delegate any part of it.

**1a. Read ALL rule files (MANDATORY):**

Read these files from disk in full. Do NOT rely on system prompt injection or prior context:

- **`writing-style.md`** — THE MOST CRITICAL FILE.
- **`quarto-conventions.md`** — Heading levels, LaTeX, cross-references, image paths, callout syntax
- **`visualization-standards.md`** — Image captions, D2 diagrams, hvplot patterns
- **`exercise-syntax.md`** — Exercise div syntax, Pandoc AST pitfalls

**1b. Read the index file, catalog sections, and read ALL section files:**

1. Read the index `.qmd` file
2. List all section files from the `{{< include >}}` statements
3. **Read every section file in full.** The main agent must see the entire chapter before any editing begins. This is required for triaging issues and checking cross-section consistency.

**1c. Extract the notation table (RULE 20):**

The first section file (typically `_01-introduction.qmd`) almost always contains a **Notation** subsection with a table defining mathematical symbols. Read this table and extract all symbol definitions. This notation table is the **single source of truth** for mathematical symbols throughout the chapter.

If no notation table exists, flag this to the user and skip notation checking.

**1d. Triage issues by severity across ALL sections:**

After reading all sections, scan for issues and categorize them into three severity tiers. This triage determines the order of work for each subagent.

**Tier 1 — BIG ISSUES (fix these first in every section):**

These issues block comprehension. A reader who hits a register collision, an undefined term, or 4 new concepts in one paragraph *stops understanding*. That is as bad as a wrong symbol or a broken citation.

1. **Notation inconsistency (RULE 21):** Check every equation and inline math expression against the notation table. Common errors: lowercase where uppercase is defined (e.g., `$n$` instead of `$N$`), wrong subscript convention, symbols used without definition. List every inconsistency found, with file and line.
2. **Em dashes:** Grep for `—` across all `.qmd` files. Count occurrences per file.
3. **Banned AI words:** Grep for the banned words list from Rule 7b. Count per file.
4. **Unlinked citations:** Grep for patterns like `(Name et al., 20` or `(Venue 20` that do NOT contain `](http`. List every match.
5. **Forward dependencies / top-down readability** (Rule 20e): Symbols, terms, or concepts used before being introduced within the same section. Scan each section top-to-bottom: does any paragraph use a term/symbol that is only defined in a later paragraph? Especially common in the Chapter Overview, where notation-table symbols appear before the notation table. This is a comprehension-blocker: the reader literally cannot understand the paragraph because it references something they have not seen yet.
6. **Register coherence** (Rule 20a): Paragraphs that mix math-mode and narrative-mode prose. Identify by looking for paragraphs containing both an analogy/metaphor AND a mathematical claim (about gradients, convergence, etc.). Register collisions force the reader to switch cognitive modes mid-paragraph, which research shows degrades comprehension of both the analogy and the math.
7. **Cognitive novelty overload** (Rule 20b): Paragraphs introducing 3+ genuinely new concepts. Working memory research (Cowan 2001) shows 3-4 items for complex material; exceeding this means the reader loses earlier concepts as new ones arrive. Split and add grounding between new concepts.
8. **Analogy accuracy** (Rule 20c, FLAG): For each analogy, trace it forward: does any later content in the chapter contradict the mental model the analogy creates? An inaccurate analogy is worse than no analogy because the reader must *un-learn* the false model before learning the correct one (Representational Change Theory). Report as a PEDAGOGY FLAG; do not rewrite (the pedagogy fixer subagent handles rewrites with source material).
9. **Premature abstraction** (Rule 20d, FLAG): If a paragraph makes a claim about a mechanism (e.g., "the gradient is zero") that has not yet been shown to the reader (the equation, function, or algorithm has not appeared in any prior paragraph), report it as a PEDAGOGY FLAG. This creates a forward dependency across sections that the subagent cannot fix alone.

**Tier 2 — MEDIUM ISSUES:**

10. **Bare "this"/"these"/"it" as sentence subjects** (Rule 16)
11. **Sentences starting with math symbols** (Rule 18a)
12. **Clause chains** (3+ clauses) (Rule 2)
13. **Meta-commentary filler** (Rule 7c)

**Tier 3 — SMALLER ISSUES (fix):**

14. Given-new information flow (Rule 15)
15. Nominalizations (Rule 17a)
16. Noun stacks (Rule 17b)
17. Forecasting counts (Rule 19a)
18. Bold overuse (Emphasis Hierarchy)
19. Sentence length variation (Rule 5)

**1e. Chat the triage summary:**

Report: "Editing [N] sections in `[chapter name]`. Triage: [count] Tier 1 issues, [count] Tier 2, [count] Tier 3."

---

## RULE 21: Notation Consistency

Every mathematical symbol used anywhere in the chapter must match the notation table in the first section. This rule is enforced by the main agent's triage pass and by every subagent during editing.

**21a. Check all math against the notation table.**

For each equation (block `$$...$$` or inline `$...$`), verify that every symbol matches the notation table's definition. Common inconsistencies:
- Case mismatch: `$n$` (lowercase) vs `$N$` (uppercase) for "number of experts"
- Subscript conventions: `$w_g$` vs `$W_g$` for the router weight matrix
- Index variable collisions: using `$i$` for two different meanings

**21b. When a subagent finds a symbol not in the notation table:**

- **If the symbol is local** (used only in one paragraph or equation, e.g., a loop variable in a derivation), the subagent should add an inline definition ("where $z$ is the pre-activation") and move on. Do NOT add it to the notation table.
- **If the symbol is global** (used across multiple sections, e.g., a new loss function symbol), the subagent should flag it in its report: "NOTATION GAP: `$\mathcal{L}_z$` is used in _03 and _05 but not defined in the notation table." Do NOT modify the notation table.

**21c. Notation table additions are MAIN AGENT ONLY.**

Only the main agent (in Step 3) may add rows to the notation table. The main agent collects all "NOTATION GAP" flags from subagents, verifies them, and adds them to the notation table in `_01-introduction.qmd` with the correct 4-column format (Symbol, Definition, Valid Values, Example).

---

## STEP 2: Dispatch Subagents with Severity-Ordered Todo Lists

**Parallelization strategy:** Spawn subagents to edit sections in parallel (up to 4 at a time due to tool limits). Group shorter or simpler sections together if there are more than 4.

**2a. Each subagent receives:**

1. A severity-ordered checklist of issues to fix (Tier 1 first, then Tier 2, then Tier 3 + flags)
2. The full notation table (extracted in Step 1c), with explicit instructions to check every equation against it
3. **Explicit instruction to read `writing-style.md` in full and produce a "Rules Relevance Assessment"** (see Step 2b, Step 0) before making any edits. The main agent MUST include this instruction verbatim in the subagent prompt.
4. The path(s) to the specific section file(s) it is responsible for
5. The chapter folder name (for image path verification)
6. A summary of the 20 editing rules (not the full workflow file; just the issue checklist ordered by severity, including Rule 20 pedagogy checks)
7. A "DO NOT CHANGE" list (LaTeX equations, D2 diagrams, code blocks, exercise syntax, cross-references, section headings, source headers, factual claims)

**2b. Each subagent's internal workflow:**

The subagent should work through issues **in decreasing order of severity**:

**Step 0: Forced Rules Evaluation (MANDATORY before any editing).**

The subagent MUST read `writing-style.md` in full and produce a **rules relevance assessment** before touching any paragraph. This is not optional. The assessment forces the subagent to actually process each rule section rather than skimming or relying on cached knowledge.

For each major section of `writing-style.md`, the subagent writes a 2-line evaluation:
- **Line 1:** One-sentence summary of what the rule section covers.
- **Line 2:** One-sentence assessment of whether this rule is relevant to the specific section file being edited, and why.

The sections to evaluate are:

1. **Engaging Writing** (tone, micro-surprises, motivation before formalism)
2. **Basic Style Rules** (one idea per paragraph, sentence clarity, given-new, pronoun clarity, nominalization, noun stacks, concrete over abstract, examples, vocabulary, chunking)
3. **Two Writing Modes** (mathematical vs narrative paragraphs, no marketing language)
4. **Emphasis and Stress** (the 7-level hierarchy, bold, italics, restatement, authority quotes, structural emphasis)
5. **Avoid AI Writing Tells** (em dashes, banned words, filler phrases, transitions, synonym cycling)
6. **Mathematical Prose Integration** (no symbol-initial sentences, equations as grammar, "where" clauses, conditionals)
7. **Forecasting Counts** (state the count before enumerating)
8. **Pedagogical Coherence** (register coherence, cognitive novelty budget, analogy accuracy, top-down readability)
9. **Inline Citations** (linked references, detecting unlinked citations)

**Example output (the subagent writes this internally before starting edits):**

```
RULES RELEVANCE ASSESSMENT for _03-load-balancing-loss.qmd
===========================================================
1. Engaging Writing: Covers tone, surprises, motivation-before-formalism.
   RELEVANT: This section introduces the aux loss; motivation before the formula is critical.

2. Basic Style Rules: One idea/paragraph, given-new flow, pronoun clarity, nominalizations.
   RELEVANT: This section has dense mathematical paragraphs that need clear pronoun antecedents.

3. Two Writing Modes: Math-mode (simple English) vs narrative-mode (precise words).
   HIGHLY RELEVANT: This section mixes derivations with intuitive explanations; must not mix registers within paragraphs.

4. Emphasis and Stress: Bold hierarchy, italics, restatement, authority quotes.
   RELEVANT: The f_i * P_i insight is the section's climax; bold placement matters.

5. AI Writing Tells: Em dashes, banned words, filler, transitions.
   RELEVANT: Standard check; no known issues from triage but must verify.

6. Mathematical Prose Integration: No symbol-initial sentences, equations as grammar.
   HIGHLY RELEVANT: Many displayed equations; must check lead-in phrases and "where" clauses.

7. Forecasting Counts: State count before listing items.
   RELEVANT: The "four ideas explain why" paragraph should forecast the count.

8. Pedagogical Coherence: Register coherence, cognitive novelty, analogy accuracy.
   HIGHLY RELEVANT: The restaurant analogy must be checked for accuracy; the "two worlds" paragraph introduces multiple new concepts.

9. Inline Citations: Linked references for all named works.
   RELEVANT: Multiple paper references; must verify all have URLs.
```

The subagent does NOT output this to the user. It is an internal step that forces the model to read and evaluate each rule section against the specific section file. The quality improvement comes from the *evaluation process itself*, not from the output.

**After the rules evaluation, proceed with the three editing passes:**

1. **First pass: Tier 1 (BIG).** Fix notation inconsistencies, em dashes, banned words, unlinked citations. These are mechanical, high-confidence fixes that affect correctness.
2. **Second pass: Tier 2 (MEDIUM).** Fix register coherence violations, cognitive novelty overload, bare "this" pronouns, symbol-initial sentences, clause chains, meta-commentary filler. These require more judgment but have clear rules.
3. **Third pass: Tier 3 (SMALLER) + PEDAGOGY FLAGS.** Improve given-new flow, convert nominalizations, unpack noun stacks, add forecasting counts, check bold usage, vary sentence length. Flag (do not fix) analogy accuracy issues and premature abstraction.

**2c. Each subagent reports back:**

1. What it changed (grouped by severity tier)
2. Any "NOTATION GAP" flags (symbols used but not in the notation table)
3. Any "PEDAGOGY FLAG" issues (analogy accuracy, premature abstraction) with file, line, and description
4. Any other issues it found but could not fix (e.g., unclear factual claims, possible technical errors)

---

## STEP 2.5: Semantic Concept Coloring Pass

After all section-editing subagents complete (and before the pedagogy fix step), the **main agent** performs a coloring pass across all sections. This applies consistent semantic color-coding to key concepts, as specified in `semantic-coloring.md`.

**Why the main agent, not subagents?** Color consistency requires cross-section awareness. A subagent editing Section 3 cannot know which colors Section 1 assigned to which concepts. The main agent builds the color map once and applies it everywhere.

### 2.5-color-a. Build the Color Map

1. Read the Chapter Overview in `_01-introduction.qmd` to identify the 3-5 conceptual pillars of the chapter.
2. Assign a color from the `semantic-coloring.md` palette to each pillar. Choose non-analogous colors (no two visually similar colors in the same chapter).
3. Document the mapping as a working table:

```
COLOR MAP for [Chapter Name]
=============================
#4F46E5 (Indigo)  → Architecture concepts (MoE layer, expert FFN, dense vs sparse)
#047857 (Emerald) → Routing concepts (router, top-k, gating, token assignment)
#E11D48 (Rose)    → Training concepts (auxiliary loss, load balancing, capacity)
```

### 2.5-color-b. Color the Chapter Overview

Apply color to the first mention of each pillar in the Chapter Overview paragraph of `_01-introduction.qmd`. This establishes the color-meaning mapping for the reader. Use `[**term**]{style="color: #hex;"}` syntax.

### 2.5-color-c. Color Key Terms in All Body Sections

For each body section:
- Identify 3-8 terms that belong to the color-mapped categories
- Color each term on its **first significant appearance** in the section
- Use `[**term**]{style="color: #hex;"}` for prose and `$\textcolor{#hex}{symbol}$` for inline math

### 2.5-color-d. Color Equations and "Where" Blocks

For each significant equation with a "where" block:
- Apply `\textcolor{#hex}{...}` to the 2-3 most important symbols in the equation
- Match the color in the "where" block definitions using both `$\textcolor{#hex}{symbol}$` for the math and `[term]{style="color: #hex;"}` for the prose description

### 2.5-color-e. Consistency Verification

After coloring all sections:
1. Grep for all hex color codes across all `.qmd` files
2. Verify each hex maps to exactly one concept category
3. Verify no two categories share the same or visually similar color
4. Verify total distinct colors is 3-5
5. Verify no colored terms appear inside callout boxes, exercise blocks, or the closing section

### 2.5-color-f. Chat

"Coloring pass complete. [N] colors assigned to [N] concept categories. [M] terms colored across [K] sections, [J] equations colored."

---

## STEP 2.6: Pedagogy Fix Subagent (Conditional — Only If Flags Exist)

After all section-editing subagents complete, the main agent collects their PEDAGOGY FLAG reports. **If any PEDAGOGY FLAGs were reported, the main agent spawns one additional subagent** — the "pedagogy fixer" — with different permissions and different context than the section-editing subagents.

**Why a separate subagent?** The section-editing subagents (Step 2) edit prose within a single section file. They cannot fix pedagogy issues because: (a) they lack source material to ground rewrites, (b) they lack cross-section context to detect premature abstraction, and (c) they are forbidden from changing content meaning. The pedagogy fixer has all three capabilities.

**If no PEDAGOGY FLAGs were reported, skip this step entirely.**

### 2.6a. Main agent prepares the dispatch (before spawning the fixer):

The main agent does the following preparation work BEFORE spawning the pedagogy fixer subagent. This ensures the fixer receives a focused, pre-curated set of sources rather than having to search through the entire TEXTBOOK-PLAN.md.

1. **Collect all PEDAGOGY FLAGs** from section-editing subagents.
2. **For each flag, identify the relevant sources.** Each section file has a "Sources for this section" collapsible callout at the top containing a table of sources with names, URLs, and summaries. The main agent looks up the source table for the section containing each flag, and extracts the local paths from TEXTBOOK-PLAN.md's Source Processing Log. Only sources listed in the flagged section's source table are relevant.
3. **Build a per-flag source manifest:**

```
PEDAGOGY FIX MANIFEST
======================
Flag 1: Analogy accuracy in _01-introduction.qmd line 30
  Description: "send 60% of the patient" creates false mental model
  Relevant sources (from _01's source table):
    - sources/arxiv-1701.06538/ (Shazeer 2017 — core MoE equation, gating)
    - sources/arxiv-2101.03961/ (Fedus 2022 — top-1 routing, aux loss)
    - sources/arxiv-2401.04088/ (Mixtral — top-2 routing)

Flag 2: Premature abstraction in _01-introduction.qmd line 30
  Description: "gradient is zero almost everywhere" — mechanism not yet shown
  Relevant sources: same as Flag 1 (same paragraph)
  Cross-section note: KeepTopK is introduced in _02-routing.qmd
```

### 2.6b. The pedagogy fixer subagent receives:

1. **The per-flag source manifest** (built by the main agent in 2.6a above), listing each flag with its description, file, line, and the specific source paths to read
2. **The paths to ALL section files** (for cross-section context, e.g., knowing that KeepTopK is defined in `_02`)
3. **The writing-style rules** (`writing-style.md`)
4. **Explicit permission to change content:** "You MAY rewrite flagged paragraphs, restructure them, move claims between paragraphs within the same file, rewrite analogies, and add limitation flags to imprecise analogies. You MUST NOT change unflagged paragraphs. You MUST NOT change LaTeX equations, D2 diagrams, code blocks, exercise blocks, cross-references, or section headings."

**The fixer does NOT receive the full TEXTBOOK-PLAN.md or the full Source Processing Log.** The main agent has already done the work of identifying which sources matter for each flag. The fixer reads only those sources.

### 2.6c. The pedagogy fixer's internal workflow:

**Step 0: Read sources and build context.**

Before touching any flagged paragraph:

1. For each flag in the manifest, read the listed source files from `AI-Learning-Gems/sources/`. Focus on the parts of each source that describe the mechanism the flagged paragraph discusses. For arXiv sources, read the relevant `.tex` section (the manifest may specify which). For blog sources, read the `content.md`.
2. Read the section files that contain flags AND any section files referenced in the manifest's cross-section notes (e.g., if a flag says "mechanism introduced in `_02`", read `_02`).
3. You do NOT need to read every section file in full. Read the flagged sections completely, and read other sections only to locate specific mechanisms referenced in the flags.

**Step 1: Fix each PEDAGOGY FLAG.**

For each flag, apply the appropriate fix strategy:

| Flag Type | Fix Strategy |
|---|---|
| **Analogy accuracy** (Rule 20c) | Read the source material to understand the actual mechanism. Rewrite the analogy so it accurately maps to the mechanism. If the analogy is fundamentally imprecise, add an explicit limitation at the point of introduction: "This analogy holds for X but breaks down for Y, as we will see in @sec-Z." If the analogy cannot be salvaged, replace it with one that is accurate. |
| **Premature abstraction** (Rule 20d) | Determine where the mechanism is actually introduced (which section, which paragraph). If the claim and the mechanism are in the same file, reorder paragraphs so the mechanism comes first. If they are in different files, rewrite the premature claim as a forward-looking teaser that does NOT assert the property: change "the gradient is zero almost everywhere" to "this creates a problem for gradient-based training that we will make precise in @sec-routing." |
| **Register collision** (Rule 20a, if not already fixed by section subagent) | Split the paragraph at the mode boundary. |
| **Cognitive overload** (Rule 20b, if not already fixed by section subagent) | Split the paragraph and add grounding (plain-language restatement or concrete example) between the new concepts. |

**Step 2: Verify rewrites against sources.**

After rewriting each flagged paragraph, re-read the source material and verify: does every factual claim in the rewritten paragraph appear in or follow from the sources? If not, remove the unsupported claim or find source support.

### 2.6d. The pedagogy fixer reports back:

1. What it changed (for each PEDAGOGY FLAG: the original text, the rewritten text, and which source grounded the rewrite)
2. Any flags it could NOT fix (e.g., the source material is insufficient, or the fix requires adding a new section)
3. Any new cross-reference additions (e.g., forward-pointers to later sections added as part of a premature-abstraction fix)

### 2.6e. Main agent reviews the fixer's changes:

Before proceeding to Step 3, the main agent reads the fixer's report and spot-checks:
- Do the rewritten paragraphs follow writing-style rules?
- Are the source attributions correct?
- Do the cross-references point to real section labels?

If any issue is found, the main agent fixes it directly (small corrections) or flags it for the user (large concerns).

---

## STEP 3: Main Agent Consistency Pass

After all subagents complete, the **main agent** reads all edited section files and performs cross-section checks. Subagents edit sections independently, so cross-section issues are invisible to them. This step catches what subagents cannot.

**3a. Re-read ALL rules files** from disk before starting this pass.

**3b. Re-read ALL edited section files** in their entirety.

**3c. Cross-section checks:**

1. **Notation consistency (RULE 21c):** Collect all "NOTATION GAP" flags from subagents. For each flagged symbol, verify it is genuinely cross-section (used in 2+ files). If so, add it to the notation table in `_01-introduction.qmd` with the 4-column format (Symbol, Definition, Valid Values, Example). If it is section-local, verify the subagent added an inline definition.
2. **Pedagogy fixes (from Step 2.6):** If the pedagogy fixer subagent ran, review its changes. Verify the rewritten paragraphs flow naturally with surrounding content. Check that any new cross-references (`@sec-*`) point to valid labels. If the fixer reported unresolvable flags, present those to the user: "UNRESOLVED PEDAGOGY FLAG: [description]. This requires author review."
2. **Cross-section terminology:** Ensure the same term is used for the same concept across all sections. If Section 2 calls it "the router" and Section 5 calls it "the gating network," pick one and make all sections consistent.
3. **Cross-section notation re-scan:** Grep all `.qmd` files for any remaining notation inconsistencies that subagents may have introduced (e.g., a subagent rewording a sentence and accidentally using the wrong symbol case).
4. **Figure/equation reference style:** Ensure consistent phrasing across sections.
5. **Transition quality:** Each section's closing paragraph should connect to the next section's topic.
6. **Inline citations:** Ensure every named work has a linked citation on first mention per section (Rule 11). Cross-check against source tables.
7. **Math Background references:** If the chapter has a `_98-math-background.qmd` appendix, verify forward-references at first mention of prerequisite concepts.
8. **Writing mode consistency:** In mathematical paragraphs, verify English is simple. In narrative paragraphs, verify word choice is precise.

**3d. Chat:** "Consistency pass complete. [N] cross-section fixes applied. [M] notation table entries added. [P] pedagogy flags resolved by fixer, [Q] unresolved (require author review)."

---

## STEP 4: Final Verification

The main agent performs a final automated scan across all files.

**4a. Re-read ALL rules files one final time.**

**4b. Run these searches across all `.qmd` files:**

1. **Notation:** Grep for common case-mismatch patterns (e.g., search for the lowercase version of every uppercase symbol in the notation table)
2. **Em dashes:** Grep for `—` (should be zero matches)
3. **Banned AI words:** Grep for the full banned-words list from Rule 7b
4. **Meta-commentary filler:** Grep for "worth noting", "important to note", "In essence", "Essentially,"
5. **Unlinked citations:** Grep for `(Name et al., 20` or `(Venue 20` patterns not inside markdown links
6. **Bare "this"/"these":** Grep for sentence-initial `". This [a-z]"` patterns (bare demonstrative followed by lowercase = likely missing noun)
7. **Symbol-initial sentences:** Grep for sentences starting with `$`
8. **Paragraph length:** Spot-check for paragraphs over 6 sentences

**4c. Fix any remaining issues found in 4b.**

**4d. Chat:** "Editing pass complete for `[index file path]`"

---

=== QUALITY CHECKLIST ===

Before marking the editing pass as complete, verify:

**Notation Consistency (Rule 21):**
- [ ] Every mathematical symbol matches the notation table in the first section
- [ ] No case mismatches (e.g., $n$ vs $N$) across any file
- [ ] All cross-section symbols are in the notation table (4-column format)
- [ ] Section-local symbols have inline definitions ("where $z$ is...")

**Pedagogical Coherence (Rule 20 + Step 2.6):**
- [ ] No paragraph mixes math-mode and narrative-mode prose (register coherence)
- [ ] No paragraph introduces 3+ genuinely new concepts (cognitive novelty budget)
- [ ] All analogies accurately represent the mechanism they illustrate, or flag their limitations explicitly
- [ ] No paragraph asserts properties of a mechanism the reader has not yet been shown (no premature abstraction)
- [ ] All PEDAGOGY FLAGs from section subagents were addressed by the pedagogy fixer (or reported as unresolvable)

**Semantic Concept Coloring (Step 2.5):**
- [ ] 3-5 concept categories identified and assigned colors from the `semantic-coloring.md` palette
- [ ] Color map documented (which hex = which concept category)
- [ ] Chapter Overview paragraph colors each conceptual pillar on first mention
- [ ] Each body section colors 3-8 key terms on first significant appearance
- [ ] Key equations use `\textcolor{#hex}{...}` on the 2-3 most important symbols
- [ ] "Where" blocks after equations match the equation's symbol colors
- [ ] No colored terms inside callout boxes, exercise blocks, or the closing section
- [ ] All hex codes are consistent: each hex maps to exactly one concept category across all files
- [ ] No two categories use perceptually similar colors (e.g., Indigo + Purple, or Sky + Teal)
- [ ] Total distinct colors is 3-5 (never more)

**Paragraph Clarity:**
- [ ] Every paragraph has one main idea
- [ ] No subordinate clause chains (3+ clauses)
- [ ] Examples are never buried in parentheticals
- [ ] Subject and verb are close in every sentence

**Sentence Quality:**
- [ ] Sentence length varies within each paragraph
- [ ] No paragraph has only long sentences (all 25+ words)
- [ ] Maximum 1 long sentence (25-35 words) per paragraph

**AI Tell Removal:**
- [ ] Zero em dashes remain
- [ ] No banned words from Rule 7b remain
- [ ] No filler phrases from Rule 7c remain
- [ ] No mechanical transitions from Rule 7d remain
- [ ] No synonym cycling (Rule 7e)

**Engagement:**
- [ ] Conversational tone throughout ("you" not "one")
- [ ] Enthusiasm calibrated to significance
- [ ] Concrete/visual language preferred over abstract hedging

**Preservation:**
- [ ] All LaTeX equations unchanged (except notation fixes)
- [ ] All diagrams, images, code blocks unchanged
- [ ] All cross-references intact
- [ ] All callout boxes preserved (type and title unchanged)
- [ ] Instructional pacing and structure preserved
- [ ] Factual content unchanged
- [ ] Exercise blocks preserved with correct structural syntax (bullet list options, `{...|...}` fill-in patterns, `correct` attributes, nested feedback divs all intact per `exercise-syntax.md`)

**Precision and Explicitness (Rule 12):**
- [ ] All procedure outputs are explicitly listed and named
- [ ] Both directions of symmetric relationships are stated
- [ ] Every number can be traced to a computation or table row
- [ ] Mappings to known frameworks use standard notation ($\mathbf{w}$, $\mathbf{x}$, etc.)
- [ ] Symbol domains/shapes are annotated inline ($\mathbf{w} \in \mathbb{R}^d$) and restated briefly at the start of subsections that reuse them

**Structure and Formatting (Rules 13-14):**
- [ ] Complex procedures end with a self-contained recipe summary
- [ ] Major transitions have "so far / now / why" orientation sentences
- [ ] Passages with 3+ parallel items use bullet lists or tables, not dense prose
- [ ] Bold used sparingly (1-2 per section) for critical takeaways
- [ ] Italics used for technical terms on first introduction

**Writing Mode (Rule 6):**
- [ ] Mathematical paragraphs use simple (8th-10th grade) English vocabulary
- [ ] Narrative paragraphs use precise, carefully chosen words
- [ ] No marketing language ("for free," "enormously useful," "elegant and powerful")
- [ ] No vague hedging in math context ("pin down," "tease apart," "nail down")

**Inline Citations (Rule 11):**
- [ ] Every named paper/method/framework has a linked citation on first mention per section
- [ ] Citation format is `ShortName ([Authors, Venue Year](URL))`
- [ ] URLs match those in the section's source table
- [ ] Second and later mentions in the same section use just the short name
- [ ] **No unlinked citations remain:** no parentheticals matching `(Author et al., YYYY)` or `(Venue YYYY)` that lack a `](http` hyperlink inside

**Information Flow and Clarity (Rules 15-17):**
- [ ] Each sentence opens with familiar info and closes with new info (given-new flow)
- [ ] No bare "this," "these," or "it" as sentence subjects without a clarifying noun
- [ ] Nominalizations (-tion, -ment, -ness, -ity) are converted to verbs where clearer
- [ ] No noun stacks with 3+ modifiers before the head noun; unpacked with prepositions

**Mathematical Prose (Rule 18):**
- [ ] No sentence starts with a mathematical symbol ($)
- [ ] Displayed equations have lead-in phrases and punctuation (comma or period)
- [ ] New symbols are defined immediately after the equation with "where"
- [ ] Conditional statements use "If ..., then ..." with explicit "then"

**Forecasting and Connectives (Rule 19):**
- [ ] Inline enumerations are preceded by a forecasting count ("three assumptions:")
- [ ] Additive connectives ("Moreover," "Additionally") are replaced with causal/contrastive ones when the real relationship is causal or contrastive
