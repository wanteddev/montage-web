// url=<FIGMA_MODAL_POPUP>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=Modal

import figma from 'figma';

import { renderInstance } from './modal-helpers';

// `Modal/Popup` only adds the dimmed screen and safe areas around the popup
// body (`Modal/Resource/Modal`), so it renders that nested instance.
const popup = renderInstance(figma.selectedInstance.findInstance('Modal'));

export default {
  id: 'Modal',
  imports: [],
  example: popup ? figma.code`${popup}` : figma.code``,
  metadata: { nestable: true },
};
