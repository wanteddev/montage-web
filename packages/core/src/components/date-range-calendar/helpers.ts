import dayjs from 'dayjs';

import {
  dateTypeToDateObject,
  dayjsTimezone,
  isValidDate,
} from '../date-calendar/helpers';

import type { Dayjs } from 'dayjs';
import type { DateType, ViewType } from '../date-calendar/types';
import type { DateRangeType } from './types';

export const isSameDateForView = (
  date1: DateType,
  date2: DateType,
  view: ViewType,
  timezone?: string,
): boolean => {
  if (!isValidDate(date1) || !isValidDate(date2)) return false;

  const d1 = dayjsTimezone(dayjs(date1), timezone);
  const d2 = dayjsTimezone(dayjs(date2), timezone);

  return d1.isSame(d2, view);
};

export const isDateInRangeForView = (
  date: DateType,
  start: DateType,
  end: DateType,
  view: ViewType,
  timezone?: string,
): boolean => {
  if (!isValidDate(date) || !isValidDate(start) || !isValidDate(end))
    return false;

  const d = dayjsTimezone(dayjs(date), timezone);
  const s = dayjsTimezone(dayjs(start), timezone);
  const e = dayjsTimezone(dayjs(end), timezone);

  return d.isBetween(s, e, view, '[]');
};

export const getDisplayRange = (
  rangeValue: DateRangeType,
  hoveredDate: Date | null,
  activePosition: 'start' | 'end',
  timezone?: string,
): DateRangeType => {
  const [start, end] = rangeValue;

  if (isValidDate(start) && isValidDate(end)) {
    return rangeValue;
  }

  if (isValidDate(start) && activePosition === 'end' && hoveredDate) {
    const startDate = dateTypeToDateObject(start, timezone);
    if (dayjs(hoveredDate).isBefore(dayjs(startDate), 'day')) {
      return [hoveredDate, startDate];
    }
    return [startDate, hoveredDate];
  }

  return [undefined, undefined];
};

/**
 * Focuses a date element in the range calendar container.
 * Uses string-based data attributes (ISO format for day/month, number string for year).
 */
export const focusRangeDate = (
  type: ViewType,
  value: string,
  containerRef: { current: HTMLDivElement | null },
) => {
  switch (type) {
    case 'day':
      return containerRef.current
        ?.querySelector<HTMLButtonElement>(
          `[data-date="${value}"]:not([aria-disabled='true'])`,
        )
        ?.focus();
    case 'month':
      return containerRef.current
        ?.querySelector<HTMLButtonElement>(`[data-month="${value}"]`)
        ?.focus();
    case 'year':
      return containerRef.current
        ?.querySelector<HTMLButtonElement>(`[data-year="${value}"]`)
        ?.focus();
  }
};

export const scrollIntoViewRangeDate = (
  type: ViewType,
  value: string,
  containerRef: { current: HTMLDivElement | null },
) => {
  switch (type) {
    case 'year':
      return containerRef.current
        ?.querySelector<HTMLButtonElement>(`[data-year="${value}"]`)
        ?.scrollIntoView({ block: 'center' });
    case 'month':
      return containerRef.current
        ?.querySelector<HTMLButtonElement>(`[data-month="${value}"]`)
        ?.scrollIntoView({ block: 'center' });
  }
};

export const isDateInVisiblePanels = (
  date: Dayjs,
  baseDate: Date,
  calendars: number,
  timezone?: string,
): boolean => {
  const base = dayjsTimezone(dayjs(baseDate), timezone);

  for (let i = 0; i < calendars; i++) {
    const panelMonth = base.add(i, 'month');
    if (date.isSame(panelMonth, 'month')) {
      return true;
    }
  }

  return false;
};
