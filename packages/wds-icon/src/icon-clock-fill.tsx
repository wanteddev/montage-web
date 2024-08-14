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
        d="M12.0001 2.09961C6.53248 2.09961 2.1001 6.53199 2.1001 11.9996C2.1001 17.4672 6.53248 21.8996 12.0001 21.8996C17.4677 21.8996 21.9001 17.4672 21.9001 11.9996C21.9001 6.53199 17.4677 2.09961 12.0001 2.09961ZM11.5 6.09902C11.9971 6.09902 12.4 6.50197 12.4 6.99902V12.1264L14.7147 14.4411C15.0662 14.7925 15.0662 15.3624 14.7147 15.7138C14.3632 16.0653 13.7934 16.0653 13.4419 15.7138L10.8635 13.1354C10.684 12.9559 10.5961 12.7194 10.6 12.4841V6.99902C10.6 6.50197 11.0029 6.09902 11.5 6.09902Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClockFill;
