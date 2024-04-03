'use client';
import { forwardRef } from 'react';

import { gridStyle } from './style';

import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { MergeWithCustomElementProps } from '../../types';
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
    const Element = as || 'div';

    return (
      <Element
        ref={ref}
        css={gridStyle({
          rowSpacing,
          columnSpacing,
          justifyContent,
          alignItems,
          xs,
          sm,
          md,
          lg,
          xl,
        })}
        {...props}
      />
    );
  },
);

Grid.displayName = 'Grid';

export default Grid as <E extends ElementType = 'div'>(
  props: Props<E>,
) => JSX.Element;
