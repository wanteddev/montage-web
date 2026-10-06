// url=<FIGMA_SLIDER>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/slider/index.tsx
// component=Slider

import figma from 'figma';

const range = figma.selectedInstance.getPropertyValue('Range') === 'True';
const percent =
  figma.selectedInstance.getEnum('Percent', {
    '25%': 25,
    '50%': 50,
    '75%': 75,
    '100%': 100,
  }) ?? 50;
const disabled = figma.selectedInstance.getBoolean('Disable');
const heading = figma.selectedInstance.getBoolean('Heading');
const label = figma.selectedInstance.getBoolean('Label');

const defaultValue = range ? `[0, ${percent}]` : `[${percent}]`;
const first = range ? figma.selectedInstance.getString('┗ First') : '';
const last = range ? figma.selectedInstance.getString('┗ Last') : '';
const single = range ? '' : figma.selectedInstance.getString('┗ Label');

const titleProp = heading
  ? range
    ? ` title={<>
    <span>${first}</span>
    <span>~</span>
    <span>${last}</span>
  </>}`
    : ` title=${JSON.stringify(single)}`
  : '';
const labelProp = label
  ? range
    ? ` label={({ index }) => (index === 0 ? ${JSON.stringify(first)} : ${JSON.stringify(last)})}`
    : ` label=${JSON.stringify(single)}`
  : '';

export default {
  id: 'Slider',
  imports: ["import { Slider } from '@montage-ui/core';"],
  example: figma.code`<Slider defaultValue={${defaultValue}}${titleProp}${labelProp}${
    disabled ? ' disabled' : ''
  } />`,
  metadata: { nestable: true },
};
