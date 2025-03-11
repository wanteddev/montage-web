import { figma } from '@figma/code-connect';

import { Avatar, AvatarButton, PushBadge } from '@wanteddev/wds';

figma.connect('<FIGMA_AVATAR>', {
  props: {
    size: figma.enum('Size', {
      Custom: 24,
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      XLarge: 'xlarge',
    }),
    variant: figma.enum('Variant', {
      Person: 'person',
      Company: 'company',
      academy: 'Academy',
    }),
  },
  variant: { Interaction: true, 'Push Badge': true },
  example: (props) => (
    <AvatarButton>
      <PushBadge variant="dot">
        <Avatar {...props} />
      </PushBadge>
    </AvatarButton>
  ),
});
