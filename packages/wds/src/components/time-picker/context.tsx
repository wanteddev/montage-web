import { createContext } from '@radix-ui/react-context';

import { TIME_PICKER_NAME } from './constants';

import type { DateType } from '../date-picker';
import type { DateFormatSection } from '../date-picker/helpers';

export const [TimePickerProvider, useTimePickerContext] =
  createContext<NewTimePickerContextType>(TIME_PICKER_NAME);

export type NewTimePickerContextType = {
  timezone?: string;
  onOpenChange: (open: boolean) => void;
  handleValueChange: (value: DateType) => void;
  handleTimeClick: (section: DateFormatSection) => void;
};
