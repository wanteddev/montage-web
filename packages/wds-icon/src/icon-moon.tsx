import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMoon = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.76123 2.54295C10.0163 2.81235 10.0799 3.21068 9.92148 3.54614C9.42699 4.59299 9.15001 5.76347 9.15001 7.00113C9.15001 11.4746 12.7765 15.1011 17.25 15.1011C18.3318 15.1011 19.3619 14.8895 20.3029 14.5063C20.6465 14.3664 21.0407 14.4517 21.2958 14.7211C21.5509 14.9905 21.6145 15.3888 21.4561 15.7243C19.8722 19.0774 16.4583 21.4005 12.5 21.4005C7.0324 21.4005 2.60003 16.9681 2.60003 11.5005C2.60003 7.3516 5.1519 3.80088 8.76827 2.32821C9.11188 2.18828 9.50614 2.27355 9.76123 2.54295ZM7.53214 5.10213C5.62558 6.58465 4.40003 8.90008 4.40003 11.5005C4.40003 15.974 8.02651 19.6005 12.5 19.6005C14.943 19.6005 17.1344 18.519 18.6201 16.807C18.1721 16.869 17.7146 16.9011 17.25 16.9011C11.7824 16.9011 7.35002 12.4687 7.35002 7.00113C7.35002 6.35202 7.4126 5.71705 7.53214 5.10213Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoon;
