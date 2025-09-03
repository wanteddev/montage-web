import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type PaginationDotsDefaultProps = WithSxProps<{
  size?: 'small' | 'medium';
  totalPages: number;
  currentPage?: number;
  maxDotCount?: number;
  color?: 'normal' | 'white';
  onClickDot?: (page: number) => void;
}>;

type PaginationDotsResponsiveProps = ResponsiveProps<
  Pick<PaginationDotsDefaultProps, 'size'>
>;

export type PaginationDotsProps = Merge<
  PaginationDotsDefaultProps,
  PaginationDotsResponsiveProps
>;
