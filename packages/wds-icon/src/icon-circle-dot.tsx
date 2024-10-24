import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleDot = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.1 11.9995C8.1 9.8456 9.84609 8.09951 12 8.09951C14.1539 8.09951 15.9 9.8456 15.9 11.9995C15.9 14.1534 14.1539 15.8995 12 15.8995C9.84609 15.8995 8.1 14.1534 8.1 11.9995Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09998 11.9996C2.09998 6.53199 6.53236 2.09961 12 2.09961C17.4676 2.09961 21.9 6.53199 21.9 11.9996C21.9 17.4672 17.4676 21.8996 12 21.8996C6.53236 21.8996 2.09998 17.4672 2.09998 11.9996ZM12 3.89961C7.52647 3.89961 3.89998 7.5261 3.89998 11.9996C3.89998 16.4731 7.52647 20.0996 12 20.0996C16.4735 20.0996 20.1 16.4731 20.1 11.9996C20.1 7.5261 16.4735 3.89961 12 3.89961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleDot;
