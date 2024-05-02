import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconEye = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.52351 11.9996C5.13652 8.96552 8.32982 6.89961 12.0056 6.89961C15.6814 6.89961 18.8747 8.96552 20.4878 11.9996C18.8747 15.0336 15.6814 17.0996 12.0056 17.0996C8.32982 17.0996 5.13652 15.0336 3.52351 11.9996ZM22.3057 12.3914C22.4236 12.1435 22.4236 11.8557 22.3057 11.6078C20.4748 7.75959 16.5508 5.09961 12.0056 5.09961C7.46042 5.09961 3.53648 7.75959 1.70559 11.6078C1.58764 11.8557 1.58764 12.1435 1.70559 12.3914C3.53648 16.2396 7.46042 18.8996 12.0056 18.8996C16.5508 18.8996 20.4748 16.2396 22.3057 12.3914ZM9.90563 11.9996C9.90563 10.8398 10.8458 9.89961 12.0056 9.89961C13.1654 9.89961 14.1056 10.8398 14.1056 11.9996C14.1056 13.1594 13.1654 14.0996 12.0056 14.0996C10.8458 14.0996 9.90563 13.1594 9.90563 11.9996ZM12.0056 8.09961C9.85172 8.09961 8.10563 9.8457 8.10563 11.9996C8.10563 14.1535 9.85172 15.8996 12.0056 15.8996C14.1595 15.8996 15.9056 14.1535 15.9056 11.9996C15.9056 9.8457 14.1595 8.09961 12.0056 8.09961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEye;
