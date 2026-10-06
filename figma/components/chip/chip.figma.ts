// url=<FIGMA_CHIP>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/chip/index.tsx
// component=Chip

import figma from 'figma';

const children = figma.selectedInstance.getString('Text');
const leadingContent = figma.selectedInstance.getBoolean('Leading Content', {
  true: figma.properties.children(['Leading Content']),
  false: undefined,
});
const trailingContent = figma.selectedInstance.getBoolean('Trailing Content', {
  true: figma.properties.children(['Trailing Content']),
  false: undefined,
});
const disabled = figma.selectedInstance.getBoolean('Disable');
const active = figma.selectedInstance.getBoolean('Active');
const size = figma.selectedInstance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
});
const variant = figma.selectedInstance.getEnum('Variant', {
  Solid: 'solid',
  Outlined: 'outlined',
});
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}
if (leadingContent && leadingContent.type !== 'ERROR') {
  __props['leadingContent'] = leadingContent;
}
if (trailingContent && trailingContent.type !== 'ERROR') {
  __props['trailingContent'] = trailingContent;
}
if (disabled && disabled.type !== 'ERROR') {
  __props['disabled'] = disabled;
}
if (active && active.type !== 'ERROR') {
  __props['active'] = active;
}
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}
if (variant && variant.type !== 'ERROR') {
  __props['variant'] = variant;
}

export default {
  id: 'Chip',
  imports: ["import { Chip } from '@montage-ui/core';"],
  example: figma.code`<Chip${figma.helpers.react.renderProp(
    'leadingContent',
    leadingContent,
  )}${figma.helpers.react.renderProp(
    'trailingContent',
    trailingContent,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'active',
    active,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}>${figma.helpers.react.renderChildren(children)}</Chip>`,
  metadata: { nestable: true, __props },
};
