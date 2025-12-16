import type { FocusScopeProps } from '../focus-scope';
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
  /** Whether the modal is open. */
  open?: boolean;
  /** Whether the modal is open by default. */
  defaultOpen?: boolean;
  /** Callback function when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** When `variant=bottom` and `handle=true`, this function is executed when the display is changed by dragging. */
  onVisibilityChange?: (visibility: 'visible' | 'hidden') => void;
  children?: ReactNode;
}>;

export type ModalTriggerProps = SlotProps;

type ModalContainerDefaultProps = WithSxProps<{
  variant?: 'popup' | 'bottom' | 'full';
  /** When `variant` is `bottom`, the modal can be pulled down and up by dragging. */
  handle?: boolean;
  /**
   * When `variant=bottom` and `handle=true`, sets the bottom sheet's peek height (px).
   * If the peek height is not set, the bottom sheet will be peeked with navigation height.
   */
  peekHeight?: number;
  /**
   * When scrolling inside the modal, the gradient of `ModalActionArea` and
   * the `background` style of `ModalNavigation` are added.
   */
  sticky?: boolean;
  /** The size of the modal. */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** The resize mode of the modal. */
  resize?: 'hug' | 'fixed';
  children?: ReactNode;
  /** The props of the wrapper. */
  wrapperProps?: DefaultComponentProps<{}, 'div'>;
  /**
   * This option is not commonly used. It is intended for cases where you want to add animation to the dimmer,
   * for example using framer-motion.
   */
  dimmer?: ReactNode;
  /** The container element where the modal will be rendered when using a portal. */
  container?: PortalProps['container'];
  /** Whether to disable the outside click close. */
  disableOutsideClickClose?: boolean;
  /** Whether to disable the escape key close. */
  disableEscapeKeyDownClose?: boolean;
  /** Whether to disable the remove scroll. */
  disableRemoveScroll?: boolean;
  /** Whether to disable the focus scope. */
  disableFocusScope?: FocusScopeProps['disableFocusScope'];
  /** Whether to disable the aria hidden others. */
  disableAriaHiddenOthers?: boolean;
  /**
   * React Portal does not support SSR, so it is used to support Server Side Rendering.
   *
   * If the style using tags such as h2 and div is used in the upper component, the UI may break.
   */
  disablePortal?: boolean;
  /** Keeps the modal mounted in the DOM even when open is false. */
  forceMount?: boolean;
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
  {
    variant?: TopNavigationProps['variant'] | 'emphasized';
    /** The leading content of the modal navigation. Pass an element wrapped with `ModalNavigationButton` or use `ModalClose`. */
    leadingContent?: ReactNode;
    /** The trailing content of the modal navigation. Pass an element wrapped with `ModalNavigationButton` or use `ModalClose`. */
    trailingContent?: ReactNode;
  },
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
