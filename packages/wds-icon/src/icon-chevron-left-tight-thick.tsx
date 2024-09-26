import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeftTightThick = forwardRef<SVGSVGElement, Props>(
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
          d="M10.4192 3.07998C10.9269 3.58766 10.9269 4.41078 10.4192 4.91846L3.33843 11.9992L10.4192 19.08C10.9269 19.5877 10.9269 20.4108 10.4192 20.9185C9.91151 21.4261 9.08839 21.4261 8.58071 20.9185L0.580712 12.9185C0.0730309 12.4108 0.073031 11.5877 0.580712 11.08L8.58071 3.07998C9.08839 2.5723 9.91151 2.5723 10.4192 3.07998Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftTightThick;
