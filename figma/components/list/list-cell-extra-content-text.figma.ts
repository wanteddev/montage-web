// url=<FIGMA_LIST_CELL_EXTRA_CONTENT_TEXT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCellExtraContent

import figma from 'figma';

const children = figma.selectedInstance.findText('설명').__render__();
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'ListCellExtraContent',
  imports: ["import { ListCellExtraContent } from '@montage-ui/core';"],
  example: figma.code`<ListCellExtraContent variant="text">${figma.helpers.react.renderChildren(
    children,
  )}</ListCellExtraContent>`,
  metadata: { nestable: true, props: { variant: 'text' }, __props },
};
