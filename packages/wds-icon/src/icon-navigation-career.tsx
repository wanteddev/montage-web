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
        d="M6.21997 4.25C6.21997 3.55964 5.66032 3 4.96997 3C4.27961 3 3.71997 3.55964 3.71997 4.25V19.7517C3.71997 20.4421 4.27961 21.0017 4.96997 21.0017C5.66032 21.0017 6.21997 20.4421 6.21997 19.7517V16.0422C8.26388 14.3384 10.3616 15.1047 12.4708 15.8752C14.6286 16.6635 16.7984 17.4561 18.9347 15.6125C19.7874 14.8789 20.2676 13.6879 20.2676 12.4516V5.40811C20.2676 4.57649 19.3983 4.22488 18.7526 4.73661C16.454 6.55816 14.3127 5.7441 12.2213 4.94902C10.2065 4.18308 8.23808 3.43475 6.21997 5.07715V4.25Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationCareer;
