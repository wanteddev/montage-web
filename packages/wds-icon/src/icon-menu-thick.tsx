import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMenuThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.00023 4.49949C3.30988 4.49949 2.75023 5.05914 2.75023 5.74949C2.75023 6.43984 3.30988 6.99949 4.00023 6.99949H20.0002C20.6905 6.99949 21.2502 6.43984 21.2502 5.74949C21.2502 5.05914 20.6905 4.49949 20.0002 4.49949H4.00023Z"
        fill="currentColor"
      />
      <path
        d="M2.75025 11.9997C2.75025 11.3093 3.30989 10.7497 4.00024 10.7497H20.0002C20.6905 10.7497 21.2502 11.3093 21.2502 11.9997C21.2502 12.69 20.6905 13.2497 20.0002 13.2497H4.00024C3.30989 13.2497 2.75025 12.69 2.75025 11.9997Z"
        fill="currentColor"
      />
      <path
        d="M2.75024 18.2493C2.75024 17.559 3.30988 16.9993 4.00024 16.9993H20.0002C20.6905 16.9993 21.2502 17.559 21.2502 18.2493C21.2502 18.9397 20.6905 19.4993 20.0002 19.4993H4.00024C3.30988 19.4993 2.75024 18.9397 2.75024 18.2493Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenuThick;
