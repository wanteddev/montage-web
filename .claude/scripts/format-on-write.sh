#!/usr/bin/env bash
# PostToolUse hook: auto-format files written/edited by Claude.
# - .ts/.tsx/.js/.jsx/.mjs/.cjs → eslint --fix (block on failure)
# - everything else            → prettier --write (best-effort)
#
# Reads the tool event JSON from stdin and pulls the touched file path.

set -u

file="$(jq -r '.tool_response.filePath // .tool_input.file_path // empty')"

if [ -z "$file" ]; then
  exit 0
fi

case "$file" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs)
    if ! out=$(pnpm exec eslint --fix --no-warn-ignored "$file" 2>&1); then
      echo "$out" >&2
      exit 2
    fi
    ;;
  *)
    pnpm exec prettier --write --ignore-unknown "$file" 2>/dev/null || true
    ;;
esac
