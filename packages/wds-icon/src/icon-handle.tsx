import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconHandle = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.99996 8.59993C3.5029 8.59993 3.09996 9.00287 3.09996 9.49993C3.09996 9.99698 3.5029 10.3999 3.99996 10.3999H19.9999C20.4969 10.3999 20.8999 9.99698 20.8999 9.49993C20.8999 9.00287 20.4969 8.59993 19.9999 8.59993H3.99996Z"
        fill="currentColor"
      />
      <path
        d="M3.99996 13.5999C3.5029 13.5999 3.09996 14.0028 3.09996 14.4999C3.09996 14.997 3.5029 15.3999 3.99996 15.3999H19.9999C20.4969 15.3999 20.8999 14.997 20.8999 14.4999C20.8999 14.0028 20.4969 13.5999 19.9999 13.5999H3.99996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHandle;
