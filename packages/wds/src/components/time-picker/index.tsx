import { forwardRef } from 'react';

import { Popover } from '../popover';
import FlexBox from '../flex-box';

import { TIME_PICKER_INPUT_NAME, TIME_PICKER_NAME } from './constants';

import type { TimePickerProps } from './types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';

const TimePicker = () => {
  return (
    <Popover>
      <TimePickerInput />
    </Popover>
  );
};

TimePicker.displayName = TIME_PICKER_NAME;

const TimePickerInput = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TimePickerProps, 'div'>
>((props, ref) => {
  return (
    <FlexBox ref={ref} {...props}>
      나는타임피커
    </FlexBox>
  );
});

TimePickerInput.displayName = TIME_PICKER_INPUT_NAME;

export default TimePicker;
