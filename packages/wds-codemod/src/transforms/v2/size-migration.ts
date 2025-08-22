import {
  deepConvertPropertyValue,
  findImportDeclaration,
  getLocalName,
} from '../../helpers';

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

  const targetImports = [
    findImportDeclaration('TopNavigationButton', '@wanteddev/wds', j, root),
    findImportDeclaration('ModalNavigationButton', '@wanteddev/wds', j, root),
    findImportDeclaration('Switch', '@wanteddev/wds', j, root),
    findImportDeclaration('ScrollArea', '@wanteddev/wds', j, root),
    findImportDeclaration('RoundCheckbox', '@wanteddev/wds', j, root),
    findImportDeclaration('RadioGroupItem', '@wanteddev/wds', j, root),
    findImportDeclaration('Radio', '@wanteddev/wds', j, root),
    findImportDeclaration('PaginationDot', '@wanteddev/wds', j, root),
    findImportDeclaration('PaginationCounter', '@wanteddev/wds', j, root),
    findImportDeclaration('IconButton', '@wanteddev/wds', j, root),
    findImportDeclaration('ChipFilter', '@wanteddev/wds', j, root),
    findImportDeclaration('ChipAction', '@wanteddev/wds', j, root),
    findImportDeclaration('Checkbox', '@wanteddev/wds', j, root),
    findImportDeclaration('CheckMark', '@wanteddev/wds', j, root),
    findImportDeclaration('NestedCheckbox', '@wanteddev/wds', j, root),
  ];

  for (const targetImport of targetImports) {
    if (!targetImport) continue;

    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(targetImport) },
      })
      .forEach((target) => {
        target.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(attr as JSXAttribute, 'size', (value) => {
            if (value === 'normal') {
              hasChanges = true;
              return 'medium';
            }

            return value;
          }),
        );
      });
  }

  const tabImport = findImportDeclaration('TabList', '@wanteddev/wds', j, root);

  if (tabImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(tabImport) },
      })
      .forEach((target) => {
        target.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(attr as JSXAttribute, 'resize', (value) => {
            if (value === 'normal') {
              hasChanges = true;
              return 'hug';
            }

            return value;
          }),
        );
      });
  }

  const listCellImports = [
    findImportDeclaration('ListCell', '@wanteddev/wds', j, root),
    findImportDeclaration('AutocompleteOption', '@wanteddev/wds', j, root),
    findImportDeclaration('AccordionSummary', '@wanteddev/wds', j, root),
    findImportDeclaration('MenuItem', '@wanteddev/wds', j, root),
    findImportDeclaration('Option', '@wanteddev/wds', j, root),
  ];

  for (const targetImport of listCellImports) {
    if (!targetImport) continue;

    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(targetImport) },
      })
      .forEach((target) => {
        target.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(
            attr as JSXAttribute,
            'verticalPadding',
            (value) => {
              if (value === '0px') {
                hasChanges = true;
                return 'none';
              } else if (value === '12px') {
                hasChanges = true;
                return 'medium';
              } else if (value === '16px') {
                hasChanges = true;
                return 'large';
              } else if (value === '8px') {
                hasChanges = true;
                return 'small';
              }

              return value;
            },
          ),
        );
      });
  }

  const modalContainerImport = findImportDeclaration(
    'ModalContainer',
    '@wanteddev/wds',
    j,
    root,
  );

  if (modalContainerImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(modalContainerImport) },
      })
      .forEach((target) => {
        target.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(attr as JSXAttribute, 'size', (value) => {
            if (value === 'normal') {
              hasChanges = true;
              return 'medium';
            } else if (value === 'medium') {
              hasChanges = true;
              return 'large';
            } else if (value === 'large') {
              hasChanges = true;
              return 'xlarge';
            }

            return value;
          }),
        );
      });
  }

  const contentBadgeImport = findImportDeclaration(
    'ContentBadge',
    '@wanteddev/wds',
    j,
    root,
  );

  if (contentBadgeImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(contentBadgeImport) },
      })
      .forEach((target) => {
        target.value.attributes?.forEach((attr) =>
          deepConvertPropertyValue(attr as JSXAttribute, 'size', (value) => {
            if (value === 'normal') {
              hasChanges = true;
              return 'xsmall';
            } else if (value === 'medium') {
              hasChanges = true;
              return 'small';
            } else if (value === 'large') {
              hasChanges = true;
              return 'medium';
            }

            return value;
          }),
        );
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
