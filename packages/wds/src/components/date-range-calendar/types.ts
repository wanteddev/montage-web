import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { DateType, ViewType } from '../date-calendar/types';

export type DateRangeType = [DateType, DateType];

type DateRangeCalendarDefaultProps = {
  /** The value of the date range. */
  value?: DateRangeType;
  /** The default value of the date range. */
  defaultValue?: DateRangeType;
  /** Callback function when the value changes. */
  onChange?: (value: DateRangeType) => void;
  /** Callback function when the date range selection is completed. */
  onChangeComplete?: (value: DateRangeType) => void;
  /** The number of calendars to display. Only effective in day view. */
  calendars?: number;
  /** The view of the calendar. */
  view?: ViewType;
  /** The maximum date. */
  max?: DateType;
  /** The minimum date. */
  min?: DateType;
  /** The locale of the date. */
  locale?: string;
  /** The timezone of the date. */
  timezone?: string;
  /** Whether the calendar is disabled. */
  disabled?: boolean;
  /** Whether the calendar is read only. */
  readOnly?: boolean;
  /** The order of the years. */
  yearsOrder?: 'desc' | 'asc';
};

export type DateRangeCalendarProps = Merge<
  WithSxProps<DateRangeCalendarDefaultProps>,
  ResponsiveProps<Pick<DateRangeCalendarDefaultProps, 'calendars'>>
>;

export type RangeItemProps = WithSxProps<{
  isActive?: boolean;
  isCurrent?: boolean;
  isOtherMonth?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRange?: boolean;
}>;

export type RangeDateItemProps = RangeItemProps;
