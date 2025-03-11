import type { ReactNode } from 'react';

export type SectionMessageProps = {
  variant?: 'info' | 'positive' | 'cautionary' | 'negative' | 'custom';
  children: ReactNode;
  show?: boolean;
  defaultShow?: boolean;
  onShowChange?: (state: boolean) => void;
  /**
   * 닫기 버튼을 표시합니다.
   */
  closeIcon?: boolean;
  /**
   * 기본적으로 variant에 따른 아이콘을 표시합니다.
   */
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  caption?: ReactNode;
  actionArea?: ReactNode;
};
