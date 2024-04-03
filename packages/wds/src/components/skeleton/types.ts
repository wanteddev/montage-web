import type { CSSProperties } from 'react';
import type { MergeWithCss, ResponsiveProps } from '../../types';

type SkeletonDefaultProps = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};

type SkeletonResponsiveProps = ResponsiveProps<
  Pick<SkeletonDefaultProps, 'width' | 'height'>
>;

export type SkeletonProps = MergeWithCss<
  SkeletonDefaultProps,
  SkeletonResponsiveProps
>;
