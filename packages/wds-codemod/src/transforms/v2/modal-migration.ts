import { findImportDeclaration, getLocalName } from '../../helpers';

import type { API, FileInfo, Options, Property } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const modalContainerImport = findImportDeclaration(
    'ModalContainer',
    '@wanteddev/wds',
    j,
    root,
  );

  if (!modalContainerImport) {
    return file.source;
  }

  root
    .find(j.JSXOpeningElement, {
      name: { name: getLocalName(modalContainerImport) },
    })
    .forEach((container) => {
      const size = container.value.attributes?.find(
        (v) => v.type === 'JSXAttribute' && v.name.name === 'size',
      );
      const xs = container.value.attributes?.find(
        (v) => v.type === 'JSXAttribute' && v.name.name === 'xs',
      );
      const sm = container.value.attributes?.find(
        (v) => v.type === 'JSXAttribute' && v.name.name === 'sm',
      );
      const md = container.value.attributes?.find(
        (v) => v.type === 'JSXAttribute' && v.name.name === 'md',
      );
      const lg = container.value.attributes?.find(
        (v) => v.type === 'JSXAttribute' && v.name.name === 'lg',
      );
      const xl = container.value.attributes?.find(
        (v) => v.type === 'JSXAttribute' && v.name.name === 'xl',
      );

      const handleBreakpointAttribute = (attribute: any) => {
        if (!attribute || attribute.type !== 'JSXAttribute') return;

        if (attribute.value.expression.type === 'ConditionalExpression') {
          const { consequent, alternate } = attribute.value.expression;

          if (
            consequent.type === 'ObjectExpression' &&
            alternate.type === 'ObjectExpression'
          ) {
            const consequentSizeProp = consequent.properties.find(
              (p: Property) =>
                p.key.type === 'Identifier' && p.key.name === 'size',
            );
            const alternateSizeProp = alternate.properties.find(
              (p: Property) =>
                p.key.type === 'Identifier' && p.key.name === 'size',
            );

            const handleSizeValue = (sizeProp: any) => {
              if (!sizeProp?.value) return false;

              if (sizeProp.value.type === 'ConditionalExpression') {
                const consequentHasFixed = sizeProp.value.consequent.value
                  ?.toString()
                  .includes('fixed');
                const alternateHasFixed = sizeProp.value.alternate.value
                  ?.toString()
                  .includes('fixed');

                if (consequentHasFixed) {
                  sizeProp.value.consequent.value =
                    sizeProp.value.consequent.value
                      .toString()
                      .replace('-fixed', '');
                }
                if (alternateHasFixed) {
                  sizeProp.value.alternate.value =
                    sizeProp.value.alternate.value
                      .toString()
                      .replace('-fixed', '');
                }

                return consequentHasFixed || alternateHasFixed;
              }

              if (sizeProp.value.value?.toString().includes('fixed')) {
                sizeProp.value.value = sizeProp.value.value
                  .toString()
                  .replace('-fixed', '');
                return true;
              }

              return false;
            };

            const consequentHasFixed = handleSizeValue(consequentSizeProp);
            const alternateHasFixed = handleSizeValue(alternateSizeProp);

            if (consequentHasFixed && alternateHasFixed) {
              consequent.properties.push(
                j.property('init', j.identifier('resize'), j.literal('fixed')),
              );
              alternate.properties.push(
                j.property('init', j.identifier('resize'), j.literal('fixed')),
              );
              hasChanges = true;
            } else if (consequentHasFixed) {
              consequent.properties.push(
                j.property('init', j.identifier('resize'), j.literal('fixed')),
              );
              alternate.properties.push(
                j.property('init', j.identifier('resize'), j.literal('hug')),
              );
              hasChanges = true;
            } else if (alternateHasFixed) {
              consequent.properties.push(
                j.property('init', j.identifier('resize'), j.literal('hug')),
              );
              alternate.properties.push(
                j.property('init', j.identifier('resize'), j.literal('fixed')),
              );
              hasChanges = true;
            } else {
              // Neither has fixed
              consequent.properties.push(
                j.property('init', j.identifier('resize'), j.literal('hug')),
              );
              alternate.properties.push(
                j.property('init', j.identifier('resize'), j.literal('hug')),
              );
              hasChanges = true;
            }
          }
        } else if (attribute.value.expression.type === 'ObjectExpression') {
          const sizeProp = attribute.value.expression.properties.find(
            (p: Property) =>
              p.key.type === 'Identifier' && p.key.name === 'size',
          );

          if (sizeProp?.value.type === 'ConditionalExpression') {
            const consequentHasFixed = sizeProp.value.consequent.value
              ?.toString()
              .includes('fixed');
            const alternateHasFixed = sizeProp.value.alternate.value
              ?.toString()
              .includes('fixed');

            if (consequentHasFixed) {
              sizeProp.value.consequent.value = sizeProp.value.consequent.value
                .toString()
                .replace('-fixed', '');
            }
            if (alternateHasFixed) {
              sizeProp.value.alternate.value = sizeProp.value.alternate.value
                .toString()
                .replace('-fixed', '');
            }

            if (consequentHasFixed && alternateHasFixed) {
              attribute.value.expression.properties.push(
                j.property('init', j.identifier('resize'), j.literal('fixed')),
              );
            } else if (consequentHasFixed) {
              attribute.value.expression.properties.push(
                j.property(
                  'init',
                  j.identifier('resize'),
                  j.conditionalExpression(
                    sizeProp.value.test,
                    j.literal('fixed'),
                    j.literal('hug'),
                  ),
                ),
              );
            } else if (alternateHasFixed) {
              attribute.value.expression.properties.push(
                j.property(
                  'init',
                  j.identifier('resize'),
                  j.conditionalExpression(
                    sizeProp.value.test,
                    j.literal('hug'),
                    j.literal('fixed'),
                  ),
                ),
              );
            } else {
              attribute.value.expression.properties.push(
                j.property('init', j.identifier('resize'), j.literal('hug')),
              );
            }
            hasChanges = true;
          } else if (sizeProp?.value.value?.toString().includes('fixed')) {
            sizeProp.value.value = sizeProp.value.value
              .toString()
              .replace('-fixed', '');
            attribute.value.expression.properties.push(
              j.property('init', j.identifier('resize'), j.literal('fixed')),
            );
            hasChanges = true;
          } else {
            attribute.value.expression.properties.push(
              j.property('init', j.identifier('resize'), j.literal('hug')),
            );
            hasChanges = true;
          }
        }
      };

      if (size?.type === 'JSXAttribute') {
        if (
          size.value?.type === 'Literal' ||
          size.value?.type === 'StringLiteral'
        ) {
          if (size.value.value?.toString().includes('fixed')) {
            size.value.value = size.value.value
              .toString()
              .replace('-fixed', '');
            container.value.attributes?.push(
              j.jsxAttribute(j.jsxIdentifier('resize'), j.literal('fixed')),
            );
            hasChanges = true;
          }
        } else if (
          size.value?.type === 'JSXExpressionContainer' &&
          size.value.expression.type === 'ConditionalExpression'
        ) {
          const consequent = size.value.expression.consequent;
          const alternate = size.value.expression.alternate;

          const consequentHasFixed =
            (consequent.type === 'Literal' ||
              consequent.type === 'StringLiteral') &&
            consequent.value?.toString().includes('fixed');
          const alternateHasFixed =
            (alternate.type === 'Literal' ||
              alternate.type === 'StringLiteral') &&
            alternate.value?.toString().includes('fixed');

          if (consequentHasFixed && alternateHasFixed) {
            container.value.attributes?.push(
              j.jsxAttribute(j.jsxIdentifier('resize'), j.literal('fixed')),
            );
            consequent.value =
              consequent.value?.toString().replace('-fixed', '') ?? '';
            alternate.value =
              alternate.value?.toString().replace('-fixed', '') ?? '';
            hasChanges = true;
          } else if (consequentHasFixed) {
            consequent.value =
              consequent.value?.toString().replace('-fixed', '') ?? '';
            container.value.attributes?.push(
              j.jsxAttribute(
                j.jsxIdentifier('resize'),
                j.jsxExpressionContainer(
                  j.conditionalExpression(
                    size.value.expression.test,
                    j.literal('fixed'),
                    j.literal('hug'),
                  ),
                ),
              ),
            );
            hasChanges = true;
          } else if (alternateHasFixed) {
            alternate.value =
              alternate.value?.toString().replace('-fixed', '') ?? '';
            container.value.attributes?.push(
              j.jsxAttribute(
                j.jsxIdentifier('resize'),
                j.jsxExpressionContainer(
                  j.conditionalExpression(
                    size.value.expression.test,
                    j.literal('hug'),
                    j.literal('fixed'),
                  ),
                ),
              ),
            );
            hasChanges = true;
          }
        }
      }

      [xs, sm, md, lg, xl].forEach(handleBreakpointAttribute);
    });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
