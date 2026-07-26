import {
  SEMANTIC_CSS_VARIABLE_PATTERN,
  SEMANTIC_TOKEN_MAP,
  SEMANTIC_TOKEN_PATH_PATTERN,
  renameSemanticTokenPathsInString,
  renameSemanticTokensInString,
} from './semantic-token-map';

import type {
  API,
  ASTNode,
  ASTPath,
  FileInfo,
  Identifier,
  MemberExpression,
  Options,
} from 'jscodeshift';

const OLD_PATH_DEPTHS = Object.keys(SEMANTIC_TOKEN_MAP).map(
  (path) => path.split('.').length,
);
const MIN_OLD_PATH_DEPTH = Math.min(...OLD_PATH_DEPTHS);
const MAX_OLD_PATH_DEPTH = Math.max(...OLD_PATH_DEPTHS);

const hasSemanticToken = (value: string) => {
  SEMANTIC_TOKEN_PATH_PATTERN.lastIndex = 0;
  SEMANTIC_CSS_VARIABLE_PATTERN.lastIndex = 0;

  return (
    SEMANTIC_TOKEN_PATH_PATTERN.test(value) ||
    SEMANTIC_CSS_VARIABLE_PATTERN.test(value)
  );
};

const renameSemanticTokens = (value: string) =>
  renameSemanticTokensInString(renameSemanticTokenPathsInString(value));

/**
 * Rewrites the 3.x semantic color tokens to their Montage 4.0 paths across:
 * - member expression chains — `theme.semantic.label.normal`,
 *   `props.theme.semantic.material.dimmer`, destructured
 *   `semantic.fill.primary`, or any other alias: the base is not hardcoded,
 *   every `<base>.semantic.<path>` chain is rewritten. Old and new paths may
 *   differ in depth; segments after `semantic` are matched longest-first
 *   against the map and trailing segments beyond the match are preserved.
 * - string literals — `color="semantic.label.normal"`,
 *   `getColorByToken('semantic.accent.foreground.red')`, `var(--semantic-…)`
 *   in inline styles, etc.
 * - template literals — `css\`\`` / `styled\`\`` blocks and dynamic style
 *   strings carrying either form.
 *
 * Tokens are matched by the distinctive `semantic.` / `--semantic-` prefix
 * plus an exact old path, so the transform is independent of how the value is
 * used and never touches unrelated code. New paths never overlap old ones, so
 * running the transform twice is a no-op.
 */
const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  let hasChanges = false;

  /**
   * Rewrites the member chain hanging off a `semantic` anchor. The anchor node
   * itself (`<base>.semantic` or a bare `semantic` identifier) is kept as the
   * base and the old-path segments above it are replaced with the new path.
   */
  const rewriteSemanticChain = (
    anchorPath: ASTPath<Identifier> | ASTPath<MemberExpression>,
  ) => {
    const segments: Array<string> = [];
    const chainNodes: Array<MemberExpression> = [];

    let current: ASTPath<Identifier | MemberExpression> = anchorPath;

    while (segments.length < MAX_OLD_PATH_DEPTH) {
      const parent = current.parent as ASTPath<ASTNode> | null | undefined;
      const parentNode = parent?.value;

      if (
        !parentNode ||
        parentNode.type !== 'MemberExpression' ||
        parentNode.object !== current.value ||
        parentNode.computed ||
        parentNode.property.type !== 'Identifier'
      ) {
        break;
      }

      segments.push(parentNode.property.name);
      chainNodes.push(parentNode);
      current = parent as ASTPath<MemberExpression>;
    }

    // 깊이 2~4의 old path를 최장 일치로 매칭 — `material.dimmer`처럼 짧은
    // 경로가 `line.status.negative.normal` 같은 긴 경로를 가리지 않는다.
    for (let depth = segments.length; depth >= MIN_OLD_PATH_DEPTH; depth--) {
      const newPath = SEMANTIC_TOKEN_MAP[segments.slice(0, depth).join('.')];
      const matchNode = chainNodes[depth - 1];

      if (!newPath || !matchNode) {
        continue;
      }

      const newSegments = newPath.split('.');
      const lastSegment = newSegments[newSegments.length - 1];

      if (!lastSegment) {
        continue;
      }

      // anchor(`<base>.semantic`)는 그대로 두고 그 위에 새 경로를 쌓는다.
      // matchNode 위의 trailing 세그먼트는 부모 노드라 자동으로 보존된다.
      let objectNode: MemberExpression['object'] = anchorPath.value;

      newSegments.slice(0, -1).forEach((segment) => {
        objectNode = j.memberExpression(objectNode, j.identifier(segment));
      });

      matchNode.object = objectNode;
      matchNode.property = j.identifier(lastSegment);
      hasChanges = true;
      return;
    }
  };

  // `<base>.semantic.<path>` — base는 `theme`, `wdsTheme`, `props.theme`,
  // 임의의 alias 등 무엇이든 가능하다.
  root
    .find(j.MemberExpression, {
      property: { type: 'Identifier', name: 'semantic' },
    })
    .forEach((path) => {
      if (path.value.computed) {
        return;
      }

      rewriteSemanticChain(path);
    });

  // 구조분해된 `semantic.<path>` — 체인의 root가 `semantic` identifier인 경우.
  root.find(j.Identifier, { name: 'semantic' }).forEach((path) => {
    const parentNode = (path.parent as ASTPath<MemberExpression> | undefined)
      ?.value;

    if (
      parentNode?.type === 'MemberExpression' &&
      parentNode.object === path.value
    ) {
      rewriteSemanticChain(path);
    }
  });

  // String literals — JSX color props, getColorByToken 인자, `var(...)` 참조 등.
  root.find(j.StringLiteral).forEach((path) => {
    const { value } = path.node;

    if (typeof value === 'string' && hasSemanticToken(value)) {
      const next = renameSemanticTokens(value);

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

    if (typeof raw === 'string' && hasSemanticToken(raw)) {
      const nextRaw = renameSemanticTokens(raw);

      if (nextRaw !== raw) {
        path.node.value.raw = nextRaw;

        if (typeof cooked === 'string') {
          path.node.value.cooked = renameSemanticTokens(cooked);
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
  // keeps the quote style needing the least escaping.
  return root.toSource({ quote: 'auto', ...options });
};

export default transformer;
