// url=<FIGMA_AVATAR>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/avatar/index.tsx
// component=Avatar

import figma from 'figma';

import { wrapWithPushBadge } from '../../helpers/push-badge';

const instance = figma.selectedInstance;
const size = instance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  XLarge: 'xlarge',
});
const variant = instance.getEnum('Variant', {
  Person: 'person',
  Company: 'company',
  Academy: 'academy',
});
const interaction = instance.getBoolean('Interaction') === true;
const pushBadge = instance.getBoolean('Push Badge') === true;

const avatar = `<Avatar${variant ? ` variant="${variant}"` : ''}${
  size ? ` size="${size}"` : ''
} />`;
// The badge props come from the nested `Push Badge` instance itself.
const badged = pushBadge
  ? wrapWithPushBadge(instance.findInstance('Push Badge'), avatar)
  : avatar;
const code = interaction
  ? `<AvatarButton>
  ${badged.split('\n').join('\n  ')}
</AvatarButton>`
  : badged;

const names = [
  'Avatar',
  ...(interaction ? ['AvatarButton'] : []),
  ...(pushBadge ? ['PushBadge'] : []),
].sort();

export default {
  id: 'Avatar',
  imports: [`import { ${names.join(', ')} } from '@montage-ui/core';`],
  example: figma.tsx`${code}`,
  metadata: { nestable: true },
};
