// url=<FIGMA_TEXT_BUTTON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/text-button/index.tsx
// component=TextButton

import figma from 'figma';

const children = figma.selectedInstance.getString('Label');
const leadingContent = figma.selectedInstance.getBoolean('Leading Icon', {
  true: figma.properties.children(['Leading Icon']),
  false: undefined,
});
const trailingContent = figma.selectedInstance.getBoolean('Trailing Icon', {
  true: figma.properties.children(['Trailing Icon']),
  false: undefined,
});
const color = figma.selectedInstance.getEnum('Color', {
  Primary: 'primary',
  Assistive: 'assistive',
});
const loading = figma.selectedInstance.getBoolean('Loading');
const disabled = figma.selectedInstance.getBoolean('Disable');
const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
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
if (color && color.type !== 'ERROR') {
  __props['color'] = color;
}
if (loading && loading.type !== 'ERROR') {
  __props['loading'] = loading;
}
if (disabled && disabled.type !== 'ERROR') {
  __props['disabled'] = disabled;
}
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}

export default {
  id: 'TextButton',
  imports: ["import { TextButton } from '@montage-ui/core';"],
  example: figma.code`<TextButton${figma.helpers.react.renderProp(
    'leadingContent',
    leadingContent,
  )}${figma.helpers.react.renderProp(
    'trailingContent',
    trailingContent,
  )}${figma.helpers.react.renderProp(
    'color',
    color,
  )}${figma.helpers.react.renderProp(
    'loading',
    loading,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}>${figma.helpers.react.renderChildren(children)}</TextButton>`,
  metadata: { nestable: true, __props },
};
