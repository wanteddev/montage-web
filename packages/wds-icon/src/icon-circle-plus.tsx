import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M12.8999 7.99951C12.8999 7.50246 12.497 7.09951 11.9999 7.09951C11.5029 7.09951 11.0999 7.50246 11.0999 7.99951V11.0995H7.99995C7.5029 11.0995 7.09996 11.5025 7.09996 11.9995C7.09996 12.4966 7.5029 12.8995 7.99995 12.8995H11.0999V15.9995C11.0999 16.4966 11.5029 16.8995 11.9999 16.8995C12.497 16.8995 12.8999 16.4966 12.8999 15.9995V12.8995H15.9999C16.497 12.8995 16.8999 12.4966 16.8999 11.9995C16.8999 11.5025 16.497 11.0995 15.9999 11.0995H12.8999V7.99951Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.09961C6.53231 2.09961 2.09995 6.53199 2.09995 11.9996C2.09995 17.4672 6.53231 21.8996 11.9999 21.8996C17.4675 21.8996 21.8999 17.4672 21.8999 11.9996C21.8999 6.53199 17.4675 2.09961 11.9999 2.09961ZM3.89994 11.9996C3.89994 7.5261 7.52642 3.89961 11.9999 3.89961C16.4734 3.89961 20.0999 7.5261 20.0999 11.9996C20.0999 16.4731 16.4734 20.0996 11.9999 20.0996C7.52642 20.0996 3.89994 16.4731 3.89994 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlus;
