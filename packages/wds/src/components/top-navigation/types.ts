import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type TopNavigationProps = Merge<
  {
    variant?: 'normal' | 'floating' | 'extended';
    trailingContent?: ReactNode;
    leadingContent?: ReactNode;
    toolbar?: ReactNode;
    scrolled?: boolean;
    /**
     * 네비게이션 title에 부여할 id입니다.
     */
    titleId?: string;
    children?: ReactNode;
  },
  ResponsiveProps<{}>
>;

export type TopNavigationButtonProps = {
  variant?: 'text' | 'icon';
  /**
   * `floating` navigation을 사용할 때
   * alternative를 true로 넘기면 검정 테마가 활성화 됩니다.
   */
  alternative?: boolean;
  /**
   * `floating` navigation을 사용할 때
   * 백그라운드 아이콘을 사용할지 결정합니다.
   */
  background?: boolean;
  disabled?: boolean;
  size?: number | 'normal' | 'small';
  children?: ReactNode;
};
