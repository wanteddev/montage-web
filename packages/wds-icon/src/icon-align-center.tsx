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
        d="M4.49995 4.60056C4.0029 4.60056 3.59996 5.0035 3.59996 5.50056C3.59996 5.99761 4.0029 6.40055 4.49995 6.40055H19.4999C19.9969 6.40055 20.3999 5.99761 20.3999 5.50056C20.3999 5.0035 19.9969 4.60056 19.4999 4.60056H4.49995Z"
        fill="currentColor"
      />
      <path
        d="M6.99994 8.93387C6.50289 8.93387 6.09994 9.33681 6.09994 9.83386C6.09994 10.3309 6.50289 10.7339 6.99994 10.7339H16.9999C17.4969 10.7339 17.8999 10.3309 17.8999 9.83386C17.8999 9.33681 17.4969 8.93387 16.9999 8.93387H6.99994Z"
        fill="currentColor"
      />
      <path
        d="M3.59996 14.1671C3.59996 13.6701 4.0029 13.2672 4.49995 13.2672H19.4999C19.9969 13.2672 20.3999 13.6701 20.3999 14.1671C20.3999 14.6642 19.9969 15.0671 19.4999 15.0671H4.49995C4.0029 15.0671 3.59996 14.6642 3.59996 14.1671Z"
        fill="currentColor"
      />
      <path
        d="M6.99994 17.6005C6.50289 17.6005 6.09994 18.0034 6.09994 18.5005C6.09994 18.9975 6.50289 19.4004 6.99994 19.4004H16.9999C17.4969 19.4004 17.8999 18.9975 17.8999 18.5005C17.8999 18.0034 17.4969 17.6005 16.9999 17.6005H6.99994Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignCenter;
