import type { ReactElement } from 'react';

export type Scope = Record<string, any> & {
  import?: Record<string, any>;
};

export type RunnerOptions = {
  code: string;
  scope?: Scope;
};

export type UseRunnerReturn = {
  element: ReactElement | null;
  error: string | null;
};
