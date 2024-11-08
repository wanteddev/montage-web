import { figma } from '@figma/code-connect';

import { PushBadge } from '@wanteddev/wds';

figma.connect(PushBadge, '<FIGMA_PUSH_BADGE>', {
  props: {
    variant: figma.enum('Type', {
      Dot: 'dot',
      New: 'new',
    }),
  },
  example: (props) => <PushBadge {...props} />,
});

figma.connect(PushBadge, '<FIGMA_PUSH_BADGE>', {
  props: {
    children: figma.string('Number'),
  },
  variant: {
    Type: 'Number',
  },
  example: ({ children, ...props }) => (
    <PushBadge variant="number" {...props}>
      {children}
    </PushBadge>
  ),
});
