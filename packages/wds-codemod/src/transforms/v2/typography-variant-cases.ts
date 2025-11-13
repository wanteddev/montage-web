import {
  deepConvertPropertyValue,
  findImportDeclaration,
  getLocalName,
} from '../../helpers';

import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXExpressionContainer,
  Options,
} from 'jscodeshift';

const convertTypographyVariant = (value: string) => {
  if (value.includes('_normal')) {
    return value.replaceAll('_normal', '');
  }

  return value.replaceAll('_', '-');
};

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  const wdsImport = root.find(j.ImportDeclaration, {
    source: { value: '@wanteddev/wds' },
  });

  if (wdsImport.length < 1) {
    return file.source;
  }

  const typographyImport = findImportDeclaration(
    'Typography',
    '@wanteddev/wds',
    j,
    root,
  );

  if (typographyImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(typographyImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(cardTitleImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(cardCaptionImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(emptyStateTextImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(formLabelImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(formMessageImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(formErrorMessageImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
          ),
        );
      });
  }

  const labelImport = findImportDeclaration('Label', '@wanteddev/wds', j, root);

  if (labelImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(labelImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(autocompleteOptionImport) },
      })
      .forEach((comp) => {
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        deepConvertPropertyValue(
          textProps,
          'variant',
          convertTypographyVariant,
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
        name: { name: getLocalName(menuItemImport) },
      })
      .forEach((comp) => {
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        deepConvertPropertyValue(
          textProps,
          'variant',
          convertTypographyVariant,
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
        name: { name: getLocalName(optionImport) },
      })
      .forEach((comp) => {
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        deepConvertPropertyValue(
          textProps,
          'variant',
          convertTypographyVariant,
        );
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
        name: { name: getLocalName(modalHeadingImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(modalSummaryImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(modalDescriptionImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(tableCellImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
        name: { name: getLocalName(tableHeadCellImport) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
          ),
        );
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
        name: { name: getLocalName(listCellImport) },
      })
      .forEach((comp) => {
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        deepConvertPropertyValue(
          textProps,
          'variant',
          convertTypographyVariant,
        );
      });
  }

  const accordionSummaryImport = findImportDeclaration(
    'AccordionSummary',
    '@wanteddev/wds',
    j,
    root,
  );

  if (accordionSummaryImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: accordionSummaryImport.imported.name },
      })
      .forEach((comp) => {
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        deepConvertPropertyValue(
          textProps,
          'variant',
          convertTypographyVariant,
        );
      });
  }

  const typographyStyleImport = findImportDeclaration(
    'typographyStyle',
    '@wanteddev/wds',
    j,
    root,
  );

  if (typographyStyleImport) {
    root
      .find(j.CallExpression, {
        callee: { name: getLocalName(typographyStyleImport) },
      })
      .forEach((ce) => {
        const firstArgs = ce.value.arguments.at(0);

        if (firstArgs) {
          if (
            firstArgs.type === 'StringLiteral' ||
            firstArgs.type === 'Literal'
          ) {
            firstArgs.value = convertTypographyVariant(
              firstArgs.value?.toString() ?? '',
            );
          }

          if (firstArgs.type === 'ConditionalExpression') {
            if (
              firstArgs.consequent.type === 'StringLiteral' ||
              firstArgs.consequent.type === 'Literal'
            ) {
              firstArgs.consequent.value = convertTypographyVariant(
                firstArgs.consequent.value?.toString() ?? '',
              );
            }

            if (
              firstArgs.alternate.type === 'StringLiteral' ||
              firstArgs.alternate.type === 'Literal'
            ) {
              firstArgs.alternate.value = convertTypographyVariant(
                firstArgs.alternate.value?.toString() ?? '',
              );
            }
          }
        }
      });
  }

  return root.toSource(options);
};

export default transformer;
