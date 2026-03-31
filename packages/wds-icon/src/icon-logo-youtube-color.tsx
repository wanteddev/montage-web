import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 유튜브 로고를 표현합니다.
 * 키워드: YouTube, 유튭, 유튜브, 로고, Icon, Size, Small
 */
const IconLogoYoutubeColor = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M22.2026 6.87739C21.9576 5.96149 21.2334 5.23729 20.3175 4.99234C18.6562 4.54504 11.9999 4.54504 11.9999 4.54504C11.9999 4.54504 5.34371 4.54504 3.68232 4.99234C2.76642 5.23729 2.04222 5.96149 1.79727 6.87739C1.34998 8.53879 1.34998 12 1.34998 12C1.34998 12 1.34998 15.4613 1.79727 17.1227C2.04222 18.0386 2.76642 18.7628 3.68232 19.0077C5.34371 19.455 11.9999 19.455 11.9999 19.455C11.9999 19.455 18.6562 19.455 20.3175 19.0077C21.2334 18.7628 21.9576 18.0386 22.2026 17.1227C22.6499 15.4613 22.6499 12 22.6499 12C22.6499 12 22.6499 8.53879 22.2026 6.87739Z"
        fill="#FF0000"
      />
      <path
        d="M9.87 15.1951V8.80505L15.408 12.0001L9.87 15.1951Z"
        fill="white"
      />
    </Box>
  );
});

export default IconLogoYoutubeColor;
