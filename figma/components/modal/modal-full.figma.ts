// url=<FIGMA_MODAL_FULL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=Modal

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import {
  modalImport,
  renderInstance,
  renderModal,
  renderModalContent,
} from './modal-helpers';

const instance = figma.selectedInstance;

const navigation = renderInstance(instance.findInstance('Navigation'));
const content = renderModalContent(instance.findInstance('Contents'), 'full');
const actionArea =
  instance.getBoolean('Action') === true
    ? renderInstance(instance.findInstance('Action Area'))
    : undefined;

export default finalizeTemplate({
  id: 'Modal',
  imports: [modalImport(content.usedNames)],
  example: renderModal('full', '', [navigation, content.code, actionArea]),
  metadata: { nestable: true },
});
