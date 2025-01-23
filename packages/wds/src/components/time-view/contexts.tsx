import { createContext } from '@radix-ui/react-context';

import { TIME_VIEW_NAME } from './constants';

import type { Dayjs } from 'dayjs';
import type { DateType } from '../date-picker';

export type TimeViewContextType = {
  value: DateType;
  now: Dayjs;
  format: string;
  timezone?: string;
  disabled: boolean;
  readOnly: boolean;
  onChange: (value: DateType) => void;
};

export const [TimeViewContextProvider, useTimeViewContext] =
  createContext<TimeViewContextType>(TIME_VIEW_NAME);
