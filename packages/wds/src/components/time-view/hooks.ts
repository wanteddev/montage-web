import { useMemo } from 'react';
import dayjs from 'dayjs';

import {
  dayjsTimezone,
  getMeridiem,
  isValidDate,
} from '../date-calendar/helpers';

import { getHours, getMinutes, getSeconds } from './helpers';

import type { TimeViewType } from './types';
import type { DateType } from '../date-picker';

type Props = {
  view: TimeViewType;
  views: Array<TimeViewType>;
  locale?: string;
  value: DateType;
  timezone?: string;
};

export const useTimeView = ({
  views,
  value,
  timezone,
  view,
  locale,
}: Props) => {
  const is12Hour = useMemo(() => views.includes('meridiem'), [views]);

  const timeValue = useMemo(() => {
    if (!isValidDate(value)) return;

    const time = dayjsTimezone(dayjs(value), timezone);

    switch (view) {
      case 'meridiem':
        return time.format('A');
      case 'hour':
        return is12Hour ? time.format('h') : time.format('H');
      case 'minute':
        return time.format('m');
      case 'second':
        return time.format('s');
    }
  }, [value, timezone, view, is12Hour]);

  const timeList = useMemo(() => {
    switch (view) {
      case 'meridiem':
        return getMeridiem(locale).map((meridiem, index) => ({
          value: index,
          meridiem: meridiem.upper,
        }));
      case 'hour':
        const hours = getHours({ is12Hour });
        return is12Hour ? [hours.pop(), ...hours] : hours;
      case 'minute':
        return getMinutes();
      case 'second':
        return getSeconds();
    }
  }, [is12Hour, locale, view]);

  return { timeValue, timeList };
};
