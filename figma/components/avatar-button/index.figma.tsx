import { figma } from '@figma/code-connect';

import { Avatar, AvatarButton } from '@wanteddev/wds';

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
    pushBadge: figma.boolean('Push Badge'),
  },
  variant: { Interaction: true },
  example: ({ pushBadge, ...props }) => (
    <AvatarButton pushBadge={pushBadge}>
      <Avatar variant="person" {...props} />
    </AvatarButton>
  ),
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
    pushBadge: figma.boolean('Push Badge'),
  },
  variant: { Interaction: true },
  example: ({ pushBadge, ...props }) => (
    <AvatarButton pushBadge={pushBadge}>
      <Avatar variant="company" {...props} />
    </AvatarButton>
  ),
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
    pushBadge: figma.boolean('Push Badge'),
  },
  variant: { Interaction: true },
  example: ({ pushBadge, ...props }) => (
    <AvatarButton pushBadge={pushBadge}>
      <Avatar variant="academic" {...props} />
    </AvatarButton>
  ),
});
