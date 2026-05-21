import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@montage-ui/engine';

export type IconButtonVariant = 'normal' | 'background' | 'outlined' | 'solid';

export type IconButtonDefaultProps = WithSxProps<{
  variant?: IconButtonVariant;
  /** Whether the icon button is disabled. */
  disabled?: boolean;
  /** Whether to disable the interaction. */
  disableInteraction?: boolean;
  /**
   * The size of the icon button.
   *
   * - `normal`: 'xlarge'=24 / 'large'=20 / 'medium'=18 / 'small'=16 (아이콘 px). number는 아이콘 px.
   * - `background`: 프리셋 미지원, number만 (커스텀 아이콘 px). 기본 24.
   * - `solid` / `outlined`: 'medium'=40×40 / 'small'=32×32 (컨테이너 px). number는 컨테이너 px. 'large'/'xlarge'는 'medium'으로 폴백.
   */
  size?: number | 'xlarge' | 'large' | 'medium' | 'small';
  /** The color of the icon. */
  color?: ThemeColorsToken;
  /** The color of the icon button when the interaction is triggered. */
  interactionColor?: ThemeColorsToken;
  /**
   * When `variant` is `background`, if `alternative` is true, the icon button uses a dark-colored background.
   */
  alternative?: boolean;
  /** The content of the icon button. Use icon component as the children. */
  children?: ReactNode;
}>;

export type IconButtonResponsiveProps = ResponsiveProps<
  Pick<IconButtonDefaultProps, 'size'>
>;

export type IconButtonProps = Merge<
  IconButtonDefaultProps,
  IconButtonResponsiveProps
>;
