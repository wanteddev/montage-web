// url=<FIGMA_DIALOG_ACTION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/alert/index.tsx
// component=AlertActionAreaButton

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Normal: 'normal',
  Assistive: 'assistive',
  Negative: 'negative',
});
const button = (function () {
  const nestedLayer33 = figma.selectedInstance.findInstance('Button');
  return {
    label:
      nestedLayer33.type !== 'ERROR'
        ? nestedLayer33.getString('Label')
        : undefined,
    disabled:
      nestedLayer33.type !== 'ERROR'
        ? nestedLayer33.getBoolean('Disable')
        : undefined,
  };
})();
const __props: Record<string, unknown> = {};
if (variant && variant.type !== 'ERROR') {
  __props['variant'] = variant;
}
if (button && button.type !== 'ERROR') {
  __props['button'] = button;
}

export default {
  id: 'AlertActionAreaButton',
  imports: ["import { AlertActionAreaButton } from '@montage-ui/core';"],
  example: figma.code`<AlertActionAreaButton${figma.helpers.react.renderProp(
    'variant',
    variant,
  )}${figma.helpers.react.renderProp('disabled', button.disabled)}>
      ${figma.helpers.react.renderChildren(button.label)}
    </AlertActionAreaButton>`,
  metadata: { nestable: true, __props },
};
