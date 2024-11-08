import { figma } from '@figma/code-connect';

import { IconButton } from '@wanteddev/wds';

figma.connect(IconButton, '<FIGMA_ICON_BUTTON_NORMAL>', {
  props: {
    disabled: figma.boolean('Disable'),
    pushBadge: figma.boolean('Badge'),
    children: figma.children('Icon/Icons'),
  },
  example: ({ children, ...props }) => (
    <IconButton variant="normal" {...props}>
      {children}
    </IconButton>
  ),
});

figma.connect(IconButton, '<FIGMA_ICON_BUTTON_BACKGROUND>', {
  props: {
    disabled: figma.boolean('Disable'),
    alternative: figma.boolean('Alternative'),
    children: figma.children('Icon/Icons'),
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
      Normal: 'normal',
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
      Normal: 'normal',
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
