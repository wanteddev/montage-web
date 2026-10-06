// url=<FIGMA_TOP_NAVIGATION_SEARCH_FIELD>

import figma from 'figma';

const children = figma.properties.children(['Searchfield/Searchfield']);
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'TopNavigationSearchField',
  example: figma.code`<>${figma.helpers.react.renderChildren(children)}</>`,
  metadata: { nestable: true, __props },
};
