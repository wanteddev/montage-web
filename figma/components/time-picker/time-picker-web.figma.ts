// url=<FIGMA_TIME_PICKER_WEB>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/time-picker/index.tsx
// component=TimePicker

import figma from 'figma';

const format = figma.selectedInstance.getEnum('Variant', {
  'HH:MM': 'HH:mm',
  'AA HH': 'a hh',
  'AA HH:MM': 'a hh:mm',
  'AA HH:MM:SS': 'a hh:mm:ss',
});
const actionArea = figma.selectedInstance.getBoolean('Action Area', {
  true: figma.helpers.react.jsxElement(
    '<PickerActionArea>\n          <PickerActionAreaButton variant="now">현재</PickerActionAreaButton>\n          <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>\n        </PickerActionArea>',
  ),
  false: undefined,
});
const __props: Record<string, unknown> = {};
if (format && format.type !== 'ERROR') {
  __props['format'] = format;
}
if (actionArea && actionArea.type !== 'ERROR') {
  __props['actionArea'] = actionArea;
}

export default {
  id: 'TimePicker',
  imports: [
    `import { ${actionArea ? 'PickerActionArea, PickerActionAreaButton, ' : ''}TimePicker } from '@montage-ui/core';`,
  ],
  example: figma.code`<TimePicker${figma.helpers.react.renderProp(
    'format',
    format,
  )}${figma.helpers.react.renderProp('actionArea', actionArea)}/>`,
  metadata: { nestable: true, __props },
};
