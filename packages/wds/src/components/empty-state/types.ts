import type { TypographyProps } from '../typography/types';
import type { CSSProperties, ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { FlexBoxProps } from '../flex-box/types';

export type EmptyStateDefaultProps = {
  platform?: 'desktop' | 'mobile';
  padding?: 'normal' | 'compact';
  width?: CSSProperties['width'];
  children?: ReactNode;
};
export type EmptyStateResponsiveProps = ResponsiveProps<
  Pick<EmptyStateDefaultProps, 'platform' | 'padding' | 'width'>
>;

export type EmptyStateProps = Merge<
  Merge<EmptyStateDefaultProps, EmptyStateResponsiveProps>,
  FlexBoxProps
>;

export type EmptyStateImageProps = FlexBoxProps;

export type EmptyStateTextDefaultProps = {
  heading?: ReactNode;
  description: ReactNode;
  children?: ReactNode;
};
export type EmptyStateTextProps = Merge<
  EmptyStateTextDefaultProps,
  TypographyProps
>;
