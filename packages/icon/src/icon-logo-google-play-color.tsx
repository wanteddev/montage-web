import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
          d="M11.9442 11.5751L4.07373 19.926C4.3176 20.8349 5.14529 21.5001 6.12817 21.5001C6.51985 21.5001 6.88935 21.3966 7.20713 21.2045L7.2293 21.1897L16.0826 16.0831L11.9368 11.5677L11.9442 11.5751Z"
          fill="#EA4335"
        />
        <path
          d="M19.9036 10.1562H19.8962L16.0755 7.93176L11.7671 11.7672L16.0903 16.0904L19.8962 13.8956C20.5613 13.5335 21.0121 12.8314 21.0121 12.0259C21.0121 11.2204 20.5687 10.5183 19.9036 10.1636V10.1562Z"
          fill="#FBBC04"
        />
        <path
          d="M4.0739 4.08154C4.02956 4.25891 4 4.43627 4 4.62841V19.3865C4 19.5786 4.02217 19.756 4.0739 19.9333L12.2104 11.7968L4.0739 4.08154Z"
          fill="#4285F4"
        />
        <path
          d="M12.0033 12.0037L16.0752 7.93173L7.2293 2.80299C6.91152 2.61085 6.53463 2.5 6.12817 2.5C5.14529 2.5 4.3176 3.1725 4.07373 4.07409L12.0033 11.9963V12.0037Z"
          fill="#34A853"
        />
      </Box>
    );
  },
);

export default IconLogoGooglePlayColor;
