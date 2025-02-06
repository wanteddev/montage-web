import { useMemo } from 'react';

import { getMeridiem, isValidDate } from '../date-calendar/helpers';
import { toFormat } from '../date-picker/helpers';

import { getHours, getMinutes, getSeconds } from './helpers';

import type { HourType, TimeViewType } from './types';
import type { DateType } from '../date-picker';

type Props = {
  view: TimeViewType;
  locale?: string;
  value: DateType;
  timezone?: string;
  hourType: HourType;
};

export const useTimeView = ({
  view,
  value,
  timezone,
  locale,
  hourType,
}: Props) => {
  const currentTimeValue = useMemo(() => {
    if (!isValidDate(value)) return;

    switch (view) {
      case 'meridiem':
        return getMeridiem(locale)
          .findIndex(
            (meridiem) =>
              meridiem.upper === toFormat(value, 'A', locale, timezone),
          )
          .toString();
      case 'hour':
        return toFormat(value, hourType === '12' ? 'h' : 'H', locale, timezone);
      case 'minute':
        return toFormat(value, 'm', locale, timezone);
      case 'second':
        return toFormat(value, 's', locale, timezone);
    }
  }, [value, timezone, view, locale, hourType]);

  const timeList = useMemo(() => {
    switch (view) {
      case 'meridiem':
        return getMeridiem(locale).map((meridiem, index) => ({
          value: index,
          text: meridiem.upper,
        }));
      case 'hour':
        const hours = getHours({ locale, hourType });
        return hourType === '12' ? [hours.pop(), ...hours] : hours;
      case 'minute':
        return getMinutes();
      case 'second':
        return getSeconds();
    }
  }, [locale, view, hourType]);

  return { hourType, currentTimeValue, timeList };
};
