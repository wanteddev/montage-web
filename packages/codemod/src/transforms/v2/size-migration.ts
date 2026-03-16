import {
  deepConvertPropertyValue,
  findImportDeclaration,
  getLocalName,
} from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

import type { API, FileInfo, JSXAttribute, Options } from 'jscodeshift';

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

  const targetImports = [
    findImportDeclaration('TopNavigationButton', MONTAGE_SOURCES, j, root),
    findImportDeclaration('ModalNavigationButton', MONTAGE_SOURCES, j, root),
    findImportDeclaration('Switch', MONTAGE_SOURCES, j, root),
    findImportDeclaration('ScrollArea', MONTAGE_SOURCES, j, root),
    findImportDeclaration('RoundCheckbox', MONTAGE_SOURCES, j, root),
    findImportDeclaration('RadioGroupItem', MONTAGE_SOURCES, j, root),
    findImportDeclaration('Radio', MONTAGE_SOURCES, j, root),
    findImportDeclaration('PaginationDot', MONTAGE_SOURCES, j, root),
    findImportDeclaration('PaginationCounter', MONTAGE_SOURCES, j, root),
    findImportDeclaration('IconButton', MONTAGE_SOURCES, j, root),
    findImportDeclaration('ChipFilter', MONTAGE_SOURCES, j, root),
    findImportDeclaration('ChipAction', MONTAGE_SOURCES, j, root),
    findImportDeclaration('Checkbox', MONTAGE_SOURCES, j, root),
    findImportDeclaration('CheckMark', MONTAGE_SOURCES, j, root),
    findImportDeclaration('NestedCheckbox', MONTAGE_SOURCES, j, root),
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

  const tabImport = findImportDeclaration('TabList', MONTAGE_SOURCES, j, root);

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
    findImportDeclaration('ListCell', MONTAGE_SOURCES, j, root),
    findImportDeclaration('AutocompleteOption', MONTAGE_SOURCES, j, root),
    findImportDeclaration('AccordionSummary', MONTAGE_SOURCES, j, root),
    findImportDeclaration('MenuItem', MONTAGE_SOURCES, j, root),
    findImportDeclaration('Option', MONTAGE_SOURCES, j, root),
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
    MONTAGE_SOURCES,
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
    MONTAGE_SOURCES,
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
