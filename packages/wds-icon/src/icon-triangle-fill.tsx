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
        d="M13.1794 3.10033C12.4285 2.76604 11.5711 2.76604 10.8203 3.10033C10.297 3.33333 9.91917 3.76043 9.59083 4.22516C9.26532 4.68589 8.90718 5.30622 8.47145 6.06097L3.36058 14.9132C2.92482 15.668 2.56666 16.2883 2.33041 16.8006C2.09212 17.3173 1.91114 17.858 1.97102 18.4277C2.05693 19.2451 2.48563 19.9877 3.15055 20.4708C3.614 20.8075 4.17279 20.9211 4.73943 20.9731C5.30118 21.0246 6.01749 21.0246 6.88898 21.0246H17.1107C17.9822 21.0246 18.6985 21.0246 19.2603 20.9731C19.8269 20.9211 20.3857 20.8075 20.8491 20.4708C21.514 19.9877 21.9428 19.2451 22.0287 18.4277C22.0885 17.858 21.9076 17.3173 21.6693 16.8006C21.433 16.2883 21.0749 15.668 20.6391 14.9133L15.5282 6.06096C15.0925 5.30622 14.7344 4.68589 14.4089 4.22516C14.0805 3.76043 13.7027 3.33333 13.1794 3.10033Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconTriangleFill;
