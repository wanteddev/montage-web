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
        d="M13 7.99951C13 8.5518 12.5523 8.99951 12 8.99951C11.4477 8.99951 11 8.5518 11 7.99951C11 7.44723 11.4477 6.99951 12 6.99951C12.5523 6.99951 13 7.44723 13 7.99951Z"
        fill="currentColor"
      />
      <path
        d="M12.9001 11.4995C12.9001 11.0025 12.4972 10.5995 12.0001 10.5995C11.5031 10.5995 11.1002 11.0025 11.1002 11.4995V15.9995C11.1002 16.4966 11.5031 16.8995 12.0001 16.8995C12.4972 16.8995 12.9001 16.4966 12.9001 15.9995V11.4995Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.1001 11.9996C2.1001 6.53199 6.53246 2.09961 12.0001 2.09961C17.4676 2.09961 21.9 6.53199 21.9 11.9996C21.9 17.4672 17.4676 21.8996 12.0001 21.8996C6.53246 21.8996 2.1001 17.4672 2.1001 11.9996ZM12.0001 3.89961C7.52657 3.89961 3.90009 7.5261 3.90009 11.9996C3.90009 16.4731 7.52657 20.0996 12.0001 20.0996C16.4735 20.0996 20.1 16.4731 20.1 11.9996C20.1 7.5261 16.4735 3.89961 12.0001 3.89961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleInfo;
