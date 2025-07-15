import type { ReactNode } from 'react';
import type {
  DefaultComponentProps,
  Merge,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { SlotProps } from '@radix-ui/react-slot';
import type { PortalProps } from '../portal/types';
import type { TypographyProps } from '../typography/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { TextButtonProps } from '../text-button/types';

export type DialogProps = WithSxProps<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  wrapperProps?: DefaultComponentProps<WithSxProps<{}>, 'div'>;
  disableOutsideClickClose?: boolean;
  disableEscapeKeyDownClose?: boolean;
  disablePortal?: boolean;
  container?: PortalProps['container'];
  /**
   * When the esc key or dialog outside click is controlled.
   */
  onDismiss?: () => void;
  forceMount?: boolean;
  dimmer?: ReactNode;
  children?: ReactNode;
}>;

export type DialogDimmerProps = WithSxProps<{}>;

export type DialogTriggerProps = SlotProps;

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
