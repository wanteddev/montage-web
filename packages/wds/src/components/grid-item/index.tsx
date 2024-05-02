'use client';
import { forwardRef } from 'react';
import { Box, type MergeWithCustomElementProps } from '@wanteddev/wds-engine';

import { gridItemStyle } from './style';

import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { GridItemProps } from './types';

type Props<E extends ElementType = ElementType> = MergeWithCustomElementProps<
  E,
  GridItemProps
>;

const GridItem = forwardRef(
  <E extends ElementType = 'div'>(
    {
      as,
      alignSelf = 'initial',
      columns,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: Props<E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <Box
        as={(as || 'div') as ElementType}
        ref={ref}
        {...props}
        sx={[
          gridItemStyle({
            columns,
            alignSelf,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          props.sx,
        ]}
      />
    );
  },
);

GridItem.displayName = 'GridItem';

export default GridItem as <E extends ElementType = 'div'>(
  props: Props<E>,
) => JSX.Element;
