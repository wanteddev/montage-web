import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M9.31942 15.3802C9.31942 15.8602 9.70856 16.2493 10.1886 16.2493C10.6686 16.2493 11.0578 15.8602 11.0578 15.3802V13.3717H12.2323C14.1703 13.3717 15.4976 12.2265 15.4976 10.5527C15.4976 8.8907 14.1703 7.74551 12.2323 7.74551H10.9194C10.3594 7.74551 10.0793 7.74551 9.86543 7.8545C9.67726 7.95037 9.52428 8.10335 9.42841 8.29152C9.31942 8.50543 9.31942 8.78546 9.31942 9.34551V15.3802ZM12.2558 11.786H11.0578V9.33116H12.2558C13.1896 9.33116 13.7475 9.78924 13.7475 10.5527C13.7475 11.322 13.1896 11.786 12.2558 11.786Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.09961C6.53231 2.09961 2.09995 6.53199 2.09995 11.9996C2.09995 17.4672 6.53231 21.8996 11.9999 21.8996C17.4675 21.8996 21.8999 17.4672 21.8999 11.9996C21.8999 6.53199 17.4675 2.09961 11.9999 2.09961ZM3.89994 11.9996C3.89994 7.5261 7.52642 3.89961 11.9999 3.89961C16.4734 3.89961 20.0999 7.5261 20.0999 11.9996C20.0999 16.4731 16.4734 20.0996 11.9999 20.0996C7.52642 20.0996 3.89994 16.4731 3.89994 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePoint;
