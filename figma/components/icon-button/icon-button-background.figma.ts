// url=<FIGMA_ICON_BUTTON_BACKGROUND>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/icon-button/index.tsx
// component=IconButton

import figma from 'figma';

const disabled = figma.selectedInstance.getBoolean('Disable');
const alternative = figma.selectedInstance.getBoolean('Alternative');
const children = figma.properties.children(['Icon']);
const __props: Record<string, unknown> = {};
if (disabled && disabled.type !== 'ERROR') {
  __props['disabled'] = disabled;
}
if (alternative && alternative.type !== 'ERROR') {
  __props['alternative'] = alternative;
}
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}

export default {
  id: 'IconButton',
  imports: ["import { IconButton } from '@montage-ui/core';"],
  example: figma.code`<IconButton variant="background"${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp('alternative', alternative)}>
      ${figma.helpers.react.renderChildren(children)}
    </IconButton>`,
  metadata: { nestable: true, __props },
};
