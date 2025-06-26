import type PortalOrFragment from '../portal-or-fragment';
import type { Merge } from '@wanteddev/wds-engine';
import type { TextButtonProps } from '../text-button/types';
import type { TypographyProps } from '../typography/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { RegionSnackbarItem } from '../../stores/region-store';
import type { ComponentProps, ReactNode } from 'react';

export type SnackbarProps = Pick<
  RegionSnackbarItem,
  'duration' | 'variant' | 'onAnimationEnd'
> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  container?: ComponentProps<typeof PortalOrFragment>['container'];
  disablePortal?: ComponentProps<typeof PortalOrFragment>['disablePortal'];
  children?: ReactNode;
  disableAnimation?: boolean;
  forceMount?: boolean;
};

export type SnackbarContentProps = Merge<
  { extraContent?: ReactNode },
  FlexBoxProps
>;
export type SnackbarHeadingProps = TypographyProps;
export type SnackbarExtraContentProps = FlexBoxProps;
export type SnackbarDescriptionProps = TypographyProps;
export type SnackbarActionProps = TextButtonProps;
