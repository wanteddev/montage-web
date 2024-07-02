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
          d="M9.13613 4.8637C9.4876 5.21517 9.4876 5.78502 9.13613 6.13649L3.27252 12.0001L9.13613 17.8637C9.4876 18.2152 9.4876 18.785 9.13613 19.1365C8.78466 19.488 8.21481 19.488 7.86333 19.1365L1.36334 12.6365C1.01186 12.285 1.01186 11.7152 1.36334 11.3637L7.86334 4.8637C8.21481 4.51223 8.78466 4.51223 9.13613 4.8637Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftTightSmall;
