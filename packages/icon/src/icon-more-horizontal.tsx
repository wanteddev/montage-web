import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 추가 요소를 표시할 때 사용합니다.
 * 키워드: More, 3dots, See More, 추가, 땡땡땡
 * 속성: Outlined
 */
const IconMoreHorizontal = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.24951 13.75C6.216 13.75 6.9995 12.9665 6.9995 12C6.9995 11.0335 6.216 10.25 5.24951 10.25C4.28301 10.25 3.49951 11.0335 3.49951 12C3.49951 12.9665 4.28301 13.75 5.24951 13.75Z"
        fill="currentColor"
      />
      <path
        d="M13.7495 12C13.7495 12.9665 12.966 13.75 11.9995 13.75C11.033 13.75 10.2495 12.9665 10.2495 12C10.2495 11.0335 11.033 10.25 11.9995 10.25C12.966 10.25 13.7495 11.0335 13.7495 12Z"
        fill="currentColor"
      />
      <path
        d="M20.4995 12C20.4995 12.9665 19.716 13.75 18.7495 13.75C17.783 13.75 16.9995 12.9665 16.9995 12C16.9995 11.0335 17.783 10.25 18.7495 10.25C19.716 10.25 20.4995 11.0335 20.4995 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreHorizontal;
