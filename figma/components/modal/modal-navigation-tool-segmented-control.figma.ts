// url=<FIGMA_MODAL_NAVIGATION_TOOL_SEGMENTED_CONTROL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigation

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';

// Navigation toolbar resource: renders the nested Segmented Control as-is (`toolbar` content).
// Rendered directly so the nested component's imports reach parent snippets.
const childLayer = figma.selectedInstance.findInstance('Segmented Control');
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
