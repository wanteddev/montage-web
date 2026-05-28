import type {
  Merge,
  ResponsiveProps,
  Theme,
  WithSxProps,
} from '@montage-ui/engine';
import type { CSSProperties, ReactNode } from 'react';

export type GridSpacing = keyof Theme['spacing'];

export type GridDefaultProps = WithSxProps<{
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  spacing?: GridSpacing;
  rowSpacing?: GridSpacing;
  columnSpacing?: GridSpacing;
  /** The content of the grid. Use `GridItem` components as the children. */
  children?: ReactNode;
}>;

export type GridResponsiveProps = ResponsiveProps<
  Pick<
    GridDefaultProps,
    'justifyContent' | 'alignItems' | 'spacing' | 'rowSpacing' | 'columnSpacing'
  >
>;

export type GridProps = Merge<GridDefaultProps, GridResponsiveProps>;
