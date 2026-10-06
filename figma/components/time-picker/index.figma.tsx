import { figma } from '@figma/code-connect';

import {
  PickerActionArea,
  PickerActionAreaButton,
  TimePicker,
} from '@montage-ui/core';

figma.connect(TimePicker, '<FIGMA_TIME_PICKER_WEB>', {
  props: {
    format: figma.enum('Variant', {
      'HH:MM': 'HH:mm',
      'AA HH': 'a hh',
      'AA HH:MM': 'a hh:mm',
      'AA HH:MM:SS': 'a hh:mm:ss',
    }),
    actionArea: figma.boolean('Action Area', {
      true: (
        <PickerActionArea>
          <PickerActionAreaButton variant="now">현재</PickerActionAreaButton>
          <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>
        </PickerActionArea>
      ),
      false: undefined,
    }),
  },
  example: (props) => <TimePicker {...props} />,
});
