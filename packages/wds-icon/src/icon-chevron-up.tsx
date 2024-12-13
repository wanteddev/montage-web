import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronUp = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.36349 16.1364C3.71496 16.4878 4.2848 16.4878 4.63627 16.1364L11.9998 8.77281L19.3633 16.1364C19.7148 16.4878 20.2847 16.4878 20.6361 16.1364C20.9876 15.7849 20.9876 15.215 20.6361 14.8636L12.6362 6.86364C12.2847 6.51217 11.7149 6.51217 11.3634 6.86364L3.36349 14.8636C3.01202 15.215 3.01202 15.7849 3.36349 16.1364Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUp;
