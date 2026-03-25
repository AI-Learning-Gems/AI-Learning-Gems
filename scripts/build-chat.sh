#!/bin/bash
# Post-render: Copy chat.js to the output directory alongside chat.css.
# Quarto copies CSS via the `css` key in _extension.yml but has no equivalent
# for JS files. This script places chat.js next to chat.css so the dynamic
# loader in chat-script-loader.html can find it.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$REPO_ROOT/_extensions/chatbot/assets/chat.js"

# Find where Quarto put chat.css in the output
CSS_DIR=$(find "$REPO_ROOT/_book" -path "*/chatbot/assets/chat.css" -exec dirname {} \; 2>/dev/null | head -1)

if [ -n "$CSS_DIR" ]; then
    cp "$SRC" "$CSS_DIR/chat.js"
    echo "Copied chat.js to $CSS_DIR/"
else
    # Fallback: copy to _book root
    cp "$SRC" "$REPO_ROOT/_book/chat.js"
    echo "Copied chat.js to _book/ (CSS dir not found)"
fi
