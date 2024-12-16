import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconNavigationCareer = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M6.21994 4.24998C6.21994 3.55963 5.6603 2.99998 4.96994 2.99998C4.27959 2.99998 3.71995 3.55963 3.71995 4.24998V19.7516C3.71995 20.442 4.27959 21.0016 4.96994 21.0016C5.6603 21.0016 6.21994 20.442 6.21994 19.7516V16.0421C8.26384 14.3383 10.3616 15.1046 12.4707 15.8751C14.6286 16.6634 16.7983 17.456 18.9346 15.6125C19.7873 14.8788 20.2675 13.6878 20.2675 12.4515V5.40809C20.2675 4.57646 19.3982 4.22486 18.7525 4.73658C16.454 6.55812 14.3127 5.74407 12.2212 4.94899C10.2065 4.18306 8.23804 3.43473 6.21994 5.07713V4.24998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationCareer;
