import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoYoutube = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M20.3175 4.99244C21.2334 5.23739 21.9576 5.96159 22.2026 6.87748C22.6499 8.53887 22.6499 12.0001 22.6499 12.0001C22.6499 12.0001 22.6499 15.4613 22.2026 17.1227C21.9576 18.0386 21.2334 18.7628 20.3175 19.0078C18.6561 19.4551 11.9999 19.4551 11.9999 19.4551C11.9999 19.4551 5.3437 19.4551 3.68231 19.0078C2.76641 18.7628 2.04222 18.0386 1.79727 17.1227C1.34997 15.4613 1.34997 12.0001 1.34997 12.0001C1.34997 12.0001 1.34997 8.53887 1.79727 6.87748C2.04222 5.96159 2.76641 5.23739 3.68231 4.99244C5.3437 4.54514 11.9999 4.54514 11.9999 4.54514C11.9999 4.54514 18.6561 4.54514 20.3175 4.99244ZM9.86994 8.80538V15.1953L15.4079 12.0004L9.86994 8.80538Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoYoutube;
