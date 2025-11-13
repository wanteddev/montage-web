'use client';
import { useEffect, useState } from 'react';

import type { ReactNode } from 'react';

type DelayMountProps = {
  children: ReactNode;
  delay?: number;
  fallback?: ReactNode;
};

const DelayMount = ({
  children,
  delay = 300,
  fallback = null,
}: DelayMountProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return <>{isMounted ? children : fallback}</>;
};

export default DelayMount;
