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
        d="M2.09997 12.0001C2.09997 6.53246 6.53234 2.10009 11.9999 2.10009C17.4675 2.10009 21.8999 6.53246 21.8999 12.0001C21.8999 17.4677 17.4675 21.9 11.9999 21.9C6.53234 21.9 2.09997 17.4677 2.09997 12.0001ZM12.9999 7.99998C12.9999 8.55226 12.5522 8.99998 11.9999 8.99998C11.4476 8.99998 10.9999 8.55226 10.9999 7.99998C10.9999 7.4477 11.4476 6.99998 11.9999 6.99998C12.5522 6.99998 12.9999 7.4477 12.9999 7.99998ZM12 10.6C12.4971 10.6 12.9 11.0029 12.9 11.5V16C12.9 16.497 12.4971 16.9 12 16.9C11.503 16.9 11.1 16.497 11.1 16V11.5C11.1 11.0029 11.503 10.6 12 10.6Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleInfoFill;
