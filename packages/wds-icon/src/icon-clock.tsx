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
        d="M11.4999 6.59919C11.9969 6.59919 12.3999 7.00213 12.3999 7.49918V12.1265L14.611 14.3376C14.9625 14.6891 14.9625 15.2589 14.611 15.6104C14.2596 15.9619 13.6897 15.9619 13.3382 15.6104L10.8634 13.1355C10.6838 12.956 10.596 12.7195 10.5999 12.4842V7.49918C10.5999 7.00213 11.0028 6.59919 11.4999 6.59919Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.0996C6.53245 2.0996 2.10009 6.53196 2.10009 11.9995C2.10009 17.4671 6.53245 21.8995 12 21.8995C17.4676 21.8995 21.9 17.4671 21.9 11.9995C21.9 6.53196 17.4676 2.0996 12 2.0996ZM3.90008 11.9995C3.90008 7.52606 7.52655 3.89959 12 3.89959C16.4735 3.89959 20.1 7.52606 20.1 11.9995C20.1 16.473 16.4735 20.0995 12 20.0995C7.52655 20.0995 3.90008 16.473 3.90008 11.9995Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClock;
