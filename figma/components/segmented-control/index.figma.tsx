import { figma } from '@figma/code-connect';

import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';

figma.connect(SegmentedControl, '<FIGMA_SEGMENTED_CONTROL>', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    iconOnly: figma.boolean('Icon Only'),
    segment3: figma.boolean('Segment 3', {
      true: <SegmentedControlItem value="3">텍스트</SegmentedControlItem>,
      false: undefined,
    }),
    segment4: figma.boolean('Segment 4', {
      true: <SegmentedControlItem value="4">텍스트</SegmentedControlItem>,
      false: undefined,
    }),
    segment5: figma.boolean('Segment 5', {
      true: <SegmentedControlItem value="5">텍스트</SegmentedControlItem>,
      false: undefined,
    }),
    segment6: figma.boolean('Segment 6', {
      true: <SegmentedControlItem value="6">텍스트</SegmentedControlItem>,
      false: undefined,
    }),
  },
  example: ({ segment3, segment4, segment5, segment6, ...props }) => (
    <SegmentedControl defaultValue="1" {...props}>
      <SegmentedControlItem value="1">텍스트</SegmentedControlItem>
      <SegmentedControlItem value="2">텍스트</SegmentedControlItem>
      {segment3}
      {segment4}
      {segment5}
      {segment6}
    </SegmentedControl>
  ),
});
