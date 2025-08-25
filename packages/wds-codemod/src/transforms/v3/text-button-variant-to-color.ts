import { findImportDeclaration, getLocalName } from '../../helpers';

import type { API, FileInfo, JSXAttribute, Options } from 'jscodeshift';

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

  const textButtonImport = findImportDeclaration(
    'TextButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (textButtonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(textButtonImport) },
      })
      .forEach((target) => {
        const variantAttribute = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'variant',
        );

        if (variantAttribute) {
          hasChanges = true;

          variantAttribute.name.name = 'color';
        }
      });
  }

  const pickerActionAreaButtonImport = findImportDeclaration(
    'PickerActionAreaButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (pickerActionAreaButtonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(pickerActionAreaButtonImport) },
      })
      .forEach((target) => {
        const variantAttribute = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'buttonVariant',
        );

        if (variantAttribute) {
          hasChanges = true;

          variantAttribute.name.name = 'color';
        }
      });
  }

  const actionAreaButtonImport = findImportDeclaration(
    'ActionAreaButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (actionAreaButtonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(actionAreaButtonImport) },
      })
      .forEach((target) => {
        const variantAttribute = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'textButtonVariant',
        );

        if (variantAttribute) {
          hasChanges = true;

          variantAttribute.name.name = 'textButtonColor';
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
