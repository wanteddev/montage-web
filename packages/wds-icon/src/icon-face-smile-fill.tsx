import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFaceSmileFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09996 12C2.09996 6.53245 6.53232 2.10009 11.9999 2.10009C17.4675 2.10009 21.8999 6.53245 21.8999 12C21.8999 17.4676 17.4675 21.9 11.9999 21.9C6.53232 21.9 2.09996 17.4676 2.09996 12ZM9.99983 10.2499C9.99983 10.9403 9.44019 11.4999 8.74983 11.4999C8.05948 11.4999 7.49984 10.9403 7.49984 10.2499C7.49984 9.5596 8.05948 8.99995 8.74983 8.99995C9.44019 8.99995 9.99983 9.5596 9.99983 10.2499ZM16.4998 10.2499C16.4998 10.9403 15.9402 11.4999 15.2498 11.4999C14.5594 11.4999 13.9998 10.9403 13.9998 10.2499C13.9998 9.5596 14.5594 8.99995 15.2498 8.99995C15.9402 8.99995 16.4998 9.5596 16.4998 10.2499ZM9.31414 13.7993C9.06525 13.369 8.5147 13.222 8.08444 13.4709C7.65419 13.7198 7.50717 14.2703 7.75605 14.7006C8.60192 16.1628 10.1851 17.1499 11.9999 17.1499C13.8148 17.1499 15.398 16.1628 16.2438 14.7006C16.4927 14.2703 16.3457 13.7198 15.9155 13.4709C15.4852 13.222 14.9346 13.369 14.6858 13.7993C14.1484 14.7282 13.1462 15.3499 11.9999 15.3499C10.8536 15.3499 9.8515 14.7282 9.31414 13.7993Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFaceSmileFill;
