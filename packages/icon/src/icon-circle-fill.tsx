import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 원형을 표현합니다.
 * 키워드: Oval, 원형
 * 속성: Solid
 */
const IconCircleFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.1001 12.0001C2.1001 6.53248 6.53246 2.1001 12.0001 2.1001C17.4677 2.1001 21.9 6.53248 21.9 12.0001C21.9 17.4677 17.4677 21.9001 12.0001 21.9001C6.53246 21.9001 2.1001 17.4677 2.1001 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleFill;
