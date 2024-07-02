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
        d="M3.36355 16.1363C3.71501 16.4878 4.28486 16.4878 4.63632 16.1363L11.9999 8.7728L19.3634 16.1363C19.7148 16.4878 20.2847 16.4878 20.6362 16.1363C20.9876 15.7849 20.9876 15.215 20.6362 14.8636L12.6362 6.86363C12.2848 6.51216 11.7149 6.51216 11.3635 6.86363L3.36355 14.8636C3.01208 15.215 3.01208 15.7849 3.36355 16.1363Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUp;
