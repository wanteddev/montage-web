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
        d="M11.4999 6.59922C11.9969 6.59922 12.3998 7.00216 12.3998 7.49922V12.1265L14.611 14.3377C14.9625 14.6892 14.9625 15.259 14.611 15.6105C14.2595 15.962 13.6897 15.962 13.3382 15.6105L10.8633 13.1356C10.6838 12.9561 10.596 12.7196 10.5999 12.4843V7.49922C10.5999 7.00216 11.0028 6.59922 11.4999 6.59922Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.09961C6.5324 2.09961 2.10004 6.53199 2.10004 11.9996C2.10004 17.4672 6.5324 21.8996 12 21.8996C17.4676 21.8996 21.9 17.4672 21.9 11.9996C21.9 6.53199 17.4676 2.09961 12 2.09961ZM3.90003 11.9996C3.90003 7.5261 7.52651 3.89961 12 3.89961C16.4735 3.89961 20.1 7.5261 20.1 11.9996C20.1 16.4731 16.4735 20.0996 12 20.0996C7.52651 20.0996 3.90003 16.4731 3.90003 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClock;
