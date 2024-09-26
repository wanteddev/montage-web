import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowRight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M21.1364 12.6362C21.4879 12.2847 21.4879 11.7149 21.1364 11.3634L14.1364 4.36344C13.785 4.01197 13.2151 4.01197 12.8636 4.36344C12.5122 4.71491 12.5122 5.28475 12.8636 5.63622L18.3272 11.0998H3.50008C3.00303 11.0998 2.60008 11.5027 2.60008 11.9998C2.60008 12.4968 3.00303 12.8998 3.50008 12.8998H18.3272L12.8636 18.3634C12.5122 18.7148 12.5122 19.2847 12.8636 19.6362C13.2151 19.9876 13.785 19.9876 14.1364 19.6361L21.1364 12.6362Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowRight;
