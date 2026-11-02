import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 요소를 옮길 때 사용합니다.
 * 키워드: Grabber, 그랩, 그래빙, 핸들러, 핸들, 옮기기
 * 속성: Outlined
 */
const IconHandle = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.0001 8.6001C3.50304 8.6001 3.1001 9.00304 3.1001 9.5001C3.1001 9.99715 3.50304 10.4001 4.0001 10.4001H20C20.4971 10.4001 20.9 9.99715 20.9 9.5001C20.9 9.00304 20.4971 8.6001 20 8.6001H4.0001Z"
        fill="currentColor"
      />
      <path
        d="M4.0001 13.6001C3.50304 13.6001 3.1001 14.003 3.1001 14.5001C3.1001 14.9972 3.50304 15.4001 4.0001 15.4001H20C20.4971 15.4001 20.9 14.9972 20.9 14.5001C20.9 14.003 20.4971 13.6001 20 13.6001H4.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHandle;
