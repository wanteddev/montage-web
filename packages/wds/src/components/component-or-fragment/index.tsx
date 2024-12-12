import { Fragment } from 'react';

import type { ComponentOrFragmentProps } from './types';
import type { ElementType } from 'react';

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
