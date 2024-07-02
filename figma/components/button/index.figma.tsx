import { figma } from '@figma/code-connect';

import { Button } from '@wanteddev/wds';

figma.connect(Button, '<FIGMA_BUTTON_SOLID_PRIMARY>', {
  props: {
    children: figma.boolean('Icon Only', {
      true: figma.children('Icon'),
      false: figma.string('Label'),
    }),
    leftIcon: figma.boolean('Left Icon', {
      true: figma.children('Left Icon'),
      false: undefined,
    }),
    rightIcon: figma.boolean('Right Icon', {
      true: figma.children('Right Icon'),
      false: undefined,
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
    <Button variant="solid" color="primary" {...props}>
      {children}
    </Button>
  ),
});
