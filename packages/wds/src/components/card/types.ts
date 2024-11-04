import type ImageLoader from '../image-loader';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { TypographyProps } from '../typography/types';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ThumbnailDefaultProps } from '../thumbnail/types';
import type { FlexBoxProps } from '../flex-box/types';

export type CardDefaultProps = {
  platform?: 'desktop' | 'mobile';
};
export type CardResponsiveProps = ResponsiveProps<CardDefaultProps>;
export type CardProps = Merge<
  Merge<CardDefaultProps, CardResponsiveProps>,
  FlexBoxProps
>;

type CardThumbnailBasicProps = Merge<
  Pick<ThumbnailDefaultProps, 'ratio'> &
    ComponentPropsWithoutRef<typeof ImageLoader>,
  FlexBoxProps
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

export type CardThumbnailContentProps = {
  variant?: 'text' | 'icon' | 'icon-button' | 'custom';
};

export type CardContentProps = FlexBoxProps;
export type CardExtraContentDefaultProps = {
  variant?: 'badge' | 'custom';
  position?: 'top' | 'bottom';
};
export type CardExtraContentProps = Merge<
  CardExtraContentDefaultProps,
  FlexBoxProps
>;

export type CardTitleProps = TypographyProps;
export type CardCaptionProps = TypographyProps;
