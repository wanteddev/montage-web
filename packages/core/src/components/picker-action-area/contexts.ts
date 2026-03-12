import { createContext } from '@radix-ui/react-context';

import type { RefObject } from 'react';
import type { DateType } from '../date-picker';

type PickerActionAreaContextValue = {
  timezone?: string;
  value: DateType;
  initialValue: RefObject<DateType>;
  onChangeComplete: (value: DateType) => void;
};

export const [PickerActionAreaProvider, usePickerActionAreaContext] =
  createContext<PickerActionAreaContextValue>('DatePicker OR TimePicker');
