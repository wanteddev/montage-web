import type { TypographyProps } from '../typography/types';
import type { ReactNode, Ref } from 'react';

export type TableProps = {
  pagination?: ReactNode;
  viewportRef?: Ref<HTMLDivElement>;
};

export type TableHeadProps = {};
export type TableBodyProps = {};
export type TableFootProps = {};

export type TableRowProps = {
  interaction?: boolean;
};

export type TableCellProps = TypographyProps;
export type TableHeadCellProps = TypographyProps;
