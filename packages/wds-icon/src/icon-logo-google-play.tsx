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
        d="M15.7177 7.72435L7.22936 2.80298C6.91159 2.61084 6.53469 2.49999 6.12824 2.49999C5.29871 2.49999 4.57973 2.97901 4.22895 3.67048L12.0032 11.4407L15.7177 7.72435Z"
        fill="currentColor"
      />
      <path
        d="M4.00073 4.57344C4.0002 4.59164 3.99992 4.60995 3.99992 4.62841V19.3864C3.99992 19.4069 4.00018 19.4273 4.00069 19.4475L11.4377 12.0065L4.00073 4.57344Z"
        fill="currentColor"
      />
      <path
        d="M4.23528 20.3444C4.58832 21.0319 5.30366 21.5 6.12824 21.5C6.51991 21.5 6.88942 21.3966 7.20719 21.2044L7.22936 21.1896L15.7236 16.2902L12.0035 12.5721L4.23528 20.3444Z"
        fill="currentColor"
      />
      <path
        d="M16.4485 15.8837L19.896 13.8955C20.5611 13.5334 21.0119 12.8314 21.0119 12.0258C21.0119 11.2203 20.5685 10.5183 19.9034 10.1635V10.1562H19.896L16.4332 8.14009L12.5691 12.0062L16.4485 15.8837Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoGooglePlay;
