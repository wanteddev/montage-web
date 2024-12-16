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
        d="M17.9999 12C17.9999 15.312 15.312 18 12 18C8.68798 18 5.99998 15.312 5.99998 12C5.99998 8.68799 8.68798 5.99998 12 5.99998C15.312 5.99998 17.9999 8.68799 17.9999 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconDot;
