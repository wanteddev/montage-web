// url=<FIGMA_MODAL_POPUP_CONTAINER>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=Modal

import figma from 'figma';

import {
  modalImport,
  renderInstance,
  renderModal,
  renderModalContent,
} from './modal-helpers';

// `Modal/Resource/Modal`: the popup body (navigation, content, action area).
const instance = figma.selectedInstance;

const size = instance.getEnum('Size', {
  Medium: undefined,
  Large: 'large',
  XLarge: 'xlarge',
});
const resize = instance.getEnum('Resize', {
  Hug: undefined,
  Fixed: 'fixed',
});

const navigation =
  instance.getBoolean('Navigation') === true
    ? renderInstance(instance.findInstance('Navigation'))
    : undefined;
const content = renderModalContent(instance.findInstance('Content'), 'popup');
const actionArea =
  instance.getBoolean('Action') === true
    ? renderInstance(instance.findInstance('Action Area'))
    : undefined;

export default {
  id: 'Modal',
  imports: [modalImport(content.usedNames)],
  example: renderModal(
    'popup',
    (size ? ` size="${size}"` : '') + (resize ? ` resize="${resize}"` : ''),
    [navigation, content.code, actionArea],
  ),
  metadata: { nestable: true },
};
