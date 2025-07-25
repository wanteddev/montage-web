import { Box, FlexBox, useComposedRefs } from '@wanteddev/wds';
import { forwardRef, useId, useState } from 'react';

import Filter from './filter';
import {
  liquidButtonContentStyle,
  liquidButtonFirstLayerStyle,
  liquidButtonSecondLayerStyle,
  liquidButtonStyle,
} from './style';
import { useLiquidButtonAnimation } from './hooks';

import type { PolymorphicComponent, PolymorphicProps } from '@wanteddev/wds';
import type { CSSProperties, ElementType, ForwardedRef } from 'react';

type Props = {
  containerRef?: React.RefObject<HTMLDivElement>;
};

const LiquidButtonCopy = forwardRef(
  <T extends ElementType = 'button'>(
    { children, containerRef, as, ...props }: PolymorphicProps<Props, T>,
    ref: ForwardedRef<T>,
  ) => {
    const filterId = useId();

    const [node, setNode] = useState<HTMLButtonElement | null>(null);

    const composedRefs = useComposedRefs(ref, setNode as (v: T | null) => void);

    const animationStyle = useLiquidButtonAnimation({
      containerRef,
      node,
    });

    return (
      <>
        <Filter filterId={filterId} aria-hidden />

        <FlexBox
          alignItems="center"
          data-role="liquid-button"
          {...props}
          as={as || 'button'}
          ref={composedRefs}
          sx={[liquidButtonStyle, props.sx]}
          style={
            {
              '--liquid-button-filter': `url(#${filterId}) blur(0px) brightness(1.35) saturate(1.5)`,
              ...animationStyle,
              ...props.style,
            } as CSSProperties
          }
        >
          <Box role="presentation" sx={liquidButtonFirstLayerStyle} />
          <Box role="presentation" sx={liquidButtonSecondLayerStyle} />
          <Box as="span" sx={[liquidButtonContentStyle]}>
            {children}
          </Box>
        </FlexBox>
      </>
    );
  },
) as PolymorphicComponent<Props, 'button'>;

export default LiquidButtonCopy;
