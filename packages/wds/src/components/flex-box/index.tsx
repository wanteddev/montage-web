'use client';
import { forwardRef } from 'react';

import { flexBoxStyle } from './style';

import type { MergeWithCustomElementProps } from '../../types';
import type { FlexBoxProps } from './types';
import type { ElementRef, ElementType, ForwardedRef } from 'react';

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
    ref: ForwardedRef<ElementRef<E>>,
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
          xl,
        })}
        {...props}
      />
    );
  },
);

FlexBox.displayName = 'FlexBox';

export default FlexBox as <E extends ElementType = 'div'>(
  props: Props<E>,
) => JSX.Element;
