import type { TimeViewActionArea } from '.';
import type { ComponentPropsWithRef, MouseEventHandler } from 'react';
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
  hasActionArea?: boolean;
  actionAreaProps?: ComponentPropsWithRef<typeof TimeViewActionArea>;
  onChange?: (value: DateType) => void;
  onChangeComplete?: (value: DateType) => void;
};

export type TimeListProps = {
  view: TimeViewType;
  views: Array<TimeViewType>;
  timezone?: string;
  locale?: string;
  value: DateType;
  order: 'first' | 'last' | 'middle';
};

export type TimeItemProps = {
  view: TimeViewType;
  value: number;
  active: boolean;
  order: TimeListProps['order'];
};

export type TimeViewActionAreaProps = {
  nowText?: string;
  submitText?: string;
  onNowClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmitClick?: MouseEventHandler<HTMLButtonElement>;
};
