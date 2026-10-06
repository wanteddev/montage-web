// url=<FIGMA_MODAL_NAVIGATION_TOOL_CATEGORY>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigation

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';

// Navigation toolbar resource: renders the nested Category as-is (`toolbar` content).
// Rendered directly so the nested component's imports reach parent snippets.
const childLayer = figma.selectedInstance.findInstance('Category');
const children =
  childLayer.type !== 'ERROR' && childLayer.hasCodeConnect()
    ? childLayer.executeTemplate().example
    : undefined;

export default finalizeTemplate({
  id: 'ModalNavigationTool',
  imports: [],
  example: figma.code`${figma.helpers.react.renderChildren(children)}`,
  metadata: { nestable: true },
});
