import dayjs from 'dayjs';

import { TIME_UNIT_STEP } from './constants';

import type { RefObject } from 'react';
import type { HourType, TimeViewType } from './types';

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

export const getMinutes = () => {
  return new Array(Math.floor(60 / TIME_UNIT_STEP)).fill(0).map((_, i) => {
    const value = i * TIME_UNIT_STEP;

    return {
      value,
      text: value.toString(),
    };
  });
};

export const getSeconds = () => {
  return new Array(Math.floor(60 / TIME_UNIT_STEP)).fill(0).map((_, i) => {
    const value = i * TIME_UNIT_STEP;

    return {
      value,
      text: value.toString(),
    };
  });
};

export const scrollToTime = (
  view: TimeViewType,
  value: string,
  containerRef: RefObject<HTMLDivElement>,
) => {
  const scrollItem = containerRef.current?.querySelector(
    `[data-${view}='${value}']`,
  );

  if (scrollItem) {
    containerRef.current?.scrollTo({
      top: (scrollItem as HTMLElement).offsetTop - 8,
    });
  }
};
