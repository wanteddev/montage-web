import { figma } from '@figma/code-connect';

import { ContentBadge } from '@wanteddev/wds';

figma.connect(ContentBadge, '<FIGMA_CONTENT_BADGE>', {
  props: {
    children: figma.string('Text'),
    leadingContent: figma.boolean('Left Content', {
      true: figma.children('Left Content'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Right Content', {
      true: figma.children('Right Content'),
      false: undefined,
    }),
    color: figma.enum('Color', {
      Neutral: 'neutral',
      Accent: 'accent',
    }),
    size: figma.enum('Size', {
      Normal: 'normal',
      Medium: 'medium',
      Large: 'large',
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
