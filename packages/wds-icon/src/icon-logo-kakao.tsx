import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 카카오 로고를 표현합니다.
 * 키워드: 카카오톡, 카카오, KakaoTalk, Kakao Logo
 * 속성: Outlined
 */
const IconLogoKakao = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.0003 3.1543C6.79576 3.1543 2.57178 6.43544 2.57178 10.4709C2.57178 12.9883 4.20291 15.1852 6.69205 16.524L5.64548 20.3614C5.62573 20.4378 5.6298 20.5183 5.65713 20.5923C5.68446 20.6662 5.73375 20.73 5.79838 20.7752C5.86302 20.8203 5.93992 20.8446 6.01876 20.8448C6.0976 20.845 6.17461 20.8211 6.23948 20.7763L10.8217 17.7309C11.2083 17.7309 11.6043 17.7969 12.0003 17.7969C17.2049 17.7969 21.4289 14.5157 21.4289 10.4709C21.4289 6.42601 17.2049 3.1543 12.0003 3.1543Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoKakao;
