import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { CSSProperties, Ref } from 'react';

export type SearchFieldDefaultProps = WithSxProps<{
  disabled?: boolean;
  /** The width of the search field. */
  width?: CSSProperties['width'];
  /** Callback function when the reset button is clicked. */
  onReset?: (prevValue: string) => void;
  /** The ref of the wrapper. */
  wrapperRef?: Ref<HTMLDivElement>;
  /** The size of the search field. */
  size?: 'medium' | 'small';
}>;

export type SearchFieldResponsiveProps = ResponsiveProps<
  Pick<SearchFieldDefaultProps, 'width' | 'size'>
>;

export type SearchFieldProps = Merge<
  SearchFieldDefaultProps,
  SearchFieldResponsiveProps
>;
