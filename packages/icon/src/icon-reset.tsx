import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M9.45572 6.77131L8.13729 5.45288C11.0519 3.72936 14.8711 4.12107 17.3756 6.62552C20.3436 9.5935 20.3436 14.4056 17.3756 17.3735C14.4076 20.3415 9.59554 20.3415 6.62755 17.3735C5.14316 15.8892 4.40134 13.9454 4.40156 11.9987C4.40162 11.5016 3.99872 11.0986 3.50167 11.0986C3.00461 11.0985 2.60162 11.5014 2.60156 11.9985C2.60129 14.4031 3.5192 16.8108 5.35476 18.6463C9.02569 22.3173 14.9774 22.3173 18.6484 18.6463C22.3193 14.9754 22.3193 9.02365 18.6484 5.35273C15.4364 2.14076 10.4802 1.73979 6.83145 4.14704L5.56664 2.88222C5.30924 2.62483 4.92213 2.54783 4.58583 2.68713C4.24952 2.82643 4.03024 3.1546 4.03024 3.51862L4.03024 7.40771C4.03024 7.6464 4.12506 7.87532 4.29384 8.0441C4.46263 8.21289 4.69155 8.30771 4.93024 8.30771H8.81933C9.18334 8.30771 9.51152 8.08843 9.65082 7.75212C9.79012 7.41582 9.71312 7.02871 9.45572 6.77131Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconReset;
