// url=<FIGMA_TOGGLE_ICON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/toggle-icon/index.tsx
// component=ToggleIcon

import figma from 'figma';

const children = figma.selectedInstance
  .getInstanceSwap('Icon')
  ?.executeTemplate().example;
const active = figma.selectedInstance.getBoolean('Active');
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}
if (active && active.type !== 'ERROR') {
  __props['active'] = active;
}

export default {
  id: 'ToggleIcon',
  imports: ["import { ToggleIcon } from '@montage-ui/core';"],
  example: figma.code`<ToggleIcon${figma.helpers.react.renderProp(
    'defaultActive',
    active,
  )}>${figma.helpers.react.renderChildren(children)}</ToggleIcon>`,
  metadata: { nestable: true, __props },
};
