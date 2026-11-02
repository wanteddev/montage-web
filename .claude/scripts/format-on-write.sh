#!/usr/bin/env bash
# PostToolUse hook: auto-format files written/edited by Claude.
# - .ts/.tsx/.js/.jsx/.mjs/.cjs → oxfmt, then oxlint --fix (block on lint failure)
# - everything else            → oxfmt (best-effort)
#
# Reads the tool event JSON from stdin and pulls the touched file path.

set -u

file="$(jq -r '.tool_response.filePath // .tool_input.file_path // empty')"

if [ -z "$file" ]; then
  exit 0
fi

case "$file" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs)
    pnpm exec oxfmt "$file" >/dev/null 2>&1 || true
    if ! out=$(pnpm exec oxlint --fix "$file" 2>&1); then
      echo "$out" >&2
      exit 2
    fi
    ;;
  *)
    pnpm exec oxfmt --no-error-on-unmatched-pattern "$file" >/dev/null 2>&1 || true
    ;;
esac
