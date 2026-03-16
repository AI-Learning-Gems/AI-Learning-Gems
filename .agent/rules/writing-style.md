
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
- Make the grammatical subject of each sentence the *agent* doing the action, and make the verb *be* the action itself. This is more general than "prefer active voice." A sentence like "The optimization performs gradient updates" is active voice but still unclear because "the optimization" is not really doing anything; the real character is the algorithm or the learner. Write "The algorithm updates the weights via gradient descent."
- Prefer 15-25 words per sentence. Long sentences (25-35 words) only when building momentum, maximum one per paragraph

**Given-New Contract (information flow):**

Begin each sentence with information the reader already knows (the *topic position*), and end with new, important information (the *stress position*). The new info in sentence N becomes the familiar info in sentence N+1. This creates a chain that pulls the reader forward. (See Gopen & Swan, "The Science of Scientific Writing," *American Scientist* 1990; Williams & Bizup, *Style: Lessons in Clarity and Grace*.)

- **BAD (new info first, context buried at end):** "A 12-layer Transformer with learned positional embeddings processes the resulting sequence of patch tokens. The Vision Transformer introduced this architecture."
- **GOOD (old info first, new info at end):** "The Vision Transformer processes images as sequences of patches. Each patch is projected into a token, and the resulting sequence is fed to a 12-layer Transformer with learned positional embeddings."

**Pronoun clarity ("this + noun" rule):**

Never use bare "this," "that," "it," or "these" as a sentence subject when the antecedent is ambiguous. Always follow the demonstrative with a clarifying noun (a *shell noun*): "this constraint," "this approach," "this result," "these gradients." Research shows "this + shell noun" accounts for over 40% of demonstrative usage in academic writing because it resolves ambiguity that bare "this" creates.

- **BAD:** "We compute the gradient and clip it to a maximum norm. This is then used to update the weights." (What is "this"? The gradient? The clipping? The computation?)
- **GOOD:** "We compute the gradient and clip it to a maximum norm. This clipped gradient is then used to update the weights."

**Nominalization detection:**

Nominalizations are verbs or adjectives converted into nouns (typically ending in *-tion, -ment, -ness, -ity, -ance, -ence*). They hide the action inside a noun and force the reader to reconstruct who did what. When you spot a nominalization, check whether the original verb is clearer.

- **BAD:** "The optimization of the loss function was performed using stochastic gradient descent."
- **GOOD:** "We optimized the loss function using stochastic gradient descent."
- **BAD:** "The establishment of convergence requires the satisfaction of several conditions."
- **GOOD:** "To establish convergence, several conditions must be satisfied."

**Noun stack unpacking:**

Noun stacks pile modifiers before a head noun without prepositions, forcing the reader to guess which word modifies which. Limit to 2 modifiers before a noun. If you have 3+, unpack with prepositions.

- **BAD:** "gradient descent learning rate schedule warm-up strategy"
- **GOOD:** "the warm-up strategy for the learning rate schedule in gradient descent"
- **BAD:** "pretrained language model fine-tuning data augmentation pipeline"
- **GOOD:** "the data augmentation pipeline for fine-tuning a pretrained language model"

**Concrete over abstract:**

Prefer concrete nouns and verbs that evoke mental images over abstract equivalents. Dual coding theory (Paivio) shows concrete words are recalled better because they activate both verbal and visual memory systems.

- **BAD:** "The model acquires the capacity to discriminate between visual categories."
- **GOOD:** "The model learns to tell cat photos from dog photos."
- **BAD:** "The utilization of attention mechanisms facilitates the identification of relevant features."
- **GOOD:** "Attention lets the model focus on the pixels that matter."

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
- Use **bold** sparingly for emphasis (see "Emphasis and Stress" section below for the full system).
- Use *italics* for technical terms on first introduction, and for gentle emphasis within a sentence.
- If a point is truly critical (the one thing a reader must not miss), put it in its own callout block or a blockquote. Do not bury it in a long paragraph.

---

## Emphasis and Stress (Making Key Points Land)

Most sentences in a textbook chapter are load-bearing but not landmark. A few sentences per section, however, carry the core insight: the one thing the reader must walk away with. The techniques below exist to make those sentences *land* rather than get scanned over.

