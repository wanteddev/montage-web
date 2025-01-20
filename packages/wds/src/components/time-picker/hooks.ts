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
      return getHours({ format, locale });

    case 'h':
    case 'hh':
      const hours12 = getHours({ format, locale });
      return [hours12.pop(), ...hours12];

    case 'm':
    case 'mm':
      return getMinutes({ locale });

    case 's':
    case 'ss':
      return getSeconds({ locale });
  }
};
