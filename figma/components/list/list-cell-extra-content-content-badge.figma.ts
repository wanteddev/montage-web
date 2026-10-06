// url=<FIGMA_LIST_CELL_EXTRA_CONTENT_CONTENT_BADGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCellExtraContent

import figma from 'figma';

const children = figma.properties.children(['Content Badge/Content Badge']);
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'ListCellExtraContent',
  imports: ["import { ListCellExtraContent } from '@montage-ui/core';"],
  example: figma.code`<ListCellExtraContent variant="content-badge">
        ${figma.helpers.react.renderChildren(children)}
      </ListCellExtraContent>`,
  metadata: { nestable: true, props: { variant: 'content-badge' }, __props },
};
