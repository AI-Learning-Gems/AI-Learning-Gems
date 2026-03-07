#!/bin/bash
# Post-render cleanup: Remove *_files directories from source tree.
# These are intermediary artifacts created by the pandoc diagram filter
# during rendering. The final output goes to _book/.
find . -maxdepth 5 -type d -name '*_files' \
  -not -path './_book/*' \
  -not -path './.git/*' \
  -not -path './.quarto/*' \
  -exec rm -rf {} + 2>/dev/null || true
