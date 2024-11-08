import { figma } from '@figma/code-connect';

import { Avatar } from '@wanteddev/wds';

figma.connect('<FIGMA_AVATAR_PERSON>', {
  props: {
    size: figma.enum('Size', {
      Custom: 24,
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      XLarge: 'xlarge',
    }),
  },
  variant: { Interaction: false },
  example: (props) => <Avatar variant="person" {...props} />,
});

figma.connect('<FIGMA_AVATAR_COMPANY>', {
  props: {
    size: figma.enum('Size', {
      Custom: 24,
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      XLarge: 'xlarge',
    }),
  },
  variant: { Interaction: false },
  example: (props) => <Avatar variant="company" {...props} />,
});

figma.connect('<FIGMA_AVATAR_ACADEMIC>', {
  props: {
    size: figma.enum('Size', {
      Custom: 24,
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      XLarge: 'xlarge',
    }),
  },
  variant: { Interaction: false },
  example: (props) => <Avatar variant="academic" {...props} />,
});