The overarching principle is the **Von Restorff isolation effect**: a stimulus that differs from its surroundings is remembered better. For emphasis to work, it must be rare. If everything is emphasized, nothing is.

### The Emphasis Hierarchy (Use in This Order)

These are ordered from most subtle (and most frequent) to most visually heavy (and most rare).

| Level | Technique | Frequency | When to Use |
|---|---|---|---|
| 1. *Italics* | `*word*` | Freely | First introduction of a technical term; gentle stress on a word or short phrase within a sentence |
| 2. Plain-language restatement | `i.e.`, `that is`, apposition | As needed | After a formal or dense clause, restate it in plain words so the reader gets a second pass at the same idea |
| 3. Short emphatic sentence | Sentence rhythm | 1-2 per subsection | A short sentence after long ones creates a rhythmic jolt: "That's the key." |
| 4. **Bold phrase** | `**phrase**` | 1-2 per section | The single most important takeaway in a group of paragraphs; the sentence you'd highlight if you could only highlight one |
| 5. Standalone summary sentence | Structure | 1 per concept | After a derivation or explanation, a self-contained sentence that captures the whole point in one line |
| 6. Authority quote | Blockquote | 0-2 per section | A short quote from a foundational source (Halmos, Feynman, a seminal paper) that lends weight to a claim through credibility and memorability |
| 7. Callout box | `.callout-tip` / `.callout-warning` | 1-3 per section | For points that must not be missed: misconceptions, critical caveats, "Think Hard" questions |

### Bold: The One-Highlight Rule

**Bold exactly one phrase or sentence per cluster of paragraphs that develop a single idea.** If a subsection has three main ideas across nine paragraphs, it gets roughly three bolded phrases, each marking the peak of its cluster.

When you bold a phrase, you are telling the skimming reader: "If you read nothing else in these three paragraphs, read this." That contract only works if you honor it by *not* bolding anything else nearby.

**BAD (too much bold, nothing stands out):**
> **Self-attention** lets every token attend to every other token. This gives ViTs a **global receptive field** from the very first layer. **CNNs need dozens of layers** to achieve the same thing.

**GOOD (one bold phrase carries the point):**
> Self-attention lets every token attend to every other token. This gives ViTs a **global receptive field from the very first layer**, something CNNs need dozens of layers to achieve.

Do not bold entire sentences routinely. Bold a *phrase* within a sentence, so the sentence still reads naturally for the non-skimming reader. Reserve full-sentence bold for genuinely climactic points (at most once per section).

### Italics: The Workhorse

Italics do two jobs: (a) marking the first appearance of a technical term ("the *softmax* function"), and (b) providing gentle stress within a sentence ("the model doesn't just classify images; it *understands spatial relationships*"). Italics are subtle enough to use freely. They don't disrupt reading flow, and research confirms they produce less visual disruption than bold.

### Plain-Language Restatement ("i.e." / "that is" / Apposition)

After a formal or dense statement, immediately restate the same idea in concrete, everyday language. This gives the reader two bites at the same concept, which research on elaboration shows improves both recall and deeper comprehension.

Effective patterns:

- **"i.e." or "that is":** "The model minimizes cross-entropy loss, i.e., it tries to make its predicted probabilities match the true labels as closely as possible."
- **Apposition (renaming):** "The softmax temperature $\tau$, a scalar that controls how peaked or flat the output distribution is, defaults to 1.0."
- **"In other words":** Use sparingly and only when the restatement is genuinely simpler, not merely a synonym swap.
- **"Put differently" / "To put it concretely":** Good when shifting register from math to intuition.

The restatement should be *shorter and more concrete* than the original. If it is longer, it's an explanation, not a restatement.

### Repetition That Earns Its Keep (Say It Differently, Not Again)

Repeating a key point improves retention, but only when each repetition adds a new angle or register. Rote repetition ("as we mentioned above") wastes the reader's time and signals padding. *Meaningful* repetition restates the point in a new way that deepens understanding.

The pattern: **state it formally, then state it intuitively, then show it concretely.**

