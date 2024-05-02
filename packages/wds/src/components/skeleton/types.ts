import type { CSSProperties } from 'react';
import type {
  Merge,
  MergeElementProps,
  ResponsiveProps,
} from '@wanteddev/wds-engine';

type SkeletonDefaultProps = {
  variant?: 'text' | 'circle' | 'rectangle';
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  radius?: CSSProperties['borderRadius'];
};

type SkeletonResponsiveProps = ResponsiveProps<
  Pick<SkeletonDefaultProps, 'width' | 'height'>
>;

export type SkeletonProps = MergeElementProps<
  'div',
  Merge<SkeletonDefaultProps, SkeletonResponsiveProps>
>;
