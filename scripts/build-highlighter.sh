#!/bin/bash
# Post-render: Copy highlighter.js to the output directory alongside highlighter.css.
# Mirrors the chatbot pattern: Quarto copies CSS via the `css` key but has no
# equivalent for JS files. This script places highlighter.js next to highlighter.css
# so the dynamic loader in highlighter-loader.html can find it.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$REPO_ROOT/_extensions/highlighter/assets/highlighter.js"

CSS_DIR=$(find "$REPO_ROOT/_book" -path "*/highlighter/assets/highlighter.css" -exec dirname {} \; 2>/dev/null | head -1)

if [ -n "$CSS_DIR" ]; then
    cp "$SRC" "$CSS_DIR/highlighter.js"
    echo "Copied highlighter.js to $CSS_DIR/"
else
    cp "$SRC" "$REPO_ROOT/_book/highlighter.js"
    echo "Copied highlighter.js to _book/ (CSS dir not found)"
fi
