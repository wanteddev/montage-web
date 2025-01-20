import dayjs from 'dayjs';

import type { DatePickerFormat } from '../date-picker/types';

export type GetTimeUnitsResult = ReturnType<typeof getHours>;

type GetHoursParams = {
  format: DatePickerFormat;
  locale?: string;
  step?: number;
};

export const getHours = ({ format, locale, step = 1 }: GetHoursParams) => {
  const is12Hour = format.includes('h');
  const start = is12Hour ? 1 : 0;
  const end = is12Hour ? 12 : 23;

  return new Array(Math.floor((end - start + 1) / step)).fill(0).map((_, i) => {
    const value = start + i * step;
    const date = dayjs().hour(value).toDate();

    return {
      value,
      '2-digit': new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        hour12: is12Hour,
      }).format(date),
      numeric: new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        hour12: is12Hour,
      }).format(date),
    };
  });
};

export const getMinutes = ({ locale, step = 5 }: GetMinutesParams) => {
  return new Array(Math.floor(60 / step)).fill(0).map((_, i) => {
    const value = i * step;
    const date = dayjs().minute(value).toDate();

    return {
      value,
      '2-digit': new Intl.DateTimeFormat(locale, {
        minute: '2-digit',
      }).format(date),
      numeric: new Intl.DateTimeFormat(locale, {
        minute: 'numeric',
      }).format(date),
    };
  });
};

type GetMinutesParams = {
  locale?: string;
  step?: number;
};

export const getSeconds = ({ locale, step = 5 }: GetMinutesParams) => {
  return new Array(Math.floor(60 / step)).fill(0).map((_, i) => {
    const value = i * step;
    const date = dayjs().second(value).toDate();

    return {
      value,
      '2-digit': new Intl.DateTimeFormat(locale, {
        second: '2-digit',
      }).format(date),
      numeric: new Intl.DateTimeFormat(locale, {
        second: 'numeric',
      }).format(date),
    };
  });
};
