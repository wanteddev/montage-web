import type { TimeViewType } from '../time-view/types';
import type { DateFormatSection } from '../date-picker/helpers';
import type { DatePickerFormat } from '../date-picker/types';

export type GetTimeUnitsResult = ReturnType<typeof getHours>;

type GetHoursParams = {
  format: DatePickerFormat;
  step?: number;
};

export const getHours = ({ format, step = 1 }: GetHoursParams) => {
  const is12Hour = format.includes('h');
  const start = is12Hour ? 1 : 0;
  const end = is12Hour ? 12 : 23;

  return new Array(Math.floor((end - start + 1) / step)).fill(0).map((_, i) => {
    const value = start + i * step;

    return {
      value,
      long: value.toString().padStart(2, '0'),
      short: value.toString(),
    };
  });
};

export const getTimeUnits = (step = 5) => {
  return new Array(Math.floor(60 / step)).fill(0).map((_, i) => {
    const value = i * step;

    return {
      value,
      long: value.toString().padStart(2, '0'),
      short: value.toString(),
    };
  });
};

export const sectionsToViews = (sections: Array<DateFormatSection>) => {
  const views: Array<TimeViewType> = [];

  sections.map((section) => {
    switch (section.format) {
      case 'A':
      case 'a':
        views.push('ampm');
        break;
      case 'H':
      case 'HH':
      case 'h':
      case 'hh':
        views.push('hour');
        break;
      case 'm':
      case 'mm':
        views.push('minute');
        break;
      case 's':
      case 'ss':
        views.push('second');
    }
  });

  return views;
};
