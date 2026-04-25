#!/usr/bin/env python3
"""
Notion AI Chat HTML → Markdown converter.

Usage:
    python scripts/notion_scraper.py <notion-chat-file.html> [-o output.md]

Parses the DOM exported from a Notion AI chat and produces a clean Markdown
transcript with user/assistant turns, inline formatting (bold, italic),
headings, bullet lists, numbered lists, and dividers.
"""

import argparse
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag


# ---------------------------------------------------------------------------
# Inline text extraction
# ---------------------------------------------------------------------------

def _extract_inline(node: Tag) -> str:
    """Recursively extract text from a node, converting bold/italic spans.

    Returns raw text with possible HTML-indentation whitespace; the caller
    is responsible for collapsing whitespace at the block level.
    """
    parts: list[str] = []
    for child in node.children:
        if isinstance(child, NavigableString):
            parts.append(str(child))
        elif isinstance(child, Tag):
            style = child.get("style", "")
            text = _extract_inline(child)
            if not text.strip():
                # Keep whitespace-only fragments so spacing is preserved
                parts.append(text)
                continue
            is_bold = "font-weight:600" in style or "font-weight: 600" in style
            is_italic = "font-style:italic" in style or "font-style: italic" in style
            inner = " ".join(text.split())  # collapse whitespace inside the span
            if is_bold:
                inner = f"**{inner}**"
            if is_italic:
                inner = f"*{inner}*"
            parts.append(inner)
    return "".join(parts)


def _collapse(text: str) -> str:
    """Collapse all runs of whitespace into single spaces and strip."""
    return " ".join(text.split())


# ---------------------------------------------------------------------------
# Block-level extraction from Notion blocks
# ---------------------------------------------------------------------------

def _block_to_md(block: Tag) -> str | None:
    """Convert a single notion-selectable block to a Markdown line."""
    classes = " ".join(block.get("class", []))

    # Divider
    if "notion-divider-block" in classes:
        return "---"

    # Headings: sub_header → ##, sub_sub_header → ###
    if "notion-sub_header-block" in classes:
        leaf = block.find(attrs={"data-content-editable-leaf": "true"})
        if leaf:
            return f"## {_collapse(_extract_inline(leaf))}"
        return None

    if "notion-sub_sub_header-block" in classes:
        leaf = block.find(attrs={"data-content-editable-leaf": "true"})
        if leaf:
            return f"### {_collapse(_extract_inline(leaf))}"
        return None

    if "notion-header-block" in classes:
        leaf = block.find(attrs={"data-content-editable-leaf": "true"})
        if leaf:
            return f"# {_collapse(_extract_inline(leaf))}"
        return None

    # Bulleted list
    if "notion-bulleted_list-block" in classes:
        leaf = block.find(attrs={"data-content-editable-leaf": "true"})
        if leaf:
            return f"- {_collapse(_extract_inline(leaf))}"
        return None

    # Numbered list
    if "notion-numbered_list-block" in classes:
        num_span = block.find(class_="pseudoBefore")
        num = "1."
        if num_span:
            content = num_span.get("style", "")
            if '--pseudoBefore--content' in content:
                m = re.search(r'--pseudoBefore--content:\s*["\u0022]([^"]+)["\u0022]', content)
                if m:
                    num = m.group(1).strip()
                else:
                    m = re.search(r'--pseudoBefore--content:\s*&quot;([^&]+)&quot;', content)
                    if m:
                        num = m.group(1).strip()
        leaf = block.find(attrs={"data-content-editable-leaf": "true"})
        if leaf:
            return f"{num} {_collapse(_extract_inline(leaf))}"
        return None

    # Table
    if "notion-table-block" in classes:
        table = block.find("table")
        if table:
            return _table_to_md(table)
        return None

    # Plain text block (the most common)
    if "notion-text-block" in classes:
        leaf = block.find(attrs={"data-content-editable-leaf": "true"})
        if leaf:
            return _collapse(_extract_inline(leaf))
        return None

    return None


def _table_to_md(table: Tag) -> str:
    """Convert an HTML <table> to a Markdown table."""
    rows: list[list[str]] = []
    for tr in table.find_all("tr", class_="notion-table-row"):
        cells: list[str] = []
        for cell in tr.find_all(["th", "td"]):
            leaf = cell.find(attrs={"data-content-editable-leaf": "true"})
            if leaf:
                cells.append(_collapse(_extract_inline(leaf)))
            else:
                cells.append("")
        if cells:
            rows.append(cells)

    if not rows:
        return ""

    # Determine max column count across all rows
    ncols = max(len(r) for r in rows)
    # Pad short rows
    for r in rows:
        while len(r) < ncols:
            r.append("")

    lines: list[str] = []
    # First row is the header
    lines.append("| " + " | ".join(rows[0]) + " |")
    lines.append("| " + " | ".join(["---"] * ncols) + " |")
    for row in rows[1:]:
        lines.append("| " + " | ".join(row) + " |")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Top-level parsing: user vs assistant turns
