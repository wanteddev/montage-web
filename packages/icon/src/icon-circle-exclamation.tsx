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
 * 속성: Outlined
 */
const IconCircleExclamation = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13 15.9995C13 16.5518 12.5523 16.9995 12 16.9995C11.4478 16.9995 11 16.5518 11 15.9995C11 15.4472 11.4478 14.9995 12 14.9995C12.5523 14.9995 13 15.4472 13 15.9995Z"
        fill="currentColor"
      />
      <path
        d="M12.9002 7.99951C12.9002 7.50246 12.4972 7.09951 12.0002 7.09951C11.5031 7.09951 11.1002 7.50246 11.1002 7.99951V12.4995C11.1002 12.9966 11.5031 13.3995 12.0002 13.3995C12.4972 13.3995 12.9002 12.9966 12.9002 12.4995V7.99951Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.1001 11.9996C2.1001 6.53199 6.53246 2.09961 12.0001 2.09961C17.4677 2.09961 21.9 6.53199 21.9 11.9996C21.9 17.4672 17.4677 21.8996 12.0001 21.8996C6.53246 21.8996 2.1001 17.4672 2.1001 11.9996ZM12.0001 3.89961C7.52657 3.89961 3.90009 7.5261 3.90009 11.9996C3.90009 16.4731 7.52657 20.0996 12.0001 20.0996C16.4735 20.0996 20.1 16.4731 20.1 11.9996C20.1 7.5261 16.4735 3.89961 12.0001 3.89961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleExclamation;
