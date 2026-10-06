// url=<FIGMA_MODAL_PRESET_INFO>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=FlexBox

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import { joinParts } from './modal-helpers';

// Info list rows (icon + text) in the `Info List` slot. Text: Body 2 Reading
// Medium, Label/Neutral; rows and list use a 6px gap.
const instance = figma.selectedInstance;
const icons = instance
  .findConnectedInstances((layer) => layer.name === 'Icons/Icons')
  .filter((icon) => icon.type !== 'ERROR');
const texts = instance
  .findLayers((layer) => layer.type === 'TEXT' && layer.name === 'Text')
  .filter((text) => text.type === 'TEXT');

const rows = texts.map((text, index) => {
  const icon = icons[index];
  return figma.tsx`<FlexBox gap="6px" alignItems="center">
  ${icon ? icon.executeTemplate().example : ''}
  <Typography variant="body2-reading" weight="medium" color="semantic.foreground.neutral.secondary">
    ${text.type === 'TEXT' ? text.textContent : ''}
  </Typography>
</FlexBox>`;
});

export default finalizeTemplate({
  id: 'ModalPresetInfo',
  imports: ["import { FlexBox, Typography } from '@montage-ui/core';"],
  example: figma.tsx`<FlexBox flexDirection="column" gap="6px">
${joinParts(rows) ?? ''}
</FlexBox>`,
  metadata: { nestable: true },
});
