import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 마이크로소프트 로고를 표현합니다.
 * 키워드: 마소
 */
const IconLogoMicrosoftColor = forwardRef<SVGSVGElement, Props>(
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
        <path d="M12.6428 12.6429H21V21.0001H12.6428V12.6429Z" fill="#FBB604" />
        <path d="M11.3571 12.6429H3V21.0001H11.3571V12.6429Z" fill="#03A4EE" />
        <path d="M21 3H12.6428V11.3571H21V3Z" fill="#7EB903" />
        <path d="M11.3571 3H3V11.3571H11.3571V3Z" fill="#F05022" />
      </Box>
    );
  },
);

export default IconLogoMicrosoftColor;
