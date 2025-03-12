import type { ChipActionProps } from '../chip-action/types';
import type { PropsWithChildren, ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type CategoryProps = PropsWithChildren<{
  defaultValue?: string;
  value?: string;
  onValueChange?: (tab: string) => void;
  /**
   * 값이 변경되었을 때 스크롤을 이동하지 않음.
   */
  disableScrollMoveOnChange?: boolean;
}>;

type CategoryListDefaultProps = {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  verticalPadding?: boolean;
  horizontalPadding?: boolean;
  variant?: 'normal' | 'alternative';
  iconButton?: ReactNode;
  children?: ReactNode;
};

type CategoryListResponsiveProps = ResponsiveProps<
  Pick<
    CategoryListDefaultProps,
    'size' | 'horizontalPadding' | 'verticalPadding'
  >
>;

export type CategoryListProps = Merge<
  CategoryListDefaultProps,
  CategoryListResponsiveProps
>;

export type CategoryListItemProps = Merge<
  {
    value: string;
    disabled?: boolean;
    children?: ReactNode;
  } & ResponsiveProps<{}>,
  Omit<ChipActionProps, 'active' | 'size'>
>;

export type CategoryPanelProps = {
  value: string;
  mountMode?: 'only-active' | 'force-mount' | 'always';
  children?: ReactNode;
};
