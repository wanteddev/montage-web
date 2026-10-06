// url=<FIGMA_LIST_CELL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCell

import figma from 'figma';

import {
  LIST_CELL_SLOT_NAMES,
  readListCell,
  renderDescriptionProp,
  renderElementProp,
} from '../../helpers/list-cell';
import { coreImport } from '../../helpers/menu-item';

const cell = readListCell(figma.selectedInstance, LIST_CELL_SLOT_NAMES);

const divider = figma.selectedInstance.getBoolean('Divider');
const disableInteraction = !figma.selectedInstance.getBoolean('Interaction');
// Core defaults (`verticalPadding="medium"`, `variant="inset"`) are omitted.
const verticalPadding = figma.selectedInstance.getEnum('Vertical Padding', {
  None: 'none',
  Small: 'small',
  Medium: undefined,
  Large: 'large',
});
const variant = figma.selectedInstance.getEnum('Variant', {
  Inset: undefined,
  Full: 'full',
});
const ellipsis = figma.selectedInstance.getBoolean('Text Ellipsis');
const selected = figma.selectedInstance.getBoolean('Selected');
const disabled = figma.selectedInstance.getBoolean('Disable');

const flags =
  (verticalPadding ? ` verticalPadding="${verticalPadding}"` : '') +
  (variant ? ` variant="${variant}"` : '') +
  (divider ? ' divider' : '') +
  (disableInteraction ? ' disableInteraction' : '') +
  (ellipsis ? ' ellipsis' : '') +
  (selected ? ' selected' : '') +
  (disabled ? ' disabled' : '');

export default {
  id: 'ListCell',
  imports: [coreImport(['ListCell', ...cell.usedNames])],
  example: figma.tsx`<ListCell${flags}${renderDescriptionProp(
    cell.description,
  )}${renderElementProp('leadingContent', cell.leadingContent)}${renderElementProp(
    'trailingContent',
    cell.trailingContent,
  )}${renderElementProp('labelTrailing', cell.labelTrailing)}${renderElementProp(
    'extraContent',
    cell.extraContent,
  )}>
  ${cell.label ?? ''}
</ListCell>`,
  metadata: { nestable: true },
};
