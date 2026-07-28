import { createContext } from '@radix-ui/react-context';

import { SEGMENTED_CONTROL_NAME } from './constants';

import type { SegmentedControlProps } from './types';

export type SegmentedControlContextType = {
  value?: string;
  onValueChange: (value: string) => void;
  size: Exclude<SegmentedControlProps['size'], undefined>;
  responsive?: Pick<SegmentedControlProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  iconOnly?: boolean;
  name?: string;
};

export const [SegmentedControlProvider, useSegmentedControlContext] =
  createContext<SegmentedControlContextType>(SEGMENTED_CONTROL_NAME);
