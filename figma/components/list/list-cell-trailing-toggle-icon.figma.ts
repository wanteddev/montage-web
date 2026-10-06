// url=<FIGMA_LIST_CELL_TRAILING_TOGGLE_ICON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCellContent

import figma from 'figma';

import { renderIcon } from '../../helpers/icon';

// The nested toggle icon is a library (remote) instance, so its own snippet is
// not resolvable here. Rebuild it from its props: `Active` and the swapped icon.
const toggle = figma.selectedInstance.findInstance('Toggle Icon/Toggle Icon');
const active =
  toggle.type !== 'ERROR' && toggle.getPropertyValue('Active') === 'True';
const icon =
  toggle.type === 'ERROR'
    ? undefined
    : renderIcon(toggle.getInstanceSwap('Icon'));

const children = figma.tsx`<ToggleIcon${active ? ' defaultActive' : ''}>${
  icon ? icon.code : ''
}</ToggleIcon>`;
const imports = [
  "import { ToggleIcon } from '@montage-ui/core';",
  ...(icon?.imports ?? []),
];

export default {
  id: 'ListCellContent',
  imports: ["import { ListCellContent } from '@montage-ui/core';", ...imports],
  example: figma.tsx`<ListCellContent variant="toggle-icon">${children}</ListCellContent>`,
  metadata: {
    nestable: true,
    props: { variant: 'toggle-icon', imports },
    __props: { children },
  },
};
