import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleBlock = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12 2.10009C6.53239 2.10009 2.10003 6.53245 2.10003 12.0001C2.10003 17.4676 6.53239 21.9 12 21.9C17.4676 21.9 21.9 17.4676 21.9 12.0001C21.9 6.53245 17.4676 2.10009 12 2.10009ZM3.90002 12.0001C3.90002 7.52656 7.5265 3.90008 12 3.90008C13.9125 3.90008 15.6702 4.56291 17.0559 5.67137L5.67131 17.0559C4.56284 15.6703 3.90002 13.9126 3.90002 12.0001ZM6.94409 18.3287C8.32979 19.4372 10.0875 20.1 12 20.1C16.4735 20.1 20.1 16.4735 20.1 12.0001C20.1 10.0875 19.4371 8.32985 18.3287 6.94415L6.94409 18.3287Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleBlock;
