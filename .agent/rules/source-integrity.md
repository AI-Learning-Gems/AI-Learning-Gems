
# Source Integrity Rules

Shared source verification and world-knowledge rules for all textbook chapter workflows (write, update, edit). These rules exist because LLMs confidently produce plausible-sounding but incorrect information about well-known topics. Every rule below was motivated by a real failure in a real chapter-writing session.

---

## Why Source Integrity Matters

A textbook chapter that gets a quote slightly wrong, rounds a statistic, or describes a framework from memory instead of from its creator's actual words has *silently corrupted the reader's knowledge*. The reader trusts the textbook. They will cite the wrong number in their own paper. They will misattribute the quote. They will describe the framework incorrectly to their students. The corruption propagates.

The only way to prevent this is to treat every specific claim as unverified until it is confirmed against a downloaded, readable source file.

---

## Zero World Knowledge Principle

**You know nothing about the topic except what you read from the downloaded sources.**

You are a skilled writer and organizer, but you have **zero reliable knowledge** about the chapter's topic. Your training data may contain information about the topic, but that information may be outdated, incomplete, or wrong. You MUST NOT:

- Quote an author from memory (even a famous, widely-known quote)
- Cite a statistic you "know" without reading the source
- Describe a method, framework, or concept from training data instead of from a downloaded source
- Fill in gaps when a source is unavailable by "remembering" the content
- Assume a well-known fact is correct without verifying it in a source

**If you cannot find a claim in a downloaded, readable source file, the claim does not exist for you.** Drop it, or download a source that contains it.

---

## What Training Data Can and Cannot Be Used For

The Zero World Knowledge Principle is strict, but not absolute. There is a precise boundary.

### Hard Ban (Requires a Downloaded Source)

| Category | Why It Must Be Sourced | Example of Failure |
|---|---|---|
| **Direct quotes** | Exact wording matters. Training data paraphrases, combines, and misattributes. | Attributing "writing is a primary mechanism for doing research" to Peyton Jones when the transcript says something different. |
| **Statistics and numbers** | Specific numbers drift. A "21%" becomes "20%." A sample size gets rounded. | Writing "6.5-16.9% of reviews" when the paper says "15.8%." |
| **Named frameworks and methodologies** | The creator's original formulation may differ from popularizations. | Describing the "ABT framework" without reading Olson's actual writing, getting the structure wrong. |
| **Specific claims about what an author said, argued, or found** | Training data conflates authors, misattributes findings, merges claims from different papers. | Writing "Pinker argues X" when Pinker actually argues something subtly different. |
| **Paper titles, author lists, venues, and years** | Training data frequently gets these wrong, especially for recent papers. | Attributing a paper to "Liang et al." when the actual authors are "Russo Latona et al." |
| **Descriptions of specific papers, blog posts, or talks** | What a specific work contains must come from reading it. | Claiming a paper "found X" without reading it to verify. |

### Acceptable (No Source Required)

| Category | Why It's Okay | Example |
|---|---|---|
| **Pointing to well-known people as examples** | You are citing them as instances of a category, not claiming what they said. | "Karpathy's blog posts are widely read." "Lilian Weng writes survey-style posts." |
| **General domain knowledge** (non-controversial, non-attributed) | Statements any practitioner would agree with. | "NeurIPS, ICML, and ICLR are top AI conferences." "LaTeX is standard for CS papers." |
| **Structural and rhetorical devices** | How you organize the chapter, analogies, narrative framing. | Using a running example. Creating comparison tables. |
| **Common vocabulary and definitions** | Terms whose meaning is standardized. | "An abstract summarizes the paper." "Ablation studies remove components one at a time." |

### The Litmus Test

Before writing any claim, ask: **"Am I making a specific claim that could be wrong?"**

- "Karpathy writes clearly" → general characterization, okay.
- "Karpathy writes in his blog that X" → specific claim, requires a source.
- "The ABT framework stands for And, But, Therefore" → named framework, requires a source.
- "AI conferences have high submission volumes" → general knowledge, okay.
- "Jiang et al. found that writing quality predicts acceptance across 28,000 submissions" → specific statistic, requires the actual paper.

**When in doubt, download the source.** Minutes to download. The reader's trust to lose.

---

## Source Readability Verification

**Downloaded is not the same as readable.** A PDF in the source folder is useless if it has never been extracted to text.

For each source folder, verify:
1. Does it contain at least one `.md`, `.tex`, or `.txt` file with >500 characters?
2. If NO: **STOP. Read `web-source-fetching.md` and `source-management.md` IN FULL before running any extraction command.** Do NOT guess. The rules files contain a decision tree and tool comparison table. What you "remember" may be wrong.
3. Execute the extraction the rules specify.
4. Verify the output has >500 characters of real content.

