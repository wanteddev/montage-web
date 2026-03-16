import {
  findImportDeclaration,
  getImportedName,
  getLocalName,
} from '../../helpers';
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

  const selectImport = findImportDeclaration(
    'Select',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (selectImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(selectImport) },
      })
      .forEach((target) => {
        const enableMenuBottomAttr = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'enableMenuBottom',
        );

        if (enableMenuBottomAttr) {
          hasChanges = true;

          enableMenuBottomAttr.name.name = 'enableMenuActionArea';
        }
      });
  }

  const selectMultipleImport = findImportDeclaration(
    'SelectMultiple',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (selectMultipleImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(selectMultipleImport) },
      })
      .forEach((target) => {
        const enableMenuBottomAttr = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'enableMenuBottom',
        );

        if (enableMenuBottomAttr) {
          hasChanges = true;

          enableMenuBottomAttr.name.name = 'enableMenuActionArea';
        }
      });
  }

  const menuBottomImport = findImportDeclaration(
    'MenuBottom',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (menuBottomImport) {
    root
      .find(j.Identifier, { name: getImportedName(menuBottomImport) })
      .forEach((target) => {
        target.value.name = 'MenuActionArea';
      });
    menuBottomImport.imported = j.identifier('MenuActionArea');
    hasChanges = true;
  }

  const menuBottomContentImport = findImportDeclaration(
    'MenuBottomContent',
    MONTAGE_SOURCES,
    j,
    root,
  );
  if (menuBottomContentImport) {
    root
      .find(j.Identifier, { name: getImportedName(menuBottomContentImport) })
      .forEach((target) => {
        target.value.name = 'MenuActionAreaContent';
      });
    menuBottomContentImport.imported = j.identifier('MenuActionAreaContent');
    hasChanges = true;
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
