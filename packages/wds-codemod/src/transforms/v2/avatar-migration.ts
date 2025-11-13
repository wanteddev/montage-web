import { findImportDeclaration, getLocalName } from '../../helpers';

import type { API, FileInfo, JSXAttribute, Options } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const avatarImport = findImportDeclaration(
    'Avatar',
    '@wanteddev/wds',
    j,
    root,
  );

  if (avatarImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(avatarImport) },
      })
      .forEach((avatar) => {
        const variant = avatar.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'variant',
        ) as JSXAttribute | undefined;

        if (
          Boolean(variant) &&
          variant!.value?.type === 'JSXExpressionContainer' &&
          variant!.value.expression.type === 'ConditionalExpression'
        ) {
          if (
            (variant!.value.expression.consequent.type === 'Literal' ||
              variant!.value.expression.consequent.type === 'StringLiteral') &&
            variant!.value.expression.consequent.value === 'academic'
          ) {
            hasChanges = true;
            variant!.value.expression.consequent.value = 'academy';
          }

          if (
            (variant!.value.expression.alternate.type === 'Literal' ||
              variant!.value.expression.alternate.type === 'StringLiteral') &&
            variant!.value.expression.alternate.value === 'academic'
          ) {
            hasChanges = true;
            variant!.value.expression.alternate.value = 'academy';
          }
        }

        if (
          Boolean(variant) &&
          (variant!.value?.type === 'Literal' ||
            variant!.value?.type === 'StringLiteral') &&
          variant!.value.value === 'academic'
        ) {
          hasChanges = true;
          variant!.value.value = 'academy';
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
