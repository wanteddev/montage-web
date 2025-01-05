import type { Merge } from '@wanteddev/wds-engine';
import type { Dayjs } from 'dayjs';

export type TimePickerValue = Dayjs | null;
export type TimePickerFormat = 'hh:mm' | 'a hh' | 'a hh:mm' | 'a hh:mm:ss';
export type TimePickerHourFormat = '12' | '24';

export type TimePickerProps = {
  defaultValue?: TimePickerValue;
  value?: TimePickerValue;
  disabled?: boolean;
  format?: TimePickerFormat;
  hourFormat?: TimePickerHourFormat;
  onChange?: (value: TimePickerValue) => void;
};

export type TimePickerInputProps = Merge<
  Required<Pick<TimePickerProps, 'format' | 'hourFormat' | 'disabled'>>,
  {
    value: TimePickerValue;
    setValue: (value: TimePickerValue) => void;
  }
>;

export type TimeSection = {
  type: 'ampm' | 'hour' | 'minute' | 'second';
  start: number;
  end: number;
  value: string;
};
