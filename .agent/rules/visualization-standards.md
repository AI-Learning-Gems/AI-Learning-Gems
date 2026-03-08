
# Visualization Standards

Shared visualization rules for all textbook chapter workflows (research, write, edit, update).

**Goal:** Your chapter should contain the absolutely perfect picture to explain each concept.

---

## Visual Priority Order (CRITICAL)

**Follow this order when choosing how to illustrate a concept:**

1. **Source images from downloaded papers** — Check the TEXTBOOK-PLAN.md Source Image Catalog FIRST. These are canonical, authoritative figures that readers expect to see. Copy them to `{Chapter}/images/` and embed.
2. **D2 diagrams** — for concept maps, flowcharts, and structural diagrams. Always use ELK engine.
3. **Python/hvplot (bokeh backend)** — for data visualizations, distributions, function plots, and ANY visual that must be numerically accurate.
4. **Web downloads** — for images not in sources/ (search and download during writing).
5. **generate_image** — ONLY for decorative/conceptual illustrations where numerical accuracy is irrelevant (e.g., a stylized icon, a non-data artistic illustration). See the warning below.

> **NEVER use `generate_image` for plots, charts, graphs, reliability diagrams, bar charts, heatmaps, confusion matrices, or ANY visual that needs to display accurate data.**
>
> LLM image generation tools (e.g. Gemini Imagen, DALL-E) produce visually plausible but **factually incorrect** data in plots. The numbers, axis labels, bar heights, curve shapes, and data points will look reasonable but will be WRONG. This is unacceptable in a textbook.
>
> **For any visual that contains numerical data, use one of these instead:**
> - **Source images from papers** — always preferred for canonical results (copy from `sources/`)
> - **Python code** — generate the plot programmatically with `hvplot` (bokeh backend) or `matplotlib` directly, using real data or carefully constructed synthetic data
> - **Web download** — find the original published figure online and download it
>
> The ONLY acceptable use of `generate_image` is for purely conceptual/artistic illustrations where no data accuracy is needed (e.g., a stylized banner image, an abstract concept illustration).

### Choosing the Right Visualization Approach

| Type of Visual | Approach |
|---|---|
| **Canonical figures from papers** (architecture diagrams, attention maps, scaling plots) | **Copy from `sources/` — see Source Image Catalog** |
| **Data plots** (distributions, functions, comparisons) | **Generate with code (hvplot with bokeh backend) — NEVER use `generate_image`** |
| **Reproducing a paper's plot** (when source image unavailable or low-res) | **Write Python code to recreate it from the paper's reported numbers** |
| **Simple concept maps** (flowcharts, relationships) | Generate with D2 |
| **Mathematical diagrams** (geometric, annotated) | Generate with TikZ |
| **Complex images NOT in sources** (rare) | **Download from web** |
| **Decorative/conceptual art** (no data accuracy needed) | `generate_image` (ONLY case where this is acceptable) |

---

## Source Images (From Downloaded Papers — PREFERRED)

1. Check the TEXTBOOK-PLAN.md **Source Image Catalog** for images assigned to this section
2. **CRITICAL: Always convert from PDF, never just copy the PNG.** arXiv source PNGs are frequently low-resolution thumbnails (e.g., 586x288px) or blank white placeholders. Even when a PNG exists and looks non-empty, it is almost always a low-DPI version of the PDF. The PDF is the authoritative source.
   ```bash
   mkdir -p "{Chapter}/images"
   pdf_source="AI-Learning-Gems/sources/arxiv-XXXX/figures/figure.pdf"
   png_source="AI-Learning-Gems/sources/arxiv-XXXX/figures/figure.png"
   dest="{Chapter}/images/descriptive-name.png"
   if [ -f "$pdf_source" ]; then
     magick -density 400 "$pdf_source" -flatten -trim +repage "$dest"
   elif [ -f "$png_source" ]; then
     cp "$png_source" "$dest"
     echo "WARNING: No PDF found, copied PNG directly. Verify resolution."
   fi
   ```
   **Why?** LaTeX `\includegraphics{figures/teaser}` picks the PDF (vector, full resolution). PNGs in arXiv sources are low-res fallbacks. Copying the PNG gives a thumbnail (e.g., 586x288); converting the PDF at 400 DPI gives a crisp figure (e.g., 2412x1161). macOS `sips` CANNOT rasterize vector PDFs. Always use ImageMagick (`brew install imagemagick ghostscript`).
3. Name descriptively: `vit-architecture.png`, `dino-attention-maps.png`, `scaling-vs-data.png`
4. Embed with caption and attribution:
   ```markdown
   ![Caption describing the figure. Source: Author et al. (Year), Figure N.]([Topic Name]/images/descriptive-name.png){#fig-label}
   ```
