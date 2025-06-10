import type PortalOrFragment from '../portal-or-fragment';
import type { TypographyProps } from '../typography/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { RegionToastItem } from '../../stores/region-store';
import type { ComponentProps, ReactNode } from 'react';

export type ToastProps = Pick<
  RegionToastItem,
  'duration' | 'variant' | 'icon' | 'onAnimationEnd'
> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  container?: ComponentProps<typeof PortalOrFragment>['container'];
  disablePortal?: ComponentProps<typeof PortalOrFragment>['disablePortal'];
  disableAnimation?: boolean;
  children?: ReactNode;
};

export type ToastContainerProps = FlexBoxProps;
export type ToastIconProps = {};
export type ToastContentProps = TypographyProps;
