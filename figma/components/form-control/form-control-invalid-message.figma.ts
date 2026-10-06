// url=<FIGMA_FORM_CONTROL_INVALID_MESSAGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/form-control/index.tsx
// component=FormControlNegativeMessage

import figma from 'figma';

const children = figma.selectedInstance.getEnum('Description', {
  True: figma.selectedInstance.getString('┗ Invalid Text'),
  False: undefined,
});
const accessory = figma.selectedInstance.getEnum('Accessory', {
  True: figma.helpers.react.jsxElement(
    '<FormControlMessageAccessory\n            variant="character-counter"\n            length={0}\n            maxLength={100}\n          />',
  ),
  False: undefined,
});
const __props: Record<string, unknown> = {};
if (children && children.type !== 'ERROR') {
  __props['children'] = children;
}
if (accessory && accessory.type !== 'ERROR') {
  __props['accessory'] = accessory;
}

export default {
  id: 'FormControlNegativeMessage',
  imports: [
    `import { FormControlNegativeMessage${accessory ? ', FormControlMessageAccessory' : ''} } from '@montage-ui/core';`,
  ],
  example: figma.code`<FormControlNegativeMessage${figma.helpers.react.renderProp(
    'accessory',
    accessory,
  )}>
        ${figma.helpers.react.renderChildren(children)}
      </FormControlNegativeMessage>`,
  metadata: { nestable: true, __props },
};
