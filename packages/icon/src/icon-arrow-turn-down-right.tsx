import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽으로 들어가는 화살표를 표현합니다.
 * 키워드: Indent, 개행
 * 속성: Outlined
 */
const IconArrowTurnDownRight = forwardRef<SVGSVGElement, Props>(
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
          d="M5.9001 3.99766C5.9001 3.5006 5.49715 3.09766 5.0001 3.09766C4.50304 3.09766 4.1001 3.5006 4.1001 3.99766V5.53739C4.10009 6.90386 4.10009 7.98444 4.17121 8.85494C4.24388 9.74435 4.39526 10.4934 4.74316 11.1762C5.30881 12.2864 6.2114 13.1889 7.32155 13.7546C8.00435 14.1025 8.7534 14.2539 9.64282 14.3265C10.5133 14.3977 11.5939 14.3977 12.9603 14.3977H17.3287L13.8637 17.8626C13.5122 18.2141 13.5122 18.7839 13.8637 19.1354C14.2152 19.4869 14.785 19.4869 15.1365 19.1354L20.1365 14.1354C20.488 13.7839 20.488 13.2141 20.1365 12.8626L15.1365 7.86263C14.785 7.51116 14.2152 7.51116 13.8637 7.86263C13.5122 8.2141 13.5122 8.78395 13.8637 9.13542L17.3259 12.5977H13.0001C11.5851 12.5977 10.578 12.597 9.7894 12.5325C9.01129 12.469 8.52549 12.3478 8.13874 12.1508C7.36727 11.7577 6.74005 11.1305 6.34697 10.359C6.14991 9.97226 6.0288 9.48646 5.96523 8.70836C5.9008 7.91975 5.9001 6.91264 5.9001 5.49766V3.99766Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconArrowTurnDownRight;
