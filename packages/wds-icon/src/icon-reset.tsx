import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconReset = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.45564 6.77129L8.13721 5.45287C11.0518 3.72935 14.871 4.12106 17.3755 6.6255C20.3434 9.59348 20.3434 14.4055 17.3755 17.3735C14.4075 20.3415 9.59545 20.3415 6.62747 17.3735C5.14309 15.8891 4.40127 13.9453 4.40149 11.9986C4.40155 11.5016 3.99865 11.0986 3.5016 11.0985C3.00454 11.0985 2.60155 11.5014 2.60149 11.9984C2.60122 14.403 3.51913 16.8107 5.35468 18.6463C9.0256 22.3172 14.9773 22.3172 18.6483 18.6463C22.3192 14.9754 22.3192 9.02363 18.6483 5.35271C15.4363 2.14076 10.4801 1.73979 6.83137 4.14703L5.56656 2.88222C5.30916 2.62482 4.92206 2.54782 4.58575 2.68712C4.24945 2.82642 4.03017 3.1546 4.03017 3.51861L4.03017 7.40769C4.03017 7.64638 4.12499 7.8753 4.29377 8.04408C4.46255 8.21286 4.69147 8.30769 4.93017 8.30769H8.81924C9.18326 8.30769 9.51143 8.08841 9.65073 7.7521C9.79004 7.4158 9.71304 7.02869 9.45564 6.77129Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconReset;
