import { figma } from '@figma/code-connect';

import {
  DateRangePicker,
  PickerActionArea,
  PickerActionAreaButton,
} from '@montage-ui/core';

figma.connect(DateRangePicker, '<FIGMA_DATE_PICKER_WEB>', {
  props: {
    view: figma.enum('View', {
      Day: 'day',
      Month: 'month',
      Year: 'year',
    }),
    actionArea: figma.boolean('Action Area', {
      true: (
        <PickerActionArea>
          <PickerActionAreaButton variant="reset">
            초기화
          </PickerActionAreaButton>
          <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>
        </PickerActionArea>
      ),
      false: undefined,
    }),
  },
  variant: {
    Variant: 'Range',
  },
  example: (props) => <DateRangePicker {...props} />,
});
