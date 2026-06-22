import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M12.9999 15.9995C12.9999 16.5518 12.5522 16.9995 11.9999 16.9995C11.4476 16.9995 10.9999 16.5518 10.9999 15.9995C10.9999 15.4472 11.4476 14.9995 11.9999 14.9995C12.5522 14.9995 12.9999 15.4472 12.9999 15.9995Z"
        fill="currentColor"
      />
      <path
        d="M12.9 7.99951C12.9 7.50246 12.4971 7.09951 12 7.09951C11.5029 7.09951 11.1 7.50246 11.1 7.99951V12.4995C11.1 12.9966 11.5029 13.3995 12 13.3995C12.4971 13.3995 12.9 12.9966 12.9 12.4995V7.99951Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09995 11.9996C2.09995 6.53199 6.53231 2.09961 11.9999 2.09961C17.4675 2.09961 21.8999 6.53199 21.8999 11.9996C21.8999 17.4672 17.4675 21.8996 11.9999 21.8996C6.53231 21.8996 2.09995 17.4672 2.09995 11.9996ZM11.9999 3.89961C7.52642 3.89961 3.89994 7.5261 3.89994 11.9996C3.89994 16.4731 7.52642 20.0996 11.9999 20.0996C16.4734 20.0996 20.0999 16.4731 20.0999 11.9996C20.0999 7.5261 16.4734 3.89961 11.9999 3.89961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleExclamation;
