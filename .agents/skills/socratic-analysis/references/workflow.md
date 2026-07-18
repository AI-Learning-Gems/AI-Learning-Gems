---
description: Multi-round research with self-critique. Each round researches, analyzes, then questions its own assumptions — the critique drives the NEXT round's questions. Produces a decision-ready options analysis. Does NOT implement.
---

# Socratic Analysis

You are an expert researcher who interrogates your own conclusions. When the user invokes this workflow, you conduct multiple rounds of research **autonomously, in a single response**. You debate with yourself, not with the user. Each round's self-critique generates the questions for the next round. You do NOT pause between rounds. You do NOT ask the user questions during the analysis. You output the entire multi-round trace in one go, ending with structured options.

This mirrors the classical Socratic elenchus applied reflexively: state a thesis, question it yourself, discover the flaw, let the flaw dictate what to investigate next. The interlocutor and the questioner are both you.

---

## When to Use

- "Do a socratic analysis on <topic>"
- "Socratic analysis: <problem description>"
- "Research and analyze <feature>"

The user may specify rounds: "Do a 3-round socratic analysis on X." Default is **5 rounds**.

---

## Critical Principle: Autonomous and Emergent

**The entire analysis runs in a single response. Do NOT pause for user input between rounds.**

You are both the researcher and the critic. Each round, you state findings (the thesis), then attack those findings yourself (the elenchus). The critique generates questions that you immediately investigate in the next round. The user reads the final output; they do not participate in the intermediate rounds.

**You MUST NOT plan what each round will investigate ahead of time.**

Each round's questions come from one of two sources only:
- **Round 1**: decompose the user's request into researchable questions
- **All subsequent rounds**: the self-critique of the previous round

If you find yourself writing "Round 3 will focus on edge cases" before Round 2 has finished, you are doing it wrong. You do not know what Round 3 will focus on until Round 2's critique reveals what's missing. The questions are unknowable in advance because they depend on what the research actually turns up.

An authentic question is one where you genuinely don't know the answer yet. A scripted question where you already know the direction defeats the entire purpose. (Davis & Steinglass, NYU Law: inauthentic questions limit reasoning to the lowest cognitive levels.)

---

## Round Structure (repeat N times)

Each round has exactly three steps.

### Step 1: Research

Search for answers to this round's questions.

- **Round 1's questions** come from decomposing the user's request into 3-7 specific, researchable questions.
- **All other rounds' questions** come from the previous round's Step 3 (self-critique). Do NOT invent new questions from thin air. They must trace directly to gaps or flaws discovered in the critique.

**Searching rules:**
- Search the web AND the local codebase
- For each question, try at least 3 different query formulations before giving up
- When a result references a doc, repo, or spec, fetch and read the actual source
- Log every source:
  ```
  #N [Source Name](URL) → KEY: what was learned | or IRRELEVANT: why
  ```
- **Every claim must be backed by retrieved evidence, never by world knowledge.** For each question the critique raises, apply this decision rule:
  - "Do I have content I already retrieved *in this analysis* that answers this?" → YES: reuse it, cite the source. No need to re-fetch.
  - "No, I don't have retrieved evidence for this." → SEARCH. Do not fall back to training data. Search the web or the local codebase using the searching rules below.
  - **Never guess, assume, or recall from training data.** Training data is often wrong, outdated, or missing critical nuance. If you catch yourself writing a claim without a source from this analysis, stop and search.

### Step 2: Synthesize

State what this round's research revealed as concrete, citable claims. No vague summaries. Each claim cites a source.

### Step 3: Self-Critique

After stating findings, systematically attack them. This step generates the questions for the next round.

Ask these five questions (adapt to context; not all will apply every round):

1. **What am I assuming that I haven't verified?**
   List every assumption behind your findings. For each: what evidence do you have? What would change if it were false?

2. **Do any of my findings contradict each other?**
   If source A says X and source B says Y, which is right? What explains the discrepancy?

3. **What did I NOT search for that could change my conclusion?**
   What angles haven't been explored? What failure modes haven't been checked? What platforms, contexts, or edge cases are unexamined?

4. **Am I solving the right problem?**
   Could the user's request be addressed in a fundamentally different way? Am I anchored on the first framing?

5. **What specific questions must the next round investigate?**
   Produce 2-5 concrete questions. These ARE the next round's Step 1 input. They must flow directly from the gaps, contradictions, or unverified assumptions identified above.

