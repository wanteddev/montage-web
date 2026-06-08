import {
  DOM_IDENTIFIER_MAP,
  WDS_DOM_IDENTIFIER_PATTERN,
  renameWdsDomIdentifiersInString,
} from './dom-identifier-map';

import type { API, FileInfo, Options } from 'jscodeshift';

const hasDomIdentifier = (value: string) =>
  WDS_DOM_IDENTIFIER_PATTERN.test(value);

/**
 * Renames `wds-*` DOM identifiers to their Montage 4.0 names across:
 * - string literals: CSS attribute/id selectors passed to `styled`/`querySelector`,
 *   `closest`, `classList`, etc.
 * - template literals: `css\`\`` / `styled\`\`` selector blocks
 * - JSX attribute names: the rare case a consumer sets `wds-component` directly
 *
 * Stylesheets (.css/.scss/...) are handled separately by the CLI text pass.
 */
const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  let hasChanges = false;

  // String literals — selectors in querySelector/closest/styled, etc.
  root.find(j.StringLiteral).forEach((path) => {
    const { value } = path.node;

    if (typeof value === 'string' && hasDomIdentifier(value)) {
      const next = renameWdsDomIdentifiersInString(value);

      if (next !== value) {
        path.node.value = next;
        delete (path.node as { extra?: unknown }).extra;
        hasChanges = true;
      }
    }
  });

  // Template literal chunks — selector blocks in `css\`\``/`styled\`\``.
  root.find(j.TemplateElement).forEach((path) => {
    const { raw, cooked } = path.node.value;

    if (typeof raw === 'string' && hasDomIdentifier(raw)) {
      const nextRaw = renameWdsDomIdentifiersInString(raw);

      if (nextRaw !== raw) {
        path.node.value.raw = nextRaw;

        if (typeof cooked === 'string') {
          path.node.value.cooked = renameWdsDomIdentifiersInString(cooked);
        }

        hasChanges = true;
      }
    }
  });

  // JSX attribute names — e.g. `<div wds-component="x" />`.
  root.find(j.JSXAttribute).forEach((path) => {
    const { name } = path.node;

    if (
      name.type === 'JSXIdentifier' &&
      Object.prototype.hasOwnProperty.call(DOM_IDENTIFIER_MAP, name.name)
    ) {
      name.name = DOM_IDENTIFIER_MAP[name.name]!;
      hasChanges = true;
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
