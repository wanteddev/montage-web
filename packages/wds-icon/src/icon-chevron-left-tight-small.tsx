import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeftTightSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
    return (
      <Box
        as="svg"
        viewBox="0 0 12 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        ref={ref}
        {...props}
      >
        <path
          d="M9.13637 4.8637C9.48784 5.21517 9.48784 5.78502 9.13637 6.13649L3.27277 12.0001L9.13637 17.8637C9.48784 18.2152 9.48784 18.785 9.13637 19.1365C8.7849 19.488 8.21505 19.488 7.86358 19.1365L1.36358 12.6365C1.01211 12.285 1.01211 11.7152 1.36358 11.3637L7.86358 4.8637C8.21505 4.51223 8.7849 4.51223 9.13637 4.8637Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftTightSmall;
