import {
  deepConvertPropertyValue,
  findImportDeclaration,
  getImportedName,
  getLocalName,
} from '../../helpers';

import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXExpressionContainer,
  Options,
} from 'jscodeshift';

const reversePosition = (position: string) => {
  if (position.includes('bottom')) {
    return position.replace('bottom', 'top');
  } else if (position.includes('top')) {
    return position.replace('top', 'bottom');
  } else if (position.includes('left')) {
    return position.replace('left', 'right');
  } else if (position.includes('right')) {
    return position.replace('right', 'left');
  }

  return position;
};

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

  // compact-tooltip -> tooltip
  const compactTooltipImport = findImportDeclaration(
    'CompactTooltip',
    '@wanteddev/wds',
    j,
    root,
  );

  const tooltipImport = findImportDeclaration(
    'Tooltip',
    '@wanteddev/wds',
    j,
    root,
  );

  if (compactTooltipImport) {
    hasChanges = true;

    let tooltipName = 'Tooltip';

    if (tooltipImport) {
      tooltipName = getImportedName(tooltipImport);
      root
        .find(j.ImportSpecifier, {
          imported: {
            name: getImportedName(compactTooltipImport),
          },
        })
        .remove();
    } else {
      root
        .find(j.ImportSpecifier, {
          imported: {
            name: getImportedName(compactTooltipImport),
          },
        })
        .replaceWith(j.importSpecifier(j.identifier(tooltipName)));
    }

    root
      .find(j.Identifier, { name: getLocalName(compactTooltipImport) })
      .forEach((compactTooltip) => {
        compactTooltip.value.name = tooltipName;
      });
  }

  // compact-tooltip-trigger -> tooltip-trigger
  const compactTooltipTriggerImport = findImportDeclaration(
    'CompactTooltipTrigger',
    '@wanteddev/wds',
    j,
    root,
  );

  const tooltipTriggerImport = findImportDeclaration(
    'TooltipTrigger',
    '@wanteddev/wds',
    j,
    root,
  );

  if (compactTooltipTriggerImport) {
    hasChanges = true;

    let tooltipTriggerName = 'TooltipTrigger';

    if (tooltipTriggerImport) {
      tooltipTriggerName = getImportedName(tooltipTriggerImport);
      root
        .find(j.ImportSpecifier, {
          imported: {
            name: getImportedName(compactTooltipTriggerImport),
          },
        })
        .remove();
    } else {
      root
        .find(j.ImportSpecifier, {
          imported: {
            name: getImportedName(compactTooltipTriggerImport),
          },
        })
        .replaceWith(j.importSpecifier(j.identifier(tooltipTriggerName)));
    }

    root
      .find(j.Identifier, { name: getLocalName(compactTooltipTriggerImport) })
      .forEach((compactTooltipTrigger) => {
        compactTooltipTrigger.value.name = tooltipTriggerName;
      });
  }

  // compact-tooltip-content -> tooltip-content
  const compactTooltipContentImport = findImportDeclaration(
    'CompactTooltipContent',
    '@wanteddev/wds',
    j,
    root,
  );

  const tooltipContentImport = findImportDeclaration(
    'TooltipContent',
    '@wanteddev/wds',
    j,
    root,
  );

  if (compactTooltipContentImport) {
    hasChanges = true;

    let tooltipContentName = 'TooltipContent';

    if (tooltipContentImport) {
      tooltipContentName = getImportedName(tooltipContentImport);
      root
        .find(j.ImportSpecifier, {
          imported: {
            name: getImportedName(compactTooltipContentImport),
          },
        })
        .remove();
    } else {
      root
        .find(j.ImportSpecifier, {
          imported: {
            name: getImportedName(compactTooltipContentImport),
          },
        })
        .replaceWith(j.importSpecifier(j.identifier(tooltipContentName)));
    }

    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(compactTooltipContentImport) },
        },
      })
      .forEach((node) => {
        const attributes = node.value.openingElement.attributes;

        if (!attributes) return;

        attributes.push(
          j.jsxAttribute(j.jsxIdentifier('size'), j.literal('small')),
        );
      });

    root
      .find(j.Identifier, { name: getLocalName(compactTooltipContentImport) })
      .forEach((compactTooltipContent) => {
        compactTooltipContent.value.name = tooltipContentName;
      });
  }

  if (tooltipContentImport) {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(tooltipContentImport) },
        },
      })
      .forEach((node) => {
        const arrow = node.value.openingElement.attributes?.find(
          (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'arrow',
        ) as JSXAttribute | undefined;

        if (!arrow) return;
        hasChanges = true;
        j(node)
          .find(j.JSXAttribute, { name: { name: 'arrow' } })
          .remove();
      });
  }

  const popperContentImport = findImportDeclaration(
    'PopperContent',
    '@wanteddev/wds',
    j,
    root,
  );

  if (popperContentImport) {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(popperContentImport) },
        },
      })
      .forEach((node) => {
        const attributes = node.value.openingElement.attributes;

        if (!attributes) return;

        const position = attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name.name === 'position',
        ) as JSXAttribute | undefined;

        if (!position) {
          hasChanges = true;
          attributes.push(
            j.jsxAttribute(
              j.jsxIdentifier('position'),
              j.literal('bottom-center'),
            ),
          );
        } else if (
          position.value?.type === 'StringLiteral' ||
          position.value?.type === 'Literal'
        ) {
          hasChanges = true;
          position.value.value = reversePosition(
            position.value.value!.toString(),
          );
        }
      });
  }

  const autocompleteListImport = findImportDeclaration(
    'AutocompleteList',
    '@wanteddev/wds',
    j,
    root,
  );

  if (autocompleteListImport) {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(autocompleteListImport) },
        },
      })
      .forEach((node) => {
        const attributes = node.value.openingElement.attributes;

        if (!attributes) return;

        const position = attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name.name === 'position',
        ) as JSXAttribute | undefined;

        if (!position) {
          return;
        }

        if (
          position.value?.type === 'StringLiteral' ||
          position.value?.type === 'Literal'
        ) {
          hasChanges = true;
          position.value.value = reversePosition(
            position.value.value!.toString(),
          );
        }
      });
  }

  const menuContentImport = findImportDeclaration(
    'MenuContent',
    '@wanteddev/wds',
    j,
    root,
  );

  if (menuContentImport) {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(menuContentImport) },
        },
      })
      .forEach((node) => {
        const attributes = node.value.openingElement.attributes;

        if (!attributes) return;

        const position = attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name.name === 'position',
        ) as JSXAttribute | undefined;

        if (!position) {
          return;
        }

        if (
          position.value?.type === 'StringLiteral' ||
          position.value?.type === 'Literal'
        ) {
          hasChanges = true;
          position.value.value = reversePosition(
            position.value.value!.toString(),
          );
        }
      });
  }

  const timePickerImport = findImportDeclaration(
    'TimePicker',
    '@wanteddev/wds',
    j,
    root,
  );

  if (timePickerImport) {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(timePickerImport) },
        },
      })
      .forEach((node) => {
        const attributes = node.value.openingElement.attributes;

        if (!attributes) return;

        const contentProps = attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name.name === 'contentProps',
        ) as JSXAttribute | undefined;

        if (!contentProps) {
          return;
        }

        hasChanges = true;

        deepConvertPropertyValue(
          contentProps.value as JSXExpressionContainer,
          'position',
          reversePosition,
        );
      });
  }

  const datePickerImport = findImportDeclaration(
    'DatePicker',
    '@wanteddev/wds',
    j,
    root,
  );

  if (datePickerImport) {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(datePickerImport) },
        },
      })
      .forEach((node) => {
        const attributes = node.value.openingElement.attributes;

        if (!attributes) return;

        const contentProps = attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name.name === 'contentProps',
        ) as JSXAttribute | undefined;

        if (!contentProps) {
          return;
        }

        deepConvertPropertyValue(
          contentProps.value as JSXExpressionContainer,
          'position',
          reversePosition,
        );
        hasChanges = true;
      });
  }

  const selectImport = findImportDeclaration(
    'Select',
    '@wanteddev/wds',
    j,
    root,
  );

  if (selectImport) {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(selectImport) },
        },
      })
      .forEach((node) => {
        const attributes = node.value.openingElement.attributes;

        if (!attributes) return;

        const contentProps = attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name.name === 'contentProps',
        ) as JSXAttribute | undefined;

        if (!contentProps) {
          return;
        }

        hasChanges = true;

        deepConvertPropertyValue(
          contentProps.value as JSXExpressionContainer,
          'position',
          reversePosition,
        );
      });
  }

  const selectMultipleImport = findImportDeclaration(
    'SelectMultiple',
    '@wanteddev/wds',
    j,
    root,
  );

  if (selectMultipleImport) {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(selectMultipleImport) },
        },
      })
      .forEach((node) => {
        const attributes = node.value.openingElement.attributes;

        if (!attributes) return;

        const contentProps = attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name.name === 'contentProps',
        ) as JSXAttribute | undefined;

        if (!contentProps) {
          return;
        }

        hasChanges = true;

        deepConvertPropertyValue(
          contentProps.value as JSXExpressionContainer,
          'position',
          reversePosition,
        );
      });
  }

  const popoverContentImport = findImportDeclaration(
    'PopoverContent',
    '@wanteddev/wds',
    j,
    root,
  );

  if (popoverContentImport) {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(popoverContentImport) },
        },
      })
      .forEach((node) => {
        const attributes = node.value.openingElement.attributes;

        if (!attributes) return;

        const variant = attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name.name === 'variant',
        ) as JSXAttribute | undefined;

        if (!variant) {
          hasChanges = true;
          attributes.push(
            j.jsxAttribute(j.jsxIdentifier('variant'), j.literal('custom')),
          );
        }

        const position = attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name.name === 'position',
        ) as JSXAttribute | undefined;

        if (!position) {
          hasChanges = true;
          attributes.push(
            j.jsxAttribute(
              j.jsxIdentifier('position'),
              j.literal('bottom-center'),
            ),
          );
        } else if (
          position.value?.type === 'StringLiteral' ||
          position.value?.type === 'Literal'
        ) {
          hasChanges = true;
          position.value.value = reversePosition(
            position.value.value!.toString(),
          );
        }
      });
  }

  const newTooltipContentImport = findImportDeclaration(
    'TooltipContent',
    '@wanteddev/wds',
    j,
    root,
  );

  if (newTooltipContentImport) {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: getLocalName(newTooltipContentImport) },
        },
      })
      .forEach((node) => {
        const attributes = node.value.openingElement.attributes;

        if (!attributes) return;

        const position = attributes.find(
          (attr) =>
            attr.type === 'JSXAttribute' && attr.name.name === 'position',
        ) as JSXAttribute | undefined;

        if (!position) {
          hasChanges = true;
          attributes.push(
            j.jsxAttribute(
              j.jsxIdentifier('position'),
              j.literal('bottom-center'),
            ),
          );
        } else if (
          position.value?.type === 'StringLiteral' ||
          position.value?.type === 'Literal'
        ) {
          hasChanges = true;
          position.value.value = reversePosition(
            position.value.value!.toString(),
          );
        }
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
