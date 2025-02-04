import type { TimeViewType } from '../time-view/types';
import type { DateFormatSection } from '../date-picker/helpers';

export const sectionsToViews = (sections: Array<DateFormatSection>) => {
  const views: Array<TimeViewType> = [];

  sections.map((section) => {
    switch (section.format) {
      case 'A':
      case 'a':
        views.push('meridiem');
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
