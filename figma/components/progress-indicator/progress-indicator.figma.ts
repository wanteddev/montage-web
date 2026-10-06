// url=<FIGMA_PROGRESS_INDICATOR>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/progress-indicator/index.tsx
// component=ProgressIndicator

import figma from 'figma';

const percent = figma.selectedInstance.getEnum('Percent', {
  '0%': 0,
  '50%': 50,
  '100%': 100,
});
const __props: Record<string, unknown> = {};
if (percent && percent.type !== 'ERROR') {
  __props['percent'] = percent;
}

export default {
  id: 'ProgressIndicator',
  imports: ["import { ProgressIndicator } from '@montage-ui/core';"],
  example: figma.code`<ProgressIndicator${figma.helpers.react.renderProp(
    'percent',
    percent,
  )}/>`,
  metadata: { nestable: true, __props },
};
