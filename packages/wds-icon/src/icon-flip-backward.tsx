import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 되돌리기를 표현합니다.
 * 키워드: Flip, Backward, Reverse, Undo
 * 속성: Outlined
 */
const IconFlipBackward = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.63686 5.13601C8.98833 4.78453 8.98833 4.21469 8.63686 3.86321C8.28539 3.51174 7.71554 3.51174 7.36407 3.86321L2.86407 8.36321C2.69529 8.532 2.60046 8.76091 2.60046 8.99961C2.60046 9.2383 2.69529 9.46722 2.86407 9.63601L7.36407 14.136C7.71554 14.4875 8.28539 14.4875 8.63686 14.136C8.98833 13.7845 8.98833 13.2147 8.63686 12.8632L5.67384 9.9002H15.5C17.7644 9.9002 19.6 11.7358 19.6 14.0002C19.6 16.2646 17.7644 18.1002 15.5 18.1002H12C11.503 18.1002 11.1 18.5031 11.1 19.0002C11.1 19.4973 11.503 19.9002 12 19.9002H15.5C18.7585 19.9002 21.4 17.2587 21.4 14.0002C21.4 10.7417 18.7585 8.1002 15.5 8.1002H5.67267L8.63686 5.13601Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFlipBackward;
