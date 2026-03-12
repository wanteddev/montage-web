import { createContext } from '@radix-ui/react-context';

import { TOAST_NAME } from './constants';

import type { RegionToastItem } from '../../stores/region-store';

type ToastContextType = {
  contentId: string;
  variant: Exclude<RegionToastItem['variant'], undefined>;
};

export const [ToastProvider, useToastContext] =
  createContext<ToastContextType>(TOAST_NAME);
