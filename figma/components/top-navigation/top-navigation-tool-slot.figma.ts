// url=<FIGMA_TOP_NAVIGATION_TOOL_SLOT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/top-navigation/index.tsx
// component=TopNavigation

import figma from 'figma';

import { executedImports } from '../modal/collect-imports';

// The custom toolbar slot. An empty slot (only the Figma placeholder) has no
// connected instance, so it renders a placeholder comment instead of Figma's
// raw layer code; connected content is rendered with its imports re-declared.
const slot = figma.properties.slot('Slot');
const connected = slot ? slot.connectedInstances : [];
const imports: Array<string> = [];
const parts = connected.map((child) => {
  const executed = child.executeTemplate();
  imports.push(...executedImports(executed));
  return executed.example;
});
const uniqueImports = [...new Set(imports)];

const body =
  parts.length === 0
    ? figma.tsx`{/* 툴바 콘텐츠 */}`
    : parts.reduce(
        (joined, code) => figma.tsx`${joined}
  ${code}`,
      );

export default {
  id: 'TopNavigationToolSlot',
  imports: uniqueImports,
  example: figma.tsx`<>
  ${body}
</>`,
  metadata: { nestable: true, props: { imports: uniqueImports } },
};
