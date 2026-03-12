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

  const targetImports = [
    findImportDeclaration('ListCell', '@wanteddev/wds', j, root),
    findImportDeclaration('MenuItem', '@wanteddev/wds', j, root),
    findImportDeclaration('AutocompleteOption', '@wanteddev/wds', j, root),
    findImportDeclaration('Option', '@wanteddev/wds', j, root),
  ];

  for (const targetImport of targetImports) {
    if (!targetImport) continue;

    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(targetImport) },
      })
      .forEach((target) => {
        const activeAttribute = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'active',
        );

        if (activeAttribute) {
          hasChanges = true;

          activeAttribute.name.name = 'selected';
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
