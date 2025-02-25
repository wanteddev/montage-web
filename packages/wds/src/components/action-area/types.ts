import type { TextButtonProps } from '../text-button/types';
import type { ButtonProps } from '../button/types';
import type { ReactNode } from 'react';

export type ActionAreaProps = {
  children?: ReactNode;
  variant?: 'strong' | 'neutral' | 'compact' | 'cancel';
  extra?: boolean;
  caption?: ReactNode;
  /**
   * `extra=true` 일 때 버튼 위 콘텐츠 영역을 표시할 때 사용합니다.
   */
  extraContent?: ReactNode;
  /**
   * `variant=compact` 일 때 버튼 좌측 콘텐츠 영역을 표시할 때 사용합니다.
   */
  compactContent?: ReactNode;
  /**
   * 스크롤이 있을 때 `sticky=true` 로 주면 추가 스타일이 활성화됩니다.
   * Modal 내부에서 사용할 경우 Modal 내부 로직에 의해 처리됩니다.
   */
  sticky?: boolean;
  /**
   * `extra=true` 일 때 상단에 라인을 표시합니다.
   */
  divider?: boolean;
};

export type ActionButtonProps = {
  children?: ReactNode;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  variant?: 'main' | 'alternative' | 'sub';
  iconOnly?: boolean;
  disabled?: boolean;
  /**
   * text button의 variant를 override 할 때 사용합니다.
   */
  textButtonVariant?: TextButtonProps['variant'];
  /**
   * button의 variant를 override 할 때 사용합니다.
   */
  buttonVariant?: ButtonProps['variant'];
  /**
   * button의 color를 override 할 때 사용합니다.
   */
  buttonColor?: ButtonProps['color'];
  loading?: ButtonProps['loading'];
};
