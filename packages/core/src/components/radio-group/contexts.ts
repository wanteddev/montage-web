import { createContext } from '@radix-ui/react-context';

import { RADIO_GROUP_NAME } from './constants';

export type RadioGroupContextType = {
  name?: string;
  required: boolean;
  disabled: boolean;
  value?: string;
  onValueChange(value: string): void;
};

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContextType>(RADIO_GROUP_NAME);
