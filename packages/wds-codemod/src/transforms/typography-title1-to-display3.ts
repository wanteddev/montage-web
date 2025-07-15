import { deepConvertPropertyValue, findImportDeclaration } from '../helpers';

import type {
  API,
  Collection,
  FileInfo,
  JSXAttribute,
  JSXExpressionContainer,
  Options,
} from 'jscodeshift';

const convertTitle1ToDisplay3 = (value: string) => {
  if (value === 'title1') {
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
        name: { name: importDeclaration.imported.name },
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

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  const wdsImport = root.find(j.ImportDeclaration, {
    source: { value: '@wanteddev/wds' },
  });

  if (wdsImport.length < 0) {
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

        deepConvertPropertyValue(textProps, 'variant', convertTitle1ToDisplay3);
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
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        deepConvertPropertyValue(textProps, 'variant', convertTitle1ToDisplay3);
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
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        deepConvertPropertyValue(textProps, 'variant', convertTitle1ToDisplay3);
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
        const textProps = (
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'textProps',
          ) as JSXAttribute | undefined
        )?.value as JSXExpressionContainer;

        deepConvertPropertyValue(textProps, 'variant', convertTitle1ToDisplay3);
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

        deepConvertPropertyValue(textProps, 'variant', convertTitle1ToDisplay3);
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

  return root.toSource(options);
};

export default transformer;
