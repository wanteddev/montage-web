import { findImportDeclaration, getLocalName } from '../../helpers';

import type { API, FileInfo, JSXAttribute, Options } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const wdsImport = root.find(j.ImportDeclaration, {
    source: { value: '@wanteddev/wds' },
  });

  if (wdsImport.length < 1) {
    return file.source;
  }

  const targetImports = [
    findImportDeclaration('ListCell', '@wanteddev/wds', j, root),
    findImportDeclaration('AccordionSummary', '@wanteddev/wds', j, root),
    findImportDeclaration('MenuItem', '@wanteddev/wds', j, root),
    findImportDeclaration('AutocompleteOption', '@wanteddev/wds', j, root),
    findImportDeclaration('Option', '@wanteddev/wds', j, root),
  ];

  for (const targetImport of targetImports) {
    if (!targetImport) continue;

    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(targetImport) },
      })
      .forEach((target) => {
        // <ListCell padding="12px" />
        const paddingAttribute = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'padding',
        );

        if (paddingAttribute) {
          hasChanges = true;

          target.value.attributes?.forEach((attr) => {
            if (attr.type === 'JSXAttribute' && attr.name.name === 'padding') {
              attr.name.name = 'verticalPadding';
            }
          });
        }

        // <ListCell sm={{ padding: "12px" }} />
        const responsiveSizes = ['sm', 'md', 'lg', 'xl', 'xs'] as const;

        responsiveSizes.forEach((size) => {
          const responsiveAttribute = (target.value.attributes ?? []).find(
            (v): v is JSXAttribute =>
              v.type === 'JSXAttribute' && v.name.name === size,
          );

          if (
            responsiveAttribute &&
            responsiveAttribute.value?.type === 'JSXExpressionContainer'
          ) {
            const expression = responsiveAttribute.value.expression;

            if (expression.type === 'ObjectExpression') {
              expression.properties.forEach((prop) => {
                if (
                  prop.type === 'ObjectProperty' &&
                  prop.key.type === 'Identifier' &&
                  prop.key.name === 'padding'
                ) {
                  hasChanges = true;
                  prop.key.name = 'verticalPadding';
                }
              });
            }
          }
        });
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
