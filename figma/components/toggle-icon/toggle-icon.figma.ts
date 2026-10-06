// url=<FIGMA_TOGGLE_ICON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/toggle-icon/index.tsx
// component=ToggleIcon

import figma from 'figma';

import { renderIcon } from '../../helpers/icon';

const icon = renderIcon(figma.selectedInstance.getInstanceSwap('Icon'));
const active = figma.selectedInstance.getPropertyValue('Active') === 'True';
const imports = [
  "import { ToggleIcon } from '@montage-ui/core';",
  ...(icon?.imports ?? []),
];

export default {
  id: 'ToggleIcon',
  imports,
  example: figma.tsx`<ToggleIcon${active ? ' defaultActive' : ''}>${
    icon ? icon.code : ''
  }</ToggleIcon>`,
  metadata: { nestable: true, props: { imports } },
};
