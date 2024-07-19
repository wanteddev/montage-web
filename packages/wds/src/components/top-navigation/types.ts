import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type TopNavigationProps = Merge<
  {
    variant?: 'normal' | 'floating' | 'emphasized' | 'extended';
    rightButton?: ReactNode;
    leftButton?: ReactNode;
    toolbar?: ReactNode;
    scrolled?: boolean;
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
};
