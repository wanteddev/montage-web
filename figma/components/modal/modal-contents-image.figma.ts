// url=<FIGMA_MODAL_CONTENTS_IMAGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalContentItem

import figma from 'figma';

import { joinParts, renderInstance } from './modal-helpers';

const instance = figma.selectedInstance;

const thumbnail = renderInstance(instance.findInstance('Thumbnail/Thumbnail'));
const heading = renderInstance(instance.findInstance('Heading'));
const pagination =
  instance.getBoolean('Pagination') === true
    ? renderInstance(instance.findInstance('Pagination'))
    : undefined;

export default {
  id: 'ModalContentItem',
  imports: ["import { ModalContentItem } from '@montage-ui/core';"],
  example: figma.tsx`<ModalContentItem alignItems="center" gap="20px">
${joinParts([thumbnail, heading, pagination]) ?? ''}
</ModalContentItem>`,
  metadata: { nestable: true },
};
