import { createContext } from '@radix-ui/react-context';

import { PROGRESS_STEP_INDICATOR_NAME } from './constants';

import type { ProgressStepIndicatorItemProps } from './types';

type ProgressStepIndicatorContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  steps: Array<ProgressStepIndicatorItemProps>;
  getStepIndex: (value: string) => number;
  getActiveStepIndex: () => number;
};

export const [ProgressStepIndicatorProvider, useProgressStepIndicatorContext] =
  createContext<ProgressStepIndicatorContextValue>(
    PROGRESS_STEP_INDICATOR_NAME,
  );
