// url=<FIGMA_MODAL_PRESET_CUSTOM>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalContentItem

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';

// A free preset area below the heading.
export default finalizeTemplate({
  id: 'ModalPresetCustom',
  imports: [],
  example: figma.code`{/* 콘텐츠 */}`,
  metadata: { nestable: true },
});
