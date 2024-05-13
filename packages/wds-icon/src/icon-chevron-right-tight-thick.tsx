import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightTightThick = forwardRef<SVGSVGElement, Props>(
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
          d="M1.58059 3.07998C1.07291 3.58766 1.07291 4.41078 1.58059 4.91846L8.66135 11.9992L1.58059 19.08C1.07291 19.5877 1.07291 20.4108 1.58059 20.9185C2.08827 21.4261 2.91139 21.4261 3.41907 20.9185L11.4191 12.9185C11.9267 12.4108 11.9267 11.5877 11.4191 11.08L3.41907 3.07998C2.91139 2.5723 2.08827 2.5723 1.58059 3.07998Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightTightThick;
