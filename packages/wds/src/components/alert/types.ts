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

export type AlertProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

export type AlertDimmerProps = WithSxProps<{}>;

export type AlertTriggerProps = SlotProps;

export type AlertContainerProps = Merge<
  {
    forceMount?: boolean;
    disablePortal?: boolean;
    container?: PortalProps['container'];
    wrapperProps?: DefaultComponentProps<WithSxProps<{}>, 'div'>;
    disableOutsideClickClose?: boolean;
    disableEscapeKeyDownClose?: boolean;
    disableRemoveScroll?: boolean;
    /**
     * When the esc key or dialog outside click is controlled.
     */
    onDismiss?: () => void;
    dimmer?: ReactNode;
  },
  FlexBoxProps
>;

export type AlertContentProps = FlexBoxProps;

export type AlertHeadingProps = TypographyProps;

export type AlertDescriptionProps = TypographyProps;

export type AlertActionAreaProps = FlexBoxProps;

export type AlertActionAreaButtonProps = Merge<
  {
    variant?: 'normal' | 'assistive' | 'negative';
  },
  Omit<TextButtonProps, 'color'>
>;
