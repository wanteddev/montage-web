import { figma } from '@figma/code-connect';

import { ChipAction } from '@wanteddev/wds';

figma.connect(ChipAction, '<FIGMA_CHIP_ACTION>', {
  props: {
    children: figma.string('Text'),
    leftContent: figma.boolean('Left Content', {
      true: figma.children('Left Content'),
      false: undefined,
    }),
    rightContent: figma.boolean('Right Content', {
      true: figma.children('Right Content'),
      false: undefined,
    }),
    disabled: figma.boolean('Disable'),
    active: figma.boolean('Active'),
    size: figma.enum('Size', {
      Normal: 'normal',
      XSmall: 'xsmall',
      Small: 'small',
      Large: 'large',
    }),
    variant: figma.enum('Variant', {
      Filled: 'filled',
      Outlined: 'outlined',
    }),
  },
  example: ({ children, ...props }) => (
    <ChipAction {...props}>{children}</ChipAction>
  ),
});
