import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 구글 로고를 표현합니다.
 * 키워드: 구글, 로고, Google, Icon, Size, Small
 */
const IconLogoGoogleColor = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M21.504 12.2255C21.504 11.5237 21.4413 10.8483 21.3236 10.2004H12V14.0295H17.3284C17.0985 15.267 16.4011 16.3164 15.3528 17.0182V19.502H18.5516C20.4238 17.7783 21.504 15.2406 21.504 12.2255Z"
        fill="#3D82F0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 21.9004C14.6731 21.9004 16.9138 21.0138 18.5517 19.5024L15.3529 17.0175C14.4663 17.6115 13.3322 17.9624 12.0001 17.9624C9.42171 17.9624 7.23932 16.2211 6.46052 13.8814H3.15283V16.4466C4.78193 19.6817 8.13031 21.9004 12.0001 21.9004Z"
        fill="#31A752"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.46048 13.8814C6.26248 13.2874 6.15028 12.6527 6.15028 12.0004C6.15028 11.3481 6.26248 10.7134 6.46048 10.1194V7.55419H3.15279C2.4829 8.89069 2.1001 10.4032 2.1001 12.0004C2.1001 13.5976 2.4829 15.1101 3.15279 16.4466L6.46048 13.8814Z"
        fill="#F9BA00"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 6.038C13.4532 6.038 14.7589 6.5374 15.7841 7.5186L18.6243 4.6795C16.9094 3.0812 14.6687 2.1 12.0001 2.1C8.13031 2.1 4.78193 4.3187 3.15283 7.5549L6.46052 10.119C7.23932 7.7793 9.42171 6.038 12.0001 6.038Z"
        fill="#E64234"
      />
    </Box>
  );
});

export default IconLogoGoogleColor;
