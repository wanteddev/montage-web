import { Box, FlexBox, useComposedRefs } from '@wanteddev/wds';
import { forwardRef, useId, useState } from 'react';

import Filter from './filter';
import {
  liquidButtonBackgroundLayerStyle,
  liquidButtonBlurLayerStyle,
  liquidButtonContentStyle,
  liquidButtonFillDarkerStyle,
  liquidButtonFillOpacityStyle,
  // liquidButtonFillStyle,
  // liquidButtonFirstLayerStyle,
  liquidButtonGlassEffectStyle,
  liquidButtonLayerStyle,
  // liquidButtonSecondLayerStyle,
  liquidButtonStyle,
} from './style';
import { useLiquidButtonAnimation } from './hooks';

import type { PolymorphicComponent, PolymorphicProps } from '@wanteddev/wds';
import type { CSSProperties, ElementType, ForwardedRef } from 'react';

type Props = {
  containerRef?: React.RefObject<HTMLDivElement>;
};

const LiquidButtonCopy2 = forwardRef(
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

    const maskId = useId();

    return (
      <>
        <Filter filterId={filterId} aria-hidden />

        <Box
          as="svg"
          sx={{
            display: 'none',
          }}
        >
          <mask
            id={maskId}
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x="-50"
            y="-50"
            width="247.81"
            height="148.24"
          >
            <rect
              width="247.81"
              height="148.24"
              fill="white"
              transform="translate(-50 -50)"
            />
            <rect
              width="147.81"
              height="48.24"
              rx="145"
              transform="translate(-50 -50)"
              fill="black"
            />
          </mask>
        </Box>

        <FlexBox
          alignItems="center"
          data-role="liquid-button"
          {...props}
          as={as || 'button'}
          ref={composedRefs}
          sx={[liquidButtonStyle, props.sx]}
          style={
            {
              '--liquid-button-filter': `url(#${filterId}) brightness(1.5)`,
              ...animationStyle,
              ...props.style,
            } as CSSProperties
          }
        >
          <Box sx={[liquidButtonLayerStyle, liquidButtonBackgroundLayerStyle]}>
            <Box sx={[liquidButtonLayerStyle, liquidButtonFillOpacityStyle]} />
            <Box sx={[liquidButtonLayerStyle, liquidButtonFillDarkerStyle]} />
            <Box sx={[liquidButtonLayerStyle, liquidButtonGlassEffectStyle]} />
            <Box
              sx={[liquidButtonLayerStyle, liquidButtonBlurLayerStyle(maskId)]}
            />
          </Box>
          <Box as="span" sx={[liquidButtonContentStyle]}>
            {children}
          </Box>
        </FlexBox>
      </>
    );
  },
) as PolymorphicComponent<Props, 'button'>;

export default LiquidButtonCopy2;
