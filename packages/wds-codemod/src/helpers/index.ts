import type { Collection, ImportSpecifier, JSCodeshift } from 'jscodeshift';

export const findImportDeclaration = (
  name: string,
  from: string,
  j: JSCodeshift,
  root: Collection<any>,
) => {
  let result: ImportSpecifier | undefined;

  root
    .find(j.ImportDeclaration, {
      source: { value: from },
    })
    .forEach((importDeclaration) => {
      importDeclaration.node.specifiers?.forEach((specifier) => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.name === name
        ) {
          result = specifier;

          return;
        }
      });
    });

  return result;
};
