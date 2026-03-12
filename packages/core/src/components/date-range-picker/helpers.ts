import type { DateRangeType } from '../date-range-calendar/types';

const toDateOnly = (date: Date): number => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
};

export const isInvalidDateRange = (value: DateRangeType): boolean => {
  const [start, end] = value;

  if (Boolean(start) && isNaN(new Date(start!).getTime())) {
    return true;
  }

  if (Boolean(end) && isNaN(new Date(end!).getTime())) {
    return true;
  }

  if (Boolean(start) && Boolean(end)) {
    const startDay = toDateOnly(new Date(start!));
    const endDay = toDateOnly(new Date(end!));

    if (startDay > endDay) {
      return true;
    }
  }

  return false;
};
