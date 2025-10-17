import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import type { RefObject } from 'react';
import type { DateType, ViewType } from './types';

type DefaultDateHelperParams = {
  max: DateType;
  min: DateType;
  value: DateType;
  timezone: string | undefined;
};

export const isDateTypeEmpty = (
  date: DateType,
): date is undefined | null | '' =>
  date === undefined || date === null || date === '';

export const isValidDate = (date: DateType): date is Date | string => {
  if (isDateTypeEmpty(date)) {
    return false;
  }

  return dayjs(date).isValid();
};

export const isDisabledDate = ({
  min,
  max,
  value,
  timezone,
}: DefaultDateHelperParams) => {
  if (
    isValidDate(min) &&
    dayjsTimezone(dayjs(min), timezone).isAfter(
      dayjsTimezone(dayjs(value), timezone),
    )
  ) {
    return true;
  }

  if (
    isValidDate(max) &&
    dayjsTimezone(dayjs(max), timezone).isBefore(
      dayjsTimezone(dayjs(value), timezone),
    )
  ) {
    return true;
  }

  return false;
};

export const dateTypeToDateObject = (
  v: DateType | Dayjs,
  timezone: string | undefined,
) => new Date(dayjsTimezone(dayjs(v), timezone).toISOString());

export const dayjsTimezone = (v: Dayjs, timezone: string | undefined) => {
  if (timezone?.toLowerCase() === 'utc') {
    return v.utc();
  }

  return v.tz(timezone);
};

export const findClosestEnableDate = ({
  min,
  max,
  value,
  timezone,
}: DefaultDateHelperParams) => {
  if (
    isValidDate(min) &&
    dayjsTimezone(dayjs(min), timezone).isAfter(
      dayjsTimezone(dayjs(value), timezone),
    )
  ) {
    return dateTypeToDateObject(min, timezone);
  }

  if (
    isValidDate(max) &&
    dayjsTimezone(dayjs(max), timezone).isBefore(
      dayjsTimezone(dayjs(value), timezone),
    )
  ) {
    return dateTypeToDateObject(max, timezone);
  }

  return dateTypeToDateObject(value, timezone);
};

export const getWeekdays = (locale?: string) => {
  return new Array(7).fill(0).map((_, i) => ({
    narrow: new Intl.DateTimeFormat(locale, {
      weekday: 'narrow',
    }).format(dayjs().weekday(i).toDate()),
    long: new Intl.DateTimeFormat(locale, {
      weekday: 'long',
    }).format(dayjs().weekday(i).toDate()),
    short: new Intl.DateTimeFormat(locale, {
      weekday: 'short',
    }).format(dayjs().weekday(i).toDate()),
  }));
};

export const getMonths = (locale?: string) => {
  return new Array(12).fill(0).map((_, i) => ({
    '2-digit': new Intl.DateTimeFormat(locale, {
      month: '2-digit',
    }).format(dayjs().month(i).toDate()),
    long: new Intl.DateTimeFormat(locale, {
      month: 'long',
    }).format(dayjs().month(i).toDate()),
    narrow: new Intl.DateTimeFormat(locale, {
      month: 'narrow',
    }).format(dayjs().month(i).toDate()),
    short: new Intl.DateTimeFormat(locale, {
      month: 'short',
    }).format(dayjs().month(i).toDate()),
    numeric: new Intl.DateTimeFormat(locale, {
      month: 'numeric',
    }).format(dayjs().month(i).toDate()),
  }));
};

export type GetMeridiemResult = ReturnType<typeof getMeridiem>;

export const getMeridiem = (locale?: string) => {
  return new Array(2).fill(0).map((_, i) => ({
    lower:
      new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        hour12: true,
      })
        .formatToParts(
          dayjs()
            .hour(i * 12)
            .toDate(),
        )
        .find((v) => v.type === 'dayPeriod')?.value || 'a',
    upper:
      new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        hour12: true,
      })
        .formatToParts(
          dayjs()
            .hour(i * 12)
            .toDate(),
        )
        .find((v) => v.type === 'dayPeriod')
        ?.value.toUpperCase() || 'A',
  }));
};

export const focusDate = (
  type: ViewType,
  value: number,
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  switch (type) {
    case 'year':
      return containerRef.current
        ?.querySelector<HTMLDivElement>(`[data-year='${value}']`)
        ?.focus();
    case 'month':
      return containerRef.current
        ?.querySelector<HTMLDivElement>(`[data-month='${value}']`)
        ?.focus();
    case 'day':
      return containerRef.current
        ?.querySelector<HTMLDivElement>(
          `[data-date='${value}']:not([aria-disabled='true'])[data-other-month='false']`,
        )
        ?.focus();
  }
};

export const scrollIntoViewDate = (
  type: Omit<ViewType, 'day'>,
  value: number,
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  switch (type) {
    case 'year':
      return containerRef.current
        ?.querySelector<HTMLDivElement>(`[data-year='${value}']`)
        ?.scrollIntoView();
    case 'month':
      return containerRef.current
        ?.querySelector<HTMLDivElement>(`[data-month='${value}']`)
        ?.scrollIntoView();
  }
};
