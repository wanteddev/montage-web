import { findImportDeclaration } from './helpers';

import type {
  API,
  ConditionalExpression,
  FileInfo,
  JSXAttribute,
  JSXExpressionContainer,
  Literal,
  ObjectExpression,
  ObjectProperty,
  Options,
  Property,
  StringLiteral,
} from 'jscodeshift';

export const convertPropertyValue = (
  property:
    | Property
    | Literal
    | JSXExpressionContainer
    | ObjectExpression
    | ConditionalExpression
    | JSXAttribute
    | ObjectProperty
    | StringLiteral
    | undefined,
  name: string,
  convert: (v: string) => string,
) => {
  if (!property) {
    return;
  }

  if (
    property.type === 'JSXAttribute' &&
    (property.name.name === name ||
      ['xs', 'sm', 'md', 'lg', 'xl'].includes(property.name.name.toString()))
  ) {
    // @ts-expect-error
    return convertPropertyValue(property.value, name, convert);
  }

  if (property.type === 'Literal' || property.type === 'StringLiteral') {
    property.value = convert(property.value?.toString() ?? '');
    return property;
  }

  if (property.type === 'ConditionalExpression') {
    if (
      (property.consequent.type === 'Literal' ||
        property.consequent.type === 'StringLiteral') &&
      property.consequent.value?.toString()
    ) {
      property.consequent.value = convert(property.consequent.value.toString());
    }

    if (
      (property.alternate.type === 'Literal' ||
        property.alternate.type === 'StringLiteral') &&
      property.alternate.value?.toString()
    ) {
      property.alternate.value = convert(property.alternate.value.toString());
    }

    return property;
  }

  if (
    property.type === 'JSXExpressionContainer' &&
    property.expression.type === 'ObjectExpression'
  ) {
    return property.expression.properties.forEach((v) =>
      convertPropertyValue(v as Property, name, convert),
    );
  }

  if (
    (property.type === 'Property' || property.type === 'ObjectProperty') &&
    ((property.key.type === 'Identifier' &&
      (property.key.name === name ||
        ['xs', 'sm', 'md', 'lg', 'xl'].includes(
          property.key.name.toString(),
        ))) ||
      (property.key.type === 'Literal' &&
        (property.key.value === name ||
          ['xs', 'sm', 'md', 'lg', 'xl'].includes(
            property.key.value?.toString() ?? '',
          ))))
  ) {
    // @ts-expect-error
    return convertPropertyValue(property.value, name, convert);
  }

  if (property.type === 'ObjectExpression') {
    return property.properties.forEach((v) =>
      convertPropertyValue(v as Property, name, convert),
    );
  }

  if (
    property.type === 'JSXExpressionContainer' &&
    property.expression.type === 'ConditionalExpression'
  ) {
    if (property.expression.consequent.type === 'ObjectExpression') {
      property.expression.consequent.properties.forEach((v) =>
        // @ts-expect-error
        convertPropertyValue(v, name, convert),
      );
    }

    if (property.expression.alternate.type === 'ObjectExpression') {
      property.expression.alternate.properties.forEach((v) =>
        // @ts-expect-error
        convertPropertyValue(v, name, convert),
      );
    }

    if (
      (property.expression.consequent.type === 'Literal' ||
        property.expression.consequent.type === 'StringLiteral') &&
      property.expression.consequent.value?.toString()
    ) {
      property.expression.consequent.value = convert(
        property.expression.consequent.value.toString(),
      );
    }

    if (
      (property.expression.alternate.type === 'Literal' ||
        property.expression.alternate.type === 'StringLiteral') &&
      property.expression.alternate.value?.toString()
    ) {
      property.expression.alternate.value = convert(
        property.expression.alternate.value.toString(),
      );
    }

    return property;
  }
};

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

  if (wdsImport.length < 0) {
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
        name: { name: typographyImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: cardTitleImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: cardCaptionImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: emptyStateTextImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: formLabelImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: formMessageImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: formErrorMessageImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: labelImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: autocompleteOptionImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
          convertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
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
          convertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTypographyVariant,
          ),
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
        name: { name: modalHeadingImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: modalSummaryImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: modalDescriptionImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: tableCellImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: tableHeadCellImport.imported.name },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          convertPropertyValue(
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
        name: { name: listCellImport.imported.name },
      })
      .forEach((comp) => {
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        convertPropertyValue(textProps, 'variant', convertTypographyVariant);
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
        callee: { name: typographyStyleImport.imported.name },
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
