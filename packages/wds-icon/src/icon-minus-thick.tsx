import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMinusThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.70007 11.9992C2.70007 11.2812 3.28209 10.6992 4.00006 10.6992H20C20.718 10.6992 21.3 11.2812 21.3 11.9992C21.3 12.7172 20.718 13.2992 20 13.2992H4.00006C3.28209 13.2992 2.70007 12.7172 2.70007 11.9992Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMinusThick;
