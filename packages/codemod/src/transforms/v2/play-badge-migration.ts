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

  // play-icon-badge -> play-badge
  const playIconBadgeImport = findImportDeclaration(
    'PlayIconBadge',
    '@wanteddev/wds',
    j,
    root,
  );

  if (playIconBadgeImport) {
    hasChanges = true;

    root
      .find(j.Identifier, { name: getImportedName(playIconBadgeImport) })
      .forEach((playIconBadge) => {
        playIconBadge.value.name = 'PlayBadge';
      });
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
