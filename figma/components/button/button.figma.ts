// url=<FIGMA_BUTTON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/button/index.tsx
// component=Button

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Solid: 'solid',
  Outlined: 'outlined',
});
const isIconOnly = figma.selectedInstance.getBoolean('Icon Only') === true;
const children = figma.selectedInstance.getBoolean('Icon Only', {
  true: figma.properties.children(['Icon']),
  false: figma.selectedInstance.getString('Label'),
});
const leadingContent = isIconOnly
  ? undefined
  : figma.selectedInstance.getBoolean('Leading Icon', {
      true: figma.properties.children(['Leading Icon']),
      false: undefined,
    });
const trailingContent = isIconOnly
  ? undefined
  : figma.selectedInstance.getBoolean('Trailing Icon', {
      true: figma.properties.children(['Trailing Icon']),
      false: undefined,
    });
const loading = figma.selectedInstance.getBoolean('Loading');
const color = figma.selectedInstance.getEnum('Color', {
  Primary: 'primary',
  Assistive: 'assistive',
  Negative: 'negative',
});
const iconOnly = figma.selectedInstance.getBoolean('Icon Only');
const disabled = figma.selectedInstance.getBoolean('Disable');
const size = figma.selectedInstance.getEnum('Size', {
  Xsmall: 'xsmall',
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
});
const __props: Record<string, unknown> = {};
if (variant && variant.type !== 'ERROR') {
  __props['variant'] = variant;
}
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}
if (leadingContent && leadingContent.type !== 'ERROR') {
  __props['leadingContent'] = leadingContent;
}
if (trailingContent && trailingContent.type !== 'ERROR') {
  __props['trailingContent'] = trailingContent;
}
if (loading && loading.type !== 'ERROR') {
  __props['loading'] = loading;
}
if (color && color.type !== 'ERROR') {
  __props['color'] = color;
}
if (iconOnly && iconOnly.type !== 'ERROR') {
  __props['iconOnly'] = iconOnly;
}
if (disabled && disabled.type !== 'ERROR') {
  __props['disabled'] = disabled;
}
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}

export default {
  id: 'Button',
  imports: ["import { Button } from '@montage-ui/core';"],
  example: figma.code`<Button${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}${figma.helpers.react.renderProp(
    'leadingContent',
    leadingContent,
  )}${figma.helpers.react.renderProp(
    'trailingContent',
    trailingContent,
  )}${figma.helpers.react.renderProp(
    'loading',
    loading,
  )}${figma.helpers.react.renderProp(
    'color',
    color,
  )}${figma.helpers.react.renderProp(
    'iconOnly',
    iconOnly,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}>${figma.helpers.react.renderChildren(children)}</Button>`,
  metadata: { nestable: true, __props },
};
