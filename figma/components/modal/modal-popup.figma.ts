// url=<FIGMA_MODAL_POPUP>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=Modal

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import { renderPopupBody } from './modal-helpers';

// `Modal/Popup` only adds the dimmed screen and safe areas around the popup
// body (`Modal/Resource/Modal`). Render that body here (not via its template)
// so the navigation / action area imports reach this snippet.
const { example, imports } = renderPopupBody(
  figma.selectedInstance.findInstance('Modal'),
);

export default finalizeTemplate({
  id: 'Modal',
  imports,
  example,
  metadata: { nestable: true },
});
