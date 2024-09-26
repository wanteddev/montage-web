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
          d="M2.0999 12C2.0999 6.53245 6.53226 2.10009 11.9998 2.10009C17.4674 2.10009 21.8998 6.53245 21.8998 12C21.8998 17.4676 17.4674 21.9 11.9998 21.9C6.53226 21.9 2.0999 17.4676 2.0999 12ZM11.9999 7.09996C12.497 7.09996 12.8999 7.50291 12.8999 7.99996V12.4999C12.8999 12.997 12.497 13.3999 11.9999 13.3999C11.5029 13.3999 11.0999 12.997 11.0999 12.4999V7.99996C11.0999 7.50291 11.5029 7.09996 11.9999 7.09996ZM12.9998 15.9999C12.9998 16.5522 12.5521 16.9999 11.9998 16.9999C11.4475 16.9999 10.9998 16.5522 10.9998 15.9999C10.9998 15.4476 11.4475 14.9999 11.9998 14.9999C12.5521 14.9999 12.9998 15.4476 12.9998 15.9999Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconCircleExclamationFill;
