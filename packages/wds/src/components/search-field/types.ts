import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode, Ref } from 'react';

export type SearchFieldDefaultProps = {
  disabled?: boolean;
  width?: CSSProperties['width'];
  onReset?: (prevValue: string) => void;
  children?: ReactNode;
  wrapperRef?: Ref<HTMLDivElement>;
  size?: 'medium' | 'small';
};

export type SearchFieldResponsiveProps = ResponsiveProps<
  Pick<SearchFieldDefaultProps, 'width' | 'size'>
>;

export type SearchFieldProps = Merge<
  SearchFieldDefaultProps,
  SearchFieldResponsiveProps
>;
