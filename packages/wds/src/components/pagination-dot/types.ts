import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

type PaginationDotDefaultProps = {
  size?: 'small' | 'normal';
  totalPage: number;
  currentPage?: number;
  maxDotCount?: number;
  color?: 'normal' | 'white';
  onClickDot?: (page: number) => void;
};

type PaginationDotResponsiveProps = ResponsiveProps<
  Pick<PaginationDotDefaultProps, 'size'>
>;

export type PaginationDotProps = Merge<
  PaginationDotDefaultProps,
  PaginationDotResponsiveProps
>;
