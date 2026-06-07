---
name: handoff
description: Author a comprehensive, self-contained handoff document that lets a fresh agent (or subagent) fully reconstruct the current agent's context, reasoning, and decision history. Use when the user asks to "hand off", "create a handoff", "write handoff instructions", pass work to a new agent/subagent, summarize a session for a successor, or continue long work in a new chat. Produces a detailed (~6-page) handoff that points the successor at every file it must read IN FULL and at the exact parts of the prior conversation it must understand.
disable-model-invocation: true
---

# Agent Handoff

## Purpose

Write a **handoff document**: a single, self-contained briefing that lets a fresh agent take over an in-progress task with zero loss of context. The successor agent reads the handoff, then reads everything the handoff points it to, and ends up understanding everything the current agent understands — the goal, the history, the reasoning, the dead ends, and the next steps.

This skill produces the handoff **in chat** unless the user asks to save it to a file.

The handoff is NOT a status update. It is a context-transfer instrument. Its success criterion: a fresh agent that has read only the handoff plus the files/chat sections it names can continue the work without re-asking questions the current agent already answered.

---

## The Two Hard Problems This Skill Solves

1. **Lazy reading.** Successor agents skim. They read the first 100 lines of a 2000-line file, assume they understand it, and produce wrong work. The handoff MUST force full reads (see "The Full-Read Mandate" below). This is non-negotiable and must appear prominently in every handoff you write.

2. **Lossy history.** A long session contains essential decisions tangled with abandoned threads. The successor needs the *outcome and rationale* of abandoned threads (so it does not re-propose them or contradict them) but NOT their full blow-by-blow detail. The handoff must compress abandoned threads to "what was tried, why it was dropped" while preserving live threads in full (see "Compressing History" below).

---

## The Full-Read Mandate (Include This Verbatim in Every Handoff)

Every handoff you write MUST contain a block instructing the successor to read in full. Reproduce this block near the top of the handoff, adapted to the project:

> **READ DISCIPLINE — NON-NEGOTIABLE.** You must read every file listed in the "Files to Read" section IN FULL before writing anything. "In full" means: call the Read tool with `limit: 2000` (or higher if the file exceeds 2000 lines — check line count first with `wc -l` and read in 2000-line pages until you reach the end). Do NOT read partial files. Do NOT assume you understand a file from its name, its first screen, or a grep hit. If a file is 1800 lines, you read all 1800. If it is 3500 lines, you read it in two passes. You are not permitted to begin the task until every listed file has been read end to end. Reading is cheap; producing wrong work from a half-read file is expensive.

When you list files, annotate each with its line count so the successor knows the size of the reading commitment and cannot pretend a long file was short.

---

## Compressing History (Live Threads vs. Abandoned Threads)

A session is a sequence of threads. Classify each before writing:

| Thread type | What to preserve | What to drop |
|---|---|---|
| **Live thread** (the current direction, still in play) | Full reasoning, current state, what is done, what remains, all relevant file pointers | Nothing essential |
| **Abandoned thread** (an approach explored then dropped) | (a) one-line description of what was tried; (b) WHY it was dropped — the rationale, because it constrains future judgment | The step-by-step detail, intermediate code, transcript of how the dead end unfolded |
| **Resolved decision** (a choice that was made and is now settled) | The decision, the alternatives considered, the reason the winner won | The deliberation transcript |

**Why preserve the "why" of abandoned threads?** If the successor does not know that approach X was tried and rejected for reason R, it will waste time re-proposing X, or worse, silently reintroduce the problem R that the team already decided to avoid. The rationale is load-bearing for future judgment. The details are not.

Example of correctly compressing an abandoned thread:

> *We briefly explored computing attention attribution with raw attention weights (not gradient-weighted). We dropped this because raw weights conflated positional bias with semantic relevance, making the per-criterion scores uninterpretable. Do not revisit raw-weight attribution; if you need attribution, use the gradient-weighted method already in `phase9/masked_generator.py`.*

That is three sentences. The successor now knows the road is closed and why, and will not drive down it.

---

## Pointing Into an Exported Conversation

If the user provides an exported chat transcript (a path to a `.md`/`.txt`/`.jsonl` file of the conversation), the handoff should point the successor at the *exact* parts it must read, not the whole thing.

For each essential moment in the conversation, give the successor a **grep anchor**: a short, unique phrase from that part of the chat the successor can search for to locate it. Format:

> To understand [topic], read the conversation section you can find by searching for the phrase **"<unique phrase>"** in `<transcript path>`. This is where [what happens there and why it matters].

Provide grep anchors for: the original problem statement, each key decision, each major analysis/output the current agent produced and validated, and any user correction that changed direction. Do NOT point the successor at abandoned-thread sections of the transcript beyond what the compressed summary already covers.

