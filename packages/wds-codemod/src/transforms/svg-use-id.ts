import type { API, FileInfo, Options, StringLiteral } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const idAttributes = root.find(j.JSXAttribute, {
    name: {
      name: 'id',
    },
    value: {
      type: 'StringLiteral',
    },
  });

  if (idAttributes.length < 1) {
    return file.source;
  }

  idAttributes.forEach((node, idx) => {
    const id = (node.node.value as StringLiteral).value;

    const usedIds = root.find(j.StringLiteral, ({ value }) => {
      const match = /#(?<id>\w+)/.exec(value);
      const { groups } = match || {};

      return groups?.id === id;
    });

    node.node.value = j.jsxExpressionContainer(j.identifier(`id${idx + 1}`));

    usedIds.forEach((idNode) => {
      const [first, second] = idNode.node.value.split(id);

      if (Boolean(first) && Boolean(second)) {
        idNode.replace(
          j.jsxExpressionContainer(
            j.templateLiteral(
              [
                j.templateElement({ raw: first!, cooked: first! }, false),
                j.templateElement({ raw: second!, cooked: second! }, true),
              ],
              [j.identifier(`id${idx + 1}`)],
            ),
          ),
        );
      }
    });

    const returnStatement = root.find(j.ReturnStatement);

    returnStatement.insertBefore(
      j.variableDeclaration('const', [
        j.variableDeclarator(
          j.identifier(`id${idx + 1}`),
          j.callExpression(j.identifier('useId'), []),
        ),
      ]),
    );

    hasChanges = true;
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (hasChanges) {
    const reactImportDeclaration = root.find(j.ImportDeclaration, {
      source: { value: 'react' },
      importKind: 'value',
    });

    reactImportDeclaration.forEach((node) => {
      if (
        !node.node.specifiers?.find(
          (v) => v.type === 'ImportSpecifier' && v.imported.name === 'useId',
        )
      ) {
        node.node.specifiers?.push(j.importSpecifier(j.identifier('useId')));
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
