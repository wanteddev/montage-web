// url=<FIGMA_FALLBACK_VIEW_ACTION_AREA_MOBILE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/fallback-view/index.tsx
// component=FallbackViewActionArea

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Single: 'single',
  Horizontal: 'horizontal',
  Vertical: 'vertical',
});
const children = figma.properties.children([
  '┗ Button',
  '┗ Alternative Button',
]);
const __props: Record<string, unknown> = {};
if (variant && variant.type !== 'ERROR') {
  __props['variant'] = variant;
}
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'FallbackViewActionArea',
  imports: [
    "import { FallbackViewActionArea, FallbackViewActionAreaButton } from '@montage-ui/core';",
  ],
  example: figma.code`<FallbackViewActionArea${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}>${figma.helpers.react.renderChildren(children)}</FallbackViewActionArea>`,
  metadata: { nestable: true, __props },
};
