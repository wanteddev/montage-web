import type { useFloating } from '@floating-ui/react';
import type { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import type { Merge } from '../../types';

export type PopperContentProps = Merge<
  {
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
    wrapperProps?: HTMLAttributes<HTMLDivElement>;
    setContext?: (context: ReturnType<typeof useFloating>['context']) => void;
  },
  ComponentPropsWithoutRef<typeof Slot>
>;

export type PopperArrowProps = {
  /**
   * 일반적으로는 사용하지 않으며 arrow를 중첩해서 color를 입힐 때만 사용합니다.
   * tooltip의 accent에서 사용합니다.
   */
  overlay?: string;
};
