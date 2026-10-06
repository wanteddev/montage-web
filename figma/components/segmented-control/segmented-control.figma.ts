// url=<FIGMA_SEGMENTED_CONTROL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/segmented-control/index.tsx
// component=SegmentedControl

import figma from 'figma';

import { joinTemplates } from '../../helpers/list-cell';

const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
});
const iconOnly = figma.selectedInstance.getBoolean('Icon Only');
const withIcon =
  figma.selectedInstance.getPropertyValue('Leading Icon') === 'True';

// Segments 1-2 are always shown, 3-6 are toggled by `Segment N` booleans.
const segments = [1, 2, 3, 4, 5, 6].filter(
  (index) =>
    index <= 2 || figma.selectedInstance.getBoolean(`Segment ${index}`),
);

let defaultValue = '0';
const items = segments.map((index, position) => {
  const value = String(position);
  const knob = figma.selectedInstance.findInstance(`Segment ${index}`);
  if (knob.type === 'ERROR') {
    return figma.tsx`<SegmentedControlItem value="${value}" />`;
  }

  if (knob.getPropertyValue('Active') === 'True') {
    defaultValue = value;
  }

  const label = knob.getString('Text');
  const icon = knob.findInstance('Icon');
  const iconCode =
    (withIcon || iconOnly) && icon.type !== 'ERROR'
      ? icon.executeTemplate().example
      : undefined;

  if (iconOnly) {
    return figma.tsx`<SegmentedControlItem value="${value}" aria-label=${JSON.stringify(
      label,
    )}>
  ${iconCode ?? ''}
</SegmentedControlItem>`;
  }

  return iconCode
    ? figma.tsx`<SegmentedControlItem value="${value}" leadingIcon={${iconCode}}>
  ${label}
</SegmentedControlItem>`
    : figma.tsx`<SegmentedControlItem value="${value}">
  ${label}
</SegmentedControlItem>`;
});

export default {
  id: 'SegmentedControl',
  imports: [
    "import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';",
  ],
  example: figma.tsx`<SegmentedControl defaultValue="${defaultValue}"${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('iconOnly', iconOnly)}>
  ${joinTemplates(items)}
</SegmentedControl>`,
  metadata: { nestable: true },
};
