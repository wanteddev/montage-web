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
        d="M4.49996 4.60057C4.00291 4.60057 3.59997 5.00352 3.59997 5.50057C3.59997 5.99763 4.00291 6.40057 4.49996 6.40057H19.4999C19.997 6.40057 20.3999 5.99763 20.3999 5.50057C20.3999 5.00352 19.997 4.60057 19.4999 4.60057H4.49996Z"
        fill="currentColor"
      />
      <path
        d="M6.99996 8.93389C6.5029 8.93389 6.09996 9.33683 6.09996 9.83389C6.09996 10.3309 6.5029 10.7339 6.99996 10.7339H16.9999C17.497 10.7339 17.8999 10.3309 17.8999 9.83389C17.8999 9.33683 17.497 8.93389 16.9999 8.93389H6.99996Z"
        fill="currentColor"
      />
      <path
        d="M3.59997 14.1672C3.59997 13.6701 4.00291 13.2672 4.49996 13.2672H19.4999C19.997 13.2672 20.3999 13.6701 20.3999 14.1672C20.3999 14.6642 19.997 15.0672 19.4999 15.0672H4.49996C4.00291 15.0672 3.59997 14.6642 3.59997 14.1672Z"
        fill="currentColor"
      />
      <path
        d="M6.99996 17.6005C6.5029 17.6005 6.09996 18.0034 6.09996 18.5005C6.09996 18.9976 6.5029 19.4005 6.99996 19.4005H16.9999C17.497 19.4005 17.8999 18.9976 17.8999 18.5005C17.8999 18.0034 17.497 17.6005 16.9999 17.6005H6.99996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignCenter;
