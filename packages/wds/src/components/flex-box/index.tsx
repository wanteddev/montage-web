'use client';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { flexBoxStyle } from './style';

import type { MergeWithCustomElementProps } from '@wanteddev/wds-engine';
import type { FlexBoxProps } from './types';
import type { ElementType, ForwardedRef } from 'react';

type Props<E extends ElementType> = MergeWithCustomElementProps<
  E,
  FlexBoxProps
>;

const FlexBox = forwardRef(
  <E extends ElementType = 'div'>(
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
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: Props<E>,
    ref: ForwardedRef<E>,
  ) => {
    return (
      <Box
        as={(as || 'div') as ElementType}
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
);

FlexBox.displayName = 'FlexBox';

export default FlexBox as <E extends ElementType = 'div'>(
  props: Props<E>,
) => JSX.Element;
