import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoFacebook = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9999 2.1001C6.53516 2.1001 2.09998 6.5353 2.09998 12.0001C2.09998 16.9402 5.72336 21.0388 10.4555 21.7813V14.8612H7.94095V12.0001H10.4555V9.8221C10.4555 7.3372 11.9306 5.971 14.1977 5.971C15.2768 5.971 16.4153 6.169 16.4153 6.169V8.6044H15.1679C13.9403 8.6044 13.5542 9.3667 13.5542 10.1488V12.01H16.2965L15.8609 14.8711H13.5542V21.7912C18.2864 21.0487 21.8999 16.9402 21.8999 12.0001C21.8999 6.5353 17.4746 2.11 12.0098 2.11L11.9999 2.1001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoFacebook;
