import {
  deepConvertPropertyValue,
  findImportDeclaration,
  getLocalName,
} from '../../helpers';

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

  const buttonImport = findImportDeclaration(
    'Button',
    '@wanteddev/wds',
    j,
    root,
  );

  if (buttonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(buttonImport) },
      })
      .forEach((comp) => {
        deepConvertPropertyValue(
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'color',
          ),
          'color',
          (v) => {
            if (v === 'secondary') {
              hasChanges = true;
              return 'primary';
            }
            return v;
          },
        );
      });
  }

  const actionAreaButtonImport = findImportDeclaration(
    'ActionAreaButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (actionAreaButtonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(actionAreaButtonImport) },
      })
      .forEach((comp) => {
        deepConvertPropertyValue(
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'buttonColor',
          ),
          'buttonColor',
          (v) => {
            if (v === 'secondary') {
              hasChanges = true;
              return 'primary';
            }
            return v;
          },
        );
      });
  }

  const emptyStateButtonImport = findImportDeclaration(
    'EmptyStateButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (emptyStateButtonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(emptyStateButtonImport) },
      })
      .forEach((comp) => {
        deepConvertPropertyValue(
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'color',
          ),
          'color',
          (v) => {
            if (v === 'secondary') {
              hasChanges = true;
              return 'primary';
            }
            return v;
          },
        );
      });
  }

  const fallbackViewButtonImport = findImportDeclaration(
    'FallbackViewButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (fallbackViewButtonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(fallbackViewButtonImport) },
      })
      .forEach((comp) => {
        deepConvertPropertyValue(
          comp.value.attributes?.find(
            (v) => v.type === 'JSXAttribute' && v.name.name === 'color',
          ),
          'color',
          (v) => {
            if (v === 'secondary') {
              hasChanges = true;
              return 'primary';
            }
            return v;
          },
        );
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
