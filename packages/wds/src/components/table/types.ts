import type { WithSxProps } from '@wanteddev/wds-engine';
import type { TypographyProps } from '../typography/types';
import type { ReactNode, Ref } from 'react';

export type TableProps = WithSxProps<{
  pagination?: ReactNode;
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
  interaction?: boolean;
  children?: ReactNode;
}>;

export type TableCellProps = TypographyProps;
export type TableHeadCellProps = TypographyProps;
