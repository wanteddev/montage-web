import { findImportDeclaration, getLocalName } from '../../helpers';

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

  const sectionMessageImport = findImportDeclaration(
    'SectionMessage',
    '@wanteddev/wds',
    j,
    root,
  );

  if (sectionMessageImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(sectionMessageImport) },
      })
      .forEach((target) => {
        const showAttribute = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'show',
        );

        if (showAttribute) {
          hasChanges = true;

          showAttribute.name.name = 'open';
        }

        const onShowChangeAttribute = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'onShowChange',
        );

        if (onShowChangeAttribute) {
          hasChanges = true;

          onShowChangeAttribute.name.name = 'onOpenChange';
        }

        const defaultShowAttribute = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'defaultShow',
        );

        if (defaultShowAttribute) {
          hasChanges = true;

          defaultShowAttribute.name.name = 'defaultOpen';
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
