// url=<FIGMA_MODAL_PRESET_AGREEMENT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=FlexBox

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import { joinParts } from './modal-helpers';

// "Agree to all" checkbox, a divider, then one row per term:
// a checkbox with a trailing text button (e.g. "보기").
const instance = figma.selectedInstance;
const checkboxes = instance
  .findConnectedInstances((layer) => layer.name === 'Control/Checkbox')
  .filter((layer) => layer.type !== 'ERROR');
const buttons = instance
  .findConnectedInstances((layer) => layer.name === 'Text Button/Text Button')
  .filter((layer) => layer.type !== 'ERROR');

const [all, ...terms] = checkboxes;
const rows = terms.map((checkbox, index) => {
  const button = buttons[index];
  return figma.tsx`<FlexBox gap="16px" alignItems="center" justifyContent="space-between">
  ${checkbox.executeTemplate().example}
  ${button ? button.executeTemplate().example : ''}
</FlexBox>`;
});

export default finalizeTemplate({
  id: 'ModalPresetAgreement',
  imports: ["import { Divider, FlexBox } from '@montage-ui/core';"],
  example: figma.tsx`<FlexBox flexDirection="column" gap="20px">
${all ? all.executeTemplate().example : ''}
<Divider />
<FlexBox flexDirection="column" gap="16px">
${joinParts(rows) ?? ''}
</FlexBox>
</FlexBox>`,
  metadata: { nestable: true },
});
