import type { SlotProps } from '@radix-ui/react-slot';
import type {
  TopNavigationButtonProps,
  TopNavigationProps,
} from '../top-navigation/types';
import type { FlexBoxProps } from '../flex-box/types';
import type {
  DefaultComponentProps,
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { PortalProps } from '../portal/types';
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import type { TypographyProps } from '../typography/types';

export type ModalProps = WithSxProps<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * When `variant=bottom` and `handle=true`, this function is executed when the display is changed by dragging.
   */
  onVisibilityChange?: (visibility: 'visible' | 'hidden') => void;
  /**
   * Specifies the container to be displayed by Portal.
   */
  container?: PortalProps['container'];
  disableOutsideClickClose?: boolean;
  disableEscapeKeyDownClose?: boolean;
  /**
   * React Portal does not support SSR, so it is used to support Server Side Rendering.
   *
   * If the style using tags such as h2 and div is used in the upper component, the UI may break.
   */
  disablePortal?: boolean;
  forceMount?: boolean;
  children?: ReactNode;
}>;

export type ModalTriggerProps = SlotProps;

type ModalContainerDefaultProps = WithSxProps<{
  variant?: 'popup' | 'bottom' | 'full';
  /**
   * When `variant` is not `popup`, the modal can be pulled down and up by dragging.
   */
  handle?: boolean;
  /**
   * When scrolling inside the modal, the gradient of `ModalActionArea` and the `borderBottom` style of `TopNavigation` are added.
   */
  sticky?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  resize?: 'hug' | 'fixed';
  children?: ReactNode;
  wrapperProps?: DefaultComponentProps<WithSxProps<{}>, 'div'>;
  dimmer?: ReactNode;
}>;

type ModalContainerResponsiveProps = ResponsiveProps<
  Pick<ModalContainerDefaultProps, 'size' | 'variant' | 'handle' | 'resize'>
>;

export type ModalContainerProps = Merge<
  ModalContainerDefaultProps,
  ModalContainerResponsiveProps
>;

export type ModalDimmerProps = WithSxProps<{}>;

export type ModalScrollProviderProps = PropsWithChildren<{
  sticky: boolean;
}>;

export type ModalNavigationProps = Merge<
  { variant?: TopNavigationProps['variant'] | 'emphasized' },
  TopNavigationProps
>;

export type ModalNavigationButtonProps = TopNavigationButtonProps;
export type ModalCloseProps = TopNavigationButtonProps;

type ModalContentDefaultProps = WithSxProps<{
  gap?: CSSProperties['gap'];
  children?: ReactNode;
}>;

type ModalContentResponsiveProps = ResponsiveProps<
  Pick<ModalContentDefaultProps, 'gap'>
>;

export type ModalContentProps = Merge<
  ModalContentDefaultProps,
  ModalContentResponsiveProps
>;

export type ModalContentItemProps = FlexBoxProps;

export type ModalHeadingProps = TypographyProps;
export type ModalSummaryProps = TypographyProps;
export type ModalDescriptionProps = TypographyProps;
