
# Source Management

Shared source handling rules for all textbook chapter workflows. For site-specific fetch strategies, see `web-source-fetching.md`. For the curated blog registry, see `high-quality-blogs.md`.

---

## Centralized Source Storage (CRITICAL)

**All sources are stored in `AI-Learning-Gems/sources/` — NOT in each chapter folder.**

This is a shared, centralized repository. The same source can be referenced by multiple chapters.

### Source Folder Naming Conventions

| Source Type | Folder Pattern | Example |
|---|---|---|
| **arXiv papers** | `sources/arxiv-{PAPER_ID}` | `sources/arxiv-2010.11929/` |
| **Blog posts** | `sources/{domain}/{path}/` | `sources/lilianweng.github.io/posts/2022-06-09-vlm/` |
| **d2l.ai chapters** | `sources/d2l.ai/{chapter-path}/` | `sources/d2l.ai/chapter_attention-mechanisms-and-transformers/vision-transformer/` |
| **HuggingFace docs** | `sources/huggingface.co/docs/{path}/` | `sources/huggingface.co/docs/transformers/model_doc/vit/` |
| **PyTorch docs** | `sources/pytorch.org/{path}/` | `sources/pytorch.org/docs/stable/generated/torch.nn.MultiheadAttention/` |
| **Other sites** | `sources/{domain}/{path}/` | `sources/distill.pub/2021/gnn-intro/` |

**Blog/site URL → folder name rules:**
1. Strip `https://` and `http://`
2. Strip `www.`
3. Use the remaining URL path as the folder path
4. Store main content as `content.md` inside the folder
5. Store images in `images/` subfolder

**arXiv rules:**
1. Use `arxiv-{PAPER_ID}` (hyphenated)
2. Download LaTeX source: `curl -sL "https://arxiv.org/src/{PAPER_ID}" -o source.tar.gz && tar -xzf source.tar.gz`
3. Contains `.tex` files, `images/`, `.bib`

---

## Checking for Existing Sources (MANDATORY)

**BEFORE downloading any source, check if it already exists:**

```bash
ls "AI-Learning-Gems/sources/arxiv-2010.11929/" 2>/dev/null && echo "EXISTS" || echo "NEW"
```

If a source already exists, skip downloading and reference the existing path.

---

## Source Downloading Quick Reference

| Source Type | Command (Run ONLY if folder is NEW) |
|---|---|
| **arXiv papers** | `mkdir -p "sources/arxiv-{ID}" && cd "sources/arxiv-{ID}" && curl -sL "https://arxiv.org/src/{ID}" -o source.tar.gz && tar -xzf source.tar.gz && rm source.tar.gz` |
| **GitHub repos/gists** | `git clone --depth 1 "https://github.com/OWNER/REPO.git" "sources/github.com/OWNER/REPO"` |
| **Blog posts, Substack, Medium, JS-heavy pages** | `conda activate ai-learning-gems && python scripts/authenticated_extract.py "URL"` (add `--profile substack` or `--profile medium` for login-gated sites) |
| **d2l.ai chapters** | `conda activate ai-learning-gems && python scripts/authenticated_extract.py "https://d2l.ai/{chapter}/{section}.html" -s ".document"` |
| **Static HTML pages (fast fallback, no JS)** | `conda activate ai-learning-gems && python scripts/webpage_to_md.py "URL" -o "sources/{domain}/{path}/"` |
| **Single raw file from GitHub** | `mkdir -p "sources/github.com/OWNER/REPO/DIR" && curl -sL "https://raw.githubusercontent.com/OWNER/REPO/BRANCH/PATH" -o "sources/github.com/OWNER/REPO/PATH"` |

For the complete site-specific lookup table, see `web-source-fetching.md`.

---

## PDF Figure Conversion

Many arXiv papers include figures as PDFs. Quarto cannot embed PDFs inline, so they must be converted to PNG.

**IMPORTANT:** PDF figures from arXiv are full-page PDFs with LaTeX margins. You MUST render at high DPI AND trim whitespace.

```bash
# PREFERRED: ImageMagick (renders + trims in one step)
magick -density 400 images/figure.pdf -trim +repage images/figure.png

# Batch convert all PDF figures in an arXiv source:
find "sources/arxiv-{ID}/" \( -name '*.pdf' \) \( -path '*/images/*' -o -path '*/figs/*' -o -path '*/figures/*' -o -path '*/resources/*' \) | while read f; do
  outfile="${f%.pdf}"
  [ ! -f "${outfile}.png" ] && magick -density 400 "$f" -trim +repage "${outfile}.png" && echo "Converted: $f → ${outfile}.png"
done
```

**Validate converted images** (detect blank placeholders):
```bash
find "sources/arxiv-{ID}/" \( -path '*/images/*' -o -path '*/figs/*' -o -path '*/figures/*' \) -name '*.png' -size -10k | while read f; do
  pdf="${f%.png}.pdf"
  if [ -f "$pdf" ]; then
    echo "SUSPECT BLANK: $f — PDF exists, re-converting..."
    magick -density 400 "$pdf" -trim +repage "$f"
  fi
done
```

---

## Per-Section Source Headers

Each section file should include its own sources as a collapsible header at the top. See `quarto-conventions.md` (Per-Section Source Headers section) for the full template.

## Blog Attribution

Many sources come from independent researchers' blogs. These must be attributed in source headers, figure captions, and in-text framings. See `high-quality-blogs.md` for the curated blog registry, and `quarto-conventions.md` (Attribution for Blog Content) for the formatting rules.

---

## Citation Format

**Inline Citations:** Every significant factual claim needs a citation:
`[Source Name](URL) (Written: <date>, Accessed: <date>)`

**Exact Quotes:** For major claims, include the exact sentence from the source:
```
From [Source Name](URL):

> "Exact quote from the source text [...] continuing relevant portion."
```

**Source Quality Indicators:**
- [TEXTBOOK] for established textbooks
- [ACADEMIC] for peer-reviewed papers
- [COURSE] for university course materials
- [TUTORIAL] for educational blogs/videos
- [COMMUNITY] for forums/discussions

---

## Source Selection Criteria

**Prioritize sources that:**
1. Are authoritative (original papers, official docs, university courses)
2. Contain equations, code, or precise technical details
3. Include figures and diagrams you can reference
4. Have different perspectives (theory, intuition, implementation)
5. Cover edge cases and common misconceptions

**Minimum source set for a chapter:**
- 1-2 original/foundational papers (arXiv LaTeX)
- 1-2 authoritative tutorials (d2l.ai, official docs)
- 2-3 intuition-focused explanations (blogs, videos transcripts)
- 1-2 implementation references (code documentation)
