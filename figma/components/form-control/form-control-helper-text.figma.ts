// url=<FIGMA_FORM_CONTROL_HELPER_TEXT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/form-control/index.tsx
// component=FormControlMessage

import figma from 'figma';

const instance = figma.selectedInstance;

// Without a description the message renders only its accessory (if any).
const text =
  instance.getPropertyValue('Description') === 'True'
    ? instance.getString('┗ Text\u200B')
    : '';
const hasAccessory = instance.getPropertyValue('Accessory') === 'True';
const accessoryProp = hasAccessory
  ? ' accessory={<FormControlMessageAccessory variant="character-counter" length={0} maxLength={100} />}'
  : '';

export default {
  id: 'FormControlMessage',
  imports: [
    `import { FormControlMessage${hasAccessory ? ', FormControlMessageAccessory' : ''} } from '@montage-ui/core';`,
  ],
  example: text
    ? figma.tsx`<FormControlMessage${accessoryProp}>${text}</FormControlMessage>`
    : figma.tsx`<FormControlMessage${accessoryProp} />`,
  metadata: { nestable: true },
};
