import type ImageLoader from '../image-loader';
import type { ComponentPropsWithoutRef } from 'react';
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

export type CardThumbnailDefaultProps = Pick<ThumbnailDefaultProps, 'ratio'> &
  ComponentPropsWithoutRef<typeof ImageLoader>;
export type CardThumbnailProps = Merge<CardThumbnailDefaultProps, FlexBoxProps>;

export type CardContentProps = FlexBoxProps;

export type CardTitleProps = TypographyProps;
export type CardCaptionProps = TypographyProps;
