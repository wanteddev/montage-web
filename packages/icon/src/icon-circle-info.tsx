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
 * 속성: Outlined
 */
const IconCircleInfo = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.9999 7.99951C12.9999 8.5518 12.5522 8.99951 11.9999 8.99951C11.4476 8.99951 10.9999 8.5518 10.9999 7.99951C10.9999 7.44723 11.4476 6.99951 11.9999 6.99951C12.5522 6.99951 12.9999 7.44723 12.9999 7.99951Z"
        fill="currentColor"
      />
      <path
        d="M12.9 11.4995C12.9 11.0025 12.497 10.5995 12 10.5995C11.5029 10.5995 11.1 11.0025 11.1 11.4995V15.9995C11.1 16.4966 11.5029 16.8995 12 16.8995C12.497 16.8995 12.9 16.4966 12.9 15.9995V11.4995Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09995 11.9996C2.09995 6.53199 6.5323 2.09961 11.9999 2.09961C17.4675 2.09961 21.8999 6.53199 21.8999 11.9996C21.8999 17.4672 17.4675 21.8996 11.9999 21.8996C6.5323 21.8996 2.09995 17.4672 2.09995 11.9996ZM11.9999 3.89961C7.52641 3.89961 3.89994 7.5261 3.89994 11.9996C3.89994 16.4731 7.52641 20.0996 11.9999 20.0996C16.4734 20.0996 20.0999 16.4731 20.0999 11.9996C20.0999 7.5261 16.4734 3.89961 11.9999 3.89961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleInfo;
