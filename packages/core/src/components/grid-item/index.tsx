import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import { gridItemStyle } from './style';

import type { GridItemProps } from './types';
import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@montage-ui/engine';
import type { ElementType, ForwardedRef } from 'react';

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
    }: PolymorphicPropsInternal<GridItemProps, T>,
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
) as PolymorphicComponentInternal<GridItemProps, 'div'>;

GridItem.displayName = 'GridItem';

export { GridItem };

export type { GridItemProps };
