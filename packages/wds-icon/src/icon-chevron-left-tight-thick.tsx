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
          d="M10.4191 3.07998C10.9268 3.58766 10.9268 4.41078 10.4191 4.91846L3.33837 11.9992L10.4191 19.08C10.9268 19.5877 10.9268 20.4108 10.4191 20.9185C9.91145 21.4261 9.08833 21.4261 8.58065 20.9185L0.580651 12.9185C0.0729699 12.4108 0.0729699 11.5877 0.580651 11.08L8.58065 3.07998C9.08833 2.5723 9.91145 2.5723 10.4191 3.07998Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftTightThick;
