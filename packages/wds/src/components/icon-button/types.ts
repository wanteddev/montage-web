import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';

export type IconButtonVariant = 'normal' | 'background' | 'outlined' | 'solid';

export type IconButtonDefaultProps = {
  variant?: IconButtonVariant;
  disabled?: boolean;
  disableInteraction?: boolean;
  size?: number | 'normal' | 'small';
  color?: ThemeColorsToken;
  interactionColor?: ThemeColorsToken;
  /**
   * `background` 버튼으로 사용할 때
   * alternative를 true로 넘기면 검정 테마가 활성화 됩니다.
   */
  alternative?: boolean;
  children?: ReactNode;
};

export type IconButtonResponsiveProps = ResponsiveProps<
  Pick<IconButtonDefaultProps, 'size'>
>;

export type IconButtonProps = Merge<
  IconButtonDefaultProps,
  IconButtonResponsiveProps
>;
