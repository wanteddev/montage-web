// url=<FIGMA_MODAL_NAVIGATION_CONTENTS_SEARCH>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigation

import figma from 'figma';

import {
  NAVIGATION_IMPORT,
  renderModalNavigation,
} from './modal-navigation-shared';

// The `search` navigation bar on its own (the navigation resources wrap it).
export default {
  id: 'ModalNavigation',
  imports: [NAVIGATION_IMPORT],
  example: renderModalNavigation(figma.selectedInstance, 'search'),
  metadata: { nestable: true },
};
