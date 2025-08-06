import { deepConvertPropertyValue, findImportDeclaration } from '../../helpers';

import type {
  API,
  ASTPath,
  FileInfo,
  JSXAttribute,
  JSXExpressionContainer,
  MemberExpression,
  Options,
} from 'jscodeshift';

const atomicKey = [
  'blue',
  'common',
  'coolNeutral',
  'cyan',
  'green',
  'lightBlue',
  'lime',
  'neutral',
  'orange',
  'pink',
  'purple',
  'red',
  'redOrange',
  'violet',
];

const semanticKey = [
  'platform',
  'static',
  'primary',
  'label',
  'background',
  'interaction',
  'line',
  'status',
  'accent',
  'inverse',
  'fill',
  'material',
  'elevation',
];

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

  root
    .find(j.MemberExpression, {
      object: {
        object: {
          name: (name: string) => name === 'theme' || name === 'wdsTheme',
        },
        property: { name: 'palette' },
      },
    })
    .forEach((palette) => {
      const parent = palette.parent as ASTPath<MemberExpression> | undefined;

      if (
        parent &&
        parent.value.object.type === 'MemberExpression' &&
        parent.value.object.property.type === 'Identifier' &&
        palette.value.object.type === 'MemberExpression' &&
        palette.value.object.property.type === 'Identifier' &&
        palette.value.object.property.name === 'palette'
      ) {
        const originalName =
          palette.value.object.object.type === 'Identifier'
            ? palette.value.object.object.name
            : 'theme';

        if (atomicKey.includes(parent.value.object.property.name)) {
          palette.value.object.property.name = 'atomic';
          hasChanges = true;
        } else if (semanticKey.includes(parent.value.object.property.name)) {
          hasChanges = true;
          if (parent.value.object.property.name === 'accent') {
            palette.value.object = j.memberExpression(
              j.memberExpression(
                j.identifier(originalName),
                j.identifier('semantic'),
              ),
              j.identifier('accent'),
            );
            parent.value.object.property.name = 'background';
          } else {
            palette.value.object.property.name = 'semantic';
          }
        }
      }
    });

  root
    .find(j.MemberExpression, {
      object: {
        object: {
          name: (name: string) => name === 'theme' || name === 'wdsTheme',
        },
        property: { name: 'platform' },
      },
    })
    .forEach((palette) => {
      const parent = palette.parent as ASTPath<MemberExpression> | undefined;

      if (
        parent &&
        parent.value.object.type === 'MemberExpression' &&
        parent.value.object.property.type === 'Identifier' &&
        palette.value.object.type === 'MemberExpression' &&
        palette.value.object.property.type === 'Identifier' &&
        palette.value.object.property.name === 'platform'
      ) {
        const prevProperty = palette.value.property;
        const prevObjectProperty = palette.value.object.property;
        palette.value.object.property = j.identifier('semantic');
        palette.value.property = prevObjectProperty;
        parent.value.object = j.memberExpression(palette.value, prevProperty);
        hasChanges = true;
      }
    });

  const typographyImport = findImportDeclaration(
    'Typography',
    '@wanteddev/wds',
    j,
    root,
  );

  const convertColorPalette = (isContentBadge?: boolean) => (v: string) => {
    if (
      v.startsWith('palette.') &&
      !v.includes('semantic') &&
      v.includes('accent')
    ) {
      hasChanges = true;
      if (isContentBadge) {
        return v.replace('palette.accent', 'semantic.accent.foreground');
      }

      return v.replace('palette.accent', 'semantic.accent.background');
    }

    if (
      v.startsWith('palette.') &&
      atomicKey.includes(v.replace('palette.', '').split('.')[0] ?? '')
    ) {
      hasChanges = true;
      return v.replace('palette.', 'atomic.');
    }

    if (
      v.startsWith('palette.') &&
      semanticKey.includes(v.replace('palette.', '').split('.')[0] ?? '')
    ) {
      hasChanges = true;
      return v.replace('palette.', 'semantic.');
    }

    return v;
  };

  if (typographyImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: typographyImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const cardTitleImport = findImportDeclaration(
    'CardTitle',
    '@wanteddev/wds',
    j,
    root,
  );

  if (cardTitleImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: cardTitleImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const cardCaptionImport = findImportDeclaration(
    'CardCaption',
    '@wanteddev/wds',
    j,
    root,
  );

  if (cardCaptionImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: cardCaptionImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const emptyStateTextImport = findImportDeclaration(
    'EmptyStateText',
    '@wanteddev/wds',
    j,
    root,
  );

  if (emptyStateTextImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: emptyStateTextImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const formLabelImport = findImportDeclaration(
    'FormLabel',
    '@wanteddev/wds',
    j,
    root,
  );

  if (formLabelImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: formLabelImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const formMessageImport = findImportDeclaration(
    'FormMessage',
    '@wanteddev/wds',
    j,
    root,
  );

  if (formMessageImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: formMessageImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const formErrorMessageImport = findImportDeclaration(
    'FormErrorMessage',
    '@wanteddev/wds',
    j,
    root,
  );

  if (formErrorMessageImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: formErrorMessageImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const labelImport = findImportDeclaration('Label', '@wanteddev/wds', j, root);

  if (labelImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: labelImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const autocompleteOptionImport = findImportDeclaration(
    'AutocompleteOption',
    '@wanteddev/wds',
    j,
    root,
  );

  if (autocompleteOptionImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: autocompleteOptionImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const menuItemImport = findImportDeclaration(
    'MenuItem',
    '@wanteddev/wds',
    j,
    root,
  );

  if (menuItemImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: menuItemImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const optionImport = findImportDeclaration(
    'Option',
    '@wanteddev/wds',
    j,
    root,
  );

  if (optionImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: optionImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const getColorByTokenImport = findImportDeclaration(
    'getColorByToken',
    '@wanteddev/wds',
    j,
    root,
  );

  if (getColorByTokenImport) {
    root
      .find(j.CallExpression, {
        callee: { name: getColorByTokenImport.imported.name },
      })
      .forEach((comp) => {
        j(comp)
          .find(j.Literal)
          .forEach((str) => {
            str.value.value = convertColorPalette()(str.value.value as string);
          });
        j(comp)
          .find(j.StringLiteral)
          .forEach((str) => {
            str.value.value = convertColorPalette()(str.value.value);
          });
      });
  }

  const modalHeadingImport = findImportDeclaration(
    'ModalHeading',
    '@wanteddev/wds',
    j,
    root,
  );

  if (modalHeadingImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: modalHeadingImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const modalSummaryImport = findImportDeclaration(
    'ModalSummary',
    '@wanteddev/wds',
    j,
    root,
  );

  if (modalSummaryImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: modalSummaryImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const modalDescriptionImport = findImportDeclaration(
    'ModalDescription',
    '@wanteddev/wds',
    j,
    root,
  );

  if (modalDescriptionImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: modalDescriptionImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const tableCellImport = findImportDeclaration(
    'TableCell',
    '@wanteddev/wds',
    j,
    root,
  );

  if (tableCellImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: tableCellImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const tableHeadCellImport = findImportDeclaration(
    'TableHeadCell',
    '@wanteddev/wds',
    j,
    root,
  );

  if (tableHeadCellImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: tableHeadCellImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const withInteractionImport = findImportDeclaration(
    'WithInteraction',
    '@wanteddev/wds',
    j,
    root,
  );

  if (withInteractionImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: withInteractionImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const skeletonImport = findImportDeclaration(
    'Skeleton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (skeletonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: skeletonImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const textInputContentImport = findImportDeclaration(
    'TextInputContent',
    '@wanteddev/wds',
    j,
    root,
  );

  if (textInputContentImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: textInputContentImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const toggleIconImport = findImportDeclaration(
    'ToggleIcon',
    '@wanteddev/wds',
    j,
    root,
  );

  if (toggleIconImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: toggleIconImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'activeColor',
            convertColorPalette(),
          ),
        );
      });
  }

  const textFieldContentImport = findImportDeclaration(
    'TextFieldContent',
    '@wanteddev/wds',
    j,
    root,
  );

  if (textFieldContentImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: textFieldContentImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
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
        name: { name: contentBadgeImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'accentColor',
            convertColorPalette(true),
          ),
        );
      });
  }

  const dividerImport = findImportDeclaration(
    'Divider',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dividerImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: dividerImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const sectionHeaderImport = findImportDeclaration(
    'SectionHeader',
    '@wanteddev/wds',
    j,
    root,
  );

  if (sectionHeaderImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: sectionHeaderImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          ),
        );
      });
  }

  const iconButtonImport = findImportDeclaration(
    'IconButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (iconButtonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: iconButtonImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) => {
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'color',
            convertColorPalette(),
          );

          deepConvertPropertyValue(
            attr as JSXAttribute,
            'interactionColor',
            convertColorPalette(),
          );
        });
      });
  }

  const listCellImport = findImportDeclaration(
    'ListCell',
    '@wanteddev/wds',
    j,
    root,
  );

  if (listCellImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: listCellImport.imported.name },
      })
      .forEach((comp) => {
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        deepConvertPropertyValue(textProps, 'color', convertColorPalette());
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
