// url=<FIGMA_THUMBNAIL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/thumbnail/index.tsx
// component=Thumbnail

import figma from 'figma';

const border = figma.selectedInstance.getBoolean('Border');
const radius = figma.selectedInstance.getBoolean('Radius');
// The overlay swap is a `Thumbnail/Resource/Overlay/*` wrapper without its own
// Code Connect. `Playtime` wraps a Play Badge, which is what the docs pass as `overlay`.
const overlaySwap =
  figma.selectedInstance.getBoolean('Overlay') === true
    ? figma.selectedInstance.getInstanceSwap('┗ Instance')
    : undefined;
const playBadge =
  overlaySwap && overlaySwap.type !== 'ERROR'
    ? overlaySwap.findInstance('Playtime')
    : undefined;
const overlay =
  playBadge && playBadge.type !== 'ERROR' && playBadge.hasCodeConnect()
    ? playBadge.executeTemplate().example
    : undefined;
const ratio = (function () {
  const nestedLayer14 = figma.selectedInstance.findInstance('Ratio');
  return {
    value:
      nestedLayer14.type !== 'ERROR'
        ? nestedLayer14.getEnum('Aspect Ratio', {
            '1:1': '1:1',
            '5:4': '5:4',
            '4:3': '4:3',
            '3:2': '3:2',
            '16:10': '16:10',
            '1.618:1': '1.618:1',
            '16:9': '16:9',
            '2:1': '2:1',
            '21:9': '21:9',
            '4:5': '5:4',
            '3:4': '4:3',
            '2:3': '3:2',
            '10:16': '16:10',
            '1:1.618': '1.618:1',
            '9:16': '16:9',
            '1:2': '2:1',
            '9:21': '21:9',
          })
        : undefined,
    portrait:
      nestedLayer14.type !== 'ERROR'
        ? nestedLayer14.getEnum('Aspect Ratio', {
            '4:5': true,
            '3:4': true,
            '2:3': true,
            '10:16': true,
            '1:1.618': true,
            '9:16': true,
            '1:2': true,
            '9:21': true,
          })
        : undefined,
  };
})();
const __props: Record<string, unknown> = {};
if (border && border.type !== 'ERROR') {
  __props['border'] = border;
}
if (radius && radius.type !== 'ERROR') {
  __props['radius'] = radius;
}
if (overlay && overlay.type !== 'ERROR') {
  __props['overlay'] = overlay;
}
if (ratio && ratio.type !== 'ERROR') {
  __props['ratio'] = ratio;
}

export default {
  id: 'Thumbnail',
  imports: [
    overlay
      ? "import { PlayBadge, Thumbnail } from '@montage-ui/core';"
      : "import { Thumbnail } from '@montage-ui/core';",
  ],
  example: figma.code`<Thumbnail src="https://example.com/thumbnail.png" alt=""${figma.helpers.react.renderProp(
    'ratio',
    ratio.value,
  )}${figma.helpers.react.renderProp(
    'portrait',
    ratio.portrait,
  )}${figma.helpers.react.renderProp(
    'border',
    border,
  )}${figma.helpers.react.renderProp(
    'radius',
    radius,
  )}${figma.helpers.react.renderProp('overlay', overlay)}/>`,
  metadata: { nestable: true, __props },
};
