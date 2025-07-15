import type { TypographyProps } from '../typography';
import type { SkeletonProps } from '../skeleton/types';
import type { ImageLoader } from '../image-loader';
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type {
  ThumbnailDefaultProps,
  ThumbnailSkeletonProps,
} from '../thumbnail/types';
import type { FlexBoxProps } from '../flex-box/types';

export type CardDefaultProps = WithSxProps<{
  platform?: 'desktop' | 'mobile';
  width?: CSSProperties['width'];
  children?: ReactNode;
}>;

export type CardResponsiveProps = ResponsiveProps<Omit<CardDefaultProps, 'sx'>>;

export type CardProps = Merge<
  Merge<CardDefaultProps, CardResponsiveProps>,
  FlexBoxProps
>;

export type CardThumbnailBasicProps = Merge<
  Omit<ThumbnailDefaultProps, 'border' | 'radius'>,
  ComponentPropsWithoutRef<typeof ImageLoader>
>;
export type CardThumbnailDefaultProps = {
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  children?: ReactNode;
};
export type CardThumbnailResponsiveProps = ResponsiveProps<
  Pick<CardThumbnailBasicProps, 'ratio'>
>;
export type CardThumbnailProps = Merge<
  Merge<CardThumbnailDefaultProps, CardThumbnailBasicProps>,
  CardThumbnailResponsiveProps
>;

export type CardThumbnailContentProps = Merge<
  {
    variant?: 'text' | 'toggle-icon' | 'custom';
  },
  FlexBoxProps
>;

export type CardTitleProps = TypographyProps;
export type CardCaptionProps = TypographyProps;

export type CardContentProps = FlexBoxProps;

export type CardContentItemDefaultProps = {
  variant?: 'badge' | 'custom';
  position?: 'top' | 'bottom';
};
export type CardContentItemProps = Merge<
  CardContentItemDefaultProps,
  FlexBoxProps
>;

type CardCaptionSkeletonDefaultProps = {
  type?: 'normal' | 'extra' | 'sub';
  children?: ReactNode;
};
export type CardCaptionSkeletonProps = Merge<
  CardCaptionSkeletonDefaultProps,
  SkeletonProps
>;

export type CardTitleSkeletonProps = SkeletonProps;

export type CardThumbnailSkeletonProps = ThumbnailSkeletonProps;
