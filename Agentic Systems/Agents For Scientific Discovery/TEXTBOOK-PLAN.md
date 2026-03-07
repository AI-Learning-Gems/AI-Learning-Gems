# TEXTBOOK-PLAN: AI Agents for Scientific Discovery

## User Query
> I want to understand in depth how AI models like LLMs, VLMs etc are used for scientific discovery and data analysis and the seminal research papers on this from 2023, 2024, 2025, 2026. Look for seminal work on this especially the AI Scientist paper and various other visual discovery papers for science in data science and machine learning or other fields. I want a good understanding of several dozen papers attempt to do this via agentic LLM/VLM systems.

**Topic:** AI Agents (LLMs, VLMs) for Scientific Discovery and Data Analysis
**Prior Knowledge:** Basic ML/DL, familiarity with LLMs and prompting, agentic system concepts
**Learning Goals:** Deep understanding of several dozen papers on agentic LLM/VLM systems for scientific discovery—covering the full spectrum from hypothesis generation to experimental execution to paper writing
**Target Depth:** Researcher
**Output Folder:** `Agentic Systems/Agents For Scientific Discovery`

---

## Source Processing Log

::: {.callout-note collapse="true" title="Source Processing Log (45+ sources reviewed)"}

| # | Source | Type | arXiv / URL | Written | Accessed | Summary |
|---|--------|------|-------------|---------|----------|---------|
| 1 | The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery (Lu et al., Sakana AI) | [ACADEMIC] | `arxiv-2408.06292` | Aug 2024 | 2026-03-03 | KEY: First comprehensive framework for fully automatic scientific discovery—idea generation, code, experiments, paper writing, and automated peer review, all at <$15/paper. |
| 2 | The AI Scientist v2 (Yamada et al., Sakana AI) | [ACADEMIC] | `arxiv-2502.XXXXX` (Sakana blog) | Feb 2025 | 2026-03-03 | KEY: Removes human-authored code templates; uses progressive agentic tree-search. First fully AI-generated paper accepted after peer review. |
| 3 | ChemCrow: Augmenting large-language models with chemistry tools (Bran et al.) | [ACADEMIC] | `arxiv-2304.05376` | Apr 2023 | 2026-03-03 | KEY: LLM chemistry agent with 18 expert tools for synthesis, drug discovery, materials design. Published in Nature Machine Intelligence 2024. |
| 4 | Coscientist: Autonomous chemical research with large language models (Boiko et al.) | [ACADEMIC] | Nature 624, 570–578 (2023) | Dec 2023 | 2026-03-03 | KEY: GPT-4-driven system that autonomously designs, plans, and executes complex chemistry experiments. Published in Nature. |
| 5 | DS-Agent: Automated Data Science by Empowering LLMs with Case-Based Reasoning (Guo et al.) | [ACADEMIC] | `arxiv-2402.17453` | Feb 2024 | 2026-03-03 | KEY: Combines LLMs with case-based reasoning from Kaggle expert knowledge; 100% success rate with GPT-4. |
| 6 | DiscoveryBench: Towards Data-Driven Discovery with LLMs (Majumder et al.) | [ACADEMIC] | `arxiv-2407.01725` | Jul 2024 | 2026-03-03 | KEY: First benchmark formalizing multi-step data-driven discovery. 264 real + 903 synthetic tasks. Best system only 25%. |
| 7 | ScienceAgentBench: Toward Rigorous Assessment of Language Agents for Data-Driven Scientific Discovery (Chen et al.) | [ACADEMIC] | `arxiv-2410.05080` | Oct 2024 | 2026-03-03 | KEY: 102 tasks from 44 peer-reviewed papers across 4 disciplines. Best agent solves only 34.3% with expert knowledge. |
| 8 | BLADE: Benchmarking Language Model Agents for Data-Driven Science (Gu et al.) | [ACADEMIC] | `arxiv-2408.09667` | Aug 2024 | 2026-03-03 | KEY: 12 datasets with ground truth from expert data scientists. EMNLP 2024. LLMs limited to basic analyses. |
| 9 | MLGym: A New Framework and Benchmark for Advancing AI Research Agents (Meta) | [ACADEMIC] | `arxiv-2502.14499` | Feb 2025 | 2026-03-03 | KEY: First Gym environment for ML research tasks. 13 open-ended tasks. Frontier models find better hyperparams but don't generate novel hypotheses. |
| 10 | ResearchAgent: Iterative Research Idea Generation over Scientific Literature with LLMs (Baek et al.) | [ACADEMIC] | `arxiv-2404.07738` | Apr 2024 | 2026-03-03 | KEY: LLM-powered system that defines problems, proposes methods, designs experiments with iterative peer review from ReviewingAgents. |
| 11 | LLM-SR: Scientific Equation Discovery via Programming with LLMs (Shojaee et al.) | [ACADEMIC] | `arxiv-2404.18400` | Apr 2024 | 2026-03-03 | KEY: Combines LLM scientific priors with evolutionary search for symbolic regression. Outperforms SOTA baselines. |
| 12 | Agent Laboratory: Using LLM Agents as Research Assistants (Schmidgall et al., AMD/JHU) | [ACADEMIC] | `arxiv-2501.04227` | Jan 2025 | 2026-03-03 | KEY: Autonomous LLM framework for full research process (lit review → experiments → report). 84% cost reduction vs. prior methods. |
| 13 | Popper: Automated Hypothesis Validation with Agentic Sequential Falsifications (Kang et al.) | [ACADEMIC] | `arxiv-2502.09858` | Feb 2025 | 2026-03-03 | KEY: Falsification-based hypothesis validation. Strict Type-I error control. 10× faster than human scientists on biological hypotheses. |
| 14 | SELA: Tree-Search Enhanced LLM Agents for Automated Machine Learning (Gong et al.) | [ACADEMIC] | `arxiv-2410.17238` | Oct 2024 | 2026-03-03 | KEY: Uses MCTS to optimize AutoML pipeline configurations. 65-80% win rate against baselines across 20 datasets. |
| 15 | LIDA: Automatic Generation of Grammar-Agnostic Visualizations and Infographics using LLMs (Dibia, Microsoft) | [ACADEMIC] | `arxiv-2303.02927` | Mar 2023 | 2026-03-03 | KEY: Grammar-agnostic visualization generation from natural language. ACL 2023. Multi-stage pipeline for data→goals→code→infographics. |
| 16 | MLAgentBench: Evaluating Language Agents on Machine Learning Experimentation (Huang et al., Stanford) | [ACADEMIC] | `arxiv-2310.03302` | Oct 2023 | 2026-03-03 | KEY: 13 ML tasks requiring agents to interact with file systems, execute code, analyze outputs. Claude v3 Opus: 37.5% success. |
| 17 | PaperQA2 / WikiCrow (FutureHouse) | [ACADEMIC] | FutureHouse blog / arxiv | Sep 2024 | 2026-03-03 | KEY: Superhuman literature search agent. RAG-based. Foundation for Robin multi-agent system. |
| 18 | Robin: A Multi-Agent System for Scientific Discovery (FutureHouse) | [ACADEMIC] | `arxiv` (May 2025) | May 2025 | 2026-03-03 | KEY: Multi-agent system (Crow, Falcon, Finch) for therapeutic development. Autonomous drug repurposing discovery for dAMD. |
| 19 | Google AI Co-Scientist (Gottweis et al., Google DeepMind) | [ACADEMIC] | Google Research Blog / arXiv (2025) | Feb 2025 | 2026-03-03 | KEY: Gemini 2.0-based "generate, debate, evolve" framework. Validated drug repurposing for acute myeloid leukemia. |
| 20 | VirSci: Virtual Scientific Collaboration with Multi-Agent LLMs (NeurIPS 2024 review) | [ACADEMIC] | OpenReview / arXiv | 2024 | 2026-03-03 | KEY: Teams of LLM agents collectively generate and refine research ideas, outperforming single-agent methods. |
| 21 | HoneyComb: An LLM-based Agent for Materials Science (EMNLP 2024) | [ACADEMIC] | ACL Anthology | Nov 2024 | 2026-03-03 | KEY: Specialized materials science agent with dedicated knowledge base and tool hub. |
| 22 | DrugAgent: Automating ML Programming for Drug Discovery (2024) | [ACADEMIC] | `arxiv` (Nov 2024) | Nov 2024 | 2026-03-03 | KEY: Multi-agent framework for drug discovery ML tasks. Superior to existing methods. |
| 23 | MatAgent: Multi-Agent LLM Framework for Materials Discovery (2025) | [ACADEMIC] | OpenReview (Apr 2025) | Apr 2025 | 2026-03-03 | KEY: Accelerates materials discovery via property prediction, hypothesis generation, experimental data analysis. |
| 24 | LLMatDesign: Language-based Framework for Interpretable Materials Discovery (2024) | [ACADEMIC] | `arxiv` (Jun 2024) | Jun 2024 | 2026-03-03 | KEY: LLM-based interpretable materials discovery with minimal prior data. |
| 25 | ProtAgents: Multi-Agent LLMs for De Novo Protein Design (Ghafarollahi & Buehler, 2024) | [ACADEMIC] | arXiv (2024) | 2024 | 2026-03-03 | KEY: Multi-agent system for protein sequence design and structure-oriented ranking. |
| 26 | ProtChat: AI Multi-Agent System for Protein Analysis (2025) | [ACADEMIC] | PubMed/arXiv (Jan 2025) | Jan 2025 | 2026-03-03 | KEY: Integrates GPT-4 with protein LLMs for automated property prediction and drug interactions. |
| 27 | In-Context Symbolic Regression (ICSR) (Merler et al., 2024) | [ACADEMIC] | `arxiv-2404.19094` | Apr 2024 | 2026-03-03 | KEY: LLMs iteratively refine functional forms; external optimizer for coefficients. |
| 28 | Nova: Iterative Planning and Search for LLM-Generated Ideas (2024) | [ACADEMIC] | `arxiv-2410.14255` | Oct 2024 | 2026-03-03 | KEY: Boosts diversity/novelty of LLM research ideas via iterative planning and external knowledge retrieval. |
| 29 | AutoLabs: Multi-Agent Architecture for Lab Protocols (PNNL, 2025) | [ACADEMIC] | arXiv (2025) | 2025 | 2026-03-03 | KEY: Translates natural-language goals into precise laboratory synthesis protocols. |
| 30 | CodeAct: Executable Code Actions Elicit Better LLM Agents (Wang et al., 2024) | [ACADEMIC] | `arxiv-2402.01030` | Feb 2024 | 2026-03-03 | KEY: Code-centric LLM action framework. Core architecture of OpenHands. Improved success on multi-tool tasks. |
| 31 | Survey: A Survey of Scientific Large Language Models (arXiv 2025) | [ACADEMIC] | arXiv (2025) | 2025 | 2026-03-03 | KEY: Comprehensive survey of Sci-LLMs from data foundations to agentic frontiers. Defines the "agentic science phase." |
| 32 | Survey: Towards Scientific Intelligence — LLM-based Scientific Agents (arXiv 2025) | [ACADEMIC] | arXiv (2025) | 2025 | 2026-03-03 | KEY: Reviews architectures, benchmarks, applications of scientific LLM agents. Emphasizes domain-specific knowledge integration. |
| 33 | Survey: From Automation to Autonomy — LLMs in Scientific Discovery (arXiv 2025) | [ACADEMIC] | arXiv (2025) | 2025 | 2026-03-03 | KEY: Three-level taxonomy: Tool → Analyst → Scientist. |
| 34 | Asta DataVoyager (Allen Institute for AI, 2025) | [TUTORIAL] | allenai.org | Oct 2025 | 2026-03-03 | KEY: AI agent for interactive data-driven discovery. Natural language queries → reproducible code → visualizations. |
| 35 | ChartInsights: Evaluating MLLMs on Chart QA (EMNLP 2024) | [ACADEMIC] | ACL Anthology | 2024 | 2026-03-03 | KEY: Benchmark for low-level chart understanding by multimodal LLMs. |
| 36 | Insight-V: Enhanced MLLM Reasoning for Complex Multimodal Tasks (CVPR 2025) | [ACADEMIC] | CVPR 2025 | 2025 | 2026-03-03 | KEY: Robust reasoning data generation for complex multimodal tasks. |
| 37 | LLM-SRBench: Benchmark for Scientific Equation Discovery (2024) | [ACADEMIC] | arXiv/creddy.net | 2024 | 2026-03-03 | KEY: Evaluates LLM-based scientific equation discovery methods. |
| 38 | DSBench / DataSciBench (2024) | [ACADEMIC] | arXiv (2024) | 2024 | 2026-03-03 | KEY: Additional benchmarks for LLM agents in data science tasks. |
| 39 | Awesome-Agents4Science (GitHub) | [COMMUNITY] | github.com | 2024-2025 | 2026-03-03 | KEY: Curated list of papers on AI agents for scientific discovery. |
| 40 | Awesome-LLM-Agents-Scientific-Discovery (GitHub) | [COMMUNITY] | github.com | 2024-2025 | 2026-03-03 | KEY: Another curated list tracking rapid advancements in this field. |

