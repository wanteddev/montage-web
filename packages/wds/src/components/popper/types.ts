import type { PropsWithChildren, ReactNode } from 'react';
import type { DefaultComponentProps, WithSxProps } from '@wanteddev/wds-engine';
import type { SideObject, useFloating } from '@floating-ui/react';

export type PopperProps = PropsWithChildren;

export type PopperContentProps = {
  offset?: number;
  position?:
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'right-start'
    | 'right-center'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end'
    | 'left-start'
    | 'left-center'
    | 'left-end';
  referenceHidden?: boolean;
  referenceHiddenOffsets?: SideObject;
  wrapperProps?: DefaultComponentProps<{}, 'div'>;
  setContext?: (context: ReturnType<typeof useFloating>['context']) => void;
  /**
   * Specifies the container to be displayed by Portal.
   */
  container?: Element | DocumentFragment | null;
  disablePortal?: boolean;
  children?: ReactNode;
};

export type PopperAnchorProps = WithSxProps<{
  children?: ReactNode;
}>;

export type PopperArrowProps = WithSxProps<{
  children?: ReactNode;
}>;
