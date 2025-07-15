import { useEffect, useLayoutEffect, useState } from 'react';

import type { NoSsrProps } from './types';

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const NoSsr = ({ children, fallback }: NoSsrProps) => {
  const [mountedState, setMountedState] = useState(false);

  useEnhancedEffect(() => {
    if (!mountedState) {
      setMountedState(true);
    }
  }, []);

  return <>{mountedState ? children : fallback}</>;
};

export { NoSsr };

export type { NoSsrProps };
