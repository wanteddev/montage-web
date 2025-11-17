import { figma } from '@figma/code-connect';

import { FilterButton } from '@wanteddev/wds';

figma.connect(FilterButton, '<FIGMA_FILTER_BUTTON>', {
  props: {
    children: figma.string('Label'),
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
    <FilterButton {...props}>{children}</FilterButton>
  ),
});

figma.connect(FilterButton, '<FIGMA_FILTER_BUTTON>', {
  props: {
    children: figma.string('Label'),
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
    <FilterButton expanded {...props}>
      {children}
    </FilterButton>
  ),
});
