# Semantic Concept Coloring

Rules for applying consistent semantic color-coding to key concepts throughout textbook chapters. This technique uses author-provided color as a **visual signal** (Mayer's Signaling Principle) to help readers mentally separate and track concept categories.

**Research basis:** Color-coding is a form of visual signaling with meta-analytic support (Alpizar et al. 2020, g = 0.22; Richter et al. 2016, d = 0.22). Liu et al. (2021) found large effect sizes (eta-squared = 0.23) with lower cognitive load (measured by pupil diameter and EEG). This is fundamentally different from student-directed highlighting (Dunlosky LOW utility): author-provided semantic color-coding is expert-curated, consistent, and functions as a perceptual signal, not a learning activity. It leverages pre-attentive processing (Treisman & Gelade 1980), the Von Restorff isolation effect, and dual coding (Paivio 1986).

---

## When to Apply

The coloring pass is part of the **editing workflow** (`edit-textbook-chapter.md`). It runs AFTER prose-quality editing is complete — it should be the last content-level pass before final verification. The writing workflow (`write-textbook-chapter.md`) may also apply coloring during initial writing, especially in the Chapter Overview paragraph where the technique has the highest impact.

---

## The Color Palette (WCAG AA Compliant)

All colors pass WCAG AA (4.5:1 minimum) for normal-size text on white backgrounds. They are Tailwind CSS 600-700 shades, chosen for perceptual distinguishability and colorblind safety.

| # | Name | Hex | WCAG Ratio | Prose Syntax | LaTeX Syntax |
|---|---|---|---|---|---|
| 1 | **Indigo** | `#4F46E5` | 6.29:1 | `[**term**]{style="color: #4F46E5;"}` | `$\textcolor{#4F46E5}{symbol}$` |
| 2 | **Emerald** | `#047857` | 5.48:1 | `[**term**]{style="color: #047857;"}` | `$\textcolor{#047857}{symbol}$` |
| 3 | **Rose** | `#E11D48` | 4.70:1 | `[**term**]{style="color: #E11D48;"}` | `$\textcolor{#E11D48}{symbol}$` |
| 4 | **Sky** | `#0369A1` | 5.93:1 | `[**term**]{style="color: #0369A1;"}` | `$\textcolor{#0369A1}{symbol}$` |
| 5 | **Amber** | `#B45309` | 5.02:1 | `[**term**]{style="color: #B45309;"}` | `$\textcolor{#B45309}{symbol}$` |
| 6 | **Purple** | `#7E22CE` | 6.98:1 | `[**term**]{style="color: #7E22CE;"}` | `$\textcolor{#7E22CE}{symbol}$` |
| 7 | **Teal** | `#0F766E` | 5.23:1 | `[**term**]{style="color: #0F766E;"}` | `$\textcolor{#0F766E}{symbol}$` |
| 8 | **Slate** | `#475569` | 7.58:1 | `[**term**]{style="color: #475569;"}` | `$\textcolor{#475569}{symbol}$` |

**Use at most 3-5 colors per chapter.** Pick the colors most relevant to the chapter's concept categories. The full palette of 8 provides flexibility across different chapters, but She et al. (2024) showed single-color cues outperform multi-color, and the Von Restorff effect disappears when everything is colored.

---

## How to Assign Colors to Concepts

### Step 1: Identify 3-5 Major Concept Categories

Read the chapter overview and identify the 3-5 most important conceptual pillars. These should be genuinely distinct categories, not synonyms or subcategories of each other.

**Example (MoE chapter):**

| Color | Category | Example Terms |
|---|---|---|
| Indigo `#4F46E5` | Architecture/structure | MoE layer, expert FFN, dense vs sparse |
| Emerald `#047857` | Routing/selection | router, top-k, gating, token assignment |
| Rose `#E11D48` | Training/optimization | auxiliary loss, load balancing, capacity factor |

**Example (Vision Transformers chapter):**

| Color | Category | Example Terms |
|---|---|---|
| Indigo `#4F46E5` | Architecture | ViT, patch embedding, class token |
| Emerald `#047857` | Attention mechanism | self-attention, multi-head, Q/K/V |
| Amber `#B45309` | Training/scaling | pre-training, fine-tuning, data augmentation |
| Sky `#0369A1` | Mathematical objects | patch vectors, position embeddings, attention weights |

### Step 2: Document the Color Map

At the top of TEXTBOOK-PLAN.md (or in the editing pass notes), create an explicit color map table. This is the single source of truth for the chapter's coloring. Every colored term must trace back to this table.

### Step 3: Never Reuse a Color for a Different Category

If Indigo means "architecture" in Section 1, it must mean "architecture" in Section 6. Inconsistency turns signal into noise and violates the categorization benefit.

---

## Where to Apply Color

### In the Chapter Overview (HIGHEST IMPACT)

The Chapter Overview paragraph is the ideal place for the first appearance of colored terms. This is where the reader builds their mental model of the chapter's structure, and color visually separates the pillars.

**Example:**

```markdown
To understand MoE, you need a mental model with three layers: (1) the
[**architecture**]{style="color: #4F46E5;"}, i.e. what an MoE layer looks like;
(2) the [**routing mechanism**]{style="color: #047857;"}, i.e. how the model decides
which expert handles which token; and (3) the
[**training machinery**]{style="color: #E11D48;"}, i.e. the auxiliary losses and
balancing tricks that make MoE training stable.
```

### On First Mention of a Key Term in Each Section

Color the term on its **first significant appearance** in each section (similar to how citations are re-introduced per section). Do not color every single occurrence; that would violate the Von Restorff principle (if everything is colored, nothing stands out). Color the term when it is being introduced, defined, or used in a structurally important sentence.

**Guideline:** 3-8 colored terms per section. Not every paragraph needs a colored term. The coloring should feel like a gentle visual rhythm, not a highlight party.

### In Equations and "Where" Blocks (THE GAME-CHANGER)

Color the key symbols in equations and match them to the same-colored definitions in the "where" block. This creates a visual link between the abstract symbol and its plain-language meaning.

**Example:**

```markdown
$$
y = \sum_{i=1}^{N} \textcolor{#047857}{G(x)_i} \cdot \textcolor{#4F46E5}{E_i(x)}
$$

where:

- $\textcolor{#047857}{G(x)_i}$ is the [gate weight]{style="color: #047857;"} for expert $i$
- $\textcolor{#4F46E5}{E_i(x)}$ is [expert $i$'s output]{style="color: #4F46E5;"}
```

**Rules for equation coloring:**

- Use `\textcolor{#hex}{content}` (NOT `{\color{#hex} content}`) because `\textcolor` has explicit scoping
- Color only the 2-3 most important symbols in an equation, not every symbol
- The "where" block definitions MUST use the same hex color as the equation symbol
- Uncolored symbols (like $N$, $i$, $y$) remain in default black
- Do NOT color equation labels, equation numbers, or structural elements like $\sum$

### In the Notation Table

Optionally, the notation table in the introduction can color-code the Symbol column to match the chapter's color map:

```markdown
| Symbol | Definition | Valid Values | Example |
|---|---|---|---|
| $\textcolor{#047857}{G(x)_i}$ | Gate weight for expert $i$ | $[0, 1]$ | $G(\text{"bank"})_3 = 0.65$ |
| $\textcolor{#4F46E5}{E_i(x)}$ | Output of expert $i$ | $\mathbb{R}^{d_{\text{model}}}$ | Expert 3's FFN output |
```

---

## Where NOT to Apply Color

- **Callout boxes** (`.callout-warning`, `.callout-note`, `.callout-tip`): these already have their own visual styling. Adding colored terms inside callouts creates visual clutter.
- **Exercise blocks** (`.exercise-mcq`, `.exercise-predict`, etc.): exercises should test comprehension without the color scaffolding. Colored terms in options would bias selection.
- **Source headers**: the collapsible source tables are metadata, not pedagogical content.
- **Code blocks**: syntax highlighting handles this separately.
- **Closing section**: key takeaways and retrieval questions should work without color (tests the reader's independent recall).

---

## Technical Syntax Reference

### Prose (Quarto Markdown)

Use Pandoc's bracketed span syntax with an inline style:

```markdown
[**term text**]{style="color: #4F46E5;"}
```

The bold (`**...**`) inside the span is optional. Use bold+color for the first introduction of a category in the Chapter Overview. Use color-only (no bold) for subsequent references to avoid over-emphasizing.

### LaTeX (Block Equations)

```markdown
$$
\mathcal{L}_{aux} = \alpha \cdot N \cdot \sum_{i=1}^{N}
\textcolor{#E11D48}{f_i} \cdot \textcolor{#047857}{P_i}
$$
```

### LaTeX (Inline Equations)

```markdown
The fraction $\textcolor{#E11D48}{f_i}$ represents the actual dispatch count.
```

### Matching Prose and Equations

The hex value must be **identical** in both the `style="color: #hex;"` attribute and the `\textcolor{#hex}{...}` command. MathJax renders math as HTML/CSS in the browser, so the same hex string produces the identical color.

---

## The Coloring Pass (Editing Workflow Integration)

When performing the coloring pass during the editing workflow:

### Step 0: Build the Color Map

1. Read the Chapter Overview to identify the 3-5 conceptual pillars
2. Assign a color from the palette to each pillar
3. Document the mapping in a table (kept in working notes, not in the chapter file)

### Step 1: Color the Chapter Overview

Apply color to the first mention of each pillar in the overview paragraph. This is the anchor that establishes the color-meaning association for the reader.

### Step 2: Color Key Terms in Body Sections

For each body section:
- Identify 3-8 terms that belong to the color-mapped categories
- Color each term on its first significant appearance in the section
- Ensure every colored term uses the EXACT hex from the color map

### Step 3: Color Equations and "Where" Blocks

For each significant equation:
- Identify the 2-3 most important symbols
- Apply `\textcolor{#hex}{...}` to those symbols
- Match the colors in the "where" block definitions

### Step 4: Consistency Verification

After all sections are colored:
- Grep for all hex color codes across the chapter files
- Verify that each hex code is used consistently for the same concept category
- Verify that no two different categories share the same (or visually similar) color
- Verify that the total number of distinct colors is 3-5

---

## Constraints and Pitfalls

### Maximum 3-5 colors per chapter
She et al. (2024) showed single-color outperforms multi-color. The Von Restorff effect requires scarcity: if everything is colored, nothing is distinctive. Stay at 3-5 categories.

### Do not color every occurrence of a term
Color the first significant mention per section, not every instance. Over-coloring creates a "rainbow page" that defeats the purpose.

### Never reuse a similar-looking color
Indigo (#4F46E5) and Purple (#7E22CE) look similar. Sky (#0369A1) and Teal (#0F766E) can be confused. Never use two perceptually close colors in the same chapter. If you need both "architecture" and "theoretical concepts," pick colors from opposite sides of the palette (e.g., Indigo + Amber, not Indigo + Purple).

### Avoid red as a primary category
Ng et al. (2024) found red-inclusive color schemes were slowest and least preferred. Red carries strong affective interference (danger, error). Use Rose (#E11D48) sparingly for warnings, critical insights, or training/loss concepts.

### Color is supplementary, not primary
Every colored term must be fully understandable without color (the word itself carries the meaning). Color adds a visual categorization layer on top. This ensures accessibility for readers with color vision deficiency and for printed/grayscale versions.

### WCAG contrast
All palette colors pass WCAG AA (4.5:1) on white backgrounds. Do NOT substitute lighter variants (Tailwind 400/500 shades) without checking contrast ratios. The user's original Emerald-500 (#10B981) has only 2.54:1 contrast and fails WCAG entirely.