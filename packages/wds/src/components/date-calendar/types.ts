export type DateType = Date | string | null | undefined;

export type ViewType = 'year' | 'month' | 'day';

export type DateCalendarProps = {
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
};

export type DateItemProps = {
  isActive?: boolean;
  isCurrent?: boolean;
  isOtherMonth?: boolean;
};
