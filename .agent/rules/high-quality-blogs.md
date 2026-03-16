
# High-Quality Technical Blogs & Sources

This is a **curated registry** of blogs and websites that produce textbook-quality technical content. When running the `/research-textbook-chapter` or `/write-textbook-chapter` workflows, the agent SHOULD search these sources for relevant material on the topic being researched.

## How to Use This Registry

### Attribution (MANDATORY)

These blogs contain **original content** by independent researchers and writers. When using their material in textbook chapters, you MUST:

1. **Cite the author and post** in the section's collapsible source header table
2. **Attribute figures and diagrams** in image captions: `Source: [Author Name], "[Post Title]" ([year]). [URL]`
3. **Quote, don't paraphrase** — when using a specific explanation or framing from a blog post, use a blockquote with attribution rather than rewording it without credit
4. **Never present blog content as original** — if an explanation or worked example is inspired by or adapted from a blog post, say so explicitly (e.g., "The following derivation is adapted from Gundersen's excellent treatment in [post title]")

### During Research (MANDATORY)

When researching a topic, **spend at least 2-3 searches specifically targeting these blogs**:

```
site:lilianweng.github.io {TOPIC}
site:colah.github.io {TOPIC}
site:cameronrwolfe.substack.com {TOPIC}
site:magazine.sebastianraschka.com {TOPIC}
site:distill.pub {TOPIC}
site:gregorygundersen.com {TOPIC}
```

Pick the blogs most relevant to the topic's domain (see the category tags below).

### During Source Downloading

Use the extraction method listed for each site. The `authenticated_extract.py` script handles most sites. Key notes:
- **Substack** sites auto-detect the `article` CSS selector
- **GitHub Pages** blogs usually work with default settings (no `-s` needed)
- Some sites need custom CSS selectors — see the "Extraction" field for each entry

### Adding New Blogs to This Registry

When you discover a blog of exceptional quality during research, add it to this file following the template at the bottom. You MUST:
1. Read at least 3 posts from the blog to assess quality and depth
2. Test extraction with `authenticated_extract.py` to determine the best CSS selector
3. Categorize the blog using the depth tags defined below
4. List 2-3 notable posts with URLs
5. Add the entry in the correct category section

---

## Depth Tags

| Tag | Meaning | Example Authors |
|-----|---------|----------------|
| `deep-technical-with-math` | Rigorous derivations, proofs, equations | Lilian Weng, Gregory Gundersen, Francis Bach |
| `intuition-and-visualization` | Visual explanations, interactive demos | Jay Alammar, Chris Olah, Distill.pub |
| `paper-explainer` | Accessible breakdowns of recent papers | Cameron Wolfe, Sebastian Raschka, Sebastian Ruder |
| `production-systems` | MLOps, system design, deployment | Chip Huyen, Eugene Yan, Simon Willison |
| `safety-alignment` | AI safety, interpretability, alignment | Neel Nanda, LessWrong, Alex Irpan |
| `pure-math` | Research-level mathematics | Terence Tao, Timothy Gowers |
| `mixed` | Combination of multiple depth levels | Nathan Lambert, Jason Wei |

---

## The Registry

### Deep Technical with Math

#### Lilian Weng — lilianweng.github.io
- **Depth**: `deep-technical-with-math` (20-45 min reads, comprehensive bibliographies, derivations)
- **Focus**: LLMs, RL, diffusion models, hallucination, reward hacking, prompt engineering, meta-learning
- **Platform**: GitHub Pages / Hugo
- **Auth**: None
- **Frequency**: ~4-5 posts/year
- **Extraction**: `python scripts/authenticated_extract.py "URL"` (default settings work well; 35K+ chars per post)
- **Notable posts**:
  - "Attention? Attention!" — canonical attention mechanism survey
  - "LLM Powered Autonomous Agents"
  - "Reward Hacking in Reinforcement Learning"
- **Search**: `site:lilianweng.github.io {TOPIC}`

#### Gregory Gundersen — gregorygundersen.com/blog
- **Depth**: `deep-technical-with-math` (thorough derivations, proofs, careful exposition)
- **Focus**: Probability & statistics, linear algebra, information theory, ML theory, some quantitative finance
- **Platform**: GitHub Pages / Jekyll
- **Auth**: None
- **Frequency**: ~8-12 posts/year
- **Extraction**: `python scripts/authenticated_extract.py "URL"` (may need `-s "main"` or `-s ".post-body"` — test per post; some posts have non-standard DOM)
- **Notable posts**:
  - "Understanding Moments"
  - "The Gauss-Markov Theorem"
  - "Expectation Maximization"
