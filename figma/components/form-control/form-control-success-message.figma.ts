// url=<FIGMA_FORM_CONTROL_SUCCESS_MESSAGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/form-control/index.tsx
// component=FormControlPositiveMessage

import figma from 'figma';

const instance = figma.selectedInstance;

// Without a description the message renders only its accessory (if any).
const text =
  instance.getPropertyValue('Description') === 'True'
    ? instance.getString('┗ Success Text')
    : '';
const hasAccessory = instance.getPropertyValue('Accessory') === 'True';
const accessoryProp = hasAccessory
  ? ' accessory={<FormControlMessageAccessory variant="character-counter" length={0} maxLength={100} />}'
  : '';

export default {
  id: 'FormControlPositiveMessage',
  imports: [
    `import { FormControlPositiveMessage${hasAccessory ? ', FormControlMessageAccessory' : ''} } from '@montage-ui/core';`,
  ],
  example: text
    ? figma.tsx`<FormControlPositiveMessage${accessoryProp}>${text}</FormControlPositiveMessage>`
    : figma.tsx`<FormControlPositiveMessage${accessoryProp} />`,
  metadata: { nestable: true },
};
