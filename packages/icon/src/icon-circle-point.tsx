import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 포인트를 표현합니다.
 * 키워드: Wanted Point, 원티드 포인트
 * 속성: Outlined
 */
const IconCirclePoint = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.31957 15.3802C9.31957 15.8602 9.70871 16.2493 10.1887 16.2493C10.6688 16.2493 11.0579 15.8602 11.0579 15.3802V13.3717H12.2325C14.1705 13.3717 15.4977 12.2265 15.4977 10.5527C15.4977 8.8907 14.1705 7.74551 12.2325 7.74551H10.9196C10.3595 7.74551 10.0795 7.74551 9.86558 7.8545C9.67742 7.95037 9.52444 8.10335 9.42856 8.29152C9.31957 8.50543 9.31957 8.78546 9.31957 9.34551V15.3802ZM12.256 11.786H11.0579V9.33116H12.256C13.1897 9.33116 13.7477 9.78924 13.7477 10.5527C13.7477 11.322 13.1897 11.786 12.256 11.786Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 2.09961C6.53246 2.09961 2.1001 6.53199 2.1001 11.9996C2.1001 17.4672 6.53246 21.8996 12.0001 21.8996C17.4677 21.8996 21.9 17.4672 21.9 11.9996C21.9 6.53199 17.4677 2.09961 12.0001 2.09961ZM3.90009 11.9996C3.90009 7.5261 7.52657 3.89961 12.0001 3.89961C16.4735 3.89961 20.1 7.5261 20.1 11.9996C20.1 16.4731 16.4735 20.0996 12.0001 20.0996C7.52657 20.0996 3.90009 16.4731 3.90009 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePoint;
