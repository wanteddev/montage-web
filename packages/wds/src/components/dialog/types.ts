import type Portal from '../portal';
import type { TypographyProps } from '../typography/types';
import type { FlexBoxProps } from '../flex-box/types';
import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';
import type { DefaultComponentProps, Merge } from '@wanteddev/wds-engine';
import type { TextButtonProps } from '../text-button/types';
import type { Slot } from '@radix-ui/react-slot';

export type DialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  wrapperProps?: DefaultComponentProps<{}, 'div'>;
  disableOutsideClickClose?: boolean;
  disableEscapeKeyDownClose?: boolean;
  disablePortal?: boolean;
  container?: ComponentPropsWithRef<typeof Portal>['container'];
  /**
   * @description
   * esc 키 또는 dialog 외부 클릭 시 제어할 수 있습니다.
   */
  onDismiss?: () => void;
  forceMount?: boolean;
  dimmer?: ReactNode;
};

export type DialogDimmerProps = {};

export type DialogTriggerProps = ComponentPropsWithoutRef<typeof Slot>;

export type DialogContentProps = FlexBoxProps;

export type DialogHeadingProps = TypographyProps;

export type DialogDescriptionProps = TypographyProps;

export type DialogActionAreaProps = FlexBoxProps;

export type DialogActionAreaButtonProps = Merge<
  {
    variant?: 'normal' | 'assistive' | 'negative';
  },
  Omit<TextButtonProps, 'color'>
>;
