import { figma } from '@figma/code-connect';

import { PushBadge } from '@montage-ui/core';

figma.connect(PushBadge, '<FIGMA_PUSH_BADGE>', {
  props: {
    size: figma.enum('Size', {
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
    }),
    outlineBorder: figma.boolean('Outline Border'),
  },
  variant: {
    Variant: 'Dot',
  },
  example: (props) => <PushBadge variant="dot" {...props} />,
});

figma.connect(PushBadge, '<FIGMA_PUSH_BADGE>', {
  props: {
    text: figma.string('Text'),
    size: figma.enum('Size', {
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
    }),
    outlineBorder: figma.boolean('Outline Border'),
  },
  variant: {
    Variant: 'Text',
  },
  example: (props) => <PushBadge variant="text" {...props} />,
});

figma.connect(PushBadge, '<FIGMA_PUSH_BADGE>', {
  props: {
    size: figma.enum('Size', {
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
    }),
    outlineBorder: figma.boolean('Outline Border'),
  },
  variant: {
    Variant: 'Max Count',
  },
  example: (props) => (
    <PushBadge variant="max-count" text={100} maxCount={99} {...props} />
  ),
});
