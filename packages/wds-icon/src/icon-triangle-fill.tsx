import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconTriangleFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.1793 3.10031C12.4285 2.76602 11.5711 2.76602 10.8202 3.10031C10.2969 3.33331 9.91912 3.76041 9.59078 4.22514C9.26527 4.68586 8.90714 5.3062 8.4714 6.06094L3.36056 14.9132C2.92481 15.6679 2.56665 16.2882 2.3304 16.8005C2.0921 17.3172 1.91113 17.8579 1.97101 18.4276C2.05692 19.245 2.48562 19.9876 3.15054 20.4707C3.61399 20.8074 4.17277 20.921 4.7394 20.973C5.30116 21.0245 6.01745 21.0245 6.88895 21.0245H17.1106C17.9821 21.0245 18.6984 21.0245 19.2602 20.973C19.8268 20.921 20.3856 20.8074 20.849 20.4707C21.5139 19.9876 21.9426 19.245 22.0286 18.4276C22.0884 17.8579 21.9075 17.3172 21.6692 16.8005C21.4329 16.2882 21.0748 15.6679 20.639 14.9132L15.5281 6.06093C15.0924 5.30619 14.7343 4.68586 14.4088 4.22514C14.0804 3.76041 13.7026 3.33331 13.1793 3.10031Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconTriangleFill;
