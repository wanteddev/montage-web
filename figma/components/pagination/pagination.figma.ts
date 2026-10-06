// url=<FIGMA_PAGINATION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/pagination/index.tsx
// component=Pagination

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  // `extended` is the core default.
  Extended: undefined,
  Compact: 'compact',
  Minimize: 'minimize',
});
const leadingContent = figma.selectedInstance.getBoolean('Leading Content', {
  // `properties.instance` keeps the swapped resource's own imports.
  true: figma.properties.instance('┗ Instance'),
  false: undefined,
});
const trailingContent = figma.selectedInstance.getBoolean('Trailing Content', {
  true: figma.properties.instance('┗ Instance\u180E'),
  false: undefined,
});
const __props: Record<string, unknown> = {};
if (variant && variant.type !== 'ERROR') {
  __props['variant'] = variant;
}
if (leadingContent && leadingContent.type !== 'ERROR') {
  __props['leadingContent'] = leadingContent;
}
if (trailingContent && trailingContent.type !== 'ERROR') {
  __props['trailingContent'] = trailingContent;
}

export default {
  id: 'Pagination',
  imports: ["import { Pagination } from '@montage-ui/core';"],
  example: figma.code`<Pagination totalPages={10}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}${figma.helpers.react.renderProp(
    'leadingContent',
    leadingContent,
  )}${figma.helpers.react.renderProp('trailingContent', trailingContent)}/>`,
  metadata: { nestable: true, __props },
};
