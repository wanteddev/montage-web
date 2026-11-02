import { createContext } from '@radix-ui/react-context';

import type { DateType } from '../date-picker';
import type { DateRangeType } from '../date-range-calendar/types';
import type { RefObject } from 'react';

type PickerActionAreaContextValue = {
  timezone?: string;
  value: DateType | DateRangeType;
  initialValue: RefObject<DateType | DateRangeType>;
  onChangeComplete: (value: DateType | DateRangeType) => void;
  mode?: 'single' | 'range';
};

export const [PickerActionAreaProvider, usePickerActionAreaContext] =
  createContext<PickerActionAreaContextValue>(
    'DatePicker OR DateRangePicker OR TimePicker',
  );
