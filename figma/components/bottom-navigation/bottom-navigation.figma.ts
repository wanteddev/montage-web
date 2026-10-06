// url=<FIGMA_BOTTOM_NAVIGATION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/bottom-navigation/index.tsx
// component=BottomNavigation

import figma from 'figma';

// The selected tab is the `Tab N` instance whose `State` is Active. Item values
// are their labels (see bottom-navigation-item), so the label is the default value.
const content = figma.selectedInstance.findInstance('Content');
const activeTab =
  content.type === 'ERROR'
    ? undefined
    : ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5']
        .map((name) => content.findInstance(name))
        .find(
          (tab) =>
            tab.type !== 'ERROR' && tab.getPropertyValue('State') === 'Active',
        );
const activeLabel =
  activeTab && activeTab.type !== 'ERROR'
    ? activeTab.findText('Value')
    : undefined;
const defaultValue =
  activeLabel && activeLabel.type !== 'ERROR'
    ? activeLabel.textContent
    : undefined;

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Platform') === 'Web Mobile') {
  const children = figma.properties.children(['Content']);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'BottomNavigation',
    imports: ["import { BottomNavigation } from '@montage-ui/core';"],
    example: figma.code`<BottomNavigation${figma.helpers.react.renderProp(
      'defaultValue',
      defaultValue,
    )}>${figma.helpers.react.renderChildren(children)}</BottomNavigation>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'BottomNavigation',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
