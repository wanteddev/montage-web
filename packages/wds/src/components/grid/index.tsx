import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { gridStyle } from './style';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { GridProps } from './types';

const Grid = forwardRef(
  <T extends ElementType = 'div'>(
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
    }: PolymorphicPropsInternal<GridProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Box
        as={as || 'div'}
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
) as PolymorphicComponentInternal<GridProps, 'div'>;

Grid.displayName = 'Grid';

export { Grid };

export type { GridProps };
