import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

type PaginationCounterDefaultProps = {
  size?: 'small' | 'medium';
  totalPage: number;
  currentPage?: number;
  alternative?: boolean;
};

type PaginationCounterResponsiveProps = ResponsiveProps<
  Pick<PaginationCounterDefaultProps, 'size'>
>;

export type PaginationCounterProps = Merge<
  PaginationCounterDefaultProps,
  PaginationCounterResponsiveProps
>;
