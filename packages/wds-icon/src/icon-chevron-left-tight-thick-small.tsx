import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeftTightThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M9.41919 4.58071C9.92687 5.08839 9.92687 5.91151 9.41919 6.41919L3.83843 12L9.41919 17.5807C9.92687 18.0884 9.92687 18.9115 9.41919 19.4192C8.91151 19.9269 8.08839 19.9269 7.58071 19.4192L1.08071 12.9192C0.573031 12.4115 0.573031 11.5884 1.08071 11.0807L7.58071 4.58071C8.08839 4.07303 8.91151 4.07303 9.41919 4.58071Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftTightThickSmall;
