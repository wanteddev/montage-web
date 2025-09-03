import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type PageCounterDefaultProps = WithSxProps<{
  size?: 'small' | 'medium';
  totalPages: number;
  currentPage?: number;
  alternative?: boolean;
}>;

type PageCounterResponsiveProps = ResponsiveProps<
  Pick<PageCounterDefaultProps, 'size'>
>;

export type PageCounterProps = Merge<
  PageCounterDefaultProps,
  PageCounterResponsiveProps
>;
