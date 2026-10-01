import type { IconButtonProps } from '../icon-button/types';
import type { FocusScopeProps } from '../focus-scope';
import type { SlotProps } from '@radix-ui/react-slot';
import type { FlexBoxProps } from '../flex-box/types';
import type {
  DefaultComponentProps,
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@montage-ui/engine';
import type { PortalProps } from '../portal/types';
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import type { TypographyProps } from '../typography/types';
import type { TextButtonProps } from '../text-button/types';

export type ModalBottomSheetSnap = 'peek' | 'half' | 'full';

export type ModalProps = WithSxProps<{
  /** Whether the modal is open. */
  open?: boolean;
  /** Whether the modal is open by default. */
  defaultOpen?: boolean;
  /** Callback function when the open state changes. */
  onOpenChange?: (open: boolean) => void;
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
  size?: 'medium' | 'large' | 'xlarge';
  /**
   * Sizing mode within the variant's layout.
   * - `'hug'` (default): hug content.
   * - `'fixed'`: fixed by `size` — `popup`/`full` only.
   * - `'fill'`: viewport-max — `bottom` only.
   * - `'flexible'`: multi-snap (`peek`/`half`/`full`) — `bottom` only.
   */
  resize?: 'hug' | 'fixed' | 'flexible' | 'fill';
  /** Controlled snap (`variant='bottom'`). Pair with `onSnapChange`. */
  snap?: ModalBottomSheetSnap;
  /**
   * Initial snap at mount (`variant='bottom'` + `resize='flexible'`). Not
   * reactive — use controlled `snap` to drive it dynamically.
   */
  defaultSnap?: 'half' | 'full';
  /** Fires on snap commit (release + settle, or programmatic). Not mid-drag. */
  onSnapChange?: (snap: ModalBottomSheetSnap) => void;
  /**
   * Largest snap at which the dimmer stays hidden — iOS
   * `largestUndimmedDetentIdentifier` equivalent. Snaps ≤ this value pass
   * pointer events through.
   * - `'peek'` (default): only `peek` undimmed.
   * - `'half'`: `peek` + `half` undimmed (`resize='flexible'` only).
   */
  largestUndimmedSnap?: 'peek' | 'half';
  /**
   * At `half` with scrollable body: `true` defers to native scroll until
   * the scroll boundary, then transfers to sheet collapse (iOS Maps feel).
   * `false` (default) lets viewport drag always drive the sheet.
   * `full` always uses native scroll regardless.
   */
  enableHalfSnapScroll?: boolean;
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
  variant: ModalContainerProps['variant'];
}>;

export type ModalNavigationProps = WithSxProps<
  Merge<
    {
      /**
       * Layout of the navigation.
       * - `normal`: Centered title, with leading/trailing content pinned to both sides. Only supported when the `ModalContainer` `variant` is `full`.
       * - `emphasized`: Larger, left-aligned title laid out in a row with the leading/trailing content.
       * - `floating`: Overlays the top of the content instead of taking up space. The title is centered like `normal`,
       *   `background` renders a gradient blur instead of a solid background, and `toolbar` is not rendered.
       * - `search`: Renders `children` (e.g. `SearchField`, defaulting to `medium` size) in place of the title, filling the row.
       *
       * When omitted, defaults to `normal` for the `full` `ModalContainer` variant and `emphasized` otherwise.
       */
      variant?: 'normal' | 'floating' | 'emphasized' | 'search';
      /** The trailing content of the modal navigation. Pass an element wrapped with `ModalNavigationButton`. Defaults to a `close-button`. */
      trailingContent?: ReactNode;
      /** The leading content of the modal navigation. Pass an element wrapped with `ModalNavigationButton`. */
      leadingContent?: ReactNode;
      /** Area attached below the navigation. */
      toolbar?: ReactNode;
      /**
       * Controls the background color or gradient effect.
       * When omitted, it is applied automatically once the modal content is scrolled (only when the navigation is sticky).
       */
      background?: boolean;
      children?: ReactNode;
    },
    ResponsiveProps<{}>
  >
>;

export type ModalNavigationButtonProps = WithSxProps<{
  variant?: 'text-button' | 'icon-button' | 'back-button' | 'close-button';
  color?: 'primary' | 'assistive';
  disabled?: boolean;
  size?: IconButtonProps['size'] | TextButtonProps['size'];
  /**
   * `icon-button` / `back-button` / `close-button` variant only. When true and the navigation `variant` is `floating`,
   * renders the icon button with a blurred background.
   */
  background?: boolean;
  /**
   * `icon-button` / `back-button` / `close-button` variant only. When `background` is applied, renders a fallback style
   * that looks natural in environments where `blur` is not supported.
   */
  alternative?: boolean;
  children?: ReactNode;
}>;

type ModalContentDefaultProps = WithSxProps<{
  /**
   * Gap between the content items.
   * @default 'var(--modal-content-margin-y, 24px)'
   */
  gap?: CSSProperties['gap'];
  /**
   * Which vertical sides get the content margin (`--modal-content-margin-y`, set by the container `size`).
   * When omitted, the default depends on the `ModalContainer` `variant`:
   * - `popup`: `none`
   * - `bottom` / `full`: `top-only`
   */
  verticalPadding?: 'none' | 'top-only' | 'bottom-only' | 'both';
  /**
   * Which horizontal sides get the content margin (`--modal-content-margin-x`, set by the container `size`).
   * @default 'both'
   */
  horizontalPadding?: 'none' | 'both';
  children?: ReactNode;
}>;

type ModalContentResponsiveProps = ResponsiveProps<
  Pick<
    ModalContentDefaultProps,
    'gap' | 'verticalPadding' | 'horizontalPadding'
  >
>;

export type ModalContentProps = Merge<
  ModalContentDefaultProps,
  ModalContentResponsiveProps
>;

export type ModalContentItemProps = FlexBoxProps;

export type ModalHeadingProps = TypographyProps;
export type ModalSummaryProps = TypographyProps;
export type ModalDescriptionProps = TypographyProps;
