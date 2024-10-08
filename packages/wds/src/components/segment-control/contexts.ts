import { createContext } from '@radix-ui/react-context';

import { SEGMENT_CONTROL_NAME } from './constants';

import type { SegmentControlProps } from './types';

export type SegmentControlContextType = {
  value?: string;
  onValueChange: (value: string) => void;
  variant: Exclude<SegmentControlProps['variant'], undefined>;
  size: Exclude<SegmentControlProps['size'], undefined>;
  responsive?: Pick<SegmentControlProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
};

export const [SegmentControlProvider, useSegmentControlContext] =
  createContext<SegmentControlContextType>(SEGMENT_CONTROL_NAME);