# ---------------------------------------------------------------------------

def _extract_user_date(user_step_div: Tag) -> str | None:
    """Try to find the date label near a user step div (e.g. 'Apr 13')."""
    for desc in user_step_div.descendants:
        if isinstance(desc, Tag):
            style = desc.get("style", "")
            if "font-size: 12px" in style and "color: var(--c-texTer)" in style:
                text = desc.get_text(strip=True)
                if text and len(text) < 20:
                    return text
    return None


def parse_notion_chat(html: str) -> str:
    """Parse Notion AI chat HTML and return a Markdown transcript."""
    soup = BeautifulSoup(html, "html.parser")

    messages: list[dict] = []

    # Strategy: walk the top-level structure.
    # User messages: divs with data-agent-chat-user-step-id
    # Assistant messages: divs with data-content-editable-root="true"
    #
    # The DOM alternates: user-step → assistant-response → user-step → ...
    # We collect them in document order and pair them.

    # Collect all user step containers and assistant content roots in order
    all_user_steps = soup.find_all(attrs={"data-agent-chat-user-step-id": True})
    all_assistant_roots = soup.find_all(attrs={"data-content-editable-root": "true"})

    # Build ordered list of (type, element) by their position in the document
    elements = []
    for el in all_user_steps:
        elements.append(("user", el))
    for el in all_assistant_roots:
        elements.append(("assistant", el))

    # Sort by document order using sourceline and sourcepos if available,
    # otherwise fall back to the order they appear in the combined list.
    # BeautifulSoup with html.parser doesn't always set sourceline,
    # so we use a position-finding approach instead.
    all_tags_in_order = list(soup.descendants)

    def _doc_position(tag: Tag) -> int:
        try:
            return all_tags_in_order.index(tag)
        except ValueError:
            return float("inf")

    elements.sort(key=lambda x: _doc_position(x[1]))

    # Now process in order
    for kind, el in elements:
        if kind == "user":
            # Extract user message text
            leaf = el.find(attrs={"data-content-editable-leaf": "true"})
            if leaf:
                text = leaf.get_text(separator=" ", strip=False)
                # Normalize whitespace (the HTML has line breaks for wrapping)
                text = " ".join(text.split())
                date = _extract_user_date(el)
                messages.append({
                    "role": "user",
                    "text": text.strip(),
                    "date": date,
                })
        elif kind == "assistant":
            # Collect all notion-selectable blocks inside this root.
            # Use recursive=False-like filtering: skip blocks that are nested
            # inside another notion-selectable block (e.g. inner table blocks).
            blocks = el.find_all(
                class_=lambda c: c and "notion-selectable" in c
            )
            # Deduplicate: skip a block if any of its ancestors (up to el)
            # is also in the block set.
            block_set = set(id(b) for b in blocks)
            top_blocks = []
            for block in blocks:
                parent = block.parent
                is_nested = False
                while parent and parent is not el:
                    if id(parent) in block_set:
                        is_nested = True
                        break
                    parent = parent.parent
                if not is_nested:
                    top_blocks.append(block)

            lines: list[str] = []
            for block in top_blocks:
                md = _block_to_md(block)
                if md is not None:
                    lines.append(md)
            if lines:
                messages.append({
                    "role": "assistant",
                    "text": "\n\n".join(lines),
                })

    # Format as Markdown
    md_parts: list[str] = []
    for msg in messages:
        if msg["role"] == "user":
            date_str = f" ({msg['date']})" if msg.get("date") else ""
            md_parts.append(f"# User{date_str}\n\n{msg['text']}")
        else:
            md_parts.append(f"# Assistant\n\n{msg['text']}")

    return "\n\n---\n\n".join(md_parts) + "\n"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Convert Notion AI chat HTML export to Markdown.",
    )
    parser.add_argument(
        "input",
        type=Path,
        help="Path to the Notion chat HTML file.",
    )
    parser.add_argument(
        "-o", "--output",
        type=Path,
        default=None,
        help="Output Markdown file path. Defaults to <input-stem>.md in the same directory.",
    )
    args = parser.parse_args()

    input_path: Path = args.input
    if not input_path.exists():
        print(f"Error: file not found: {input_path}", file=sys.stderr)
        sys.exit(1)

    html = input_path.read_text(encoding="utf-8")
    md = parse_notion_chat(html)

    output_path: Path = args.output or input_path.with_suffix(".md")
    output_path.write_text(md, encoding="utf-8")
    print(f"Wrote {len(md):,} chars → {output_path}")


if __name__ == "__main__":
    main()
