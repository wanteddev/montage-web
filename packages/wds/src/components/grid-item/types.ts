import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode } from 'react';

export type GridItemDefaultProps = WithSxProps<{
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
  offset?: number | 'auto';
  children?: ReactNode;
}>;

export type GridItemResponsiveProps = ResponsiveProps<
  Pick<GridItemDefaultProps, 'alignSelf' | 'columns' | 'offset'>
>;

export type GridItemProps = Merge<
  GridItemDefaultProps,
  GridItemResponsiveProps
>;
