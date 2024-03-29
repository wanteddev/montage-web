import { createContext } from '@radix-ui/react-context';

import { PROGRESS_TRACKER_NAME } from './constants';

type ProgressTrackerContextValue = {
  activeStep?: number;
};

export const [ProgressTrackerProvider, useProgressTrackerContext] =
  createContext<ProgressTrackerContextValue>(PROGRESS_TRACKER_NAME);
