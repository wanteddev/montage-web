// url=<FIGMA_PLAY_BADGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/play-badge/index.tsx
// component=PlayBadge

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
});
const alternative = figma.selectedInstance.getBoolean('Alternative');
const __props: Record<string, unknown> = {};
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}
if (alternative && alternative.type !== 'ERROR') {
  __props['alternative'] = alternative;
}

export default {
  id: 'PlayBadge',
  imports: ["import { PlayBadge } from '@montage-ui/core';"],
  example: figma.code`<PlayBadge${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('alternative', alternative)}/>`,
  metadata: { nestable: true, __props },
};
