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
  /**
   * React Portal은 SSR을 지원하지 않기 때문에
   * Server Side Rendering을 지원하기 위해 사용합니다.
   *
   * h2, div 등 태그를 이용한 스타일을 상위 컴포넌트에서 사용한 경우
   * UI가 깨질 수 있습니다.
   */
  disablePortal?: boolean;
}>;

type ModalContainerDefaultProps = {
  variant?: 'popup' | 'bottom' | 'full';
  size?:
    | 'small'
    | 'small-fixed'
    | 'normal'
    | 'normal-fixed'
    | 'medium'
    | 'medium-fixed'
    | 'large'
    | 'large-fixed';
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
