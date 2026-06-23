import { useState } from 'react';

import useEnhancedEffect from '../../hooks/internal/use-enhanced-effect';

import type { NoSsrProps } from './types';

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
