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
        d="M3.99996 8.60005C3.5029 8.60005 3.09996 9.003 3.09996 9.50005C3.09996 9.9971 3.5029 10.4 3.99996 10.4H19.9999C20.4969 10.4 20.8999 9.9971 20.8999 9.50005C20.8999 9.003 20.4969 8.60005 19.9999 8.60005H3.99996Z"
        fill="currentColor"
      />
      <path
        d="M3.99996 13.6C3.5029 13.6 3.09996 14.003 3.09996 14.5C3.09996 14.9971 3.5029 15.4 3.99996 15.4H19.9999C20.4969 15.4 20.8999 14.9971 20.8999 14.5C20.8999 14.003 20.4969 13.6 19.9999 13.6H3.99996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHandle;
