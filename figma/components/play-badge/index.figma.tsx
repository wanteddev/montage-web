import { figma } from '@figma/code-connect';

import { PlayBadge } from '@montage-ui/core';

figma.connect(PlayBadge, '<FIGMA_PLAY_BADGE>', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    alternative: figma.boolean('Alternative'),
  },
  example: (props) => <PlayBadge {...props} />,
});