5. **CRITICAL:** Always attribute the source in the caption. Use the format: `Source: Author et al. (Year), Figure N.`
6. **CRITICAL:** Do NOT add explicit `width` tags to images (e.g. `width="60%"`, `width="95%"`). Omit the width entirely and let Quarto's global defaults handle the image sizing.
7. **CRITICAL — image path resolution:** Quarto resolves ALL paths (images, includes) relative to the **index file location**, NOT relative to the section file. Since section files live inside `[Topic Name]/` but the index file is one level up, image paths in section files MUST be prefixed with the folder name: `[Topic Name]/images/filename.png`, NOT `images/filename.png`. If you use bare `images/filename.png`, Quarto will look for the image next to the index file (wrong) instead of inside the chapter folder (correct), resulting in 404 errors.

---

## Web Downloads (Canonical/Complex Images NOT in Sources)

1. Search the web for the best version of the image
2. Download to the chapter's `images/` subfolder
3. Name descriptively: `transformer-architecture.png`, `attention-mechanism.png`
4. Reference in markdown: `![Caption. Image Source: URL]([Topic Name]/images/filename.png){#fig-label}`
5. **CRITICAL:** Do NOT add explicit `width` tags to images (e.g. `width="60%"`, `width="95%"`). Omit the width entirely and let Quarto's global defaults handle the image sizing.
6. **CRITICAL — image path resolution:** Same rule as source images: paths must be relative to the **index file**, not the section file. Use `[Topic Name]/images/filename.png`, not `images/filename.png`.

---

## D2 Diagrams (Structures, Flowcharts, Concept Maps)

> **MANDATORY: ALWAYS USE D2 FOR ALL DIAGRAMS**
>
> Do NOT use Mermaid. Do NOT use Graphviz. Use D2 with the ELK engine for ALL concept maps, flowcharts, and structural diagrams.
>
> D2 produces professional, "LinkedIn-worthy" diagrams with proper shadows, semantic coloring, and clean layouts.

### D2 Diagram Standard (REQUIRED)

**Requirements:**
- Quarto extension: `pandoc-ext/diagram` installed at project root (`_extensions/pandoc-ext/diagram/`)
- D2 CLI installed
- **CRITICAL:** The main `.qmd` file MUST include the diagram filter with a RELATIVE PATH to the Lua file:
  ```yaml
  ---
  title: "Your Chapter"
  filters:
    - ../_extensions/pandoc-ext/diagram/diagram.lua
  ---
  ```

### The "Modern SaaS" Theme (Default)

**6 Semantic Color Classes** for complex concept maps:

| Class | Purpose | Stroke Color | Fill Color | Notes |
|---|---|---|---|---|
| `input` | Data, observations, givens | `#6366F1` (Indigo) | `#EEF2FF` | |
| `process` | Transformations, computations | `#10B981` (Emerald) | `#ECFDF5` | |
| `decision` | Branches, choices, alternatives | `#F59E0B` (Amber) | `#FFFBEB` | |
| `output` | Final results, conclusions | `#1D4ED8` (Blue) | `#3B82F6` (filled) | |
| `highlight` | Key concepts, "aha moments" | `#F43F5E` (Rose) | `#FFF1F2` | |
| `container` | Grouping related nodes | `#D1D5DB` (Gray) | `#F9FAFB` | **Bold header, font-size 16** |

### Standard D2 Template (MUST USE THIS STYLE)

````
```{.d2}
# =========================================================================
# 1. LAYOUT CONFIGURATION
# =========================================================================
direction: down
vars: {
  d2-config: {
    layout-engine: elk
  }
}

# =========================================================================
# 2. DESIGN SYSTEM (6 Semantic Classes)
# =========================================================================
classes: {
  base: {
    style: {
      fill: "white"
      stroke: "#E5E7EB"
      stroke-width: 2
      shadow: true
      border-radius: 8
      font-size: 14
    }
  }
  input: {
    style: {
      stroke: "#6366F1"
      fill: "#EEF2FF"
      font-color: "#3730A3"
    }
  }
  process: {
    style: {
      stroke: "#10B981"
      fill: "#ECFDF5"
      font-color: "#065F46"
    }
  }
  decision: {
    style: {
      stroke: "#F59E0B"
      fill: "#FFFBEB"
      font-color: "#92400E"
    }
  }
  output: {
    style: {
      fill: "#3B82F6"
      stroke: "#1D4ED8"
      font-color: "white"
    }
  }
  highlight: {
    style: {
      stroke: "#F43F5E"
      fill: "#FFF1F2"
      font-color: "#BE123C"
      stroke-width: 3
    }
  }
  container: {
    style: {
      fill: "#F9FAFB"
      stroke: "#D1D5DB"
      font-color: "#1F2937"
      font-size: 16
      bold: true
    }
  }
}

# =========================================================================
# 3. CONTENT (auto-sized nodes with padding)
# =========================================================================
ExampleNode: {
  class: [base; input]
  label: "        Example Label        "
}
```
````

