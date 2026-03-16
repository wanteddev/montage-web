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

  // chip-action -> chip
  const chipActionImport = findImportDeclaration(
    'ChipAction',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (chipActionImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(chipActionImport) })
      .forEach((element) => {
        element.value.name = 'Chip';
      });
  }

  // chip-filter -> filter-button
  const chipFilterImport = findImportDeclaration(
    'ChipFilter',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (chipFilterImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(chipFilterImport) })
      .forEach((element) => {
        element.value.name = 'FilterButton';
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
