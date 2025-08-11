import { useMemo } from 'react';
import dayjs from 'dayjs';

import {
  dayjsTimezone,
  getMeridiem,
  isValidDate,
} from '../date-calendar/helpers';
import { toFormat } from '../date-picker/helpers';

import { getHours, getMinutes, getSeconds, isDisabledTime } from './helpers';

import type { HourType, TimeViewType } from './types';
import type { DateType } from '../date-picker';

type Props = {
  view: TimeViewType;
  locale?: string;
  value: DateType;
  timezone?: string;
  hourType: HourType;
  minTime?: DateType;
  maxTime?: DateType;
};

export const useTimeList = ({
  view,
  value,
  timezone,
  locale,
  hourType,
  minTime,
  maxTime,
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
    const currentHour = isValidDate(value)
      ? dayjsTimezone(dayjs(value), timezone).hour()
      : 0;

    switch (view) {
      case 'meridiem':
        return getMeridiem(locale).map((meridiem, index) => ({
          value: index,
          text: meridiem.upper,
        }));
      case 'hour':
        const hours = getHours({ locale, hourType });
        const hoursWithDisabled = hours.map((hour) => {
          let targetHour = hour.value;

          if (hourType === '12') {
            if (currentHour >= 12) {
              targetHour = hour.value === 12 ? 12 : hour.value + 12;
            } else {
              targetHour = hour.value === 12 ? 0 : hour.value;
            }
          }

          const testTime = dayjs()
            .hour(targetHour)
            .minute(0)
            .second(0)
            .toDate();
          const disabled = isDisabledTime({
            minTime,
            maxTime,
            value: testTime,
            timezone,
          });

          return {
            ...hour,
            disabled,
          };
        });

        return hourType === '12'
          ? [hoursWithDisabled.pop(), ...hoursWithDisabled]
          : hoursWithDisabled;
      case 'minute':
        return getMinutes().map((minute) => {
          const testTime = dayjs()
            .hour(currentHour)
            .minute(minute.value)
            .second(0)
            .toDate();
          const disabled = isDisabledTime({
            minTime,
            maxTime,
            value: testTime,
            timezone,
          });

          return {
            ...minute,
            disabled,
          };
        });
      case 'second':
        return getSeconds().map((second) => {
          const currentMinute = isValidDate(value)
            ? dayjsTimezone(dayjs(value), timezone).minute()
            : 0;

          const testTime = dayjs()
            .hour(currentHour)
            .minute(currentMinute)
            .second(second.value)
            .toDate();
          const disabled = isDisabledTime({
            minTime,
            maxTime,
            value: testTime,
            timezone,
          });

          return {
            ...second,
            disabled,
          };
        });
    }
  }, [locale, view, hourType, minTime, maxTime, timezone, value]);

  return { hourType, currentTimeValue, timeList };
};
