// url=<FIGMA_MODAL_BOTTOM_SHEET>
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

let template;
if (instance.getPropertyValue('Platform') === 'Web') {
  // `fixed` is popup/full only in core, so Resize=Fixed keeps the default.
  const resize = instance.getEnum('Resize', {
    Hug: undefined,
    Flexible: 'flexible',
    Fill: 'fill',
    Fixed: undefined,
  });
  // Every web bottom sheet shows the drag handle resource.
  const handle =
    instance.findInstance('Modal/Resource/Handle').type !== 'ERROR';
  const content = renderModalContent(
    instance.findInstance('Contents'),
    'bottom',
  );
  const actionArea =
    instance.getBoolean('Action') === true
      ? renderInstance(instance.findInstance('Action Area'))
      : undefined;

  template = {
    id: 'Modal',
    imports: [modalImport(content.usedNames)],
    example: renderModal(
      'bottom',
      (handle ? ' handle' : '') + (resize ? ` resize="${resize}"` : ''),
      [content.code, actionArea],
    ),
    metadata: { nestable: true },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Modal',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default finalizeTemplate(template);
