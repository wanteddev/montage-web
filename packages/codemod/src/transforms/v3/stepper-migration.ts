import { findImportDeclaration, getImportedName } from '../../helpers';

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

  // progress-tracker-desktop -> stepper
  const progressTrackerDesktopImport = findImportDeclaration(
    'ProgressTrackerDesktop',
    '@wanteddev/wds',
    j,
    root,
  );

  if (progressTrackerDesktopImport) {
    hasChanges = true;

    root
      .find(j.Identifier, {
        name: getImportedName(progressTrackerDesktopImport),
      })
      .forEach((progressTrackerDesktop) => {
        progressTrackerDesktop.value.name = 'Stepper';
      });
  }

  // progress-tracker-desktop-item -> stepper-item
  const progressTrackerDesktopItemImport = findImportDeclaration(
    'ProgressTrackerDesktopItem',
    '@wanteddev/wds',
    j,
    root,
  );

  if (progressTrackerDesktopItemImport) {
    hasChanges = true;

    root
      .find(j.Identifier, {
        name: getImportedName(progressTrackerDesktopItemImport),
      })
      .forEach((progressTrackerDesktopItem) => {
        progressTrackerDesktopItem.value.name = 'StepperItem';
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
