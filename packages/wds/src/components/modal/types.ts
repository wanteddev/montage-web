import type { FlexBox, Typography } from '..';
import type {
  MergeWithCss,
  MergeWithCustomElementProps,
  ResponsiveProps,
} from '../../types';
import type Portal from '../portal';
import type {
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
  ReactNode,
} from 'react';

export type ModalProps = PropsWithChildren<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  /**
   * Portal로 표시될 container를 지정합니다.
   */
  container?: ComponentPropsWithRef<typeof Portal>['container'];
  disableDimmer?: boolean;
  disableOutsideClickClose?: boolean;
  disableEscapeKeyDownClose?: boolean;
}>;

type ModalContainerDefaultProps = {
  variant?: 'popup' | 'bottom' | 'full';
  size?: 'normal' | 'small' | 'medium' | 'large';
};

type ModalContainerResponsiveProps = ResponsiveProps<
  Pick<ModalContainerDefaultProps, 'size' | 'variant'>
>;

export type ModalContainerProps = PropsWithChildren<
  MergeWithCss<ModalContainerDefaultProps, ModalContainerResponsiveProps>
>;

export type ModalNavigationProps = PropsWithChildren<
  MergeWithCss<
    { variant?: 'compact' | 'floating' | 'emphasized' | 'extended' },
    ResponsiveProps<{}>
  >
>;

type ModalContentDefaultProps = {
  padding?: boolean;
  paddingExtra?: boolean;
  paddingInfo?: boolean;
};

type ModalContentResponsiveProps = ResponsiveProps<
  Pick<ModalContentDefaultProps, 'padding' | 'paddingExtra' | 'paddingInfo'>
>;

export type ModalContentProps = PropsWithChildren<
  MergeWithCss<ModalContentDefaultProps, ModalContentResponsiveProps>
>;

export type ModalContentItemProps = ComponentPropsWithRef<
  typeof FlexBox<'div'>
>;

export type ModalHeadingProps<E extends ElementType = 'h1'> =
  ComponentPropsWithRef<typeof Typography<E>>;
export type ModalSummaryProps<E extends ElementType = 'p'> =
  ComponentPropsWithRef<typeof Typography<E>>;
export type ModalDescriptionProps<E extends ElementType = 'p'> =
  ComponentPropsWithRef<typeof Typography<E>>;

export type ModalActionAreaProps = PropsWithChildren<
  MergeWithCss<
    {
      variant?: 'normal' | 'extra';
      priority?: 'strong' | 'neutral' | 'compact' | 'single';
      caption?: string;
    },
    {}
  >
>;

export type ModalActionButtonProps<E extends ElementType> = PropsWithChildren<
  MergeWithCustomElementProps<
    E,
    {
      leftIcon?: ReactNode;
      rightIcon?: ReactNode;
      variant?: 'primary' | 'secondary' | 'assistive';
    }
  >
>;
