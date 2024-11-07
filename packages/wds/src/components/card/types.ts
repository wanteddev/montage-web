import type { SkeletonProps } from '../skeleton/types';
import type ImageLoader from '../image-loader';
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ThumbnailDefaultProps } from '../thumbnail/types';
import type { FlexBoxProps } from '../flex-box/types';

export type CardDefaultProps = {
  platform?: 'desktop' | 'mobile';
  width?: CSSProperties['width'];
};
export type CardResponsiveProps = ResponsiveProps<CardDefaultProps>;
export type CardProps = Merge<
  Merge<CardDefaultProps, CardResponsiveProps>,
  FlexBoxProps
>;

export type CardThumbnailBasicProps = Merge<
  Omit<ThumbnailDefaultProps, 'border' | 'radius'>,
  ComponentPropsWithoutRef<typeof ImageLoader>
>;
export type CardThumbnailDefaultProps = {
  overlay?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
};
export type CardThumbnailProps = Merge<
  CardThumbnailDefaultProps,
  CardThumbnailBasicProps
>;

export type CardThumbnailContentProps = Merge<
  {
    variant?: 'text' | 'toggle-icon' | 'custom';
  },
  FlexBoxProps
>;

export type CardExtraContentDefaultProps = {
  variant?: 'badge' | 'custom';
  position?: 'top' | 'bottom';
};
export type CardExtraContentProps = Merge<
  CardExtraContentDefaultProps,
  FlexBoxProps
>;

type CardCaptionSkeletonDefaultProps = {
  type?: 'normal' | 'extra';
};
export type CardCaptionSkeletonProps = Merge<
  CardCaptionSkeletonDefaultProps,
  SkeletonProps
>;