> The posterior is proportional to the product of the prior and the likelihood.
>
> In plain terms: your updated belief combines what you believed before with the evidence you just saw.
>
> If your prior says "this coin is probably fair" and you observe 8 heads out of 10 flips, the posterior shifts toward "this coin is biased," but doesn't abandon the prior entirely.

That is three statements of the same idea. Each earns its place because it uses a different register (mathematical, intuitive, concrete example). If any of the three were removed, the reader would lose something.

### Authority Quotes (Lending Weight Through Credibility)

A well-placed quote from a recognized authority can do something that your own prose cannot: it signals that this idea has been vetted by the broader community, and it gives the reader a memorable, quotable formulation they may already associate with a trusted name.

**When to use:**
- When a foundational figure said it better or more memorably than you can
- When you need to lend credibility to a claim that might seem surprising
- When a quote captures the *spirit* of a concept in a way that sticks

**Format:**

> "The best notation is no notation; whenever it is possible to avoid the use of a complicated alphabetic apparatus, avoid it." — Paul Halmos, *How to Write Mathematics* (1970)

**Rules for authority quotes:**
- Keep them short (1-2 sentences). Long block quotes get skipped.
- Always attribute with author name, work title, and year.
- Place the quote *after* your own explanation, as reinforcement, not before it as a substitute. The reader should understand the point from your prose; the quote adds weight and memorability.
- Maximum 1-2 per section. Overuse makes the text feel like a literature review rather than a textbook.

### Structural Emphasis (Whitespace and Isolation)

Sometimes the most effective emphasis is structural: you make a sentence stand out by *where you put it*, not by how you format it.

- **A one-sentence paragraph** after several longer paragraphs creates a rhythmic stop that forces attention. Use this for the single most important takeaway after a complex explanation.
- **A colon followed by a standalone line** works similarly: "The result is simple: every comparison is an independent coin flip."
- **White space** (an extra blank line, a horizontal rule) signals a conceptual break that makes the reader pause.

These structural techniques are powerful precisely because they are invisible: the reader feels the emphasis without seeing any formatting. Use one-sentence paragraphs sparingly (at most 1-2 per section) or they lose their punch.

### What NOT to Emphasize

The seductive-details effect (Mayer, Harp & Mayer 1998) shows that interesting-but-irrelevant elaboration actively harms learning by diverting attention from core content. Apply the same discipline to emphasis:

- Do not bold tangential observations, historical asides, or "fun facts"
- Do not bold definitions (use *italics* for the term being defined; the surrounding sentence is the definition)
- Do not bold transitions, topic sentences, or section openings (the heading already signals importance)
- Do not use emphasis to compensate for unclear writing; fix the writing instead

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

### Transitions and Connective Hierarchy

Standard English transitions ("However," "Therefore," "In contrast," "For example") are legitimate and should be kept. Research shows that *causal* and *contrastive* connectives measurably improve comprehension, while *additive* connectives ("moreover," "additionally") sometimes don't. Prefer the connective that names the real logical relationship.

**High-value connectives (use freely):**
- **Causal:** "because," "since," "so," "therefore," "as a result" — these tell the reader *why*
- **Contrastive:** "however," "but," "unlike," "in contrast," "conversely" — these tell the reader *what's different*

**Medium-value connectives (fine when accurate):**
- **Sequential:** "first, ... second, ... finally, ..." — signaling order
- **Exemplifying:** "for example," "specifically," "to illustrate" — signaling an instance

**Low-value connectives (replace with the real relationship when possible):**
- "Moreover, ..." / "Furthermore, ..." / "Additionally, ..." — these say "here is more" but don't say *how* it connects. Often the real relationship is causal or contrastive, and naming it helps the reader more. Use additive connectives only when the relationship genuinely is "here is another independent point."

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

## Mathematical Prose Integration

These rules govern how equations connect to the surrounding text. They complement the "Mathematical/Derivation Paragraphs" mode above, which covers *vocabulary*; this section covers *mechanics*.

**Never start a sentence with a mathematical symbol.** Write "The vector $\mathbf{x}$..." not "$\mathbf{x}$ is..." This is a universal convention in mathematical writing (Halmos 1970, Knuth 1987, AMS Style Guide).

