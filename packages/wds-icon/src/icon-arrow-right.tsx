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
        d="M21.1365 12.6362C21.4879 12.2847 21.4879 11.7149 21.1365 11.3634L14.1365 4.36344C13.785 4.01197 13.2152 4.01197 12.8637 4.36344C12.5122 4.71491 12.5122 5.28476 12.8637 5.63623L18.3273 11.0998H3.50014C3.00309 11.0998 2.60015 11.5028 2.60015 11.9998C2.60015 12.4969 3.00309 12.8998 3.50014 12.8998H18.3273L12.8637 18.3634C12.5122 18.7149 12.5122 19.2847 12.8637 19.6362C13.2152 19.9876 13.785 19.9876 14.1365 19.6362L21.1365 12.6362Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowRight;
