'use client';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { gridItemStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { GridItemProps } from './types';

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
    }: PolymorphicProps<GridItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <Box
        as={(as || 'div') as E}
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
) as PolymorphicComponent<GridItemProps, 'div'>;

GridItem.displayName = 'GridItem';

export default GridItem;
