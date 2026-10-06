// url=<FIGMA_BOTTOM_NAVIGATION_CONTENT>

import figma from 'figma';

const items = figma.properties.children([
  'Tab 1',
  'Tab 2',
  'Tab 3',
  'Tab 4',
  'Tab 5',
]);
const __props: Record<string, unknown> = {};
if (items && items.type !== 'ERROR') {
  __props['items'] = items;
}

export default {
  id: 'BottomNavigationContent',
  example: figma.code`<>${figma.helpers.react.renderChildren(items)}</>`,
  metadata: { nestable: true, __props },
};
