import type { ReactNode } from 'react';

export type BottomNavigationProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (BottomNavigation: string) => void;
};

export type BottomNavigationItemProps = {
  label?: ReactNode;
  icon?: ReactNode;
  value: string;
};
