// url=<FIGMA_MODAL_CONTENTS_CUSTOM>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalContentItem

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';

// A free content area: leave a placeholder inside the item.
export default finalizeTemplate({
  id: 'ModalContentItem',
  imports: ["import { ModalContentItem } from '@montage-ui/core';"],
  example: figma.code`<ModalContentItem>{/* 콘텐츠 */}</ModalContentItem>`,
  metadata: { nestable: true },
});
