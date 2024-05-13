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
        d="M3.3634 16.1365C3.71487 16.488 4.28472 16.488 4.63619 16.1365L11.9998 8.77289L19.3634 16.1365C19.7149 16.488 20.2847 16.488 20.6362 16.1365C20.9877 15.785 20.9877 15.2152 20.6362 14.8637L12.6362 6.8637C12.2847 6.51223 11.7149 6.51223 11.3634 6.8637L3.3634 14.8637C3.01192 15.2152 3.01192 15.785 3.3634 16.1365Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUp;
