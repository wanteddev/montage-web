import { figma } from '@figma/code-connect';

import { ChipFilter } from '@wanteddev/wds';

figma.connect(ChipFilter, '<FIGMA_CHIP_FILTER>', {
  props: {
    children: figma.string('Label'),
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
      Outline: 'outlined',
    }),
    activeLabel: figma.boolean('Active', {
      true: figma.boolean('Active Label', {
        true: figma.string('┗ Text'),
        false: undefined,
      }),
      false: undefined,
    }),
  },
  variant: {
    State: 'Normal',
  },
  example: ({ children, ...props }) => (
    <ChipFilter {...props}>{children}</ChipFilter>
  ),
});

figma.connect(ChipFilter, '<FIGMA_CHIP_FILTER>', {
  props: {
    children: figma.string('Label'),
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
    activeLabel: figma.boolean('Active', {
      true: figma.boolean('Active Label', {
        true: figma.string('┗ Text'),
        false: undefined,
      }),
      false: undefined,
    }),
  },
  variant: {
    State: 'Expand',
  },
  example: ({ children, ...props }) => (
    <ChipFilter expanded {...props}>
      {children}
    </ChipFilter>
  ),
});
