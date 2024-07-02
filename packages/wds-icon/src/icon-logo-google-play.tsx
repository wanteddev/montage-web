import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoGooglePlay = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M15.7177 7.72434L7.22941 2.80298C6.91164 2.61084 6.53475 2.49999 6.12829 2.49999C5.29877 2.49999 4.57978 2.979 4.22901 3.67047L12.0033 11.4407L15.7177 7.72434Z"
        fill="currentColor"
      />
      <path
        d="M4.00078 4.57344C4.00025 4.59163 3.99998 4.60995 3.99998 4.6284V19.3864C3.99998 19.4069 4.00023 19.4272 4.00075 19.4474L11.4378 12.0065L4.00078 4.57344Z"
        fill="currentColor"
      />
      <path
        d="M4.23533 20.3444C4.58837 21.0319 5.30372 21.5 6.12829 21.5C6.51996 21.5 6.88947 21.3965 7.20724 21.2044L7.22941 21.1896L15.7237 16.2902L12.0036 12.5721L4.23533 20.3444Z"
        fill="currentColor"
      />
      <path
        d="M16.4486 15.8837L19.896 13.8955C20.5611 13.5334 21.0119 12.8313 21.0119 12.0258C21.0119 11.2203 20.5685 10.5183 19.9034 10.1635V10.1561H19.896L16.4332 8.14008L12.5691 12.0062L16.4486 15.8837Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoGooglePlay;
