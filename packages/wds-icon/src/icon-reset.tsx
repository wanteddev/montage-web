import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 초기화를 표현합니다.
 * 키워드: Arrow Counter Clockwise, 반시계 화살표
 * 속성: Outlined
 */
const IconReset = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.45566 6.77131L8.13723 5.45288C11.0518 3.72936 14.8711 4.12107 17.3755 6.62552C20.3435 9.5935 20.3435 14.4056 17.3755 17.3735C14.4075 20.3415 9.59547 20.3415 6.62749 17.3735C5.1431 15.8892 4.40128 13.9454 4.4015 11.9987C4.40156 11.5016 3.99866 11.0986 3.5016 11.0986C3.00455 11.0985 2.60156 11.5014 2.6015 11.9985C2.60123 14.4031 3.51914 16.8108 5.3547 18.6463C9.02563 22.3173 14.9774 22.3173 18.6483 18.6463C22.3192 14.9754 22.3192 9.02365 18.6483 5.35273C15.4363 2.14076 10.4801 1.73979 6.83139 4.14704L5.56658 2.88222C5.30918 2.62483 4.92207 2.54783 4.58576 2.68713C4.24946 2.82643 4.03018 3.1546 4.03018 3.51862L4.03018 7.40771C4.03018 7.6464 4.125 7.87532 4.29378 8.0441C4.46257 8.21289 4.69148 8.30771 4.93018 8.30771H8.81927C9.18328 8.30771 9.51145 8.08843 9.65076 7.75212C9.79006 7.41582 9.71306 7.02871 9.45566 6.77131Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconReset;
