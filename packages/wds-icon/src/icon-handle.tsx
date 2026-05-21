import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M3.99994 8.6001C3.50289 8.6001 3.09995 9.00304 3.09995 9.5001C3.09995 9.99715 3.50289 10.4001 3.99994 10.4001H19.9999C20.4969 10.4001 20.8999 9.99715 20.8999 9.5001C20.8999 9.00304 20.4969 8.6001 19.9999 8.6001H3.99994Z"
        fill="currentColor"
      />
      <path
        d="M3.99994 13.6001C3.50289 13.6001 3.09995 14.003 3.09995 14.5001C3.09995 14.9972 3.50289 15.4001 3.99994 15.4001H19.9999C20.4969 15.4001 20.8999 14.9972 20.8999 14.5001C20.8999 14.003 20.4969 13.6001 19.9999 13.6001H3.99994Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHandle;
