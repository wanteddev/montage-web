import { figma } from '@figma/code-connect';

import { Avatar } from '@wanteddev/wds';

figma.connect('<FIGMA_AVATAR>', {
  props: {
    size: figma.enum('Size', {
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      XLarge: 'xlarge',
    }),
    variant: figma.enum('Variant', {
      Person: 'person',
      Company: 'company',
      Academy: 'academy',
    }),
  },
  variant: { Interaction: false, 'Push Badge': false },
  example: (props) => <Avatar {...props} />,
});
