/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react';

import useSxProps from '../../hooks/use-sx-props';

import type { BoxProps } from './types';
import type { ElementType, ForwardedRef } from 'react';
import type { PolymorphicComponent, PolymorphicProps } from '../../types';

const Box = forwardRef(
  <T extends ElementType = 'div'>(
    { as, sx, ...props }: PolymorphicProps<BoxProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const Component = as || 'div';

    const mergeSxProps = useSxProps();

    return <Component ref={ref} css={mergeSxProps(sx)} {...props} />;
  },
) as PolymorphicComponent<BoxProps, 'div'>;

Box.displayName = 'Box';

export { Box };

export type { BoxProps };
