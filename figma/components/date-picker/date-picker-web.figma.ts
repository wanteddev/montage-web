// url=<FIGMA_DATE_PICKER_WEB>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/date-range-picker/index.tsx
// component=DateRangePicker

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Variant') === 'Range') {
  // The range calendar has no `defaultView`, and a bare controlled `view`
  // would lock navigation, so the Figma `View` is not mapped here.
  const actionArea = figma.selectedInstance.getBoolean('Action Area', {
    true: figma.helpers.react.jsxElement(
      '<PickerActionArea>\n          <PickerActionAreaButton variant="reset">\n            초기화\n          </PickerActionAreaButton>\n          <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>\n        </PickerActionArea>',
    ),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (actionArea && actionArea.type !== 'ERROR') {
    __props['actionArea'] = actionArea;
  }

  template = {
    id: 'DateRangePicker',
    imports: [
      `import { DateRangePicker${actionArea ? ', PickerActionArea, PickerActionAreaButton' : ''} } from '@montage-ui/core';`,
    ],
    example: figma.code`<DateRangePicker${figma.helpers.react.renderProp(
      'actionArea',
      actionArea,
    )}/>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Normal') {
  const defaultView = figma.selectedInstance.getEnum('View', {
    Day: 'day',
    Month: 'month',
    Year: 'year',
  });
  const actionArea = figma.selectedInstance.getBoolean('Action Area', {
    true: figma.helpers.react.jsxElement(
      '<PickerActionArea>\n          <PickerActionAreaButton variant="now">오늘</PickerActionAreaButton>\n          <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>\n        </PickerActionArea>',
    ),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (defaultView && defaultView.type !== 'ERROR') {
    __props['defaultView'] = defaultView;
  }
  if (actionArea && actionArea.type !== 'ERROR') {
    __props['actionArea'] = actionArea;
  }

  template = {
    id: 'DatePicker',
    imports: [
      `import { DatePicker${actionArea ? ', PickerActionArea, PickerActionAreaButton' : ''} } from '@montage-ui/core';`,
    ],
    example: figma.code`<DatePicker${figma.helpers.react.renderProp(
      'defaultView',
      defaultView,
    )}${figma.helpers.react.renderProp('actionArea', actionArea)}/>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'DateRangePicker',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
