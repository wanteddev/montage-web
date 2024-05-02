import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronUp = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        d="M3.3634 16.136C3.71487 16.4875 4.28472 16.4875 4.63619 16.136L11.9998 8.7724L19.3634 16.136C19.7149 16.4875 20.2847 16.4875 20.6362 16.136C20.9877 15.7845 20.9877 15.2147 20.6362 14.8632L12.6362 6.86321C12.2847 6.51174 11.7149 6.51174 11.3634 6.86321L3.3634 14.8632C3.01192 15.2147 3.01192 15.7845 3.3634 16.136Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUp;
