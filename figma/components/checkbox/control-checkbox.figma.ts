// url=<FIGMA_CONTROL_CHECKBOX>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/checkbox/index.tsx
// component=Checkbox

import figma from 'figma';

const state = figma.selectedInstance.getEnum('State', {
  Checked: ' defaultChecked',
  Unchecked: '',
  Indeterminate: ' indeterminate',
});
const disabled = figma.selectedInstance.getBoolean('Disable');
const size = figma.selectedInstance.getEnum('Size', {
  Normal: 'medium',
  Small: 'small',
});
const tight = figma.selectedInstance.getBoolean('Tight');

export default {
  id: 'Checkbox',
  imports: ["import { Checkbox } from '@montage-ui/core';"],
  example: figma.code`<Checkbox${state ?? ''}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'tight',
    tight,
  )}${figma.helpers.react.renderProp('disabled', disabled)} />`,
  metadata: { nestable: true, __props: { disabled, size, tight } },
};
