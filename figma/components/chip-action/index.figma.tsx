import { figma } from '@figma/code-connect';

import { ChipAction } from '@wanteddev/wds';

figma.connect(ChipAction, '<FIGMA_CHIP_ACTION>', {
  props: {
    children: figma.string('Text'),
    leadingContent: figma.boolean('Leading Content', {
      true: figma.children('Leading Content'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Trailing Content', {
      true: figma.children('Trailing Content'),
      false: undefined,
    }),
    disabled: figma.boolean('Disable'),
    active: figma.boolean('Active'),
    size: figma.enum('Size', {
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    variant: figma.enum('Variant', {
      Solid: 'solid',
      Outlined: 'outlined',
    }),
  },
  example: ({ children, ...props }) => (
    <ChipAction {...props}>{children}</ChipAction>
  ),
});
