import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 업데이트된 내용을 표현합니다.
 * 키워드: 점, Dot
 * 속성: Outlined
 */
const IconDot = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M18 12C18 15.312 15.312 18.0001 12 18.0001C8.68799 18.0001 6 15.312 6 12C6 8.68801 8.68799 6 12 6C15.312 6 18 8.68801 18 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconDot;
