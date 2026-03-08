
# Writing Style Rules

Shared writing style rules for all textbook chapter workflows (research, write, edit, update).

**Target reader:** Someone with strong reading comprehension and technical background who is new to this specific topic. Write with depth and precision, not oversimplification.

---

## Engaging Writing (Make It Unputdownable)

The best technical textbooks (MacKay, Sutton & Barto, Feynman) are engaging because they use techniques from great non-fiction writing. Apply these:

### Conversational Tone (Like Explaining to a Smart Friend)

- Write as if you're having a conversation with the reader
- Address the reader as "you" directly
- Show enthusiasm: "This is the beautiful part." "Here's where it gets interesting."
- Acknowledge when something is confusing: "This trips up everyone at first."
- Be intellectually honest about uncertainty: "We don't fully understand why, but..."

### Sentence Rhythm and Variety (Gary Provost's Principle)

**Vary sentence length deliberately.** Short sentences punch. Long sentences build momentum and carry the reader through complex ideas with the energy of a crescendo.

- **Short sentences for emphasis:** "That's wrong." "Here's why." "This matters."
- **Medium sentences for flow:** Carry the main explanation forward.
- **Long sentences for buildup:** Where appropriate, build momentum.
- **Deliberate fragments for punch:** "Music." "Exactly." "Finally."

### Micro-Surprises and Dopamine Hits

Keep readers engaged with small rewards throughout:

| Technique | Example |
|---|---|
| **Surprising facts** | "You might expect X, but actually Y" |
| **Rhetorical questions** | "But wait — how can that be?" |
| **Vivid analogies** | "Like untangling earbuds — tedious, but oddly revealing" |
| **Pattern interrupts** | Start a section with something unexpected |
| **Open loops** | Tease what's coming: "We'll see why this matters in Section 3" |
| **Enthusiasm markers** | "This is where it gets good." |

### Motivation Before Formalism

Always answer "why should I care?" BEFORE "how does it work?"

**WRONG (formalism first):**
> Definition: A confidence interval is a range of values, derived from sample statistics...

**RIGHT (motivation first):**
> Imagine you measure the heights of 100 people and get an average of 170 cm. But you know that's not *exactly* the true average — you just happened to measure these 100 people. A confidence interval gives you a range...

---

## Basic Style Rules

**One idea per paragraph:**
- Each paragraph should introduce ONE idea and explain it fully
- If you catch yourself writing "additionally" or "moreover" mid-paragraph, you probably need a new paragraph
- If a paragraph has multiple ideas, split it and add a bridging sentence between the new paragraphs
- Target 2-5 sentences per paragraph; 6+ is a warning sign

**Sentence clarity:**
- Maximum two clauses joined by a comma. Never chain three or more clauses ("X, which Y, allowing Z")
- Keep subject and verb close — do not front-load long modifiers before the main verb
- Active voice preferred, but passive is fine when appropriate
- Prefer 15-25 words per sentence. Long sentences (25-35 words) only when building momentum, maximum one per paragraph

**Examples get their own space:**
- Never bury a concrete example inside a parenthetical or subordinate clause
- Examples are the most valuable part of the text — give them their own sentence or line
- Separate the example from the explanation it illustrates with a clear lead-in

**Vocabulary:**
- Define every technical term on first use
- Use the SAME word for the SAME concept throughout (no synonym cycling: "the encoder"/"the model"/"the network"/"the system")
- Technical jargon is fine if defined; avoid domain-specific jargon that only experts would know
- Prefer common words: "use" not "utilize," "help" not "facilitate," "start" not "commence"

**Chunking:**
- Group related content logically with visual breaks
- Clear heading hierarchy: H1 → H2 → H3
- Use white space between sections to signal chunk boundaries

---

## Two Writing Modes: Mathematical vs. Narrative

Technical chapters alternate between two kinds of prose. Each has different rules for word choice and style.

### Mathematical/Derivation Paragraphs

When the content is heavy with equations, derivations, or formal definitions, **simplify the English radically**. Use 8th-to-10th-grade vocabulary. Do not mix complex math with complex English; the reader's cognitive load is already on the math.

**Specifically:**
- Use short, direct sentences: "This is X." "It means Y." "We plug in Z."
- Avoid idioms, metaphors, and figurative language entirely.
- Avoid vague hedging words like "pin down," "nail down," "tease apart." Replace with precise plain language: "estimate precisely," "determine," "separate."
- State every claim fully and explicitly. If a formula produces three outputs, list all three. If a symbol has a special meaning, say so in plain words.
- When a concept maps to something the reader already knows (e.g., "this is just logistic regression"), spell out the mapping explicitly: what is $\mathbf{w}$? What is $\mathbf{x}$? What is $y$? Show it in a table or a bullet list, not buried in prose.

### Narrative/Conceptual Paragraphs

