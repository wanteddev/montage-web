// url=<FIGMA_LIST_CELL_LABEL_TRAILING_VERIFIED_CHECK>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCellLabelTrailing

import figma from 'figma';

export default {
  id: 'ListCellLabelTrailing',
  imports: ["import { ListCellLabelTrailing } from '@montage-ui/core';"],
  example: figma.code`<ListCellLabelTrailing variant="verified-check" />`,
  metadata: { nestable: true, props: { variant: 'verified-check' } },
};
