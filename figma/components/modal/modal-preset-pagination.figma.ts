// url=<FIGMA_MODAL_PRESET_PAGINATION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=PaginationDots

import figma from 'figma';

import { inlineInstances } from '../../helpers/imports';

import { finalizeTemplate } from './collect-imports';
import { renderInstance } from './modal-helpers';

const dots = renderInstance(
  figma.selectedInstance.findInstance('Pagination/Dots'),
);

export default inlineInstances(
  finalizeTemplate({
    id: 'ModalPresetPagination',
    imports: [],
    example: dots ? figma.code`${dots}` : figma.code``,
    metadata: { nestable: true },
  }),
);
