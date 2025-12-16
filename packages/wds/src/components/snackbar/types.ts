import type { IconButtonProps } from '../icon-button';
import type { PortalOrFragmentProps } from '../portal-or-fragment/types';
import type { BreakPoint, Merge, WithSxProps } from '@wanteddev/wds-engine';
import type { TextButtonProps } from '../text-button/types';
import type { TypographyProps } from '../typography/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { RegionSnackbarItem } from '../../stores/region-store';
import type { ReactNode } from 'react';

export type SnackbarProps = Pick<
  RegionSnackbarItem,
  'duration' | 'variant' | 'onAnimationEnd'
> &
  WithSxProps<{
    /** Whether the snackbar is open by default. */
    defaultOpen?: boolean;
    /** Whether the snackbar is open. */
    open?: boolean;
    /** Callback function when the open state changes. */
    onOpenChange?: (open: boolean) => void;
    /** The container of the snackbar. */
    container?: PortalOrFragmentProps['container'];
    disablePortal?: PortalOrFragmentProps['disablePortal'];
    /** The children of the snackbar. */
    children?: ReactNode;
    /** Whether the animation is disabled. */
    disableAnimation?: boolean;
    /** Keeps the snackbar mounted in the DOM even when open is false. */
    forceMount?: boolean;
  }>;

export type SnackbarContentProps = Merge<
  {
    /** The extra content of the snackbar. Pass an element wrapped with `SnackbarExtraContent`. */
    extraContent?: ReactNode;
    children?: ReactNode;
  },
  FlexBoxProps
>;
export type SnackbarHeadingProps = TypographyProps;
export type SnackbarExtraContentProps = FlexBoxProps;
export type SnackbarDescriptionProps = TypographyProps;
export type SnackbarActionProps = Omit<
  TextButtonProps,
  'size' | keyof BreakPoint
>;
export type SnackbarCloseButtonProps = IconButtonProps;
