import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정보의 변화가 없음을 표현합니다.
 * 키워드: Thick, 수평라인, 라인, 수평선, Horizontal Line
 * 속성: Outlined
 */
const IconLineHorizontalThick = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M4.70001 12.0002C4.70001 11.2822 5.28204 10.7002 6.00001 10.7002H18C18.718 10.7002 19.3 11.2822 19.3 12.0002C19.3 12.7182 18.718 13.3002 18 13.3002H6.00001C5.28204 13.3002 4.70001 12.7182 4.70001 12.0002Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconLineHorizontalThick;
