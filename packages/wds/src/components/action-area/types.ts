import type { WithSxProps } from '@wanteddev/wds-engine';
import type { TextButtonProps } from '../text-button/types';
import type { ButtonProps } from '../button/types';
import type { ReactNode } from 'react';

export type ActionAreaProps = WithSxProps<{
  children?: ReactNode;
  variant?: 'strong' | 'neutral' | 'compact' | 'cancel';
  extra?: boolean;
  caption?: ReactNode;
  /**
   * When `extra=true`, this prop is used to display the content area above the button.
   */
  extraContent?: ReactNode;
  /**
   * When `variant=compact`, this prop is used to display the content area on the left of the button.
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

export type ActionButtonProps = WithSxProps<{
  children?: ReactNode;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  variant?: 'main' | 'alternative' | 'sub';
  iconOnly?: boolean;
  disabled?: boolean;
  /**
   * When overriding the variant of the `TextButton`.
   */
  textButtonVariant?: TextButtonProps['variant'];
  /**
   * When overriding the variant of the `Button`.
   */
  buttonVariant?: ButtonProps['variant'];
  /**
   * When overriding the color of the `Button`.
   */
  buttonColor?: ButtonProps['color'];
  loading?: ButtonProps['loading'];
  /**
   * When `loading=true`, the event blocking action is disabled.
   */
  disableLoadingPreventEvents?: boolean;
}>;
