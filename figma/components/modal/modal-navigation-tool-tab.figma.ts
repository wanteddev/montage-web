// url=<FIGMA_MODAL_NAVIGATION_TOOL_TAB>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigation

import figma from 'figma';

// Navigation toolbar resource: renders the nested Tab as-is (`toolbar` content).
const children = figma.properties.children(['Tab']);

export default {
  id: 'ModalNavigationTool',
  imports: [],
  example: figma.code`${figma.helpers.react.renderChildren(children)}`,
  metadata: { nestable: true },
};
