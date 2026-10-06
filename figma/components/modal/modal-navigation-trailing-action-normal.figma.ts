// url=<FIGMA_MODAL_NAVIGATION_TRAILING_ACTION_NORMAL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigationButton

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import {
  NAVIGATION_BUTTON_IMPORT,
  renderTrailingAction,
} from './modal-navigation-shared';

// Trailing navigation action. Close Button / Icon / Text.
export default finalizeTemplate({
  id: 'ModalNavigationButton',
  imports: [NAVIGATION_BUTTON_IMPORT],
  example: renderTrailingAction(figma.selectedInstance) ?? figma.code``,
  metadata: { nestable: true },
});
