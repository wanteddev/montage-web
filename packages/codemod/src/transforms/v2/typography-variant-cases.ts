import {
  deepConvertPropertyValue,
  findImportDeclaration,
  getLocalName,
} from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

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

  const montageImport = root
    .find(j.ImportDeclaration)
    .filter((path) =>
      MONTAGE_SOURCES.includes(path.node.source.value as string),
    );

  if (montageImport.length < 1) {
    return file.source;
  }

  const typographyImport = findImportDeclaration(
    'Typography',
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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

  const labelImport = findImportDeclaration('Label', MONTAGE_SOURCES, j, root);

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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
