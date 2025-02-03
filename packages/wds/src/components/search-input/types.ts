import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ReactNode, Ref } from 'react';

export type SearchInputDefaultProps = {
  disabled?: boolean;
  width?: CSSProperties['width'];
  onReset?: (prevValue: string) => void;
  children?: ReactNode;
  wrapperRef?: Ref<HTMLDivElement>;
  size?: 'medium' | 'small';
};

export type SearchInputResponsiveProps = ResponsiveProps<
  Pick<SearchInputDefaultProps, 'width' | 'size'>
>;

export type SearchInputProps = Merge<
  SearchInputDefaultProps,
  SearchInputResponsiveProps
>;
