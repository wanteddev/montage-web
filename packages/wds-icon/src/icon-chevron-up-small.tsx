import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronUpSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.36341 15.6364C4.71488 15.9879 5.28473 15.9879 5.6362 15.6364L11.9998 9.27285L18.3634 15.6364C18.7148 15.9879 19.2847 15.9879 19.6361 15.6364C19.9876 15.285 19.9876 14.7151 19.6361 14.3636L12.6362 7.36367C12.2847 7.0122 11.7149 7.0122 11.3634 7.36367L4.36341 14.3636C4.01194 14.7151 4.01194 15.285 4.36341 15.6364Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUpSmall;
