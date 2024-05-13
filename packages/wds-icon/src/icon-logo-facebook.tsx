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
        d="M12 2.1001C6.53518 2.1001 2.09998 6.5353 2.09998 12.0001C2.09998 16.9402 5.72337 21.0388 10.4556 21.7813V14.8612H7.94098V12.0001H10.4556V9.8221C10.4556 7.3372 11.9307 5.971 14.1978 5.971C15.2769 5.971 16.4154 6.169 16.4154 6.169V8.6044H15.168C13.9404 8.6044 13.5543 9.3667 13.5543 10.1488V12.01H16.2966L15.861 14.8711H13.5543V21.7912C18.2865 21.0487 21.9 16.9402 21.9 12.0001C21.9 6.5353 17.4747 2.11 12.0099 2.11L12 2.1001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoFacebook;
