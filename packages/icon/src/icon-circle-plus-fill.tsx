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
 * 속성: Solid
 */
const IconCirclePlusFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09995 11.9996C2.09995 6.53199 6.5323 2.09961 11.9999 2.09961C17.4675 2.09961 21.8999 6.53199 21.8999 11.9996C21.8999 17.4672 17.4675 21.8996 11.9999 21.8996C6.5323 21.8996 2.09995 17.4672 2.09995 11.9996ZM12.8999 7.74951C12.8999 7.25246 12.497 6.84951 11.9999 6.84951C11.5029 6.84951 11.0999 7.25246 11.0999 7.74951V11.0995H7.74995C7.25289 11.0995 6.84995 11.5025 6.84995 11.9995C6.84995 12.4966 7.25289 12.8995 7.74995 12.8995H11.0999V16.2495C11.0999 16.7466 11.5029 17.1495 11.9999 17.1495C12.497 17.1495 12.8999 16.7466 12.8999 16.2495V12.8995H16.2499C16.747 12.8995 17.1499 12.4966 17.1499 11.9995C17.1499 11.5025 16.747 11.0995 16.2499 11.0995H12.8999V7.74951Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlusFill;
