// url=<FIGMA_CHECKBOX>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/checkbox/index.tsx
// component=Checkbox

import figma from 'figma';

const instance = figma.selectedInstance;

const state = instance.getPropertyValue('State');
const size = instance.getEnum('Size', {
  Medium: 'medium',
  Small: 'small',
});
const tight = instance.getBoolean('Tight') === true;
const disabled = instance.getBoolean('Disable') === true;
const bold = instance.getBoolean('Bold') === true;
const label =
  instance.getBoolean('Label') === true
    ? instance.getString('┗ Text\u200B')
    : '';

// Uncontrolled checked state, as in the docs.
const control = `<Checkbox${state === 'Checked' ? ' defaultChecked' : ''}${state === 'Indeterminate' ? ' indeterminate' : ''}${
  size ? ` size="${size}"` : ''
}${disabled ? ' disabled' : ''}${bold ? ' bold' : ''}${tight ? ' tight' : ''} />`;

// Labeled controls use FormControl; without a label only the control remains.
export default {
  id: 'Checkbox',
  imports: [
    label
      ? "import { Checkbox, FormControl, FormControlField, FormControlLabel } from '@montage-ui/core';"
      : "import { Checkbox } from '@montage-ui/core';",
  ],
  example: label
    ? figma.tsx`<FormControl flexDirection="row" gap="${tight ? '10px' : '8px'}">
  <FormControlField>
    ${control}
  </FormControlField>
  <FormControlLabel>${label}</FormControlLabel>
</FormControl>`
    : figma.tsx`${control}`,
  metadata: { nestable: true },
};
