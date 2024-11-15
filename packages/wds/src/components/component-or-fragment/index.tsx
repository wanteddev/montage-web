import { Fragment } from 'react';

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

const ComponentOrFragment = <E extends ElementType>({
  children,
  flag,
  component,
  ...props
}: ComponentOrFragmentProps<E>) => {
  const Comp = component;

  return flag ? (
    <Comp {...(props as any)}>{children}</Comp>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

export default ComponentOrFragment;
