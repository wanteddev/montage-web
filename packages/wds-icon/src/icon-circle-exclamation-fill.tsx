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
          d="M2.09991 12.0001C2.09991 6.53246 6.53227 2.10009 11.9999 2.10009C17.4675 2.10009 21.8998 6.53246 21.8998 12.0001C21.8998 17.4677 17.4675 21.9 11.9999 21.9C6.53227 21.9 2.09991 17.4677 2.09991 12.0001ZM12 7.09998C12.497 7.09998 12.9 7.50292 12.9 7.99998V12.5C12.9 12.997 12.497 13.4 12 13.4C11.5029 13.4 11.1 12.997 11.1 12.5V7.99998C11.1 7.50292 11.5029 7.09998 12 7.09998ZM12.9998 16C12.9998 16.5522 12.5521 17 11.9998 17C11.4476 17 10.9998 16.5522 10.9998 16C10.9998 15.4477 11.4476 15 11.9998 15C12.5521 15 12.9998 15.4477 12.9998 16Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconCircleExclamationFill;
