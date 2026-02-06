import type { SlotProps } from '@radix-ui/react-slot';
import type { PortalOrFragmentProps } from '../portal-or-fragment/types';
import type { TypographyProps } from '../typography/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { RegionToastItem } from '../../stores/region-store';
import type { ReactNode } from 'react';
import type { WithSxProps } from '@wanteddev/wds-engine';

export type ToastProps = Pick<
  RegionToastItem,
  'duration' | 'variant' | 'icon' | 'onAnimationEnd'
> &
  WithSxProps<{
    /** Whether the toast is open by default. */
    defaultOpen?: boolean;
    /** Whether the toast is open. */
    open?: boolean;
    /** Callback function when the open state changes. */
    onOpenChange?: (open: boolean) => void;
    /** The container of the toast. */
    container?: PortalOrFragmentProps['container'];
    /** Whether to disable the portal. */
    disablePortal?: PortalOrFragmentProps['disablePortal'];
    /** Whether to disable the animation. */
    disableAnimation?: boolean;
    children?: ReactNode;
  }>;

export type ToastContainerProps = FlexBoxProps;
export type ToastIconProps = SlotProps;
export type ToastContentProps = TypographyProps;
