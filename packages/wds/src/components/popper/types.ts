import type { PropsWithChildren, ReactNode } from 'react';
import type { DefaultComponentProps, WithSxProps } from '@wanteddev/wds-engine';
import type { SideObject, useFloating } from '@floating-ui/react';

export type PopperProps = PropsWithChildren;

export type PopperContentProps = {
  /** Specifies the distance in pixels the content will be offset from the reference element. */
  offset?: number;
  /** Specifies the position of the content relative to the reference element. */
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
  /** When the element is hidden, it is hidden. */
  referenceHidden?: boolean;
  /** When the element is hidden, the offset is adjusted. */
  referenceHiddenOffsets?: SideObject;
  /** The props of the wrapper. */
  wrapperProps?: DefaultComponentProps<{}, 'div'>;
  /** The floating ui context can be obtained through a callback. */
  setContext?: (context: ReturnType<typeof useFloating>['context']) => void;
  /** Specifies the container to be displayed by Portal. */
  container?: Element | DocumentFragment | null;
  /** Whether to disable the portal. */
  disablePortal?: boolean;
  children?: ReactNode;
};

export type PopperAnchorProps = WithSxProps<{
  children?: ReactNode;
}>;

export type PopperArrowProps = WithSxProps<{
  children?: ReactNode;
}>;
