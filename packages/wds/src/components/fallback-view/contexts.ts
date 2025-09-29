import { createContext } from '@radix-ui/react-context';

import { FALLBACK_VIEW_NAME } from './constants';

import type { BreakPoint } from '@wanteddev/wds-engine';
import type { FallbackViewProps } from './types';

export type FallbackViewContextType = {
  platform?: Exclude<FallbackViewProps['platform'], undefined>;
  responsive?: Pick<FallbackViewProps, keyof BreakPoint>;
};

export const [FallbackViewProvider, useFallbackViewContext] =
  createContext<FallbackViewContextType>(FALLBACK_VIEW_NAME);
