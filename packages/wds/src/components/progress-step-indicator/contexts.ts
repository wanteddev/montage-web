import { createContext } from '@radix-ui/react-context';

import { PROGRESS_STEP_INDICATOR_NAME } from './constants';

type ProgressStepIndicatorContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  steps: Array<string>;
  onStepAdd: (value: string) => void;
  onStepRemove: (value: string) => void;
  getStepIndex: (value: string) => number;
  getActiveStepIndex: () => number;
};

export const [ProgressStepIndicatorProvider, useProgressStepIndicatorContext] =
  createContext<ProgressStepIndicatorContextValue>(
    PROGRESS_STEP_INDICATOR_NAME,
  );
