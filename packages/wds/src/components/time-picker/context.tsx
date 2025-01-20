import { createContext } from '@radix-ui/react-context';

import { TIME_PICKER_NAME } from './constants';

import type useTimePicker from './hooks';
import type { TimePickerProps, TimePickerValue, TimeSection } from './types';

type TimePickerContextType = Required<
  Pick<TimePickerProps, 'format' | 'hourFormat'>
> &
  ReturnType<typeof useTimePicker> & {
    item: HTMLInputElement | null;
    value: TimePickerValue;
    inputValue: string;
    targetSection: TimeSection | null;
    isNotSelectedTime: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    setInputValue: (value: string) => void;
    setTargetSection: (section: TimeSection) => void;
  };

export const [TimePickerProvider, useTimePickerContext] =
  createContext<TimePickerContextType>(TIME_PICKER_NAME);
