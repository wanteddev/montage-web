import { createContext } from '@radix-ui/react-context';

import { TIME_VIEW_NAME } from './constants';

import type { HourType } from './types';
import type { Dayjs } from 'dayjs';
import type { DateType } from '../date-picker';

export type TimeViewContextType = {
  value: DateType;
  now: Dayjs;
  hourType: HourType;
  timezone?: string;
  disabled: boolean;
  readOnly: boolean;
  onChange: (value: DateType) => void;
  onChangeComplete?: (value: DateType) => void;
};

export const [TimeViewContextProvider, useTimeViewContext] =
  createContext<TimeViewContextType>(TIME_VIEW_NAME);
