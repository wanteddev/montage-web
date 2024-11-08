import { figma } from '@figma/code-connect';

import { Avatar, AvatarGroup } from '@wanteddev/wds';

figma.connect('<FIGMA_AVATAR_GROUP>', {
  props: {
    size: figma.enum('Size', {
      XSmall: 'xsmall',
      Small: 'small',
    }),
    variant: figma.enum('Variant', {
      Person: 'person',
      Company: 'company',
      Academic: 'academic',
    }),
  },
  example: ({ size, variant }) => (
    <AvatarGroup size={size}>
      <Avatar variant={variant} />
      <Avatar variant={variant} />
      <Avatar variant={variant} />
      <Avatar variant={variant} />
      <Avatar variant={variant} />
    </AvatarGroup>
  ),
});
