import type { PortalOrFragmentProps } from '../portal-or-fragment/types';
import type { Merge, WithSxProps } from '@wanteddev/wds-engine';
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
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    container?: PortalOrFragmentProps['container'];
    disablePortal?: PortalOrFragmentProps['disablePortal'];
    children?: ReactNode;
    disableAnimation?: boolean;
    forceMount?: boolean;
  }>;

export type SnackbarContentProps = Merge<
  { extraContent?: ReactNode },
  FlexBoxProps
>;
export type SnackbarHeadingProps = TypographyProps;
export type SnackbarExtraContentProps = FlexBoxProps;
export type SnackbarDescriptionProps = TypographyProps;
export type SnackbarActionProps = TextButtonProps;
