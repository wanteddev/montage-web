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
        d="M12 2.09961C6.5324 2.09961 2.10004 6.53199 2.10004 11.9996C2.10004 17.4672 6.5324 21.8996 12 21.8996C17.4676 21.8996 21.9 17.4672 21.9 11.9996C21.9 6.53199 17.4676 2.09961 12 2.09961ZM11.4999 6.09902C11.997 6.09902 12.3999 6.50197 12.3999 6.99902V12.1264L14.7146 14.4411C15.0661 14.7925 15.0661 15.3624 14.7146 15.7138C14.3631 16.0653 13.7933 16.0653 13.4418 15.7138L10.8634 13.1354C10.6839 12.9559 10.596 12.7194 10.5999 12.4841V6.99902C10.5999 6.50197 11.0028 6.09902 11.4999 6.09902Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClockFill;
