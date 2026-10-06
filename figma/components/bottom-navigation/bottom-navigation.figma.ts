// url=<FIGMA_BOTTOM_NAVIGATION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/bottom-navigation/index.tsx
// component=BottomNavigation

import figma from 'figma';

import {
  renderNested,
  uniqueImports,
} from '../top-navigation/top-navigation-shared';

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

let template;
if (figma.selectedInstance.getPropertyValue('Platform') === 'Web Mobile') {
  // Render the tab items directly (the content resource would add a fragment)
  // and re-declare their imports.
  const items =
    content.type === 'ERROR'
      ? []
      : ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5']
          .map((name) => renderNested(content.findInstance(name)))
          .filter((item): item is NonNullable<typeof item> =>
            Boolean(item?.code),
          );
  const body = items.length
    ? items
        .map((item) => item.code)
        .reduce(
          (joined, code) => figma.tsx`${joined}
  ${code}`,
        )
    : '';
  const imports = uniqueImports([
    "import { BottomNavigation } from '@montage-ui/core';",
    ...items.flatMap((item) => item.imports),
  ]);

  template = {
    id: 'BottomNavigation',
    imports,
    example: figma.tsx`<BottomNavigation${
      defaultValue ? ` defaultValue=${JSON.stringify(defaultValue)}` : ''
    }>
  ${body}
</BottomNavigation>`,
    metadata: { nestable: true, props: { imports } },
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
