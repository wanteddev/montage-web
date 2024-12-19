import type { TextInputProps } from '../text-input/types';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { MouseEventHandler, ReactNode } from 'react';
import type { FlexBoxProps } from '../flex-box/types';

export type PaginationProps = Merge<
  Merge<PaginationDefaultProps, PaginationResponsiveProps>,
  FlexBoxProps
>;

export type PaginationDefaultProps = {
  variant?: 'extended' | 'minimize';
  defaultPage?: number;
  page?: number;
  count?: number;
  /**
   * 시작과 끝에 항상 표시될 페이지 수
   */
  boundaryCount?: number;
  /**
   * 현재 페이지 주위에 표시될 페이지 수
   */
  siblingCount?: number;
  disabled?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
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

type PaginationResponsiveProps = ResponsiveProps<
  Pick<PaginationDefaultProps, 'variant'>
>;

export type PaginationInputDefaultProps = {
  label?: string;
  hideLabel?: boolean;
};

export type PaginationInputProps = Merge<
  PaginationInputDefaultProps,
  TextInputProps
>;

export type PaginationSelectDefaultProps = {
  defaultPageSize?: number;
  /**
   * 페이지당 아이템 표시 개수
   */
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  label?: string;
  optionRender?: (pageSize: number) => ReactNode;
  onChange?: (pageSize?: number) => void;
};

export type PaginationSelectProps = Merge<
  PaginationSelectDefaultProps,
  FlexBoxProps
>;
