import {
  WDS_VARIABLE_PATTERN,
  renameWdsVariablesInString,
} from './css-variable-map';

import type { API, FileInfo, Options } from 'jscodeshift';

const hasWdsVariable = (value: string) => {
  WDS_VARIABLE_PATTERN.lastIndex = 0;
  return WDS_VARIABLE_PATTERN.test(value);
};

/**
 * Renames every `--wds-*` CSS variable to its Montage 4.0 name across:
 * - string literals: inline-style keys (`'--wds-x'`), `var(--wds-x)` values,
 *   and any other string carrying the token
 * - template literals: `css\`\`` / `styled\`\`` blocks and dynamic style strings
 *
 * The token is matched by the `--wds-` prefix, so the transform is independent
 * of how the string is used and never touches non-Montage variables.
 */
const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  let hasChanges = false;

  // String literals — inline style keys/values, `var(...)` refs, etc.
  root.find(j.StringLiteral).forEach((path) => {
    const { value } = path.node;

    if (typeof value === 'string' && hasWdsVariable(value)) {
      const next = renameWdsVariablesInString(value);

      if (next !== value) {
        path.node.value = next;
        // Drop the cached raw source so the printer regenerates the literal
        // from `value` (otherwise the stale raw is emitted unchanged).
        delete (path.node as { extra?: unknown }).extra;
        hasChanges = true;
      }
    }
  });

  // Template literal chunks — `css\`\`` / `styled\`\`` and dynamic style strings.
  root.find(j.TemplateElement).forEach((path) => {
    const { raw, cooked } = path.node.value;

    if (typeof raw === 'string' && hasWdsVariable(raw)) {
      const nextRaw = renameWdsVariablesInString(raw);

      if (nextRaw !== raw) {
        path.node.value.raw = nextRaw;

        if (typeof cooked === 'string') {
          path.node.value.cooked = renameWdsVariablesInString(cooked);
        }

        hasChanges = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!hasChanges) {
    return file.source;
  }

  // Reprinted literals pick recast's quote option. Use 'auto' so each literal
  // keeps the quote style needing the least escaping — selector strings like
  // `'[data-component="x"]'` must stay single-quoted instead of being reprinted
  // as `"[data-component=\"x\"]"`.
  return root.toSource({ quote: 'auto', ...options });
};

export default transformer;
