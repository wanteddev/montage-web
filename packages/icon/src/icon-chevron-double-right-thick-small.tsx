import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽으로 큰 상태 변화를 표현합니다.
 * 키워드: Thick, 오른쪽 꺾쇠, 굵은, 얇은, 작은, 큰, Double Chevron, Right, Small
 * 속성: Outlined
 */
const IconChevronDoubleRightThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M4.08096 6.42334C3.57327 5.91566 3.57327 5.09254 4.08096 4.58486C4.58864 4.07718 5.41175 4.07718 5.91944 4.58486L12.4194 11.0849C12.6632 11.3287 12.8002 11.6593 12.8002 12.0041C12.8002 12.3489 12.6632 12.6795 12.4194 12.9233L5.91944 19.4233C5.41175 19.931 4.58864 19.931 4.08096 19.4233C3.57328 18.9157 3.57328 18.0925 4.08096 17.5849L9.66172 12.0041L4.08096 6.42334ZM12.0811 6.42334C11.5734 5.91566 11.5734 5.09254 12.0811 4.58486C12.5888 4.07718 13.4119 4.07718 13.9196 4.58486L20.4196 11.0849C20.6634 11.3287 20.8003 11.6593 20.8003 12.0041C20.8003 12.3489 20.6634 12.6795 20.4196 12.9233L13.9196 19.4233C13.4119 19.931 12.5888 19.931 12.0811 19.4233C11.5734 18.9157 11.5734 18.0925 12.0811 17.5849L17.6619 12.0041L12.0811 6.42334Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightThickSmall;
