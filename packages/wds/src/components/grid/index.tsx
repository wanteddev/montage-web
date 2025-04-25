import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { gridStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { GridProps } from './types';

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
    }: PolymorphicProps<GridProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    return (
      <Box
        as={(as || 'div') as E}
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
) as PolymorphicComponent<GridProps, 'div'>;

Grid.displayName = 'Grid';

export default Grid;
