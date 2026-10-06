// url=<FIGMA_MENU_ACTION_AREA_TRAILING_ICON_BUTTON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/menu/index.tsx
// component=MenuActionAreaContent

import figma from 'figma';

const children = figma.properties.children(['Icon Button']);
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'MenuActionAreaContent',
  imports: ["import { MenuActionAreaContent } from '@montage-ui/core';"],
  example: figma.code`<MenuActionAreaContent variant="icon-button">
        ${figma.helpers.react.renderChildren(children)}
      </MenuActionAreaContent>`,
  metadata: { nestable: true, __props },
};
