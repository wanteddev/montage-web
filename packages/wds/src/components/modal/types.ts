import type { FlexBoxProps } from '../flex-box/types';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type Portal from '../portal';
import type {
  ComponentPropsWithRef,
  PropsWithChildren,
  ReactNode,
} from 'react';
import type { TypographyProps } from '../typography/types';

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
  /**
   * variant가 popup 이 아닌 모달에서
   * 드래그를 통해 모달을 내리고 올릴 수 있습니다.
   */
  handle?: boolean;
  /**
   * 모달 내부에서 스크롤을 했을 때
   * ModalActionArea 의 그라디언트, ModalNavigation의 borderBottom 스타일이 추가됩니다.
   */
  sticky?: boolean;
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
  Pick<ModalContainerDefaultProps, 'size' | 'variant' | 'handle'>
>;

export type ModalContainerProps = Merge<
  ModalContainerDefaultProps,
  ModalContainerResponsiveProps
>;

export type ModalNavigationProps = Merge<
  {
    variant?: 'compact' | 'floating' | 'emphasized' | 'extended';
    rightButton?: ReactNode;
    leftButton?: ReactNode;
  },
  ResponsiveProps<{}>
>;

type ModalContentDefaultProps = {
  padding?: boolean;
  paddingExtra?: boolean;
  paddingInfo?: boolean;
};

type ModalContentResponsiveProps = ResponsiveProps<
  Pick<ModalContentDefaultProps, 'padding' | 'paddingExtra' | 'paddingInfo'>
>;

export type ModalContentProps = Merge<
  ModalContentDefaultProps,
  ModalContentResponsiveProps
>;

export type ModalContentItemProps = FlexBoxProps;

export type ModalHeadingProps = TypographyProps;
export type ModalSummaryProps = TypographyProps;
export type ModalDescriptionProps = TypographyProps;

export type ModalActionAreaProps = {
  variant?: 'normal' | 'extra';
  priority?: 'strong' | 'neutral' | 'compact' | 'single';
  caption?: string;
};

export type ModalActionButtonProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'assistive';
};
