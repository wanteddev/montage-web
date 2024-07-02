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
        d="M4.00022 4.499C3.30987 4.499 2.75023 5.05864 2.75023 5.74899C2.75023 6.43935 3.30987 6.99899 4.00022 6.99899H20.0001C20.6905 6.99899 21.2501 6.43935 21.2501 5.74899C21.2501 5.05864 20.6905 4.499 20.0001 4.499H4.00022Z"
        fill="currentColor"
      />
      <path
        d="M2.75024 11.9992C2.75024 11.3088 3.30988 10.7492 4.00024 10.7492H20.0002C20.6905 10.7492 21.2501 11.3088 21.2501 11.9992C21.2501 12.6895 20.6905 13.2492 20.0002 13.2492H4.00024C3.30988 13.2492 2.75024 12.6895 2.75024 11.9992Z"
        fill="currentColor"
      />
      <path
        d="M2.75024 18.2488C2.75024 17.5585 3.30988 16.9988 4.00023 16.9988H20.0002C20.6905 16.9988 21.2501 17.5585 21.2501 18.2488C21.2501 18.9392 20.6905 19.4988 20.0002 19.4988H4.00023C3.30988 19.4988 2.75024 18.9392 2.75024 18.2488Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenuThick;
