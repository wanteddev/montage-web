import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 한정된 공간에 추가 요소를 표시할 때 사용합니다.
 * 키워드: More, 3dots, See More, 추가, 땡땡떙
 * 속성: Outlined
 */
const IconMoreVertical = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.7495 18.75C13.7495 17.7835 12.966 17 11.9995 17C11.033 17 10.2495 17.7835 10.2495 18.75C10.2495 19.7165 11.033 20.5 11.9995 20.5C12.966 20.5 13.7495 19.7165 13.7495 18.75Z"
        fill="currentColor"
      />
      <path
        d="M11.9995 10.25C12.966 10.25 13.7495 11.0335 13.7495 12C13.7495 12.9665 12.966 13.75 11.9995 13.75C11.033 13.75 10.2495 12.9665 10.2495 12C10.2495 11.0335 11.033 10.25 11.9995 10.25Z"
        fill="currentColor"
      />
      <path
        d="M11.9995 3.5C12.966 3.5 13.7495 4.2835 13.7495 5.25C13.7495 6.2165 12.966 7 11.9995 7C11.033 7 10.2495 6.2165 10.2495 5.25C10.2495 4.2835 11.033 3.5 11.9995 3.5Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreVertical;
