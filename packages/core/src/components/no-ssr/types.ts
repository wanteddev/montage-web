import type { ReactNode } from 'react';

export type NoSsrProps = {
  children: ReactNode;
  fallback?: ReactNode;
};
