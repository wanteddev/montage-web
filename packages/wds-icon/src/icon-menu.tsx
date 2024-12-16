import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMenu = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.0003 4.84959C3.50324 4.84959 3.1003 5.25253 3.1003 5.74959C3.1003 6.24664 3.50324 6.64958 4.0003 6.64958H20.0002C20.4973 6.64958 20.9002 6.24664 20.9002 5.74959C20.9002 5.25253 20.4973 4.84959 20.0002 4.84959H4.0003Z"
        fill="currentColor"
      />
      <path
        d="M3.10031 11.9998C3.10031 11.5027 3.50325 11.0998 4.00031 11.0998H20.0002C20.4973 11.0998 20.9002 11.5027 20.9002 11.9998C20.9002 12.4968 20.4973 12.8998 20.0002 12.8998H4.00031C3.50325 12.8998 3.10031 12.4968 3.10031 11.9998Z"
        fill="currentColor"
      />
      <path
        d="M3.10031 18.2494C3.10031 17.7524 3.50325 17.3494 4.00031 17.3494H20.0002C20.4973 17.3494 20.9002 17.7524 20.9002 18.2494C20.9002 18.7465 20.4973 19.1494 20.0002 19.1494H4.00031C3.50325 19.1494 3.10031 18.7465 3.10031 18.2494Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenu;
