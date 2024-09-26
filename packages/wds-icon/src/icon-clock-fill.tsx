import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconClockFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12 2.10009C6.53245 2.10009 2.10009 6.53245 2.10009 12C2.10009 17.4676 6.53245 21.9 12 21.9C17.4676 21.9 21.9 17.4676 21.9 12C21.9 6.53245 17.4676 2.10009 12 2.10009ZM11.4999 6.09948C11.997 6.09948 12.3999 6.50242 12.3999 6.99948V12.1268L14.7146 14.4415C15.0661 14.7929 15.0661 15.3628 14.7146 15.7143C14.3632 16.0657 13.7933 16.0657 13.4418 15.7143L10.8634 13.1358C10.6839 12.9563 10.5961 12.7198 10.5999 12.4845V6.99948C10.5999 6.50242 11.0029 6.09948 11.4999 6.09948Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClockFill;