:::

---

## Chapter Overview

**Total sections:** 6 (plus closing)
**Estimated total length:** 9,000-12,000 words
**Running example:** Dr. Maya Chen, a computational biologist at a mid-tier university who studies drug repurposing for rare diseases. She has domain expertise but limited compute, no dedicated ML engineer, and reads ~300 papers/year. We follow her journey as she encounters and evaluates different AI agent systems for each stage of her research workflow—from literature synthesis through hypothesis generation, experimental design, data analysis, and manuscript preparation.

### Hook & Running Example Design

Maya's lab recently published a paper on potential drug repurposing candidates for a rare autoimmune disorder, but the process took 18 months: six months surveying 2,000 papers, four months on computational experiments, and eight months iterating on analysis and writing. During a conference coffee break in late 2024, a colleague mentions that FutureHouse's Robin system autonomously discovered and validated a drug repurposing candidate for macular degeneration—not in 18 months, but in days. Maya is skeptical but intrigued: *Could an AI system really do in days what took her lab over a year?*

This skepticism anchors the chapter's narrative arc. In each section, we explore a different capability that AI agents bring to the scientific process—literature review, hypothesis generation, experimental execution, data analysis, equation discovery, and full-cycle automation—through the lens of what Maya would gain (or lose) by adopting these systems. The running example grounds abstract architectural discussions in concrete, relatable research decisions.