**Treat displayed equations as grammatical parts of the sentence.** A displayed equation is a noun or clause inside your sentence. It needs a lead-in phrase ("the loss is given by," "we can express this as") and punctuation (a comma if a "where" clause follows, a period if the sentence ends).

- **BAD:** "The loss function is: $$ L = -\sum \log p_i $$ Where $p_i$ is the predicted probability."
- **GOOD:** "The loss function is $$ L = -\sum \log p_i, $$ where $p_i$ is the predicted probability for example $i$."

**Define variables immediately with "where."** After a displayed equation, list all new symbols with a "where" clause or a compact definition list. Do not make the reader scroll back to the notation table.

**Use lead-in phrases, not bare pointers.** Write "the probability simplifies to" rather than "see the following equation" or "the equation below shows."

**Front-load conditionals with explicit "then."** In conditional statements, place the condition first and include "then" to mark the clause boundary: "If the learning rate is too high, then the loss diverges." Without "then," readers cannot determine where the condition ends until reaching the sentence's end.

---

## Forecasting Counts

When a paragraph or passage will enumerate multiple items, **state the count before listing them**. The count primes the reader's working memory: they know exactly how much to expect and can track their position.

- **BAD:** "The BT model assumes comparisons are independent, each item has a single fixed strength, and ties are not possible."
- **GOOD:** "The BT model makes three assumptions: (a) comparisons are independent; (b) each item has a single fixed strength; and (c) ties are not possible."

The count ("three assumptions") is the *forecasting sentence*. The inline enumeration `(a) ...; (b) ...; and (c) ...` is the *formatting*. Both are needed. The forecasting count tells the reader how much to allocate; the inline markers tell them where each item's boundary is.

Use this pattern for 2-5 inline items. For 5+ items, switch to a vertical bullet list.

**Accepted enumeration formats (pick one and use it consistently within a paragraph):**

- `(a) ...; (b) ...; and (c) ...` (lowercase letters)
- `(i) ...; (ii) ...; and (iii) ...` (lowercase Roman numerals)
- `(1) ...; (2) ...; and (3) ...` (numbers)

---

## Pedagogical Coherence (Paragraph-Level Instructional Design)

The rules above govern how individual sentences and paragraphs are *expressed*. The three rules below govern whether a paragraph's *pedagogical logic* is sound: whether it teaches in the right order, at the right density, and with accurate scaffolding. These rules matter because a paragraph can have perfect prose (no AI tells, good rhythm, clean given-new flow) and still fail as instruction.

### Register Coherence (No Mid-Paragraph Mode Switches)

A paragraph must stay in one writing register throughout. The "Two Writing Modes" section above defines math-mode prose (simple English, no figurative language) and narrative-mode prose (vivid, precise word choice, analogies allowed). **Do not switch between these registers within a single paragraph.**

The trigger for math-mode is *mathematical content*, not *mathematical notation*. A sentence that says "the gradient of a hard selection is zero almost everywhere" is making a mathematical claim even though it contains no `$` symbols. If a paragraph contains any sentence that asserts a property about gradients, derivatives, convergence, bounds, distributions, or optimization, the entire paragraph should use math-mode prose: simple vocabulary, no analogies, no figurative language.

**BAD (register collision: analogy + math claim + rhetorical question in one paragraph):**
> Picking the top-k experts is like choosing which restaurant to eat at. You either go or you don't. In calculus terms, the gradient of a hard selection is zero almost everywhere. So how does the system learn?

**GOOD (separate paragraphs, each in one register):**
> Think of the top-k selection as choosing which restaurant to eat at: you either go or you don't. There is no "half-visit."
>
> That discrete choice creates a calculus problem. The gradient of the selection function is zero for every non-selected option. The optimizer gets no signal about whether a different choice would have been better.
>
> So how does the router learn? Through an auxiliary loss that we will derive in @sec-load-balancing-loss.

**Test:** Read the paragraph and label each sentence as "math" or "narrative." If both labels appear, split the paragraph at the mode boundary.

### Cognitive Novelty Budget (Max 2 New Concepts Per Paragraph)

