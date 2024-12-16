import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDoubleRightSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M4.36375 6.13986C4.01229 5.78839 4.01229 5.21855 4.36375 4.86708C4.71522 4.51561 5.28507 4.51561 5.63654 4.86708L12.1365 11.367C12.3053 11.5358 12.4001 11.7647 12.4001 12.0034C12.4001 12.2421 12.3053 12.471 12.1365 12.6398L5.63654 19.1397C5.28507 19.4912 4.71522 19.4912 4.36375 19.1397C4.01229 18.7883 4.01229 18.2184 4.36375 17.867L10.2273 12.0034L4.36375 6.13986ZM12.3639 6.13986C12.0124 5.78839 12.0124 5.21855 12.3639 4.86708C12.7153 4.51561 13.2852 4.51561 13.6366 4.86708L20.1366 11.367C20.3054 11.5358 20.4002 11.7647 20.4002 12.0034C20.4002 12.2421 20.3054 12.471 20.1366 12.6398L13.6366 19.1397C13.2852 19.4912 12.7153 19.4912 12.3639 19.1397C12.0124 18.7883 12.0124 18.2184 12.3639 17.867L18.2274 12.0034L12.3639 6.13986Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightSmall;
