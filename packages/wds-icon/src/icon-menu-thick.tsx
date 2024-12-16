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
        d="M4.00023 4.49901C3.30988 4.49901 2.75023 5.05865 2.75023 5.749C2.75023 6.43935 3.30988 6.999 4.00023 6.999H20.0002C20.6905 6.999 21.2502 6.43935 21.2502 5.749C21.2502 5.05865 20.6905 4.49901 20.0002 4.49901H4.00023Z"
        fill="currentColor"
      />
      <path
        d="M2.75025 11.9992C2.75025 11.3088 3.30989 10.7492 4.00024 10.7492H20.0002C20.6905 10.7492 21.2502 11.3088 21.2502 11.9992C21.2502 12.6895 20.6905 13.2492 20.0002 13.2492H4.00024C3.30989 13.2492 2.75025 12.6895 2.75025 11.9992Z"
        fill="currentColor"
      />
      <path
        d="M2.75024 18.2489C2.75024 17.5585 3.30988 16.9989 4.00024 16.9989H20.0002C20.6905 16.9989 21.2502 17.5585 21.2502 18.2489C21.2502 18.9392 20.6905 19.4989 20.0002 19.4989H4.00024C3.30988 19.4989 2.75024 18.9392 2.75024 18.2489Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenuThick;
