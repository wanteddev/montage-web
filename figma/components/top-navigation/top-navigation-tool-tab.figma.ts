// url=<FIGMA_TOP_NAVIGATION_TOOL_TAB>

import figma from 'figma';

const children = figma.properties.children(['Tab']);
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'TopNavigationToolTab',
  example: figma.code`${figma.helpers.react.renderChildren(children)}`,
  metadata: { nestable: true, __props },
};
