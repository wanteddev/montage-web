import { createContext } from '@radix-ui/react-context';
import { createRovingFocusGroupScope } from '@radix-ui/react-roving-focus';

import { RADIO_GROUP_NAME } from './constants';

export type RadioGroupContextType = {
  name?: string;
  required: boolean;
  disabled: boolean;
  value?: string;
  onValueChange(value: string): void;
};

export const useRovingFocusGroupScope = createRovingFocusGroupScope();

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContextType>(RADIO_GROUP_NAME);
