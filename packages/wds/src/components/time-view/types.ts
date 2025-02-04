import type { ReactNode } from 'react';
import type { DateType } from '../date-picker';

export type TimeViewType = 'meridiem' | 'hour' | 'minute' | 'second';

export type TimeViewProps = {
  value?: DateType;
  defaultValue?: DateType;
  views?: Array<TimeViewType>;
  minTime?: DateType;
  maxTime?: DateType;
  locale?: string;
  timezone?: string;
  readOnly?: boolean;
  disabled?: boolean;
  actionArea?: ReactNode;
  onChange?: (value: DateType) => void;
  onChangeComplete?: (value: DateType) => void;
};

export type TimeListProps = {
  view: TimeViewType;
  timezone?: string;
  locale?: string;
  value: DateType;
  order: 'first' | 'last' | 'middle' | 'single';
};

export type TimeItemProps = {
  view: TimeViewType;
  value: number;
  active: boolean;
  order: TimeListProps['order'];
};

export type HourType = '12' | '24';
