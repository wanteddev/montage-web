import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleExclamationFill = forwardRef<SVGSVGElement, Props>(
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
          d="M2.09991 12.0001C2.09991 6.53248 6.53229 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53229 21.9001 2.09991 17.4677 2.09991 12.0001ZM12 7.1C12.4971 7.1 12.9 7.50294 12.9 8V12.5C12.9 12.9971 12.4971 13.4 12 13.4C11.5029 13.4 11.1 12.9971 11.1 12.5V8C11.1 7.50294 11.5029 7.1 12 7.1ZM12.9999 16C12.9999 16.5523 12.5522 17 11.9999 17C11.4476 17 10.9999 16.5523 10.9999 16C10.9999 15.4477 11.4476 15 11.9999 15C12.5522 15 12.9999 15.4477 12.9999 16Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconCircleExclamationFill;
