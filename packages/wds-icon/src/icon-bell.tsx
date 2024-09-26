import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconBell = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12 2.10009C9.77474 2.10009 7.94535 2.88787 6.68787 4.3744C5.44774 5.84041 4.85001 7.88316 4.85001 10.25L4.85001 11C4.85001 13.4652 4.16678 14.9248 3.19366 15.8681C2.81212 16.238 2.77252 16.7498 2.9089 17.1263C3.04761 17.5093 3.42771 17.9 3.99957 17.9H20.0004C20.5722 17.9 20.9523 17.5093 21.091 17.1263C21.2274 16.7498 21.1878 16.238 20.8063 15.8681C19.8331 14.9248 19.1499 13.4652 19.1499 11L19.1499 10.25C19.1499 7.88316 18.5522 5.84041 17.3121 4.3744C16.0546 2.88787 14.2252 2.10009 12 2.10009ZM6.65 10.25C6.65 8.16518 7.17725 6.58294 8.06212 5.53691C8.92962 4.51139 10.2252 3.90008 12 3.90008C13.7747 3.90008 15.0703 4.51139 15.9378 5.53691C16.8227 6.58294 17.3499 8.16518 17.3499 10.25L17.3499 11C17.3499 13.1628 17.8181 14.8272 18.6686 16.1H5.33129C6.18186 14.8272 6.65 13.1628 6.65 11L6.65 10.25Z"
        fill="currentColor"
      />
      <path
        d="M9.99998 20.0998C9.50293 20.0998 9.09999 20.5028 9.09999 20.9998C9.09999 21.4969 9.50293 21.8998 9.99998 21.8998H14C14.497 21.8998 14.9 21.4969 14.9 20.9998C14.9 20.5028 14.497 20.0998 14 20.0998H9.99998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBell;
