import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 요소를 추가할 때 사용합니다.
 * 키워드: 플러스, 추가, Add, Plus
 * 속성: Outlined
 */
const IconCirclePlusOpaque = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
      <rect x="6" y="6" width="12" height="12" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.10004 11.9996C2.10004 6.53199 6.5324 2.09961 12 2.09961C17.4676 2.09961 21.8999 6.53199 21.8999 11.9996C21.8999 17.4672 17.4676 21.8996 12 21.8996C6.5324 21.8996 2.10004 17.4672 2.10004 11.9996ZM12.9 7.74951C12.9 7.25246 12.4971 6.84951 12 6.84951C11.503 6.84951 11.1 7.25246 11.1 7.74951V11.0995H7.75004C7.25298 11.0995 6.85004 11.5025 6.85004 11.9995C6.85004 12.4966 7.25298 12.8995 7.75004 12.8995H11.1V16.2495C11.1 16.7466 11.503 17.1495 12 17.1495C12.4971 17.1495 12.9 16.7466 12.9 16.2495V12.8995H16.25C16.7471 12.8995 17.15 12.4966 17.15 11.9995C17.15 11.5025 16.7471 11.0995 16.25 11.0995H12.9V7.74951Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlusOpaque;
