// url=<FIGMA_CONTENT_BADGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/content-badge/index.tsx
// component=ContentBadge

import figma from 'figma';

const children = figma.selectedInstance.getString('Text');
const leadingContent = figma.selectedInstance.getBoolean('Leading Icon', {
  true: figma.properties.children(['Leading Icon']),
  false: undefined,
});
const trailingContent = figma.selectedInstance.getBoolean('Trailing Icon', {
  true: figma.properties.children(['Trailing Icon']),
  false: undefined,
});
const color = figma.selectedInstance.getEnum('Color', {
  Neutral: 'neutral',
  Accent: 'accent',
});
const size = figma.selectedInstance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: 'medium',
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
if (color && color.type !== 'ERROR') {
  __props['color'] = color;
}
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}
if (variant && variant.type !== 'ERROR') {
  __props['variant'] = variant;
}

export default {
  id: 'ContentBadge',
  imports: ["import { ContentBadge } from '@montage-ui/core';"],
  example: figma.code`<ContentBadge${figma.helpers.react.renderProp(
    'leadingContent',
    leadingContent,
  )}${figma.helpers.react.renderProp(
    'trailingContent',
    trailingContent,
  )}${figma.helpers.react.renderProp(
    'color',
    color,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}>${figma.helpers.react.renderChildren(children)}</ContentBadge>`,
  metadata: { nestable: true, __props },
};
