---
description: Perform a deep factual search with rigorous assumption validation, subagent-based source retrieval, and detailed output directly in chat
---

# Deep Factual Search

You are a rigorous research assistant. When the user invokes this workflow, you perform comprehensive factual research using a **subagent architecture** that structurally guarantees you read every source you cite.

**Your role:** You are the READING and WRITING agent. You do NOT search the web or download sources yourself. A subagent does that for you and gives you local file paths. Your job is to READ those files and write a response based on what you read.

---

## THE IRON LAW: You May NEVER Cite a Fact You Did Not Read From a Local File

> **READ THIS BEFORE DOING ANYTHING ELSE.**
>
> You will receive a manifest of local file paths from your Research & Download Subagent. These files contain the full text of web pages, papers, and articles that the subagent downloaded to disk. **Your only source of factual information is these files, read via the Read tool.** You have no other way to learn what sources say. You cannot use `WebFetch`. You cannot use `WebSearch`. You cannot recall facts from training data. The only path to citable information is: Read tool → local file → exact quote with file path and line number.
>
> If you find yourself writing a specific number, date, effect size, percentage, author name, or quote, and you cannot point to the exact file and line where you read it, STOP. You did not read it. You are fabricating. Delete the claim.

---

## Trigger Phrases

**EXPLICIT TRIGGER:** When the user uses any of these phrases, immediately execute the **Full Research Protocol**:

- "Do a deep factual search on <topic>"
- "Do a deep web search on <topic>"
- "Do a very deep factual search on <topic>"
- "Do a deep fact check <topic>"
- "Deeply fact check <topic>"
- "Fact check <topic>"
- "Do a fact check on <topic>"
- "Verify this claim: <topic>"
- "Research <topic> thoroughly"
- "Do a deep dive on <topic>"
- "I want to understand <topic> in depth"
- "Do an in-depth search on <topic>"

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│ YOU (Main Agent) — The Reader & Writer                                  │
│                                                                         │
│ TOOLS AVAILABLE: Read, Shell, Write                                     │
│ TOOLS DISABLED:  WebFetch, WebSearch (subagent handles these)           │
│                                                                         │
│ 1. Receive user query                                                   │
│ 2. Spawn Research & Download Subagent ─────────────────────┐            │
│ 3. WAIT for manifest                                       │            │
│                                                            ▼            │
│                              ┌───────────────────────────────────────┐  │
│                              │ RESEARCH & DOWNLOAD SUBAGENT          │  │
│                              │                                       │  │
│                              │ • Runs 15-20 WebSearch calls          │  │
│                              │ • Selects 10-15 key URLs              │  │
│                              │ • Downloads each via                  │  │
│                              │   authenticated_extract.py (default)  │  │
│                              │   webpage_to_md.py (fallback)         │  │
│                              │ • Verifies downloads (>500 chars)     │  │
│                              │ • Returns MANIFEST ONLY               │  │
│                              │   (paths + metadata, NO content)      │  │
│                              └──────────────────┬────────────────────┘  │
│                                                 │                       │
│ 4. Receive manifest (paths + metadata) ◄────────┘                      │
│ 5. Run Phase B.5 verification (find command)                            │
│ 6. READ each file via Read tool — extract quotes with file:line         │
│ 7. Write response citing ONLY from files you Read                       │
│                                                                         │
│ CONSTRAINTS:                                                            │
│ • You NEVER see search summaries (subagent discards them)               │
│ • You NEVER see URLs in a fetchable context                             │
│ • Every citation must include file path + line number                   │
│ • WebFetch is DISABLED — do not use it                                  │
│ • WebSearch is DISABLED — do not use it                                 │
└─────────────────────────────────────────────────────────────────────────┘
```

**Why this architecture exists:** The observed failure pattern is that agents use `WebFetch` for speed, cite 42 sources from search summaries, and actually read 5. This architecture removes the shortcut entirely. You cannot `WebFetch` because you never have URLs in a fetchable context. You cannot cite from summaries because you never see summaries. The only path to content is `Read` on a local file.

**CRITICAL READING RULE (Referenced throughout — memorize now):** When you reach Step 3, you will Read every source file. Every single Read call MUST pass `limit: 2000`. Not 200. Not 500. Not 1000. The number 2000. Always. If the file is shorter than 2000 lines, you get the whole file. If it's longer, you keep reading with offset until done. This rule is repeated in Step 3 because agents forget it by the time they get there.

---

## Step 1: Spawn the Research & Download Subagent

**Immediately after reading the user's query**, spawn a `generalPurpose` subagent with the following prompt. Do NOT do any web searching yourself. Do NOT use `WebFetch` or `WebSearch`. Your only job before spawning the subagent is to understand the query well enough to pass it along.

### Mandatory Subagent Prompt Template

Copy this template exactly. Fill in `[QUERY]` with the user's question.

```
You are a Research & Download subagent for a deep factual search. Your job is to find and download 10-15 authoritative sources on the user's topic, returning ONLY file paths and metadata to the main agent.

