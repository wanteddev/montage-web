// url=<FIGMA_RADIO>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/radio-group/index.tsx
// component=RadioGroupItem

import figma from 'figma';

// `RadioGroupItem` only works inside `RadioGroup`; the checked state is
// expressed through the group's uncontrolled `defaultValue`.
const checked = figma.selectedInstance.getPropertyValue('State') === 'Checked';
const size = figma.selectedInstance.getEnum('Size', {
  Medium: 'medium',
  Small: 'small',
});
const disabled = figma.selectedInstance.getBoolean('Disable');
const tight = figma.selectedInstance.getBoolean('Tight');
const label =
  figma.selectedInstance.getBoolean('Label') === true
    ? figma.selectedInstance.getString('┗ Text​')
    : '';

const itemProps =
  (size ? ` size="${size}"` : '') +
  (disabled ? ' disabled' : '') +
  (tight ? ' tight' : '');

const item = `<RadioGroupItem value="1"${itemProps} />`;

// Labeled radios use FormControl; without a label only the item remains.
export default {
  id: 'RadioGroupItem',
  imports: [
    label
      ? "import { FormControl, FormControlField, FormControlLabel, RadioGroup, RadioGroupItem } from '@montage-ui/core';"
      : "import { RadioGroup, RadioGroupItem } from '@montage-ui/core';",
  ],
  example: label
    ? figma.tsx`<RadioGroup${checked ? ' defaultValue="1"' : ''}>
  <FormControl flexDirection="row" gap="${tight ? '10px' : '8px'}">
    <FormControlField>
      ${item}
    </FormControlField>
    <FormControlLabel>${label}</FormControlLabel>
  </FormControl>
</RadioGroup>`
    : figma.tsx`<RadioGroup${checked ? ' defaultValue="1"' : ''}>
  ${item}
</RadioGroup>`,
  metadata: { nestable: true },
};
