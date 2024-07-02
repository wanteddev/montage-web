import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconTriangle = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M10.8202 3.10031C11.5711 2.76602 12.4285 2.76602 13.1793 3.10031C13.7026 3.33331 14.0804 3.76041 14.4088 4.22514C14.7343 4.68586 15.0924 5.30619 15.5281 6.06093L20.639 14.9132C21.0748 15.6679 21.4329 16.2882 21.6692 16.8005C21.9075 17.3172 22.0884 17.8579 22.0286 18.4276C21.9426 19.245 21.5139 19.9876 20.849 20.4707C20.3856 20.8074 19.8268 20.921 19.2602 20.973C18.6984 21.0245 17.9821 21.0245 17.1106 21.0245H6.88895C6.01745 21.0245 5.30116 21.0245 4.7394 20.973C4.17277 20.921 3.61399 20.8074 3.15054 20.4707C2.48562 19.9876 2.05692 19.245 1.97101 18.4276C1.91113 17.8579 2.0921 17.3172 2.3304 16.8005C2.56665 16.2882 2.92481 15.6679 3.36056 14.9132L8.4714 6.06094C8.90714 5.3062 9.26527 4.68586 9.59078 4.22514C9.91912 3.76041 10.2969 3.33331 10.8202 3.10031ZM12.9524 5.19961C12.529 4.46627 11.4705 4.46628 11.0471 5.1996L3.90247 17.5745C3.47909 18.3079 4.00832 19.2245 4.85509 19.2245H19.1444C19.9912 19.2245 20.5205 18.3079 20.0971 17.5745L12.9524 5.19961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconTriangle;
