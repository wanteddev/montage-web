// url=<FIGMA_MODAL_NAVIGATION_CONTENTS_NORMAL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigation

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import {
  NAVIGATION_IMPORT,
  renderModalNavigation,
} from './modal-navigation-shared';

// The `normal` navigation bar on its own (the navigation resources wrap it).
export default finalizeTemplate({
  id: 'ModalNavigation',
  imports: [NAVIGATION_IMPORT],
  example: renderModalNavigation(figma.selectedInstance, 'normal'),
  metadata: { nestable: true },
});