The paradox driving the chapter is this: despite remarkable demonstrations (the AI Scientist writing papers for $15, Coscientist executing chemistry experiments autonomously, Google's AI co-scientist proposing validated drug targets), rigorous benchmarks like DiscoveryBench and ScienceAgentBench show that even the best agents solve only 25-34% of real scientific tasks. This tension between impressive demos and sobering benchmarks is the central intellectual challenge the chapter addresses.

**Hook Image:** The AI Scientist's system diagram (from `arxiv-2408.06292`) showing the full research pipeline from idea generation → experiment execution → paper writing → automated review. This single figure visually captures the audacious scope of the field and connects directly to Maya's question: can AI really automate the full loop?

---

## Section Plan

### Section 1: The Landscape — From Tool Use to Autonomous Science {#sec-landscape}

**File:** `_01-landscape.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** Establish the taxonomy and historical arc of AI agents in science, from simple tool-augmented LLMs to fully autonomous research systems. The reader should understand the three-level hierarchy (Tool → Analyst → Scientist) and where each major system fits.
**Running example application:** Maya learns about the "three levels of autonomy" taxonomy and realizes her current use of ChatGPT for brainstorming is Level 1 (Tool), but the systems her colleague described operate at Level 3 (Scientist).

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------|-----------------|
| Survey: From Automation to Autonomy (2025) | Tool/Analyst/Scientist taxonomy | Three-level classification framework |
| Survey: Sci-LLMs (2025) | "Agentic science phase" section | Timeline from data-focused to agentic |
| Survey: LLM-based Scientific Agents (2025) | Architecture overview | Agent architecture patterns (perception, reasoning, action) |
| ChemCrow (2304.05376) | Introduction, system design | Early example of tool-augmented LLM for science |
| AI Scientist (2408.06292) | Introduction, related work | Full-cycle automation as the ultimate aspiration |

**Content outline:**
1. The three ages of AI in science (pre-LLM ML, tool-augmented LLMs 2023, agentic systems 2024-2025)—with concrete example of how each era would address Maya's drug repurposing problem
2. The Tool → Analyst → Scientist taxonomy with representative papers at each level
3. Architectural building blocks: perception (multimodal input), reasoning (chain-of-thought, tree search), action (code execution, tool calling, lab control), memory (RAG, knowledge graphs)
4. The "agentic science phase" (2024-2025): a map of the landscape organized by scientific workflow stage

**Key equations:** None (conceptual section)
**Visualizations:** D2 concept map showing the taxonomy (Tool/Analyst/Scientist levels with representative systems); timeline diagram of key papers 2023-2025
**Source images to embed:** Architecture diagrams from the surveys if available
**Self-explanation prompts:**
- "Where does your current use of LLMs for research fall on the Tool→Analyst→Scientist spectrum?"
- "What capabilities would need to improve most for agents to move from Analyst to Scientist level?"

---

### Section 2: Literature Synthesis and Hypothesis Generation — The First Steps of Discovery {#sec-hypothesis}

**File:** `_02-hypothesis-generation.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** Understand how AI agents automate literature review and hypothesis generation—the intellectual front-end of scientific discovery. Cover PaperQA2/Robin, ResearchAgent, Google AI co-scientist, VirSci, Nova, and the Popper validation framework.
**Running example application:** Maya uses PaperQA2 to synthesize her field's literature in hours instead of months. She then uses a ResearchAgent-like system to propose novel drug repurposing hypotheses, with VirSci-style multi-agent debate to refine them. Finally, Popper validates the strongest hypotheses before wet-lab experiments.

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------|-----------------|
| PaperQA2 (FutureHouse, Sep 2024) | Architecture, RAG pipeline, evaluation | Superhuman literature search, citations |
| Robin (FutureHouse, May 2025) | Multi-agent architecture (Crow, Falcon, Finch) | Drug discovery workflow, dAMD validation |
| ResearchAgent (2404.07738) | System design, iterative refinement | ReviewingAgents, academic graph augmentation |
| Google AI Co-Scientist (Gottweis et al., 2025) | Generate-debate-evolve framework | Gemini 2.0 multi-agent, AML drug repurposing |
| VirSci (2024) | Virtual scientist teams | Multi-agent collaboration outperforms single-agent |
| Nova (2410.14255) | Iterative planning and search | Diversity/novelty boosting for LLM ideas |
| Popper (2502.09858) | Sequential falsification framework | Type-I error control, biological hypothesis validation |

**Content outline:**
1. The literature synthesis bottleneck—why reading 2,000 papers took Maya 6 months, and how PaperQA2 achieves superhuman performance on literature search tasks
2. From retrieval to generation: ResearchAgent's approach to defining novel problems from academic graphs, with iterative peer-review refinement
3. Multi-agent debate and refinement: Google AI co-scientist's "generate, debate, evolve" framework and VirSci's collaborative virtual scientist teams
4. Hypothesis validation before experiments: Popper's falsification framework—designing and executing statistical tests with Type-I error control
5. The full pipeline: Robin's integration of literature search (Crow/Falcon) → hypothesis generation → data analysis (Finch) demonstrated in drug repurposing

**Key equations:** Popper's sequential testing framework (Type-I error bound), basic RAG formulation
**Visualizations:** Flow diagram of the hypothesis generation pipeline (literature → hypothesis → debate → validation); comparison table of systems
**Source images to embed:** Robin multi-agent architecture diagram; Google AI co-scientist framework
**Self-explanation prompts:**
- "What's the difference between generating a hypothesis and validating one? Why does Popper emphasize falsification rather than confirmation?"
- "How does multi-agent debate (VirSci, Google co-scientist) help avoid single-agent biases in hypothesis generation?"

---

### Section 3: Autonomous Experimentation — From Code to Chemistry {#sec-experimentation}

**File:** `_03-autonomous-experimentation.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** Understand systems that autonomously execute experiments—both computational (code-based ML experiments) and physical (robotic lab automation). Cover ChemCrow, Coscientist, Agent Laboratory, CodeAct/OpenHands, SELA, and self-driving labs.
**Running example application:** Maya's computational experiments—running molecular docking simulations, training ML models on protein-drug interaction data—could be automated by an Agent Laboratory-style system. For physical validation, a Coscientist-like system could autonomously execute assays in a cloud lab.

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------|-----------------|
| ChemCrow (2304.05376) | Tool integration, synthesis examples | 18 chemistry tools, autonomous chromophore discovery |
| Coscientist (Nature 2023) | System architecture, experimental results | GPT-4 + cloud lab integration, cross-coupling optimization |
| Agent Laboratory (2501.04227) | Three-stage pipeline | Lit review → experimentation → report writing; 84% cost reduction |
| CodeAct (2402.01030) | Code execution framework | Python-based action space, self-debugging |
| SELA (2410.17238) | MCTS for AutoML | Tree-search over pipeline configurations; 65-80% win rate |
| OpenHands / OpenDevin | Architecture, SWE-bench results | Open-source coding agent platform |
| AutoLabs (PNNL, 2025) | Natural language → lab protocols | Multi-agent architecture for synthesis tasks |

**Content outline:**
1. Computational experimentation: how CodeAct and OpenHands enable LLM agents to write, execute, and debug code autonomously—the fundamental capability underlying all computational science agents
2. Structured search over experiment space: SELA's use of Monte Carlo Tree Search to explore ML pipeline configurations intelligently rather than randomly
3. Agent Laboratory: the three-stage pipeline (literature review → experimentation → report writing) and how human feedback at each stage improves quality
4. Chemistry in the loop: ChemCrow's 18 expert tools and Coscientist's integration with robotic labs—from planning reactions to executing them physically
5. Self-driving laboratories: the convergence of LLMs + robotics + automated instrumentation. AutoLabs and the path toward 24/7 autonomous research facilities

**Key equations:** MCTS selection criteria (UCB formula), basic ReAct loop formulation
**Visualizations:** Comparison table of computational vs. physical experimentation agents; Agent Laboratory three-stage pipeline diagram
**Source images to embed:** ChemCrow tool integration diagram; Coscientist system architecture; SELA tree search illustration
**Self-explanation prompts:**
- "Why might tree-search (SELA) produce better results than iterative refinement alone for ML experiments?"
- "What are the key safety concerns when LLM agents control physical laboratory equipment?"

---

### Section 4: Data Analysis and Visual Discovery — Making Sense of Results {#sec-data-analysis}

**File:** `_04-data-analysis.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** Understand how AI agents perform data analysis, visualization, and equation/pattern discovery from scientific data. Cover DS-Agent, LIDA, LLM-SR, Asta DataVoyager, and multimodal chart understanding systems.
**Running example application:** After her computational experiments generate gigabytes of protein-drug interaction data, Maya needs to analyze results, generate publication-quality figures, and discover mathematical relationships in dosage-response curves. DS-Agent, LIDA, and LLM-SR each address different aspects of this challenge.

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------|-----------------|
| DS-Agent (2402.17453) | CBR framework, Kaggle integration | Case-based reasoning pipeline, 100% success rate |
| LIDA (2303.02927) | Multi-stage pipeline | Data summarization → goals → code → infographics |
| LLM-SR (2404.18400) | Equation-as-program approach | Scientific priors + evolutionary search |
| ICSR (2404.19094) | In-context symbolic regression | Iterative refinement of functional forms |
| Asta DataVoyager (Ai2, Oct 2025) | Natural language → analysis | Reproducible code, transparent reasoning |
| ChartInsights (EMNLP 2024) | Chart QA benchmarking | MLLM chart understanding evaluation |
| ChartVRBench (2025) | Visual chart reasoning | Evaluation of visual vs. textual reasoning in MLLMs |

**Content outline:**
1. The data analysis challenge in science: from raw experimental output to publishable insight—why this requires both statistical expertise and domain knowledge
2. Automated ML experimentation: DS-Agent's case-based reasoning approach, leveraging Kaggle expert knowledge to build and iterate on ML models
3. Visualization as discovery: LIDA's multi-stage pipeline (summarize → explore goals → generate code → create infographics) and DataVoyager's natural language approach to scientific data exploration
4. Equation discovery from data: LLM-SR's "equations as programs" framework combining LLM scientific priors with evolutionary search, and how ICSR uses in-context learning for symbolic regression
5. Visual understanding by AI: how multimodal LLMs interpret charts and figures (ChartInsights, ChartVRBench)—the flip side of generation—and why this matters for automated literature review and result verification

**Key equations:** LLM-SR's equation optimization objective; symbolic regression loss formulation
**Visualizations:** LIDA pipeline diagram; LLM-SR evolutionary search illustration; comparison table of data analysis agent capabilities
**Source images to embed:** LIDA multi-stage architecture; LLM-SR equation discovery examples
**Self-explanation prompts:**
- "How does DS-Agent's case-based reasoning differ from simply prompting an LLM to 'analyze this dataset'?"
- "Why might LLM-SR's incorporation of scientific priors lead to better out-of-domain generalization than pure symbolic regression?"

---

### Section 5: The Full-Cycle AI Scientist — End-to-End Research Automation {#sec-full-cycle}

**File:** `_05-full-cycle-ai-scientist.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** Deep dive into systems that attempt to automate the entire research cycle: The AI Scientist (v1 and v2), and the emerging ecosystem of full-cycle agents. Critically examine what works, what fails, and the gap between demos and benchmarks.
**Running example application:** Maya considers whether she could deploy The AI Scientist to autonomously generate and test hypotheses about her drug repurposing candidates. We walk through what would happen if she did—the successes and the failure modes.

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------|-----------------|
| AI Scientist v1 (2408.06292) | Full system design, experimental results | Idea generation, code writing, paper writing, automated review |
| AI Scientist v2 (Sakana blog, Feb 2025) | Progressive agentic tree-search | Template-free approach, first accepted AI-generated paper |
| Agent Laboratory (2501.04227) | Comparison with AI Scientist | Human-in-the-loop vs. fully autonomous; cost comparison |
| Robin / FutureHouse Platform (May 2025) | Drug repurposing validation | End-to-end from hypothesis to experimental validation |
| Google AI Co-Scientist (2025) | AML drug repurposing validation | From hypothesis to in vitro confirmation |

**Content outline:**
1. The audacious vision: The AI Scientist v1's architecture—a single system that generates ideas, writes code, runs experiments, creates figures, writes complete papers, and reviews them. A detailed walk-through of how it works on a diffusion modeling research question.
2. What $15 buys you: concrete examples of AI Scientist outputs—successes (novel research directions in learning dynamics) and failures (inadequate literature review, experiment execution bugs, unsubstantiated claims in manuscripts)
3. From templates to agentic search: AI Scientist v2's progressive tree-search methodology and the significance of the first peer-reviewed AI-generated paper
4. The human-in-the-loop alternative: Agent Laboratory's three-stage approach with human feedback at each gate. Why "84% cost reduction" and "human feedback significantly improves quality" reveal both the promise and the limitation
5. Real-world validation: FutureHouse Robin's autonomous discovery of a dAMD drug repurposing candidate and Google's AI co-scientist validating AML drug targets in vitro—the crucial step from computational hypothesis to experimental confirmation

**Key equations:** AI Scientist's automated review scoring rubric (if formalizable)
**Visualizations:** Side-by-side comparison of AI Scientist v1 vs v2 vs Agent Laboratory; flow diagram of the full research automation pipeline
**Source images to embed:** AI Scientist system overview diagram; example generated paper excerpts
**Self-explanation prompts:**
- "Why does The AI Scientist's automated reviewer achieve 'near-human performance' while the actual paper generation has significant shortcomings? What does this tell us about the relative difficulty of evaluation vs. generation?"
- "What role does human feedback play in Agent Laboratory, and at what point (if ever) might this become unnecessary?"

---

### Section 6: Benchmarking the Dream — How Well Do AI Agents Actually Do Science? {#sec-benchmarks}

**File:** `_06-benchmarks.qmd`
**Estimated length:** 1,500-2,000 words
**Goal:** Critically examine benchmarks and evaluation methods for scientific AI agents. Understand what they measure, what the current performance levels are, and what the gaps reveal about the path to truly autonomous science. Cover DiscoveryBench, ScienceAgentBench, BLADE, MLAgentBench, MLGym, and domain-specific evaluations.
**Running example application:** Maya wants to assess whether any of these agent systems is ready for her drug repurposing work. She evaluates them against the benchmarks and finds that even the best agents succeed only 25-42% of the time on realistic scientific tasks.

**Sources needed:**

| Source | Specific Sections | What to Extract |
|--------|------------------|-----------------|
| DiscoveryBench (2407.01725) | Task design, evaluation metrics | 264 real-world + 903 synthetic tasks; facet-based evaluation |
| ScienceAgentBench (2410.05080) | 102 tasks, 4 disciplines | Expert-validated code generation tasks; 34.3% best accuracy |
| BLADE (2408.09667) | 12 datasets, expert ground truth | Open-ended analytical decision evaluation |
| MLAgentBench (2310.03302) | 13 ML tasks | File system interaction, code execution; 37.5% success |
| MLGym (2502.14499) | 13 open-ended research tasks | First Gym environment; frontier models can't generate novel hypotheses |
| DSBench / DataSciBench (2024) | Data science task evaluation | Additional benchmark perspectives |

**Content outline:**
1. The benchmark landscape: why evaluating AI scientists is fundamentally harder than evaluating chatbots—open-endedness, multiple valid approaches, partial credit, and the compositionality of scientific reasoning
2. Discovery-oriented benchmarks: DiscoveryBench's formalization of multi-step data-driven discovery (264 tasks, 6 domains, best=25%) and what facet-based evaluation reveals about failure modes
3. Code-generation benchmarks: ScienceAgentBench (102 tasks, 4 disciplines, best=34.3%) and how the Self-Debug framework outperforms OpenHands CodeAct—showing that inference-time compute (o1-preview at 42.2%) helps but doesn't solve the problem
4. Analysis quality benchmarks: BLADE's expert-validated ground truth for open-ended research questions and what it reveals about LLMs' tendency toward basic-only analyses
5. ML research benchmarks: MLAgentBench's seminal contribution and MLGym's sobering finding that frontier models "do not generate novel hypotheses, algorithms, architectures, or substantial improvements"
6. The gap between demo and benchmark: reconciling the impressive demos (AI Scientist, Robin, Google co-scientist) with the benchmark results. What this tension reveals about the current state and future trajectory.

**Key equations:** ScienceAgentBench metrics (valid execution rate, success rate, CodeBERTScore); DiscoveryBench scoring formulation
**Visualizations:** Summary table of all benchmarks (tasks, domains, best scores, year); bar chart comparing best agent performance across benchmarks; radar chart of capability gaps
**Source images to embed:** Benchmark comparison tables from the papers
**Self-explanation prompts:**
- "Why might an agent perform well on synthetic benchmark tasks but poorly on real-world scientific problems?"
- "The best agents solve only 25-42% of benchmark tasks. Is this glass half-full or half-empty? What rate of improvement would be needed for practical usefulness?"

---

## Source Image Catalog

**Note:** Due to sandbox restrictions preventing direct CLI downloads to the `sources/` directory during this research session, source images will need to be downloaded during the writing phase. The following images have been identified as high-priority for embedding.

| # | Source Paper | Expected Image | Caption/Description | Relevant Section(s) | Notes |
|---|-------------|---------------|--------------------|--------------------|-------|
| 1 | AI Scientist (2408.06292) | System overview diagram | Full pipeline: idea generation → code → experiments → paper → review | §1 Landscape, §5 Full-Cycle | MUST include — canonical architecture diagram |
| 2 | AI Scientist (2408.06292) | Example generated paper | Sample output showing paper quality | §5 Full-Cycle | Shows both capability and limitations |
| 3 | ChemCrow (2304.05376) | Tool integration diagram | 18 chemistry tools augmenting GPT-4 | §3 Experimentation | Shows tool-augmented LLM pattern |
| 4 | Coscientist (Nature 2023) | Autonomous chemistry workflow | LLM → planning → cloud lab execution | §3 Experimentation | Real-world lab integration |
| 5 | Robin (FutureHouse) | Multi-agent architecture | Crow, Falcon, Finch agent roles | §2 Hypothesis Generation | Multi-agent scientific system |
| 6 | Google AI Co-Scientist | Generate-debate-evolve | Multi-agent hypothesis refinement | §2 Hypothesis Generation | Industry-scale system |
| 7 | LLM-SR (2404.18400) | Equation discovery pipeline | LLM proposes skeletons → evolutionary optimization | §4 Data Analysis | Novel equation discovery approach |
| 8 | LIDA (2303.02927) | Multi-stage pipeline | Summarize → goals → code → infographics | §4 Data Analysis | Visualization generation |
| 9 | DiscoveryBench (2407.01725) | Task design overview | Multi-step discovery formalization | §6 Benchmarks | Benchmark design |
| 10 | ScienceAgentBench (2410.05080) | Performance comparison | Agent success rates across disciplines | §6 Benchmarks | Key benchmark results |
| 11 | Agent Laboratory (2501.04227) | Three-stage pipeline | Lit review → experimentation → report | §5 Full-Cycle | Human-in-the-loop design |
| 12 | SELA (2410.17238) | MCTS tree search | Pipeline configuration as tree | §3 Experimentation | Tree-search for AutoML |
| 13 | DS-Agent (2402.17453) | CBR framework diagram | Case-based reasoning pipeline | §4 Data Analysis | Knowledge-driven data science |

**Priority order for visuals:**
1. **Source images from downloaded papers** — canonical architecture diagrams from key papers
2. **D2 diagrams** — taxonomy map, benchmark comparison, pipeline flows
3. **Python/hvPlot** — benchmark performance comparisons, timeline of papers
4. **generate_image** — only for custom conceptual illustrations if needed

---

### Section 99: Closing {#sec-closing}

**File:** `_99-closing.qmd`
**Estimated length:** 1,000-1,500 words

**Content:**
1. **Key takeaways** (7 bullet points):
   - AI agents for science have evolved through three distinct phases: tool-augmented (2023), analyst-level (2024), and nascent scientist-level (2024-2025)
   - The AI Scientist demonstrated that end-to-end research automation is technically feasible at <$15/paper, but benchmark results show current agents solve only 25-42% of real scientific tasks
   - Multi-agent debate and collaboration (VirSci, Google co-scientist, Robin) outperforms single-agent approaches for hypothesis generation
   - Tool-augmented agents (ChemCrow, Coscientist) have achieved real-world scientific outputs—actual synthesized molecules and validated drug targets
   - The gap between impressive demos and benchmark performance reveals that scientific reasoning requires compositional capabilities that current LLMs haven't fully mastered
   - Human-in-the-loop approaches (Agent Laboratory) significantly improve quality and reduce costs, suggesting that augmentation rather than full automation is the near-term path
   - Domain-specific knowledge integration (DS-Agent's CBR, ChemCrow's expert tools, PaperQA2's RAG) consistently outperforms generic prompting approaches

2. **Completed concept map** (D2 diagram showing the relationships between all major systems, organized by workflow stage and autonomy level)

3. **Retrieval practice questions** (7, with answers in collapsed callout):
   - What are the three levels in the Tool→Analyst→Scientist taxonomy?
   - How does Popper's falsification approach differ from simply asking an LLM to "evaluate this hypothesis"?
   - Why does DS-Agent use case-based reasoning from Kaggle rather than pure LLM prompting?
   - What is the key architectural difference between AI Scientist v1 and v2?
   - Why does SELA use Monte Carlo Tree Search for AutoML rather than iterative prompting?
   - What does MLGym's finding that frontier models "don't generate novel hypotheses" imply about the current state of AI research agents?
   - How does FutureHouse's Robin integrate literature review, hypothesis generation, and experimental validation?

4. **Common mistakes section:**
   - Conflating demo capabilities with benchmark performance (the AI Scientist writes papers, but only 25-34% of benchmark tasks are solved)
   - Assuming that tool-augmented approaches (ChemCrow) and fully autonomous approaches (AI Scientist) are on the same capability spectrum—they solve fundamentally different problems
   - Treating "LLM for science" as a single category rather than recognizing the diversity of workflow stages (literature, hypothesis, experiment, analysis, writing)
   - Ignoring the role of domain-specific knowledge injection (CBR, expert tools, specialized RAG) in favor of scaling model size alone

5. **Curated resource list:**
   - Papers: AI Scientist (2408.06292), ChemCrow (2304.05376→Nature MI), Coscientist (Nature 2023), DiscoveryBench (2407.01725), ScienceAgentBench (2410.05080), Popper (2502.09858)
   - GitHub: awesome-agents4science, AI-Scientist code, OpenHands
   - Surveys: "From Automation to Autonomy" (2025), "Towards Scientific Intelligence" (2025)
   - Tools: PaperQA2 (FutureHouse), LIDA (Microsoft), DataVoyager (Ai2)

---

## Cross-Cutting Concerns

**Notation table:**

| Symbol | Meaning |
|--------|---------|
| $\mathcal{H}$ | Hypothesis space |
| $\mathcal{D}$ | Dataset |
| $\mathcal{T}$ | Tool set available to agent |
| $\pi$ | Agent policy (mapping observations to actions) |
| $s_t$ | State at time step $t$ in agentic loop |
| $a_t$ | Action taken at time step $t$ |
| $r_t$ | Reward/feedback at time step $t$ |
| $f(\cdot)$ | Scientific equation/function being discovered |
| $\alpha$ | Type-I error rate (in Popper's framework) |

**Concept map design:** D2 diagram with four semantic classes:
- **Green nodes:** Systems/agents (AI Scientist, ChemCrow, Robin, etc.)
- **Blue nodes:** Capabilities (hypothesis generation, code execution, lab automation, etc.)
- **Orange nodes:** Benchmarks (DiscoveryBench, ScienceAgentBench, BLADE, MLGym)
- **Red nodes:** Limitations/challenges (hallucination, 25-34% success, safety, reproducibility)
Connections show which systems demonstrate which capabilities and are evaluated by which benchmarks.

**Prerequisite knowledge to recap:**
- LLM fundamentals (prompting, chain-of-thought, in-context learning)
- Basic agentic AI concepts (ReAct loop, tool use, planning)
- Retrieval-Augmented Generation (RAG) basics
- Basic statistics (hypothesis testing, Type-I/II errors) for the Popper section

**Common Misconceptions:**
1. **"The AI Scientist can replace human researchers"** — Benchmark results (25-42% task success) show it augments rather than replaces. The system's automated reviewer achieves near-human performance, but the generated research has significant quality gaps.
2. **"More parameters = better scientific reasoning"** — MLGym shows frontier models find better hyperparameters but don't generate novel hypotheses. DS-Agent's case-based reasoning outperforms pure LLM prompting despite using smaller models.
3. **"AI agents for science are general-purpose"** — The most successful systems (ChemCrow, HoneyComb, PaperQA2) are highly domain-specialized with expert-designed tools, rather than general-purpose agents applied to science.
4. **"Visual/multimodal capabilities are a nice-to-have"** — Chart understanding (ChartInsights, ChartVRBench) reveals that MLLMs often rely on textual recognition rather than genuine visual reasoning, which limits their utility for interpreting experimental results.
5. **"Autonomous experimentation requires AGI"** — Coscientist and ChemCrow demonstrate that focused, tool-augmented approaches can achieve autonomy within constrained domains without requiring AGI-level capabilities.

**Think Hard questions:**
1. What is the minimum level of scientific understanding an AI agent needs to generate genuinely novel hypotheses, vs. recombining elements from its training data?
2. How should we evaluate AI-generated scientific discoveries—by the same standards as human research, or by different criteria that account for the agent's different failure modes?
3. If AI Scientist v2 can produce papers that pass peer review, does this reveal more about the AI's capability or about the limitations of peer review as a quality filter?
4. What happens to the scientific ecosystem when the marginal cost of generating a research paper drops from $100,000+ (human researcher time) to $15 (AI Scientist)? Is quantity a substitute for quality?
5. At what point does human-in-the-loop feedback (Agent Laboratory) become a bottleneck rather than a quality improvement? How do we know when to remove the human from the loop?
