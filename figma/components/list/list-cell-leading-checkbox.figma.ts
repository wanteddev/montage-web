// url=<FIGMA_LIST_CELL_LEADING_CHECKBOX>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCellContent

import figma from 'figma';

// `ListCellContent variant="checkbox"` already provides `tight`, and the cell owns
// focus, so the control gets `tabIndex={-1}` (docs: List cell › Checkbox).
const checkbox = figma.selectedInstance.findInstance('Checkbox');
const state =
  checkbox.type === 'ERROR' ? undefined : checkbox.getPropertyValue('State');
const props =
  checkbox.type === 'ERROR'
    ? ''
    : (state === 'Checked' ? ' defaultChecked' : '') +
      (state === 'Indeterminate' ? ' indeterminate' : '') +
      (checkbox.getPropertyValue('Size') === 'Small' ? ' size="small"' : '') +
      (checkbox.getPropertyValue('Disable') === 'True' ? ' disabled' : '');
const children = figma.tsx`<Checkbox tabIndex={-1}${props} />`;

export default {
  id: 'ListCellContent',
  imports: ["import { Checkbox, ListCellContent } from '@montage-ui/core';"],
  example: figma.tsx`<ListCellContent variant="checkbox">${children}</ListCellContent>`,
  metadata: {
    nestable: true,
    props: {
      variant: 'checkbox',
      imports: ["import { Checkbox } from '@montage-ui/core';"],
    },
    __props: { children },
  },
};
