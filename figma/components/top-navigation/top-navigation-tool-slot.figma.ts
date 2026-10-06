// url=<FIGMA_TOP_NAVIGATION_TOOL_SLOT>

import figma from 'figma';

const children = figma.properties.slot('Slot');
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'TopNavigationToolSlot',
  example: figma.code`<>${figma.helpers.react.renderChildren(children)}</>`,
  metadata: { nestable: true, __props },
};
