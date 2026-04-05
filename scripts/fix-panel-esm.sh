#!/bin/bash
# Post-render: Copy Panel's bundled es-module-shims.min.js to each chapter's
# static directory in _book/. Panel's Bokeh output references this file at a
# relative path (static/extensions/panel/bundled/reactiveesm/...) but Quarto
# doesn't copy Panel's bundled assets automatically.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONDA_BASE="$(conda info --base 2>/dev/null || echo "$HOME/miniconda3")"
PANEL_ESM="$CONDA_BASE/envs/ai-learning-gems/lib/python3.13/site-packages/panel/dist/bundled/reactiveesm/es-module-shims@^1.10.0/dist/es-module-shims.min.js"

if [ ! -f "$PANEL_ESM" ]; then
    echo "Panel es-module-shims not found at $PANEL_ESM, skipping"
    exit 0
fi

COPIED=0
for html in $(find "$REPO_ROOT/_book" -name "*.html" -exec grep -l "es-module-shims" {} \; 2>/dev/null); do
    HTML_DIR="$(dirname "$html")"
    TARGET="$HTML_DIR/static/extensions/panel/bundled/reactiveesm/es-module-shims@^1.10.0/dist"
    if [ ! -f "$TARGET/es-module-shims.min.js" ]; then
        mkdir -p "$TARGET"
        cp "$PANEL_ESM" "$TARGET/"
        COPIED=$((COPIED + 1))
    fi
done

if [ "$COPIED" -gt 0 ]; then
    echo "Copied es-module-shims.min.js to $COPIED chapter(s)"
else
    echo "es-module-shims.min.js already present in all chapters (or no chapters use Panel)"
fi