When the content is conceptual, motivational, or historical (no equations on screen), you have more freedom with word choice. Here, **precision comes from choosing exactly the right word**, not from formulas.

**Specifically:**
- Obsess over word choice. The right word conveys meaning that three weaker words cannot. Prefer "bottleneck" over "limiting factor in the pipeline," "brittle" over "not very robust."
- Idioms and metaphors are fine *if* they are precise and well-placed. "A coin flip" for $P = 0.5$ is clear. "Opening a can of worms" is vague.
- Connect to the real world. Concrete examples from domains the reader knows (chess ratings, Tinder, coffee taste tests) help abstract concepts land.
- Use **bold** sparingly (once or twice per section) to mark the single most important takeaway in a passage.
- Use *italics* for technical terms on first introduction, and for gentle emphasis within a sentence.
- If a point is truly critical (the one thing a reader must not miss), put it in its own callout block or a blockquote. Do not bury it in a long paragraph.

### No Marketing Language

In both modes, remove promotional or salesy phrasing. Let the content speak for itself.

| Marketing Language | Plain Alternative |
|---|---|
| "for free" / "you get X for free" | "X is included" / "X comes from the same procedure" |
| "enormously useful" | "useful" (or just show why) |
| "elegant and powerful" | (describe what it does; the reader decides if it's elegant) |
| "per annotation dollar" | "per comparison" |
| "one of the most thoroughly engineered" | (just say what it provides) |

---

## Avoid AI Writing Tells

- No em dashes. Prefer periods (new sentences), commas, colons, or semicolons (for a mental break between two related ideas; at most one semicolon per few sentences). Parentheses are good for reminding and connecting concepts.
- Do not use these words in figurative/non-technical senses: "delve," "tapestry," "navigate," "landscape," "multifaceted," "leverage," "utilize," "realm," "endeavor," "aforementioned," "pivotal," "underscores." (Technical uses are fine, e.g., "financial leverage," "optimization landscape.")
- Do not use meta-commentary filler: "It's worth noting that...," "It is important to note that...," "It should be noted that...," "In essence...," "Essentially,...." These talk *about* the text instead of advancing it. Just state the point.
- Legitimate emphasis transitions are fine: "Interestingly," "Importantly," "Surprisingly," "Crucially" when they serve a genuine rhetorical purpose.
- Standard logical transitions are fine: "However," "Therefore," "For example," "In contrast," "Moreover" (when genuinely adding a new supporting point, not as paragraph-opening filler).
- Prefer the precise common word that makes the idea apparent: "substitution," "bottleneck," "shortcut," "overlap" are better than idioms or vague abstractions ("implications," "considerations").

### Banned Words and Phrases (Figurative/Non-Technical Usage)

**Exception:** if the word is used as a genuine technical term in context (e.g., "financial leverage," "paradigm shift" when discussing Kuhn, "landscape" in optimization), keep it.

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

### Meta-Commentary Filler Phrases

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

### Transitions

Standard English transitions ("However," "Therefore," "In contrast," "For example") are legitimate and should be kept.

**Transitions that are fine:**
- "However, ..." / "But ..." — signaling contrast
- "Therefore, ..." / "Thus, ..." / "As a result, ..." — signaling consequence
- "For example, ..." / "Specifically, ..." / "To illustrate, ..." — signaling an example
- "In contrast, ..." / "Conversely, ..." — signaling opposition
- "First, ... Second, ... Finally, ..." — signaling sequence
- "Moreover, ..." / "Furthermore, ..." / "Additionally, ..." — fine when genuinely adding a new supporting point, not as paragraph-opening filler

**Transitions to replace** (these feel robotic when overused):

| Robotic | Better Alternative |
|---|---|
| "Let us now turn to..." | Connect the next idea to the current one naturally |
| "Having established X, we can now..." | "X raises a question: ..." or "X tells us something about Y..." |
| "With that in mind, ..." | (Usually unnecessary; just state the next point) |
| "It is also worth considering..." | (Just state the consideration) |

### Synonym Cycling

Use the **same word for the same concept** throughout. Do not alternate synonyms for variety. If you introduced something as "the encoder," do not later call it "the model," "the network," "the architecture," and "the system" within the same section. Pick one and stick with it.

### Vocabulary as a Mapping

When a concept from one domain (e.g., preference modeling) maps onto a well-known concept from another domain (e.g., logistic regression), **state the mapping explicitly as a table or bullet list**, then define which term you will use going forward. After declaring the mapping, use **only the chosen term** for that concept.

---

## Inline Citations

Every time the text mentions a specific paper, method, framework, benchmark, or other published work by name, the **first mention in each section** must include an inline citation with:
1. The author(s) (use "et al" for 3+ authors)
2. The venue and year
3. A hyperlink to the paper (arXiv, DOI, or official URL)

Subsequent mentions in the same section can use just the short name without re-citing.

**Format:** `ShortName ([Authors, Venue Year](URL))`

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
