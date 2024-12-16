import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFlipBackward = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.63684 5.13599C8.98831 4.78452 8.98831 4.21467 8.63684 3.8632C8.28537 3.51173 7.71552 3.51173 7.36405 3.8632L2.86406 8.36319C2.69528 8.53197 2.60046 8.76089 2.60046 8.99959C2.60046 9.23828 2.69528 9.4672 2.86406 9.63598L7.36405 14.136C7.71552 14.4874 8.28537 14.4874 8.63684 14.136C8.98831 13.7845 8.98831 13.2147 8.63684 12.8632L5.67383 9.90017H15.5C17.7644 9.90017 19.6 11.7358 19.6 14.0002C19.6 16.2645 17.7644 18.1001 15.5 18.1001H12C11.503 18.1001 11.1 18.5031 11.1 19.0001C11.1 19.4972 11.503 19.9001 12 19.9001H15.5C18.7585 19.9001 21.4 17.2586 21.4 14.0002C21.4 10.7417 18.7585 8.10017 15.5 8.10017H5.67266L8.63684 5.13599Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFlipBackward;
