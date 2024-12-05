import { createContext } from '@radix-ui/react-context';

import { PROGRESS_TRACKER_DESKTOP_NAME } from './constants';

import type { ProgressTrackerDesktopItemProps } from './types';

type ProgressTrackerDesktopContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  steps: Array<ProgressTrackerDesktopItemProps>;
  getStepIndex: (value: string) => number;
  getActiveStepIndex: () => number;
};

export const [
  ProgressTrackerDesktopProvider,
  useProgressTrackerDesktopContext,
] = createContext<ProgressTrackerDesktopContextValue>(
  PROGRESS_TRACKER_DESKTOP_NAME,
);
