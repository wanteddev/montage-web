import type { ImageBaseProps } from '../image-base';
import type { CSSProperties, ReactNode } from 'react';
import type { SkeletonProps } from '../skeleton/types';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type ThumbnailDefaultProps = WithSxProps<{
  ratio?:
    | '1:1'
    | '5:4'
    | '4:3'
    | '3:2'
    | '16:10'
    | '1.618:1'
    | '16:9'
    | '2:1'
    | '21:9';
  portrait?: boolean;
  border?: boolean;
  radius?: boolean;
  children?: ReactNode;
  width?: CSSProperties['width'];
}>;

type ThumbnailResponsiveProps = ResponsiveProps<
  Pick<
    ThumbnailDefaultProps,
    'ratio' | 'portrait' | 'radius' | 'border' | 'width'
  >
>;

type ThumbnailBaseProps = Merge<
  ThumbnailDefaultProps,
  ThumbnailResponsiveProps
>;

export type ThumbnailProps = Merge<ThumbnailBaseProps, ImageBaseProps>;

export type ThumbnailSkeletonDefaultProps = Omit<SkeletonProps, 'radius'>;

export type ThumbnailSkeletonProps = Merge<
  ThumbnailBaseProps,
  ThumbnailSkeletonDefaultProps
>;
