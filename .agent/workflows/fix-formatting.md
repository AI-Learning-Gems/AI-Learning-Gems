---
description: Fix markdown and LaTeX formatting issues in a document
---

# Fix Formatting Workflow

This workflow corrects common formatting issues in markdown/QMD files.

## Step 1: Identify Formatting Issues

Scan the document for these issues:

### Bullet Point Issues
- Asterisks (`*`) used for bullet points → Replace with hyphens (`-`)
- Missing newlines before bullet lists → Ensure two newlines before `-`
- Incorrect indentation for nested bullets

### LaTeX Issues
- Block equations not on separate lines
- Missing `$$` delimiters
- Asterisks used for multiplication → Replace with `\times`

### Writing Style Issues
- Sentences exceeding 20 words
- Passive voice usage
- Undefined technical terms

## Step 2: Fix Bullet Points

// turbo
Search for asterisk bullet points using:
```
grep -n "^\s*\*\s" <file>
```

Replace each `*` at start of line with `-`

## Step 3: Fix Block LaTeX

Ensure all block equations follow this format:
```
$$
equation_content
$$
```

NOT: `$$ equation $$` on single line

## Step 4: Fix Multiplication Symbols

// turbo
Search for asterisks used as multiplication:
```
grep -n "\$.*\*.*\$" <file>
```

Replace `*` with `\times` in mathematical contexts.

## Step 5: Verify Changes

Re-read the file to confirm:
- [ ] All bullet points use hyphens
- [ ] Proper newlines before bullet lists
- [ ] Block LaTeX on separate lines
- [ ] Multiplication uses `\times`