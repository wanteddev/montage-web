import type { WithSxProps } from '@wanteddev/wds-engine';
import type { DateType } from '../date-picker';

export type TimeViewType = 'meridiem' | 'hour' | 'minute' | 'second';

export type TimeViewProps = WithSxProps<{
  /** The value of the time view. */
  value?: DateType;
  /** The default value of the time view. */
  defaultValue?: DateType;
  /** The views of the time view. */
  views?: Array<TimeViewType>;
  /** The minimum time of the time view. */
  minTime?: DateType;
  /** The maximum time of the time view. */
  maxTime?: DateType;
  /** The locale of the time view. */
  locale?: string;
  /** The timezone of the time view. */
  timezone?: string;
  /** Whether the time view is read only. */
  readOnly?: boolean;
  /** Whether the time view is disabled. */
  disabled?: boolean;
  /** Callback function when the value changes. */
  onChange?: (value: DateType) => void;
  /** Callback function when the value changes complete. */
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
