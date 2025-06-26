import type { TopNavigationProps } from '../top-navigation/types';
import type { FlexBoxProps } from '../flex-box/types';
import type {
  DefaultComponentProps,
  Merge,
  ResponsiveProps,
} from '@wanteddev/wds-engine';
import type Portal from '../portal';
import type {
  CSSProperties,
  ComponentPropsWithRef,
  PropsWithChildren,
  ReactNode,
} from 'react';
import type { TypographyProps } from '../typography/types';

export type ModalProps = PropsWithChildren<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * variant=bottom, handle=true 일 때 드래그로 숨기기, 표시 변경이 될 때 실행할 함수입니다.
   */
  onVisibilityChange?: (visibility: 'visible' | 'hidden') => void;
  /**
   * Portal로 표시될 container를 지정합니다.
   */
  container?: ComponentPropsWithRef<typeof Portal>['container'];
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
  forceMount?: boolean;
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
   * ModalActionArea 의 그라디언트, TopNavigation의 borderBottom 스타일이 추가됩니다.
   */
  sticky?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  resize?: 'hug' | 'fixed';
  children?: ReactNode;
  wrapperProps?: DefaultComponentProps<{}, 'div'>;
  dimmer?: ReactNode;
};

type ModalContainerResponsiveProps = ResponsiveProps<
  Pick<ModalContainerDefaultProps, 'size' | 'variant' | 'handle' | 'resize'>
>;

export type ModalContainerProps = Merge<
  ModalContainerDefaultProps,
  ModalContainerResponsiveProps
>;

export type ModalDimmerProps = {};

export type ModalScrollProviderProps = PropsWithChildren<{
  sticky: boolean;
}>;

export type ModalNavigationProps = Merge<
  { variant?: TopNavigationProps['variant'] | 'emphasized' },
  TopNavigationProps
>;

type ModalContentDefaultProps = {
  gap?: CSSProperties['gap'];
  children?: ReactNode;
};

type ModalContentResponsiveProps = ResponsiveProps<
  Pick<ModalContentDefaultProps, 'gap'>
>;

export type ModalContentProps = Merge<
  ModalContentDefaultProps,
  ModalContentResponsiveProps
>;

export type ModalContentItemProps = FlexBoxProps;

export type ModalHeadingProps = TypographyProps;
export type ModalSummaryProps = TypographyProps;
export type ModalDescriptionProps = TypographyProps;
