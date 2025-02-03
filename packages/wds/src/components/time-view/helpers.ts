import dayjs from 'dayjs';

import type { HourType } from './types';

export type GetTimeUnitsResult = ReturnType<typeof getHours>;

type GetHoursParams = {
  step?: number;
  hourType?: HourType;
  locale?: string;
};

export const getHours = ({
  step = 1,
  hourType = '24',
  locale,
}: GetHoursParams) => {
  const start = hourType === '12' ? 1 : 0;
  const end = hourType === '12' ? 12 : 23;

  return new Array(Math.floor((end - start + 1) / step)).fill(0).map((_, i) => {
    const value = start + i * step;

    return {
      value,
      text: value.toString(),
      numeric: new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        hour12: false,
      }).format(dayjs().hour(value).toDate()),
    };
  });
};

export const getMinutes = (step = 5) => {
  return new Array(Math.floor(60 / step)).fill(0).map((_, i) => {
    const value = i * step;

    return {
      value,
      text: value.toString(),
    };
  });
};

export const getSeconds = (step = 5) => {
  return new Array(Math.floor(60 / step)).fill(0).map((_, i) => {
    const value = i * step;

    return {
      value,
      text: value.toString(),
    };
  });
};
