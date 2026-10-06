// url=<FIGMA_PAGE_COUNTER>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/page-counter/index.tsx
// component=PageCounter

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
});
const alternative = figma.selectedInstance.getBoolean('Alternative');
const __props: Record<string, unknown> = {};
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}
if (alternative && alternative.type !== 'ERROR') {
  __props['alternative'] = alternative;
}

export default {
  id: 'PageCounter',
  imports: ["import { PageCounter } from '@montage-ui/core';"],
  example: figma.code`<PageCounter totalPages={5} currentPage={1}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('alternative', alternative)}/>`,
  metadata: { nestable: true, __props },
};
