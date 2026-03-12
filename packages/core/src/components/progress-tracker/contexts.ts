import { createContext } from '@radix-ui/react-context';

import { PROGRESS_TRACKER_NAME } from './constants';

import type { ProgressTrackerItemProps, ProgressTrackerProps } from './types';

type ProgressTrackerContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  steps: Array<ProgressTrackerItemProps>;
  getStepIndex: (value: string) => number;
  getActiveStepIndex: () => number;
  getTotalLength: () => number;
  direction: Exclude<ProgressTrackerProps['direction'], undefined>;
};

export const [ProgressTrackerProvider, useProgressTrackerContext] =
  createContext<ProgressTrackerContextValue>(PROGRESS_TRACKER_NAME);
