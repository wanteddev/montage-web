import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

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
        d="M22.2027 6.87739C21.9577 5.96149 21.2335 5.23729 20.3176 4.99234C18.6562 4.54504 12 4.54504 12 4.54504C12 4.54504 5.34373 4.54504 3.68233 4.99234C2.76643 5.23729 2.04223 5.96149 1.79728 6.87739C1.34998 8.53879 1.34998 12 1.34998 12C1.34998 12 1.34998 15.4613 1.79728 17.1227C2.04223 18.0386 2.76643 18.7628 3.68233 19.0077C5.34373 19.455 12 19.455 12 19.455C12 19.455 18.6562 19.455 20.3176 19.0077C21.2335 18.7628 21.9577 18.0386 22.2027 17.1227C22.65 15.4613 22.65 12 22.65 12C22.65 12 22.65 8.53879 22.2027 6.87739Z"
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
