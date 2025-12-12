import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type PaginationDotsDefaultProps = WithSxProps<{
  size?: 'small' | 'medium';
  /** The total number of pages. */
  totalPages: number;
  /** The current page number. */
  currentPage?: number;
  /** The maximum number of dots to display. */
  maxDotCount?: number;
  color?: 'normal' | 'white';
  /** Callback function when the dot is clicked. */
  onClickDot?: (page: number) => void;
}>;

type PaginationDotsResponsiveProps = ResponsiveProps<
  Pick<PaginationDotsDefaultProps, 'size'>
>;

export type PaginationDotsProps = Merge<
  PaginationDotsDefaultProps,
  PaginationDotsResponsiveProps
>;
