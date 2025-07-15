import type { TextFieldProps } from '../text-field/types';
import type { Merge, WithSxProps } from '@wanteddev/wds-engine';
import type { MouseEventHandler, ReactNode } from 'react';
import type { FlexBoxProps } from '../flex-box/types';

export type PaginationProps = Merge<PaginationDefaultProps, FlexBoxProps>;

export type PaginationDefaultProps = WithSxProps<{
  variant?: 'extended' | 'minimize' | 'compact';
  defaultPage?: number;
  page?: number;
  totalPages?: number;
  /**
   * The number of pages always displayed at the beginning and end.
   */
  boundaryPages?: number;
  /**
   * The number of pages displayed around the current page.
   */
  siblingPages?: number;
  disabled?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  onChange?: (page?: number) => void;
  children?: ReactNode;
}>;

export type PaginationItemProps = {
  type: 'page' | 'ellipsis';
  page: number;
  itemPage?: number;
  disabled: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type PaginationFieldDefaultProps = WithSxProps<{
  label?: string;
  disabled?: boolean;
}>;

export type PaginationFieldProps = Merge<
  PaginationFieldDefaultProps,
  TextFieldProps
>;

export type PaginationSelectDefaultProps = WithSxProps<{
  defaultPageSize?: number;
  /**
   * The number of items displayed per page.
   */
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  label?: string;
  disabled?: boolean;
  optionRender?: (pageSize: number) => ReactNode;
  onChange?: (pageSize?: number) => void;
}>;

export type PaginationSelectProps = Merge<
  PaginationSelectDefaultProps,
  FlexBoxProps
>;
