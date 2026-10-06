// url=<FIGMA_MODAL_CONTENTS_INFORMATION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalContentItem

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import { joinParts, renderInstance } from './modal-helpers';

const instance = figma.selectedInstance;

const heading = renderInstance(instance.findInstance('Heading'));
// The preset below the heading is an instance swap (Info, Menu, Textfield…).
const preset =
  instance.getBoolean('Contents') === true
    ? renderInstance(instance.getInstanceSwap('┗ Preset'))
    : undefined;

export default finalizeTemplate({
  id: 'ModalContentItem',
  imports: ["import { ModalContentItem } from '@montage-ui/core';"],
  example: figma.tsx`<ModalContentItem gap="16px">
${joinParts([heading, preset]) ?? ''}
</ModalContentItem>`,
  metadata: { nestable: true },
});
