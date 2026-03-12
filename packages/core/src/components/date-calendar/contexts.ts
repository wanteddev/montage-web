import { createContext } from '@radix-ui/react-context';

import type { DateCalendarProps, DateType } from './types';
import type { Dayjs } from 'dayjs';
import type { Dispatch, RefObject, SetStateAction } from 'react';

export type DateCalendarContextType = {
  defaultSelectedDate: Date;
  setDefaultSelectedDate: Dispatch<SetStateAction<Date>>;
  now: Dayjs;
  min: DateType;
  max: DateType;
  locale?: string;
  value: DateType;
  timezone?: string;
  handleNextView: (
    newView: DateCalendarProps['view'],
    newValue: DateCalendarProps['value'],
  ) => void;
  containerRef: RefObject<HTMLDivElement | null>;
};

export const [DateCalendarContextProvider, useDateCalendarContext] =
  createContext<DateCalendarContextType>('DateCalendar');
