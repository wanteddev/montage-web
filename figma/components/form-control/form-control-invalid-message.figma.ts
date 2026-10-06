// url=<FIGMA_FORM_CONTROL_INVALID_MESSAGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/form-control/index.tsx
// component=FormControlNegativeMessage

import figma from 'figma';

const instance = figma.selectedInstance;

// Without a description the message renders only its accessory (if any).
const text =
  instance.getPropertyValue('Description') === 'True'
    ? instance.getString('┗ Invalid Text')
    : '';
const hasAccessory = instance.getPropertyValue('Accessory') === 'True';
const accessoryProp = hasAccessory
  ? ' accessory={<FormControlMessageAccessory variant="character-counter" length={0} maxLength={100} />}'
  : '';

export default {
  id: 'FormControlNegativeMessage',
  imports: [
    `import { FormControlNegativeMessage${hasAccessory ? ', FormControlMessageAccessory' : ''} } from '@montage-ui/core';`,
  ],
  example: text
    ? figma.tsx`<FormControlNegativeMessage${accessoryProp}>${text}</FormControlNegativeMessage>`
    : figma.tsx`<FormControlNegativeMessage${accessoryProp} />`,
  metadata: { nestable: true },
};
