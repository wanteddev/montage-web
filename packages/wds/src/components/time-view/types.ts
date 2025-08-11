import type { WithSxProps } from '@wanteddev/wds-engine';
import type { DateType } from '../date-picker';

export type TimeViewType = 'meridiem' | 'hour' | 'minute' | 'second';

export type TimeViewProps = WithSxProps<{
  value?: DateType;
  defaultValue?: DateType;
  views?: Array<TimeViewType>;
  minTime?: DateType;
  maxTime?: DateType;
  locale?: string;
  timezone?: string;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (value: DateType) => void;
  onChangeComplete?: (value: DateType) => void;
}>;

export type TimeListProps = {
  view: TimeViewType;
  views: Array<TimeViewType>;
  timezone?: string;
  locale?: string;
  value: DateType;
  variant: 'first' | 'last' | 'middle' | 'single';
  minTime?: DateType;
  maxTime?: DateType;
};

export type TimeItemProps = {
  view: TimeViewType;
  views: Array<TimeViewType>;
  variant: TimeListProps['variant'];
  value: number;
  text: string;
  currentTimeValue?: string;
  disabled?: boolean;
};

export type HourType = '12' | '24';