- **Search**: `site:gregorygundersen.com {TOPIC}`

#### Francis Bach — francisbach.com
- **Depth**: `deep-technical-with-math` / `pure-math` (rigorous proofs, aimed at researchers)
- **Focus**: Optimization theory, kernel methods, convergence analysis, neural network theory
- **Platform**: WordPress
- **Auth**: None
- **Frequency**: ~Monthly (targets first Monday)
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, .entry-content"`
- **Notable posts**:
  - "Scaling Laws of Optimization"
  - "Gradient Descent for Wide Two-Layer Neural Networks"
- **Search**: `site:francisbach.com {TOPIC}`

#### Sander Dieleman — sander.ai
- **Depth**: `deep-technical-with-math` (60-min deep dives; multiple formal framings)
- **Focus**: Generative models (especially diffusion), connections between diffusion/autoregressive/flow models, music generation
- **Platform**: GitHub Pages / Jekyll
- **Auth**: None
- **Frequency**: ~4-6 posts/year
- **Extraction**: `python scripts/authenticated_extract.py "URL"`
- **Notable posts**:
  - "Diffusion Models Are Autoencoders"
  - "Perspectives on Diffusion"
- **Search**: `site:sander.ai {TOPIC}`

#### Off the Convex Path — offconvex.github.io
- **Depth**: `deep-technical-with-math` (research-level; Sanjeev Arora et al.)
- **Focus**: Non-convex optimization, deep learning theory, implicit regularization, generalization
- **Platform**: GitHub Pages / Jekyll
- **Auth**: None
- **Frequency**: Sporadic (most active 2015-2020)
- **Extraction**: `python scripts/authenticated_extract.py "URL"`
- **Notable posts**:
  - "Understanding Optimization in Deep Learning by Analyzing Trajectories of Gradient Descent"
  - "Implicit Regularization in Deep Matrix Factorization"
- **Search**: `site:offconvex.github.io {TOPIC}`

#### Sébastien Bubeck — blogs.princeton.edu/imabandit
- **Depth**: `deep-technical-with-math` / `pure-math`
- **Focus**: Convex optimization, bandit algorithms, online learning, mathematical ML foundations
- **Platform**: WordPress (Princeton-hosted)
- **Auth**: None
- **Frequency**: Inactive since ~2020 (transitioned to YouTube)
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, .entry-content"`
- **Notable posts**:
  - "Convex Optimization: Algorithms and Complexity"
  - "Kernel-Based Methods for Bandit Convex Optimization"
- **Search**: `site:blogs.princeton.edu/imabandit {TOPIC}`

#### Ben Recht — argmin.net
- **Depth**: `deep-technical-with-math` (graduate-level; optimization meets control theory)
- **Focus**: Optimization theory, control theory, connections to feedback systems, stochastic gradient methods
- **Platform**: Substack (migrated from original blog)
- **Auth**: None
- **Frequency**: ~Weekly during lecture semesters
- **Extraction**: `python scripts/authenticated_extract.py "URL"` (Substack auto-detects `article`)
- **Notable posts**:
  - "An Outsider's Tour of Reinforcement Learning" (multi-part)
  - "Highly Optimized Optimizers"
- **Search**: `site:argmin.net {TOPIC}`

#### Hossein Pishro-Nik — probabilitycourse.com
- **Depth**: `deep-technical-with-math` (formal proofs, worked examples, full textbook)
- **Focus**: Undergraduate/graduate probability, statistics, random processes
- **Platform**: Custom PHP/HTML
- **Auth**: None
- **Frequency**: N/A (static textbook)
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "main, .content"` (test per chapter)
- **Notable chapters**: Bayes' Theorem, Poisson Processes, Markov Chains, Brownian Motion
- **Search**: `site:probabilitycourse.com {TOPIC}`

---

### Intuition & Visualization

#### Chris Olah — colah.github.io
- **Depth**: `intuition-and-visualization` (legendary clarity; visual + mathematical rigor)
- **Focus**: Neural net interpretability, topology of representations, LSTMs, backpropagation
- **Platform**: GitHub Pages (static HTML)
- **Auth**: None
- **Frequency**: Very sporadic
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s ".post"` (NOTE: standard `article` selector fails on this site; the post body uses `.post` class)
- **Notable posts**:
  - "Understanding LSTM Networks" — one of the most-cited ML blog posts ever
  - "Neural Networks, Manifolds, and Topology"
  - "Calculus on Computational Graphs: Backpropagation"
