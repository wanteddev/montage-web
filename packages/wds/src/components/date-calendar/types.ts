import type { WithSxProps } from '@wanteddev/wds-engine';

export type DateType = Date | string | null | undefined;

export type ViewType = 'year' | 'month' | 'day';

export type DateCalendarProps = WithSxProps<{
  value?: DateType;
  defaultValue?: DateType;
  onChange?: (value: DateType) => void;
  defaultView?: ViewType;
  view?: ViewType;
  onViewChange?: (view: ViewType) => void;
  views?: Array<ViewType>;
  max?: DateType;
  min?: DateType;
  locale?: string;
  timezone?: string;
  onChangeComplete?: (value: DateType) => void;
  readOnly?: boolean;
  disabled?: boolean;
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
