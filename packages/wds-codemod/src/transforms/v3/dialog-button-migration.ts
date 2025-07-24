import { findImportDeclaration } from '../../helpers';

import type { API, FileInfo, Options } from 'jscodeshift';

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

  // dialog-button -> dialog-action-area-button
  const dialogButtonImport = findImportDeclaration(
    'DialogButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dialogButtonImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: dialogButtonImport.imported.name })
      .forEach((dialogButton) => {
        dialogButton.value.name = 'DialogActionAreaButton';
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
