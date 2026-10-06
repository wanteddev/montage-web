import figma from 'figma';

import {
  readListCell,
  renderDescriptionProp,
  renderElementProp,
} from './list-cell';

import type { ListCellSlotNames } from './list-cell';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

type RenderOptions = {
  /** Map the `Menu/Resource/Item/Cell` variants (`Variant`, `Vertical Padding`, `Disable`). */
  withMenuItemProps: boolean;
};

/**
 * Renders a ListCell based item (`MenuItem`, `Option`, `AutocompleteOption`)
 * from an item instance that wraps a nested `List Cell` layer named `Cell`.
 * Slot presets inside the cell are re-rendered with `names`, so the same Figma
 * preset becomes `MenuItemContent` in a menu and `OptionContent` in a select.
 */
export const renderListCellItem = (
  item: InstanceHandle,
  component: string,
  names: ListCellSlotNames,
  { withMenuItemProps }: RenderOptions,
) => {
  if (item.type === 'ERROR') {
    return { example: figma.tsx`<${component} />`, usedNames: [component] };
  }

  const cell = readListCell(item.findInstance('Cell'), names);
  const label = cell.label ?? '';

  let itemProps = '';
  if (withMenuItemProps) {
    const variant = item.getEnum('Variant', {
      Normal: undefined,
      Radio: 'radio',
      Checkbox: 'checkbox',
    });
    const verticalPadding = item.getEnum('Vertical Padding', {
      '8px': 'small',
      '12px': undefined,
    });
    const disabled = item.getBoolean('Disable');

    itemProps =
      (variant ? ` variant="${variant}"` : '') +
      (verticalPadding ? ` verticalPadding="${verticalPadding}"` : '') +
      (disabled ? ' disabled' : '');
  }

  const example = figma.tsx`<${component} value=${JSON.stringify(label)}${itemProps}${renderDescriptionProp(
    cell.description,
  )}${renderElementProp('leadingContent', cell.leadingContent)}${renderElementProp(
    'trailingContent',
    cell.trailingContent,
  )}${renderElementProp('labelTrailing', cell.labelTrailing)}${renderElementProp(
    'extraContent',
    cell.extraContent,
  )}>
  ${label}
</${component}>`;

  return { example, usedNames: [component, ...cell.usedNames] };
};

/** Builds a single named import statement from `@montage-ui/core`. */
export const coreImport = (names: Array<string>) =>
  `import { ${[...new Set(names)].sort().join(', ')} } from '@montage-ui/core';`;
