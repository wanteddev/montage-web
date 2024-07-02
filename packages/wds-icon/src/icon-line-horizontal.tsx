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
        d="M5.09995 12C5.09995 11.503 5.50289 11.1 5.99995 11.1H17.9999C18.4969 11.1 18.8999 11.503 18.8999 12C18.8999 12.4971 18.4969 12.9 17.9999 12.9H5.99995C5.50289 12.9 5.09995 12.4971 5.09995 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLineHorizontal;
