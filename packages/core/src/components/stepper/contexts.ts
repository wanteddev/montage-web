import { createContext } from '@radix-ui/react-context';

import { STEPPER_NAME } from './constants';

import type { StepperItemProps } from './types';

type StepperContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  steps: Array<StepperItemProps>;
  getStepIndex: (value: string) => number;
  getActiveStepIndex: () => number;
};

export const [StepperProvider, useStepperContext] =
  createContext<StepperContextValue>(STEPPER_NAME);
