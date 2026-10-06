// url=<FIGMA_MODAL_CONTENTS_ILLUSTRATION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalContentItem

import figma from 'figma';

import { joinParts, renderInstance } from './modal-helpers';

const instance = figma.selectedInstance;

const heading = renderInstance(instance.findInstance('Heading'));
// The illustration is an instance swap; illustration assets have no Code
// Connect yet, so fall back to a placeholder for that slot.
const illustration =
  instance.getBoolean('Illustration') === true
    ? (renderInstance(instance.getInstanceSwap('┗ Variant')) ??
      figma.code`{/* 일러스트 */}`)
    : undefined;

export default {
  id: 'ModalContentItem',
  imports: ["import { ModalContentItem } from '@montage-ui/core';"],
  example: figma.tsx`<ModalContentItem alignItems="center" gap="20px">
${joinParts([heading, illustration]) ?? ''}
</ModalContentItem>`,
  metadata: { nestable: true },
};