Count the number of concepts a paragraph introduces that are *genuinely new* to the reader at that point in the chapter. A concept is "new" if it has not been explained in a prior paragraph or section. **If the count exceeds 2, split the paragraph.**

This is more demanding than "one idea per paragraph" (which tests *thematic* unity). A paragraph can be thematically unified (all sentences are about the same topic) but still overload working memory if each step in the chain requires the reader to absorb a concept they have never seen before. The research on working memory capacity (Miller 1956, Cowan 2001) shows 3-4 items for complex material; 2 new concepts leaves room for the reader to also hold context from the prior paragraph.

**BAD (4 new concepts in one paragraph: "discrete decision," "gradient of a hard selection," "zero almost everywhere," "undefined at the boundary"):**
> Picking the top-k experts is a hard, discrete decision. The gradient of a hard selection is zero almost everywhere and undefined at the boundary. So the router cannot learn about non-selected experts.

**GOOD (1-2 new concepts per paragraph, with grounding):**
> Picking the top-k experts is a hard, discrete decision: either a token goes to Expert 3 or it does not. There is no "partly selected."
>
> Why does this matter for training? Because gradient-based optimization needs smooth functions. If you change the router weights by a tiny amount and the same two experts are still selected, then the selection function did not change. Its gradient is zero. The optimizer has no signal about whether different experts would have been better.

**Test:** For each sentence in the paragraph, ask: "Has the reader seen this concept before?" If two or more sentences introduce genuinely new concepts, the paragraph needs splitting.

### Analogy Accuracy (Analogies Must Not Create False Mental Models)

When a paragraph introduces an analogy (mapping a technical concept to a familiar domain), **the analogy must accurately represent the mechanism it illustrates at every point where the text draws on it.** If the analogy will be contradicted or corrected later in the chapter, you must either:

- (a) **Flag the limitation explicitly** at the point of introduction: "This analogy holds for the selection step, but breaks down for the weighting step, as we will see."
- (b) **Replace the analogy** with one that does not need correction.

An analogy that creates a mental model the reader must later *un-learn* is worse than no analogy at all. The cognitive science research on Representational Change Theory shows that restructuring an incorrect mental model is harder than building a correct one from scratch, because the incorrect model must first be inhibited before the correct one can form.

**BAD (analogy creates a false model that later content contradicts):**
> There is no "send 60% of the patient to the cardiologist."

(In MoE, gate weights *are* fractional: $G(x)_4 = 0.77$ means Expert 4 contributes 77%. The analogy conflates the discrete *selection* step with the continuous *weighting* step.)

**GOOD (analogy is accurate, or limitation is flagged):**
> The triage nurse picks *which* two specialists to call. That binary decision has no gradient. But once the specialists are chosen, the nurse also decides how much weight to give each opinion. The "which" is discrete; the "how much" is continuous.

**Test:** For each analogy, trace it forward through the chapter. Does any later paragraph contradict or refine the mental model the analogy creates? If so, flag the limitation at the point of introduction, or replace the analogy.

### Top-Down Readability (No Forward Dependencies Within a Section)

**Every paragraph must be comprehensible given only the paragraphs that precede it.** If paragraph P uses a concept, term, or symbol that is only explained in paragraph Q, where Q comes *after* P in the same section, that is a *forward dependency*. The reader going top-to-bottom hits a wall at P.

This applies to three kinds of forward dependencies:

1. **Undefined symbols.** A mathematical symbol ($G(x)$, $f_i$, $E_i(x)$) appears in prose before the reader has been told what it represents. The notation table may define it, but if the notation table comes later in the section, the reader hasn't seen it yet.
2. **Undefined terms.** A technical term ("the gate vector," "the dispatch fraction," "the capacity factor") appears before being defined. The reader encounters the label but has no concept to attach it to.
3. **Unexplained mechanisms.** A paragraph describes what a mechanism *does* (e.g., "the router selects the top-k experts") before the reader has been told *what the mechanism is* (e.g., what a router is, what top-k means).

**The fix is not "remove the content from paragraph P."** The content may genuinely belong in the early overview. The fix is one of:

