import type { Merge, ResponsiveProps, Spacing } from '@/types';
import type { CSSProperties } from 'react';

export type GridSpacing = keyof Spacing;

export type GridDefaultProps = {
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  wrap?: CSSProperties['flexWrap'];
  className?: string;
  spacing?: GridSpacing;
  rowSpacing?: GridSpacing;
  columnSpacing?: GridSpacing;
};

export type GridResponsiveProps = ResponsiveProps<
  Pick<
    GridDefaultProps,
    | 'direction'
    | 'justify'
    | 'alignItems'
    | 'spacing'
    | 'rowSpacing'
    | 'columnSpacing'
  >
>;

export type GridProps = Merge<GridDefaultProps, GridResponsiveProps>;
