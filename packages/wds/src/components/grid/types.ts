import type { Merge, ResponsiveProps, Spacing } from '@/types';
import type { CSSProperties } from 'react';

export type GridSpacing = keyof Spacing;

export type GridDefaultProps = {
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  spacing?: GridSpacing;
  rowSpacing?: GridSpacing;
  columnSpacing?: GridSpacing;
};

export type GridResponsiveProps = ResponsiveProps<
  Pick<
    GridDefaultProps,
    'justifyContent' | 'alignItems' | 'spacing' | 'rowSpacing' | 'columnSpacing'
  >
>;

export type GridProps = Merge<GridDefaultProps, GridResponsiveProps>;
