import type { TextFieldProps } from '../text-field/types';
import type { Merge } from '@wanteddev/wds-engine';
import type { MouseEventHandler, ReactNode } from 'react';
import type { FlexBoxProps } from '../flex-box/types';

export type PaginationProps = Merge<PaginationDefaultProps, FlexBoxProps>;

export type PaginationDefaultProps = {
  variant?: 'extended' | 'minimize' | 'compact';
  defaultPage?: number;
  page?: number;
  totalPages?: number;
  /**
   * 시작과 끝에 항상 표시될 페이지 수
   */
  boundaryPages?: number;
  /**
   * 현재 페이지 주위에 표시될 페이지 수
   */
  siblingPages?: number;
  disabled?: boolean;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  onChange?: (page?: number) => void;
};

export type PaginationItemProps = {
  type: 'page' | 'ellipsis';
  page: number;
  itemPage?: number;
  disabled: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type PaginationFieldDefaultProps = {
  label?: string;
  disabled?: boolean;
};

export type PaginationFieldProps = Merge<
  PaginationFieldDefaultProps,
  TextFieldProps
>;

export type PaginationSelectDefaultProps = {
  defaultPageSize?: number;
  /**
   * 페이지당 아이템 표시 개수
   */
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  label?: string;
  disabled?: boolean;
  optionRender?: (pageSize: number) => ReactNode;
  onChange?: (pageSize?: number) => void;
};

export type PaginationSelectProps = Merge<
  PaginationSelectDefaultProps,
  FlexBoxProps
>;
