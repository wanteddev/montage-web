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
        d="M5.09998 12.0001C5.09998 11.503 5.50292 11.1001 5.99998 11.1001H18C18.497 11.1001 18.9 11.503 18.9 12.0001C18.9 12.4972 18.497 12.9001 18 12.9001H5.99998C5.50292 12.9001 5.09998 12.4972 5.09998 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLineHorizontal;
