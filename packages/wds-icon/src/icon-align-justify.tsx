import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconAlignJustify = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.49996 8.9339C4.00291 8.9339 3.59997 9.33684 3.59997 9.83389C3.59997 10.3309 4.00291 10.7339 4.49996 10.7339H19.4999C19.997 10.7339 20.3999 10.3309 20.3999 9.83389C20.3999 9.33684 19.997 8.9339 19.4999 8.9339H4.49996Z"
        fill="currentColor"
      />
      <path
        d="M3.59997 14.1672C3.59997 13.6702 4.00291 13.2672 4.49996 13.2672H19.4999C19.997 13.2672 20.3999 13.6702 20.3999 14.1672C20.3999 14.6643 19.997 15.0672 19.4999 15.0672H4.49996C4.00291 15.0672 3.59997 14.6643 3.59997 14.1672Z"
        fill="currentColor"
      />
      <path
        d="M4.49996 17.6005C4.00291 17.6005 3.59997 18.0035 3.59997 18.5005C3.59997 18.9976 4.00291 19.4005 4.49996 19.4005H19.4999C19.997 19.4005 20.3999 18.9976 20.3999 18.5005C20.3999 18.0035 19.997 17.6005 19.4999 17.6005H4.49996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignJustify;
