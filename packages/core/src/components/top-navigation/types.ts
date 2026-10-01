import type { IconButtonProps } from '../icon-button/types';
import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';
import type { ReactNode } from 'react';
import type { TextButtonProps } from '../text-button/types';

export type TopNavigationProps = WithSxProps<
  Merge<
    {
      variant?: 'normal' | 'floating' | 'display' | 'search';
      /** The trailing content of the top navigation. Pass an element wrapped with `TopNavigationButton`. */
      trailingContent?: ReactNode;
      /** The leading content of the top navigation. Pass an element wrapped with `TopNavigationButton`. */
      leadingContent?: ReactNode;
      /** Area attached below the navigation. */
      toolbar?: ReactNode;
      /** Controls the background color or gradient effect. */
      background?: boolean;
      /** The id to be assigned to the navigation title. */
      titleId?: string;
      children?: ReactNode;
    },
    ResponsiveProps<{}>
  >
>;

export type TopNavigationButtonProps = WithSxProps<{
  variant?: 'text-button' | 'icon-button' | 'back-button';
  color?: 'primary' | 'assistive';
  disabled?: boolean;
  size?: IconButtonProps['size'] | TextButtonProps['size'];
  children?: ReactNode;
}>;
