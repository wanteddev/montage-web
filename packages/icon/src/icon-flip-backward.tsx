import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M8.63698 5.13601C8.98845 4.78453 8.98845 4.21469 8.63698 3.86321C8.28551 3.51174 7.71566 3.51174 7.36419 3.86321L2.86419 8.36321C2.69541 8.532 2.60059 8.76091 2.60059 8.99961C2.60059 9.2383 2.69541 9.46722 2.86419 9.63601L7.36419 14.136C7.71566 14.4875 8.28551 14.4875 8.63698 14.136C8.98845 13.7845 8.98845 13.2147 8.63698 12.8632L5.67396 9.9002H15.5002C17.7645 9.9002 19.6002 11.7358 19.6002 14.0002C19.6002 16.2646 17.7645 18.1002 15.5002 18.1002H12.0002C11.5031 18.1002 11.1002 18.5031 11.1002 19.0002C11.1002 19.4973 11.5031 19.9002 12.0002 19.9002H15.5002C18.7586 19.9002 21.4002 17.2587 21.4002 14.0002C21.4002 10.7417 18.7586 8.1002 15.5002 8.1002H5.67279L8.63698 5.13601Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFlipBackward;
