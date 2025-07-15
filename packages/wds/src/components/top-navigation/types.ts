import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type TopNavigationProps = WithSxProps<
  Merge<
    {
      variant?: 'normal' | 'floating' | 'extended';
      trailingContent?: ReactNode;
      leadingContent?: ReactNode;
      toolbar?: ReactNode;
      scrolled?: boolean;
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
  /**
   * When using `floating` navigation, if `alternative` is true, the black theme is activated.
   */
  alternative?: boolean;
  /**
   * When using `floating` navigation, it determines whether to use the background icon.
   */
  background?: boolean;
  disabled?: boolean;
  size?: number | 'medium' | 'small';
  children?: ReactNode;
}>;
