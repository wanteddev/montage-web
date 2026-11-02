import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽으로 들어가는 화살표를 표현합니다.
 * 키워드: Select, Enter, 선택, 엔터
 * 속성: Outlined
 */
const IconArrowTurnDownLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.9001 3.99766C19.9001 3.5006 19.4972 3.09766 19.0001 3.09766C18.503 3.09766 18.1001 3.5006 18.1001 3.99766V5.49766C18.1001 6.91264 18.0994 7.91975 18.035 8.70836C17.9714 9.48646 17.8503 9.97226 17.6532 10.359C17.2601 11.1305 16.6329 11.7577 15.8615 12.1508C15.4747 12.3478 14.9889 12.469 14.2108 12.5325C13.4222 12.597 12.4151 12.5977 11.0001 12.5977H6.67435L10.1365 9.13552C10.488 8.78405 10.488 8.2142 10.1365 7.86273C9.78502 7.51125 9.21517 7.51125 8.8637 7.86273L3.8637 12.8627C3.51223 13.2142 3.51223 13.784 3.8637 14.1355L8.8637 19.1355C9.21517 19.487 9.78502 19.487 10.1365 19.1355C10.488 18.784 10.488 18.2142 10.1365 17.8627L6.67142 14.3977H11.0398C12.4063 14.3977 13.4869 14.3977 14.3574 14.3265C15.2468 14.2539 15.9958 14.1025 16.6786 13.7546C17.7888 13.1889 18.6914 12.2864 19.257 11.1762C19.6049 10.4934 19.7563 9.74435 19.829 8.85494C19.9001 7.98445 19.9001 6.90386 19.9001 5.53739V3.99766Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowTurnDownLeft;
