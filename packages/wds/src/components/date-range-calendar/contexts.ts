import { createContext } from '@radix-ui/react-context';

import type { DateType, ViewType } from '../date-calendar/types';
import type { DateRangeType } from './types';
import type { Dayjs } from 'dayjs';
import type { Dispatch, RefObject, SetStateAction } from 'react';

export type DateRangeCalendarContextType = {
  rangeValue: DateRangeType;
  hoveredDate: Date | null;
  setHoveredDate: Dispatch<SetStateAction<Date | null>>;
  activePosition: 'start' | 'end';
  handleDateSelect: (date: Date) => void;
  defaultSelectedDate: Date;
  setDefaultSelectedDate: Dispatch<SetStateAction<Date>>;
  now: Dayjs;
  min: DateType;
  max: DateType;
  locale?: string;
  timezone?: string;
  containerRef: RefObject<HTMLDivElement | null>;
  view: ViewType;
  calendars: number;
  disabled?: boolean;
  readOnly?: boolean;
};

export const [DateRangeCalendarContextProvider, useDateRangeCalendarContext] =
  createContext<DateRangeCalendarContextType>('DateRangeCalendar');
