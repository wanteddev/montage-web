// url=<FIGMA_MENU_ITEM>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/menu/index.tsx
// component=MenuItem

import figma from 'figma';

import { finalizeTemplate } from '../modal/collect-imports';
import { MENU_ITEM_SLOT_NAMES } from '../../helpers/list-cell';
import { coreImport, renderListCellItem } from '../../helpers/menu-item';

const { example, usedNames } = renderListCellItem(
  figma.selectedInstance,
  'MenuItem',
  MENU_ITEM_SLOT_NAMES,
  { withMenuItemProps: true },
);

export default finalizeTemplate({
  id: 'MenuItem',
  imports: [coreImport(usedNames)],
  example,
  // Parents that re-render this item (e.g. grouped menus) read `imports`.
  metadata: { nestable: true, props: { imports: usedNames } },
});