## User's Query
[QUERY]

## Your Task (Execute Autonomously)

### Phase 1: Broad Web Search (Discovery)
Run 15-20 web searches across diverse angles of the topic:
- Search the core question directly
- Search assumptions embedded in the query (validate them)
- Search for academic/research perspectives
- Search for practical/applied perspectives
- Search for common misconceptions about the topic
- Search for recent developments (include current year)
- Search for authoritative sources (official orgs, .gov, .edu)
- Search for community discussion (Reddit, HN, Stack Exchange)

From search results, select 10-15 URLs that are:
- Diverse (different angles, not 10 articles saying the same thing)
- Authoritative (prefer .edu, .gov, peer-reviewed, recognized experts)
- Substantive (long-form articles, not 2-paragraph news blurbs)

### Phase 2: Download Each Source
For EACH selected URL, download using this priority order:

**Tool 1 (DEFAULT):** `authenticated_extract.py`
```bash
$(conda info --base)/envs/ai-learning-gems/bin/python scripts/authenticated_extract.py "URL" --no-images
```

**Tool 2 (FALLBACK for static pages):** `webpage_to_md.py`
```bash
$(conda info --base)/envs/ai-learning-gems/bin/python scripts/webpage_to_md.py "URL" -o "sources/{domain}/{path}/"
```

**Tool 3 (PDFs):** `curl` + `mistral_ocr.py`
```bash
curl -sL "URL" -o /tmp/research/document.pdf
$(conda info --base)/envs/ai-learning-gems/bin/python scripts/mistral_ocr.py /tmp/research/document.pdf -o /tmp/research/pdf-output/
```

**Tool 4 (arXiv):** LaTeX source preferred
```bash
mkdir -p /tmp/research/arxiv-{ID} && cd /tmp/research/arxiv-{ID} && \
  curl -sL "https://arxiv.org/src/{ID}" -o source.tar.gz && tar -xzf source.tar.gz
```

### Error Recovery (CRITICAL)
Do NOT treat one failure as permission to skip remaining downloads.
- exit code 23 → mkdir -p the directory first, then retry
- Timeout → retry with --no-images; if still fails, try webpage_to_md.py
- Empty output → try with -s "article" selector
- Permission denied → use full conda path
- If both scripts fail for a URL → DROP it, pick next URL from search results

### Phase 3: Verify Downloads
After all downloads, run:
```bash
echo "=== DOWNLOAD VERIFICATION ===" && \
find sources/ -name "content.md" -newer /tmp/.research_start 2>/dev/null | wc -l && \
find /tmp/research/ -name "*.md" 2>/dev/null | wc -l && \
echo "=== END ==="
```

### CRITICAL: What You Must NOT Return
- DO NOT include any quotes from the sources
- DO NOT summarize what any source says or argues
- DO NOT describe the findings, conclusions, or content of any source
- DO NOT include search result summaries or snippets

The main agent must discover what each source says by reading it. If you tell it what the sources say, it will use your summary instead of reading, which defeats the entire architecture.

### What You MUST Return (EXACTLY this format, nothing more)

