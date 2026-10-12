// url=<FIGMA_MODAL_PRESET_MENU>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=Menu

import figma from 'figma';

import { inlineInstances } from '../../helpers/imports';

import { finalizeTemplate } from './collect-imports';
import { renderInstance } from './modal-helpers';

const menu = renderInstance(figma.selectedInstance.findInstance('Menu/Menu'));

export default inlineInstances(
  finalizeTemplate({
    id: 'ModalPresetMenu',
    imports: [],
    example: menu ? figma.code`${menu}` : figma.code``,
    metadata: { nestable: true },
  }),
);
