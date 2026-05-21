import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M17.9999 12C17.9999 15.312 15.3119 18.0001 11.9999 18.0001C8.68796 18.0001 5.99997 15.312 5.99997 12C5.99997 8.68801 8.68796 6 11.9999 6C15.3119 6 17.9999 8.68801 17.9999 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconDot;
