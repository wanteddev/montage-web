import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleInfoFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.09998 12.0001C2.09998 6.53248 6.53235 2.1001 12 2.1001C17.4676 2.1001 21.9 6.53248 21.9 12.0001C21.9 17.4677 17.4676 21.9001 12 21.9001C6.53235 21.9001 2.09998 17.4677 2.09998 12.0001ZM12.9999 8C12.9999 8.55228 12.5522 9 11.9999 9C11.4477 9 10.9999 8.55228 10.9999 8C10.9999 7.44772 11.4477 7 11.9999 7C12.5522 7 12.9999 7.44772 12.9999 8ZM12.0001 10.6C12.4971 10.6 12.9001 11.0029 12.9001 11.5V16C12.9001 16.4971 12.4971 16.9 12.0001 16.9C11.503 16.9 11.1001 16.4971 11.1001 16V11.5C11.1001 11.0029 11.503 10.6 12.0001 10.6Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleInfoFill;
