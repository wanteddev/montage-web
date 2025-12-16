import type { WithSxProps } from '@wanteddev/wds-engine';

export type DateType = Date | string | null | undefined;

export type ViewType = 'year' | 'month' | 'day';

export type DateCalendarProps = WithSxProps<{
  /** The value of the date. */
  value?: DateType;
  /** The default value of the date. */
  defaultValue?: DateType;
  /** Callback function when the value changes. */
  onChange?: (value: DateType) => void;
  /** The default view of the date. */
  defaultView?: ViewType;
  /** The view of the date. */
  view?: ViewType;
  /** Callback function when the view changes. */
  onViewChange?: (view: ViewType) => void;
  /** Supports views to be displayed. */
  views?: Array<ViewType>;
  /** The maximum date of the date. */
  max?: DateType;
  /** The minimum date of the date. */
  min?: DateType;
  /** The locale of the date. */
  locale?: string;
  /** The timezone of the date. */
  timezone?: string;
  /** Callback function when the date selection is completed. */
  onChangeComplete?: (value: DateType) => void;
  /** Whether the date is read only. */
  readOnly?: boolean;
  /** Whether the date is disabled. */
  disabled?: boolean;
  /** The order of the years. */
  yearsOrder?: 'desc' | 'asc';
}>;

export type YearCalendarProps = WithSxProps<{
  order?: 'desc' | 'asc';
}>;
export type MonthCalendarProps = WithSxProps<{}>;
export type DayCalendarProps = WithSxProps<{}>;

export type DateItemProps = WithSxProps<{
  isActive?: boolean;
  isCurrent?: boolean;
  isOtherMonth?: boolean;
}>;
