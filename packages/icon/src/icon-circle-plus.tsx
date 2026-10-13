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
const IconCirclePlus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.9001 7.99951C12.9001 7.50246 12.4971 7.09951 12.0001 7.09951C11.503 7.09951 11.1001 7.50246 11.1001 7.99951V11.0995H8.00011C7.50305 11.0995 7.10011 11.5025 7.10011 11.9995C7.10011 12.4966 7.50305 12.8995 8.00011 12.8995H11.1001V15.9995C11.1001 16.4966 11.503 16.8995 12.0001 16.8995C12.4971 16.8995 12.9001 16.4966 12.9001 15.9995V12.8995H16.0001C16.4971 12.8995 16.9001 12.4966 16.9001 11.9995C16.9001 11.5025 16.4971 11.0995 16.0001 11.0995H12.9001V7.99951Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 2.09961C6.53246 2.09961 2.1001 6.53199 2.1001 11.9996C2.1001 17.4672 6.53246 21.8996 12.0001 21.8996C17.4677 21.8996 21.9 17.4672 21.9 11.9996C21.9 6.53199 17.4677 2.09961 12.0001 2.09961ZM3.90009 11.9996C3.90009 7.5261 7.52657 3.89961 12.0001 3.89961C16.4735 3.89961 20.1 7.5261 20.1 11.9996C20.1 16.4731 16.4735 20.0996 12.0001 20.0996C7.52657 20.0996 3.90009 16.4731 3.90009 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlus;
