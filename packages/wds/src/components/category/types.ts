import type { ChipProps } from '../chip/types';
import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type CategoryProps = {
  /** The default value of the category. */
  defaultValue?: string;
  /** The value of the category. */
  value?: string;
  /** Callback function when the value changes. */
  onValueChange?: (value: string) => void;
  /** When the value is changed, the scroll does not move. */
  disableScrollMoveOnChange?: boolean;
  children?: ReactNode;
};

type CategoryListDefaultProps = WithSxProps<{
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** Whether to add vertical padding. */
  verticalPadding?: boolean;
  /** Whether to add horizontal padding. */
  horizontalPadding?: boolean;
  variant?: 'normal' | 'alternative';
  /** The icon button of the category list. */
  iconButton?: ReactNode;
  /** The content of the category list. Use `CategoryListItem` components as the children. */
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
  Omit<ChipProps, 'active' | 'size'>
>;

export type CategoryPanelProps = WithSxProps<{
  value: string;
  /** The mount mode of the category panel. */
  mountMode?: 'only-active' | 'force-mount' | 'always';
  children?: ReactNode;
}>;
