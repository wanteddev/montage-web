import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconHeartFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.59996 3.10008C4.16998 3.10008 1.49999 5.93661 1.49999 9.40005C1.49999 11.04 2.09355 12.4208 3.02078 13.7025C3.93086 14.9606 5.19688 16.1682 6.58756 17.4595L6.59181 17.4634L10.3314 20.8914C10.5042 21.0498 10.67 21.2019 10.8208 21.3197C10.9863 21.4491 11.188 21.582 11.4443 21.6604C11.8064 21.7711 12.1934 21.7711 12.5556 21.6604C12.8119 21.582 13.0136 21.4491 13.1791 21.3197C13.3298 21.2019 13.4957 21.0499 13.6685 20.8914L17.4081 17.4634L17.4123 17.4595C18.803 16.1682 20.069 14.9606 20.9791 13.7025C21.9063 12.4208 22.4999 11.04 22.4999 9.40005C22.4999 5.93661 19.8299 3.10008 16.3999 3.10008C14.6574 3.10008 13.1026 3.83721 11.9999 5.0188C10.8973 3.83721 9.34243 3.10008 7.59996 3.10008Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHeartFill;
