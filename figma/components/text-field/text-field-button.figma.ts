// url=<FIGMA_TEXT_FIELD_BUTTON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/text-field/index.tsx
// component=TextFieldButton

import figma from 'figma';

const children = figma.selectedInstance.getString('Label');
const disabled = figma.selectedInstance.getBoolean('Disable');
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}
if (disabled && disabled.type !== 'ERROR') {
  __props['disabled'] = disabled;
}

export default {
  id: 'TextFieldButton',
  imports: ["import { TextFieldButton } from '@montage-ui/core';"],
  example: figma.code`<TextFieldButton${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}>${figma.helpers.react.renderChildren(children)}</TextFieldButton>`,
  metadata: { nestable: true, __props },
};
