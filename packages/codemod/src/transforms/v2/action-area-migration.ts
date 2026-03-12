import { findImportDeclaration, getLocalName } from '../../helpers';

import type { API, FileInfo, JSXAttribute, Options } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const actionAreaImport = findImportDeclaration(
    'ActionArea',
    '@wanteddev/wds',
    j,
    root,
  );

  const pickerActionAreaImport = findImportDeclaration(
    'PickerActionArea',
    '@wanteddev/wds',
    j,
    root,
  );

  if (actionAreaImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(actionAreaImport) },
      })
      .forEach((actionArea) => {
        const priority = actionArea.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'priority',
        ) as JSXAttribute | undefined;
        const variant = actionArea.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'variant',
        ) as JSXAttribute | undefined;
        const sticky = actionArea.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'sticky',
        ) as JSXAttribute | undefined;

        if (variant) {
          variant.name = j.jsxIdentifier('extra');
          hasChanges = true;
          if (
            variant.value?.type === 'JSXExpressionContainer' &&
            variant.value.expression.type === 'ConditionalExpression'
          ) {
            if (
              variant.value.expression.consequent.type === 'Literal' ||
              variant.value.expression.consequent.type === 'StringLiteral'
            ) {
              variant.value.expression.consequent = j.booleanLiteral(
                variant.value.expression.consequent.value === 'normal'
                  ? false
                  : true,
              );
            }

            if (
              variant.value.expression.alternate.type === 'Literal' ||
              variant.value.expression.alternate.type === 'StringLiteral'
            ) {
              variant.value.expression.alternate = j.booleanLiteral(
                variant.value.expression.alternate.value === 'normal'
                  ? false
                  : true,
              );
            }
          } else if (
            variant.value?.type === 'JSXExpressionContainer' &&
            (variant.value.expression.type === 'Literal' ||
              variant.value.expression.type === 'StringLiteral')
          ) {
            if (variant.value.expression.value === 'normal') {
              j(actionArea)
                .find(j.JSXAttribute, {
                  value: { expression: { value: 'normal' } },
                })
                .remove();
            } else {
              delete variant.value;
            }
          }

          if (
            variant.value?.type === 'Literal' ||
            variant.value?.type === 'StringLiteral'
          ) {
            if (variant.value.value === 'normal') {
              j(actionArea)
                .find(j.JSXAttribute, { value: { value: 'normal' } })
                .remove();
            } else {
              delete variant.value;
            }
          }
        }

        if (priority) {
          hasChanges = true;
          priority.name = j.jsxIdentifier('variant');
        }

        if (sticky) {
          hasChanges = true;
          sticky.name = j.jsxIdentifier('background');
        }
      });
  }

  if (pickerActionAreaImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(pickerActionAreaImport) },
      })
      .forEach((pickerActionArea) => {
        const priority = pickerActionArea.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'priority',
        ) as JSXAttribute | undefined;
        const variant = pickerActionArea.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'variant',
        ) as JSXAttribute | undefined;

        if (variant) {
          variant.name = j.jsxIdentifier('extra');
          hasChanges = true;
          if (
            variant.value?.type === 'JSXExpressionContainer' &&
            variant.value.expression.type === 'ConditionalExpression'
          ) {
            if (
              variant.value.expression.consequent.type === 'Literal' ||
              variant.value.expression.consequent.type === 'StringLiteral'
            ) {
              variant.value.expression.consequent = j.booleanLiteral(
                variant.value.expression.consequent.value === 'normal'
                  ? false
                  : true,
              );
            }

            if (
              variant.value.expression.alternate.type === 'Literal' ||
              variant.value.expression.alternate.type === 'StringLiteral'
            ) {
              variant.value.expression.alternate = j.booleanLiteral(
                variant.value.expression.alternate.value === 'normal'
                  ? false
                  : true,
              );
            }
          } else if (
            variant.value?.type === 'JSXExpressionContainer' &&
            (variant.value.expression.type === 'Literal' ||
              variant.value.expression.type === 'StringLiteral')
          ) {
            if (variant.value.expression.value === 'normal') {
              j(pickerActionArea)
                .find(j.JSXAttribute, {
                  value: { expression: { value: 'normal' } },
                })
                .remove();
            } else {
              delete variant.value;
            }
          }

          if (
            variant.value?.type === 'Literal' ||
            variant.value?.type === 'StringLiteral'
          ) {
            if (variant.value.value === 'normal') {
              j(pickerActionArea)
                .find(j.JSXAttribute, { value: { value: 'normal' } })
                .remove();
            } else {
              delete variant.value;
            }
          }
        }

        if (priority) {
          hasChanges = true;
          priority.name = j.jsxIdentifier('variant');
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : root.toSource();
};

export default transformer;
