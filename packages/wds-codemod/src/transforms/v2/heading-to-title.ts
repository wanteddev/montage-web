import { findImportDeclaration, getLocalName } from '../../helpers';

import type {
  API,
  CallExpression,
  FileInfo,
  JSXAttribute,
  Options,
} from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  // EmptyStateText heading -> title
  const emptyStateTextImport = findImportDeclaration(
    'EmptyStateText',
    '@wanteddev/wds',
    j,
    root,
  );

  if (emptyStateTextImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(emptyStateTextImport) },
      })
      .forEach((emptyState) => {
        const heading = emptyState.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'heading',
        ) as JSXAttribute | undefined;

        if (heading) {
          heading.name.name = 'title';
          hasChanges = true;
        }
      });
  }

  // Slider heading -> title
  const sliderImport = findImportDeclaration(
    'Slider',
    '@wanteddev/wds',
    j,
    root,
  );

  if (sliderImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(sliderImport) },
      })
      .forEach((slider) => {
        const heading = slider.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'heading',
        ) as JSXAttribute | undefined;

        if (heading) {
          heading.name.name = 'title';
          hasChanges = true;
        }
      });
  }

  // useSnackbar heading -> title
  const useSnackbarImport = findImportDeclaration(
    'useSnackbar',
    '@wanteddev/wds',
    j,
    root,
  );

  if (useSnackbarImport) {
    const useSnackbarVariable = root
      .find(j.VariableDeclaration)
      .filter((path) => {
        return path.value.declarations.some((declaration) => {
          return (
            declaration.type === 'VariableDeclarator' &&
            j.CallExpression.check(declaration.init) &&
            declaration.init.callee.type === 'Identifier' &&
            declaration.init.callee.name === getLocalName(useSnackbarImport)
          );
        });
      });

    if (useSnackbarVariable.size() > 0) {
      const snackbar = useSnackbarVariable.nodes().at(0)?.declarations.at(0);

      if (
        snackbar?.type === 'VariableDeclarator' &&
        snackbar.id.type === 'Identifier'
      ) {
        const snackbarName = snackbar.id.name;

        root
          .find(
            j.CallExpression,
            (v: CallExpression) =>
              v.callee.type === 'Identifier' && v.callee.name === snackbarName,
          )
          .forEach((callPath) => {
            j(callPath)
              .find(j.ObjectExpression)
              .forEach((objectPath) => {
                objectPath.value.properties.forEach((property: any) => {
                  if (property.key.name === 'heading') {
                    hasChanges = true;
                    property.key.name = 'title';
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