**The rule is absolute:** every source folder must contain at least one LLM-readable text file.

---

## Sub-Agent Source Reports Are Navigation Aids, Not Sources

If you use sub-agents to scout sources, the sub-agent's report tells you WHERE to look. It is NOT a substitute for looking yourself.

- Sub-agent says "Line 47 contains the key finding" → you MUST read line 47 yourself.
- Sub-agent quotes "Author X said Y" → you MUST verify this quote by reading the file.
- Sub-agent reports a statistic → you MUST find the statistic in the source yourself.

If you write from the sub-agent's report without reading the source, you are hallucinating. The sub-agent may have misread, paraphrased, or fabricated.

---

## Observed Failure Patterns

These failures occurred in real chapter-writing sessions:

1. **The Phantom Read:** Sub-agent fabricated provenance for an unreadable PDF. It claimed to have "extracted text via [some method]" and produced plausible quotes from training data. The main agent accepted the report. Every quote was wrong.

2. **The Fatigue Drift:** For early sections, the agent read sources carefully. By section 5, it wrote from sub-agent reports and TEXTBOOK-PLAN summaries. Wrong statistics entered the chapter.

3. **The Misattribution:** The TEXTBOOK-PLAN said "Liang et al." The paper at that arXiv ID was actually by different authors. The agent never checked. Adjective frequency multipliers attributed to the paper (9.8x, 34.7x, 11.2x) did not exist in it.

4. **The Shortcut Collapse:** The agent stopped spawning sub-agents for later sections, writing from memory and training data.

5. **The Plan Trust:** The agent copied specific statistics from the TEXTBOOK-PLAN into the chapter without reading the source papers. Every number was wrong.

6. **The Grep Trap:** The agent searched a 62KB source file for specific terms (e.g., "ORM", "PRM") using grep with a low result limit. Early matches from boilerplate text (subscription notices, navigation elements) consumed all returned results, hiding the actual content at line 159. The agent concluded the source was truncated by a paywall and re-extracted unnecessarily. The content was there all along. **The fix:** when checking whether a source contains specific content, first list the section headings (`grep '^##'` or `grep '^###'`), then read the relevant sections directly. Do not rely on term-grep with result limits to determine whether content exists in a file. A false negative from grep is not evidence of missing content.

---

## Proof-of-Work Protocol

**This protocol is mandatory before and after processing each section.** It exists because re-read instructions alone are insufficient. Agents claim to re-read but do not internalize. Producing a written analysis forces actual engagement with the rules.

### Before Each Section: Rules Application Analysis

**Before writing or editing a section**, the agent MUST produce a "Rules Application Analysis" in the chat. This analysis:

1. **Re-reads from disk** (not from context): `source-integrity.md`, `writing-style.md`, and `visualization-standards.md`. If editing (update workflow), also re-read `exercise-syntax.md`.
2. **Maps at least 3 specific rules from `writing-style.md`** to concrete decisions for THIS section. Not generic restatements. Specific: "This section explains the ABT framework. The given-new contract means I should introduce the familiar concept (narrative structure) before the new term (ABT). The emphasis hierarchy means I should bold the single most important takeaway, which is [X]."
3. **Maps at least 2 specific rules from `source-integrity.md`** to THIS section's sources. Specific: "This section cites Olson's ABT framework. This is a named framework (Hard Ban category), so I must read the downloaded source at `sources/scienceneedsstory.com/.../content.md` and verify the structure before writing. I must NOT describe ABT from training data."
4. **Lists every source** that will contribute to this section, with the file paths and line numbers the agent will read.

**The analysis must be section-specific.** A generic restatement of rules ("I will follow the given-new contract and avoid AI tells") is not proof of work. It must reference the specific content of the section being written.

### After Each Section: Source Audit Table

**After writing or editing a section**, the agent MUST produce a source audit table in the chat.

| Source | File:Lines Read | Read Method | What Was Used | Verified? |
|---|---|---|---|---|
| [Source] | `file.md` lines 1-80 | Read tool (direct) | Quote X, stat Y | YES |
| [Source] | (not read) | Sub-agent only | Claim Z | **NO — MUST FIX** |
| [World knowledge] | (no source) | Training data | Description of W | **NO — MUST FIX** |

**Read Method must be one of:**
- `Read tool (direct)` — acceptable
- `Sub-agent report only` — NOT acceptable
- `TEXTBOOK-PLAN.md` — NOT acceptable
- `Training data` — NOT acceptable (for Hard Ban categories)
- `Training data (general characterization)` — acceptable (for Acceptable categories only)
- `Unavailable` — acceptable only if flagged to user and claims dropped

**If ANY row shows "NO — MUST FIX":** STOP. Read the source. Edit the section. Regenerate the table. Do not proceed until all rows show YES or acceptable.
