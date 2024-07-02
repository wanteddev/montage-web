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
          d="M4.36378 6.13985C4.01231 5.78838 4.01231 5.21854 4.36378 4.86707C4.71525 4.5156 5.28509 4.5156 5.63656 4.86707L12.1365 11.367C12.3053 11.5358 12.4001 11.7647 12.4001 12.0034C12.4001 12.2421 12.3053 12.471 12.1365 12.6398L5.63656 19.1397C5.28509 19.4912 4.71525 19.4912 4.36378 19.1397C4.01231 18.7882 4.01231 18.2184 4.36378 17.8669L10.2273 12.0034L4.36378 6.13985ZM12.3639 6.13985C12.0124 5.78838 12.0124 5.21854 12.3639 4.86707C12.7153 4.5156 13.2852 4.5156 13.6367 4.86707L20.1366 11.367C20.3054 11.5358 20.4002 11.7647 20.4002 12.0034C20.4002 12.2421 20.3054 12.471 20.1366 12.6398L13.6367 19.1397C13.2852 19.4912 12.7153 19.4912 12.3639 19.1397C12.0124 18.7882 12.0124 18.2184 12.3639 17.8669L18.2274 12.0034L12.3639 6.13985Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightSmall;