**Key Styling Rules:**

1. **Use 6 semantic classes:** Assign each node a class based on its role (`input`, `process`, `decision`, `output`, `highlight`, `container`).
2. **Use `direction: down`** for concept maps (top-to-bottom flow).
3. **Let D2 auto-size nodes** — add non-breaking spaces as padding for short labels.
4. **Use shadows & rounded corners:** `shadow: true` and `border-radius: 8`.
5. **Render Math with LaTeX:** Use `label: |latex ... |` or `label: ||latex ... ||` (double pipes if content contains `|`). Add `shape: rectangle` explicitly for LaTeX nodes.
6. **Use containers for grouping:** `label.near: top-left` to prevent arrow overlap.

### Fallbacks

- **FALLBACK ONLY: Mermaid with ELK** — DO NOT USE MERMAID unless D2 explicitly fails to compile.
- **LAST RESORT: Graphviz** — DO NOT USE GRAPHVIZ unless both D2 and Mermaid fail.

---

## Plots (hvplot with Bokeh Backend)

> **CRITICAL: hvplot + bokeh + Quarto requires a TWO-CELL pattern.**
>
> Each intermediate hvplot operation creates a separate output. Quarto captures ALL of them as sub-figures. **You MUST split into two cells:**
>
> 1. **Cell 1** (`#| output: false`): All imports, computation, and hvplot object construction
> 2. **Cell 2** (`#| echo: false` + `#| label` + `#| fig-cap`): Uses `bokeh.io.output_notebook()` + `bokeh.io.show(hv.render(...))` to produce exactly ONE unified output

**Additional rules:**
- Use **bokeh param names** in hvplot calls: `line_width` (not `linewidth`), `line_dash` (not `linestyle`), `size` for scatter (not `s`)
- `width` and `height` work directly with bokeh (unlike matplotlib which ignores them)

**Three layers of plot options (critical distinction):**

| Layer | How to apply | What goes here |
|---|---|---|
| **`hvplot_opts`** | `df.hvplot.line(**hvplot_opts, ...)` | `width`, `height`, `grid`, `xlabel`, `ylabel`, `title`, `rot`, `color`, `line_width`, `line_dash`, `size` |
| **`hv_opts`** | `.opts(**hv_opts)` chained after hvplot call | `show_grid`, `show_legend`, `gridstyle`, `active_tools`, `toolbar`, `fontsize` |
| **`backend_opts`** (rare) | `.opts(backend_opts={...})` | Raw bokeh model properties like `'xgrid.grid_line_alpha': 0.5` |

**Correct pattern:**

````
```{python}
#| output: false
#| error: true
#| warning: false
import warnings
warnings.filterwarnings("ignore")
import numpy as np
import pandas as pd
import hvplot.pandas
import holoviews as hv
hv.extension('bokeh')

hvplot_opts = dict(width=700, height=450, grid=True)
hv_opts = dict(
    show_grid=True,
    default_tools=['hover', 'save', 'pan', 'box_zoom', 'reset', 'wheel_zoom'],
    active_tools=['pan'],
)

x = np.linspace(-5, 5, 200)
df = pd.DataFrame({'x': x, 'ReLU': np.maximum(0, x), 'Sigmoid': 1/(1+np.exp(-x))})
df_melted = df.melt(id_vars=['x'], var_name='Function', value_name='f(x)')
final_plot = df_melted.hvplot.line(
    x='x', y='f(x)', by='Function',
    **hvplot_opts,
    line_width=2,
).opts(**hv_opts)
```

```{python}
#| label: fig-activation
#| fig-cap: "Activation functions comparison"
#| echo: false
#| warning: false
from bokeh.io import output_notebook, show
import holoviews as hv
output_notebook(hide_banner=True)
show(hv.render(final_plot, backend='bokeh'))
```
````

---

## Visual Design Rules (Mayer's Principles)

- Integrate labels directly INTO the visual — no separate legends
- Place visuals immediately adjacent to related text
- Use arrows and annotations to guide attention
- Keep visuals simple
- No decorative images that do not aid understanding
