import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronUpThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M4.08071 15.9192C4.58839 16.4269 5.41151 16.4269 5.91919 15.9192L11.9999 9.83843L18.0807 15.9192C18.5884 16.4269 19.4115 16.4269 19.9192 15.9192C20.4269 15.4115 20.4269 14.5884 19.9192 14.0807L12.9192 7.08071C12.4115 6.57303 11.5884 6.57303 11.0807 7.08071L4.08071 14.0807C3.57303 14.5884 3.57303 15.4115 4.08071 15.9192Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronUpThickSmall;
