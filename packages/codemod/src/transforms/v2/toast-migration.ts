import {
  deepConvertPropertyValue,
  findImportDeclaration,
  getLocalName,
} from '../../helpers';

import type { API, CallExpression, FileInfo, Options } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const useToastImport = findImportDeclaration(
    'useToast',
    '@wanteddev/wds',
    j,
    root,
  );

  if (useToastImport) {
    const useToastVariable = root.find(j.VariableDeclaration).filter((path) => {
      return path.value.declarations.some((declaration) => {
        return (
          declaration.type === 'VariableDeclarator' &&
          j.CallExpression.check(declaration.init) &&
          declaration.init.callee.type === 'Identifier' &&
          declaration.init.callee.name === getLocalName(useToastImport)
        );
      });
    });

    if (useToastVariable.size() > 0) {
      const toast = useToastVariable.nodes().at(0)?.declarations.at(0);

      if (
        toast?.type === 'VariableDeclarator' &&
        toast.id.type === 'Identifier'
      ) {
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
                objectPath.value.properties.forEach((property) => {
                  if (
                    property.type === 'ObjectProperty' ||
                    property.type === 'Property'
                  ) {
                    deepConvertPropertyValue(
                      property,
                      'variant',
                      (propertyValue) => {
                        switch (propertyValue) {
                          case 'warning':
                            hasChanges = true;
                            return 'cautionary';
                          case 'success':
                            hasChanges = true;
                            return 'positive';
                          case 'custom':
                            hasChanges = true;
                            return 'normal';
                          default:
                            return propertyValue;
                        }
                      },
                    );
                  }
                });
              });
          });
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
