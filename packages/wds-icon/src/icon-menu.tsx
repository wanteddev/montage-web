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
        d="M4.00032 4.84958C3.50327 4.84958 3.10033 5.25253 3.10033 5.74958C3.10033 6.24663 3.50327 6.64958 4.00032 6.64958H20.0002C20.4973 6.64958 20.9002 6.24663 20.9002 5.74958C20.9002 5.25253 20.4973 4.84958 20.0002 4.84958H4.00032Z"
        fill="currentColor"
      />
      <path
        d="M3.10034 11.9997C3.10034 11.5027 3.50328 11.0997 4.00033 11.0997H20.0003C20.4973 11.0997 20.9002 11.5027 20.9002 11.9997C20.9002 12.4968 20.4973 12.8997 20.0003 12.8997H4.00033C3.50328 12.8997 3.10034 12.4968 3.10034 11.9997Z"
        fill="currentColor"
      />
      <path
        d="M3.10034 18.2494C3.10034 17.7524 3.50328 17.3494 4.00033 17.3494H20.0002C20.4973 17.3494 20.9002 17.7524 20.9002 18.2494C20.9002 18.7465 20.4973 19.1494 20.0002 19.1494H4.00033C3.50328 19.1494 3.10034 18.7465 3.10034 18.2494Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenu;
