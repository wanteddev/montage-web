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
        d="M4.00021 4.49951C3.30986 4.49951 2.75021 5.05916 2.75021 5.74951C2.75021 6.43987 3.30986 6.99951 4.00021 6.99951H20.0001C20.6905 6.99951 21.2501 6.43987 21.2501 5.74951C21.2501 5.05916 20.6905 4.49951 20.0001 4.49951H4.00021Z"
        fill="currentColor"
      />
      <path
        d="M2.75023 11.9997C2.75023 11.3094 3.30987 10.7497 4.00022 10.7497H20.0002C20.6905 10.7497 21.2502 11.3094 21.2502 11.9997C21.2502 12.6901 20.6905 13.2497 20.0002 13.2497H4.00022C3.30987 13.2497 2.75023 12.6901 2.75023 11.9997Z"
        fill="currentColor"
      />
      <path
        d="M2.75022 18.2494C2.75022 17.5591 3.30986 16.9994 4.00022 16.9994H20.0002C20.6905 16.9994 21.2502 17.5591 21.2502 18.2494C21.2502 18.9398 20.6905 19.4994 20.0002 19.4994H4.00022C3.30986 19.4994 2.75022 18.9398 2.75022 18.2494Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenuThick;
