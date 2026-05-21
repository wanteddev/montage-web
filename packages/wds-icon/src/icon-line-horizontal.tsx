import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정보의 변화가 없음을 표현합니다.
 * 키워드: 수평라인, 라인, 수평선, Horizontal Line
 * 속성: Outlined
 */
const IconLineHorizontal = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.10001 12.0001C5.10001 11.503 5.50295 11.1001 6.00001 11.1001H18C18.4971 11.1001 18.9 11.503 18.9 12.0001C18.9 12.4972 18.4971 12.9001 18 12.9001H6.00001C5.50295 12.9001 5.10001 12.4972 5.10001 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLineHorizontal;
