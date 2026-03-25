"""Pre-render script: scans for textbook chapters and generates a YAML listing file.

A "textbook chapter" is a .qmd file at depth 2 (Topic/Chapter.qmd) that:
  1. Has a `title:` field in its YAML front matter
  2. Has a companion folder (Topic/Chapter/) containing _0*.qmd section files

This script writes _chapters.yml which index.qmd uses as its listing contents.
"""

import glob
import os
import re
import yaml


def extract_title(qmd_path: str) -> str:
    """Extract the title from a .qmd file's YAML front matter."""
    with open(qmd_path, "r") as f:
        in_frontmatter = False
        for line in f:
            stripped = line.strip()
            if stripped == "---":
                if not in_frontmatter:
                    in_frontmatter = True
                    continue
                else:
                    break
            if in_frontmatter and stripped.startswith("title:"):
                title = stripped[len("title:"):].strip().strip('"').strip("'")
                return title
    return ""


def find_textbook_chapters():
    """Find all valid textbook chapters and return them grouped by topic."""
    topics = {}
    for qmd in sorted(glob.glob("*/*.qmd")):
        basename = os.path.basename(qmd)
        if basename.startswith("_") or basename == "index.qmd":
            continue

        chapter_dir = qmd.replace(".qmd", "")
        section_files = glob.glob(os.path.join(chapter_dir, "_0*.qmd"))
        if len(section_files) == 0:
            continue

        title = extract_title(qmd)
        if not title:
            continue

        topic = os.path.dirname(qmd)
        if topic not in topics:
            topics[topic] = []

        topics[topic].append({
            "title": title,
            "path": qmd.replace(".qmd", ".html"),
            "categories": [topic],
        })

    return topics


def main():
    topics = find_textbook_chapters()

    items = []
    for topic in sorted(topics.keys()):
        for chapter in sorted(topics[topic], key=lambda c: c["title"]):
            items.append(chapter)

    with open("chapters.yml", "w") as f:
        yaml.dump(items, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

    print(f"Generated chapters.yml with {len(items)} chapters across {len(topics)} topics")


if __name__ == "__main__":
    main()
