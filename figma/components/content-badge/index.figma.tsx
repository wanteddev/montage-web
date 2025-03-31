import { figma } from '@figma/code-connect';

import { ContentBadge } from '@wanteddev/wds';

figma.connect(ContentBadge, '<FIGMA_CONTENT_BADGE>', {
  props: {
    children: figma.string('Text'),
    leadingContent: figma.boolean('Leading Icon', {
      true: figma.children('Leading Icon'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Trailing Icon', {
      true: figma.children('Trailing Icon'),
      false: undefined,
    }),
    color: figma.enum('Color', {
      Neutral: 'neutral',
      Accent: 'accent',
    }),
    size: figma.enum('Size', {
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
    }),
    variant: figma.enum('Variant', {
      Solid: 'solid',
      Outlined: 'outlined',
    }),
  },
  example: ({ children, ...props }) => (
    <ContentBadge {...props}>{children}</ContentBadge>
  ),
});
