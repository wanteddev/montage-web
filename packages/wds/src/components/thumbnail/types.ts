import type { ImageBaseProps } from '../image-base';
import type { CSSProperties, ReactNode } from 'react';
import type { SkeletonProps } from '../skeleton/types';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type ThumbnailDefaultProps = WithSxProps<{
  /** The ratio of the thumbnail. */
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
  /**
   * Whether to enable portrait mode.
   * The aspect ratio is now specified as height:width instead of width:height.
   */
  portrait?: boolean;
  /** Whether to enable the border. */
  border?: boolean;
  /** Whether to enable the radius. */
  radius?: boolean;
  children?: ReactNode;
  /** The overlay of the thumbnail. */
  overlay?: ReactNode;
  /** The width of the thumbnail. */
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
