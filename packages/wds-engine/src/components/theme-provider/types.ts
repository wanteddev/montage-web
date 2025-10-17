import type { Theme } from '@wanteddev/wds-theme';
import type { JSX, ReactNode } from 'react';

export type ThemeProviderProps = {
  theme?: 'light' | 'dark';
  children: ReactNode;
  provider?: (props: { theme: Theme; children: ReactNode }) => JSX.Element;
};
