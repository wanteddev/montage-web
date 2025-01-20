import { createContext } from '@radix-ui/react-context';

import { TIME_PICKER_NAME } from './constants';

import type { DateFormatSection } from '../date-picker/helpers';

export const [TimePickerProvider, useTimePickerContext] =
  createContext<NewTimePickerContextType>(TIME_PICKER_NAME);

export type NewTimePickerContextType = {
  handleTimeClick: (section: DateFormatSection) => void;
};
