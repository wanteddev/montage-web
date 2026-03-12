import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 주의할 정보를 표현합니다.
 * 키워드: 워닝, Warning, Wait, 기다리기, 주의
 * 속성: Solid
 */
const IconCircleExclamationOpaque = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M2.09991 11.9996C2.09991 6.53199 6.53228 2.09961 11.9999 2.09961C17.4675 2.09961 21.8998 6.53199 21.8998 11.9996C21.8998 17.4672 17.4675 21.8996 11.9999 21.8996C6.53228 21.8996 2.09991 17.4672 2.09991 11.9996ZM12 7.09951C12.497 7.09951 12.9 7.50246 12.9 7.99951V12.4995C12.9 12.9966 12.497 13.3995 12 13.3995C11.5029 13.3995 11.1 12.9966 11.1 12.4995V7.99951C11.1 7.50246 11.5029 7.09951 12 7.09951ZM12.9998 15.9995C12.9998 16.5518 12.5521 16.9995 11.9998 16.9995C11.4476 16.9995 10.9999 16.5518 10.9999 15.9995C10.9999 15.4472 11.4476 14.9995 11.9998 14.9995C12.5521 14.9995 12.9998 15.4472 12.9998 15.9995Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconCircleExclamationOpaque;
