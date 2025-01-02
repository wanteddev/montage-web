import type { Merge } from '@wanteddev/wds-engine';
import type { Dayjs } from 'dayjs';

export type TimePickerValue = Dayjs | null;
export type TimePickerFormat = 'hh:mm' | 'a hh' | 'a hh:mm' | 'a hh:mm:ss';
export type TimePickerHoursFormat = '12' | '24';
export type TimePickerProps = {
  defaultValue?: TimePickerValue;
  value?: TimePickerValue;
  disabled?: boolean;
  format?: TimePickerFormat;
  hoursFormat?: TimePickerHoursFormat;
  onChange?: (value: TimePickerValue) => void;
};

export type TimePickerInputProps = Merge<
  Required<Pick<TimePickerProps, 'format' | 'hoursFormat' | 'disabled'>>,
  {
    value: TimePickerValue;
    setValue: (value: TimePickerValue) => void;
  }
>;

export type TimeSection = {
  type: 'hours' | 'minutes' | 'seconds' | 'ampm';
  start: number;
  end: number;
  value: string;
};
