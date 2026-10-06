// url=<FIGMA_SELECT_CONTENT_MEDIUM_ICON_BUTTON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/select/index.tsx
// component=SelectContent

import figma from 'figma';

const children = figma.properties.children(['Icon Button']);
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'SelectContent',
  imports: ["import { SelectContent } from '@montage-ui/core';"],
  example: figma.code`<SelectContent variant="icon-button">${figma.helpers.react.renderChildren(
    children,
  )}</SelectContent>`,
  metadata: { nestable: true, __props },
};
