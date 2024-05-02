'use client';
import { forwardRef } from 'react';
import { Box, type MergeWithCustomElementProps } from '@wanteddev/wds-engine';

import { gridStyle } from './style';

import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { GridProps } from './types';

type Props<E extends ElementType = ElementType> = MergeWithCustomElementProps<
  E,
  GridProps
>;

const Grid = forwardRef(
  <E extends ElementType = 'div'>(
    {
      as,
      justifyContent = 'initial',
      alignItems = 'initial',
      spacing = 20,
      rowSpacing = spacing,
      columnSpacing = spacing,
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
          gridStyle({
            rowSpacing,
            columnSpacing,
            justifyContent,
            alignItems,
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

Grid.displayName = 'Grid';

export default Grid as <E extends ElementType = 'div'>(
  props: Props<E>,
) => JSX.Element;
