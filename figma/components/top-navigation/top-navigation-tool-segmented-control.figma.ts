// url=<FIGMA_TOP_NAVIGATION_TOOL_SEGMENTED_CONTROL>

import figma from 'figma';

const children = figma.properties.children(['Segmented Control']);
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'TopNavigationToolSegmentedControl',
  example: figma.code`${figma.helpers.react.renderChildren(children)}`,
  metadata: { nestable: true, __props },
};
