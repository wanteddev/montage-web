import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type AlertProps = {
  variant?: 'normal' | 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
  show?: boolean;
  defaultShow?: boolean;
  onShowChange?: (state: boolean) => void;
  wrapperProps?: DefaultComponentProps<{}, 'div'>;
  /**
   * Portal로 표시될 container를 지정합니다.
   */
  container?: Element | DocumentFragment | null;
  disablePortal?: boolean;

  /**
   * 닫기 버튼을 표시합니다.
   */
  closeIcon?: boolean;
};
