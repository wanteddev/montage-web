import type { ReactNode } from 'react';

export type BottomNavigationProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (BottomNavigation: string) => void;
  children?: ReactNode;
};

export type BottomNavigationItemProps = {
  label?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  value: string;
};
