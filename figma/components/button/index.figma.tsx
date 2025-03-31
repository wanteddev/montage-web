import { figma } from '@figma/code-connect';

import { Button } from '@wanteddev/wds';

figma.connect(Button, '<FIGMA_BUTTON_SOLID>', {
  props: {
    children: figma.boolean('Icon Only', {
      true: figma.children('Icon'),
      false: figma.string('Label'),
    }),
    loading: figma.boolean('Loading'),
    leadingContent: figma.boolean('Leading Icon', {
      true: figma.children('Leading Icon'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Trailing Icon', {
      true: figma.children('Trailing Icon'),
      false: undefined,
    }),
    color: figma.enum('Variant', {
      Primary: 'primary',
      Assistive: 'assistive',
    }),
    iconOnly: figma.boolean('Icon Only'),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: ({ children, ...props }) => (
    <Button variant="solid" {...props}>
      {children}
    </Button>
  ),
});

figma.connect(Button, '<FIGMA_BUTTON_OUTLINED>', {
  props: {
    children: figma.boolean('Icon Only', {
      true: figma.children('Icon'),
      false: figma.string('Label'),
    }),
    leadingContent: figma.boolean('Leading Icon', {
      true: figma.children('Leading Icon'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Trailing Icon', {
      true: figma.children('Trailing Icon'),
      false: undefined,
    }),
    loading: figma.boolean('Loading'),
    color: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Assistive: 'assistive',
    }),
    iconOnly: figma.boolean('Icon Only'),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: ({ children, ...props }) => (
    <Button variant="outlined" {...props}>
      {children}
    </Button>
  ),
});
