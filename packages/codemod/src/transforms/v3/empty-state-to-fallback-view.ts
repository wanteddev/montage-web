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

  // empty-state -> fallback-view
  const emptyStateImport = findImportDeclaration(
    'EmptyState',
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
