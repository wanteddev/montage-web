import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeftThickSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M15.4195 4.58067C15.9272 5.08834 15.9272 5.91145 15.4195 6.41912L9.83881 11.9998L15.4195 17.5805C15.9272 18.0882 15.9272 18.9113 15.4195 19.419C14.9118 19.9267 14.0887 19.9267 13.5811 19.419L7.08113 12.9191C6.57345 12.4114 6.57345 11.5883 7.08113 11.0806L13.5811 4.58067C14.0887 4.07299 14.9118 4.07299 15.4195 4.58067Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftThickSmall;
