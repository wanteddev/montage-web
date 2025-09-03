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

  // dialog -> alert
  const dialogImport = findImportDeclaration(
    'Dialog',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dialogImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(dialogImport) })
      .forEach((element) => {
        element.value.name = 'Alert';
      });
  }

  // dialog-dimmer -> alert-dimmer
  const dialogDimmerImport = findImportDeclaration(
    'DialogDimmer',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dialogDimmerImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(dialogDimmerImport) })
      .forEach((element) => {
        element.value.name = 'AlertDimmer';
      });
  }

  // dialog-container -> alert-container
  const dialogContainerImport = findImportDeclaration(
    'DialogContainer',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dialogContainerImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(dialogContainerImport) })
      .forEach((element) => {
        element.value.name = 'AlertContainer';
      });
  }

  // dialog-content -> alert-content
  const dialogContentImport = findImportDeclaration(
    'DialogContent',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dialogContentImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(dialogContentImport) })
      .forEach((element) => {
        element.value.name = 'AlertContent';
      });
  }

  // dialog-heading -> alert-heading
  const dialogHeadingImport = findImportDeclaration(
    'DialogHeading',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dialogHeadingImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(dialogHeadingImport) })
      .forEach((element) => {
        element.value.name = 'AlertHeading';
      });
  }

  // dialog-description -> alert-description
  const dialogDescriptionImport = findImportDeclaration(
    'DialogDescription',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dialogDescriptionImport) {
    hasChanges = true;
    root
      .find(j.Identifier, { name: getImportedName(dialogDescriptionImport) })
      .forEach((element) => {
        element.value.name = 'AlertDescription';
      });
  }

  // dialog-action-area -> alert-action-area
  const dialogActionAreaImport = findImportDeclaration(
    'DialogActionArea',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dialogActionAreaImport) {
    hasChanges = true;
    root
      .find(j.Identifier, { name: getImportedName(dialogActionAreaImport) })
      .forEach((element) => {
        element.value.name = 'AlertActionArea';
      });
  }

  // dialog-button -> alert-action-area-button
  const dialogButtonImport = findImportDeclaration(
    'DialogButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dialogButtonImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(dialogButtonImport) })
      .forEach((dialogButton) => {
        dialogButton.value.name = 'AlertActionAreaButton';
      });
  }

  // dialog-button -> alert-action-area-button
  const dialogActionAreaButtonImport = findImportDeclaration(
    'DialogActionAreaButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (dialogActionAreaButtonImport) {
    hasChanges = true;

    root
      .find(j.Identifier, {
        name: getImportedName(dialogActionAreaButtonImport),
      })
      .forEach((dialogButton) => {
        dialogButton.value.name = 'AlertActionAreaButton';
      });
  }

  // use-dialog -> use-alert
  const useDialogImport = findImportDeclaration(
    'useDialog',
    '@wanteddev/wds',
    j,
    root,
  );

  if (useDialogImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(useDialogImport) })
      .forEach((element) => {
        element.value.name = 'useAlert';
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
