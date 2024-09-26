import { figma } from '@figma/code-connect';

import { Button } from '@wanteddev/wds';

figma.connect(Button, '<FIGMA_BUTTON_SOLID_PRIMARY>', {
  props: {
    children: figma.boolean('Icon Only', {
      true: figma.children('Icon'),
      false: figma.string('Label'),
    }),
    leftContent: figma.boolean('Left Content', {
      true: figma.children('Left Content'),
      false: undefined,
    }),
    rightContent: figma.boolean('Right Content', {
      true: figma.children('Right Content'),
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

figma.connect(Button, '<FIGMA_BUTTON_SOLID_ASSISTIVE>', {
  props: {
    children: figma.boolean('Icon Only', {
      true: figma.children('Icon'),
      false: figma.string('Label'),
    }),
    leftContent: figma.boolean('Left Content', {
      true: figma.children('Left Content'),
      false: undefined,
    }),
    rightContent: figma.boolean('Right Content', {
      true: figma.children('Right Content'),
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
    <Button variant="solid" color="assistive" {...props}>
      {children}
    </Button>
  ),
});

figma.connect(Button, '<FIGMA_BUTTON_OUTLINED_PRIMARY>', {
  props: {
    children: figma.boolean('Icon Only', {
      true: figma.children('Icon'),
      false: figma.string('Label'),
    }),
    leftContent: figma.boolean('Left Content', {
      true: figma.children('Left Content'),
      false: undefined,
    }),
    rightContent: figma.boolean('Right Content', {
      true: figma.children('Right Content'),
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
    <Button variant="outlined" color="primary" {...props}>
      {children}
    </Button>
  ),
});

figma.connect(Button, '<FIGMA_BUTTON_OUTLINED_SECONDARY>', {
  props: {
    children: figma.boolean('Icon Only', {
      true: figma.children('Icon'),
      false: figma.string('Label'),
    }),
    leftContent: figma.boolean('Left Content', {
      true: figma.children('Left Content'),
      false: undefined,
    }),
    rightContent: figma.boolean('Right Content', {
      true: figma.children('Right Content'),
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
    <Button variant="outlined" color="secondary" {...props}>
      {children}
    </Button>
  ),
});

figma.connect(Button, '<FIGMA_BUTTON_OUTLINED_ASSISTIVE>', {
  props: {
    children: figma.boolean('Icon Only', {
      true: figma.children('Icon'),
      false: figma.string('Label'),
    }),
    leftContent: figma.boolean('Left Content', {
      true: figma.children('Left Content'),
      false: undefined,
    }),
    rightContent: figma.boolean('Right Content', {
      true: figma.children('Right Content'),
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
    <Button variant="outlined" color="assistive" {...props}>
      {children}
    </Button>
  ),
});
