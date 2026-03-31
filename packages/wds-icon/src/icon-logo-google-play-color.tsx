import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 구글 플레이 로고를 표현합니다.
 * 키워드: 구글 플레이, 로고, Google Play, Playstore, Icon, Size, Small
 */
const IconLogoGooglePlayColor = forwardRef<SVGSVGElement, Props>(
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
          d="M11.9443 11.5751L4.07385 19.926C4.31773 20.8349 5.14541 21.5001 6.1283 21.5001C6.51997 21.5001 6.88947 21.3966 7.20725 21.2045L7.22942 21.1897L16.0827 16.0831L11.9369 11.5677L11.9443 11.5751Z"
          fill="#EA4335"
        />
        <path
          d="M19.9034 10.1562H19.8961L16.0754 7.93176L11.767 11.7672L16.0902 16.0904L19.8961 13.8956C20.5612 13.5335 21.012 12.8314 21.012 12.0259C21.012 11.2204 20.5686 10.5183 19.9034 10.1636V10.1562Z"
          fill="#FBBC04"
        />
        <path
          d="M4.0739 4.08154C4.02956 4.25891 4 4.43627 4 4.62841V19.3865C4 19.5786 4.02217 19.756 4.0739 19.9333L12.2104 11.7968L4.0739 4.08154Z"
          fill="#4285F4"
        />
        <path
          d="M12.0034 12.0037L16.0753 7.93173L7.22942 2.80299C6.91164 2.61085 6.53475 2.5 6.1283 2.5C5.14541 2.5 4.31773 3.1725 4.07385 4.07409L12.0034 11.9963V12.0037Z"
          fill="#34A853"
        />
      </Box>
    );
  },
);

export default IconLogoGooglePlayColor;
