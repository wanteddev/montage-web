import type { TimeViewActionArea } from '.';
import type { ComponentPropsWithRef } from 'react';
import type { DateType } from '../date-picker';

export type TimeViewType = 'ampm' | 'hour' | 'minute' | 'second';

export type TimeViewProps = {
  value?: DateType;
  defaultValue?: DateType;
  views?: Array<TimeViewType>;
  format?: string;
  locale?: string;
  timezone?: string;
  readOnly?: boolean;
  disabled?: boolean;
  hasActionArea?: boolean;
  actionAreaProps?: ComponentPropsWithRef<typeof TimeViewActionArea>;
  onChange?: (value: DateType) => void;
};

export type TimeListProps = {
  view: TimeViewType;
  format: string;
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
  onNowClick?: () => void;
  onSubmitClick?: () => void;
};
