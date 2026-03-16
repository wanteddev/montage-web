import { findImportDeclaration, getImportedName } from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

import type { API, FileInfo, Options } from 'jscodeshift';

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

  // nested-checkbox -> check-mark
  const nestedCheckboxImport = findImportDeclaration(
    'NestedCheckbox',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (nestedCheckboxImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(nestedCheckboxImport) })
      .forEach((nestedCheckbox) => {
        nestedCheckbox.value.name = 'CheckMark';
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
