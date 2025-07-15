import type { ChipActionProps } from '../chip-action/types';
import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type CategoryProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (tab: string) => void;
  /**
   * When the value is changed, the scroll does not move.
   */
  disableScrollMoveOnChange?: boolean;
  children?: ReactNode;
};

type CategoryListDefaultProps = WithSxProps<{
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  verticalPadding?: boolean;
  horizontalPadding?: boolean;
  variant?: 'normal' | 'alternative';
  iconButton?: ReactNode;
  children?: ReactNode;
}>;

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

export type CategoryPanelProps = WithSxProps<{
  value: string;
  mountMode?: 'only-active' | 'force-mount' | 'always';
  children?: ReactNode;
}>;
