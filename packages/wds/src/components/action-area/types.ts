import type { WithSxProps } from '@wanteddev/wds-engine';
import type { TextButtonProps } from '../text-button/types';
import type { ButtonProps } from '../button/types';
import type { ReactNode } from 'react';

export type ActionAreaProps = WithSxProps<{
  children?: ReactNode;
  /**
   * The variant of the action area.
   * - `strong`: The main action area with three buttons vertically.
   * - `neutral`: The neutral action area with two buttons horizontally.
   * - `compact`: The compact action area with two buttons horizontally and the buttons on the right.
   * - `cancel`: The cancel action area with one button.
   */
  variant?: 'strong' | 'neutral' | 'compact' | 'cancel';
  /**
   * If `extra` is true, you can use `extraContent` to add content such as a checkbox above the buttons.
   */
  extra?: boolean;
  /** Displays a caption above the buttons. */
  caption?: ReactNode;
  /**
   * When `extra=true`, this prop is used to display the content such as checkbox area above the button.
   */
  extraContent?: ReactNode;
  /**
   * When `variant=compact`, this prop is used to display the content such as checkbox area on the left of the button.
   */
  compactContent?: ReactNode;
  /**
   * When `background=true` and there is a scroll, additional styles are activated.
   * When used inside a Modal, it is handled by the Modal's internal logic.
   */
  background?: boolean;
  /**
   * When `extra=true`, a line is displayed at the top.
   */
  divider?: boolean;
}>;

export type ActionAreaButtonProps = WithSxProps<{
  children?: ReactNode;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  variant?: 'main' | 'alternative' | 'sub';
  /**
   * Whether to show only the icon.
   * If `iconOnly` is enabled, you must provide an icon component as the `children`.
   */
  iconOnly?: boolean;
  disabled?: boolean;
  /**
   * When overriding the color of the `TextButton`.
   */
  textButtonColor?: TextButtonProps['color'];
  /**
   * When overriding the variant of the `Button`.
   */
  buttonVariant?: ButtonProps['variant'];
  /**
   * When overriding the color of the `Button`.
   */
  buttonColor?: ButtonProps['color'];
  /**
   * Whether to show the loading indicator.
   */
  loading?: ButtonProps['loading'];
  /**
   * When `loading=true`, the event blocking action is disabled.
   */
  disableLoadingPreventEvents?: boolean;
}>;
