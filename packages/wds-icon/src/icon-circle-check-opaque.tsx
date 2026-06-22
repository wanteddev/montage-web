import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정상적으로 확인된 상태를 표현합니다.
 * 키워드: 체크, 확인, Check, Checked, Confirm
 * 속성: Solid
 */
const IconCircleCheckOpaque = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
      <rect x="6" y="6" width="12" height="12" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09995 11.9996C2.09995 6.53199 6.53231 2.09961 11.9999 2.09961C17.4675 2.09961 21.8999 6.53199 21.8999 11.9996C21.8999 17.4672 17.4675 21.8996 11.9999 21.8996C6.53231 21.8996 2.09995 17.4672 2.09995 11.9996ZM16.6466 9.87545C16.9923 9.51829 16.983 8.94852 16.6258 8.60283C16.2687 8.25713 15.6989 8.26642 15.3532 8.62357L10.6773 13.4545L8.64748 11.3517C8.30227 10.9941 7.73251 10.984 7.37489 11.3292C7.01727 11.6745 7.0072 12.2442 7.35241 12.6018L10.0289 15.3746C10.1983 15.5501 10.4318 15.6493 10.6758 15.6495C10.9198 15.6497 11.1534 15.5508 11.3231 15.3754L16.6466 9.87545Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheckOpaque;
