// url=<FIGMA_MODAL_NAVIGATION_LEADING_FLOAT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigationButton

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import {
  NAVIGATION_BUTTON_IMPORT,
  renderLeadingButton,
} from './modal-navigation-shared';

// Leading navigation button (web). Back Button / Icon Button / Text Button.
export default finalizeTemplate({
  id: 'ModalNavigationButton',
  imports: [NAVIGATION_BUTTON_IMPORT],
  example: renderLeadingButton(figma.selectedInstance) ?? figma.code``,
  metadata: { nestable: true },
});
