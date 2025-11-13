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

  // empty-state -> fallback-view
  const emptyStateImport = findImportDeclaration(
    'EmptyState',
    '@wanteddev/wds',
    j,
    root,
  );

  if (emptyStateImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(emptyStateImport) })
      .forEach((emptyState) => {
        emptyState.value.name = 'FallbackView';
      });
  }

  // empty-state-image -> fallback-view-image
  const emptyStateImageImport = findImportDeclaration(
    'EmptyStateImage',
    '@wanteddev/wds',
    j,
    root,
  );

  if (emptyStateImageImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(emptyStateImageImport) })
      .forEach((emptyStateImage) => {
        emptyStateImage.value.name = 'FallbackViewImage';
      });
  }

  // empty-state-content -> fallback-view-content
  const emptyStateContentImport = findImportDeclaration(
    'EmptyStateContent',
    '@wanteddev/wds',
    j,
    root,
  );

  if (emptyStateContentImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(emptyStateContentImport) })
      .forEach((emptyStateContent) => {
        emptyStateContent.value.name = 'FallbackViewContent';
      });
  }

  // empty-state-text -> fallback-view-text
  const emptyStateTextImport = findImportDeclaration(
    'EmptyStateText',
    '@wanteddev/wds',
    j,
    root,
  );

  if (emptyStateTextImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(emptyStateTextImport) })
      .forEach((emptyStateText) => {
        emptyStateText.value.name = 'FallbackViewText';
      });
  }

  // empty-state-button -> fallback-view-button
  const emptyStateButtonImport = findImportDeclaration(
    'EmptyStateButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (emptyStateButtonImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(emptyStateButtonImport) })
      .forEach((emptyStateButton) => {
        emptyStateButton.value.name = 'FallbackViewButton';
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
