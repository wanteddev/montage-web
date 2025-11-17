import { figma } from '@figma/code-connect';

import { Button } from '@wanteddev/wds';

figma.connect(Button, '<FIGMA_BUTTON>', {
  props: {
    variant: figma.enum('Variant', {
      Solid: 'solid',
      Outlined: 'outlined',
    }),
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
    color: figma.enum('Color', {
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
  example: ({ children, ...props }) => <Button {...props}>{children}</Button>,
});
