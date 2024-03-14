'use client';
import { forwardRef } from 'react';

import { flexBoxStyle } from './style';

import type { MergeWithCustomElementProps } from '@/types';
import type { FlexBoxProps } from './types';
import type { ElementType, ForwardedRef, ReactNode } from 'react';

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
      ...props
    }: Props<E>,
    ref: ForwardedRef<Props<E>['as']>,
  ) => {
    const Element = as || 'div';

    return (
      <Element
        ref={ref}
        css={flexBoxStyle({
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
        })}
        {...props}
      />
    );
  },
);

FlexBox.displayName = 'FlexBox';

export default FlexBox as <E extends ElementType = 'div'>(
  props: Props<E>,
) => ReactNode;
