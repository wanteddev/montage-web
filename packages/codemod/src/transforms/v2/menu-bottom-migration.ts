import {
  findImportDeclaration,
  getImportedName,
  getLocalName,
} from '../../helpers';

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

  const selectImport = findImportDeclaration(
    'Select',
    '@wanteddev/wds',
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
    '@wanteddev/wds',
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
    '@wanteddev/wds',
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
    '@wanteddev/wds',
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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
