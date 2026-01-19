# AI Learning Gems

Textbook-style chapters on technical/mathematical topics, generated using LLM agents and rendered with Quarto.

## How It Works

This project uses **agentic LLM prompts** to generate high-quality educational content. The prompts are designed for:

- **Cursor** (prompts in `.cursor/commands/`)
- **Windsurf** (prompts in `.agent/workflows/`)

**Recommended model:** Claude Opus 4.5 — works well for generating both prose and D2 diagrams.

## Setup

### 1. Quarto

Download from [quarto.org](https://quarto.org/docs/get-started/):

```bash
# macOS
brew install --cask quarto

# Verify
quarto --version  # Should be 1.4+
```

### 2. D2 (Diagram Tool)

```bash
brew install d2

# Verify
d2 --version  # Should be 0.6+
```

### 3. Python Environment & Jupyter Kernel

Create a virtual environment with the required packages:

```bash
# Create environment (Python 3.12 recommended)
python3.12 -m venv env
source env/bin/activate

# Install dependencies
pip install --upgrade pip
pip install \
    numpy pandas scipy scikit-learn \
    matplotlib seaborn plotly hvplot holoviews bokeh \
    arviz \
    jupyter ipykernel jupyterlab

# Register as Jupyter kernel
python -m ipykernel install --user --name=ai-math-book --display-name="Python (ai-math-book)"
```

Verify the kernel is registered:
```bash
jupyter kernelspec list
# Should show: ai-math-book    /Users/.../kernels/ai-math-book
```

### 4. Quarto Extension (D2 Diagrams)

The `pandoc-ext/diagram` extension is already installed in `_extensions/`. If you need to reinstall:

```bash
quarto add pandoc-ext/diagram
```

### 5. VS Code / Cursor Extensions

Install:
- **Quarto** (`quarto.quarto`)
- **Python** (`ms-python.python`)

## Project Structure

```
AI-Learning-Gems/
├── _quarto.yml                  # Global config (kernel, format)
├── _extensions/pandoc-ext/      # D2 diagram filter
├── .cursor/commands/            # Cursor agent prompts
├── .agent/workflows/            # Windsurf agent prompts
├── Statistics/                  # Topic chapters
│   ├── Chapter-Name.qmd         # Index file
│   └── Chapter-Name/            # Section files
└── README.md
```

## Rendering

### From Cursor/VS Code

1. Open a `.qmd` index file
2. Click **Preview** (Quarto extension) or use Command Palette: `Quarto: Preview`

### From Terminal

```bash
cd /path/to/AI-Learning-Gems

# Preview with live reload
quarto preview Statistics/Your-Chapter.qmd

# One-time render
quarto render Statistics/Your-Chapter.qmd --to html
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| D2 diagrams show as plain text | Check the `.qmd` has `filters:` in YAML header |
| Wrong Jupyter kernel | Run `jupyter kernelspec list` to verify `ai-math-book` exists |
| Extension not found | Run `quarto render` from the project root, not a subdirectory |
