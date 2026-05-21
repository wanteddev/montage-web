import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 삼각형을 표현합니다.
 * 키워드: Triangle, 삼각형
 * 속성: Solid
 */
const IconTriangleFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.1793 3.10033C12.4285 2.76604 11.5711 2.76604 10.8203 3.10033C10.2969 3.33333 9.91914 3.76043 9.5908 4.22516C9.26529 4.68589 8.90715 5.30622 8.47142 6.06097L3.36057 14.9132C2.92482 15.668 2.56666 16.2883 2.33041 16.8006C2.09211 17.3173 1.91114 17.858 1.97102 18.4277C2.05693 19.2451 2.48563 19.9877 3.15055 20.4708C3.614 20.8075 4.17278 20.9211 4.73942 20.9731C5.30117 21.0246 6.01747 21.0246 6.88896 21.0246H17.1106C17.9821 21.0246 18.6984 21.0246 19.2602 20.9731C19.8268 20.9211 20.3856 20.8075 20.8491 20.4708C21.514 19.9877 21.9427 19.2451 22.0286 18.4277C22.0885 17.858 21.9075 17.3173 21.6692 16.8006C21.4329 16.2883 21.0748 15.668 20.639 14.9133L15.5282 6.06096C15.0924 5.30622 14.7343 4.68589 14.4088 4.22516C14.0805 3.76043 13.7027 3.33333 13.1793 3.10033Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconTriangleFill;
