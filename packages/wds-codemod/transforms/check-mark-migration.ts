import { findImportDeclaration } from './helpers';

import type { API, FileInfo, Options } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  let hasChanges = false;

  const wdsImport = root.find(j.ImportDeclaration, {
    source: { value: '@wanteddev/wds' },
  });

  if (wdsImport.length < 0) {
    return file.source;
  }

  // nested-checkbox -> check-mark
  const nestedCheckboxImport = findImportDeclaration(
    'NestedCheckbox',
    '@wanteddev/wds',
    j,
    root,
  );
  const checkMarkImport = findImportDeclaration(
    'CheckMark',
    '@wanteddev/wds',
    j,
    root,
  );

  if (nestedCheckboxImport) {
    hasChanges = true;

    let checkMarkName: string;

    if (!checkMarkImport) {
      root
        .find(j.Identifier, { name: nestedCheckboxImport.imported.name })
        .forEach((textfield) => {
          textfield.value.name = 'CheckMark';
        });
      nestedCheckboxImport.imported = j.identifier('CheckMark');

      checkMarkName = 'CheckMark';
    } else {
      j(nestedCheckboxImport)
        .find(j.ImportSpecifier, {
          imported: {
            name: 'NestedCheckbox',
          },
        })
        .remove();

      checkMarkName = checkMarkImport.imported.name;
    }

    root
      .find(j.JSXOpeningElement, {
        name: { name: nestedCheckboxImport.imported.name },
      })
      .forEach((nestedCheckbox) => {
        if (nestedCheckbox.value.name.type === 'JSXIdentifier') {
          nestedCheckbox.value.name.name = checkMarkName;
        }
      });

    // figma.connect NESTED_CHECKBOX -> CHECK_MARK
    const figmaStringMappings = {
      ['<FIGMA_CONTROL_NESTED_CHECKBOX>']: '<FIGMA_CONTROL_CHECK_MARK>',
      ['<FIGMA_NESTED_CHECKBOX>']: '<FIGMA_CHECK_MARK>',
    };

    root
      .find(j.StringLiteral)
      .filter((path) => figmaStringMappings[path.value.value])
      .forEach((path) => {
        const oldValue = path.value.value;
        path.value.value = figmaStringMappings[oldValue];
        hasChanges = true;
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
