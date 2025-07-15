import type { ButtonProps } from '../button/types';
import type { TypographyProps } from '../typography/types';
import type { CSSProperties, ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
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

export type FallbackViewButtonProps = ButtonProps;
