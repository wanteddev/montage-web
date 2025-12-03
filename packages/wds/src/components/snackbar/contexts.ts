import { createContext } from '@radix-ui/react-context';

import { SNACKBAR_NAME } from './constants';

import type { RegionToastItem } from '../../stores/region-store';

type SnackbarContextType = {
  headingId: string;
  descriptionId: string;
  variant: Exclude<RegionToastItem['variant'], undefined>;
  onOpenChange: (open: boolean) => void;
};

export const [SnackbarProvider, useSnackbarContext] =
  createContext<SnackbarContextType>(SNACKBAR_NAME);
