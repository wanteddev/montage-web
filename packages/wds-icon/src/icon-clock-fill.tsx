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
        d="M12 2.0996C6.53239 2.0996 2.10003 6.53197 2.10003 11.9996C2.10003 17.4672 6.53239 21.8995 12 21.8995C17.4676 21.8995 21.9 17.4672 21.9 11.9996C21.9 6.53197 17.4676 2.0996 12 2.0996ZM11.4999 6.099C11.9969 6.099 12.3999 6.50194 12.3999 6.999V12.1263L14.7146 14.441C15.0661 14.7925 15.0661 15.3623 14.7146 15.7138C14.3631 16.0653 13.7933 16.0653 13.4418 15.7138L10.8634 13.1354C10.6839 12.9558 10.596 12.7193 10.5999 12.4841V6.999C10.5999 6.50194 11.0028 6.099 11.4999 6.099Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClockFill;
