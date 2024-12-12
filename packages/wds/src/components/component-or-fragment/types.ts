import type { Merge } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type ComponentOrFragmentProps<E extends ElementType> = Merge<
  {
    flag: boolean;
    children: ReactNode;
    component: E;
  },
  ComponentPropsWithoutRef<E>
>;
