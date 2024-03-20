import type { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import type { Merge } from '@/types';

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
  },
  ComponentPropsWithoutRef<typeof Slot>
>;
