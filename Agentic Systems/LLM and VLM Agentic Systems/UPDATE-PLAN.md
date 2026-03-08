# Update Plan for LLM/VLM Agentic Systems

**Date:** 2026-03-08
**New Sources Provided:** 5 explicit + ~40 from research report

---

## Source Triage

### (A) REINFORCES — Will be integrated

| # | Source | Affects Section | What It Adds |
|---|---|---|---|
| 1 | [Towards a Science of Scaling Agent Systems (Kim et al., 2026)](https://arxiv.org/abs/2512.08296) | _04-multi-agent-systems.qmd | **Critical empirical evidence** for existing multi-agent claims. Replaces anecdotal "3-7x overhead" with quantified error amplification (17.2x independent, 4.4x centralized). Validates the existing misconception callout ("multi-agent is not always better") with hard numbers. |
| 2 | [MAST: Why Do Multi-Agent LLM Systems Fail? (Cemri et al., NeurIPS 2025)](https://arxiv.org/abs/2503.13657) | _04-multi-agent-systems.qmd, _05-real-world-agents.qmd | First systematic failure taxonomy (14 modes, 3 categories). Strengthens the "four failure archetypes" in §5 with empirical grounding. |
| 3 | [Cameron Wolfe: AI Agents from First Principles](https://cameronrwolfe.substack.com/p/ai-agents) | _02-what-is-an-agent.qmd | Wolfe's "Level 0-3" spectrum (LLM → tool use → decomposition → autonomy) provides a cleaner pedagogical framing than our current "spectrum" diagram. Reinforces ReAct explanation with concrete prompt examples. |
| 4 | [MaAS: Multi-agent Architecture Search (ICML 2025 Oral)](https://arxiv.org/abs/2505.10468) | _06-frontiers.qmd | Directly extends ADAS section — treats multi-agent design as architecture search. Strengthens the meta-design frontier. |
| 5 | [MemAgent: RL Memory for Agents (ICLR 2026 Oral)](https://arxiv.org/abs/2504.12345) | _03-tools-memory-grounding.qmd, _06-frontiers.qmd | RL-trained memory management directly extends MemGPT discussion. Shows the frontier of making memory management learnable. |

### (B) EXTENDS — Will be integrated (new sections needed)

| # | Source | Proposed Section | What It Adds | Estimated Words |
|---|---|---|---|---|
| 6 | Google Scaling Paper + MAST + MaAS combined | NEW: _04b-when-multi-agent-helps.qmd | The existing §4 describes multi-agent *architectures*. New empirical evidence (Google: 180 configs, MAST: 1600 traces) warrants a dedicated subsection on *when and why* multi-agent helps or hurts. This is the most important update — it transforms vague guidance into quantified principles. | ~2000 |
| 7 | Cameron Wolfe's "Level 0-3" + Sapkota survey taxonomy | Extend _02-what-is-an-agent.qmd | Deepen the "what is an agent" section with Wolfe's cleaner spectrum and the AI Agent vs. Agentic AI distinction from Sapkota. Current treatment is good but could be sharper. | ~500 |
| 8 | Claude Code, Cursor, Codex, Operator as applications | NEW: _07-agents-in-practice.qmd | The user correctly notes the chapter is "babyish" — everyone uses these tools now. A section mapping foundational concepts to real products (Claude Code's agentic loop = ReAct + Reflexion + ACI, Cursor = multi-agent orchestration + tool use, etc.) would ground the theory. | ~2500 |

### (C) OUT-OF-SCOPE — Noted for future chapters

| # | Source | Why Out of Scope | Suggested Future Chapter |
|---|---|---|---|
| 1 | CollabLLM (ICML 2025 Outstanding) | Active clarification is agent-adjacent but not core agent architecture | "Human-Agent Interaction" |
| 2 | Paprika (ICML 2025 Oral) | Curiosity-driven RL for agents — too specialized for foundations chapter | "RL for Agent Training" (deep dive) |
| 3 | Cross-environment Cooperation (ICML 2025 Oral) | Zero-shot multi-agent coordination — niche within multi-agent | "Advanced Multi-Agent Systems" |
| 4 | Huxley-Gödel Machine (ICLR 2026 Oral) | Self-improving coding agent — interesting but too specialized | "Code Agents Deep Dive" |
| 5 | Active Reasoning with Belief Tracking (ICLR 2026 Oral) | Belief tracking for agents — theoretical extension beyond chapter scope | "Agent Reasoning Theory" |
| 6 | AstaBench, CyberGym (ICLR 2026) | Domain-specific benchmarks — chapter already covers benchmark principles | "Agent Evaluation Deep Dive" |
| 7 | ReconVLA (AAAI 2026 Outstanding) | Embodied VLA models — outside text-agent scope | "Embodied AI Agents" |
| 8 | AI Agents vs. Agentic AI survey (Sapkota) full paper | The full 30-page survey is too detailed; we extract only the taxonomy distinction | Already using the key insight |
| 9 | Artificial Hivemind (NeurIPS 2025 Best Paper D&B) | Collective intelligence benchmarks — niche | "Agent Evaluation Deep Dive" |
| 10 | 2025 AI Agent Index (MIT) | Industry deployment database — not foundational research | "Agent Deployment & Operations" |
| 11 | Intelligent AI Delegation (DeepMind) | Formal delegation framework — too theoretical for foundations | "Agent Safety & Governance" |

## Proposed Restructured Section Plan

The user asked for 1-2 new sections and restructuring. Here is the proposed plan:

### Current → Proposed Mapping

| Current | Proposed | Changes |
|---|---|---|
| _01-introduction.qmd | _01-introduction.qmd | Minor updates (add new sources to log, update chapter overview for new sections) |
| _02-what-is-an-agent.qmd | _02-what-is-an-agent.qmd | EXTEND with Wolfe's Level 0-3 spectrum and Sapkota's AI Agent vs Agentic AI distinction |
| _02-reasoning-and-acting.qmd | _03-reasoning-and-acting.qmd | RENAME (renumber to _03) but keep content unchanged |
| _03-tools-memory-grounding.qmd | _04-tools-memory-grounding.qmd | RENAME. Add brief mention of MemAgent (ICLR 2026) as frontier in memory |
| _04-multi-agent-systems.qmd | _05-multi-agent-systems.qmd | MAJOR UPDATE: integrate Google scaling paper and MAST findings. Add quantified error amplification, the 5-architecture taxonomy, and the 14 failure modes. |
| _05-real-world-agents.qmd | _06-real-world-agents.qmd | RENAME. Minor update with MAST failure taxonomy reference |
| NEW | _07-agents-in-practice.qmd | **NEW SECTION**: Map foundational concepts to real products (Claude Code, Cursor, Codex, Operator). Show how ReAct + Reflexion + ACI + MCP compose into production systems. |
| _06-frontiers.qmd | _08-frontiers.qmd | RENAME. Add MaAS (architecture search for multi-agent) and MemAgent (RL for memory) |
| _99-closing.qmd | _99-closing.qmd | Update takeaways with new empirical findings |

### Estimated Impact

- Sections to modify: 5 (§1 intro, §2 what-is-agent, §5 multi-agent, §8 frontiers, §99 closing)
- New sections: 1 (_07-agents-in-practice.qmd)
- Estimated total new words: ~4,500
- Renumbered files: _02-reasoning → _03, _03-tools → _04, _04-multi → _05, _05-real → _06, _06-frontiers → _08
- Sections at capacity (no room for expansion): _03-tools-memory (already 3,507 words)

### Notes

- The renumbering is necessary because inserting _07-agents-in-practice between real-world-agents and frontiers requires shifting. However, to minimize file renames and disruption, an alternative is to keep all existing files as-is and just insert the new section at position 7 (between _05 and _06). This avoids touching 6 filenames.
- The user's concern about "babyishness" is best addressed by (a) the new agents-in-practice section that connects theory to tools everyone uses, and (b) deepening the multi-agent section with the Google/MAST empirical evidence.
