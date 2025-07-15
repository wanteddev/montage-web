import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type PaginationCounterDefaultProps = WithSxProps<{
  size?: 'small' | 'medium';
  totalPage: number;
  currentPage?: number;
  alternative?: boolean;
}>;

type PaginationCounterResponsiveProps = ResponsiveProps<
  Pick<PaginationCounterDefaultProps, 'size'>
>;

export type PaginationCounterProps = Merge<
  PaginationCounterDefaultProps,
  PaginationCounterResponsiveProps
>;
