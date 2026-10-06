// url=<FIGMA_SWITCH_RESOURCE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/switch/index.tsx
// component=Switch

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
});
const checked = figma.selectedInstance.getBoolean('Active');
const disabled = figma.selectedInstance.getBoolean('Disable');
const __props: Record<string, unknown> = {};
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}
if (checked && checked.type !== 'ERROR') {
  __props['checked'] = checked;
}
if (disabled && disabled.type !== 'ERROR') {
  __props['disabled'] = disabled;
}

export default {
  id: 'Switch',
  imports: ["import { Switch } from '@montage-ui/core';"],
  example: figma.code`<Switch${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'defaultChecked',
    checked,
  )}${figma.helpers.react.renderProp('disabled', disabled)}/>`,
  metadata: { nestable: true, __props },
};
