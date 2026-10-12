// url=<FIGMA_TOP_NAVIGATION_TOOL_CATEGORY>

import figma from 'figma';

import { inlineInstances } from '../../helpers/imports';

const children = figma.properties.children(['Category']);
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default inlineInstances({
  id: 'TopNavigationToolCategory',
  example: figma.code`${figma.helpers.react.renderChildren(children)}`,
  metadata: { nestable: true, __props },
});
