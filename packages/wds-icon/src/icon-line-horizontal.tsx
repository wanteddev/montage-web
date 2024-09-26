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
        d="M5.09995 11.9999C5.09995 11.5029 5.50289 11.0999 5.99995 11.0999H17.9999C18.4969 11.0999 18.8999 11.5029 18.8999 11.9999C18.8999 12.497 18.4969 12.8999 17.9999 12.8999H5.99995C5.50289 12.8999 5.09995 12.497 5.09995 11.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLineHorizontal;
