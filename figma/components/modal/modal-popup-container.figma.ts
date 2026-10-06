// url=<FIGMA_MODAL_POPUP_CONTAINER>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=Modal

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import { renderPopupBody } from './modal-helpers';

// `Modal/Resource/Modal`: the popup body (navigation, content, action area).
const { example, imports } = renderPopupBody(figma.selectedInstance);

export default finalizeTemplate({
  id: 'Modal',
  imports,
  example,
  metadata: { nestable: true },
});
