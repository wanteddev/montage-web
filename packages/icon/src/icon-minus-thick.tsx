import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 요소를 제거할 때 사용합니다.
 * 키워드: Thick, Delete, 마이너스, 빼기, Thick
 * 속성: Outlined
 */
const IconMinusThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        d="M2.7002 11.9992C2.7002 11.2812 3.28223 10.6992 4.0002 10.6992H20.0002C20.7182 10.6992 21.3002 11.2812 21.3002 11.9992C21.3002 12.7172 20.7182 13.2992 20.0002 13.2992H4.0002C3.28223 13.2992 2.7002 12.7172 2.7002 11.9992Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMinusThick;
