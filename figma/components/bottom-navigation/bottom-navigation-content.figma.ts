// url=<FIGMA_BOTTOM_NAVIGATION_CONTENT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/bottom-navigation/index.tsx
// component=BottomNavigationItem

import figma from 'figma';

import {
  joinRendered,
  renderNested,
  uniqueImports,
} from '../top-navigation/top-navigation-shared';

// The visible `Tab N` items, each rendered by the item template.
const items = joinRendered(
  ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'].map((name) =>
    renderNested(figma.selectedInstance.findInstance(name)),
  ),
);
const imports = uniqueImports(items?.imports ?? []);

export default {
  id: 'BottomNavigationContent',
  imports,
  example: items ? figma.tsx`${items.code}` : figma.code``,
  metadata: { nestable: true, props: { imports } },
};
