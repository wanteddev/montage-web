// url=<FIGMA_SEARCH_FIELD>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/search-field/index.tsx
// component=SearchField

import figma from 'figma';

const placeholder = figma.selectedInstance.getString('Placeholder');
const variant = figma.selectedInstance.getEnum('Variant', {
  Solid: 'solid',
  Outlined: 'outlined',
});
const disabled = figma.selectedInstance.getBoolean('Disable');
const size = figma.selectedInstance.getEnum('Size', {
  Large: 'large',
  Medium: 'medium',
});
const __props: Record<string, unknown> = {};
if (placeholder && placeholder.type !== 'ERROR') {
  __props['placeholder'] = placeholder;
}
if (variant && variant.type !== 'ERROR') {
  __props['variant'] = variant;
}
if (disabled && disabled.type !== 'ERROR') {
  __props['disabled'] = disabled;
}
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}

export default {
  id: 'SearchField',
  imports: ["import { SearchField } from '@montage-ui/core';"],
  example: figma.code`<SearchField${figma.helpers.react.renderProp(
    'placeholder',
    placeholder,
  )}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp('size', size)}/>`,
  metadata: { nestable: true, __props },
};
