import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { gridItemStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { GridItemProps } from './types';

const GridItem = forwardRef(
  <T extends ElementType = 'div'>(
    {
      as,
      alignSelf = 'initial',
      columns,
      offset,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<GridItemProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Box
        as={as || 'div'}
        ref={ref}
        {...props}
        sx={[
          gridItemStyle({
            columns,
            alignSelf,
            offset,
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
