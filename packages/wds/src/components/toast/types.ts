import type { SlotProps } from '@radix-ui/react-slot';
import type { PortalOrFragmentProps } from '../portal-or-fragment/types';
import type { TypographyProps } from '../typography/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { RegionToastItem } from '../../stores/region-store';
import type { ReactNode } from 'react';

export type ToastProps = Pick<
  RegionToastItem,
  'duration' | 'variant' | 'icon' | 'onAnimationEnd'
> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  container?: PortalOrFragmentProps['container'];
  disablePortal?: PortalOrFragmentProps['disablePortal'];
  disableAnimation?: boolean;
  children?: ReactNode;
};

export type ToastContainerProps = FlexBoxProps;
export type ToastIconProps = SlotProps;
export type ToastContentProps = TypographyProps;
