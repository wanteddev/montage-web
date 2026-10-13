import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
      <ellipse cx="12.0001" cy="12" rx="9.89996" ry="9.9" fill="#0866FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5542 21.7787V14.871H15.8609L16.2965 12.0099H13.5542V10.1487C13.5542 9.36657 13.9403 8.60427 15.1679 8.60427H16.4153V6.16887C16.4153 6.16887 15.2768 5.97087 14.1977 5.97087C11.9306 5.97087 10.4555 7.33707 10.4555 9.82197V12H7.94092V14.8611H10.4555V21.7802C10.9588 21.859 11.4746 21.9 11.9999 21.9C12.5287 21.9 13.0479 21.8585 13.5542 21.7787Z"
        fill="white"
      />
    </Box>
  );
});

export default IconLogoFacebookColor;
