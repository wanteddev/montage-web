import dayjs from 'dayjs';

import {
  isElementDisabled,
  scrollIntoViewWithin,
} from '../../utils/internal/element';
import { dayjsTimezone } from '../date-calendar/helpers';

import { TIME_UNIT_STEP } from './constants';

import type { DateType } from '../date-picker';
import type { HourType, TimeViewType } from './types';
import type { RefObject } from 'react';

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
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const container = containerRef.current;
  const scrollItem = container?.querySelector<HTMLElement>(
    `[data-${view}='${value}']`,
  );

  if (container && scrollItem) {
    scrollIntoViewWithin(container, scrollItem, { align: 'start' });
  }
};

// 시간만 비교하는 helper 함수들
export const isDisabledTime = ({
  minTime,
  maxTime,
  value,
  timezone,
}: {
  minTime?: DateType;
  maxTime?: DateType;
  value: DateType;
  timezone?: string;
}) => {
  if (!value) return false;

  const currentTime = dayjsTimezone(dayjs(value), timezone);
  const currentTimeOnly = dayjsTimezone(dayjs(), timezone)
    .hour(currentTime.hour())
    .minute(currentTime.minute())
    .second(currentTime.second());

  if (minTime) {
    const minTimeObj = dayjsTimezone(dayjs(minTime), timezone);
    const minTimeOnly = dayjsTimezone(dayjs(), timezone)
      .hour(minTimeObj.hour())
      .minute(minTimeObj.minute())
      .second(minTimeObj.second());

    if (currentTimeOnly.isBefore(minTimeOnly)) {
      return true;
    }
  }

  if (maxTime) {
    const maxTimeObj = dayjsTimezone(dayjs(maxTime), timezone);
    const maxTimeOnly = dayjsTimezone(dayjs(), timezone)
      .hour(maxTimeObj.hour())
      .minute(maxTimeObj.minute())
      .second(maxTimeObj.second());

    if (currentTimeOnly.isAfter(maxTimeOnly)) {
      return true;
    }
  }

  return false;
};

export const findClosestEnableTime = ({
  minTime,
  maxTime,
  value,
  timezone,
}: {
  minTime?: DateType;
  maxTime?: DateType;
  value: DateType;
  timezone?: string;
}) => {
  if (!value) return value;

  const currentTime = dayjsTimezone(dayjs(value), timezone);
  const currentTimeOnly = dayjsTimezone(dayjs(), timezone)
    .hour(currentTime.hour())
    .minute(currentTime.minute())
    .second(currentTime.second());

  if (minTime) {
    const minTimeObj = dayjsTimezone(dayjs(minTime), timezone);
    const minTimeOnly = dayjsTimezone(dayjs(), timezone)
      .hour(minTimeObj.hour())
      .minute(minTimeObj.minute())
      .second(minTimeObj.second());

    if (currentTimeOnly.isBefore(minTimeOnly)) {
      return minTime;
    }
  }

  if (maxTime) {
    const maxTimeObj = dayjsTimezone(dayjs(maxTime), timezone);
    const maxTimeOnly = dayjsTimezone(dayjs(), timezone)
      .hour(maxTimeObj.hour())
      .minute(maxTimeObj.minute())
      .second(maxTimeObj.second());

    if (currentTimeOnly.isAfter(maxTimeOnly)) {
      return maxTime;
    }
  }

  return value;
};

// Enabled options of the time list that contains `element`.
export const getFocusableTimeItems = (element: HTMLElement) =>
  Array.from(
    element
      .closest('[data-role="time-list-scroll-area"]')
      ?.querySelectorAll<HTMLElement>('[role="option"]') ?? [],
  ).filter((item) => !isElementDisabled(item));

// Moves focus to the previous / next time list. Focusing a list hands focus to
// its selected item (or first item) through the roving focus group.
export const focusAdjacentTimeList = (
  element: HTMLElement,
  key: 'ArrowLeft' | 'ArrowRight',
) => {
  const timeViewElement = element.closest('[data-component="time-view"]');
  const currentTimeListScrollArea = element.closest(
    '[data-role="time-list-scroll-area"]',
  );

  if (!timeViewElement || !currentTimeListScrollArea) return;

  const scrollAreaList = Array.from(
    timeViewElement.querySelectorAll<HTMLElement>(
      '[data-role="time-list-scroll-area"]',
    ),
  );
  const currentIndex = scrollAreaList.indexOf(
    currentTimeListScrollArea as HTMLElement,
  );
  const moveIndex = key === 'ArrowLeft' ? currentIndex - 1 : currentIndex + 1;

  scrollAreaList[moveIndex]?.focus();
};
