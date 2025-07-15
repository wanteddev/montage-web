import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type BottomNavigationProps = WithSxProps<{
  defaultValue?: string;
  value?: string;
  onValueChange?: (BottomNavigation: string) => void;
  children?: ReactNode;
}>;

export type BottomNavigationItemProps = WithSxProps<{
  label?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  value: string;
}>;
