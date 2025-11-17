import { figma } from '@figma/code-connect';

import { Chip } from '@wanteddev/wds';

figma.connect(Chip, '<FIGMA_CHIP>', {
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
  example: ({ children, ...props }) => <Chip {...props}>{children}</Chip>,
});