Before writing these anchors, grep the transcript yourself to confirm each phrase is present and reasonably unique. A grep anchor that returns zero hits or fifty hits is useless.

---

## Handoff Document Structure

Write the handoff with these sections, in this order. Target depth is roughly six pages of prose — be comprehensive, not terse. Length must come from genuine context, never from repetition.

```
1. ROLE & MISSION
   - Who the prior agent was (its role in this session) and the single overarching goal.
   - The current state in one paragraph: what phase the work is in.

2. READ DISCIPLINE (the Full-Read Mandate block, verbatim, adapted)

3. FILES TO READ (IN FULL)
   - Grouped by purpose (e.g., "Core code", "Data/configs", "Prior writeups").
   - Each entry: path, line count, one sentence on why it matters and what to extract from it.
   - Ordered so dependencies are read before dependents.

4. CONVERSATION HISTORY POINTERS (if a transcript was provided)
   - Grep anchors into the exported chat for each essential moment.

5. HISTORY & REASONING NARRATIVE
   - How we got here, chronologically: problem -> approaches -> decisions -> current direction.
   - Live threads in full. Abandoned threads compressed to "tried X, dropped because Y".
   - Resolved decisions with the alternatives and the winning rationale.

6. KEY OUTPUTS & ANALYSES ALREADY PRODUCED
   - Concrete results the prior agent generated and validated, with pointers to where they live.
   - Flag anything that is validated vs. provisional vs. unverified.

7. CONSTRAINTS, CONVENTIONS & GOTCHAS
   - Project rules, environment setup, naming conventions, traps the prior agent hit.

8. OPEN QUESTIONS & NEXT STEPS
   - What remains, in priority order. What the successor should do first.
   - Anything blocked on the user.
```

---

## Workflow

Copy this checklist and track progress:

```
Handoff Progress:
- [ ] Step 1: Inventory every file the current agent read or relied on (with line counts)
- [ ] Step 2: If a transcript was provided, grep it to build verified anchors
- [ ] Step 3: Classify history into live / abandoned / resolved threads
- [ ] Step 4: Draft all 8 sections
- [ ] Step 5: Self-check against the verification checklist
- [ ] Step 6: Deliver in chat (or save to file if asked)
```

**Step 1 — File inventory.** List every file that informed the current work: code, data, configs, prior writeups, source documents. Get exact line counts (`wc -l`). Do not omit a file because it seems minor; the successor cannot read what it is not told about.

**Step 2 — Transcript anchors.** If given a transcript, grep for candidate phrases at each decision point and result. Keep only phrases that are present and reasonably unique. Discard anchors you cannot verify.

**Step 3 — Classify history.** Walk the session start to finish. Tag each thread live/abandoned/resolved. For abandoned threads, write the one-to-three-sentence "tried X, dropped because Y" and nothing more.

**Step 4 — Draft.** Write all sections. Be specific: real file paths, real line counts, real phrases, real results.

**Step 5 — Self-check.** Run the verification checklist below.

**Step 6 — Deliver.** Output the handoff in chat. Only write it to a file if the user asks.

---

## Verification Checklist

Before delivering, confirm:

- [ ] The Full-Read Mandate appears prominently, instructing `limit: 2000` per Read and full reads of long files.
- [ ] Every file the current work depended on is listed, with an accurate line count and a reason-to-read.
- [ ] Files are ordered dependencies-first.
- [ ] Every transcript grep anchor was actually verified to exist and be reasonably unique.
- [ ] Live threads are preserved in full; abandoned threads are compressed to outcome + rationale; no abandoned thread leaks its full detail.
- [ ] The "why" of each abandoned/rejected approach is stated (so the successor won't re-propose it).
- [ ] The prior agent's role and the single overarching mission are stated upfront.
- [ ] Validated results are distinguished from provisional/unverified ones.
- [ ] Next steps are concrete and prioritized.
- [ ] A fresh agent with no other context could, after reading the handoff and its pointers, continue the work without re-asking settled questions.

---

## Anti-Patterns to Avoid

- **Summarizing instead of pointing.** Do not paraphrase a 2000-line file in three bullets and call it done; the successor needs to read the file. Point AND give a reason to read.
- **Dumping the whole transcript.** Anchors, not a wall of pasted chat.
- **Reproducing dead ends in full.** Abandoned threads get outcome + rationale, never the play-by-play.
- **Omitting line counts.** Without them the successor will under-read long files.
- **Soft language about reading.** "You may want to review the files" invites laziness. Use the mandate's imperative phrasing.
- **Burying the mission.** If the successor cannot state the goal after the first section, the handoff failed.
