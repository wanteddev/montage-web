import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  dateTypeToDateObject,
  dayjsTimezone,
  findClosestEnableDate,
  isValidDate,
} from './helpers';

import type { DateType } from './types';

export const useDefaultSelectedDate = (
  value: DateType,
  min: DateType,
  max: DateType,
  timezone?: string,
) => {
  const now = useRef(
    dayjsTimezone(dayjs(), timezone)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0),
  ).current;

  const getDefaultSelectedDate = useCallback(() => {
    if (Boolean(value) && isValidDate(value)) {
      return dateTypeToDateObject(value, timezone);
    }

    if (isValidDate(min) && isValidDate(max) && now.isBetween(min, max)) {
      return dateTypeToDateObject(now, timezone);
    }

    return findClosestEnableDate({
      value: dateTypeToDateObject(now, timezone),
      min,
      max,
      timezone,
    });
  }, [max, min, now, value, timezone]);

  const [defaultSelectedDate, setDefaultSelectedDate] = useState(
    getDefaultSelectedDate(),
  );

  useEffect(() => {
    setDefaultSelectedDate(getDefaultSelectedDate());
  }, [getDefaultSelectedDate]);

  return { defaultSelectedDate, setDefaultSelectedDate, now };
};
