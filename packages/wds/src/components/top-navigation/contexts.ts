import createLooseContext from '../../hooks/internal/use-loose-context';

import { TOP_NAVIGATION_NAME } from './constants';

import type { TopNavigationProps } from './types';

type TopNavigationContextValue = {
  variant: Exclude<TopNavigationProps['variant'], undefined>;
};

export const [TopNavigationProvider, useTopNavigationContext] =
  createLooseContext<TopNavigationContextValue>(TOP_NAVIGATION_NAME);
