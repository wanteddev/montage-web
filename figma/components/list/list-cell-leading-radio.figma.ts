// url=<FIGMA_LIST_CELL_LEADING_RADIO>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list/index.tsx
// component=ListCellContent

import figma from 'figma';

// The radio in a list cell is a `RadioGroupItem`: the list is wrapped in a
// `RadioGroup`, which owns the selection (`defaultValue`), so the Figma
// `Checked` state is not expressed on the item. The parent cell template
// replaces the placeholder `value` with the cell label (`metadata.props.radioItem`).
// `ListCellContent variant="radio"` provides the spacing and the cell owns focus.
const radio = figma.selectedInstance.findInstance('Radio');
const radioItem =
  radio.type === 'ERROR'
    ? ''
    : (radio.getPropertyValue('Size') === 'Small' ? ' size="small"' : '') +
      (radio.getPropertyValue('Disable') === 'True' ? ' disabled' : '');
const children = figma.tsx`<RadioGroupItem value="value" tabIndex={-1}${radioItem} />`;

export default {
  id: 'ListCellContent',
  imports: [
    "import { ListCellContent, RadioGroupItem } from '@montage-ui/core';",
  ],
  example: figma.tsx`<ListCellContent variant="radio">${children}</ListCellContent>`,
  metadata: {
    nestable: true,
    props: {
      variant: 'radio',
      radioItem,
      imports: ["import { RadioGroupItem } from '@montage-ui/core';"],
    },
    __props: { children },
  },
};
