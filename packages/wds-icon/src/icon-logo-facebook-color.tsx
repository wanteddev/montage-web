import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 페이스북 로고를 표현합니다.
 * 키워드: 페이스북, 로고, 페북, Facebook, Meta, Icon, Size, Small
 */
const IconLogoFacebookColor = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
      <ellipse cx="11.9999" cy="12" rx="9.89996" ry="9.9" fill="#0866FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5543 21.7786V14.8709H15.861L16.2966 12.0098H13.5543V10.1486C13.5543 9.36653 13.9404 8.60422 15.168 8.60422H16.4154V6.16883C16.4154 6.16883 15.2769 5.97083 14.1978 5.97083C11.9307 5.97083 10.4556 7.33703 10.4556 9.82193V11.9999H7.94104V14.861H10.4556V21.7802C10.9589 21.859 11.4747 21.8999 12 21.8999C12.5288 21.8999 13.048 21.8585 13.5543 21.7786Z"
        fill="white"
      />
    </Box>
  );
});

export default IconLogoFacebookColor;
