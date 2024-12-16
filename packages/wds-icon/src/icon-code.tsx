import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCode = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M14.2182 3.12668C14.7004 3.24724 14.9936 3.73587 14.8731 4.21809L10.8731 20.218C10.7525 20.7002 10.2639 20.9934 9.78168 20.8729C9.29947 20.7523 9.00628 20.2637 9.12684 19.7815L13.1268 3.78153C13.2474 3.29931 13.736 3.00613 14.2182 3.12668Z"
        fill="currentColor"
      />
      <path
        d="M16.3635 6.3634C16.0121 6.71487 16.0121 7.28472 16.3635 7.63619L20.7271 11.9998L16.3635 16.3634C16.0121 16.7148 16.0121 17.2847 16.3635 17.6362C16.715 17.9876 17.2849 17.9876 17.6363 17.6362L22.6363 12.6362C22.9878 12.2847 22.9878 11.7149 22.6363 11.3634L17.6363 6.3634C17.2849 6.01193 16.715 6.01193 16.3635 6.3634Z"
        fill="currentColor"
      />
      <path
        d="M7.63647 7.63619C7.98794 7.28472 7.98794 6.71487 7.63647 6.3634C7.28499 6.01193 6.71515 6.01193 6.36368 6.3634L1.3637 11.3634C1.01223 11.7149 1.01223 12.2847 1.3637 12.6362L6.36368 17.6362C6.71515 17.9876 7.28499 17.9876 7.63647 17.6362C7.98794 17.2847 7.98794 16.7148 7.63647 16.3634L3.27288 11.9998L7.63647 7.63619Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCode;
