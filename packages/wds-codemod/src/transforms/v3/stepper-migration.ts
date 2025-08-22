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

  // progress-tracker -> stepper
  const progressTrackerImport = findImportDeclaration(
    'ProgressTracker',
    '@wanteddev/wds',
    j,
    root,
  );

  if (progressTrackerImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: progressTrackerImport.imported.name })
      .forEach((progressTracker) => {
        progressTracker.value.name = 'Stepper';
      });
  }

  // progress-tracker-item -> stepper-item
  const progressTrackerItemImport = findImportDeclaration(
    'ProgressTrackerItem',
    '@wanteddev/wds',
    j,
    root,
  );

  if (progressTrackerItemImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: progressTrackerItemImport.imported.name })
      .forEach((progressTrackerItem) => {
        progressTrackerItem.value.name = 'StepperItem';
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
