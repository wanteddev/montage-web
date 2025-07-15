import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type PaginationDotDefaultProps = WithSxProps<{
  size?: 'small' | 'medium';
  totalPage: number;
  currentPage?: number;
  maxDotCount?: number;
  color?: 'normal' | 'white';
  onClickDot?: (page: number) => void;
}>;

type PaginationDotResponsiveProps = ResponsiveProps<
  Pick<PaginationDotDefaultProps, 'size'>
>;

export type PaginationDotProps = Merge<
  PaginationDotDefaultProps,
  PaginationDotResponsiveProps
>;
