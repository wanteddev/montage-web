// url=<FIGMA_PROGRESS_STEP_INDICATOR>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/progress-step-indicator/index.tsx
// component=ProgressStepIndicator

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
});
const divider = figma.selectedInstance.getBoolean('Divider');
const __props: Record<string, unknown> = {};
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}
if (divider && divider.type !== 'ERROR') {
  __props['divider'] = divider;
}

export default {
  id: 'ProgressStepIndicator',
  imports: [
    "import { ProgressStepIndicator, ProgressStepIndicatorItem } from '@montage-ui/core';",
  ],
  example: figma.code`<ProgressStepIndicator defaultValue="2"${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('divider', divider)}>
      <ProgressStepIndicatorItem value="1"/>
      <ProgressStepIndicatorItem value="2"/>
      <ProgressStepIndicatorItem value="3"/>
      <ProgressStepIndicatorItem value="4"/>
    </ProgressStepIndicator>`,
  metadata: { nestable: true, __props },
};
