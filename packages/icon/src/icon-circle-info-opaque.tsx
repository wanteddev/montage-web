import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정보를 표시할 때 사용합니다.
 * 키워드: Additional Information, Info
 * 속성: Solid
 */
const IconCircleInfoOpaque = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.09998 11.9996C2.09998 6.53199 6.53234 2.09961 11.9999 2.09961C17.4675 2.09961 21.8999 6.53199 21.8999 11.9996C21.8999 17.4672 17.4675 21.8996 11.9999 21.8996C6.53234 21.8996 2.09998 17.4672 2.09998 11.9996ZM12.9999 7.99951C12.9999 8.5518 12.5522 8.99951 11.9999 8.99951C11.4476 8.99951 10.9999 8.5518 10.9999 7.99951C10.9999 7.44723 11.4476 6.99951 11.9999 6.99951C12.5522 6.99951 12.9999 7.44723 12.9999 7.99951ZM12 10.5995C12.4971 10.5995 12.9 11.0025 12.9 11.4995V15.9995C12.9 16.4966 12.4971 16.8995 12 16.8995C11.503 16.8995 11.1 16.4966 11.1 15.9995V11.4995C11.1 11.0025 11.503 10.5995 12 10.5995Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleInfoOpaque;
