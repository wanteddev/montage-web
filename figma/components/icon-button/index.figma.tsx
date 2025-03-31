import { figma } from '@figma/code-connect';

import { IconButton, PushBadge } from '@wanteddev/wds';

figma.connect(IconButton, '<FIGMA_ICON_BUTTON_NORMAL>', {
  props: {
    disabled: figma.boolean('Disable'),
    children: figma.children('Icon'),
  },
  variant: {
    Badge: false,
  },
  example: ({ children, ...props }) => (
    <IconButton variant="normal" {...props}>
      {children}
    </IconButton>
  ),
});

figma.connect(IconButton, '<FIGMA_ICON_BUTTON_NORMAL>', {
  props: {
    disabled: figma.boolean('Disable'),
    children: figma.children('Icon'),
  },
  variant: {
    Badge: true,
  },
  example: ({ children, ...props }) => (
    <IconButton variant="normal" {...props}>
      <PushBadge>{children}</PushBadge>
    </IconButton>
  ),
});

figma.connect(IconButton, '<FIGMA_ICON_BUTTON_BACKGROUND>', {
  props: {
    disabled: figma.boolean('Disable'),
    alternative: figma.boolean('Alternative'),
    children: figma.children('Icon'),
  },
  example: ({ children, ...props }) => (
    <IconButton variant="background" {...props}>
      {children}
    </IconButton>
  ),
});

figma.connect(IconButton, '<FIGMA_ICON_BUTTON_OUTLINED>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Medium: 'medium',
      Small: 'small',
      Custom: 28,
    }),
    nested: figma.nestedProps('Icon', {
      children: figma.instance('Icon'),
    }),
  },
  example: ({ nested, ...props }) => (
    <IconButton variant="outlined" {...props}>
      {nested.children}
    </IconButton>
  ),
});

figma.connect('<FIGMA_ICON_BUTTON_SOLID>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Medium: 'medium',
      Small: 'small',
      Custom: 28,
    }),
    nested: figma.nestedProps('Icon', {
      children: figma.instance('Icon'),
    }),
  },
  example: ({ nested, ...props }) => (
    <IconButton variant="solid" {...props}>
      {nested.children}
    </IconButton>
  ),
});
