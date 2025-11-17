import { figma } from '@figma/code-connect';

import { TextButton } from '@wanteddev/wds';

figma.connect(TextButton, '<FIGMA_TEXT_BUTTON>', {
  props: {
    children: figma.string('Label'),
    leadingContent: figma.boolean('Leading Icon', {
      true: figma.children('Leading Icon'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Trailing Icon', {
      true: figma.children('Trailing Icon'),
      false: undefined,
    }),
    color: figma.enum('Color', {
      Primary: 'primary',
      Assistive: 'assistive',
    }),
    loading: figma.boolean('Loading'),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
  },
  example: ({ children, ...props }) => (
    <TextButton {...props}>{children}</TextButton>
  ),
});
