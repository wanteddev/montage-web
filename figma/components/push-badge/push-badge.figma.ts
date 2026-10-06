// url=<FIGMA_PUSH_BADGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/push-badge/index.tsx
// component=PushBadge

import figma from 'figma';

import { pushBadgeProps } from '../../helpers/push-badge';

// A standalone badge has no target in Figma. `PushBadge` positions itself on
// its children, so leave a placeholder for the element that carries the badge.
// Components that include a badge (Avatar, IconButton) wrap their real content.
export default {
  id: 'PushBadge',
  imports: ["import { PushBadge } from '@montage-ui/core';"],
  example: figma.tsx`<PushBadge${pushBadgeProps(figma.selectedInstance)}>
  {/* 뱃지를 표시할 요소 */}
</PushBadge>`,
  metadata: { nestable: true },
};
