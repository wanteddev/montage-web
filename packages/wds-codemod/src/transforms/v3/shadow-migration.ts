import type { API, ASTPath, FileInfo, Options } from 'jscodeshift';

const migrationSet = new Map([
  ['normal', 'xsmall'],
  ['emphasize', 'small'],
  ['strong', 'medium'],
  ['bold', 'large'],
  ['heavy', 'xlarge'],
]);

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  const wdsImport = root.find(j.ImportDeclaration, {
    source: { value: '@wanteddev/wds' },
  });

  if (wdsImport.length < 1) {
    return file.source;
  }

  root
    .find(j.MemberExpression, {
      object: {
        object: {
          name: (name: string) => name === 'theme' || name === 'wdsTheme',
        },
        property: {
          name: 'semantic',
        },
      },
    })
    .forEach((palette) => {
      const parent = palette.parent as ASTPath | undefined;

      if (
        parent?.value.type !== 'MemberExpression' ||
        parent.value.object.type !== 'MemberExpression' ||
        parent.value.object.property.type !== 'Identifier' ||
        parent.value.object.property.name !== 'elevation' ||
        parent.parent.value.type !== 'MemberExpression' ||
        parent.parent.value.object.type !== 'MemberExpression' ||
        parent.parent.value.object.property.type !== 'Identifier' ||
        parent.parent.value.object.property.name !== 'shadow' ||
        parent.parent.value.property.type !== 'Identifier' ||
        parent.parent.parent.value.type === 'MemberExpression'
      ) {
        return;
      }

      const name = parent.parent.value.property.name;

      if (migrationSet.has(name)) {
        j(parent.parent).replaceWith(
          j.memberExpression(
            j.memberExpression(
              parent.parent.value.object,
              j.identifier('normal'),
            ),
            j.identifier(migrationSet.get(name)!),
          ),
        );
      }
    });

  return root.toSource(options);
};

export default transformer;
