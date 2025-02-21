import type { API, CallExpression, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options,
) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const useToastImport = root.find(j.ImportDeclaration, {
    source: { value: '@wanteddev/wds' },
  });

  if (useToastImport.size() === 0) {
    return file.source;
  }

  const useToastVariable = root.find(j.VariableDeclaration).filter((path) => {
    return path.value.declarations.some((declaration) => {
      return (
        declaration.type === 'VariableDeclarator' &&
        j.CallExpression.check(declaration.init) &&
        declaration.init.callee.type === 'Identifier' &&
        declaration.init.callee.name === 'useToast'
      );
    });
  });

  if (useToastVariable.size() === 0) {
    return file.source;
  }

  const toast = useToastVariable.nodes().at(0)?.declarations.at(0);

  if (toast?.type === 'VariableDeclarator' && toast.id.type === 'Identifier') {
    const toastName = toast.id.name;

    root
      .find(
        j.CallExpression,
        (v: CallExpression) =>
          v.callee.type === 'Identifier' && v.callee.name === toastName,
      )
      .forEach((callPath) => {
        j(callPath)
          .find(j.ObjectExpression)
          .forEach((objectPath) => {
            objectPath.value.properties.forEach((property: any) => {
              if (
                property.key.name === 'variant' &&
                property.value.value === 'error'
              ) {
                property.value = j.literal('warning');
              }
            });
          });
      });
    return root.toSource(options);
  }

  return file.source;
}
