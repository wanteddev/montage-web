import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 구글 플레이 로고를 표현합니다.
 * 키워드: 플레이, 구글, 플레이스토어, Google, Playstore, Play Logo
 * 속성: Outlined
 */
const IconLogoGooglePlay = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M15.7177 7.72438L7.22938 2.80299C6.9116 2.61085 6.53471 2.5 6.12825 2.5C5.29873 2.5 4.57974 2.97902 4.22897 3.67049L12.0033 11.4407L15.7177 7.72438Z"
        fill="currentColor"
      />
      <path
        d="M4.00074 4.57346C4.00021 4.59165 3.99994 4.60997 3.99994 4.62842V19.3865C3.99994 19.407 4.00019 19.4273 4.00071 19.4475L11.4377 12.0066L4.00074 4.57346Z"
        fill="currentColor"
      />
      <path
        d="M4.23529 20.3445C4.58833 21.032 5.30368 21.5001 6.12825 21.5001C6.51993 21.5001 6.88943 21.3966 7.20721 21.2045L7.22938 21.1897L15.7236 16.2903L12.0036 12.5721L4.23529 20.3445Z"
        fill="currentColor"
      />
      <path
        d="M16.4486 15.8837L19.896 13.8956C20.5611 13.5335 21.0119 12.8314 21.0119 12.0259C21.0119 11.2204 20.5685 10.5183 19.9034 10.1636V10.1562H19.896L16.4332 8.14012L12.5691 12.0063L16.4486 15.8837Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoGooglePlay;