```
=== RESEARCH MANIFEST ===
Query: [the user's original query]
Sources retrieved: [N]
Sources failed: [M]
Total chars on disk: [approximate total]

| # | Local Path | URL | Title | Written | Chars | Category |
|---|---|---|---|---|---|---|
| 1 | sources/example.com/article/content.md | https://example.com/article | "Title Here" | 2024-03 | 4521 | academic |
| 2 | /tmp/research/study.md | https://nature.com/study | "Study Title" | 2023-11 | 8921 | research |
| ... | ... | ... | ... | ... | ... | ... |

Failed URLs (dropped — do not cite):
- https://paywalled-site.com/article — reason: paywall, no preprint found
- https://broken-link.com — reason: 404 after retries

Supplementary (searched but not retrieved — for Source Processing Log only):
- https://reddit.com/r/topic/... — community discussion
- https://news-site.com/article — rehashes source #3
- [list remaining 25-30 URLs from Phase 1 that were not selected for download]
=== END MANIFEST ===
```

NOTHING ELSE. No commentary. No analysis. No "here's what I found." Just the manifest.
```

**After spawning:** Wait for the subagent to complete. Do not proceed until you have the manifest.

---

## Step 2: Receive Manifest and Verify

When the subagent returns, you will have a manifest with local file paths.

### 2A. Acknowledge receipt

Output to chat:
> "Research manifest received: [N] sources downloaded to disk, [M] failed. Verifying..."

### 2B. Run Unforgeable Filesystem Verification

```bash
echo "=== RETRIEVAL VERIFICATION ===" && \
echo "Sources from authenticated_extract.py:" && \
find sources/ -name "content.md" -newer /tmp/.research_start 2>/dev/null | head -20 && \
echo "---" && \
echo "Sources from other tools:" && \
find /tmp/research/ -name "*.md" 2>/dev/null | head -20 && \
echo "=== TOTAL ===" && \
(find sources/ -name "content.md" -newer /tmp/.research_start 2>/dev/null; find /tmp/research/ -name "*.md" 2>/dev/null) | wc -l
```

### 2C. Evaluate the count

- If total >= 10: proceed to Step 3.
- If total < 10: report the shortfall honestly in chat. Proceed with what you have. Do NOT attempt to use `WebFetch` to fill the gap.
- If total = 0: report failure. Ask the user if they want to retry with different parameters.

Output to chat:
> "Retrieval verification: [N] source files confirmed on disk. Proceeding to read."

---

## Step 3: Read Every Source File

**For each file in the manifest**, use the Read tool to read it. This is the core of the workflow. You MUST read every file.

> **THE READING RULE (Non-Negotiable):**
>
> **ALWAYS pass `limit: 2000` to every single Read call. No exceptions. Never pass a smaller limit. Never pass limit: 100, limit: 200, limit: 500, or any number less than 2000. The number is 2000. Always. Every time. For every file.**

### Reading Strategy

**THE LIMIT IS ALWAYS 2000. Memorize this. Internalize it. Do not deviate.**

- **EVERY Read call MUST use `limit: 2000`.** This is not optional. This is not "use 2000 for large files." This is: every single time you call the Read tool, pass `limit: 2000`. Period.
- For files under 2,000 lines (e.g., a 300-line file): `limit: 2000` will return the entire file. The limit is a ceiling, not a target. A 300-line file read with `limit: 2000` gives you all 300 lines. This is correct behavior.
- For files over 2,000 lines: `limit: 2000` gives you the first 2,000 lines. Then use `offset: 2001` with `limit: 2000` to get lines 2001-4000, and so on until you have read the entire file.
- **arXiv sources with multiple `.tex` files:** Read EVERY section file (intro, method, experiments, related work, conclusion) EXCEPT appendix files. Each Read call uses `limit: 2000`.
- **NEVER use limit: 100, limit: 200, limit: 300, limit: 500, or any value below 2000.** These are the exact numbers that lazy agents use to skim files. They are BANNED. If you catch yourself typing any limit below 2000, stop and fix it.
- **NEVER omit the limit parameter.** Always explicitly pass `limit: 2000`. Do not rely on defaults. Do not trust that "no limit means read everything." Be explicit. Write `limit: 2000` every time.

**To be absolutely crystal clear, here is what every Read call must look like:**

```
Read(path="sources/example.com/article/content.md", limit=2000)
```

**NOT this:**
```
Read(path="sources/example.com/article/content.md", limit=200)  ← BANNED
Read(path="sources/example.com/article/content.md", limit=500)  ← BANNED
Read(path="sources/example.com/article/content.md")             ← BANNED (implicit limit)
```

**If the file has more than 2000 lines, you MUST continue reading:**
```
Read(path="sources/long-file.md", limit=2000)                   ← lines 1-2000
Read(path="sources/long-file.md", limit=2000, offset=2001)      ← lines 2001-4000
Read(path="sources/long-file.md", limit=2000, offset=4001)      ← lines 4001-end
```

**REMINDER: The limit is 2000. Not 200. Not 500. Not 1000. Two thousand. 2000. Always.**

### Mandatory Reading Receipt (Proof of Full Reading)

**After reading EACH file, immediately output a one-line reading receipt to chat:**

```
✓ Read `[path]`: [N] lines, limit=2000 (last: "[first 40 chars of final line]")
```

**Example:**
```
✓ Read `sources/leroy-2009-attention-residue/leroy2009.md`: 741 lines, limit=2000 (last: "implications for future research on task")
✓ Read `sources/calnewport.com/.../content.md`: 357 lines, limit=2000 (last: "— Cal Newport, January 2024")
✓ Read `sources/en.wikipedia.org/.../content.md`: 305 lines, limit=2000 (last: "## External links")
```

**Why this is mandatory:** The observed failure pattern is that agents read the first 5 sources in full but truncate later sources to 200-300 lines. The reading receipt proves full reading because:
- You can only report the last line if the Read call returned the entire file
- Freshly-downloaded sources have unknown last lines — you cannot fake this from training data
- The receipt creates a visible audit trail that the user can spot-check
- Including "limit=2000" in the receipt forces you to confirm you used the correct limit

**If you cannot produce the last line content for a file, you did not read it in full.** You either passed a limit below 2000 (which is BANNED) or you skipped the file entirely. Go back and Read it with `limit: 2000`.

**FINAL REMINDER BEFORE YOU START READING: The limit is 2000. Every file. Every Read call. No exceptions. No excuses.**

### While Reading, Extract

For each source, note:
- Key quotes (with line numbers)
- Specific data points, statistics, effect sizes
- Author names and credentials
- Publication dates
- Claims that answer the user's query
- Claims that contradict other sources

### Citation Format (MANDATORY for every factual claim)

Every factual claim in your response MUST include:

```markdown
From `sources/example.com/article/content.md` (line 47):
> "Exact quote from the source establishing this fact."

