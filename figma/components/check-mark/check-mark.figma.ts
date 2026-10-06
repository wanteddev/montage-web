// url=<FIGMA_CHECK_MARK>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/check-mark/index.tsx
// component=CheckMark

import figma from 'figma';

const instance = figma.selectedInstance;

const state = instance.getPropertyValue('State');
const size = instance.getEnum('Size', {
  Medium: 'medium',
  Small: 'small',
});
const tight = instance.getBoolean('Tight') === true;
const disabled = instance.getBoolean('Disable') === true;
const label =
  instance.getBoolean('Label') === true
    ? instance.getString('┗ Text\u200B')
    : '';

// Uncontrolled checked state, as in the docs.
const control = `<CheckMark${state === 'Checked' ? ' defaultChecked' : ''}${
  size ? ` size="${size}"` : ''
}${disabled ? ' disabled' : ''}${tight ? ' tight' : ''} />`;

// Labeled controls use FormControl; without a label only the control remains.
export default {
  id: 'CheckMark',
  imports: [
    label
      ? "import { CheckMark, FormControl, FormControlField, FormControlLabel } from '@montage-ui/core';"
      : "import { CheckMark } from '@montage-ui/core';",
  ],
  example: label
    ? figma.tsx`<FormControl flexDirection="row" gap="${tight ? '6px' : '4px'}">
  <FormControlField>
    ${control}
  </FormControlField>
  <FormControlLabel>${label}</FormControlLabel>
</FormControl>`
    : figma.tsx`${control}`,
  metadata: { nestable: true },
};
