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

Apply these rules to every paragraph. If a paragraph already satisfies a rule, leave it alone.

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

## RULE 6: Paint a Picture With Precise Common Words

The best technical explanations create a mental image. Prefer concrete, spatial, visual language over abstract hedging.

**Choose the precise common word.** Good writing finds the single word that makes the idea apparent. Prefer words that every English reader (including non-native speakers) understands conceptually: "substitution," "apparent," "overlap," "shortcut," "bottleneck." These are better than idioms ("get the ball rolling"), phrasal verbs ("pick up on"), or vague abstract nouns ("implications," "considerations").

| Abstract/Hedging | Concrete/Visual |
|---|---|
| "The information is propagated through the network" | "The signal flows forward through the network, layer by layer" |
| "This has implications for feature extraction" | "This means you can tap into any ViT layer for features, early or late, and get useful representations" |
| "The model leverages the representations" | "The model reads these features and uses them to..." |
| "The approach has several considerations" | "The approach has two costs: higher memory and slower training" |
| "It utilizes a mechanism that facilitates..." | "It uses a mechanism that helps..." |

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
- Math Background appendix (`_98-math-background.qmd`) — edit prose inside it, but preserve all formulas, cross-references, and the subsection structure. The same editing rules (Rules 1-11) apply to Math Background prose.

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

Every time the text mentions a specific paper, method, framework, benchmark, or other published work by name, the **first mention in each section** must include an inline citation with:
1. The author(s) (use "et al" for 3+ authors)
2. The venue and year
3. A hyperlink to the paper (arXiv, DOI, or official URL)

Subsequent mentions in the same section can use just the short name without re-citing.

**Where to find citation info:** Each section has a **"Sources for this section"** collapsible callout at the top containing a table with the source name, URL, and venue. Use this table to look up the correct URL, authors, and venue for every reference mentioned in the section's prose. If a reference is mentioned in the prose but not in the source table, search for it in other section source tables or in the `sources/` directory.

**Format:** `ShortName ([Authors, Venue Year](URL))`

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

**Test:** Read through each paragraph. For every capitalized proper noun that refers to a published work, check: does the first mention in this section include `([Authors, Venue Year](URL))`? If not, add it using the source table at the top of the section.

---

=== THE EDITING WORKFLOW ===

**CRITICAL: Do NOT ask the user for confirmation at any step. Execute the entire workflow autonomously.**

---

## STEP 1: Read and Catalog

1. Read the index `.qmd` file
2. List all section files from the `{{< include >}}` statements
3. Chat: "Editing [N] sections in `[chapter name]`"

---

## STEP 2: Edit Each Section

For each section file:

1. **Read the entire file**
2. **Scan for violations** of Rules 1-11 above
3. **Edit paragraph by paragraph:**
   - Apply Rule 1 (one idea per paragraph) — split where needed
   - Apply Rule 2 (no clause chains) — break long sentences
   - Apply Rule 3 (examples get space) — un-bury inline examples
   - Apply Rule 4 (subject-verb proximity) — restructure front-loaded sentences
   - Apply Rule 5 (sentence length variation) — mix short/medium/long
   - Apply Rule 6 (concrete language) — replace abstract hedging with vivid language
   - Apply Rule 7 (AI tells) — fix em dash overuse, replace banned words, delete filler
   - Apply Rule 8 (preserve pacing) — do NOT compress good structure
   - Apply Rule 9 (tone) — ensure conversational but calibrated
   - Apply Rule 10 (terminology) — ensure consistency
   - Apply Rule 11 (inline citations) — ensure every named work has a linked citation on first mention
4. **Write the edited file**
5. Chat: "Edited `[filename]`"

**Editing granularity:** Use targeted `StrReplace` operations for individual paragraphs rather than rewriting entire files. This minimizes the chance of accidentally changing technical content.

---

## STEP 3: Consistency Pass

After all sections are edited:

1. **Check cross-section terminology:** Ensure the same term is used for the same concept across all sections
2. **Check figure/equation reference style:** Ensure consistent phrasing
3. **Check transition quality:** Each section's closing paragraph should connect to the next section's topic
4. **Check inline citations:** Ensure every named work has a linked citation on first mention per section (Rule 11). Cross-check against the source table at the top of each section.
5. **Check Math Background references:** If the chapter has a `_98-math-background.qmd` appendix, verify that body sections contain `(see @sec-math-background ...)` forward-references at the first mention of each prerequisite concept covered in the appendix.
6. Chat: "Consistency pass complete"

---

## STEP 4: Final Verification

1. **Scan for leftover AI tells:** Search all files for banned words from Rule 7b
2. **Check for em dashes in paragraph:** Flag any paragraph with em dashes
3. **Spot-check paragraph length:** Flag any paragraph over 6 sentences
4. **Check for uncited references:** Search all files for capitalized proper nouns referring to published works that lack a linked `([Authors, Venue Year](URL))` citation on first mention
5. Chat: "Editing pass complete for `[index file path]`"

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

**Inline Citations (Rule 11):**
- [ ] Every named paper/method/framework has a linked citation on first mention per section
- [ ] Citation format is `ShortName ([Authors, Venue Year](URL))`
- [ ] URLs match those in the section's source table
- [ ] Second and later mentions in the same section use just the short name
