import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정상적으로 확인된 상태를 표현합니다.
 * 키워드: 체크, 확인, Check, Checked, Confirm
 * 속성: Outlined
 */
const IconCircleCheckFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.10004 11.9996C2.10004 6.53199 6.5324 2.09961 12 2.09961C17.4676 2.09961 21.9 6.53199 21.9 11.9996C21.9 17.4672 17.4676 21.8996 12 21.8996C6.5324 21.8996 2.10004 17.4672 2.10004 11.9996ZM16.6467 9.87545C16.9924 9.51829 16.9831 8.94852 16.6259 8.60283C16.2688 8.25713 15.699 8.26642 15.3533 8.62357L10.6774 13.4545L8.64757 11.3517C8.30236 10.9941 7.73261 10.984 7.37498 11.3292C7.01736 11.6745 7.0073 12.2442 7.3525 12.6018L10.029 15.3746C10.1984 15.5501 10.4319 15.6493 10.6759 15.6495C10.9199 15.6497 11.1535 15.5508 11.3232 15.3754L16.6467 9.87545Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheckFill;
