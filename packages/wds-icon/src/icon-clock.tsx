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
        d="M11.4998 6.59919C11.9969 6.59919 12.3998 7.00214 12.3998 7.49919V12.1265L14.611 14.3376C14.9625 14.6891 14.9625 15.259 14.611 15.6104C14.2595 15.9619 13.6897 15.9619 13.3382 15.6104L10.8633 13.1356C10.6838 12.956 10.596 12.7195 10.5999 12.4843V7.49919C10.5999 7.00214 11.0028 6.59919 11.4998 6.59919Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.0996C6.53239 2.0996 2.10003 6.53197 2.10003 11.9996C2.10003 17.4672 6.53239 21.8995 12 21.8995C17.4676 21.8995 21.9 17.4672 21.9 11.9996C21.9 6.53197 17.4676 2.0996 12 2.0996ZM3.90002 11.9996C3.90002 7.52607 7.5265 3.89959 12 3.89959C16.4735 3.89959 20.1 7.52607 20.1 11.9996C20.1 16.4731 16.4735 20.0995 12 20.0995C7.5265 20.0995 3.90002 16.4731 3.90002 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClock;
