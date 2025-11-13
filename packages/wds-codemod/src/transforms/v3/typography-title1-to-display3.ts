import {
  deepConvertPropertyValue,
  findImportDeclaration,
  getLocalName,
} from '../../helpers';

import type {
  API,
  Collection,
  FileInfo,
  JSXAttribute,
  JSXExpressionContainer,
  Options,
} from 'jscodeshift';

let hasChanges = false;

const convertTitle1ToDisplay3 = (value: string) => {
  if (value === 'title1') {
    hasChanges = true;
    return 'display3';
  }

  return value;
};

const changeTypographyVariant = (
  componentName: string,
  j: API['jscodeshift'],
  root: Collection<any>,
) => {
  const importDeclaration = findImportDeclaration(
    componentName,
    '@wanteddev/wds',
    j,
    root,
  );

  if (importDeclaration) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(importDeclaration) },
      })
      .forEach((comp) => {
        comp.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'variant',
            convertTitle1ToDisplay3,
          ),
        );
      });
  }
};

const changeTextPropsTypographyVariant = (
  componentName: string,
  j: API['jscodeshift'],
  root: Collection<any>,
) => {
  const importDeclaration = findImportDeclaration(
    componentName,
    '@wanteddev/wds',
    j,
    root,
  );

  if (importDeclaration) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(importDeclaration) },
      })
      .forEach((comp) => {
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        deepConvertPropertyValue(textProps, 'variant', convertTitle1ToDisplay3);
      });
  }
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

  const componentList = [
    'Typography',
    'ToastContent',
    'AccordionDescription',
    'CardTitle',
    'CardCaption',
    'EmptyStateText',
    'FallbackViewText',
    'FormLabel',
    'FormMessage',
    'FormErrorMessage',
    'Label',
    'ModalHeading',
    'ModalSummary',
    'ModalDescription',
    'TableCell',
    'TableHeadCell',
    'SnackbarHeading',
    'SnackbarDescription',
    'DialogHeading',
    'DialogDescription',
  ];

  componentList.forEach((componentName) => {
    changeTypographyVariant(componentName, j, root);
  });

  const textPropsComponentList = [
    'ListCell',
    'MenuItem',
    'Option',
    'AutocompleteOption',
    'AccordionSummary',
  ];

  textPropsComponentList.forEach((componentName) => {
    changeTextPropsTypographyVariant(componentName, j, root);
  });

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
            firstArgs.value = convertTitle1ToDisplay3(
              firstArgs.value?.toString() ?? '',
            );
          }

          if (firstArgs.type === 'ConditionalExpression') {
            if (
              firstArgs.consequent.type === 'StringLiteral' ||
              firstArgs.consequent.type === 'Literal'
            ) {
              firstArgs.consequent.value = convertTitle1ToDisplay3(
                firstArgs.consequent.value?.toString() ?? '',
              );
            }

            if (
              firstArgs.alternate.type === 'StringLiteral' ||
              firstArgs.alternate.type === 'Literal'
            ) {
              firstArgs.alternate.value = convertTitle1ToDisplay3(
                firstArgs.alternate.value?.toString() ?? '',
              );
            }
          }
        }
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
