import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconDot = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M17.9999 12C17.9999 15.312 15.3119 18 11.9999 18C8.68795 18 5.99997 15.312 5.99997 12C5.99997 8.68797 8.68795 5.99997 11.9999 5.99997C15.3119 5.99997 17.9999 8.68797 17.9999 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconDot;
