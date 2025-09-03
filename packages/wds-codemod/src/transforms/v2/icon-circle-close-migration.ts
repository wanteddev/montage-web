import { findImportDeclaration, getImportedName } from '../../helpers';

import type { API, FileInfo, Options } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);

  let hasChanges = false;

  const wdsIconImport = root.find(j.ImportDeclaration, {
    source: { value: '@wanteddev/wds-icon' },
  });

  if (wdsIconImport.length < 1) {
    return file.source;
  }

  // icon-circle-close -> icon-circle-close-fill
  const iconCircleCloseImport = findImportDeclaration(
    'IconCircleClose',
    '@wanteddev/wds-icon',
    j,
    root,
  );

  if (iconCircleCloseImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(iconCircleCloseImport) })
      .forEach((iconCircleClose) => {
        iconCircleClose.value.name = 'IconCircleCloseFill';
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
