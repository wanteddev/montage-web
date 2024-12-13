import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleCheckFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.09994 12.0001C2.09994 6.53245 6.5323 2.10009 11.9999 2.10009C17.4675 2.10009 21.8999 6.53245 21.8999 12.0001C21.8999 17.4676 17.4675 21.9 11.9999 21.9C6.5323 21.9 2.09994 17.4676 2.09994 12.0001ZM16.6466 9.8759C16.9923 9.51875 16.983 8.94898 16.6258 8.60328C16.2687 8.25759 15.6989 8.26688 15.3532 8.62403L10.6773 13.455L8.64747 11.3522C8.30226 10.9945 7.73251 10.9845 7.37488 11.3297C7.01726 11.6749 7.0072 12.2447 7.3524 12.6023L10.0289 15.375C10.1983 15.5505 10.4318 15.6498 10.6758 15.6499C10.9198 15.6501 11.1534 15.5512 11.3231 15.3759L16.6466 9.8759Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheckFill;
