import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoYoutubeColor = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M22.2026 6.87736C21.9576 5.96146 21.2334 5.23727 20.3175 4.99232C18.6561 4.54502 11.9999 4.54502 11.9999 4.54502C11.9999 4.54502 5.3437 4.54502 3.68231 4.99232C2.76641 5.23727 2.04222 5.96146 1.79727 6.87736C1.34997 8.53875 1.34997 12 1.34997 12C1.34997 12 1.34997 15.4612 1.79727 17.1226C2.04222 18.0385 2.76641 18.7627 3.68231 19.0076C5.3437 19.4549 11.9999 19.4549 11.9999 19.4549C11.9999 19.4549 18.6561 19.4549 20.3175 19.0076C21.2334 18.7627 21.9576 18.0385 22.2026 17.1226C22.6499 15.4612 22.6499 12 22.6499 12C22.6499 12 22.6499 8.53875 22.2026 6.87736Z"
        fill="#FF0000"
      />
      <path
        d="M9.86994 15.195V8.80501L15.4079 12L9.86994 15.195Z"
        fill="white"
      />
    </Box>
  );
});

export default IconLogoYoutubeColor;
