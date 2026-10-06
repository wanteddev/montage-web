// url=<FIGMA_LIST_CELL_TRAILING_ICON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCellContent

import figma from 'figma';

const children = figma.properties.children(['Icons']);
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'ListCellContent',
  imports: ["import { ListCellContent } from '@montage-ui/core';"],
  example: figma.code`<ListCellContent variant="icon">${figma.helpers.react.renderChildren(
    children,
  )}</ListCellContent>`,
  metadata: { nestable: true, props: { variant: 'icon' }, __props },
};
