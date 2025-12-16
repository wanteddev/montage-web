import type { TypographyProps } from '../typography';
import type { SkeletonProps } from '../skeleton/types';
import type { CSSProperties, ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type {
  ThumbnailProps,
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

export type CardThumbnailDefaultProps = Merge<
  {
    /**
     * Leading content is displayed as overlay areas on top of the thumbnail.
     * Place them in the leading area by wrapping them with CardThumbnailContent.
     */
    leadingContent?: ReactNode;
    /**
     * Trailing content is displayed as overlay areas on top of the thumbnail.
     * Place them in the trailing area by wrapping them with CardThumbnailContent.
     */
    trailingContent?: ReactNode;
    children?: ReactNode;
  },
  Omit<ThumbnailProps, 'border' | 'radius'>
>;

export type CardThumbnailResponsiveProps = ResponsiveProps<
  Pick<CardThumbnailDefaultProps, 'ratio'>
>;
export type CardThumbnailProps = Merge<
  CardThumbnailResponsiveProps,
  CardThumbnailDefaultProps
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
