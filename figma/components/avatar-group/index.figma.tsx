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
      Academy: 'academy',
    }),
    trailingContent: figma.boolean('Trailing Content', {
      true: figma.children('Trailing Content'),
      false: undefined,
    }),
  },
  example: ({ size, variant, ...props }) => (
    <AvatarGroup size={size} {...props}>
      <Avatar size={size} variant={variant} />
      <Avatar size={size} variant={variant} />
      <Avatar size={size} variant={variant} />
      <Avatar size={size} variant={variant} />
      <Avatar size={size} variant={variant} />
    </AvatarGroup>
  ),
});
