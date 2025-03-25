import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconAlignCenter = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.49998 4.60059C4.00292 4.60059 3.59998 5.00353 3.59998 5.50059C3.59998 5.99764 4.00292 6.40059 4.49998 6.40059H19.5C19.997 6.40059 20.4 5.99764 20.4 5.50059C20.4 5.00353 19.997 4.60059 19.5 4.60059H4.49998Z"
        fill="currentColor"
      />
      <path
        d="M6.99998 8.93391C6.50292 8.93391 6.09998 9.33686 6.09998 9.83391C6.09998 10.331 6.50292 10.7339 6.99998 10.7339H17C17.497 10.7339 17.9 10.331 17.9 9.83391C17.9 9.33686 17.497 8.93391 17 8.93391H6.99998Z"
        fill="currentColor"
      />
      <path
        d="M3.59998 14.1672C3.59998 13.6702 4.00292 13.2672 4.49998 13.2672H19.5C19.997 13.2672 20.4 13.6702 20.4 14.1672C20.4 14.6643 19.997 15.0672 19.5 15.0672H4.49998C4.00292 15.0672 3.59998 14.6643 3.59998 14.1672Z"
        fill="currentColor"
      />
      <path
        d="M6.99998 17.6005C6.50292 17.6005 6.09998 18.0035 6.09998 18.5005C6.09998 18.9976 6.50292 19.4005 6.99998 19.4005H17C17.497 19.4005 17.9 18.9976 17.9 18.5005C17.9 18.0035 17.497 17.6005 17 17.6005H6.99998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignCenter;