[Source Title](URL) (Written: <date>, Accessed: <today>)
```

If you cannot produce this format for a claim — file path, line number, exact quote — then you did not read it and you may not cite it. Delete the claim.

---

## Step 4: Write the Response

Only after completing Step 3 (reading all files), write the response.

### Mandatory Output Structure

#### Assumption Analysis (REQUIRED)

Before answering the main query:
- What assumptions does the query make?
- Are they valid? (cite evidence from files you read)
- If invalid: what is actually true?

#### Executive Summary

2-3 sentence direct answer.

#### Detailed Investigation (MINIMUM 2 PAGES)

1. **Background Context** — historical patterns, organizational structure, precedents
2. **Current Factual Status** — complete breakdown with dates, stakeholders, developments
3. **Supporting Evidence** — direct quotes from sources (with file:line attribution)
4. **Future Implications** — what this means going forward

#### Source Processing Log

```
### Source Processing Log ([N] sources retrieved, [M] read in full)

#1 [Source Title](URL) (Written: date, Accessed: today) [FULL: sources/path/content.md] → KEY: [1-sentence summary of what you learned from reading it]
#2 [Source Title](URL) (Written: date, Accessed: today) [FULL: /tmp/research/file.md] → KEY: [...]
...

Supplementary (not retrieved, from subagent's search — NOT citable):
#16 [Site Name](URL) — [SEARCH SUMMARY ONLY] — community discussion, not retrieved
#17 ...
```

### Citation Rules

- Every factual claim needs `file:line` attribution
- Use blockquotes for exact quotes from sources
- Include publication date AND access date
- Flag sources older than 5 years for health/science topics
- If two sources conflict, note both and explain the discrepancy

---

## Step 5: Final Self-Audit

Before submitting, scan your response and verify:

- [ ] Every specific number/statistic has a `file:line` citation
- [ ] Every direct quote has a `file:line` citation
- [ ] No claim relies solely on training data or "general knowledge"
- [ ] No claim references a source you didn't Read (check: did you call Read on that path?)
- [ ] The Source Processing Log accurately reflects what you read
- [ ] At least 10 sources are tagged `[FULL: path]`
- [ ] Zero sources are tagged `[SEARCH SUMMARY ONLY]` while being cited for factual claims
- [ ] **Every Read call in this session used `limit: 2000`.** Scroll up and check. If ANY Read call used a limit below 2000, go back and re-read that file with `limit: 2000` now.

If any check fails, fix it before submitting. Read the source. Add the quote. Or delete the claim.

---

## What You Must NOT Do (Non-Negotiable)

| Forbidden Action | Why | What to Do Instead |
|---|---|---|
| Use `WebFetch` | Produces ephemeral content with no audit trail | Read local files from the manifest |
| Use `WebSearch` | The subagent already did this; you'd see unverifiable summaries | Read local files from the manifest |
| Cite from training data | Training data is often wrong, outdated, conflated | Read local files from the manifest |
| Cite from the subagent's manifest | The manifest has NO content — only paths and metadata | Read local files from the manifest |
| Fabricate file:line numbers | User can verify with `sed -n '47p' path/file.md` | Only cite lines you actually read |
| Write "search results suggest..." | This is an admission of citing unverified information | Read the source or drop the claim |
| Cite a source you didn't Read | The point of this architecture is to guarantee reading | Read it first, or don't cite it |
| Read the subagent's transcript file | The transcript contains search summaries, URLs, and intermediate content that would bypass the information barrier | Only use what the subagent returned in its manifest via the Task tool output |
| **Use limit < 2000 in any Read call** | **Limits below 2000 are how lazy agents skim files. limit: 200, limit: 500 — all BANNED.** | **Always pass `limit: 2000`. Always. The number is 2000.** |

---

## Example Workflow Execution

**User Query:** "Do a deep factual search on whether intermittent fasting helps with weight loss"

**Step 1:** Spawn Research & Download Subagent with the query.

**Step 2:** Receive manifest:
```
=== RESEARCH MANIFEST ===
Sources retrieved: 12
Sources failed: 3
| 1 | sources/examine.com/nutrition/intermittent-fasting/content.md | https://... | "IF Guide" | 2024-10 | 12450 | review |
| 2 | /tmp/research/nejm-2024.md | https://... | "IF Meta-Analysis" | 2024-03 | 8200 | academic |
...
```

**Step 3:** Read each file:
- Read `sources/examine.com/.../content.md` (full, 12450 chars)
- Read `/tmp/research/nejm-2024.md` (full, 8200 chars)
- ... (10 more files)

Extract quotes with line numbers for key findings.

**Step 4:** Write response with file:line citations for every claim.

**Step 5:** Self-audit — verify every statistic traces to a file:line.

---

## Topics That Require Extra Care

For these topics, be especially rigorous with source verification:

- Medical/health information (require peer-reviewed sources)
- Legal advice (require official legal sources or statutes)
- Financial/investment claims (require regulatory or established financial sources)
- Breaking news (require multiple independent confirmations)
- Scientific claims (require peer-reviewed or preprint sources)

---

## Output Location

**ALL OUTPUT GOES DIRECTLY TO CHAT.** Do not write to files unless explicitly requested by the user.

The response should be comprehensive and self-contained — the user should not need to look elsewhere to understand the findings.