- **(a) Add an inline definition at first use.** When using a symbol or term for the first time, define it parenthetically: "the *gate vector* $G(x)$ (the vector of weights the router assigns to each expert) has at most $k$ nonzero entries."
- **(b) Rewrite without the symbol.** If the paragraph is a narrative overview, plain language may be clearer: "only a handful of experts activate per token" instead of "$G(x)$ has at most $k$ nonzero entries."
- **(c) Reorder paragraphs** so the defining paragraph comes before the using paragraph.

**BAD (symbol used 3 paragraphs before it is defined):**

> (Line 43) MoE models are sparse because the gate vector $G(x)$ has at most $k$ nonzero entries out of $N$.
>
> ... [3 paragraphs about history and architecture] ...
>
> (Line 49) The operation is summarized by $y = \sum G(x)_i \cdot E_i(x)$, where $G(x)_i$ is the gate weight for expert $i$.

**GOOD (inline definition at first use):**

> MoE models are sparse because only a few experts activate per token. The router produces a *gate vector* $G(x)$, a set of weights indicating how much each expert should contribute. Most entries in $G(x)$ are zero; at most $k$ out of $N$ are nonzero.

**GOOD (plain language in overview, notation deferred to body):**

> MoE models are sparse: for any given token, only a handful of the $N$ experts actually compute an output. The rest sit idle.

**Test:** Read the section from top to bottom. At each paragraph, ask: "Does this paragraph use any term, symbol, or concept that has not appeared in any earlier paragraph?" If yes, either add an inline definition or reorder.

---

## Inline Citations

**Every inline citation MUST be a clickable hyperlink.** A citation without a URL is not a citation; it is a name-drop. The reader must be able to click through to the source.

Every time the text mentions a specific paper, method, framework, benchmark, or other published work by name, the **first mention in each section** must include an inline citation with:
1. The author(s) (use "et al" for 3+ authors)
2. The venue and year
3. A hyperlink to the paper (arXiv, DOI, or official URL)

Subsequent mentions in the same section can use just the short name without re-citing.

**Format:** `ShortName ([Authors, Venue Year](URL))`

### Detecting Unlinked Citations (CRITICAL)

An unlinked citation is any mention of a published work that includes metadata (author names, venue, year) but no clickable URL. These are the most common failure mode in LLM-generated text. Learn to recognize these patterns so you can fix them during both writing and editing:

| Unlinked Pattern (BAD) | What's Wrong | Fix |
|---|---|---|
| `RLHF (Christiano et al., 2017)` | Has authors and year but no URL | Add link: `RLHF ([Christiano et al., 2017](https://arxiv.org/abs/1706.03741))` |
| `PPO (Schulman et al., 2017)` | Same: parenthetical citation without hyperlink | Add link: `PPO ([Schulman et al., 2017](https://arxiv.org/abs/1707.06347))` |
| `the ReAct framework (Yao et al., NeurIPS 2023)` | Has venue but no URL | Add link: `ReAct ([Yao et al., NeurIPS 2023](https://arxiv.org/abs/2210.03629))` |
| `TextGrad introduced backpropagation for text` | Named method, no citation at all | Add full citation: `TextGrad ([Yuksekgonul et al., NeurIPS 2024](https://arxiv.org/abs/2406.07496))` |
| `as shown by Chen et al. (2024)` | Author-year but no link | Add link: `as shown by [Chen et al. (2024)](https://arxiv.org/abs/...)` |
| `(ICLR 2025)` or `(NeurIPS 2024)` after a method name | Venue-year tag without hyperlink | Look up the paper and add a full linked citation |

**The test is simple:** search the text for these regex-like patterns:
- Parenthetical with author names and a year: `(AuthorName et al., YYYY)` or `(AuthorName et al. YYYY)` or `(AuthorName, YYYY)`
- Parenthetical with a venue and year: `(VenueName YYYY)` such as `(NeurIPS 2024)`, `(ICLR 2025)`, `(ACL 2023)`
- Any of the above that do NOT contain `](http` (i.e., no hyperlink inside)

If any of these patterns appear without a URL, the citation is broken and must be fixed.

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
