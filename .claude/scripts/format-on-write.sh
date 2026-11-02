#!/usr/bin/env bash
# PostToolUse hook: auto-format files written/edited by Claude.
# - .ts/.tsx/.js/.jsx/.mjs/.cjs → oxlint --fix, then oxfmt (block on lint failure)
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
    # lint 자동 수정이 바꾼 코드까지 포맷되도록 수정 → 포맷 순서로 실행한다.
    out=$(pnpm exec oxlint --fix --fix-suggestions "$file" 2>&1)
    lint_status=$?
    pnpm exec oxfmt "$file" >/dev/null 2>&1 || true
    if [ "$lint_status" -ne 0 ]; then
      echo "$out" >&2
      exit 2
    fi
    ;;
  *)
    pnpm exec oxfmt --no-error-on-unmatched-pattern "$file" >/dev/null 2>&1 || true
    ;;
esac
