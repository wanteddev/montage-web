import { toSourcePreservingJsx } from '../../helpers';

import {
  WDS_VARIABLE_PATTERN,
  renameWdsVariablesInString,
} from './css-variable-map';

import type {
  API,
  ASTPath,
  FileInfo,
  Options,
  StringLiteral,
} from 'jscodeshift';

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
 *
 * `--wds-modal-content-margin` is split into `--modal-content-margin-x` / `-y`
 * by the CSS property that reads it (the `prop:` declaration in the string, or
 * the inline-style object key); a location whose axis cannot be decided keeps
 * the prefix-stripped name and is reported.
 */
const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  let hasChanges = false;

  const reportUnresolved = (excerpt: string) => {
    api.report(
      `${file.path}: --wds-modal-content-margin의 축(-x / -y)을 정하지 못해 --modal-content-margin으로 남깁니다 — 수동 확인이 필요합니다: ${excerpt}`,
    );
  };

  // 인라인 스타일 객체의 값이면 key가 곧 CSS 속성이다 (`paddingLeft: 'var(…)'`).
  const getStyleProperty = (path: ASTPath<StringLiteral>) => {
    const parent = path.parent?.value as unknown;

    if (
      !(j.ObjectProperty.check(parent) || j.Property.check(parent)) ||
      parent.value !== path.node
    ) {
      return undefined;
    }

    if (j.Identifier.check(parent.key)) return parent.key.name;
    if (j.StringLiteral.check(parent.key)) return parent.key.value;

    return undefined;
  };

  // String literals — inline style keys/values, `var(...)` refs, etc.
  root.find(j.StringLiteral).forEach((path) => {
    const { value } = path.node;

    if (typeof value === 'string' && hasWdsVariable(value)) {
      const next = renameWdsVariablesInString(value, {
        property: getStyleProperty(path),
        onUnresolved: reportUnresolved,
      });

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
      const nextRaw = renameWdsVariablesInString(raw, {
        onUnresolved: reportUnresolved,
      });

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
  return toSourcePreservingJsx(j, root, { quote: 'auto', ...options });
};

export default transformer;
