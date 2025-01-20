import { getMeridiem } from '../date-calendar/helpers';

import { getHours, getMinutes, getSeconds } from './helpers';

import type { DatePickerFormat } from '../date-picker/types';

type Props = {
  format: DatePickerFormat;
  locale?: string;
};

export const useTimePickerList = ({ locale, format }: Props) => {
  switch (format) {
    case 'A':
    case 'a':
      return getMeridiem(locale);

    case 'H':
    case 'HH':
    case 'h':
    case 'hh':
      return getHours({ format, locale });

    case 'm':
    case 'mm':
      return getMinutes({ locale });

    case 's':
    case 'ss':
      return getSeconds({ locale });
  }
};
