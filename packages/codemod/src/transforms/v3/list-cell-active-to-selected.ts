import { findImportDeclaration, getLocalName } from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

import type { API, FileInfo, JSXAttribute, Options } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const montageImport = root
    .find(j.ImportDeclaration)
    .filter((path) =>
      MONTAGE_SOURCES.includes(path.node.source.value as string),
    );

  if (montageImport.length < 1) {
    return file.source;
  }

  const targetImports = [
    findImportDeclaration('ListCell', MONTAGE_SOURCES, j, root),
    findImportDeclaration('MenuItem', MONTAGE_SOURCES, j, root),
    findImportDeclaration('AutocompleteOption', MONTAGE_SOURCES, j, root),
    findImportDeclaration('Option', MONTAGE_SOURCES, j, root),
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
