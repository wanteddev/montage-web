// url=<FIGMA_MODAL_NAVIGATION_TRAILING>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigationButton

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import {
  NAVIGATION_BUTTON_IMPORT,
  joinElements,
  renderTrailingAction,
  trailingGroupActions,
} from './modal-navigation-shared';

// Group of up to three trailing actions (`trailingContent` of the navigation).
export default finalizeTemplate({
  id: 'ModalNavigationTrailing',
  imports: [NAVIGATION_BUTTON_IMPORT],
  example:
    joinElements(
      trailingGroupActions(figma.selectedInstance).map(renderTrailingAction),
    ) ?? figma.code``,
  metadata: { nestable: true },
});
