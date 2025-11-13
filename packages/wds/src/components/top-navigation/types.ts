import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type TopNavigationProps = WithSxProps<
  Merge<
    {
      variant?: 'normal' | 'floating' | 'display' | 'search';
      trailingContent?: ReactNode;
      leadingContent?: ReactNode;
      toolbar?: ReactNode;
      background?: boolean;
      /**
       * The id to be assigned to the navigation title.
       */
      titleId?: string;
      children?: ReactNode;
    },
    ResponsiveProps<{}>
  >
>;

export type TopNavigationButtonProps = WithSxProps<{
  variant?: 'text' | 'icon';
  color?: 'primary' | 'assistive';
  disabled?: boolean;
  size?: number | 'medium' | 'small';
  children?: ReactNode;
}>;