- **Search**: `site:colah.github.io {TOPIC}`

#### Jay Alammar — jalammar.github.io
- **Depth**: `intuition-and-visualization` (the "Illustrated X" series; minimal math, maximum visual clarity)
- **Focus**: Transformer architecture, attention, BERT, GPT, word embeddings, stable diffusion
- **Platform**: GitHub Pages / Jekyll
- **Auth**: None
- **Frequency**: ~2-4 posts/year
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s ".post-content, article"` (NOTE: may fail with Playwright navigation errors on some posts; use `webpage_to_md.py` as fallback)
- **Notable posts**:
  - "The Illustrated Transformer" — arguably the most-referenced ML blog post ever
  - "The Illustrated BERT, ELMo, and co."
  - "The Illustrated Stable Diffusion"
- **Search**: `site:jalammar.github.io {TOPIC}`

#### Maarten Grootendorst — newsletter.maartengrootendorst.com
- **Depth**: `intuition-and-visualization` (50+ custom visuals per post; minimal math, maximum visual intuition)
- **Focus**: LLM internals (MoE, quantization, state space models), topic modeling (BERTopic), NLP techniques. Each "Visual Guide" post builds intuition through dozens of original diagrams showing data flow, architecture internals, and routing decisions.
- **Platform**: Substack ("Exploring Language Models")
- **Auth**: None (free)
- **Frequency**: ~3-4 visual guides/year + occasional tutorials (28K+ subscribers)
- **Extraction**: `python scripts/authenticated_extract.py "URL"` (Substack auto-detects `article`; works well, 43K+ chars per visual guide, 50-70 images downloaded automatically)
- **Notable posts**:
  - "A Visual Guide to Mixture of Experts (MoE)" (Oct 2024) — 50+ visuals covering experts, routing, load balancing, capacity factors
  - "A Visual Guide to Quantization" (Jul 2024) — IEEE-754, dynamic range, GPTQ/GGUF/AWQ comparison
  - "A Visual Guide to Mamba and State Space Models" (Feb 2024) — SSM alternative to transformers
- **Search**: `site:newsletter.maartengrootendorst.com {TOPIC}` or `site:maartengrootendorst.com {TOPIC}`

#### Distill.pub — distill.pub
- **Depth**: `intuition-and-visualization` (gold standard for interactive explorable explanations)
- **Focus**: Neural network interpretability, feature visualization, attention, t-SNE, GNNs
- **Platform**: Custom web-native journal (bespoke JS; peer-reviewed, ISSN-registered)
- **Auth**: None
- **Frequency**: Defunct since 2021 (archive available)
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "d-article, article"` (the `d-article` selector is specific to Distill's custom elements; works well, 50K+ chars)
- **Notable posts**:
  - "Attention and Augmented Recurrent Neural Networks"
  - "How to Use t-SNE Effectively"
  - "A Gentle Introduction to Graph Neural Networks"
- **Search**: `site:distill.pub {TOPIC}`

---

### Paper Explainers

#### Cameron R. Wolfe — cameronrwolfe.substack.com
- **Depth**: `paper-explainer` (long-form accessible explanations of cutting-edge papers; moderate math)
- **Focus**: LLM training pipelines, DPO/RLHF, scaling laws, multimodal AI, data-centric ML
- **Platform**: Substack ("Deep (Learning) Focus")
- **Auth**: None (free)
- **Frequency**: ~Weekly to biweekly (65K+ subscribers)
- **Extraction**: `python scripts/authenticated_extract.py "URL"` (Substack auto-detects; NOTE: extraction from `cameronrwolfe.substack.com/p/...` URLs works; extraction from `substack.com/home/post/...` URLs requires `--profile substack`)
- **Notable posts**:
  - "Direct Preference Optimization" deep-dive
  - "Scaling Laws for LLMs: From GPT-3 to o3"
  - "The History of Open-Source LLMs"
- **Search**: `site:cameronrwolfe.substack.com {TOPIC}`

#### Sebastian Raschka — magazine.sebastianraschka.com
- **Depth**: `paper-explainer` / `deep-technical-with-math` (code + math + architecture diagrams)
- **Focus**: LLM pretraining/fine-tuning, reasoning models, RLVR, PyTorch, annual state-of-LLM reviews
- **Platform**: Substack ("Ahead of AI")
- **Auth**: Some premium posts require paid subscription
- **Frequency**: ~Biweekly to monthly (170K+ subscribers)
- **Extraction**: `python scripts/authenticated_extract.py "URL" --profile substack` (use profile for paid posts)
- **Notable posts**:
  - "The State of LLMs 2025"
  - "Understanding Reasoning LLMs"
  - "A Dream of Spring for Open-Weight LLMs"
- **Search**: `site:magazine.sebastianraschka.com {TOPIC}`

#### Sebastian Ruder — ruder.io
- **Depth**: `paper-explainer` / `deep-technical-with-math` (comprehensive surveys)
- **Focus**: NLP, transfer learning, multilingual AI, optimization for NLP, LLM evaluation
- **Platform**: Custom static site (Ghost or Jekyll)
- **Auth**: None
- **Frequency**: ~3-6 posts/year
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, main"`
- **Notable posts**:
  - "An Overview of Gradient Descent Optimization Algorithms"
  - "Transfer Learning — Machine Learning's Next Frontier"
- **Search**: `site:ruder.io {TOPIC}`

#### Andrej Karpathy — karpathy.github.io
- **Depth**: `deep-technical-with-math` (code-heavy, builds from scratch; also highly intuitive)
- **Focus**: Deep learning fundamentals, neural network training, RNNs, computer vision
- **Platform**: GitHub Pages / Jekyll
- **Auth**: None
- **Frequency**: Very sporadic (~10 posts over a decade; educational content now on YouTube)
- **Extraction**: `python scripts/authenticated_extract.py "URL"`
- **Notable posts**:
  - "The Unreasonable Effectiveness of Recurrent Neural Networks"
  - "A Recipe for Training Neural Networks"
- **Search**: `site:karpathy.github.io {TOPIC}`

#### Davis Blalock — dblalock.substack.com
- **Depth**: `paper-explainer` (concise summaries of 10-20 papers/week)
- **Focus**: ArXiv roundups, ML efficiency, model compression, fast linear algebra, training speedups
- **Platform**: Substack ("Davis Summarizes Papers")
- **Auth**: None
- **Frequency**: ~Weekly (20K+ subscribers)
- **Extraction**: `python scripts/authenticated_extract.py "URL"` (Substack auto-detects)
- **Search**: `site:dblalock.substack.com {TOPIC}`

---

### Production ML & Applied Systems

#### Chip Huyen — huyenchip.com/blog
- **Depth**: `production-systems` (practical, systems-oriented; light on math, heavy on architecture)
- **Focus**: MLOps, ML systems design, LLM production deployment, AI engineering career guidance
- **Platform**: Custom static site (Jekyll / GitHub Pages)
- **Auth**: None
- **Frequency**: ~4-8 posts/year
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, .post-content, main"` (NOTE: may need selector experimentation)
- **Notable posts**:
  - "Building LLM Applications for Production"
  - "What I Learned from Looking at 200 Machine Learning Tools"
- **Search**: `site:huyenchip.com {TOPIC}`

#### Eugene Yan — eugeneyan.com/writing
- **Depth**: `production-systems` (practical patterns, system design)
- **Focus**: ML systems in production, RecSys, LLM patterns, evaluations, applied ML at scale
- **Platform**: Custom static site (Next.js or Hugo)
- **Auth**: None
- **Frequency**: ~Monthly
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, main"`
- **Notable posts**:
  - "Patterns for Building LLM-based Systems & Products"
  - "39 Lessons on Building ML Systems"
- **Search**: `site:eugeneyan.com {TOPIC}`

#### Simon Willison — simonwillison.net
- **Depth**: `production-systems` (LLM tooling, engineering-focused; minimal math)
- **Focus**: LLM CLI tools, AI-assisted programming, prompt injection, Datasette, SQLite
- **Platform**: Custom Django app
- **Auth**: None
- **Frequency**: Near-daily (extremely prolific)
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, .entry-content"`
- **Notable posts**:
  - "Prompt Injection Attacks Against GPT-3"
  - LLM CLI tool tutorials
- **Search**: `site:simonwillison.net {TOPIC}`

---

### AI Safety & Alignment

#### Neel Nanda — neelnanda.io
- **Depth**: `safety-alignment` / `deep-technical-with-math` (for mechanistic interpretability posts)
- **Focus**: Mechanistic interpretability, reverse-engineering transformers, circuits, superposition
- **Platform**: Custom (Squarespace-like)
- **Auth**: None
- **Frequency**: Sporadic
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, main"`
- **Notable posts**:
  - "A Comprehensive Mechanistic Interpretability Explainer & Glossary"
  - "Actually, Othello-GPT Has A Linear Emergent World Representation"
- **Search**: `site:neelnanda.io {TOPIC}`

#### LessWrong — lesswrong.com
- **Depth**: `mixed` (informal musings to deeply technical alignment research)
- **Focus**: AI safety/alignment, rationality, Bayesian reasoning, decision theory, existential risk
- **Platform**: Custom SPA (ForumMagnum, Meteor-based)
- **Auth**: None (free to read)
- **Frequency**: Daily (community-driven)
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, .PostsPage-postContent"` (SPA, needs JS rendering; works well with Crawl4AI, 50K+ chars)
- **Notable posts**:
  - Eliezer Yudkowsky's "Sequences"
  - "The Alignment Problem from a Deep Learning Perspective"
  - "Risks from Learned Optimization" (Mesa-Optimization)
- **Search**: `site:lesswrong.com {TOPIC}`

#### Alex Irpan — alexirpan.com
- **Depth**: `mixed` (opinionated long-form essays combining technical depth with commentary)
- **Focus**: Reinforcement learning (critique/analysis), robotics, alignment, honest ML assessments
- **Platform**: GitHub Pages / Jekyll
- **Auth**: None
- **Frequency**: ~2-5 posts/year
- **Extraction**: `python scripts/authenticated_extract.py "URL"`
- **Notable posts**:
  - "Deep Reinforcement Learning Doesn't Work Yet" — massively influential critique
- **Search**: `site:alexirpan.com {TOPIC}`

---

### Mixed / Other Technical

#### Nathan Lambert — interconnects.ai
- **Depth**: `mixed` (technical intuition + policy commentary; lighter on math)
- **Focus**: RLHF/post-training, open-source AI policy, reasoning models, frontier model releases
- **Platform**: Substack
- **Auth**: Some paid posts
- **Frequency**: ~Weekly
- **Extraction**: `python scripts/authenticated_extract.py "URL" --profile substack` (for paid); without `--profile` for free posts (NOTE: without `article` selector, may extract full page including nav; the Substack auto-detect handles this)
- **Notable posts**:
  - "RLHF is not RL"
  - "Why Reasoning Models Will Generalize"
- **Search**: `site:interconnects.ai {TOPIC}`

#### Michael Brenndoerfer — mbrenndoerfer.com/writing
- **Depth**: `mixed` (conceptual overviews to hands-on implementation guides)
- **Focus**: Data science, ML engineering, LLMs/GenAI, RAG, vector search, quantitative finance
- **Platform**: Custom static site
- **Auth**: None
- **Frequency**: Very high (~600+ articles)
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, main"`
- **Search**: `site:mbrenndoerfer.com {TOPIC}`

#### Jason Wei — jasonwei.net/blog
- **Depth**: `mixed` (research reflections + technical; moderate math)
- **Focus**: Chain-of-thought prompting, LLM scaling/emergence, evaluation methodology
- **Platform**: Custom (Squarespace-based)
- **Auth**: None
- **Frequency**: ~3-6 posts/year
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, main"`
- **Notable posts**:
  - "Successful Language Model Evals"
  - "Research I Enjoy"
- **Search**: `site:jasonwei.net {TOPIC}`

#### Suman Debnath — debnsuma.github.io/my-blog
- **Depth**: `production-systems` (hands-on walkthroughs, moderate math)
- **Focus**: Distributed ML training (PyTorch, Ray), AWS ML services, NLP/LLMs, RAG
- **Platform**: GitHub Pages (Quarto-based)
- **Auth**: None
- **Extraction**: `python scripts/authenticated_extract.py "URL"`
- **Search**: `site:debnsuma.github.io {TOPIC}`

#### Tom Aarsen — tomaarsen.com
- **Depth**: `production-systems` (library tutorials, implementation-focused)
- **Focus**: Sentence Transformers, text embeddings, information retrieval, SetFit
- **Platform**: Custom portfolio site (most content on HuggingFace/LinkedIn)
- **Auth**: None
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, main"`
- **Search**: `site:tomaarsen.com {TOPIC}` or `"Tom Aarsen" {TOPIC}`

#### Aleksa Gordić — aleksagordic.com/blog
- **Depth**: `mixed` (ELI5 explainers to implementation deep-dives; also career content)
- **Focus**: Flash Attention, LLM internals, graph ML, career in AI
- **Platform**: Custom site + Medium
- **Auth**: Medium has soft paywall for some posts
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, main"`
- **Search**: `site:aleksagordic.com {TOPIC}` or `gordicaleksa.medium.com {TOPIC}`

---

### Research Lab Blogs

#### BAIR Blog — bair.berkeley.edu/blog
- **Depth**: `deep-technical-with-math` (research-level; PhD students summarizing their work)
- **Focus**: RL, NLP, vision, robotics, AI safety, diffusion models (Berkeley AI Research)
- **Platform**: GitHub Pages / Jekyll
- **Auth**: None
- **Frequency**: ~Biweekly
- **Extraction**: `python scripts/authenticated_extract.py "URL"`
- **Search**: `site:bair.berkeley.edu/blog {TOPIC}`

#### The Gradient — thegradient.pub
- **Depth**: `mixed` (accessible but informed; essays + technical overviews)
- **Focus**: AI perspectives, ethics, interpretability, alignment, LLMs, societal impact
- **Platform**: Custom (Ghost-based)
- **Auth**: None
- **Frequency**: ~Weekly to biweekly
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, .post-content"`
- **Search**: `site:thegradient.pub {TOPIC}`

#### Gradient Science / MadryLab — gradientscience.org
- **Depth**: `deep-technical-with-math` (Aleksander Madry's MIT lab)
- **Focus**: ML robustness, adversarial examples, dataset bias, LLM benchmark reliability
- **Platform**: GitHub Pages / Jekyll
- **Auth**: None
- **Frequency**: ~4-8 posts/year
- **Extraction**: `python scripts/authenticated_extract.py "URL"`
- **Search**: `site:gradientscience.org {TOPIC}`

---

### Pure Mathematics

#### Terence Tao — terrytao.wordpress.com
- **Depth**: `pure-math` (Fields Medal-level; assumes graduate background)
- **Focus**: Analytic number theory, harmonic analysis, combinatorics, PDE, open problems
- **Platform**: WordPress.com
- **Auth**: None
- **Frequency**: ~Weekly (remarkably consistent)
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, .entry-content"` (NOTE: WordPress.com may need selector testing)
- **Search**: `site:terrytao.wordpress.com {TOPIC}`

#### Timothy Gowers — gowers.wordpress.com
- **Depth**: `pure-math` (Fields Medal-level; also excellent pedagogical posts)
- **Focus**: Combinatorics, complexity theory, mathematical pedagogy, proof exposition
- **Platform**: WordPress.com
- **Auth**: None
- **Frequency**: Sporadic
- **Extraction**: `python scripts/authenticated_extract.py "URL" -s "article, .entry-content"`
- **Search**: `site:gowers.wordpress.com {TOPIC}`

---

## Adding a New Blog to This Registry

When you discover an excellent technical blog during research, add it here. Follow this process:

### Step 1: Assess Quality (MANDATORY)

Read at least 3 posts from the blog. The blog MUST meet ALL of these criteria:
- **Original content**: Not just link aggregation or reposts
- **Technical depth**: Contains equations, code, derivations, or detailed analysis (not just opinions)
- **Pedagogical quality**: Explains concepts clearly enough to teach from
- **Consistent quality**: Multiple posts meet the above standards (not just one good post)

### Step 2: Test Extraction

```bash
conda activate ai-learning-gems

# Test with default settings
python scripts/authenticated_extract.py "URL_OF_A_POST" --no-images

# If output is empty or noisy, try common selectors:
python scripts/authenticated_extract.py "URL_OF_A_POST" -s "article" --no-images
python scripts/authenticated_extract.py "URL_OF_A_POST" -s "article, main" --no-images
python scripts/authenticated_extract.py "URL_OF_A_POST" -s ".post-content, .entry-content" --no-images

# Verify: output should be >1000 chars of clean article text
```

### Step 3: Add Entry

Use this template (add to the correct category section):

```markdown
#### [Author Name] — [domain]
- **Depth**: `[tag from Depth Tags table]`
- **Focus**: [2-3 sentence description of what they write about]
- **Platform**: [technology powering the site]
- **Auth**: [None / Some paid posts / Login required]
- **Frequency**: [how often they publish]
- **Extraction**: `python scripts/authenticated_extract.py "URL"` [add -s "selector" if needed]
- **Notable posts**:
  - [Post title 1]
  - [Post title 2]
  - [Post title 3]
- **Search**: `site:[domain] {TOPIC}`
```

### Step 4: Update the Workflow Search Queries

If the blog covers a common topic area, add its `site:` search to the research workflow's default search list.
