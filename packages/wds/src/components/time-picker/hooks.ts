import { getMeridiem } from '../date-calendar/helpers';

import { getHours, getTimeUnits } from './helpers';

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
      return getHours({ format });

    case 'h':
    case 'hh':
      const hours12 = getHours({ format });
      return [hours12.pop(), ...hours12];

    case 'm':
    case 'mm':
      return getTimeUnits();

    case 's':
    case 'ss':
      return getTimeUnits();
  }
};
