import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPlus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9998 3.10252C12.4968 3.10252 12.8998 3.50546 12.8998 4.00252V11.1025H19.9998C20.4968 11.1025 20.8997 11.5054 20.8997 12.0025C20.8997 12.4995 20.4968 12.9025 19.9998 12.9025H12.8998V20.0024C12.8998 20.4995 12.4968 20.9024 11.9998 20.9024C11.5027 20.9024 11.0998 20.4995 11.0998 20.0024V12.9025H3.99983C3.50278 12.9025 3.09984 12.4995 3.09984 12.0025C3.09984 11.5054 3.50278 11.1025 3.99983 11.1025H11.0998V4.00252C11.0998 3.50546 11.5027 3.10252 11.9998 3.10252Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlus;
