import type { ComponentPropsWithRef, ReactNode } from 'react';

export type AlertProps = {
  variant?: 'normal' | 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
  show?: boolean;
  defaultShow?: boolean;
  onShowChange?: (state: boolean) => void;
  wrapperProps?: ComponentPropsWithRef<'div'>;
};
