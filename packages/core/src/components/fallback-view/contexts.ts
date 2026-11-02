import { createContext } from '@radix-ui/react-context';

import { FALLBACK_VIEW_NAME } from './constants';

import type { FallbackViewProps } from './types';
import type { BreakPoint } from '@montage-ui/engine';

export type FallbackViewContextType = {
  platform?: Exclude<FallbackViewProps['platform'], undefined>;
  responsive?: Pick<FallbackViewProps, keyof BreakPoint>;
};

export const [FallbackViewProvider, useFallbackViewContext] =
  createContext<FallbackViewContextType>(FALLBACK_VIEW_NAME);
