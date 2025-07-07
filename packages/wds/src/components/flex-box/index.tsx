import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { flexBoxStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { FlexBoxProps } from './types';
import type { ElementType, ForwardedRef } from 'react';

const FlexBox = forwardRef(
  <T extends ElementType = 'div'>(
    {
      as,
      flexDirection,
      flexWrap,
      justifyContent,
      alignItems,
      alignContent,
      order,
      flex,
      flexGrow,
      flexShrink,
      flexBasis,
      alignSelf,
      gap,
      rowGap,
      columnGap,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<FlexBoxProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Box
        as={as || 'div'}
        ref={ref}
        {...props}
        sx={[
          flexBoxStyle({
            flexDirection,
            flexWrap,
            justifyContent,
            alignItems,
            alignContent,
            order,
            flex,
            flexGrow,
            flexShrink,
            flexBasis,
            alignSelf,
            rowGap,
            columnGap,
            gap,
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
) as PolymorphicComponent<FlexBoxProps, 'div'>;

FlexBox.displayName = 'FlexBox';

export default FlexBox;
