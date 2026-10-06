import { figma } from '@figma/code-connect';

import {
  DatePicker,
  PickerActionArea,
  PickerActionAreaButton,
} from '@montage-ui/core';

figma.connect(DatePicker, '<FIGMA_DATE_PICKER_WEB>', {
  props: {
    defaultView: figma.enum('View', {
      Day: 'day',
      Month: 'month',
      Year: 'year',
    }),
    actionArea: figma.boolean('Action Area', {
      true: (
        <PickerActionArea>
          <PickerActionAreaButton variant="now">오늘</PickerActionAreaButton>
          <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>
        </PickerActionArea>
      ),
      false: undefined,
    }),
  },
  variant: {
    Variant: 'Normal',
  },
  example: (props) => <DatePicker {...props} />,
});
