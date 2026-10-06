// url=<FIGMA_ICON_BUTTON_OUTLINED>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/icon-button/index.tsx
// component=IconButton

import figma from 'figma';

const disabled = figma.selectedInstance.getBoolean('Disable');
const size = figma.selectedInstance.getEnum('Size', {
  Medium: 'medium',
  Small: 'small',
  Custom: 28,
});
const nested = (function () {
  const nestedLayer21 = figma.selectedInstance.findInstance('Icon');
  return {
    children:
      nestedLayer21.type !== 'ERROR'
        ? nestedLayer21.getInstanceSwap('Icon')?.executeTemplate().example
        : undefined,
  };
})();
const __props: Record<string, unknown> = {};
if (disabled && disabled.type !== 'ERROR') {
  __props['disabled'] = disabled;
}
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}
if (nested && nested.type !== 'ERROR') {
  __props['nested'] = nested;
}

export default {
  id: 'IconButton',
  imports: ["import { IconButton } from '@montage-ui/core';"],
  example: figma.code`<IconButton variant="outlined"${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp('size', size)}>
      ${figma.helpers.react.renderChildren(nested.children)}
    </IconButton>`,
  metadata: { nestable: true, __props },
};
