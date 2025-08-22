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

  const targets = [
    'AccordionSummary',
    'ActionAreaButton',
    'AutocompleteOption',
    'Button',
    'CardThumbnail',
    'CardList',
    'ChipAction',
    'ChipFilter',
    'ContentBadge',
    'DatePicker',
    'EmptyStateButton',
    'ListCell',
    'MenuItem',
    'MenuBottom',
    'MenuActionArea',
    'ModalNavigation',
    'PaginationField',
    'PaginationInput',
    'Select',
    'Option',
    'SelectMultiple',
    'SectionHeader',
    'SegmentedControlItem',
    'TextArea',
    'PickerActionAreaButton',
    'TextField',
    'TextButton',
    'TextInput',
    'TimePicker',
    'TopNavigation',
    'DialogButton',
  ];

  const targetImports = targets.map((target) =>
    findImportDeclaration(target, '@wanteddev/wds', j, root),
  );

  for (const targetImport of targetImports) {
    if (!targetImport) continue;

    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(targetImport) },
      })
      .forEach((target) => {
        const leftContentAttr = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'leftContent',
        );

        if (leftContentAttr) {
          hasChanges = true;

          if (
            target.value.name.type === 'JSXIdentifier' &&
            targetImport.imported.name === 'SectionHeader'
          ) {
            leftContentAttr.name.name = 'headingContent';
          } else {
            leftContentAttr.name.name = 'leadingContent';
          }
        }

        const rightContentAttr = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'rightContent',
        );

        if (rightContentAttr) {
          hasChanges = true;

          rightContentAttr.name.name = 'trailingContent';
        }
      });
  }

  const iconButtonTargets = ['CategoryList', 'TabList'];

  const iconButtonTargetImports = iconButtonTargets.map((target) =>
    findImportDeclaration(target, '@wanteddev/wds', j, root),
  );

  for (const targetImport of iconButtonTargetImports) {
    if (!targetImport) continue;

    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(targetImport) },
      })
      .forEach((target) => {
        const rightContentAttr = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'rightContent',
        );

        if (rightContentAttr) {
          hasChanges = true;

          rightContentAttr.name.name = 'iconButton';
        }
      });
  }

  const cardListSkeletonImports = findImportDeclaration(
    'CardListSkeleton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (cardListSkeletonImports) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: getLocalName(cardListSkeletonImports) },
      })
      .forEach((target) => {
        const leftContentAttr = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'hasLeftContent',
        );

        if (leftContentAttr) {
          hasChanges = true;

          leftContentAttr.name.name = 'hasLeadingContent';
        }

        const rightContentAttr = target.value.attributes?.find(
          (v): v is JSXAttribute =>
            v.type === 'JSXAttribute' && v.name.name === 'hasRightContent',
        );

        if (rightContentAttr) {
          hasChanges = true;

          rightContentAttr.name.name = 'hasTrailingContent';
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
