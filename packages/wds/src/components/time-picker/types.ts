import type { Merge } from '@wanteddev/wds-engine';
import type { Dayjs } from 'dayjs';

export type TimePickerValue = Dayjs | null;
export type TimePickerFormat = 'hh:mm' | 'a hh' | 'a hh:mm' | 'a hh:mm:ss';

export type TimePickerProps = {
  defaultValue?: TimePickerValue;
  value?: TimePickerValue;
  disabled?: boolean;
  format?: TimePickerFormat;
  onChange?: (value: TimePickerValue) => void;
};

export type TimePickerInputProps = Merge<
  Required<Pick<TimePickerProps, 'format' | 'disabled'>>,
  {
    timeValue: TimePickerValue;
    setValue: (value: TimePickerValue) => void;
  }
>;

export type TimeSection = {
  type: 'hours' | 'minutes' | 'seconds' | 'ampm';
  start: number;
  end: number;
  value: string;
};
