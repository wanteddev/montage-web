import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M22.2027 6.87739C21.9578 5.96149 21.2336 5.23729 20.3177 4.99234C18.6563 4.54504 12.0001 4.54504 12.0001 4.54504C12.0001 4.54504 5.34383 4.54504 3.68244 4.99234C2.76654 5.23729 2.04234 5.96149 1.7974 6.87739C1.3501 8.53879 1.3501 12 1.3501 12C1.3501 12 1.3501 15.4613 1.7974 17.1227C2.04234 18.0386 2.76654 18.7628 3.68244 19.0077C5.34383 19.455 12.0001 19.455 12.0001 19.455C12.0001 19.455 18.6563 19.455 20.3177 19.0077C21.2336 18.7628 21.9578 18.0386 22.2027 17.1227C22.65 15.4613 22.65 12 22.65 12C22.65 12 22.65 8.53879 22.2027 6.87739Z"
        fill="#FF0000"
      />
      <path
        d="M9.87012 15.1951V8.80505L15.4081 12.0001L9.87012 15.1951Z"
        fill="white"
      />
    </Box>
  );
});

export default IconLogoYoutubeColor;
