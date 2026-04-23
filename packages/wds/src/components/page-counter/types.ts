import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

type PageCounterDefaultProps = WithSxProps<{
  size?: 'small' | 'medium';
  /** The total number of pages. */
  totalPages: number;
  /** The current page number. */
  currentPage?: number;
  /** If true, renders a fallback style that looks natural in environments where `blur` is not supported. */
  alternative?: boolean;
}>;

type PageCounterResponsiveProps = ResponsiveProps<
  Pick<PageCounterDefaultProps, 'size'>
>;

export type PageCounterProps = Merge<
  PageCounterDefaultProps,
  PageCounterResponsiveProps
>;
