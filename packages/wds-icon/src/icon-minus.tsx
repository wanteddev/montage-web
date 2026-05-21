import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 요소를 제거할 때 사용합니다.
 * 키워드: Delete, 마이너스, 빼기
 * 속성: Outlined
 */
const IconMinus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.09982 11.9996C3.09982 11.5026 3.50277 11.0996 3.99982 11.0996H19.9998C20.4968 11.0996 20.8998 11.5026 20.8998 11.9996C20.8998 12.4967 20.4968 12.8996 19.9998 12.8996H3.99982C3.50277 12.8996 3.09982 12.4967 3.09982 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMinus;
