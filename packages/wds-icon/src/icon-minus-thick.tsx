import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M2.70007 11.9992C2.70007 11.2812 3.2821 10.6992 4.00007 10.6992H20.0001C20.7181 10.6992 21.3001 11.2812 21.3001 11.9992C21.3001 12.7172 20.7181 13.2992 20.0001 13.2992H4.00007C3.2821 13.2992 2.70007 12.7172 2.70007 11.9992Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMinusThick;
