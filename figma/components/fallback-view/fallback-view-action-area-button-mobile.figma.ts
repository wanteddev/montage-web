// url=<FIGMA_FALLBACK_VIEW_ACTION_AREA_BUTTON_MOBILE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/fallback-view/index.tsx
// component=FallbackViewActionAreaButton

import figma from 'figma';

const button = (function () {
  const nestedLayer24 = figma.selectedInstance.findInstance('Button/Button');
  return {
    label:
      nestedLayer24.type !== 'ERROR'
        ? nestedLayer24.getString('Label')
        : undefined,
    disabled:
      nestedLayer24.type !== 'ERROR'
        ? nestedLayer24.getBoolean('Disable')
        : undefined,
    loading:
      nestedLayer24.type !== 'ERROR'
        ? nestedLayer24.getBoolean('Loading')
        : undefined,
  };
})();
const __props: Record<string, unknown> = {};
if (button && button.type !== 'ERROR') {
  __props['button'] = button;
}

export default {
  id: 'FallbackViewActionAreaButton',
  imports: ["import { FallbackViewActionAreaButton } from '@montage-ui/core';"],
  example: figma.code`<FallbackViewActionAreaButton${figma.helpers.react.renderProp(
    'disabled',
    button.disabled,
  )}${figma.helpers.react.renderProp('loading', button.loading)}>
        ${figma.helpers.react.renderChildren(button.label)}
      </FallbackViewActionAreaButton>`,
  metadata: { nestable: true, __props },
};
