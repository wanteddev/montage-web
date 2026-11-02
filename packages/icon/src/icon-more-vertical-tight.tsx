import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 한정된 공간에 추가 요소를 표시할 때 사용합니다.
 * 키워드: More, 3dots, See More, 추가, 땡땡땡, Tight
 * 속성: Outlined
 */
const IconMoreVerticalTight = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        d="M7.74951 18.75C7.74951 17.7835 6.96601 17 5.99951 17C5.03301 17 4.24951 17.7835 4.24951 18.75C4.24951 19.7165 5.03301 20.5 5.99951 20.5C6.96601 20.5 7.74951 19.7165 7.74951 18.75Z"
        fill="currentColor"
      />
      <path
        d="M5.99951 10.25C6.96601 10.25 7.74951 11.0335 7.74951 12C7.74951 12.9665 6.96601 13.75 5.99951 13.75C5.03301 13.75 4.24951 12.9665 4.24951 12C4.24951 11.0335 5.03301 10.25 5.99951 10.25Z"
        fill="currentColor"
      />
      <path
        d="M5.99951 3.5C6.96601 3.5 7.74951 4.2835 7.74951 5.25C7.74951 6.2165 6.96601 7 5.99951 7C5.03301 7 4.24951 6.2165 4.24951 5.25C4.24951 4.2835 5.03301 3.5 5.99951 3.5Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreVerticalTight;
