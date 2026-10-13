import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M12.0001 2.1001C6.53246 2.1001 2.1001 6.53248 2.1001 12.0001C2.1001 17.4677 6.53246 21.9001 12.0001 21.9001C17.4677 21.9001 21.9 17.4677 21.9 12.0001C21.9 6.53248 17.4677 2.1001 12.0001 2.1001ZM3.90009 12.0001C3.90009 7.52659 7.52657 3.9001 12.0001 3.9001C13.9126 3.9001 15.6703 4.56292 17.056 5.67139L5.67137 17.056C4.56291 15.6703 3.90009 13.9126 3.90009 12.0001ZM6.94416 18.3288C8.32986 19.4373 10.0876 20.1001 12.0001 20.1001C16.4735 20.1001 20.1 16.4736 20.1 12.0001C20.1 10.0876 19.4372 8.32988 18.3287 6.94418L6.94416 18.3288Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleBlock;
