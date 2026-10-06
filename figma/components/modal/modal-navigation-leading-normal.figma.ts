// url=<FIGMA_MODAL_NAVIGATION_LEADING_NORMAL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigationButton

import figma from 'figma';

import {
  NAVIGATION_BUTTON_IMPORT,
  renderLeadingButton,
} from './modal-navigation-shared';

// Leading navigation button (web). Back Button / Icon Button / Text Button.
export default {
  id: 'ModalNavigationButton',
  imports: [NAVIGATION_BUTTON_IMPORT],
  example: renderLeadingButton(figma.selectedInstance) ?? figma.code``,
  metadata: { nestable: true },
};
