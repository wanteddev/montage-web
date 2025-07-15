import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { CSSProperties, Ref } from 'react';

export type SearchFieldDefaultProps = WithSxProps<{
  disabled?: boolean;
  width?: CSSProperties['width'];
  onReset?: (prevValue: string) => void;
  wrapperRef?: Ref<HTMLDivElement>;
  size?: 'medium' | 'small';
}>;

export type SearchFieldResponsiveProps = ResponsiveProps<
  Pick<SearchFieldDefaultProps, 'width' | 'size'>
>;

export type SearchFieldProps = Merge<
  SearchFieldDefaultProps,
  SearchFieldResponsiveProps
>;