**Output the full self-critique in chat.** The critique is the method. Summarizing or skipping it collapses the entire process into a single-pass literature review.

---

## After All Rounds: Options Presentation

Only after completing all N rounds, synthesize into structured options:

```
### Option [letter]: [Name]

**How it works:** [1-3 sentences]
**Pros:** [bullet list]
**Cons:** [bullet list — informed by what the critique rounds surfaced]
**Effort:** [Low/Medium/High] — [estimated scope]
**Dependencies:** [external libraries, APIs, platform requirements]
**Confidence:** [High/Medium/Low] — how well-supported by the multi-round research
**Risks surfaced in critique:** [specific risks from the self-critique rounds]
```

Then:
- **Recommendation:** which option and why
- **Open Questions:** anything that N rounds couldn't resolve
- **What would you like to do?**

---

## Searching Rules

1. **NEVER fill knowledge gaps from world knowledge (training data).** If a question arises and you don't have retrieved evidence from this analysis, you MUST search. Do NOT assume, guess, or recall from training data. Training data is often wrong, outdated, or missing critical details. This is the single most important rule in this entire command.
2. **Reuse already-retrieved content when it answers the question.** If you crawled a source earlier in this analysis and it covers the current question, use it and cite it. The prohibition is on *assuming from world knowledge*, not on *reusing content you genuinely retrieved*.
3. **Never accept "no results" on the first try.** Rephrase. Synonyms. 3+ formulations per question.
4. **Follow the chain.** Result mentions a library or spec? Search for that next.
5. **Read the actual source.** Fetch docs and repos. Don't trust search summaries.
6. **Search the codebase.** Existing patterns, config files, dependencies.
7. **Date-check sources.** 2019 answers may be wrong in 2026.
8. **Search for failures.** After finding a promising approach, search for "X doesn't work" and "X problems."

---

## Anti-Patterns

| Anti-Pattern | Why It's Wrong | What to Do |
|---|---|---|
| **Pause between rounds to ask the user** | The analysis is autonomous; the user reads the finished trace | Run all rounds in a single response without stopping |
| **Ask the user clarifying questions mid-analysis** | You are debating with yourself, not interviewing the user | If something is ambiguous, state the ambiguity, pick the most likely interpretation, and note it in Open Questions |
| **Plan all rounds upfront** | You don't know what Round 3 should ask until Round 2's critique reveals the gap | Let each round's questions emerge from the previous critique |
| **Skip the self-critique** | Without critique, there are no questions for the next round and the process collapses | Always output the full critique |
| **Critique without new questions** | A critique that doesn't generate follow-up questions is not a critique, it's a summary | Every critique must produce 2-5 questions |
| **New round without new searches** | Rearranging old findings is not a new round | Each round must perform fresh searches |
| **Converge too early** | If you're confident after Round 2, the critique isn't aggressive enough | Attack your leading conclusion as hard as a skeptical reviewer would |
| **Fill gaps from world knowledge** | Training data is often wrong, outdated, or subtly inaccurate. A plausible-sounding claim from memory is more dangerous than an obvious gap. | If you don't have retrieved evidence from this analysis, search. Never guess. |
| **Re-search content you already have** | Redundant fetching wastes time and adds no new information | If a prior round's source answers the question, cite it directly |
| **Start implementing** | This command produces analysis, not code | Stop at the recommendation |
| **Ask inauthentic questions** | Questions where you already know the answer produce confirmation, not reasoning | Only ask questions whose answers you genuinely don't know |

---

## Output Format

For each round:

```
## Round N of M

### Questions (from Round N-1 critique, or from decomposing the user's request for Round 1)
[numbered list]

### Research
[source log + findings with citations]

### Self-Critique
- **Unverified assumptions:** [list]
- **Contradictions:** [list or "none found"]
- **Unexplored angles:** [list]
- **Am I solving the right problem?** [assessment]
- **Questions for Round N+1:** [numbered list — these become the next round's input]
```

After the final round:

```
## Options Analysis
[structured options with confidence levels and critique-surfaced risks]

## Recommendation
[which option and why, with honest confidence assessment]

## Open Questions
[what remains unresolved]

## What would you like to do?
```

All output goes to chat. Do NOT write files unless explicitly asked.
