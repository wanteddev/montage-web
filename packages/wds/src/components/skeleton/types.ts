import type { CSSProperties } from 'react';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  ThemeOpacityToken,
} from '@wanteddev/wds-engine';

type SkeletonDefaultProps = {
  variant?: 'text' | 'circle' | 'rectangle';
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  radius?: CSSProperties['borderRadius'];
  color?: ThemeColorsToken;
  opacity?: ThemeOpacityToken;
  align?: 'left' | 'center' | 'right';
  animation?: boolean;
};

type SkeletonResponsiveProps = ResponsiveProps<
  Pick<SkeletonDefaultProps, 'width' | 'height'>
>;

export type SkeletonProps = Merge<
  SkeletonDefaultProps,
  SkeletonResponsiveProps
>;
