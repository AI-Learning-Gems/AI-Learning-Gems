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
- The A-G instructional structure (example → explanation → visual → example → prompt → practice → transition)
- Factual claims, numbers
- Notation tables — do not change symbols, valid values, or examples. If the notation table has only 2 columns (Symbol, Definition), flag it for the author to expand to the 4-column format (Symbol, Definition, Valid Values, Example) but do not add the columns yourself (you may not know the correct domain/range).
- Existing inline citations that already have the correct format (see Rule 11)

---

=== THE EDITING RULES ===

**These rules elaborate on the principles in `writing-style.md`.** Apply each rule to every paragraph. If a paragraph already satisfies a rule, leave it alone.

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
- Self-explanation prompts (`.callout-tip` boxes)
- Think Hard callouts (`.callout-note` boxes) — edit prose inside them, but keep them
- Common Misconception callouts (`.callout-warning` boxes) — edit prose inside them, but keep them
- Faded practice checks
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

=== THE EDITING WORKFLOW ===

**CRITICAL: Do NOT ask the user for confirmation at any step. Execute the entire workflow autonomously.**

**CRITICAL: CONTEXT REFRESH.** Editing rules are long. By the time you reach the third or fourth section file, you will have lost the early rules from your context window. You MUST re-read the rule files before editing each section. This is not optional. Skipping this step causes the most common failure mode: early sections are well-edited, later sections are sloppy.

---

## STEP 1: Read Rules and Catalog Sections

**1a. Read ALL rule files (MANDATORY before any editing begins):**

Read these files in full. They contain the editing standards you will apply:

- `writing-style.md` — Sentence clarity, given-new flow, emphasis hierarchy, pronoun clarity, nominalization, connective hierarchy, mathematical prose, forecasting counts, AI tell avoidance, and all vocabulary/style rules
- `quarto-conventions.md` — Heading levels, LaTeX formatting, cross-references, image paths, callout syntax
- `visualization-standards.md` — Image handling, D2 diagrams, hvplot patterns (relevant when editing captions or checking image paths)

**1b. Read the index file and catalog sections:**

1. Read the index `.qmd` file
2. List all section files from the `{{< include >}}` statements
3. Chat: "Editing [N] sections in `[chapter name]`"

---

## STEP 2: Edit Each Section (One at a Time, with Context Refresh)

**CRITICAL: Edit one section file at a time. Do NOT batch multiple sections.** Each section is a self-contained editing task. If the chapter has 7 sections, that is 7 sequential passes, each starting with a fresh re-read of the rules.

**For each section file, follow this exact sequence:**

**2a. Re-read the writing rules (MANDATORY before EVERY section):**

Before touching a single paragraph, re-read the following file:

- `writing-style.md` — Re-read it in full. Pay particular attention to: the Emphasis Hierarchy table, the Given-New Contract, the Pronoun Clarity rule, the Nominalization Detection rule, the Connective Hierarchy, and the Forecasting Counts section. These are the rules most commonly forgotten by the time you reach later sections.

If the section contains equations or mathematical content, also re-read:

- `quarto-conventions.md` — Re-read the LaTeX Formatting section and the Cross-References section.

This re-read is not a suggestion. It is a hard requirement. The quality difference between "re-read rules, then edit" and "edit from memory" is stark, and the user will notice.

**2b. Read the section file in full.**

**2c. Scan for violations** of Rules 1-19.

**2d. Edit paragraph by paragraph:**
   - Apply Rule 1 (one idea per paragraph) — split where needed
   - Apply Rule 2 (no clause chains) — break long sentences
   - Apply Rule 3 (examples get space) — un-bury inline examples
   - Apply Rule 4 (subject-verb proximity) — restructure front-loaded sentences
   - Apply Rule 5 (sentence length variation) — mix short/medium/long
   - Apply Rule 6 (writing modes) — simplify English in math paragraphs, sharpen word choice in narrative paragraphs
   - Apply Rule 7 (AI tells) — fix em dash overuse, replace banned words, delete filler
   - Apply Rule 8 (preserve pacing) — do NOT compress good structure
   - Apply Rule 9 (tone) — ensure conversational but calibrated
   - Apply Rule 10 (terminology) — ensure consistency
   - Apply Rule 11 (inline citations) — ensure every named work has a linked citation on first mention
   - Apply Rule 12 (precision) — ensure all outputs, directions, and number sources are explicit
   - Apply Rule 13 (recipe summaries and orientation) — add self-contained summaries after complex procedures; add "so far / now / why" at major transitions
   - Apply Rule 14 (dense content formatting) — convert dense inline lists to bullets or tables
   - Apply Rule 15 (given-new flow) — each sentence opens with old info, closes with new info
   - Apply Rule 16 (pronoun clarity) — replace bare "this"/"these"/"it" subjects with "this + noun"
   - Apply Rule 17 (nominalization and noun stacks) — convert -tion/-ment nouns back to verbs; unpack 3+ modifier stacks
   - Apply Rule 18 (math prose integration) — no symbol-initial sentences; equations punctuated as grammar; "where" clauses; front-loaded conditionals
   - Apply Rule 19 (forecasting counts and connectives) — state counts before enumerating; prefer causal/contrastive over additive connectives

