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
        d="M13.1793 3.10032C12.4285 2.76603 11.5711 2.76603 10.8203 3.10032C10.2969 3.33332 9.91913 3.76042 9.59079 4.22514C9.26528 4.68587 8.90715 5.3062 8.47142 6.06094L3.36057 14.9132C2.92481 15.6679 2.56665 16.2882 2.33041 16.8005C2.09211 17.3172 1.91113 17.858 1.97101 18.4277C2.05692 19.2451 2.48563 19.9876 3.15054 20.4707C3.61399 20.8074 4.17277 20.921 4.73941 20.973C5.30116 21.0246 6.01746 21.0245 6.88896 21.0245H17.1106C17.9821 21.0245 18.6984 21.0246 19.2602 20.973C19.8268 20.921 20.3856 20.8074 20.849 20.4707C21.514 19.9876 21.9427 19.2451 22.0286 18.4277C22.0885 17.858 21.9075 17.3172 21.6692 16.8005C21.4329 16.2882 21.0748 15.6679 20.639 14.9132L15.5282 6.06093C15.0924 5.3062 14.7343 4.68587 14.4088 4.22515C14.0805 3.76042 13.7027 3.33332 13.1793 3.10032Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconTriangleFill;
