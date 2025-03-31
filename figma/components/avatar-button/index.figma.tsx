import { figma } from '@figma/code-connect';

import { Avatar, AvatarButton, PushBadge } from '@wanteddev/wds';

figma.connect('<FIGMA_AVATAR>', {
  props: {
    variant: figma.enum('Variant', {
      Person: 'person',
      Company: 'company',
      Academy: 'academy',
    }),
  },
  variant: { Interaction: true, 'Push Badge': true, Size: 'XSmall' },
  example: (props) => (
    <AvatarButton>
      <PushBadge variant="dot">
        <Avatar size="xsmall" {...props} />
      </PushBadge>
    </AvatarButton>
  ),
});

figma.connect('<FIGMA_AVATAR>', {
  props: {
    variant: figma.enum('Variant', {
      Person: 'person',
      Company: 'company',
      Academy: 'academy',
    }),
  },
  variant: { Interaction: true, 'Push Badge': true, Size: 'Small' },
  example: (props) => (
    <AvatarButton>
      <PushBadge variant="dot">
        <Avatar size="small" {...props} />
      </PushBadge>
    </AvatarButton>
  ),
});

figma.connect('<FIGMA_AVATAR>', {
  props: {
    variant: figma.enum('Variant', {
      Person: 'person',
      Company: 'company',
      Academy: 'academy',
    }),
  },
  variant: { Interaction: true, 'Push Badge': true, Size: 'Medium' },
  example: (props) => (
    <AvatarButton>
      <PushBadge size="small" variant="dot">
        <Avatar size="medium" {...props} />
      </PushBadge>
    </AvatarButton>
  ),
});

figma.connect('<FIGMA_AVATAR>', {
  props: {
    variant: figma.enum('Variant', {
      Person: 'person',
      Company: 'company',
      Academy: 'academy',
    }),
  },
  variant: { Interaction: true, 'Push Badge': true, Size: 'Large' },
  example: (props) => (
    <AvatarButton>
      <PushBadge size="small" variant="dot">
        <Avatar size="large" {...props} />
      </PushBadge>
    </AvatarButton>
  ),
});

figma.connect('<FIGMA_AVATAR>', {
  props: {
    variant: figma.enum('Variant', {
      Person: 'person',
      Company: 'company',
      Academy: 'academy',
    }),
  },
  variant: { Interaction: true, 'Push Badge': true, Size: 'XLarge' },
  example: (props) => (
    <AvatarButton>
      <PushBadge size="medium" variant="dot">
        <Avatar size="xlarge" {...props} />
      </PushBadge>
    </AvatarButton>
  ),
});

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
  variant: { Interaction: true, 'Push Badge': false },
  example: (props) => (
    <AvatarButton>
      <Avatar {...props} />
    </AvatarButton>
  ),
});