**2e. Write the edited file** using targeted `StrReplace` operations for individual paragraphs rather than rewriting entire files. This minimizes the chance of accidentally changing technical content.

**2f. Chat:** "Edited `[filename]`"

**2g. Repeat from step 2a** for the next section file. Do NOT skip the re-read.

---

## STEP 3: Consistency Pass

After all sections are edited:

1. **Check cross-section terminology:** Ensure the same term is used for the same concept across all sections
2. **Check figure/equation reference style:** Ensure consistent phrasing
3. **Check transition quality:** Each section's closing paragraph should connect to the next section's topic
4. **Check inline citations:** Ensure every named work has a linked citation on first mention per section (Rule 11). Cross-check against the source table at the top of each section.
5. **Check Math Background references:** If the chapter has a `_98-math-background.qmd` appendix, verify that body sections contain `(see @sec-math-background ...)` forward-references at the first mention of each prerequisite concept covered in the appendix.
6. **Check writing mode consistency:** In mathematical/derivation paragraphs, verify English is simple and explicit (Rule 6a). In narrative paragraphs, verify word choice is precise and real-world examples are concrete (Rule 6b).
7. Chat: "Consistency pass complete"

---

## STEP 4: Final Verification

1. **Scan for leftover AI tells:** Search all files for banned words from Rule 7b
2. **Check for em dashes in paragraph:** Flag any paragraph with em dashes
3. **Spot-check paragraph length:** Flag any paragraph over 6 sentences
4. **Check for uncited references:** Search all files for capitalized proper nouns referring to published works that lack a linked `([Authors, Venue Year](URL))` citation on first mention
5. **Scan for UNLINKED citations (CRITICAL):** Search all `.qmd` files for parentheticals that contain author names + year OR venue + year but do NOT contain `](http`. Specifically, search for patterns like `(Name et al., 20` or `(Name et al. 20` or `(NeurIPS 20` or `(ICLR 20` or `(ACL 20` or `(AAAI 20` or `(ICML 20` that are NOT inside a markdown link `[...](...)`. Every match is an unlinked citation that must be fixed by adding the URL.
5. **Scan for bare "this"/"these":** Search for sentence-initial "This " or "These " not followed by a noun (Rule 16)
6. **Scan for nominalizations:** Search for -tion, -ment, -ness, -ity nouns that hide actions; flag sentences where converting to a verb would be clearer (Rule 17a)
7. **Scan for symbol-initial sentences:** Search for sentences that start with `$` (Rule 18a)
8. Chat: "Editing pass complete for `[index file path]`"

---

=== QUALITY CHECKLIST ===

Before marking the editing pass as complete, verify:

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
- [ ] Maximum 2 em dashes per paragraph
- [ ] No banned words from Rule 7b remain
- [ ] No filler phrases from Rule 7c remain
- [ ] No mechanical transitions from Rule 7d remain
- [ ] No synonym cycling (Rule 7e)

**Engagement:**
- [ ] Conversational tone throughout ("you" not "one")
- [ ] Enthusiasm calibrated to significance
- [ ] Concrete/visual language preferred over abstract hedging

**Preservation:**
- [ ] All LaTeX equations unchanged
- [ ] All diagrams, images, code blocks unchanged
- [ ] All cross-references intact
- [ ] All callout boxes preserved (type and title unchanged)
- [ ] Instructional pacing and structure preserved
- [ ] Factual content unchanged

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
