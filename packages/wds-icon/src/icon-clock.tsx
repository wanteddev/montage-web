import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconClock = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.5 6.59971C11.997 6.59971 12.4 7.00265 12.4 7.49971V12.127L14.6111 14.3382C14.9626 14.6897 14.9626 15.2595 14.6111 15.611C14.2596 15.9624 13.6898 15.9624 13.3383 15.611L10.8634 13.1361C10.6839 12.9566 10.5961 12.7201 10.6 12.4848V7.49971C10.6 7.00265 11.0029 6.59971 11.5 6.59971Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 2.1001C6.53248 2.1001 2.1001 6.53248 2.1001 12.0001C2.1001 17.4677 6.53248 21.9001 12.0001 21.9001C17.4677 21.9001 21.9001 17.4677 21.9001 12.0001C21.9001 6.53248 17.4677 2.1001 12.0001 2.1001ZM3.9001 12.0001C3.9001 7.52659 7.52659 3.9001 12.0001 3.9001C16.4736 3.9001 20.1001 7.52659 20.1001 12.0001C20.1001 16.4736 16.4736 20.1001 12.0001 20.1001C7.52659 20.1001 3.9001 16.4736 3.9001 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClock;
