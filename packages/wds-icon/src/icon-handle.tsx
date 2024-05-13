import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconHandle = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.99998 8.6001C3.50292 8.6001 3.09998 9.00304 3.09998 9.5001C3.09998 9.99715 3.50292 10.4001 3.99998 10.4001H20C20.497 10.4001 20.9 9.99715 20.9 9.5001C20.9 9.00304 20.497 8.6001 20 8.6001H3.99998Z"
        fill="currentColor"
      />
      <path
        d="M3.99998 13.6001C3.50292 13.6001 3.09998 14.003 3.09998 14.5001C3.09998 14.9972 3.50292 15.4001 3.99998 15.4001H20C20.497 15.4001 20.9 14.9972 20.9 14.5001C20.9 14.003 20.497 13.6001 20 13.6001H3.99998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHandle;
