import type { Merge, ResponsiveProps } from '../../types';
import type { CSSProperties } from 'react';

export type GridItemDefaultProps = {
  alignSelf?: CSSProperties['alignSelf'];
  columns?:
    | 1
    | 2
    | 2.4
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto'
    | true;
};

export type GridItemResponsiveProps = ResponsiveProps<
  Pick<GridItemDefaultProps, 'alignSelf' | 'columns'>
>;

export type GridItemProps = Merge<
  GridItemDefaultProps,
  GridItemResponsiveProps
>;
