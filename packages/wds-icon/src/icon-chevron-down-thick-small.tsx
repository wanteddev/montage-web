import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDownThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M4.08071 8.08071C4.58839 7.57303 5.41151 7.57303 5.91919 8.08071L12 14.1615L18.0807 8.08071C18.5884 7.57303 19.4115 7.57303 19.9192 8.08071C20.4269 8.58839 20.4269 9.41151 19.9192 9.91919L12.9192 16.9192C12.4115 17.4269 11.5884 17.4269 11.0807 16.9192L4.08071 9.91919C3.57303 9.41151 3.57303 8.58839 4.08071 8.08071Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDownThickSmall;
