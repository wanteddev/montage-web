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
        d="M5.10001 11.9996C5.10001 11.5026 5.50295 11.0996 6.00001 11.0996H18C18.4971 11.0996 18.9 11.5026 18.9 11.9996C18.9 12.4967 18.4971 12.8996 18 12.8996H6.00001C5.50295 12.8996 5.10001 12.4967 5.10001 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLineHorizontal;
