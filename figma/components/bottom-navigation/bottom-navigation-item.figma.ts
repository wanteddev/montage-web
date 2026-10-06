// url=<FIGMA_BOTTOM_NAVIGATION_ITEM>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/bottom-navigation/index.tsx
// component=BottomNavigationItem

import figma from 'figma';

const label = figma.selectedInstance.findText('Value').__render__();
const icon = figma.properties.children(['Icon']);
const __props: Record<string, unknown> = {};
if (label && label.type !== 'ERROR') {
  __props['label'] = label;
}
if (icon && icon.type !== 'ERROR') {
  __props['icon'] = icon;
}

export default {
  id: 'BottomNavigationItem',
  imports: ["import { BottomNavigationItem } from '@montage-ui/core';"],
  example: figma.code`<BottomNavigationItem${figma.helpers.react.renderProp(
    'value',
    label,
  )}${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp('icon', icon)}/>`,
  metadata: { nestable: true, __props },
};
