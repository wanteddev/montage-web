import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLineHorizontal = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.10005 12.0001C5.10005 11.503 5.50299 11.1001 6.00004 11.1001H18C18.4971 11.1001 18.9 11.503 18.9 12.0001C18.9 12.4971 18.4971 12.9 18 12.9H6.00004C5.50299 12.9 5.10005 12.4971 5.10005 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLineHorizontal;
