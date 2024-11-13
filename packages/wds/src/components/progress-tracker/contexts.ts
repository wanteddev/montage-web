import { createContext } from '@radix-ui/react-context';

import { PROGRESS_TRACKER_NAME } from './constants';

import type { ProgressTrackerItemProps } from './types';

type ProgressTrackerContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  steps: Array<ProgressTrackerItemProps>;
  getStepIndex: (value: string) => number;
  getActiveStepIndex: () => number;
  getTotalLength: () => number;
};

export const [ProgressTrackerProvider, useProgressTrackerContext] =
  createContext<ProgressTrackerContextValue>(PROGRESS_TRACKER_NAME);
