import type { ButtonProps } from '../button/types';
import type { TypographyProps } from '../typography/types';
import type { CSSProperties, ReactNode } from 'react';
import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';
import type { FlexBoxProps } from '../flex-box/types';

export type FallbackViewDefaultProps = WithSxProps<{
  platform?: 'desktop' | 'mobile';
  padding?: 'normal' | 'compact';
  width?: CSSProperties['width'];
  children?: ReactNode;
}>;
export type FallbackViewResponsiveProps = ResponsiveProps<
  Pick<FallbackViewDefaultProps, 'platform' | 'padding' | 'width'>
>;

export type FallbackViewProps = Merge<
  Merge<FallbackViewDefaultProps, FallbackViewResponsiveProps>,
  FlexBoxProps
>;

/**
 * @deprecated Fallback view is not display image
 */
export type FallbackViewImageProps = FlexBoxProps;

export type FallbackViewContentProps = FlexBoxProps;

export type FallbackViewTextDefaultProps = WithSxProps<{
  title?: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}>;

export type FallbackViewTextProps = Merge<
  FallbackViewTextDefaultProps,
  TypographyProps
>;

export type FallbackViewActionAreaDefaultProps = WithSxProps<{
  /**
   * The layout of the action area.
   * - `single`: A single button placed in one row.
   * - `horizontal`: Buttons placed side by side in one row.
   * - `vertical`: Buttons stacked in a column.
   */
  variant?: 'single' | 'horizontal' | 'vertical';
  children?: ReactNode;
}>;

export type FallbackViewActionAreaProps = Merge<
  FallbackViewActionAreaDefaultProps,
  FlexBoxProps
>;

export type FallbackViewActionAreaButtonProps = ButtonProps;
