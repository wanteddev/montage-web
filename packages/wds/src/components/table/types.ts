import type { WithSxProps } from '@wanteddev/wds-engine';
import type { TypographyProps } from '../typography/types';
import type { ReactNode, Ref } from 'react';

export type TableProps = WithSxProps<{
  /** The pagination of the table. Pass an `Pagination` component. */
  pagination?: ReactNode;
  /** The viewport ref of the table. Pass a `ref` to the `ScrollArea` component. */
  viewportRef?: Ref<HTMLDivElement>;
  children?: ReactNode;
}>;

export type TableHeadProps = WithSxProps<{
  children?: ReactNode;
}>;
export type TableBodyProps = WithSxProps<{
  children?: ReactNode;
}>;
export type TableFootProps = WithSxProps<{
  children?: ReactNode;
}>;

export type TableRowProps = WithSxProps<{
  /** Whether to enable the interaction. */
  interaction?: boolean;
  children?: ReactNode;
}>;

export type TableCellProps = TypographyProps;
export type TableHeadCellProps = TypographyProps;
