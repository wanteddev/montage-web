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

  const chipActionImport = findImportDeclaration(
    'ChipAction',
    '@wanteddev/wds',
    j,
    root,
  );

  if (chipActionImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(chipActionImport) },
      })
      .forEach((chipAction) => {
        const variant = chipAction.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'variant',
        ) as JSXAttribute | undefined;

        if (!variant) {
          return;
        }

        if (variant.value?.type === 'JSXExpressionContainer') {
          if (variant.value.expression.type === 'ConditionalExpression') {
            if (
              (variant.value.expression.consequent.type === 'Literal' ||
                variant.value.expression.consequent.type === 'StringLiteral') &&
              variant.value.expression.consequent.value === 'filled'
            ) {
              hasChanges = true;
              variant.value.expression.consequent.value = 'solid';
            }

            if (
              (variant.value.expression.alternate.type === 'Literal' ||
                variant.value.expression.alternate.type === 'StringLiteral') &&
              variant.value.expression.alternate.value === 'filled'
            ) {
              hasChanges = true;
              variant.value.expression.alternate.value = 'solid';
            }
          } else if (
            (variant.value.expression.type === 'Literal' ||
              variant.value.expression.type === 'StringLiteral') &&
            variant.value.expression.value === 'filled'
          ) {
            hasChanges = true;
            variant.value.expression.value = 'solid';
          }
        }

        if (
          (variant.value?.type === 'Literal' ||
            variant.value?.type === 'StringLiteral') &&
          variant.value.value === 'filled'
        ) {
          hasChanges = true;
          variant.value.value = 'solid';
        }
      });
  }

  const chipFilterImport = findImportDeclaration(
    'ChipFilter',
    '@wanteddev/wds',
    j,
    root,
  );

  if (chipFilterImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(chipFilterImport) },
      })
      .forEach((chipFilter) => {
        const variant = chipFilter.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'variant',
        ) as JSXAttribute | undefined;

        if (!variant) {
          return;
        }

        if (variant.value?.type === 'JSXExpressionContainer') {
          if (variant.value.expression.type === 'ConditionalExpression') {
            if (
              (variant.value.expression.consequent.type === 'Literal' ||
                variant.value.expression.consequent.type === 'StringLiteral') &&
              variant.value.expression.consequent.value === 'filled'
            ) {
              hasChanges = true;
              variant.value.expression.consequent.value = 'solid';
            }

            if (
              (variant.value.expression.alternate.type === 'Literal' ||
                variant.value.expression.alternate.type === 'StringLiteral') &&
              variant.value.expression.alternate.value === 'filled'
            ) {
              hasChanges = true;
              variant.value.expression.alternate.value = 'solid';
            }
          } else if (
            (variant.value.expression.type === 'Literal' ||
              variant.value.expression.type === 'StringLiteral') &&
            variant.value.expression.value === 'filled'
          ) {
            hasChanges = true;
            variant.value.expression.value = 'solid';
          }
        }

        if (
          (variant.value?.type === 'Literal' ||
            variant.value?.type === 'StringLiteral') &&
          variant.value.value === 'filled'
        ) {
          hasChanges = true;
          variant.value.value = 'solid';
        }
      });
  }

  const contentBadgeImport = findImportDeclaration(
    'ContentBadge',
    '@wanteddev/wds',
    j,
    root,
  );

  if (contentBadgeImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(contentBadgeImport) },
      })
      .forEach((contentBadge) => {
        const variant = contentBadge.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'variant',
        ) as JSXAttribute | undefined;

        if (!variant) {
          return;
        }

        if (variant.value?.type === 'JSXExpressionContainer') {
          if (variant.value.expression.type === 'ConditionalExpression') {
            if (
              (variant.value.expression.consequent.type === 'Literal' ||
                variant.value.expression.consequent.type === 'StringLiteral') &&
              variant.value.expression.consequent.value === 'filled'
            ) {
              hasChanges = true;
              variant.value.expression.consequent.value = 'solid';
            }

            if (
              (variant.value.expression.alternate.type === 'Literal' ||
                variant.value.expression.alternate.type === 'StringLiteral') &&
              variant.value.expression.alternate.value === 'filled'
            ) {
              hasChanges = true;
              variant.value.expression.alternate.value = 'solid';
            }
          } else if (
            (variant.value.expression.type === 'Literal' ||
              variant.value.expression.type === 'StringLiteral') &&
            variant.value.expression.value === 'filled'
          ) {
            hasChanges = true;
            variant.value.expression.value = 'solid';
          }
        }

        if (
          (variant.value?.type === 'Literal' ||
            variant.value?.type === 'StringLiteral') &&
          variant.value.value === 'filled'
        ) {
          hasChanges = true;
          variant.value.value = 'solid';
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
