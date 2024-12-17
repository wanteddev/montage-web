import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';
import type { FlexBoxProps } from '../flex-box/types';

export type PaginationProps = Merge<
  Merge<PaginationDefaultProps, PaginationResponsiveProps>,
  FlexBoxProps
>;

type PaginationDefaultProps = {
  variant?: 'extended' | 'minimize';
  defaultPage?: number;
  page?: number;
  count?: number;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  onChange?: (page?: number) => void;
};

type PaginationResponsiveProps = ResponsiveProps<
  Pick<PaginationDefaultProps, 'variant'>
>;
