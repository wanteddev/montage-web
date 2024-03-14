'use client';
import {
  type ElementType,
  type ForwardedRef,
  type ReactNode,
  forwardRef,
} from 'react';

import { gridItemStyle } from './style';

import type { MergeWithCustomElementProps } from '@/types';
import type { GridItemProps } from './types';

type Props<E extends ElementType = ElementType> = MergeWithCustomElementProps<
  E,
  GridItemProps
>;

const GridItem = forwardRef(
  <E extends ElementType = 'div'>(
    { as, alignSelf = 'initial', columns, xs, sm, md, lg, ...props }: Props<E>,
    ref: ForwardedRef<Props<E>['as']>,
  ) => {
    const Element = as || 'div';

    return (
      <Element
        ref={ref}
        css={gridItemStyle({
          columns,
          alignSelf,
          xs,
          sm,
          md,
          lg,
        })}
        {...props}
      />
    );
  },
);

GridItem.displayName = 'GridItem';

export default GridItem as <E extends ElementType = 'div'>(
  props: Props<E>,
) => ReactNode;
