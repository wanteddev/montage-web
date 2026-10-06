// url=<FIGMA_LIST_CELL_TRAILING_VALUE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCellContent

import figma from 'figma';

const children = figma.selectedInstance.getString('Text');
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'ListCellContent',
  imports: ["import { ListCellContent } from '@montage-ui/core';"],
  example: figma.code`<ListCellContent variant="value">${figma.helpers.react.renderChildren(
    children,
  )}</ListCellContent>`,
  metadata: { nestable: true, props: { variant: 'value' }, __props },
};
