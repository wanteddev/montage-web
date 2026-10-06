import { figma } from '@figma/code-connect';

import { Avatar, AvatarGroup } from '@montage-ui/core';

figma.connect('<FIGMA_AVATAR_GROUP>', {
  props: {
    size: figma.enum('Size', {
      XSmall: 'xsmall',
      Small: 'small',
    }),
    trailingContent: figma.boolean('Trailing Content', {
      true: figma.children('Trailing Content'),
      false: undefined,
    }),
  },
  example: ({ size, ...props }) => (
    <AvatarGroup size={size} {...props}>
      <Avatar size={size} />
      <Avatar size={size} />
      <Avatar size={size} />
      <Avatar size={size} />
      <Avatar size={size} />
    </AvatarGroup>
  ),
});
