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
        d="M4.00024 4.49951C3.30989 4.49951 2.75024 5.05916 2.75024 5.74951C2.75024 6.43987 3.30989 6.99951 4.00024 6.99951H20.0002C20.6906 6.99951 21.2502 6.43987 21.2502 5.74951C21.2502 5.05916 20.6906 4.49951 20.0002 4.49951H4.00024Z"
        fill="currentColor"
      />
      <path
        d="M2.75026 11.9997C2.75026 11.3094 3.3099 10.7497 4.00026 10.7497H20.0003C20.6906 10.7497 21.2503 11.3094 21.2503 11.9997C21.2503 12.6901 20.6906 13.2497 20.0003 13.2497H4.00026C3.3099 13.2497 2.75026 12.6901 2.75026 11.9997Z"
        fill="currentColor"
      />
      <path
        d="M2.75025 18.2494C2.75025 17.5591 3.3099 16.9994 4.00025 16.9994H20.0003C20.6906 16.9994 21.2503 17.5591 21.2503 18.2494C21.2503 18.9398 20.6906 19.4994 20.0003 19.4994H4.00025C3.3099 19.4994 2.75025 18.9398 2.75025 18.2494Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenuThick;
