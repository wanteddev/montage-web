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
          d="M1.58064 3.07996C1.07296 3.58763 1.07296 4.41074 1.58064 4.91842L8.66135 11.9991L1.58064 19.0798C1.07296 19.5875 1.07296 20.4106 1.58064 20.9183C2.08832 21.426 2.91143 21.426 3.4191 20.9183L11.419 12.9184C11.9267 12.4107 11.9267 11.5876 11.419 11.0799L3.4191 3.07996C2.91143 2.57228 2.08832 2.57228 1.58064 3.07996Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightTightThick;
