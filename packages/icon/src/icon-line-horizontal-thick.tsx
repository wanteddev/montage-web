import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
          d="M4.7002 12.0002C4.7002 11.2822 5.28223 10.7002 6.0002 10.7002H18.0002C18.7182 10.7002 19.3002 11.2822 19.3002 12.0002C19.3002 12.7182 18.7182 13.3002 18.0002 13.3002H6.0002C5.28223 13.3002 4.7002 12.7182 4.7002 12.0002Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconLineHorizontalThick;
