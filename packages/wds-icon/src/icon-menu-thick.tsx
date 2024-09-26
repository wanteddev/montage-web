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
        d="M4.00022 4.49949C3.30987 4.49949 2.75023 5.05913 2.75023 5.74948C2.75023 6.43983 3.30987 6.99948 4.00022 6.99948H20.0001C20.6905 6.99948 21.2501 6.43983 21.2501 5.74948C21.2501 5.05913 20.6905 4.49949 20.0001 4.49949H4.00022Z"
        fill="currentColor"
      />
      <path
        d="M2.75024 11.9996C2.75024 11.3093 3.30988 10.7497 4.00024 10.7497H20.0002C20.6905 10.7497 21.2501 11.3093 21.2501 11.9996C21.2501 12.69 20.6905 13.2496 20.0002 13.2496H4.00024C3.30988 13.2496 2.75024 12.69 2.75024 11.9996Z"
        fill="currentColor"
      />
      <path
        d="M2.75024 18.2493C2.75024 17.559 3.30988 16.9993 4.00023 16.9993H20.0002C20.6905 16.9993 21.2501 17.559 21.2501 18.2493C21.2501 18.9397 20.6905 19.4993 20.0002 19.4993H4.00023C3.30988 19.4993 2.75024 18.9397 2.75024 18.2493Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenuThick;
