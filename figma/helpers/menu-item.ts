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

  // Radio / checkbox items render their own control in the leading area (core
  // `MenuItem` variant), so the Radio / Checkbox preset in the Figma slot is skipped.
  const variant = withMenuItemProps
    ? item.getEnum('Variant', {
        Normal: undefined,
        Radio: 'radio',
        Checkbox: 'checkbox',
      })
    : undefined;
  const cell = readListCell(item.findInstance('Cell'), names, {
    skipLeading: variant === 'radio' || variant === 'checkbox',
  });
  const label = cell.label ?? '';

  let itemProps = '';
  if (withMenuItemProps) {
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

/**
 * Builds the import statements for a snippet: plain names are merged into one
 * `@montage-ui/core` import, and full `import …` statements (nested imports
 * collected by the list-cell helpers) are appended as-is.
 */
export const coreImport = (names: Array<string>) => {
  const core = new Set<string>();
  const statements = new Set<string>();
  for (const entry of names) {
    if (!entry.startsWith('import ')) {
      core.add(entry);
      continue;
    }
    // Fold `@montage-ui/core` statements into the single core import.
    const match = /^import \{([^}]*)\} from ['"]@montage-ui\/core['"];?$/.exec(
      entry.trim(),
    );
    if (match) {
      match[1]
        .split(',')
        .map((name) => name.trim())
        .filter(Boolean)
        .forEach((name) => core.add(name));
    } else {
      // Normalize quotes / trailing semicolon so the same statement emitted by
      // different templates (`"` vs `'`) is declared once.
      statements.add(entry.trim().replace(/"/g, "'").replace(/;?$/, ';'));
    }
  }
  return [
    `import { ${[...core].sort().join(', ')} } from '@montage-ui/core';`,
    ...statements,
  ].join('\n');
};
