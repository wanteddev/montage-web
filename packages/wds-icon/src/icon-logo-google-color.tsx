import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M12.0002 21.9004C14.6732 21.9004 16.9139 21.0138 18.5518 19.5023L15.353 17.0174C14.4664 17.6114 13.3323 17.9623 12.0002 17.9623C9.42183 17.9623 7.23944 16.221 6.46064 13.8813H3.15295V16.4465C4.78205 19.6817 8.13043 21.9004 12.0002 21.9004Z"
        fill="#31A752"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.46036 13.8813C6.26236 13.2873 6.15016 12.6526 6.15016 12.0003C6.15016 11.348 6.26236 10.7133 6.46036 10.1193V7.55414H3.15267C2.48277 8.89064 2.09998 10.4031 2.09998 12.0003C2.09998 13.5975 2.48277 15.11 3.15267 16.4465L6.46036 13.8813Z"
        fill="#F9BA00"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0002 6.03798C13.4533 6.03798 14.759 6.53738 15.7842 7.51858L18.6244 4.67948C16.9095 3.08118 14.6688 2.09998 12.0002 2.09998C8.13043 2.09998 4.78205 4.31868 3.15295 7.55488L6.46064 10.119C7.23944 7.77928 9.42183 6.03798 12.0002 6.03798Z"
        fill="#E64234"
      />
    </Box>
  );
});

export default IconLogoGoogleColor;
