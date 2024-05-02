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
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.09985 10.0001C3.09985 9.50304 3.5028 9.1001 3.99985 9.1001H19.9999C20.4969 9.1001 20.8999 9.50304 20.8999 10.0001C20.8999 10.4972 20.4969 10.9001 19.9999 10.9001H3.99985C3.5028 10.9001 3.09985 10.4972 3.09985 10.0001ZM3.09985 14.0001C3.09985 13.503 3.5028 13.1001 3.99985 13.1001H19.9999C20.4969 13.1001 20.8999 13.503 20.8999 14.0001C20.8999 14.4972 20.4969 14.9001 19.9999 14.9001H3.99985C3.5028 14.9001 3.09985 14.4972 3.09985 14.0001Z"
      />
    </Box>
  );
});

export default IconHandle;
