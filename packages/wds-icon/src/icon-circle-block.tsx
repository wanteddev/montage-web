import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 금지된 상황을 표현합니다.
 * 키워드: Stop, 멈춤, 밴, Banned, Prohibited, 금지, Blocked, No, 그만, 멈춰, 동그란 금지
 * 속성: Outlined
 */
const IconCircleBlock = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12 2.1001C6.5324 2.1001 2.10004 6.53248 2.10004 12.0001C2.10004 17.4677 6.5324 21.9001 12 21.9001C17.4676 21.9001 21.9 17.4677 21.9 12.0001C21.9 6.53248 17.4676 2.1001 12 2.1001ZM3.90003 12.0001C3.90003 7.52659 7.52651 3.9001 12 3.9001C13.9125 3.9001 15.6702 4.56292 17.0559 5.67139L5.67131 17.056C4.56285 15.6703 3.90003 13.9126 3.90003 12.0001ZM6.9441 18.3288C8.3298 19.4373 10.0875 20.1001 12 20.1001C16.4735 20.1001 20.1 16.4736 20.1 12.0001C20.1 10.0876 19.4371 8.32988 18.3287 6.94418L6.9441 18.3288Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleBlock;
