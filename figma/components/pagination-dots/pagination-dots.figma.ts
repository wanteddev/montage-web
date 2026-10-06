// url=<FIGMA_PAGINATION_DOTS>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/pagination-dots/index.tsx
// component=PaginationDots

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  // Core defaults: `size="medium"`, `color="normal"`.
  Medium: undefined,
});
const color = figma.selectedInstance.getEnum('Variant', {
  Normal: undefined,
  White: 'white',
});
const __props: Record<string, unknown> = {};
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}
if (color && color.type !== 'ERROR') {
  __props['color'] = color;
}

export default {
  id: 'PaginationDots',
  imports: ["import { PaginationDots } from '@montage-ui/core';"],
  example: figma.code`<PaginationDots totalPages={5} currentPage={1}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('color', color)}/>`,
  metadata: { nestable: true, __props },
};
