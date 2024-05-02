import { forwardRef } from 'react';

import useSxProps from '../hooks/use-sx-props';

import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  Ref,
} from 'react';
import type { Merge, SxProp } from '../types';

type Props<T extends ElementType> = Merge<
  {
    sx?: SxProp;
    as?: T;
    ref?: Ref<ElementRef<T>>;
  },
  ComponentPropsWithoutRef<T>
>;

const Box = forwardRef(
  <T extends ElementType = 'div'>(
    { as, sx, ...props }: Props<T>,
    ref: ForwardedRef<T>,
  ) => {
    const Component = as || 'div';
    const mergeSxProps = useSxProps();

    return <Component ref={ref} css={mergeSxProps(sx)} {...props} />;
  },
);

Box.displayName = 'Box';

export default Box as <E extends ElementType = 'div'>(
  props: Props<E>,
) => JSX.Element;
