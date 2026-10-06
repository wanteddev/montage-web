// url=<FIGMA_LIST_CELL_LABEL_TRAILING_CONTENT_BADGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCellLabelTrailing

import figma from 'figma';

const children = figma.properties.children(['Content Badge/Content Badge']);
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'ListCellLabelTrailing',
  imports: ["import { ListCellLabelTrailing } from '@montage-ui/core';"],
  example: figma.code`<ListCellLabelTrailing variant="content-badge">
        ${figma.helpers.react.renderChildren(children)}
      </ListCellLabelTrailing>`,
  metadata: { nestable: true, props: { variant: 'content-badge' }, __props },
};
