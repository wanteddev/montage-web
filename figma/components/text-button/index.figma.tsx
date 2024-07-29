import { figma } from '@figma/code-connect';

import { TextButton } from '@wanteddev/wds';

figma.connect(TextButton, '<FIGMA_TEXT_BUTTON_PRIMARY>', {
  props: {
    children: figma.string('Label'),
    leftIcon: figma.boolean('Left Content', {
      true: figma.children('Left Content'),
      false: undefined,
    }),
    rightIcon: figma.boolean('Right Content', {
      true: figma.children('Right Content'),
      false: undefined,
    }),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
  },
  example: ({ children, ...props }) => (
    <TextButton variant="primary" {...props}>
      {children}
    </TextButton>
  ),
});

figma.connect(TextButton, '<FIGMA_TEXT_BUTTON_ASSISTIVE>', {
  props: {
    children: figma.string('Label'),
    leftIcon: figma.boolean('Left Content', {
      true: figma.children('Left Content'),
      false: undefined,
    }),
    rightIcon: figma.boolean('Right Content', {
      true: figma.children('Right Content'),
      false: undefined,
    }),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
  },
  example: ({ children, ...props }) => (
    <TextButton variant="assistive" {...props}>
      {children}
    </TextButton>
  ),
});
